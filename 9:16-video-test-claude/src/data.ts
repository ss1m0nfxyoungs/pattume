import type {BlockKind} from './Block';

// Formato verticale 9:16 (Shorts). Per il video orizzontale: WIDTH = 1920, HEIGHT = 1080
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export type Scene = {
  year?: string;
  title: string;
  text: string;
  color: string; // colore dell'alone dietro la scena
  accent: string; // colore di anno e bordo
  block: BlockKind;
  seed: number;
  duration: number; // in frame (30 frame = 1 secondo)
};

export const SCENES: Scene[] = [
  {
    title: 'LA STORIA DI MINECRAFT',
    text: "Da un'idea di una sola persona al gioco più venduto di sempre.",
    color: '#2d6a1f',
    accent: '#6bc144',
    block: 'grass',
    seed: 1,
    duration: 120,
  },
  {
    year: '2009',
    title: 'NASCE CAVE GAME',
    text: 'Markus «Notch» Persson, svedese, crea il gioco da solo. Prima versione pubblica: 17 maggio.',
    color: '#4a4a4a',
    accent: '#c8c8c8',
    block: 'stone',
    seed: 2,
    duration: 180,
  },
  {
    year: '2010',
    title: 'ALPHA E BETA',
    text: 'Si gioca già in Alpha e Beta: il passaparola trasforma il gioco in un fenomeno.',
    color: '#6b4a30',
    accent: '#e0a96d',
    block: 'grass',
    seed: 3,
    duration: 180,
  },
  {
    year: '2011',
    title: 'VERSIONE 1.0',
    text: "18 novembre, MineCon a Las Vegas: uscita ufficiale con l'Ender Dragon. Notch passa lo sviluppo a Jens «Jeb» Bergensten.",
    color: '#3d1f66',
    accent: '#b07cff',
    block: 'obsidian',
    seed: 4,
    duration: 210,
  },
  {
    year: '2011-2017',
    title: 'OVUNQUE',
    text: 'Arriva su smartphone e console: Xbox 360, PlayStation, Switch. Lo giocano proprio tutti.',
    color: '#8a6d12',
    accent: '#fbe36a',
    block: 'gold',
    seed: 5,
    duration: 180,
  },
  {
    year: '2014',
    title: 'MICROSOFT COMPRA MOJANG',
    text: 'Per 2,5 miliardi di dollari. Notch lascia e Minecraft entra in una nuova era.',
    color: '#7a1d14',
    accent: '#ff6b5a',
    block: 'tnt',
    seed: 6,
    duration: 180,
  },
  {
    year: '2018-2024',
    title: 'AGGIORNAMENTI SENZA FINE',
    text: 'Acquatico, Nether, Caves & Cliffs, Wild, Tricky Trials: il mondo si allarga ogni anno.',
    color: '#5d2222',
    accent: '#ff8a5a',
    block: 'netherrack',
    seed: 7,
    duration: 180,
  },
  {
    year: '2023-2025',
    title: 'RECORD',
    text: 'Oltre 300 milioni di copie vendute: il videogioco più venduto di sempre. Nel 2025 arriva anche il film.',
    color: '#0f6f73',
    accent: '#4ee6df',
    block: 'diamond',
    seed: 8,
    duration: 210,
  },
  {
    title: 'E LA STORIA CONTINUA',
    text: 'Ogni blocco che piazzi è un pezzo di questa storia.',
    color: '#2d6a1f',
    accent: '#6bc144',
    block: 'grass',
    seed: 9,
    duration: 130,
  },
];

export const TOTAL_FRAMES = SCENES.reduce((sum, s) => sum + s.duration, 0);
