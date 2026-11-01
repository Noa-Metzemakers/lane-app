# LANE 2.3 — Updates op gsm

## Installatie op GitHub Pages
Upload **de inhoud** van deze map (index.html, sw.js, manifest.webmanifest, icons/) in de hoofdmap van je repository. Commit alle wijzigingen. Controleer of de laatste Pages-deployment is geslaagd.

## Updatemechanisme
- Nieuwe service worker versie `lane-shell-v2.3.0`.
- Bij app openen, terugkeren naar voorgrond, online komen en elke vijf minuten actief: controleren op updates.
- Als een nieuwe service worker is geïnstalleerd, verschijnt een balk **Nieuwe versie beschikbaar → Nu bijwerken**. De gebruiker bepaalt wanneer er herladen wordt.
- Navigaties halen bij internet de nieuwste HTML op; offline wordt de opgeslagen HTML gebruikt.
- Taken, geplande trainingen en herstelgegevens blijven in `localStorage`. Maak vooraf via de app een JSON-back-up.

## Belangrijke beperkingen
Updates zijn niet instant wanneer de app volledig gesloten is. GitHub Pages heeft geen pushmechanisme. Een reeds geïnstalleerde home-screen app moet eerst geopend of naar de voorgrond gebracht worden. Bij een eerste upgrade vanaf oudere versies kan de oude cache nog één keer interveniëren; open zo nodig de pagina in de normale browser, ververs en start daarna de homescreen-app. Het nieuwe mechanisme maakt volgende upgrades betrouwbaarder.

Voor elke volgende versie: wijzig **CACHE** in `sw.js`, en de weergegeven versie in `index.html`. De update verschijnt pas nadat je de nieuwe bestanden naar GitHub Pages geüpload hebt.
