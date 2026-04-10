/**
 * content.ts — Fitness Factory Hattingen
 * Zentraler Content-Store für alle Website-Texte.
 *
 * Regeln:
 * - KEINE Texte direkt in JSX — immer hier importieren
 * - Deutsche Namen für Content-Variablen
 * - [TBD: Vom Kunden] = Platzhalter, muss vom Kunden befüllt werden
 * - WhatsApp-URL immer mit vorausgefüllter Nachricht
 */

// ---------------------------------------------------------------------------
// SITE — globale Metadaten & Kontaktdaten
// ---------------------------------------------------------------------------

export const SITE = {
  name: 'Fitness Factory Hattingen',
  firmenname: 'Fitness Factory Hattingen GmbH',
  adresse: {
    strasse: 'Im Vogelsang 95',
    plz: '45527',
    ort: 'Hattingen',
    stadtteil: 'Holthausen',
    vollstaendig: 'Im Vogelsang 95, 45527 Hattingen',
    googleMapsUrl: 'https://maps.google.com/?q=Fitness+Factory+Hattingen,+Im+Vogelsang+95,+45527+Hattingen',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Fitness+Factory+Hattingen,+Im+Vogelsang+95,+45527+Hattingen',
    googleMapsEmbedUrl:
      'https://www.google.com/maps?q=Fitness+Factory+Hattingen,+Im+Vogelsang+95,+45527+Hattingen&output=embed',
  },
  kontakt: {
    telefon: '02324 33777',
    telefonLink: 'tel:+49232433777',
    whatsapp: '+49 1573 7580001',
    whatsappLink:
      'https://wa.me/4915737580001?text=Hallo%2C%20ich%20m%C3%B6chte%20ein%20Probetraining%20buchen.',
    whatsappLinkAllgemein:
      'https://wa.me/4915737580001?text=Hallo%2C%20ich%20habe%20eine%20Frage%20zur%20Mitgliedschaft.',
    email: 'fitness-factory-hattingen@gmx.de',
  },
  oeffnungszeiten: {
    wochentage: 'Mo–Fr 08:00–23:00 Uhr',
    wochenende: 'Sa–So 10:00–17:30 Uhr',
    items: [
      { tag: 'Montag – Freitag', zeit: '08:00 – 23:00 Uhr' },
      { tag: 'Samstag – Sonntag', zeit: '10:00 – 17:30 Uhr' },
    ],
  },
  social: {
    instagram: 'https://www.instagram.com/fitness.factory.hattingen/',
    instagramHandle: '@fitness.factory.hattingen',
    facebook: 'https://www.facebook.com/fitnessfactoryhattingen',
    facebookHandle: '/fitnessfactoryhattingen',
  },
  gruendungsjahr: '2018',
  mitgliederanzahl: '500+',
  bewertungenAnzahl: '167',
  bewertungsDurchschnitt: '4,9',
} as const

// ---------------------------------------------------------------------------
// META — SEO-Metadaten pro Seite
// ---------------------------------------------------------------------------

export const META = {
  home: {
    title: 'Fitnessstudio Hattingen | Fitness Factory — Sauna, Kurse & mehr ab 35€',
    description:
      'Dein Fitnessstudio in Hattingen: Sauna, 16 Live-Kurse, Getränkeflat und persönliche Betreuung — alles inklusive ab 35€/Monat. Jetzt Probetraining buchen.',
    keywords:
      'Fitnessstudio Hattingen, Gym Hattingen, Fitness Hattingen, Probetraining Hattingen, Studio Hattingen, Sport Hattingen',
  },
  probetraining: {
    title: 'Probetraining buchen | Fitness Factory Hattingen — kostenlos testen',
    description:
      'Komm einfach vorbei und teste unser Studio kostenlos. Kein Vertrag, kein Druck — nur du, das Studio und ein gutes Workout. Jetzt Probetraining buchen.',
    keywords:
      'Probetraining Hattingen, Fitnessstudio testen Hattingen, gratis Probetraining Hattingen',
  },
  mitgliedschaft: {
    title: 'Mitgliedschaft & Preise | Fitness Factory Hattingen — ab 35€/Monat',
    description:
      'Flex ab 55€, Standard ab 45€, Premium ab 35€/Monat — mit Sauna, Kursen und Getränkeflat. Keine versteckten Kosten. Transparente Preise im Überblick.',
    keywords:
      'Fitnessstudio Preise Hattingen, Mitgliedschaft Hattingen, Gym Kosten Hattingen, günstiges Fitnessstudio Hattingen',
  },
  kursplan: {
    title: 'Kursplan | Fitness Factory Hattingen — Yoga, Spinning, Zumba & mehr',
    description:
      'Yoga, Spinning, Tabata, Zumba, Tae-Bo und mehr — alle Live-Kurse im Überblick. Inklusive in jeder Mitgliedschaft. Kein Aufpreis.',
    keywords:
      'Kurse Fitnessstudio Hattingen, Yoga Hattingen, Spinning Hattingen, Zumba Hattingen, Kursplan Hattingen',
  },
  team: {
    title: 'Unser Team | Fitness Factory Hattingen — persönliche Betreuung',
    description:
      'Lerne unser Team kennen. Qualifizierte Trainer, die sich Zeit für dich nehmen — Trainingsplan, Ernährungsberatung und offene Türen.',
    keywords: 'Trainer Fitnessstudio Hattingen, Betreuung Fitnessstudio Hattingen',
  },
  fremdgehAktion: {
    title: 'Fremdgeh-Aktion | Fitness Factory Hattingen — 3 Monate für 0€',
    description:
      '3 Monate gratis testen — wenn du gerade noch woanders Mitglied bist. Nur 49€ Anmeldegebühr. Jetzt wechseln und sparen.',
    keywords:
      'Fremdgeh-Aktion Hattingen, Fitnessstudio wechseln Hattingen, günstiges Gym Hattingen',
  },
  faq: {
    title: 'FAQ | Fitness Factory Hattingen — alle Fragen beantwortet',
    description:
      'Alles, was du vor deiner Mitgliedschaft wissen willst: Preise, Kündigung, Sauna, Probetraining, Parkplätze und mehr.',
    keywords: 'FAQ Fitnessstudio Hattingen, Fragen Gym Hattingen',
  },
  impressum: {
    title: 'Impressum | Fitness Factory Hattingen GmbH',
    description: 'Impressum der Fitness Factory Hattingen GmbH gemäß § 5 TMG.',
    keywords: '',
  },
  datenschutz: {
    title: 'Datenschutz | Fitness Factory Hattingen GmbH',
    description: 'Datenschutzerklärung der Fitness Factory Hattingen GmbH gemäß DSGVO.',
    keywords: '',
  },
  ueberUns: {
    title: 'Über uns | Fitness Factory Hattingen — Dein familiäres Fitnessstudio',
    description:
      'Familiäres Fitnessstudio in Hattingen-Holthausen: Persönliche Betreuung, All-inclusive zum fairen Preis, Trainingsberatung und Ernährungsberatung inklusive.',
    keywords:
      'Fitnessstudio Hattingen Über uns, familiäres Gym Hattingen, persönliche Betreuung Fitnessstudio',
  },
  galerie: {
    title: 'Galerie | Fitness Factory Hattingen — Einblicke ins Studio',
    description:
      'Schau dir unser Studio in Hattingen-Holthausen an: Gerätepark, Kursraum, Sauna, Lounge und mehr. Mach dir ein Bild von deinem zukünftigen Gym.',
    keywords:
      'Fitnessstudio Hattingen Bilder, Gym Hattingen Fotos, Fitness Factory Galerie',
  },
  kontakt: {
    title: 'Kontakt & Anfahrt | Fitness Factory Hattingen — Im Vogelsang 95',
    description:
      'So findest du uns: Im Vogelsang 95, 45527 Hattingen-Holthausen. Kostenlose Parkplätze, Mo–Fr 08:00–23:00, Sa–So 10:00–17:30. Ruf an oder schreib uns!',
    keywords:
      'Fitness Factory Hattingen Kontakt, Fitnessstudio Hattingen Adresse, Öffnungszeiten Gym Hattingen, Anfahrt Fitnessstudio Hattingen',
  },
} as const

// ---------------------------------------------------------------------------
// HERO — Homepage Hero-Section
// ---------------------------------------------------------------------------

export const HERO = {
  badge: 'Fitnessstudio Hattingen',
  // SEO-optimierte Headline — "Hattingen" wird in brand-primary hervorgehoben
  headlineZeile1: 'Dein Gym in',
  headlineZeile2: 'Hattingen',
  subheadline:
    'Sauna, Live-Kurse, Getränkeflat und persönliche Betreuung — alles inklusive ab 35\u00a0€/Monat.',
  ctaPrimary: {
    label: 'Probetraining buchen',
    href: '/probetraining',
    ariaLabel: 'Kostenloses Probetraining buchen',
  },
  ctaSecondary: {
    label: 'Preise ansehen',
    href: '/mitgliedschaft',
    ariaLabel: 'Mitgliedschaft und Preise ansehen',
  },
  ctaWhatsApp: {
    label: 'Auf WhatsApp schreiben',
    href: 'https://wa.me/4915737580001?text=Hallo%2C%20ich%20m%C3%B6chte%20ein%20Probetraining%20buchen.',
  },
  // Schnellkennzahlen unter den CTAs
  kennzahlen: [
    { wert: 'Mo–Fr', label: 'bis 23 Uhr' },
    { wert: 'Getränkeflat', label: 'inklusive' },
    { wert: '∞', label: 'Sauna inkl.' },
  ],
  vertrauenssignal: 'Über 500 zufriedene Mitglieder in Hattingen',
  hintergrundBeschreibung:
    '[TBD: Hintergrundbild \u2014 Gym-Innenaufnahme mit Ger\u00e4ten, dunkle Atmosph\u00e4re, warm beleuchtet]',
} as const

// ---------------------------------------------------------------------------
// TRUST_BAR — Vertrauensleiste unter Hero
// ---------------------------------------------------------------------------

export const TRUST_BAR = {
  items: [
    {
      icon: 'Star',
      numericValue: 4.9,
      suffix: '/5',
      decimals: 1,
      displayWert: '4,9/5',
      label: 'basierend auf 167 Bewertungen',
    },
    {
      icon: 'Calendar',
      numericValue: 16,
      suffix: '+',
      decimals: 0,
      displayWert: '16+',
      label: 'Live-Kurse pro Woche',
    },
    {
      icon: 'MapPin',
      numericValue: null,
      suffix: '',
      decimals: 0,
      displayWert: 'Holthausen',
      label: 'mitten in Hattingen',
    },
  ],
} as const

// ---------------------------------------------------------------------------
// LEISTUNGEN — USP/Leistungs-Section
// ---------------------------------------------------------------------------

export const LEISTUNGEN = {
  sectionBadge: 'Alles inklusive',
  headline: 'Was du bekommst.',
  subheadline: 'Kein "Basis-Paket". Kein Kleingedrucktes. Einfach alles drin.',
  items: [
    {
      icon: 'Flame',
      headline: 'Sauna inklusive',
      beschreibung:
        'Direkt nach dem Training entspannen — ohne Aufpreis, ohne Extraticket. Die Sauna gehört dazu.',
    },
    {
      icon: 'Coffee',
      headline: 'Getränke-Flatrate',
      beschreibung:
        'Wasser, Tee, Sportgetränke — trink so viel du willst. Ohne Zählen, ohne Bezahlen an der Theke.',
    },
    {
      icon: 'Dumbbell',
      headline: '16 Live-Kurse',
      beschreibung:
        'Yoga, Spinning, Tabata, Zumba, Tae-Bo und mehr — jede Woche, für jeden Level. Einfach reinkommen.',
    },
    {
      icon: 'ClipboardList',
      headline: 'Dein Trainingsplan',
      beschreibung:
        'Kein generisches Zettelchen. Wir erstellen dir einen Plan, der zu dir und deinen Zielen passt.',
    },
    {
      icon: 'Apple',
      headline: 'Ernährungsberatung',
      beschreibung:
        'Training allein reicht selten. Wir helfen dir auch dabei, was du nach dem Workout auf den Teller legst.',
    },
    {
      icon: 'ShowerHead',
      headline: 'Duschen & Umkleiden',
      beschreibung:
        'Komm direkt aus dem Job, trainiere, dusche — und fahr frisch nach Hause. Alles da, was du brauchst.',
    },
    {
      icon: 'Car',
      headline: 'Kostenlose Parkplätze',
      beschreibung:
        'Kein Parkplatzstress in der Stadt. Direkt vor der Tür parken — kostenlos, immer verfügbar.',
    },
    {
      icon: 'Heart',
      headline: 'Echte Betreuung',
      beschreibung:
        'Wir kennen dich beim Namen. Fragen, Probleme, Motivationstief — du bist nicht auf dich allein gestellt.',
    },
  ],
} as const

// ---------------------------------------------------------------------------
// LEISTUNGEN_INKLUSIVE — Kurzliste für Preise-Section (alle Tarife)
// ---------------------------------------------------------------------------

export const LEISTUNGEN_INKLUSIVE = [
  'Sauna inklusive',
  '16 Live-Kurse',
  'Getränke-Flatrate',
  'Ernährungsberatung',
  'Individueller Trainingsplan',
  'Duschen & Umkleiden',
  'Kostenlose Parkplätze',
] as const

// ---------------------------------------------------------------------------
// PREISE — Mitgliedschaftsmodelle
// ---------------------------------------------------------------------------

export const PREISE = {
  sectionBadge: 'Mitgliedschaft',
  headline: 'Dein Preis. Deine Laufzeit.',
  subheadline: 'Alle Pakete beinhalten denselben vollen Leistungsumfang — Sauna, Kurse, alles.',
  hinweis: 'Einmalige Anmeldegebühr: 49€ — gilt für alle Tarife',
  tarife: [
    {
      name: 'Flex',
      laufzeit: '1 Monat',
      monatspreis: 55,
      anmeldegebuehr: 49,
      badge: null,
      highlight: false,
      beschreibung: 'Kein Risiko. Monatlich kündbar.',
      features: [
        'Monatlich kündbar',
        'Voller Leistungsumfang',
        'Sauna inklusive',
        'Alle Live-Kurse',
        'Getränkeflat',
        'Trainingsplan',
        'Ernährungsberatung',
        'Kostenlose Parkplätze',
      ],
    },
    {
      name: 'Standard',
      laufzeit: '12 Monate',
      monatspreis: 45,
      anmeldegebuehr: 49,
      badge: 'Beliebteste Wahl',
      highlight: true,
      beschreibung: 'Das beste Preis-Leistungs-Verhältnis.',
      features: [
        '12 Monate Laufzeit',
        'Voller Leistungsumfang',
        'Sauna inklusive',
        'Alle Live-Kurse',
        'Getränkeflat',
        'Trainingsplan',
        'Ernährungsberatung',
        'Kostenlose Parkplätze',
      ],
    },
    {
      name: 'Premium',
      laufzeit: '24 Monate',
      monatspreis: 35,
      anmeldegebuehr: 49,
      badge: 'Günstigster Preis',
      highlight: false,
      beschreibung: 'Für alle, die dabei bleiben.',
      features: [
        '24 Monate Laufzeit',
        'Voller Leistungsumfang',
        'Sauna inklusive',
        'Alle Live-Kurse',
        'Getränkeflat',
        'Trainingsplan',
        'Ernährungsberatung',
        'Kostenlose Parkplätze',
      ],
    },
  ],
  fremdgehAktion: {
    name: 'Fremdgeh-Aktion',
    laufzeit: '3 Monate',
    monatspreis: 0,
    anmeldegebuehr: 49,
    badge: 'Sonderaktion',
    headline: '3 Monate für 0€',
    beschreibung:
      'Du bist gerade noch woanders Mitglied? Komm trotzdem — und teste uns 3 Monate lang. Nur die Anmeldegebühr fällt an.',
    bedingung: 'Gültig bei Vorlage eines bestehenden Vertrags bei einem anderen Fitnessstudio.',
    ctaLabel: 'Jetzt wechseln',
    ctaHref: '/fremdgeh-aktion/',
  },
  ctaLabel: 'Jetzt Mitglied werden',
  ctaHref: '/mitgliedschaft/',
  probetrainingHinweis: 'Noch unsicher? Erst',
  probetrainingLinkLabel: 'kostenlos testen',
  probetrainingLinkHref: '/probetraining/',
} as const

// ---------------------------------------------------------------------------
// PROBETRAINING_CTA — Dedizierte CTA-Section
// ---------------------------------------------------------------------------

export const PROBETRAINING_CTA = {
  sectionBadge: 'Kein Risiko',
  headline: 'Komm einfach vorbei.',
  subheadline:
    'Kein Vertrag. Kein Druck. Du trainierst einen Tag mit uns — und entscheidest danach in Ruhe.',
  ablauf: [
    { schritt: '1', text: 'Termin per WhatsApp oder Anruf vereinbaren' },
    { schritt: '2', text: 'Komm vorbei — wir zeigen dir alles' },
    { schritt: '3', text: 'Trainiere mit uns und test die Sauna' },
    { schritt: '4', text: 'Entscheide ohne Druck' },
  ],
  ctaPrimary: {
    label: 'Probetraining per WhatsApp',
    href: 'https://wa.me/4915737580001?text=Hallo%2C%20ich%20m%C3%B6chte%20ein%20Probetraining%20buchen.',
  },
  ctaSecondary: {
    label: 'Jetzt anrufen',
    href: 'tel:+49232433777',
  },
} as const

// ---------------------------------------------------------------------------
// TEAM — Trainer-Team
// ---------------------------------------------------------------------------

export const TEAM = {
  sectionBadge: 'Unser Team',
  headline: 'Dein Team. Dein Studio.',
  subheadline:
    'Wir kennen dich beim Namen — und wissen, was dich weiterbringt. Persönliche Betreuung statt anonymem Großstudio.',
  mitglieder: [
    {
      name: 'Alex',
      rolle: 'Inhaber & Cheftrainer',
      qualifikationen: [
        'Personal Trainer',
        'Ernährungsberater',
      ],
      beschreibung:
        'Alex hat die Fitness Factory mit einer klaren Vision gegründet: Ein Studio, in dem jeder Mensch individuell betreut wird. Als Inhaber und Cheftrainer kennt er jedes Mitglied persönlich und sorgt dafür, dass Training Ergebnisse liefert — nicht nur Schweiß.',
      foto: '/Trainer/Alex_02.webp',
    },
    {
      name: 'Carla',
      rolle: 'Spinning-Trainerin',
      qualifikationen: [
        'Indoor Cycling Trainer',
        'Personal Trainer',
      ],
      beschreibung:
        'Carla bringt Energie in jede Spinning-Stunde. Mit mitreißender Musik und motivierenden Ansagen sorgt sie dafür, dass du deine Grenzen sprengst — und dabei Spaß hast. Ihre Kurse sind legendär und regelmäßig ausgebucht.',
      foto: '/Trainer/Carla.webp',
    },
  ],
  ctaLabel: 'Lerne uns beim Probetraining kennen →',
  ctaHref: '/probetraining/',
} as const

// ---------------------------------------------------------------------------
// KURSPLAN — Wochenübersicht
// ---------------------------------------------------------------------------

export const KURSPLAN = {
  sectionBadge: 'Live-Kurse',
  headline: 'Diese Woche im Studio.',
  subheadline: 'Alle Kurse inklusive. Einfach mitkommen — ohne Anmeldung, ohne Aufpreis.',
  kurse: [
    {
      tag: 'Montag',
      tagKurz: 'Mo',
      items: [
        {
          name: 'Vinyasa-Yoga',
          uhrzeit: '[TBD: Vom Kunden]',
          dauer: '[TBD: z.B. 60 Min]',
          level: 'Alle Level',
        },
        {
          name: 'Spinning',
          uhrzeit: '[TBD: Vom Kunden]',
          dauer: '[TBD: z.B. 45 Min]',
          level: 'Alle Level',
        },
        {
          name: 'Wirbelsäulen-Gymnastik',
          uhrzeit: '[TBD: Vom Kunden]',
          dauer: '[TBD: z.B. 45 Min]',
          level: 'Alle Level',
        },
      ],
    },
    {
      tag: 'Dienstag',
      tagKurz: 'Di',
      items: [
        {
          name: 'Bauch-Express',
          uhrzeit: '[TBD: Vom Kunden]',
          dauer: '[TBD: z.B. 30 Min]',
          level: 'Alle Level',
        },
        {
          name: 'Spinning',
          uhrzeit: '[TBD: Vom Kunden]',
          dauer: '[TBD: z.B. 45 Min]',
          level: 'Alle Level',
        },
      ],
    },
    {
      tag: 'Mittwoch',
      tagKurz: 'Mi',
      items: [
        {
          name: 'Tabata',
          uhrzeit: '[TBD: Vom Kunden]',
          dauer: '[TBD: z.B. 45 Min]',
          level: 'Alle Level',
        },
        {
          name: 'Yoga',
          uhrzeit: '[TBD: Vom Kunden]',
          dauer: '[TBD: z.B. 60 Min]',
          level: 'Alle Level',
        },
      ],
    },
    {
      tag: 'Donnerstag',
      tagKurz: 'Do',
      items: [
        {
          name: 'Tae-Bo',
          uhrzeit: '[TBD: Vom Kunden]',
          dauer: '[TBD: z.B. 45 Min]',
          level: 'Alle Level',
        },
        {
          name: 'Spinning',
          uhrzeit: '[TBD: Vom Kunden]',
          dauer: '[TBD: z.B. 45 Min]',
          level: 'Alle Level',
        },
      ],
    },
    {
      tag: 'Freitag',
      tagKurz: 'Fr',
      items: [
        {
          name: 'Rücken-Fit',
          uhrzeit: '[TBD: Vom Kunden]',
          dauer: '[TBD: z.B. 45 Min]',
          level: 'Alle Level',
        },
        {
          name: 'Zumba',
          uhrzeit: '[TBD: Vom Kunden]',
          dauer: '[TBD: z.B. 60 Min]',
          level: 'Alle Level',
        },
      ],
    },
    {
      tag: 'Samstag',
      tagKurz: 'Sa',
      items: [] as { name: string; uhrzeit: string; dauer: string; level: string }[],
    },
    {
      tag: 'Sonntag',
      tagKurz: 'So',
      items: [
        {
          name: 'Spinning',
          uhrzeit: '[TBD: Vom Kunden]',
          dauer: '[TBD: z.B. 45 Min]',
          level: 'Alle Level',
        },
        {
          name: 'Full Body Intervall',
          uhrzeit: '[TBD: Vom Kunden]',
          dauer: '[TBD: z.B. 45 Min]',
          level: 'Alle Level',
        },
        {
          name: 'Pilates',
          uhrzeit: '[TBD: Vom Kunden]',
          dauer: '[TBD: z.B. 60 Min]',
          level: 'Alle Level',
        },
      ],
    },
  ],
  hinweis: 'Kurszeiten können sich gelegentlich ändern — aktuelle Zeiten auf Anfrage.',
  ctaLabel: 'Vollständiger Kursplan',
  ctaHref: '/kursplan/',
} as const

// ---------------------------------------------------------------------------
// GALERIE — Bilder-Section
// ---------------------------------------------------------------------------

export const GALERIE = {
  sectionBadge: 'Einblick',
  headline: 'Schau dich um.',
  subheadline: 'Hier trainierst du — nicht in einem anonymen Ketten-Studio.',
  bilder: [
    {
      src: '/images/studio-dsc-01.webp',
      alt: 'Fitnessgeräte im Fitness Factory Hattingen',
      kategorie: 'Studio',
    },
    {
      src: '/images/studio-dsc-02.webp',
      alt: 'Kursraum für Yoga und Spinning im Fitness Factory Hattingen',
      kategorie: 'Studio',
    },
    {
      src: '/images/studio-dsc-03.webp',
      alt: 'Trainingsbereich im Fitness Factory Hattingen',
      kategorie: 'Studio',
    },
    {
      src: '/images/studio-dsc-04.webp',
      alt: 'Kraftbereich im Fitness Factory Hattingen',
      kategorie: 'Studio',
    },
    {
      src: '/images/studio-dsc-05.webp',
      alt: 'Cardiobereich im Fitness Factory Hattingen',
      kategorie: 'Studio',
    },
    {
      src: '/images/studio-dsc-06.webp',
      alt: 'Gerätepark im Fitness Factory Hattingen',
      kategorie: 'Studio',
    },
    {
      src: '/images/studio-dsc-07.webp',
      alt: 'Trainingsbereich im Fitness Factory Hattingen',
      kategorie: 'Studio',
    },
    {
      src: '/images/studio-dsc-08.webp',
      alt: 'Studiobereich im Fitness Factory Hattingen',
      kategorie: 'Studio',
    },
    {
      src: '/images/studio-galerie-01.webp',
      alt: 'Ausstattung im Fitness Factory Hattingen',
      kategorie: 'Studio',
    },
    {
      src: '/Galerie/Sauna/Sauna_Außenbereich_01.webp',
      alt: 'Sauna Außenbereich im Fitness Factory Hattingen',
      kategorie: 'Sauna',
    },
    {
      src: '/Galerie/Sauna/Sauna_Innenbereich_01.webp',
      alt: 'Sauna Innenbereich im Fitness Factory Hattingen',
      kategorie: 'Sauna',
    },
    {
      src: '/Galerie/Sauna/Sauna_Innenbereich_02.webp',
      alt: 'Sauna im Fitness Factory Hattingen',
      kategorie: 'Sauna',
    },
    {
      src: '/Galerie/Lounge/Theke-Lounge.webp',
      alt: 'Lounge und Theke im Fitness Factory Hattingen',
      kategorie: 'Lounge',
    },
    {
      src: '/Galerie/Kursraum/Kurs_Video.mp4',
      alt: 'Kursraum im Fitness Factory Hattingen — Live-Kurse',
      kategorie: 'Kurs',
      type: 'video',
    },
  ],
} as const

// ---------------------------------------------------------------------------
// TESTIMONIALS — Echte Google-Bewertungen
// ---------------------------------------------------------------------------

export const TESTIMONIALS = {
  sectionBadge: 'Bewertungen',
  headline: '4.9 Sterne bei 167 Google-Bewertungen',
  subheadline: 'Was unsere Mitglieder über die Fitness Factory sagen.',
  overallRating: 4.9,
  totalReviews: 167,
  items: [
    {
      name: 'Florian Kurth',
      text: 'Das Studio macht einen sehr coolen Eindruck, bei dem es bock macht zu trainieren. Der Maschinenpark ist richtig gut und die Trainer sind sehr freundlich und hilfsbereit.',
      sterne: 5,
      datum: 'vor 2 Monaten',
      plattform: 'Google',
    },
    {
      name: 'Dominik Sociera',
      text: 'Ich war zum Probetraining dort und bin wirklich begeistert. Das Studio ist modern ausgestattet, sehr sauber und die Atmosphäre ist super angenehm. Die Trainer nehmen sich Zeit und gehen individuell auf einen ein.',
      sterne: 5,
      datum: 'vor 3 Monaten',
      plattform: 'Google',
    },
    {
      name: 'Luca Vielmetter',
      text: 'Richtig starkes Gym. Die Fitness Factory überzeugt mit einer top Geräteauswahl, sauberen Räumlichkeiten und einem motivierenden Ambiente. Besonders hervorzuheben ist die persönliche Betreuung.',
      sterne: 5,
      datum: 'vor 1 Monat',
      plattform: 'Google',
    },
  ],
  googleMapsLink: 'https://www.google.com/maps/place/Fitness+Factory+Hattingen/',
  ctaLabel: 'Alle Bewertungen auf Google →',
} as const

// ---------------------------------------------------------------------------
// FAQ — 8 Kaufeinwände (Homepage-Kurzversion)
// ---------------------------------------------------------------------------

export const FAQ = {
  sectionBadge: 'FAQ',
  headline: 'Deine Fragen. Unsere Antworten.',
  subheadline: 'Die Fragen, die wir am häufigsten hören — direkt beantwortet.',
  items: [
    {
      frage: 'Muss ich nach dem Probetraining sofort Mitglied werden?',
      antwort:
        'Nein. Du trainierst, schaust dich um — und entscheidest danach in Ruhe. Kein Verkäufer, kein Druck.',
    },
    {
      frage: 'Was kostet die Sauna extra?',
      antwort:
        'Nichts. Die Sauna ist in jeder Mitgliedschaft inklusive — vom 35€-Premium-Tarif bis zum 55€-Flex-Tarif.',
    },
    {
      frage: 'Ich bin Anfänger und habe noch nie trainiert. Passt das für mich?',
      antwort:
        'Ja. Wir haben Mitglieder von 18 bis 70+. Wir erstellen dir einen Trainingsplan, der zu deinem aktuellen Level passt — nicht zu dem, den du irgendwann mal haben willst.',
    },
    {
      frage: 'Gibt es versteckte Kosten?',
      antwort:
        'Nein. Du zahlst deinen Monatsbeitrag und einmalig 49€ Anmeldegebühr. Kurse, Sauna, Getränke, Trainingsplan — alles drin.',
    },
    {
      frage: 'Kann ich monatlich kündigen?',
      antwort:
        'Mit dem Flex-Tarif (55€/Monat) ja — jederzeit monatlich kündbar. Standard und Premium haben 12 bzw. 24 Monate Laufzeit, dafür deutlich günstiger.',
    },
    {
      frage: 'Wo parke ich?',
      antwort:
        'Direkt vor dem Studio — kostenlos. Kein Parkhaus, kein Parkticket, kein Stress.',
    },
    {
      frage: 'Wie läuft die Fremdgeh-Aktion genau ab?',
      antwort:
        'Du bist noch bei einem anderen Studio Mitglied? Bring deinen bestehenden Vertrag mit und trainiere 3 Monate bei uns für 0€ — nur die Anmeldegebühr (49€) fällt an.',
    },
    {
      frage: 'Gibt es Kurse für Einsteiger oder ältere Mitglieder?',
      antwort:
        'Ja. Wirbelsäulen-Gymnastik, Yoga, Pilates und Rücken-Fit sind explizit für alle Levels — auch für Menschen, die lange nicht trainiert haben.',
    },
  ],
  ctaLabel: 'Alle Fragen ansehen',
  ctaHref: '/faq/',
} as const

// ---------------------------------------------------------------------------
// KONTAKT — Kontakt-Section mit Karte
// ---------------------------------------------------------------------------

export const KONTAKT = {
  sectionBadge: 'Kontakt',
  headline: 'Komm vorbei.',
  subheadline: 'Im Vogelsang 95, Hattingen-Holthausen — mit kostenlosen Parkplätzen direkt vor der Tür.',
  adresse: SITE.adresse.vollstaendig,
  oeffnungszeiten: SITE.oeffnungszeiten.items,
  kontaktOptionen: [
    {
      icon: 'Phone',
      label: 'Anrufen',
      wert: SITE.kontakt.telefon,
      href: SITE.kontakt.telefonLink,
    },
    {
      icon: 'MessageCircle',
      label: 'WhatsApp',
      wert: SITE.kontakt.whatsapp,
      href: SITE.kontakt.whatsappLink,
    },
    {
      icon: 'Mail',
      label: 'E-Mail',
      wert: SITE.kontakt.email,
      href: `mailto:${SITE.kontakt.email}`,
    },
  ],
  anfahrtHinweis: 'Aus Richtung Hattingen-Mitte: B51 Richtung Holthausen, Im Vogelsang abbiegen.',
} as const

// ---------------------------------------------------------------------------
// FOOTER
// ---------------------------------------------------------------------------

export const FOOTER = {
  headline: 'Fitness Factory Hattingen',
  subheadline: 'Im Vogelsang 95 · 45527 Hattingen',
  links: {
    studio: [
      { label: 'Probetraining', href: '/probetraining/' },
      { label: 'Mitgliedschaft & Preise', href: '/mitgliedschaft/' },
      { label: 'Kursplan', href: '/kursplan/' },
      { label: 'Unser Team', href: '/team/' },
      { label: 'Fremdgeh-Aktion', href: '/fremdgeh-aktion/' },
    ],
    info: [
      { label: 'FAQ', href: '/faq/' },
      { label: 'Kontakt', href: '/#kontakt' },
      { label: 'Impressum', href: '/impressum/' },
      { label: 'Datenschutz', href: '/datenschutz/' },
    ],
  },
  copyright: `© ${new Date().getFullYear()} Fitness Factory Hattingen GmbH. Alle Rechte vorbehalten.`,
  socialLinks: [
    {
      label: 'Instagram',
      href: SITE.social.instagram,
      icon: 'Instagram',
    },
    {
      label: 'Facebook',
      href: SITE.social.facebook,
      icon: 'Facebook',
    },
  ],
} as const

// ---------------------------------------------------------------------------
// PAGE_PROBETRAINING — Unterseite /probetraining/
// ---------------------------------------------------------------------------

export const PAGE_PROBETRAINING = {
  meta: META.probetraining,
  hero: {
    badge: 'Kein Vertrag. Kein Druck.',
    headline: 'Trainier einen Tag mit uns.',
    subheadline:
      'Schau dir das Studio an, test die Geräte — und entscheide in Ruhe.',
  },
  ablauf: {
    headline: 'So läuft dein Probetraining ab',
    schritte: [
      {
        nummer: '01',
        titel: 'Termin vereinbaren',
        text: 'Ruf uns an oder schreib uns auf WhatsApp. Wir finden gemeinsam einen Termin, der zu dir passt — auch kurzfristig.',
      },
      {
        nummer: '02',
        titel: 'Ankomm & Einführung',
        text: 'Wir zeigen dir das Studio, erklären die Geräte und beantworten deine Fragen. Keine Hetzerei, kein Verkaufsgespräch.',
      },
      {
        nummer: '03',
        titel: 'Trainieren',
        text: 'Du trainierst so, wie es für dich passt. Unsere Trainer sind für Fragen da — aber lassen dich auch in Ruhe, wenn du das willst.',
      },
      {
        nummer: '04',
        titel: 'In Ruhe entscheiden',
        text: 'Du überlegst dir alles in deinem Tempo — ohne Druck, ohne Frist. Wir sind da, wenn du Fragen hast.',
      },
    ],
  },
  cta: {
    headline: 'Bereit für dein Probetraining?',
    subheadline: 'Mo–Fr 08:00–23:00, Sa–So 10:00–17:30 Uhr — komm einfach vorbei oder vereinbare vorher einen Termin.',
    ctaWhatsApp: {
      label: 'Per WhatsApp buchen',
      href: 'https://wa.me/4915737580001?text=Hallo%2C%20ich%20m%C3%B6chte%20ein%20Probetraining%20buchen.',
    },
    ctaTelefon: {
      label: 'Jetzt anrufen: 02324 33777',
      href: 'tel:+49232433777',
    },
  },
  testimonial: {
    text: '[TBD: Kurzes Testimonial von einem Mitglied, das über das Probetraining berichtet]',
    name: '[TBD: Echter Name]',
    datum: '[TBD]',
  },
} as const

// ---------------------------------------------------------------------------
// PAGE_MITGLIEDSCHAFT — Unterseite /mitgliedschaft/
// ---------------------------------------------------------------------------

export const PAGE_MITGLIEDSCHAFT = {
  meta: META.mitgliedschaft,
  hero: {
    badge: 'Transparente Preise',
    headline: 'Wähle deine Mitgliedschaft.',
    subheadline:
      'Alle Tarife. Dieselbe Leistung. Sauna, Kurse und Getränkeflat sind immer dabei.',
  },
  tarife: PREISE.tarife,
  anmeldegebuehrHinweis:
    'Einmalige Anmeldegebühr 49€ gilt für alle Tarife. Keine weiteren Kosten.',
  leistungsumfang: {
    headline: 'Was immer dabei ist',
    items: LEISTUNGEN.items,
  },
  interesseFormular: {
    headline: 'Interesse an einer Mitgliedschaft?',
    subheadline: 'Schreib uns kurz — wir melden uns innerhalb von 24 Stunden.',
    felder: [
      { name: 'vorname', label: 'Vorname', typ: 'text', pflicht: true },
      { name: 'nachname', label: 'Nachname', typ: 'text', pflicht: true },
      { name: 'email', label: 'E-Mail-Adresse', typ: 'email', pflicht: true },
      { name: 'telefon', label: 'Telefonnummer', typ: 'tel', pflicht: false },
      {
        name: 'tarif',
        label: 'Interessiert mich',
        typ: 'select',
        pflicht: false,
        optionen: ['Flex (55€/Monat)', 'Standard (45€/Monat)', 'Premium (35€/Monat)', 'Ich bin noch unentschieden'],
      },
      { name: 'nachricht', label: 'Fragen oder Anmerkungen', typ: 'textarea', pflicht: false },
    ],
    datenschutzText:
      'Ich habe die Datenschutzerklärung gelesen und bin damit einverstanden, dass meine Daten zur Bearbeitung meiner Anfrage verwendet werden.',
    submitLabel: 'Anfrage senden',
    successMessage: 'Danke! Wir melden uns innerhalb von 24 Stunden bei dir.',
    hinweis: 'Kein Vertragsabschluss über dieses Formular — du bekommst zunächst nur mehr Infos.',
  },
  fremdgehHinweis: {
    text: 'Bist du gerade noch woanders Mitglied?',
    linkLabel: 'Dann schau dir unsere Fremdgeh-Aktion an.',
    linkHref: '/fremdgeh-aktion/',
  },
} as const

// ---------------------------------------------------------------------------
// PAGE_KURSPLAN — Unterseite /kursplan/
// ---------------------------------------------------------------------------

export const PAGE_KURSPLAN = {
  meta: META.kursplan,
  hero: {
    badge: 'Inklusive in jeder Mitgliedschaft',
    headline: 'Dein Kursplan.',
    subheadline:
      'Alle Kurse ohne Anmeldung, ohne Aufpreis — einfach mitkommen.',
  },
  wochenplan: KURSPLAN.kurse,
  kurseBeschreibungen: [
    {
      name: 'Vinyasa-Yoga',
      beschreibung:
        'Fließende Bewegungsfolgen, die Kraft, Flexibilität und Atemkontrolle verbinden. Gut für Einsteiger und Fortgeschrittene.',
      level: 'Alle Level',
    },
    {
      name: 'Spinning',
      beschreibung:
        'Intensive Ausdauereinheit auf dem Rad — im Gruppenformat mit Musik und Motivation. Gelenkschonend und effektiv.',
      level: 'Alle Level',
    },
    {
      name: 'Wirbelsäulen-Gymnastik',
      beschreibung:
        'Sanfte Übungen zur Mobilisation und Stärkung der Rückenmuskulatur. Ideal für Menschen mit Rückenproblemen oder nach langen Sitztagen.',
      level: 'Einsteiger geeignet',
    },
    {
      name: 'Bauch-Express',
      beschreibung:
        'Kurze, intensive Einheit für die Rumpfmuskulatur. 30 Minuten, die sich bemerkbar machen.',
      level: 'Alle Level',
    },
    {
      name: 'Tabata',
      beschreibung:
        '20 Sekunden Vollgas, 10 Sekunden Pause — hochintensives Intervalltraining für maximalen Kalorienverbrauch.',
      level: 'Mittelstufe bis fortgeschritten',
    },
    {
      name: 'Yoga',
      beschreibung:
        'Klassisches Yoga mit Fokus auf Dehnung, Balance und Entspannung. Gut für Körper und Kopf.',
      level: 'Alle Level',
    },
    {
      name: 'Tae-Bo',
      beschreibung:
        'Kampfsport-inspiriertes Cardio-Training — mit Schlägen, Tritten und viel Bewegung. Macht Spaß und hält fit.',
      level: 'Alle Level',
    },
    {
      name: 'Rücken-Fit',
      beschreibung:
        'Gezieltes Training für einen starken Rücken — mit Kräftigungs- und Dehnübungen. Besonders empfohlen bei Rückenbeschwerden.',
      level: 'Einsteiger geeignet',
    },
    {
      name: 'Zumba',
      beschreibung:
        'Latin-inspiriertes Tanzfitness — schwitzen, lachen, Spaß haben. Kein Tanzkurs, keine Vorkenntnisse nötig.',
      level: 'Alle Level',
    },
    {
      name: 'Full Body Intervall',
      beschreibung:
        'Ganzkörper-Training mit Intervall-Struktur — Kraft und Ausdauer kombiniert.',
      level: 'Alle Level',
    },
    {
      name: 'Pilates',
      beschreibung:
        'Kontrolliertes Ganzkörpertraining mit Fokus auf Körpermitte, Haltung und tiefe Muskulatur.',
      level: 'Alle Level',
    },
  ],
  hinweis:
    'Kurszeiten können sich gelegentlich ändern. Aktuelle Zeiten am Tresen oder per WhatsApp erfragen.',
  ctaLabel: 'Probetraining buchen',
  ctaHref: '/probetraining/',
} as const

// ---------------------------------------------------------------------------
// PAGE_TEAM — Unterseite /team/
// ---------------------------------------------------------------------------

export const PAGE_TEAM = {
  meta: META.team,
  hero: {
    badge: 'Dein Team',
    headline: 'Dein Team. Dein Studio.',
    subheadline:
      'Kein anonymes Studio. Bei uns kümmern sich echte Menschen um dein Training — nicht nur beim ersten Termin.',
  },
  mitglieder: TEAM.mitglieder,
  werte: {
    headline: 'Was uns wichtig ist',
    items: [
      {
        icon: 'Heart',
        titel: 'Jeder ist willkommen',
        text: 'Egal ob 20 oder 70, Einsteiger oder Profi — niemand muss sich beweisen.',
      },
      {
        icon: 'UserCheck',
        titel: 'Persönliche Betreuung',
        text: 'Wir nehmen uns Zeit für dich — beim Einführungstermin, beim Trainingsplan und danach.',
      },
      {
        icon: 'Shield',
        titel: 'Keine Abzocke',
        text: 'Faire Preise, transparente Verträge, keine versteckten Kosten.',
      },
    ],
  },
  ctaLabel: 'Team kennenlernen — Probetraining buchen',
  ctaHref: '/probetraining/',
} as const

// ---------------------------------------------------------------------------
// PAGE_FREMDGEH — Unterseite /fremdgeh-aktion/
// ---------------------------------------------------------------------------

export const PAGE_FREMDGEH = {
  meta: META.fremdgehAktion,
  hero: {
    badge: 'Sonderaktion',
    headline: '3 Monate für 0€.',
    subheadline:
      'Du bist noch woanders Mitglied? Komm trotzdem. Drei Monate Fitness Factory kostenlos testen — nur die Anmeldegebühr fällt an.',
  },
  erklaerung: {
    headline: 'Was ist die Fremdgeh-Aktion?',
    absatz1:
      'Du hast noch einen laufenden Vertrag bei einem anderen Fitnessstudio in der Region? Kein Problem. Wir lassen dich trotzdem rein — und zwar 3 Monate lang kostenlos.',
    absatz2:
      'Warum machen wir das? Weil wir wissen, dass du nach diesen 3 Monaten nicht mehr weg willst.',
    absatz3:
      'Du zahlst einmalig die Anmeldegebühr von 49€. Die ersten 3 Monate kosten dich 0€. Danach läuft ein reguläres Mitgliedschaftsmodell (Flex, Standard oder Premium — du wählst).',
  },
  bedingungen: {
    headline: 'Bedingungen',
    items: [
      'Gültig bei Vorlage eines bestehenden, aktiven Vertrags bei einem anderen Fitnessstudio',
      'Vertrag muss zum Zeitpunkt der Anmeldung noch laufen',
      'Gilt für Neukunden der Fitness Factory Hattingen',
      'Einmalige Anmeldegebühr 49€',
      'Nach den 3 Monaten: Übergang in reguläre Mitgliedschaft (Flex ab 55€, Standard ab 45€, Premium ab 35€)',
    ],
    hinweis:
      'Fragen zu den Bedingungen? Ruf uns an oder schreib uns — wir klären das unkompliziert.',
  },
  cta: {
    headline: 'Jetzt wechseln',
    subheadline: 'Bring deinen bestehenden Vertrag mit. Wir kümmern uns um den Rest.',
    ctaWhatsApp: {
      label: 'Per WhatsApp anfragen',
      href: 'https://wa.me/4915737580001?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20die%20Fremdgeh-Aktion.',
    },
    ctaTelefon: {
      label: 'Anrufen: 02324 33777',
      href: 'tel:+49232433777',
    },
  },
} as const

// ---------------------------------------------------------------------------
// PAGE_FAQ — Unterseite /faq/ (vollständig, 15+ Fragen)
// ---------------------------------------------------------------------------

export const PAGE_FAQ = {
  meta: META.faq,
  hero: {
    badge: 'FAQ',
    headline: 'Alle Fragen. Alle Antworten.',
    subheadline:
      'Was du wissen willst, bevor du Mitglied wirst — klar und direkt beantwortet.',
  },
  kategorien: [
    {
      kategorie: 'Mitgliedschaft & Preise',
      items: [
        {
          frage: 'Was kostet eine Mitgliedschaft?',
          antwort:
            'Flex: 55€/Monat (monatlich kündbar), Standard: 45€/Monat (12 Monate Laufzeit), Premium: 35€/Monat (24 Monate Laufzeit). Dazu kommt einmalig eine Anmeldegebühr von 49€. Keine weiteren Kosten.',
        },
        {
          frage: 'Was ist in der Mitgliedschaft enthalten?',
          antwort:
            'Alles: Zugang zu allen Geräten, alle Live-Kurse, Sauna, Getränkeflat, kostenlose Duschen und Parkplätze, Ernährungsberatung und individueller Trainingsplan. Kein Aufpreis für irgendetwas davon.',
        },
        {
          frage: 'Gibt es versteckte Kosten?',
          antwort:
            'Nein. Du zahlst deinen Monatsbeitrag und einmalig 49€ Anmeldegebühr. Das war es.',
        },
        {
          frage: 'Kann ich monatlich kündigen?',
          antwort:
            'Mit dem Flex-Tarif ja — jederzeit zum Monatsende kündbar. Standard und Premium laufen 12 bzw. 24 Monate. Für die längere Bindung bekommst du deutlich günstigere Monatsbeiträge.',
        },
        {
          frage: 'Wie kündige ich meine Mitgliedschaft?',
          antwort:
            'Schriftlich — per Brief, E-Mail oder persönlich vor Ort. Achte auf die Kündigungsfristen deines Tarifs. Details findest du in deinem Mitgliedsvertrag oder einfach direkt bei uns anfragen.',
        },
        {
          frage: 'Gibt es einen Studentenrabatt oder ermäßigte Tarife?',
          antwort:
            '[TBD: Vom Kunden — falls Rabatte existieren hier eintragen, ansonsten: "Derzeit bieten wir keine pauschalen Sonderkonditionen an. Sprich uns persönlich an — wir finden gemeinsam eine Lösung."]',
        },
        {
          frage: 'Was ist die Fremdgeh-Aktion?',
          antwort:
            'Du hast noch einen laufenden Vertrag bei einem anderen Studio? Kein Problem. Bei uns trainierst du die ersten 3 Monate für 0€ — nur die einmalige Anmeldegebühr (49€) fällt an. Mehr dazu auf unserer Fremdgeh-Aktion-Seite.',
        },
      ],
    },
    {
      kategorie: 'Probetraining',
      items: [
        {
          frage: 'Wie buche ich ein Probetraining?',
          antwort:
            'Ruf uns an (02324 33777) oder schreib uns auf WhatsApp (+49 1573 7580001). Du kannst auch einfach vorbeikommen — wir nehmen uns Zeit für dich.',
        },
        {
          frage: 'Was kostet das Probetraining?',
          antwort:
            'Das Probetraining ist kostenlos.',
        },
        {
          frage: 'Muss ich nach dem Probetraining Mitglied werden?',
          antwort:
            'Nein. Du kommst, trainierst, schaust dir alles an — und entscheidest dann in Ruhe. Kein Druck, keine Verkaufsgespräche.',
        },
        {
          frage: 'Was soll ich zum Probetraining mitbringen?',
          antwort:
            'Sportkleidung, Sportschuhe, ein Handtuch und eine Wasserflasche. Falls du in die Sauna möchtest, auch ein großes Badetuch. Mehr brauchst du nicht.',
        },
      ],
    },
    {
      kategorie: 'Ausstattung & Leistungen',
      items: [
        {
          frage: 'Was kostet die Sauna extra?',
          antwort:
            'Nichts. Die Sauna ist in jeder Mitgliedschaft inklusive — egal welchen Tarif du wählst.',
        },
        {
          frage: 'Muss ich Kurse vorher anmelden?',
          antwort:
            'Nein. Du kommst einfach zur Kurszeit dazu. Keine Anmeldung, kein Aufpreis.',
        },
        {
          frage: 'Wie sind die Öffnungszeiten?',
          antwort:
            'Montag bis Freitag von 08:00 bis 23:00 Uhr, Samstag und Sonntag von 10:00 bis 17:30 Uhr.',
        },
        {
          frage: 'Gibt es kostenlose Parkplätze?',
          antwort:
            'Ja. Direkt vor dem Studio — kostenlos und in der Regel ausreichend Plätze vorhanden.',
        },
        {
          frage: 'Was für Geräte habt ihr?',
          antwort:
            '[TBD: Vom Kunden — konkrete Gerätebeschreibung, z.B. "Cardiogeräte (Laufband, Crosstrainer, Fahrrad), freie Gewichte, Kraftgeräte"]',
        },
      ],
    },
    {
      kategorie: 'Für wen ist das Studio geeignet?',
      items: [
        {
          frage: 'Ich bin Anfänger und habe noch nie trainiert. Ist das etwas für mich?',
          antwort:
            'Ja. Wir haben Mitglieder von 18 bis 70+, Einsteiger und langjährige Sportler. Wir erstellen dir einen Trainingsplan, der zu dir passt — nicht zu einem Fitness-Profi. Und unsere Trainer sind immer ansprechbar.',
        },
        {
          frage: 'Gibt es Kurse für ältere Menschen oder bei Rückenproblemen?',
          antwort:
            'Ja. Wirbelsäulen-Gymnastik, Pilates, Yoga und Rücken-Fit sind explizit für alle Level ausgelegt und besonders geeignet bei Rückenbeschwerden oder nach langen Sitztagen.',
        },
        {
          frage: 'Sind Kurse für alle Level geeignet?',
          antwort:
            'Die meisten unserer Kurse sind für alle Level ausgelegt. Tabata und Tae-Bo sind etwas intensiver — wer neu einsteigt, kann aber auch dort sein eigenes Tempo gehen.',
        },
      ],
    },
    {
      kategorie: 'Kontakt & Anreise',
      items: [
        {
          frage: 'Wie komme ich zum Studio?',
          antwort:
            'Wir sind im Stadtteil Holthausen: Im Vogelsang 95, 45527 Hattingen. Mit dem Auto direkt vor der Tür parken (kostenlos). Mit Bus oder Bahn: [TBD: Vom Kunden — nächste Haltestelle ergänzen].',
        },
        {
          frage: 'Wie kann ich euch am schnellsten erreichen?',
          antwort:
            'WhatsApp ist am schnellsten: +49 1573 7580001. Telefonisch erreichst du uns auf 02324 33777 während der Öffnungszeiten.',
        },
      ],
    },
  ],
} as const

// ---------------------------------------------------------------------------
// PAGE_IMPRESSUM — Unterseite /impressum/
// ---------------------------------------------------------------------------

export const PAGE_IMPRESSUM = {
  meta: META.impressum,
  headline: 'Impressum',
  inhalt: {
    angabenGemaessTmg: {
      ueberschrift: 'Angaben gemäß § 5 TMG',
      firmenname: 'Fitness Factory Hattingen GmbH',
      adresse: 'Im Vogelsang 95\n45527 Hattingen',
    },
    vertreten: {
      ueberschrift: 'Vertreten durch',
      text: '[TBD: Vom Kunden — Name(n) der Geschäftsführung]',
    },
    kontakt: {
      ueberschrift: 'Kontakt',
      telefon: '02324 33777',
      email: 'fitness-factory-hattingen@gmx.de',
    },
    registereintrag: {
      ueberschrift: 'Registereintrag',
      text: '[TBD: Vom Kunden — Eintragung im Handelsregister, Registergericht und Registernummer]',
    },
    umsatzsteuerIdNr: {
      ueberschrift: 'Umsatzsteuer-Identifikationsnummer',
      text: '[TBD: Vom Kunden — USt-IdNr. gemäß § 27a UStG]',
    },
    verantwortlichFuerInhalte: {
      ueberschrift: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
      text: '[TBD: Vom Kunden — Name und Anschrift der verantwortlichen Person]',
    },
    streitschlichtung: {
      ueberschrift: 'EU-Streitschlichtung',
      text: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.',
      hinweis: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    },
    haftungFuerInhalte: {
      ueberschrift: 'Haftung für Inhalte',
      text: 'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.\n\nVerpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
    },
    haftungFuerLinks: {
      ueberschrift: 'Haftung für Links',
      text: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.\n\nEine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
    },
    urheberrecht: {
      ueberschrift: 'Urheberrecht',
      text: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.\n\nSoweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.',
    },
  },
} as const

// ---------------------------------------------------------------------------
// PAGE_DATENSCHUTZ — Unterseite /datenschutz/
// ---------------------------------------------------------------------------

export const PAGE_DATENSCHUTZ = {
  meta: META.datenschutz,
  headline: 'Datenschutzerklärung',
  letzteAktualisierung: '[TBD: Datum der letzten Aktualisierung]',
  abschnitte: [
    {
      ueberschrift: '1. Verantwortlicher',
      text: 'Verantwortlicher im Sinne der DSGVO ist:\n\nFitness Factory Hattingen GmbH\nIm Vogelsang 95\n45527 Hattingen\n\nTelefon: 02324 33777\nE-Mail: fitness-factory-hattingen@gmx.de\n\nGeschäftsführung: [TBD: Vom Kunden — Name der Geschäftsführung]',
    },
    {
      ueberschrift: '2. Erhebung und Speicherung personenbezogener Daten',
      text: 'Beim Besuch unserer Website werden automatisch folgende Daten erhoben und in Server-Logfiles gespeichert:\n\n- Browsertyp und Browserversion\n- Verwendetes Betriebssystem\n- Referrer-URL\n- IP-Adresse des zugreifenden Rechners\n- Uhrzeit der Serveranfrage\n\nDiese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren und fehlerfreien Betrieb der Website).',
    },
    {
      ueberschrift: '3. Kontaktaufnahme',
      text: 'Wenn du uns per E-Mail, Telefon oder Kontaktformular kontaktierst, speichern wir deine Angaben zur Bearbeitung deiner Anfrage und für eventuelle Anschlussfragen. Diese Daten werden nicht ohne deine Einwilligung weitergegeben. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Daten werden gelöscht, sobald sie für die Zweckerreichung nicht mehr erforderlich sind.',
    },
    {
      ueberschrift: '4. WhatsApp-Kommunikation',
      text: 'Wir bieten Kontaktaufnahme über WhatsApp an. WhatsApp ist ein Dienst der WhatsApp Ireland Limited. Wenn du uns über WhatsApp kontaktierst, werden deine Nachrichten und deine Telefonnummer durch WhatsApp verarbeitet. Für die Datenverarbeitung durch WhatsApp gelten die Datenschutzbestimmungen von WhatsApp (Meta). Wir empfehlen, die WhatsApp-Datenschutzerklärung unter https://www.whatsapp.com/legal/privacy-policy zu lesen. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch aktive Kontaktaufnahme).',
    },
    {
      ueberschrift: '5. Google Maps',
      text: 'Wir nutzen auf dieser Website Google Maps zur Darstellung von Karten und Anfahrtsbeschreibungen. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Mit der Nutzung von Google Maps können Daten, insbesondere deine IP-Adresse, an Google übertragen werden. Mehr dazu in der Google-Datenschutzerklärung: https://policies.google.com/privacy. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.',
    },
    {
      ueberschrift: '6. Cookies',
      text: 'Diese Website verwendet technisch notwendige Cookies, die für den Betrieb der Website erforderlich sind. Sie können die Speicherung von Cookies in Ihrem Browser deaktivieren. Bei vollständiger Deaktivierung können einige Funktionen der Website eingeschränkt sein. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.',
    },
    {
      ueberschrift: '7. Deine Rechte',
      text: 'Du hast gegenüber uns folgende Rechte hinsichtlich der dich betreffenden personenbezogenen Daten:\n\n- Recht auf Auskunft (Art. 15 DSGVO)\n- Recht auf Berichtigung (Art. 16 DSGVO)\n- Recht auf Löschung (Art. 17 DSGVO)\n- Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)\n- Recht auf Datenübertragbarkeit (Art. 20 DSGVO)\n- Recht auf Widerspruch (Art. 21 DSGVO)\n\nZur Ausübung dieser Rechte wende dich an: fitness-factory-hattingen@gmx.de\n\nDu hast außerdem das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Die zuständige Aufsichtsbehörde für NRW ist die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (ldi.nrw.de).',
    },
    {
      ueberschrift: '8. Datensicherheit',
      text: 'Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um deine Daten gegen zufällige oder vorsätzliche Manipulationen, Verlust, Zerstörung oder Zugriff unberechtigter Personen zu schützen. Diese Maßnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert.',
    },
    {
      ueberschrift: '9. Aktualität und Änderung dieser Datenschutzerklärung',
      text: 'Diese Datenschutzerklärung ist aktuell gültig. Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.',
    },
  ],
} as const

// ---------------------------------------------------------------------------
// ÜBER UNS — Studio-Vorstellung
// ---------------------------------------------------------------------------

export const UEBER_UNS = {
  sectionBadge: 'Über uns',
  headline: 'Dein Studio in Holthausen.',
  subheadline:
    'Die Fitness Factory ist kein anonymes Großstudio. Bei uns kennst du die Trainer, die Trainer kennen dich — und dein Training ist nie Zufall.',
  geschichte: {
    headline: 'Familiär statt Massenabfertigung.',
    text: 'Die Fitness Factory Hattingen steht für persönliche Betreuung, ehrliche Preise und ein Training, das zu dir passt. Egal ob du gerade erst anfängst oder seit Jahren trainierst — bei uns bekommst du die Unterstützung, die du brauchst.',
    text2: 'Unser Studio in Hattingen-Holthausen bietet auf großzügiger Fläche alles, was du für ein effektives Training brauchst: modernen Gerätepark, freie Gewichte, Kursraum, Sauna und eine entspannte Lounge. Und das Beste: Alles ist in deiner Mitgliedschaft inklusive.',
  },
  usps: [
    {
      icon: 'Users',
      headline: 'Persönliche Betreuung',
      text: 'Trainingsplan und Ernährungsberatung — bei uns inklusive, nicht gegen Aufpreis.',
    },
    {
      icon: 'Package',
      headline: 'All-inclusive',
      text: 'Sauna, Getränkeflat, Live-Kurse, Duschen, Parkplätze — alles drin, keine versteckten Kosten.',
    },
    {
      icon: 'Heart',
      headline: 'Für jeden etwas',
      text: 'Von Yoga bis Tabata, vom Anfänger bis zum Fortgeschrittenen — wir bieten ein breites Programm für alle Altersgruppen.',
    },
    {
      icon: 'MapPin',
      headline: 'Zentral in Holthausen',
      text: 'Im Vogelsang 95, mit kostenlosen Parkplätzen direkt vor der Tür. Gut erreichbar aus Hattingen, Bochum-Linden und Sprockhövel.',
    },
  ],
  ctaText: 'Überzeug dich selbst — bei einem kostenlosen Probetraining.',
} as const

// ---------------------------------------------------------------------------
// GALERIE — Studio-Fotos
// ---------------------------------------------------------------------------

export const GALERIE_PAGE = {
  sectionBadge: 'Galerie',
  headline: 'Schau dich um.',
  subheadline:
    'Mach dir ein Bild von deinem zukünftigen Studio — Gerätepark, Kursraum, Sauna und mehr.',
  kategorien: [
    { id: 'studio', label: 'Studio', beschreibung: 'Moderner Gerätepark mit Kraft- und Cardiobereich' },
    { id: 'sauna', label: 'Sauna', beschreibung: 'Entspannung nach dem Training — in jeder Mitgliedschaft inklusive' },
    { id: 'lounge', label: 'Lounge', beschreibung: 'Ankommen, Getränk holen, durchstarten' },
  ],
  ctaText: 'Gefällt dir, was du siehst? Teste uns kostenlos.',
} as const

// ---------------------------------------------------------------------------
// KONTAKT PAGE — Vollständige Kontaktseite
// ---------------------------------------------------------------------------

export const KONTAKT_PAGE = {
  sectionBadge: 'Kontakt',
  headline: 'Wir sind für dich da.',
  subheadline:
    'Ruf uns an, schreib uns über WhatsApp oder komm einfach vorbei. Wir freuen uns auf dich!',
  anfahrt: {
    headline: 'Anfahrt',
    pkw: 'Aus Richtung Hattingen-Mitte: B51 Richtung Holthausen, Im Vogelsang abbiegen. Kostenlose Parkplätze direkt vor der Tür.',
    oepnv: 'Bushaltestelle "Holthausen Kirche" — von dort ca. 5 Minuten Fußweg.',
  },
} as const
