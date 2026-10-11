import React from 'react';

// Numero pseudo-casuale ma sempre uguale per lo stesso input (serve a Remotion: ogni frame deve essere identico)
export const rand = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

const DIRT = ['#866043', '#79553a', '#6b4a30', '#946a4b'];
const GRASS_TOP = ['#5fb03a', '#4f9a2e', '#6bc144'];
const STONE = ['#7d7d7d', '#8a8a8a', '#6e6e6e', '#959595'];

// Faccia del creeper su una griglia 8x8 (riga, colonna)
const creeperFace = (r: number, c: number) =>
  (r >= 2 && r <= 3 && ((c >= 1 && c <= 2) || (c >= 5 && c <= 6))) ||
  (r === 4 && c >= 3 && c <= 4) ||
  (r === 5 && c >= 2 && c <= 5) ||
  (r === 6 && (c === 2 || c === 5));

// Ogni blocco è una funzione: data riga e colonna (0-7) restituisce i colori possibili
export const BLOCKS = {
  grass: (r: number) => (r < 2 ? GRASS_TOP : DIRT),
  stone: () => STONE,
  diamond: () => [...STONE, '#4ee6df', '#2bb8c4'],
  gold: () => ['#f7d33b', '#e8b923', '#fbe36a', '#d9a71a'],
  tnt: (r: number) => (r === 3 || r === 4 ? ['#e9e9e9', '#d6d6d6'] : ['#d23b2d', '#c0291d', '#e24a3a']),
  obsidian: () => ['#1b1029', '#241338', '#150c22', '#2d1a47'],
  netherrack: () => ['#6d2a2a', '#7d3333', '#5d2222', '#8a3a3a'],
  creeper: (r: number, c: number) =>
    creeperFace(r, c) ? ['#0d0d0d'] : ['#5bb85b', '#4aa14a', '#6fd06f', '#3f8f3f'],
  planks: () => ['#b8945f', '#a98353', '#c4a06b', '#9c7a4b'],
  sand: () => ['#e0d38e', '#d4c77d', '#ebdfa0', '#cfc176'],
  ice: () => ['#9fd3ff', '#b7e1ff', '#7fc0f2', '#cbe9ff'],
  emerald: () => ['#17dd62', '#0fb34d', '#5ff58f', '#0a8a3b'],
  redstone: () => ['#8a0f0f', '#c01818', '#e02a2a', '#600a0a'],
  amethyst: () => ['#7b4fb3', '#9b6fd3', '#b690e8', '#5e3a91'],
  deepslate: () => ['#3a3a40', '#46464d', '#2f2f35', '#505058'],
  cherry: () => ['#e8a6c1', '#f2bdd1', '#d68fae', '#fbd0e0'],
  copper: () => ['#c06c4a', '#d08060', '#a85a3c', '#e09070'],
  endstone: () => ['#e6e6a8', '#d8d89a', '#c8c88a', '#f0f0b8'],
  sulfur: () => ['#d9d24a', '#c9c23a', '#b8b030', '#e8e36a'],
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
      const palette = (BLOCKS[kind] as (r: number, c: number) => string[])(r, c);
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
