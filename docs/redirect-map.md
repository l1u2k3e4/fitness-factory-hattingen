# Redirect-Map — WordPress → React

> **Projekt:** Fitness Factory Hattingen — Website-Relaunch  
> **Erstellt:** 2026-04-02 | Prompt 2.10  
> **Zweck:** Vollständige Übersicht aller alten WordPress-URLs und ihre Ziel-Redirects

---

## Übersicht

Beim Wechsel von WordPress/Elementor zur neuen React-Website müssen alle alten URLs per 301-Redirect auf die neuen Ziel-URLs umgeleitet werden. Dies verhindert:

- Verlust von SEO-Ranking (301 überträgt Link-Juice)
- Tote Links in sozialen Medien, E-Mails, Lesezeichen
- Schlechte User Experience für bestehende Besucher

---

## Redirect-Tabelle

### Hauptseiten (301 → neue Route)

| Alte URL (WordPress) | Neue URL (React) | Typ | Priorität |
|---|---|---|---|
| `/` | `/` | Identisch | — |
| `/home/` | `/` | 301 | HOCH |
| `/class-timetable/` | `/kursplan/` | 301 | HOCH |
| `/kurse/` | `/kursplan/` | 301 | HOCH |
| `/kursplan/` | `/kursplan/` | Identisch | — |
| `/mitgliedschaft/` | `/mitgliedschaft/` | Identisch | — |
| `/mitgliedschaften/` | `/mitgliedschaft/` | 301 | MITTEL |
| `/preise/` | `/mitgliedschaft/` | 301 | MITTEL |
| `/anmeldung/` | `/probetraining/` | 301 | HOCH |
| `/probetraining/` | `/probetraining/` | Identisch | — |
| `/team/` | `/team/` | Identisch | — |
| `/trainer/` | `/team/` | 301 | MITTEL |
| `/kontakt/` | `/kontakt/` | Identisch | — |
| `/contact/` | `/kontakt/` | 301 | NIEDRIG |
| `/impressum/` | `/impressum/` | Identisch | — |
| `/datenschutz/` | `/datenschutz/` | Identisch | — |
| `/datenschutzerklarung/` | `/datenschutz/` | 301 | NIEDRIG |
| `/agb/` | `/agb/` | Identisch | — |

### WordPress-interne Seiten (410 Gone — nie neue Website)

| Alte URL (WordPress) | Typ | Begründung |
|---|---|---|
| `/wp-admin/` | 410 | WordPress-Admin — nicht mehr vorhanden |
| `/wp-admin/.*` | 410 | WordPress-Admin Unterpfade |
| `/wp-login.php` | 410 | WordPress-Login |
| `/wp-content/.*` | 410 | WordPress-Medienpfade |
| `/wp-includes/.*` | 410 | WordPress-Core-Dateien |
| `/xmlrpc.php` | 410 | XML-RPC-API (Security-Risiko) |
| `/feed/` | 410 | RSS-Feed — kein Blog mehr |
| `/feed/rss/` | 410 | RSS-Feed Variante |
| `/comments/feed/` | 410 | Kommentar-Feed |

### Blog-Kategorien (410 Gone — kein Blog in neuer Website)

| Alte URL | Typ | Begründung |
|---|---|---|
| `/category/.*` | 410 | WordPress-Kategorien |
| `/category/lifestyle/` | 410 | Lifestyle-Blog-Kategorie |
| `/category/fitness/` | 410 | Fitness-Blog-Kategorie |
| `/tag/.*` | 410 | WordPress-Tags |
| `/author/.*` | 410 | WordPress-Autoren-Seiten |
| `/page/[0-9]+/` | 410 | WordPress-Seitennavigation |

### Query-String-Redirects (WordPress page IDs)

| Alte URL | Neue URL | Typ |
|---|---|---|
| `/?page_id=2` | `/` | 301 |
| `/?page_id=*` | `/` | 301 (Fallback) |
| `/?p=*` | `/` | 301 (Fallback für Posts) |
| `/?cat=*` | `/` | 301 (Fallback für Kategorien) |

---

## .htaccess Implementierung (ALL-INKL.COM)

Die folgenden Regeln sind bereits in `public/.htaccess` integriert:

```apache
# WordPress-Seiten → React-Routen (301)
RewriteRule ^home/?$                      /                     [R=301,L]
RewriteRule ^class-timetable/?$           /kursplan/            [R=301,L]
RewriteRule ^kurse/?$                     /kursplan/            [R=301,L]
RewriteRule ^mitgliedschaft/?$            /mitgliedschaft/      [R=301,L]
RewriteRule ^anmeldung/?$                 /probetraining/       [R=301,L]
RewriteRule ^probetraining/?$             /probetraining/       [R=301,L]
RewriteRule ^team/?$                      /team/                [R=301,L]
RewriteRule ^kontakt/?$                   /kontakt/             [R=301,L]
RewriteRule ^impressum/?$                 /impressum/           [R=301,L]
RewriteRule ^datenschutz/?$               /datenschutz/         [R=301,L]

# WordPress-interne Seiten (410 Gone)
RewriteRule ^wp-admin/?$                  -                     [R=410,L]
RewriteRule ^wp-login\.php$               -                     [R=410,L]
RewriteRule ^wp-content/.*$               -                     [R=410,L]
RewriteRule ^wp-includes/.*$              -                     [R=410,L]
RewriteRule ^xmlrpc\.php$                 -                     [R=410,L]
RewriteRule ^feed/?$                      -                     [R=410,L]
RewriteRule ^category/.*$                 -                     [R=410,L]
RewriteRule ^tag/.*$                      -                     [R=410,L]
RewriteRule ^author/.*$                   -                     [R=410,L]
```

---

## Google Search Console — Nach dem Go-Live

Nach der DNS-Umstellung in **Google Search Console**:

1. Alte URLs prüfen: `URL-Prüfung` für die wichtigsten alten Seiten
2. Bestätigen, dass 301-Redirects erkannt werden
3. Sitemap einreichen: `https://fitness-factory-hattingen.de/sitemap.xml`
4. Crawling-Fehler (410) überwachen — sollten nach Index-Update verschwinden
5. Rankings nach 2–4 Wochen prüfen — leichter temporärer Rückgang ist normal

---

## Wichtige Hinweise

- **301 überträgt ~90% des Link-Juice** — SEO-Rankings bleiben erhalten
- **410 ist besser als 404** — Google versteht "permanent weg" sofort, 404 wird wiederholt gecrawlt
- **Monitoring:** Screaming Frog / Ahrefs nach Launch einsetzen, um Broken Links zu finden
- **Google Cache:** 301-Redirects werden von Google innerhalb von 1–4 Wochen übernommen
