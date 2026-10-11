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
import {SCENES, SCENE_FRAMES, Scene, TOTAL_FRAMES} from './data';

const {fontFamily} = loadFont();

const FLOATING: BlockKind[] = ['grass', 'stone', 'diamond', 'gold', 'tnt', 'netherrack', 'emerald', 'copper'];

// Blocchi sullo sfondo che cadono piano per tutto il video
const FloatingBlocks: React.FC = () => {
  const frame = useCurrentFrame();
  const {height} = useVideoConfig();
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      {Array.from({length: 12}, (_, i) => {
        const size = 60 + rand(i + 1) * 100;
        const speed = 0.8 + rand(i + 20) * 1.6;
        const range = height + size * 2;
        const y = ((rand(i + 40) * range + frame * speed) % range) - size;
        return (
          <div
            key={i}
            style={{position: 'absolute', left: `${rand(i + 60) * 100}%`, top: y, opacity: 0.13}}
          >
            <Block kind={FLOATING[i % FLOATING.length]} size={size} seed={i + 1} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const SceneView: React.FC<{scene: Scene; index: number}> = ({scene, index}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const opacity = Math.min(
    interpolate(frame, [0, 15], [0, 1], {extrapolateRight: 'clamp'}),
    interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
      extrapolateLeft: 'clamp',
    }),
  );
  const pop = spring({frame: frame - 4, fps, config: {damping: 9, stiffness: 110}});
  const titleIn = spring({frame: frame - 14, fps, config: {damping: 14}});
  const bob = Math.sin(frame / 14) * 16;

  // Macchina da scrivere: finisce almeno 45 frame prima della fine (1,5 s per rileggere).
  // I testi corti vengono scritti più in fretta.
  const typeEnd = Math.min(durationInFrames - 45, 40 + scene.text.length * 2.2);
  const typed = Math.floor(
    interpolate(frame, [40, typeEnd], [0, scene.text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const cursor = frame % 20 < 10 && typed < scene.text.length ? '_' : '';

  return (
    <AbsoluteFill style={{opacity, fontFamily}}>
      <AbsoluteFill
        style={{background: `radial-gradient(circle at 25% 50%, ${scene.color}, transparent 65%)`}}
      />

      {/* Capitolo (in alto a sinistra) e numero scena (in alto a destra) */}
      <div style={{position: 'absolute', top: 50, left: 90, fontSize: 26, color: scene.accent}}>
        {scene.chapter}
      </div>
      <div style={{position: 'absolute', top: 50, right: 90, fontSize: 26, color: '#8a8a99'}}>
        {index + 1}/{SCENES.length}
      </div>

      <AbsoluteFill
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '110px 90px 80px',
          gap: 100,
        }}
      >
        <div style={{flexShrink: 0, transform: `translateY(${bob}px) scale(${pop})`}}>
          <Block kind={scene.block} size={480} seed={index + 1} />
        </div>

        <div style={{width: 1060, display: 'flex', flexDirection: 'column', gap: 34}}>
          {scene.year && (
            <div
              style={{
                fontSize: 96,
                color: scene.accent,
                textShadow: '6px 6px 0 #000',
                transform: `translateX(${(1 - titleIn) * -60}px)`,
                opacity: titleIn,
              }}
            >
              {scene.year}
            </div>
          )}

          <div
            style={{
              fontSize: 60,
              lineHeight: 1.3,
              color: '#fff',
              textShadow: '5px 5px 0 #000',
              opacity: titleIn,
              transform: `translateX(${(1 - titleIn) * -60}px)`,
            }}
          >
            {scene.title}
          </div>

          {/* Il testo completo invisibile tiene fissa l'altezza del riquadro mentre si scrive */}
          <div
            style={{
              position: 'relative',
              boxSizing: 'border-box',
              padding: 40,
              fontSize: 32,
              lineHeight: 1.6,
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
          <Series.Sequence key={i} durationInFrames={SCENE_FRAMES}>
            <SceneView scene={scene} index={i} />
          </Series.Sequence>
        ))}
      </Series>
      {/* Barra di avanzamento in basso */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: 14,
          width: `${(frame / TOTAL_FRAMES) * 100}%`,
          background: '#5fb03a',
        }}
      />
    </AbsoluteFill>
  );
};
