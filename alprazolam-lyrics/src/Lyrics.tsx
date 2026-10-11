import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import lyrics from "./lyrics.json";
import { Energy } from "./audio";
import { PALETTE } from "./config";

type Line = { start: number; end: number; text: string };

export const Lyrics: React.FC<{ energy: Energy }> = ({ energy }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // Mai mostrare il testo prima del suo "start".
  const line = (lyrics as Line[]).find((l) => t >= l.start && t < l.end);
  if (!line) return null;

  const startFrame = line.start * fps;
  const enter = spring({ frame: frame - startFrame, fps, config: { damping: 12, stiffness: 140 } });
  const words = line.text.split(" ");
  const base = line.text.length > 38 ? 84 : 112;

  let letterIndex = 0;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 140px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 28px",
          transform: `scale(${(0.6 + enter * 0.4) * (1 + energy.bass * 0.08)}) rotate(${Math.sin(t * 2) * 1.5}deg)`,
          opacity: Math.min(1, enter * 1.5),
          fontFamily: "Impact, 'Arial Black', sans-serif",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {words.map((raw, wi) => {
          const emph = raw.startsWith("*");
          const word = raw.replace(/\*/g, "");
          const size = emph ? base * 1.35 : base;
          const color = emph ? "#b6ff00" : "#ffffff";
          return (
            <span key={wi} style={{ display: "inline-flex" }}>
              {word.split("").map((ch, ci) => {
                const i = letterIndex++;
                const wave = Math.sin(t * 6 + i * 0.7) * (8 + energy.mid * 22);
                const tilt = Math.sin(t * 3 + i) * (3 + energy.high * 8);
                return (
                  <span
                    key={ci}
                    style={{
                      display: "inline-block",
                      fontSize: size,
                      color,
                      transform: `translateY(${wave}px) rotate(${tilt}deg) scale(${1 + energy.bass * 0.12})`,
                      WebkitTextStroke: "4px #000",
                      paintOrder: "stroke fill",
                      // separazione RGB + glow per leggibilità
                      textShadow: `${3 + energy.hit * 8}px 0 #ff0055, ${-3 - energy.hit * 8}px 0 #00f0ff, 0 0 30px ${PALETTE[wi % PALETTE.length]}, 0 8px 18px rgba(0,0,0,0.85)`,
                    }}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
