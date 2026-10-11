import type {BlockKind} from './Block';

// 16:9 Full HD, 30 fps. 40 scene da 15 secondi = 10 minuti esatti.
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const SCENE_FRAMES = 15 * FPS; // durata di ogni scena (modificabile)

export type Scene = {
  chapter: string;
  year: string; // vuoto = nessun anno
  title: string;
  text: string;
  block: BlockKind;
  color: string; // alone dietro la scena
  accent: string; // colore di anno, bordo e capitolo
};

// Colori [alone, accento] per ogni blocco
const COLORS: Record<BlockKind, [string, string]> = {
  grass: ['#2d6a1f', '#6bc144'],
  stone: ['#4a4a4a', '#c8c8c8'],
  diamond: ['#0f6f73', '#4ee6df'],
  gold: ['#8a6d12', '#fbe36a'],
  tnt: ['#7a1d14', '#ff6b5a'],
  obsidian: ['#3d1f66', '#b07cff'],
  netherrack: ['#5d2222', '#ff8a5a'],
  creeper: ['#1f6b2a', '#6fd06f'],
  planks: ['#6b4a30', '#e0a96d'],
  sand: ['#7a6d2a', '#e0d38e'],
  ice: ['#1f5f8f', '#9fd3ff'],
  emerald: ['#0f6b3a', '#5ff58f'],
  redstone: ['#7a1d14', '#ff6b5a'],
  amethyst: ['#4a2a7a', '#b690e8'],
  deepslate: ['#2a3a45', '#7fb0c8'],
  cherry: ['#7a3a55', '#f2bdd1'],
  copper: ['#7a3a22', '#e09070'],
  endstone: ['#6b6b2a', '#e6e6a8'],
  sulfur: ['#6b6a12', '#e8e36a'],
};

const S = (chapter: string, year: string, title: string, text: string, block: BlockKind): Scene => ({
  chapter,
  year,
  title,
  text,
  block,
  color: COLORS[block][0],
  accent: COLORS[block][1],
});

const ORIGINI = 'ORIGINI';
const ALPHA = 'ALPHA E BETA';
const V1 = 'LA VERSIONE 1.0';
const MS = 'MICROSOFT';
const AGG = 'AGGIORNAMENTI';
const OGGI = 'OGGI';

export const SCENES: Scene[] = [
  S(ORIGINI, '', 'LA STORIA DI MINECRAFT', 'Dieci minuti per raccontare come un gioco nato da una sola persona è diventato il videogioco più venduto di sempre.', 'grass'),
  S(ORIGINI, 'PRIMA', 'MARKUS «NOTCH» PERSSON', 'È uno sviluppatore svedese. Lavora alla società King, dove crea giochi per browser, e nel tempo libero prova i suoi prototipi sui forum per sviluppatori indipendenti.', 'stone'),
  S(ORIGINI, '2009', 'LE ISPIRAZIONI', 'Il gioco nasce guardando Infiniminer, un gioco di scavo a blocchi, e un vecchio progetto di Notch che si chiama RubyDung.', 'planks'),
  S(ORIGINI, '2009', 'CAVE GAME', 'A maggio Notch comincia a programmare. Il mondo ha solo blocchi di erba e pietra, che si possono mettere e togliere. Il 13 maggio pubblica su YouTube il primo video.', 'grass'),
  S(ORIGINI, '2009', '17 MAGGIO', 'Una versione più rifinita esce sul forum TIGSource. Il nome diventa Minecraft: Order of the Stone e poi, più semplice, Minecraft.', 'stone'),
  S(ORIGINI, '2009', 'CLASSIC', 'I giocatori commentano e Notch aggiorna di continuo. Nascono Multiplayer Test e Survival Test: arrivano la barra della vita e i mostri, come zombie, scheletri e creeper.', 'stone'),
  S(ORIGINI, '2009', 'NASCE IL CREEPER', 'Secondo Notch il creeper è un errore: voleva fare un maiale e ha confuso altezza e larghezza del modello. È diventato il simbolo del gioco.', 'creeper'),
  S(ORIGINI, '2009', 'LA MUSICA DI C418', 'Nel periodo Classic arrivano le musiche ambient di C418, un musicista tedesco che Notch conosceva dal forum. L’album Volume Alpha esce nel 2011.', 'amethyst'),

  S(ALPHA, '2009', 'INDEV', 'A dicembre esce Indev. Arrivano crafting e fusione, gli strumenti, l’agricoltura e il ciclo giorno e notte: il cuore della modalità sopravvivenza.', 'planks'),
  S(ALPHA, '2010', 'MONDI INFINITI', 'Gli ultimi aggiornamenti di Indev aggiungono i quadri dell’artista svedese Kristoffer Zetterstrand. Il 27 febbraio nasce Infdev, dove Notch prova i mondi infiniti.', 'sand'),
  S(ALPHA, '2010', 'NASCE MOJANG', 'Le vendite dell’Alpha superano lo stipendio di Notch. Lascia il lavoro per dedicarsi solo al gioco e, con Jakob Porser e Carl Manneh, fonda Mojang.', 'gold'),
  S(ALPHA, '2010', 'ALPHA', 'Il 30 giugno inizia la fase Alpha. Gli aggiornamenti arrivano spesso e senza preavviso. Compare la redstone, che i giocatori useranno per costruire perfino computer.', 'redstone'),
  S(ALPHA, '2010', 'ARRIVA IL NETHER', 'Il 30 ottobre l’Alpha 1.2.0 aggiunge deserti e foreste, e il Nether: una dimensione infernale di lava, con i Ghast che sparano palle di fuoco.', 'netherrack'),
  S(ALPHA, '2010', 'BETA', 'Il 20 dicembre inizia la Beta. Il prezzo sale da 10 a 14,75 euro. Nel 2011 arrivano i letti, i lupi da addomesticare, le mappe e i pistoni.', 'planks'),
  S(ALPHA, '2011', 'UN MILIONE DI COPIE', 'Il 12 gennaio le vendite superano il milione, ma il gioco è ancora in Beta. A novembre le copie vendute sono già più di 4 milioni.', 'gold'),

  S(V1, '2011', 'ADVENTURE UPDATE', 'Il 14 settembre la Beta 1.8 rifà la generazione del mondo e aggiunge i villaggi, la barra della fame e la modalità creativa: costruire senza limiti, come in Classic.', 'grass'),
  S(V1, '2011', 'MINECON E VERSIONE 1.0', 'Il 18 novembre, durante il MineCon, esce ufficialmente la 1.0. Arrivano la dimensione End e l’Ender Dragon, il boss finale, con il Poema dell’End.', 'obsidian'),
  S(V1, '2011', 'JEB PRENDE IL COMANDO', 'Dopo l’uscita Notch passa il controllo creativo del gioco a Jens «Jeb» Bergensten e inizia un altro progetto, 0x10c, che poi abbandona.', 'endstone'),
  S(V1, '2012-2013', 'IL MONDO SI ALLARGA', 'Arrivano la giungla, i golem di ferro, i villager con cui scambiare smeraldi, il Wither, le incudini e la Redstone Update. Nel 2013 anche i cavalli.', 'emerald'),
  S(V1, '2013', 'L’UPDATE CHE CAMBIÒ IL MONDO', 'Il 25 ottobre la versione 1.7 aggiunge 11 nuovi biomi, come le savane e le mesa, e il tipo di mondo Amplified con terreno estremo.', 'sand'),
  S(V1, '2011-2017', 'SU TELEFONO E CONSOLE', 'Il 16 agosto 2011 esce la Pocket Edition per smartphone. Nel 2017 console e telefoni si uniscono nella Bedrock Edition e la versione per PC diventa Java Edition.', 'gold'),

  S(MS, '2014', 'MICROSOFT COMPRA MOJANG', 'Notch, esausto per la pressione del pubblico, decide di vendere. Microsoft compra Mojang per 2,5 miliardi di dollari. Notch lascia l’azienda con Porser e Manneh.', 'tnt'),
  S(MS, '2014-2016', 'UNA PAUSA', 'Dopo l’acquisto non escono grandi aggiornamenti fino a febbraio 2016, quando arriva il Combat Update: scudo, mano sinistra, elitre e le città dell’End.', 'stone'),
  S(MS, '2016-2017', 'ORSI POLARI E PAPPAGALLI', 'Nel 2016 arrivano gli orsi polari e le dimore nel bosco con i totem dell’immortalità. Nel 2017 il calcestruzzo colorato e i pappagalli.', 'ice'),

  S(AGG, '2018', 'UPDATE AQUATIC', 'Il 18 luglio gli oceani cambiano: coralli, relitti, tesori sepolti, delfini, tartarughe marine e il tridente. Cambia anche il modo di nuotare.', 'ice'),
  S(AGG, '2019', 'VILLAGE & PILLAGE', 'Il 23 aprile i villaggi sono rifatti. Ogni villager ha un lavoro legato a un blocco. Arrivano le incursioni degli illager, i panda, le volpi e le balestre.', 'planks'),
  S(AGG, '2019', 'API E MIELE', 'A dicembre il Buzzy Bees porta le api, gli alveari e il miele. I blocchi di miele diventano subito la base di tanti percorsi di parkour.', 'gold'),
  S(AGG, '2020', 'NETHER UPDATE', 'Il 23 giugno il Nether viene rifatto: foreste cremisi e distorte, piglin con cui barattare oro, strider e la netherite, più resistente del diamante.', 'netherrack'),
  S(AGG, '2021', 'CAVES & CLIFFS', 'L’aggiornamento viene diviso in due parti. A giugno arrivano axolotl, rame e ametista. A novembre montagne più alte e un mondo alto 384 blocchi.', 'amethyst'),
  S(AGG, '2022', 'THE WILD UPDATE', 'Il 7 giugno arrivano la palude di mangrovie, il Deep Dark, le rane e le barche con baule. Le lucciole vengono tolte perché velenose per le rane vere.', 'deepslate'),
  S(AGG, '2023', 'TRAILS & TALES', 'Il 7 giugno arrivano i ciliegi, l’archeologia con il pennello, lo sniffer, i cammelli e le decorazioni per le armature.', 'cherry'),
  S(AGG, '2023', 'ARRIVANO I GAME DROP', 'A settembre Mojang annuncia meno grandi aggiornamenti annuali e più «game drop», pacchetti piccoli e frequenti. Il primo esce il 5 dicembre.', 'stone'),
  S(AGG, '2024', 'TRICKY TRIALS', 'Il 13 giugno esce l’ultimo grande aggiornamento annuale: camere delle prove con spawner e bottino, la mazza e il Breeze con le cariche di vento.', 'copper'),
  S(AGG, '2024-2025', 'I DROP DEL PALE GARDEN', 'Bundles of Bravery porta i fagotti. The Garden Awakens il Pale Garden e il Creaking. Spring to Life le lucciole e Chase the Skies il Happy Ghast.', 'deepslate'),

  S(OGGI, '2025', 'A MINECRAFT MOVIE', 'Il 4 aprile esce il film. Incassa circa 960 milioni di dollari con un costo di 150 milioni, e ha il miglior debutto di sempre per un film tratto da un videogioco.', 'emerald'),
  S(OGGI, '2025', 'COPPER AGE', 'Il 30 settembre arriva il Copper Golem, che sposta e ordina gli oggetti tra i bauli. A dicembre Mounts of Mayhem porta lance e nautilus da cavalcare.', 'copper'),
  S(OGGI, '2026', 'NUOVA NUMERAZIONE', 'Mojang annuncia le versioni a calendario: dal 2026 si chiamano 26.1, 26.2 e così via. A marzo esce Tiny Takeover con i cuccioli dei mob.', 'planks'),
  S(OGGI, '2026', 'GLI ULTIMI DROP', 'Il 16 giugno Chaos Cubed porta le grotte di zolfo e i cubi di zolfo che rimbalzano. Il 15 settembre Wilderness Bound aggiunge la foresta autunnale e i cuscini.', 'sulfur'),
  S(OGGI, '2023-2025', 'IL PIÙ VENDUTO', 'Nel 2023 Minecraft supera i 300 milioni di copie. Ad aprile 2025 Mojang ne conta più di 350 milioni: è il videogioco più venduto di sempre.', 'diamond'),
  S(OGGI, '', 'E LA STORIA CONTINUA', 'Da un forum di sviluppatori a centinaia di milioni di giocatori. Ogni blocco che piazzi è un pezzo di questa storia.', 'grass'),
];

export const TOTAL_FRAMES = SCENES.length * SCENE_FRAMES;
