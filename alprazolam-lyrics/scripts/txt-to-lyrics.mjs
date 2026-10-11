// Uso: metti il testo della canzone in public/lyrics.txt, poi: npm run lyrics-txt
// Crea src/lyrics.json con tempi STIMATI (non ascoltati dall'audio):
// ogni riga dura in proporzione alla sua lunghezza e parte sul battito più vicino.
// Serve per avere subito un'anteprima. Per la sincronizzazione precisa usa Whisper (npm run lyrics).
import fs from "node:fs";

const START = 13; // inizio voce (secondi)
const END = 138; // fine canzone (secondi)
const BPM = 137;
const beat = 60 / BPM;

const lines = fs
  .readFileSync("public/lyrics.txt", "utf8")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith("[")); // salta righe vuote e titoli tipo [Strofa]

const weights = lines.map((l) => Math.max(8, l.length));
const total = weights.reduce((a, b) => a + b, 0);
const span = END - START;

let acc = 0;
const starts = weights.map((w) => {
  const raw = START + (acc / total) * span;
  acc += w;
  // aggancia al battito più vicino partendo da START
  return START + Math.round((raw - START) / beat) * beat;
});

const out = lines.map((text, i) => {
  const end = i < lines.length - 1 ? starts[i + 1] - 0.05 : END;
  return { start: Math.round(starts[i] * 100) / 100, end: Math.round(end * 100) / 100, text };
});

fs.writeFileSync("src/lyrics.json", JSON.stringify(out, null, 2));
console.log(`Scritte ${out.length} righe in src/lyrics.json (tempi stimati)`);
