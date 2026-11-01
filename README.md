# LANE 2.6 — Accounts en synchronisatie (Supabase)

Dit is een *voorbereide* versie van LANE met e-mailregistratie, login en synchronisatie. Er is **nog geen Supabase-project gekoppeld**. De beheerder moet dat eenmalig instellen voordat gebruikers kunnen registreren en synchroniseren.

## Activeren (door eigenaar)

1. Maak een gratis Supabase-project: https://supabase.com/dashboard
2. Open **SQL Editor** en voer de inhoud van `schema.sql` uit. De database heeft Row Level Security: gebruikers kunnen alleen hun eigen rij lezen en wijzigen.
3. Onder **Authentication → Providers → Email**, laat e-mail/wachtwoord ingeschakeld en kies of bevestigingsmail verplicht is. Voor publieke apps: gebruik e-mailverificatie en CAPTCHA/rate-limiting waar beschikbaar.
4. Onder **Authentication → URL Configuration**, vul als **Site URL** in: `https://noa-metzemakers.github.io/lane-app/`. Voeg hetzelfde adres indien nodig toe als redirect URL.
5. Onder **Project Settings → API** (of **Connect**) vind je de Project URL en de **publishable/anon key**. Open `config.js` en vervang de twee placeholders. Gebruik **nooit** je `service_role` of secret key in de browser.
6. Upload de inhoud van deze map naar je GitHub Pages-repository, inclusief `config.js`, `schema.sql` (mag in repo staan) en alle afbeeldingen. Commit de wijzigingen.
7. Zorg dat het project gepubliceerd is. Open LANE via een browser en klik op **☁ Inloggen**. Registreer een account met e-mail en wachtwoord. Indien bevestiging vereist is, bevestig via e-mail.
8. Log met dezelfde account in op de gsm en de computer om dezelfde gegevens te gebruiken.

## Hoe het werkt

- Niet-ingelogd: LANE kan lokaal blijven werken.
- Eerste login: als de account nog leeg is en dit apparaat lokale data bevat, vraagt LANE of je die bestaande data wilt migreren.
- Na login: taken, afspraken, studie, zwemtrainingen, herstel en importresultaten worden in de persoonlijke cloudrij opgeslagen.
- Beveiliging: elke rij is aan `auth.uid()` gekoppeld; RLS beschermt gebruikersdata.
- De PDF-bestanden zelf worden **niet** naar de cloud geüpload: alleen de uitgelezen trainingsgegevens die in de app zijn opgeslagen.
- Voor het live binnenhalen van wijzigingen via Supabase Realtime moet je `lane_user_data` in Supabase bij **Database → Publications** aan `supabase_realtime` toevoegen. Anders wordt bij heropenen of hervatten ververst.
- Maak vóór je overschakelt een JSON-back-up in de oude LANE-versie.

## Beperkingen

Dit is een werkend integratieskelet, geen volledig geteste productieomgeving. De synchronisatie bewaart voorlopig één JSON-snapshot per gebruiker met *last write wins*. Als je tegelijkertijd op meerdere apparaten werkt, kan de laatste upload wijzigingen op het andere apparaat overschrijven. Gebruik voorlopig bij voorkeur één actief apparaat tegelijk. Voor productie moeten we per taak/trainingsrecord synchroniseren, offline-wijzigingen robuust samenvoegen en end-to-end integratietests uitvoeren. De login is niet actief totdat Supabase is geconfigureerd en de site is gepubliceerd.
