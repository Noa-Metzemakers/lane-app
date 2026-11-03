LANE 2.9.0 — FOCUS & STUDY (TESTRELEASE)

NIEUW
- Focus timer: studeren tot een zelfgekozen einduur OF voor een vaste tijd (5–360 min).
- Vak en optioneel concrete studietaak koppelen aan de sessie.
- Pauzeren, hervatten, eerder stoppen en werkelijke minuten bevestigen.
- Actieve timer op hetzelfde toestel behouden na afsluiten/heropenen van Safari.
- Focussessie verschijnt als studiesessie in de bestaande dagplanner en weekoverzichten.
- Weekgrafiek werkelijk gestudeerde minuten per dag; klik naar daggeschiedenis.
- Historiek van de laatste bevestigde studiesessies, met vak en eventueel taak.
- De 2.8 dagscore (/100) blijft optioneel en staat standaard uit.

VEILIGHEID & BEPERKINGEN
- Bestaande `lane_os_v1` data en JSON-snapshot in Supabase worden behouden.
- Geen SQL-migratie en geen nieuwe rechten vereist; cloudlogica ongewijzigd.
- Alleen het start-/pauze-/hervatmoment van de lopende timer staat lokaal opgeslagen.
  De timer is toestelgebonden: wissel tijdens een sessie niet van toestel.
- Reeds gemaakte focusblokken worden met de bestaande app-datastructuur opgeslagen.
- Tijdsregistratie wordt pas gesynchroniseerd na bevestigen via `Afronden & bewaren`.
- Safari voert geen betrouwbare achtergrondtimers uit. Na opnieuw openen berekent LANE
  de verstreken kloktijd; pas de geregistreerde minuten indien nodig aan.
- De timer stopt bij de ingestelde doeltijd; er vindt GEEN automatische markering als
  voltooid plaats. Na hervatten/heropenen bevestig je zelf je werkelijke minuten.
- Geen automatische samenvoeging van conflicten op meerdere apparaten. Vermijd
  gelijktijdige wijzigingen en maak back-ups op laptop en Safari.

GECONTROLEERDE INSTALLATIE
1. Maak JSON-back-ups vanaf laptop EN iPhone Safari, bewaar ze apart.
2. Download indien mogelijk ook een cloud-back-up vanuit LANE Account.
3. Bewaar de huidige 2.8.0 `index.html` en `sw.js` als hersteldepot.
4. Test liefst eerst op een aparte GitHub Pages-repo met aparte Supabase-testdata.
5. Vervang uitsluitend `index.html` en `sw.js` in de root van de repo.
6. Laat bestaande `config.js`, icoontjes, manifest, branding en database intact.
7. Controleer succesvolle GitHub Pages Action en zie LANE 2.9.0 in de paginatitel.
8. Maak een korte sessie van 5 minuten, rond af, controleer studievoortgang.
9. Open laptop én Safari na elkaar; test of de geregistreerde sessie verschijnt.
10. Blijf voorlopig via Safari werken op iPhone; homescreen-conflicten zijn niet definitief opgelost.

HERSTELLEN
Plaats de 2.8.0-bestanden terug en maak vóór iedere terugzetting een nieuwe
JSON-back-up. Extra velden van 2.9.0 zijn optioneel. Cloudgegevens niet resetten.
