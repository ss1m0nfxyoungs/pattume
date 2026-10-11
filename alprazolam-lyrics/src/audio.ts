import { visualizeAudio, AudioData } from "@remotion/media-utils";

export type Energy = { bass: number; mid: number; high: number; total: number; hit: number };

const avg = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);

const bandsAt = (audioData: AudioData, frame: number, fps: number) => {
  const spectrum = visualizeAudio({ fps, frame, audioData, numberOfSamples: 64, optimizeFor: "speed" });
  return {
    bass: Math.min(1, avg(spectrum.slice(0, 4)) * 6),
    mid: Math.min(1, avg(spectrum.slice(4, 16)) * 12),
    high: Math.min(1, avg(spectrum.slice(16, 48)) * 25),
  };
};

// Energia della canzone al frame dato. "hit" = un colpo di cassa/percussione appena arrivato.
export const getEnergy = (audioData: AudioData | null, frame: number, fps: number): Energy => {
  if (!audioData) return { bass: 0, mid: 0, high: 0, total: 0, hit: 0 };
  const now = bandsAt(audioData, frame, fps);
  const prev = bandsAt(audioData, Math.max(0, frame - 3), fps);
  const hit = Math.max(0, now.bass - prev.bass) > 0.12 ? 1 : 0;
  return { ...now, total: (now.bass + now.mid + now.high) / 3, hit };
};
