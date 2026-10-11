import React from 'react';
import {
  AbsoluteFill,
  Series,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/PressStart2P';
import {Block, BlockKind, rand} from './Block';
import {SCENES, Scene, TOTAL_FRAMES} from './data';

const {fontFamily} = loadFont();

const FLOATING: BlockKind[] = ['grass', 'stone', 'diamond', 'gold', 'tnt', 'netherrack'];

// Blocchi sullo sfondo che cadono piano per tutto il video
const FloatingBlocks: React.FC = () => {
  const frame = useCurrentFrame();
  const {height} = useVideoConfig();
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      {Array.from({length: 10}, (_, i) => {
        const size = 70 + rand(i + 1) * 110;
        const speed = 1.2 + rand(i + 20) * 2.2;
        const range = height + size * 2;
        const y = ((rand(i + 40) * range + frame * speed) % range) - size;
        return (
          <div
            key={i}
            style={{position: 'absolute', left: `${rand(i + 60) * 100}%`, top: y, opacity: 0.14}}
          >
            <Block kind={FLOATING[i % FLOATING.length]} size={size} seed={i + 1} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const SceneView: React.FC<{scene: Scene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const opacity = Math.min(
    interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'}),
    interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], {
      extrapolateLeft: 'clamp',
    }),
  );
  const pop = spring({frame: frame - 4, fps, config: {damping: 9, stiffness: 110}});
  const titleIn = spring({frame: frame - 14, fps, config: {damping: 14}});
  const bob = Math.sin(frame / 12) * 14;

  // Effetto macchina da scrivere: finisce 45 frame prima della fine, così si legge tutto
  const typed = Math.floor(
    interpolate(frame, [40, durationInFrames - 45], [0, scene.text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const cursor = frame % 20 < 10 && typed < scene.text.length ? '_' : '';

  return (
    <AbsoluteFill style={{opacity, fontFamily}}>
      <AbsoluteFill
        style={{background: `radial-gradient(circle at 50% 35%, ${scene.color}, transparent 70%)`}}
      />
      <AbsoluteFill
        style={{justifyContent: 'center', alignItems: 'center', padding: 70, gap: 50, textAlign: 'center'}}
      >
        {scene.year && (
          <div
            style={{
              fontSize: 120,
              color: scene.accent,
              textShadow: '6px 6px 0 #000',
              transform: `scale(${titleIn})`,
            }}
          >
            {scene.year}
          </div>
        )}

        <div style={{transform: `translateY(${bob}px) scale(${pop})`}}>
          <Block kind={scene.block} size={400} seed={scene.seed} />
        </div>

        <div
          style={{
            fontSize: 56,
            lineHeight: 1.3,
            color: '#fff',
            textShadow: '5px 5px 0 #000',
            opacity: titleIn,
            transform: `translateY(${(1 - titleIn) * 40}px)`,
          }}
        >
          {scene.title}
        </div>

        {/* Il testo completo invisibile tiene fissa l'altezza del riquadro mentre si scrive */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 940,
            boxSizing: 'border-box',
            padding: 40,
            fontSize: 40,
            lineHeight: 1.7,
            color: '#f1f1f1',
            background: 'rgba(0,0,0,0.5)',
            border: `6px solid ${scene.accent}`,
          }}
        >
          <span style={{visibility: 'hidden'}}>{scene.text}</span>
          <span style={{position: 'absolute', top: 40, left: 40, right: 40}}>
            {scene.text.slice(0, typed)}
            {cursor}
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const MinecraftStory: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#0b0b12'}}>
      <FloatingBlocks />
      <Series>
        {SCENES.map((scene, i) => (
          <Series.Sequence key={i} durationInFrames={scene.duration}>
            <SceneView scene={scene} />
          </Series.Sequence>
        ))}
      </Series>
      {/* Barra di avanzamento in basso */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: 16,
          width: `${(frame / TOTAL_FRAMES) * 100}%`,
          background: '#5fb03a',
        }}
      />
    </AbsoluteFill>
  );
};
