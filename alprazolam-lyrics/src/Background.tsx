import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { BEATS_PER_SCENE, BPM, PALETTE } from "./config";
import { Energy } from "./audio";

const pick = (i: number) => PALETTE[((i % PALETTE.length) + PALETTE.length) % PALETTE.length];

export const Background: React.FC<{ energy: Energy }> = ({ energy }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;

  const sceneLen = (60 / BPM) * BEATS_PER_SCENE;
  const scene = Math.floor(t / sceneLen);
  const c1 = pick(scene);
  const c2 = pick(scene + 2);
  const c3 = pick(scene + 3);

  const pulse = 1 + energy.bass * 0.35;
  const spin = t * (12 + energy.mid * 25) * (scene % 2 ? 1 : -1);
  const hue = (t * 20 + energy.high * 60) % 360;

  // Tunnel: anelli che escono dal centro
  const rings = Array.from({ length: 14 }, (_, i) => {
    const p = (i / 14 + t * 0.12 * (1 + energy.mid)) % 1;
    const size = Math.pow(p, 2.2) * Math.max(width, height) * 2.2;
    return { i, size, op: Math.sin(p * Math.PI) };
  });

  // Alterna due stili di scena per dare contrasto
  const kaleido = scene % 2 === 0;

  return (
    <AbsoluteFill style={{ background: "#07000f", filter: `hue-rotate(${hue}deg) saturate(${1.3 + energy.total})` }}>
      {/* filtro liquido */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="liquid">
          <feTurbulence type="fractalNoise" baseFrequency={`${0.004 + energy.bass * 0.004} 0.007`} numOctaves={2} seed={scene} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={40 + energy.bass * 140} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <AbsoluteFill style={{ filter: "url(#liquid)", transform: `scale(${pulse * 1.1}) rotate(${spin * 0.2}deg)` }}>
        {/* gradiente fluido */}
        <AbsoluteFill
          style={{
            background: `conic-gradient(from ${spin}deg at ${50 + Math.sin(t) * 12}% ${50 + Math.cos(t * 0.8) * 12}%, ${c1}, ${c2}, ${c3}, ${c1})`,
          }}
        />
        {kaleido ? (
          // caleidoscopio: spicchi ripetuti
          <AbsoluteFill
            style={{
              background: `repeating-conic-gradient(from ${-spin}deg at 50% 50%, ${c2}00 0deg, ${c3}aa ${8 + energy.mid * 8}deg, #000000cc 16deg, ${c1}00 24deg)`,
              mixBlendMode: "screen",
            }}
          />
        ) : (
          // tunnel geometrico
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
            {rings.map((r) => (
              <div
                key={r.i}
                style={{
                  position: "absolute",
                  width: r.size,
                  height: r.size,
                  borderRadius: r.i % 2 ? "50%" : "12%",
                  border: `${6 + energy.bass * 14}px solid ${pick(scene + r.i)}`,
                  opacity: r.op,
                  transform: `rotate(${spin * (r.i % 2 ? 1 : -1) + r.i * 9}deg)`,
                  boxShadow: `0 0 40px ${pick(scene + r.i)}`,
                }}
              />
            ))}
          </AbsoluteFill>
        )}
        {/* oggetti astratti fluttuanti */}
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${50 + Math.sin(t * (0.5 + i * 0.13) + i) * 38}%`,
              top: `${50 + Math.cos(t * (0.4 + i * 0.11) + i * 2) * 36}%`,
              width: 140 + i * 30 + energy.bass * 120,
              height: 140 + i * 30 + energy.bass * 120,
              borderRadius: i % 2 ? "50%" : "30%",
              background: `radial-gradient(circle at 30% 30%, #ffffff, ${pick(scene + i)} 40%, #12001f 100%)`,
              opacity: 0.55,
              transform: `translate(-50%,-50%) rotate(${spin * 2 + i * 40}deg)`,
              mixBlendMode: "screen",
            }}
          />
        ))}
      </AbsoluteFill>

      {/* colpo di cassa: flash */}
      <AbsoluteFill style={{ background: "#ffffff", opacity: energy.hit * 0.22 }} />
      {/* effetto VHS: linee di scansione + vignetta */}
      <AbsoluteFill
        style={{
          background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 2px, transparent 2px, transparent 4px)",
          mixBlendMode: "multiply",
        }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)" }} />
      {/* piccolo glitch orizzontale quando arriva un colpo */}
      {energy.hit ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${(frame * 37) % 90}%`,
            height: 40 + (frame % 5) * 14,
            background: `${c3}55`,
            transform: `translateX(${((frame * 53) % 120) - 60}px)`,
            mixBlendMode: "difference",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
