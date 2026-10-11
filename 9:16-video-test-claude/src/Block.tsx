import React from 'react';

// Numero pseudo-casuale ma sempre uguale per lo stesso input (serve a Remotion: ogni frame deve essere identico)
export const rand = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

const DIRT = ['#866043', '#79553a', '#6b4a30', '#946a4b'];
const GRASS_TOP = ['#5fb03a', '#4f9a2e', '#6bc144'];
const STONE = ['#7d7d7d', '#8a8a8a', '#6e6e6e', '#959595'];

// Ogni blocco è una funzione: data la riga (0-7) restituisce i colori possibili
export const BLOCKS = {
  grass: (r: number) => (r < 2 ? GRASS_TOP : DIRT),
  stone: () => STONE,
  diamond: () => [...STONE, '#4ee6df', '#2bb8c4'],
  gold: () => ['#f7d33b', '#e8b923', '#fbe36a', '#d9a71a'],
  tnt: (r: number) => (r === 3 || r === 4 ? ['#e9e9e9', '#d6d6d6'] : ['#d23b2d', '#c0291d', '#e24a3a']),
  obsidian: () => ['#1b1029', '#241338', '#150c22', '#2d1a47'],
  netherrack: () => ['#6d2a2a', '#7d3333', '#5d2222', '#8a3a3a'],
};

export type BlockKind = keyof typeof BLOCKS;

export const Block: React.FC<{kind: BlockKind; size: number; seed?: number}> = ({
  kind,
  size,
  seed = 1,
}) => {
  const N = 8;
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const palette = BLOCKS[kind](r);
      const color = palette[Math.floor(rand(seed * 100 + r * N + c) * palette.length)];
      cells.push(<div key={r * N + c} style={{background: color}} />);
    }
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'grid',
        gridTemplateColumns: `repeat(${N}, 1fr)`,
        gridTemplateRows: `repeat(${N}, 1fr)`,
        boxShadow: 'inset 0 0 0 4px rgba(0,0,0,0.35)',
        imageRendering: 'pixelated',
      }}
    >
      {cells}
    </div>
  );
};
