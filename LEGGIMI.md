# Storia di Minecraft (Remotion)

1. Installa Node.js (versione 18 o più recente).
2. Nella cartella del progetto: `npm install`
3. Anteprima con editor: `npm run dev`
4. Video finale: `npm run render` → esce in `out/storia-minecraft.mp4`

Testi, anni e colori: `src/data.ts`.
Per aggiungere la musica: metti `musica.mp3` in `public/` e dentro `MinecraftStory` aggiungi
`<Audio src={staticFile('musica.mp3')} />` (import da `remotion`).
