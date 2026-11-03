LANE 2.7.0 — Cloud & Safety (eerste release)

Gebaseerd op LANE 2.6.6, geen schemawijzigingen.

Nieuw:
- Download cloud-back-up rechtstreeks uit Supabase (alleen lezen).
- Download recentste automatische lokale veiligheidskopie.
- Handmatig synchroniseren haalt cloudgegevens op als er geen lokale wijzigingen zijn; het doet geen zinloze upload.
- Wijzigingen tijdens een lopende upload blijven gemarkeerd en worden opnieuw opgeslagen.
- Bij het terugkeren online kiest LANE veilig tussen upload en ophalen.
- Serviceworker-versie en appversie zijn 2.7.0.

VOOR PUBLICATIE:
1. Exporteer JSON via LANE 2.6.6 op laptop en Safari, bewaar twee kopieen.
2. Test bij voorkeur eerst op een afzonderlijke GitHub Pages-testsite en Supabase-testproject.
3. Maak een Git-tag/commit van werkende versie 2.6.6 zodat rollback mogelijk is.
4. Upload index.html en sw.js naar de ROOT van je repo. config.js blijft onaangeroerd.
5. Test laptop -> cloud -> Safari en Safari -> cloud -> laptop, plus beide backupknoppen.
6. Test geen gelijktijdige wijzigingen totdat conflictresolutie is ontwikkeld.

NIET IN DEZE VERSIE: automatische merge van conflicten, offline wachtrij, realtime samenwerking, Dashboard 2.0, Focus of Swim Analytics. Deze volgen in latere releases.

Bij conflict: exporteer JSON op beide apparaten; NIET resetten, herinstalleren of cloudrij handmatig overschrijven.
