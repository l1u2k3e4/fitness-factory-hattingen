import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'
import type { MemberProfile, Trainer } from '@/types/booking'

interface AuthState {
  session: Session | null
  user: User | null
  profile: MemberProfile | null
  trainer: Trainer | null
  loading: boolean
  isTrainer: boolean
  isAdmin: boolean
}

interface AuthContextType extends AuthState {
  signInWithOtp: (email: string) => Promise<{ error: string | null }>
  verifyOtp: (email: string, token: string) => Promise<{ error: string | null }>
  signInWithPassword: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  updateProfile: (data: { name: string; phone?: string }) => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    profile: null,
    trainer: null,
    loading: true,
    isTrainer: false,
    isAdmin: false,
  })

  const fetchProfile = useCallback(async (userId: string) => {
    const { data: profile } = await supabase
      .from('member_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    const { data: trainer } = await supabase
      .from('trainers')
      .select('*')
      .eq('auth_user_id', userId)
      .eq('active', true)
      .single()

    return { profile, trainer }
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { profile, trainer } = await fetchProfile(session.user.id)
        setState({
          session,
          user: session.user,
          profile: profile as MemberProfile | null,
          trainer: trainer as Trainer | null,
          loading: false,
          isTrainer: !!trainer,
          isAdmin: trainer?.role === 'admin',
        })
      } else {
        setState(prev => ({ ...prev, loading: false }))
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const { profile, trainer } = await fetchProfile(session.user.id)
          setState({
            session,
            user: session.user,
            profile: profile as MemberProfile | null,
            trainer: trainer as Trainer | null,
            loading: false,
            isTrainer: !!trainer,
            isAdmin: trainer?.role === 'admin',
          })
        } else {
          setState({
            session: null,
            user: null,
            profile: null,
            trainer: null,
            loading: false,
            isTrainer: false,
            isAdmin: false,
          })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [fetchProfile])

  const signInWithOtp = useCallback(async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    return { error: error?.message ?? null }
  }, [])

  const verifyOtp = useCallback(async (email: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })
    return { error: error?.message ?? null }
  }, [])

  const signInWithPassword = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const updateProfile = useCallback(async (data: { name: string; phone?: string }) => {
    if (!state.user) return { error: 'Nicht eingeloggt.' }

    const { error } = await supabase
      .from('member_profiles')
      .upsert({
        id: state.user.id,
        name: data.name,
        phone: data.phone ?? null,
        is_member: true,
      })

    if (!error) {
      setState(prev => ({
        ...prev,
        profile: {
          id: prev.user!.id,
          name: data.name,
          phone: data.phone ?? null,
          is_member: true,
        },
      }))
    }

    return { error: error?.message ?? null }
  }, [state.user])

  return (
    <AuthContext.Provider value={{
      ...state,
      signInWithOtp,
      verifyOtp,
      signInWithPassword,
      signOut,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth muss innerhalb von AuthProvider verwendet werden')
  return context
}
