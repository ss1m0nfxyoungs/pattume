// Uso: metti il testo della canzone in public/lyrics.txt, poi: npm run lyrics-timed
// Prende i TESTI da public/lyrics.txt e i TEMPI da questa tabella
// (ricavata dall'output di Whisper e agganciata alla griglia a 137 BPM).
// Le righe vuote e i titoli tipo [Strofa] vengono saltati. Servono 28 righe di testo.
import fs from "node:fs";

const OFFSET = 0; // secondi: metti per es. -0.3 o 0.3 se tutto è un po' in anticipo/ritardo

// [inizio, fine] di ogni riga, in ordine
const TIMINGS = [
  // Ritornello 1 (7 righe)
  [13.5, 17.0], [17.0, 20.5], [20.5, 24.0], [24.0, 27.5], [27.5, 32.75], [32.75, 38.0], [38.0, 41.5],
  // Strofa (12 righe)
  [41.5, 45.0], [45.0, 48.5], [48.5, 52.0], [52.0, 55.5], [55.5, 58.0], [58.0, 61.5],
  [61.5, 65.0], [65.0, 71.0], [71.0, 74.5], [74.5, 78.0], [78.0, 82.5], [82.5, 84.0],
  // Ritornello 2 (7 righe)
  [84.0, 87.5], [87.5, 91.0], [91.0, 94.5], [94.5, 98.0], [98.0, 103.25], [103.25, 108.5], [108.5, 112.0],
  // Outro (2 righe)
  [112.0, 117.0], [117.0, 125.0],
];

const lines = fs
  .readFileSync("public/lyrics.txt", "utf8")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith("["));

if (lines.length !== TIMINGS.length) {
  console.error(`Attenzione: in public/lyrics.txt ci sono ${lines.length} righe di testo, ma ne servono ${TIMINGS.length}.`);
  console.error("Controlla di aver incollato il testo completo, con le righe come nell'originale.");
  process.exit(1);
}

const r = (n) => Math.round((n + OFFSET) * 100) / 100;
const out = lines.map((text, i) => ({ start: r(TIMINGS[i][0]), end: r(TIMINGS[i][1]), text }));
fs.writeFileSync("src/lyrics.json", JSON.stringify(out, null, 2));
console.log(`Scritte ${out.length} righe in src/lyrics.json`);
