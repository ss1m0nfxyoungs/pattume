# Video psichedelico con testi

## 1. Preparazione
1. `npm install`
2. Metti la canzone in `public/song.mp3` (se si chiama diversamente, cambia `AUDIO_FILE` in `src/config.ts`).
3. In `src/config.ts` metti il BPM reale della canzone.

## 2. Tempi dei testi con Whisper
1. `pip install openai-whisper`
2. `whisper public/song.mp3 --model medium --language it --output_format json --output_dir whisper`
3. `npm run lyrics -- whisper/song.json`
4. Apri `src/lyrics.json` e correggi a mano le parole sbagliate (Whisper sbaglia spesso con slang e inglese misto).
   Per mettere una parola in evidenza scrivila con l'asterisco: `*parola*`.
   I tempi di Whisper partono dall'inizio del file, quindi i 13 secondi iniziali sono già inclusi.

## 3. Anteprima e render
- `npm run dev` per l'anteprima nello Studio
- `npm run render` per il Full HD 1920x1080 a 60 fps (`out/video.mp4`)
- `npm run render4k` per il 4K (3840x2160)
