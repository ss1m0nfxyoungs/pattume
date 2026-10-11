// Uso: node scripts/whisper-to-lyrics.mjs whisper/song.json
// Converte l'output JSON di Whisper in src/lyrics.json (start, end, text).
import fs from "node:fs";

const input = process.argv[2];
if (!input) {
  console.error("Uso: node scripts/whisper-to-lyrics.mjs <file-whisper.json>");
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(input, "utf8"));
const lines = data.segments.map((s) => ({
  start: Math.round(s.start * 100) / 100,
  end: Math.round(s.end * 100) / 100,
  text: s.text.trim(),
}));
fs.writeFileSync("src/lyrics.json", JSON.stringify(lines, null, 2));
console.log(`Scritte ${lines.length} righe in src/lyrics.json`);
