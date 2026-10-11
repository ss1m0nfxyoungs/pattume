# Storia di Minecraft (Remotion) - 16:9, 10 minuti

1. Installa Node.js (versione 18 o più recente).
2. Nella cartella del progetto: `npm install`
3. Anteprima con editor: `npm run dev`
4. Video finale: `npm run render` → esce in `out/storia-minecraft.mp4`
   (18.000 frame in Full HD: il render richiede un po', anche decine di minuti).

Testi, anni, capitoli e blocchi: `src/data.ts` (40 scene da 15 secondi).
Durata scena: `SCENE_FRAMES` in `src/data.ts`. Durata totale = numero scene × durata scena.
Per aggiungere la musica: metti `musica.mp3` in `public/` e dentro `MinecraftStory` aggiungi
`<Audio src={staticFile('musica.mp3')} />` (import da `remotion`).
