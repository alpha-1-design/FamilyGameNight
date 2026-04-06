import { ICONS } from '../utils/ICONS';
import { getGameIcon } from '../utils/GAME_ICONS';
import { Storage } from '../utils/Storage';
import type { Player } from '../utils/Storage';
import { type GameMode, type GameResult } from '../games/GameManager';
import { GAMES_DATA } from '../data/games-data';
import { PROMPTS_DATA } from '../data/prompts-data';
import { CopilotCharacter } from '../components/Copilot';

// ─── Engine type routing ───────────────────────────────────────────────────
type GameEngine =
  | 'prompt-card'      // Truth/Dare, Never Have I Ever, Would You Rather, social games
  | 'hot-potato'       // Countdown timer, pass the phone
  | 'word-input'       // Word Chain, Spelling Bee, Anagram
  | 'tap-reaction'     // Speed Tap, Button Mash, Reaction Test
  | 'charades'         // Act it out, drawing prompt, mime
  | 'riddle'           // Question + answer reveal
  | 'two-choice'       // Would You Rather voting
  | 'physical'         // Plank, Squat, Balance — timer + instruction
  | 'trivia'           // Q&A with multiple choice
  | 'score-track';     // Rock Paper Scissors, Thumb War, Arm Wrestle

const ENGINE_MAP: Record<string, GameEngine> = {
  // Hot potato engine
  'hot-potato': 'hot-potato',
  'musical-silence': 'hot-potato',
  'freeze-dance': 'hot-potato',
  'musical-chairs': 'hot-potato',
  'pass-the-parcel': 'hot-potato',
  'freeze-song': 'hot-potato',
  'dance-freeze': 'hot-potato',
  'dance-freeze-pro': 'hot-potato',
  'music-statues': 'hot-potato',

  // Word input engine
  'word-chain': 'word-input',
  'word-scramble': 'word-input',
  'anagram-attack': 'word-input',
  'spelling-bee': 'word-input',
  'spelling-bee-pro': 'word-input',
  'tongue-twister': 'word-input',
  'alphabet-game': 'word-input',
  'word-association': 'word-input',
  'category-game': 'word-input',
  'rhyming-game': 'word-input',
  'word-builder': 'word-input',
  'letter-grid': 'word-input',
  'jumble-words': 'word-input',
  'sentence-unscramble': 'word-input',
  'vocabulary-blast': 'word-input',
  'synonym-burst': 'word-input',
  'antonym-attack': 'word-input',
  'homophone-hunt': 'word-input',

  // Tap reaction engine
  'speed-tap': 'tap-reaction',
  'button-mash': 'tap-reaction',
  'reaction-test': 'tap-reaction',
  'rhythm-tap': 'tap-reaction',
  'shape-tap': 'tap-reaction',
  'color-match': 'tap-reaction',
  'memory-tap': 'tap-reaction',
  'countdown': 'tap-reaction',
  'ninja-clap': 'tap-reaction',
  'hand-slap': 'tap-reaction',
  'finger-count': 'tap-reaction',

  // Charades engine (act it out / draw it)
  'charades': 'charades',
  'pictionary': 'charades',
  'emoji-pictionary': 'charades',
  'heads-up': 'charades',
  'drawing-doodle': 'charades',
  'portrait-party': 'charades',
  'improv-theater': 'charades',
  'lip-sync': 'charades',
  'air-guitar': 'charades',
  'voice-actor': 'charades',
  'sound-effects': 'charades',
  'dance-improv': 'charades',
  'dance-off': 'charades',
  'dance-off-battle': 'charades',
  'beat-box': 'charades',
  'karaoke': 'charades',
  'silent-scream': 'charades',
  'slow-motion': 'charades',
  'freeze-frame': 'charades',
  'mirror-game': 'charades',
  'human-sculpture': 'charades',
  'talent-show': 'charades',
  'costume-contest': 'charades',
  'photo-booth': 'charades',
  'hot-seat': 'charades',
  'interview-game': 'charades',
  'hot-seat-interview': 'charades',
  'commercial-challenger': 'charades',
  'pitch-it': 'charades',
  'news-anchor': 'charades',
  'weather-report': 'charades',
  'sports-announce': 'charades',
  'battle-rap': 'charades',

  // Riddle engine
  'riddle-battle': 'riddle',
  'riddle-me': 'riddle',
  'brain-teaser': 'riddle',
  'lateral-thinking': 'riddle',
  'logic-puzzle': 'riddle',
  'deduction-game': 'riddle',
  'fact-or-fiction': 'riddle',
  'two-truths': 'riddle',
  'fact-check': 'riddle',
  'guess-the-number': 'riddle',
  'optical-illusion': 'riddle',
  'hidden-objects': 'riddle',
  'spot-difference': 'riddle',

  // Two-choice engine
  'would-you-rather': 'two-choice',
  'this-or-that': 'two-choice',
  'opposite-day': 'two-choice',
  'most-likely': 'two-choice',

  // Physical engine (timer + instruction)
  'plank-challenge': 'physical',
  'squat-challenge': 'physical',
  'pushup-showdown': 'physical',
  'jumping-jacks': 'physical',
  'wall-sit': 'physical',
  'balance-test': 'physical',
  'balance-challenge': 'physical',
  'endurance-test': 'physical',
  'breath-hold': 'physical',
  'stretch-challenge': 'physical',
  'meditation-game': 'physical',
  'one-leg-stand': 'physical',
  'balance-beam': 'physical',
  'laughter-hold': 'physical',

  // Score track engine (physical competition)
  'rock-paper-scissors': 'score-track',
  'thumb-war': 'score-track',
  'arm-wrestle': 'score-track',
  'stare-down': 'score-track',
  'staring-match': 'score-track',
  'laugh-contest': 'score-track',
  'eye-contact': 'score-track',
  'duel-master': 'score-track',
  'finger-fight': 'score-track',

  // Trivia engine
  'quick-math': 'trivia',
  'trivia-flash': 'trivia',
  'quiz-show': 'trivia',
  'general-knowledge': 'trivia',
  'history-hunt': 'trivia',
  'science-quiz': 'trivia',
  'geography-genius': 'trivia',
  'pop-culture': 'trivia',
  'sports-trivia': 'trivia',
  'food-facts': 'trivia',
  'animal-kingdom': 'trivia',
  'space-explorer': 'trivia',
  'tech-trivia': 'trivia',
  'number-sequence': 'trivia',
  'pattern-recognition': 'trivia',
  'sequence-master': 'trivia',
};

function getEngine(gameId: string): GameEngine {
  return ENGINE_MAP[gameId] || 'prompt-card';
}

// ─── Prompt pool selector ──────────────────────────────────────────────────
function getPromptPool(gameId: string, mode: GameMode): any[] {
  const lang = PROMPTS_DATA.getLanguage();
  const data = PROMPTS_DATA.generateMassiveData();
  const countryPrompts = PROMPTS_DATA.getCountryPrompts();

  // Use localized prompts if available and language isn't English
  if (lang !== 'en' && countryPrompts) {
    if (gameId === 'truth-or-dare') {
      return mode === 'truth'
        ? countryPrompts.truthQuestions
        : countryPrompts.dareChallenges;
    }
    if (gameId === 'never-have-i' || gameId === 'never-have-i-ever') {
      return countryPrompts.neverHaveIEver;
    }
    if (gameId === 'would-you-rather') {
      return countryPrompts.wouldYouRather;
    }
    if (gameId === 'riddle-battle' || gameId === 'riddle-me') {
      return countryPrompts.riddles;
    }
  }

  // English / fallback routing
  const map: Record<string, any[]> = {
    'truth-or-dare': mode === 'truth' ? data.truthQuestions : data.dareChallenges,
    'never-have-i': data.neverHaveIEver,
    'never-have-i-ever': data.neverHaveIEver,
    'would-you-rather': data.wouldYouRather,
    'riddle-battle': data.riddles,
    'riddle-me': data.riddles,
    'charades': data.charadesAnimals,
    'pictionary': data.charadesObjects,
    'emoji-pictionary': data.emojiWords,
    'heads-up': data.charadesAnimals,
    'drawing-doodle': data.charadesObjects,
    'word-chain': data.wordChainWords,
    'dessert-roulette': data.dessertDares,
    'compliment-chain': data.complimentPrompts,
    'sound-effects': data.soundEffects,
    'lip-sync': data.lipReadingWords,
    'photo-scavenger': data.scavengerItems,
    'story-starter': data.truthQuestions,
    'limerick-game': data.truthQuestions,
    'hot-seat': data.truthQuestions,
  };

  return map[gameId] || data.truthQuestions;
}

// ─── Trivia questions per game ─────────────────────────────────────────────
const TRIVIA_BANKS: Record<string, { q: string; a: string; options: string[] }[]> = {
  'quick-math': [
    { q: '7 × 8 = ?', a: '56', options: ['54', '56', '58', '64'] },
    { q: '144 ÷ 12 = ?', a: '12', options: ['10', '11', '12', '13'] },
    { q: '25% of 80 = ?', a: '20', options: ['15', '20', '25', '30'] },
    { q: '√64 = ?', a: '8', options: ['6', '7', '8', '9'] },
    { q: '3³ = ?', a: '27', options: ['9', '18', '27', '36'] },
    { q: '15 × 15 = ?', a: '225', options: ['200', '215', '225', '235'] },
    { q: '1000 ÷ 8 = ?', a: '125', options: ['100', '112', '125', '150'] },
    { q: '17 + 28 = ?', a: '45', options: ['43', '44', '45', '46'] },
    { q: '9 × 9 = ?', a: '81', options: ['72', '81', '90', '99'] },
    { q: '200 - 67 = ?', a: '133', options: ['123', '133', '143', '153'] },
  ],
  'geography-genius': [
    { q: 'Capital of Japan?', a: 'Tokyo', options: ['Osaka', 'Tokyo', 'Kyoto', 'Hiroshima'] },
    { q: 'Largest country by area?', a: 'Russia', options: ['Canada', 'China', 'USA', 'Russia'] },
    { q: 'Which continent is Ghana in?', a: 'Africa', options: ['Asia', 'Europe', 'Africa', 'South America'] },
    { q: 'Capital of Brazil?', a: 'Brasília', options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'] },
    { q: 'Longest river in the world?', a: 'Nile', options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'] },
    { q: 'Capital of Australia?', a: 'Canberra', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'] },
    { q: 'Which country has the most islands?', a: 'Sweden', options: ['Indonesia', 'Philippines', 'Sweden', 'Norway'] },
    { q: 'Mount Everest is in which range?', a: 'Himalayas', options: ['Andes', 'Alps', 'Himalayas', 'Rockies'] },
    { q: 'Capital of Canada?', a: 'Ottawa', options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'] },
    { q: 'Sahara Desert is in?', a: 'Africa', options: ['Asia', 'Africa', 'Australia', 'South America'] },
  ],
  'science-quiz': [
    { q: 'Chemical symbol for Gold?', a: 'Au', options: ['Go', 'Gd', 'Au', 'Ag'] },
    { q: 'How many bones in adult human body?', a: '206', options: ['196', '206', '216', '226'] },
    { q: 'Speed of light (approx)?', a: '300,000 km/s', options: ['30,000 km/s', '300,000 km/s', '3,000,000 km/s', '3,000 km/s'] },
    { q: 'What planet is closest to the Sun?', a: 'Mercury', options: ['Venus', 'Mercury', 'Mars', 'Earth'] },
    { q: 'What gas do plants absorb?', a: 'CO₂', options: ['Oxygen', 'Nitrogen', 'CO₂', 'Hydrogen'] },
    { q: 'How many chromosomes in human cells?', a: '46', options: ['23', '44', '46', '48'] },
    { q: 'What is H₂O?', a: 'Water', options: ['Hydrogen', 'Oxygen', 'Water', 'Acid'] },
    { q: 'Largest organ in human body?', a: 'Skin', options: ['Liver', 'Lungs', 'Brain', 'Skin'] },
    { q: 'What does DNA stand for?', a: 'Deoxyribonucleic Acid', options: ['Digital Nucleic Acid', 'Deoxyribonucleic Acid', 'Dynamic Nucleotide Array', 'Dense Nucleic Atom'] },
    { q: 'Which planet has rings?', a: 'Saturn', options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'] },
  ],
  'pop-culture': [
    { q: 'How many fingers does Mickey Mouse have?', a: '4', options: ['3', '4', '5', '6'] },
    { q: '"I\'ll be back" is from which movie?', a: 'Terminator', options: ['RoboCop', 'Terminator', 'Predator', 'Die Hard'] },
    { q: 'Which band sang "Bohemian Rhapsody"?', a: 'Queen', options: ['Led Zeppelin', 'The Beatles', 'Queen', 'Pink Floyd'] },
    { q: 'How many seasons of Game of Thrones?', a: '8', options: ['6', '7', '8', '9'] },
    { q: 'What color is the Grinch?', a: 'Green', options: ['Red', 'Blue', 'Green', 'Yellow'] },
    { q: '"Just Do It" is whose slogan?', a: 'Nike', options: ['Adidas', 'Nike', 'Puma', 'Reebok'] },
    { q: 'Spider-Man was bitten by what?', a: 'Radioactive Spider', options: ['Snake', 'Ant', 'Radioactive Spider', 'Scorpion'] },
    { q: 'Who played Iron Man?', a: 'Robert Downey Jr.', options: ['Chris Evans', 'Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo'] },
    { q: 'First Harry Potter book title?', a: "Philosopher's Stone", options: ["Philosopher's Stone", 'Chamber of Secrets', 'Prisoner of Azkaban', 'Goblet of Fire'] },
    { q: 'What is Batman\'s real name?', a: 'Bruce Wayne', options: ['Clark Kent', 'Bruce Banner', 'Bruce Wayne', 'Peter Parker'] },
  ],
  'sports-trivia': [
    { q: 'How many players in a soccer team?', a: '11', options: ['9', '10', '11', '12'] },
    { q: 'How many rings on the Olympic flag?', a: '5', options: ['4', '5', '6', '7'] },
    { q: 'Which country invented basketball?', a: 'USA', options: ['Canada', 'USA', 'UK', 'Germany'] },
    { q: 'How many points is a touchdown worth?', a: '6', options: ['3', '6', '7', '9'] },
    { q: 'Wimbledon is played on which surface?', a: 'Grass', options: ['Clay', 'Grass', 'Hard', 'Carpet'] },
    { q: 'How many holes in a golf round?', a: '18', options: ['9', '12', '18', '24'] },
    { q: 'How many sets to win in tennis (men)?', a: '3', options: ['2', '3', '4', '5'] },
    { q: 'Which country has won the most World Cups?', a: 'Brazil', options: ['Germany', 'Italy', 'Brazil', 'Argentina'] },
    { q: 'How many players in basketball?', a: '5', options: ['4', '5', '6', '7'] },
    { q: 'What sport uses a shuttlecock?', a: 'Badminton', options: ['Tennis', 'Squash', 'Badminton', 'Pickleball'] },
  ],
};

function getTriviaBank(gameId: string): { q: string; a: string; options: string[] }[] {
  return TRIVIA_BANKS[gameId] || TRIVIA_BANKS['pop-culture'];
}

// ─── Main GameScreen class ────────────────────────────────────────────────
export class GameScreen {
  private container: HTMLElement | null = null;
  private storage: Storage = new Storage();
  private game: typeof GAMES_DATA.games[0] | null = null;
  private players: Player[] = [];
  private hostId: string | null = null;
  private gameMode: GameMode = 'challenge';
  private currentPlayerIndex: number = 0;
  private round: number = 1;
  private maxRounds: number = 10;
  private scores: Record<string, number> = {};
  private engine: GameEngine = 'prompt-card';
  private promptPool: any[] = [];
  private usedIndices: Set<number> = new Set();
  private currentPrompt: any = null;
  private promptRevealed: boolean = false;
  private timerInterval: number | null = null;
  private timerRemaining: number = 30;
  private copilot: CopilotCharacter | null = null;
  private onModeChange: ((mode: GameMode) => void) | null = null;
  private onGameEnd: ((result: GameResult) => void) | null = null;
  private onExit: (() => void) | null = null;

  // Hot potato state
  private hotPotatoActive: boolean = false;
  private hotPotatoTimer: number | null = null;
  private hotPotatoCountdown: number = 0;

  // Trivia state
  private triviaBank: { q: string; a: string; options: string[] }[] = [];
  private triviaIndex: number = 0;
  private triviaAnswered: boolean = false;

  setGame(game: typeof GAMES_DATA.games[0]): void { this.game = game; }
  setPlayers(players: Player[]): void {
    this.players = players;
    players.forEach(p => { this.scores[p.id] = 0; });
  }
  setHostId(hostId: string | null): void { this.hostId = hostId; }
  setGameMode(mode: GameMode): void { this.gameMode = mode; }
  setOnModeChange(cb: (mode: GameMode) => void): void { this.onModeChange = cb; }
  setOnGameEnd(cb: (result: GameResult) => void): void { this.onGameEnd = cb; }
  setOnExit(cb: () => void): void { this.onExit = cb; }

  render(): HTMLElement {
    if (!this.game) throw new Error('No game set');
    this.engine = getEngine(this.game.id);
    this.promptPool = getPromptPool(this.game.id, this.gameMode);
    this.triviaBank = getTriviaBank(this.game.id);

    this.container = document.createElement('div');
    this.container.className = 'gs-root';
    this.container.innerHTML = this.buildStyles() + this.buildShell();
    this.renderCurrentEngine();
    this.attachBaseListeners();
    this.initCopilot();
    return this.container;
  }

  // ─── Styles ───────────────────────────────────────────────────────────────
  private buildStyles(): string {
    const color = this.game?.color || '#667eea';
    return `<style>
      .gs-root{position:fixed;inset:0;background:linear-gradient(160deg,#0a0a0f 0%,#12122a 60%,#0a0a0f 100%);color:#fff;display:flex;flex-direction:column;font-family:'Inter',-apple-system,sans-serif;overflow:hidden;}
      .gs-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;padding-top:calc(16px + env(safe-area-inset-top,0));background:rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;}
      .gs-exit{width:44px;height:44px;background:rgba(255,255,255,0.08);border:none;border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;}
      .gs-exit:active{transform:scale(0.92);background:rgba(255,100,100,0.3);}
      .gs-exit svg{width:22px;height:22px;stroke:#fff;}
      .gs-title{text-align:center;flex:1;}
      .gs-game-name{font-size:16px;font-weight:700;letter-spacing:-0.3px;}
      .gs-round{font-size:12px;color:rgba(255,255,255,0.4);margin-top:2px;}
      .gs-host-badge{display:flex;align-items:center;gap:5px;background:rgba(255,215,0,0.15);border:1px solid rgba(255,215,0,0.3);padding:6px 12px;border-radius:20px;font-size:12px;color:#ffd700;}
      .gs-host-badge svg{width:14px;height:14px;stroke:#ffd700;}

      /* Player strip */
      .gs-players{display:flex;gap:8px;padding:12px 20px;overflow-x:auto;scrollbar-width:none;flex-shrink:0;}
      .gs-players::-webkit-scrollbar{display:none;}
      .gs-player-chip{display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:20px;background:rgba(255,255,255,0.06);border:1.5px solid transparent;transition:all 0.3s;white-space:nowrap;flex-shrink:0;}
      .gs-player-chip.active{border-color:${color};background:${color}22;transform:scale(1.05);}
      .gs-player-chip .chip-avatar{font-size:16px;}
      .gs-player-chip .chip-name{font-size:13px;font-weight:500;}
      .gs-player-chip .chip-score{font-size:12px;color:${color};font-weight:700;}

      /* Scores bar */
      .gs-scores{display:flex;gap:6px;padding:0 20px 8px;flex-wrap:wrap;flex-shrink:0;}
      .gs-score-chip{display:flex;align-items:center;gap:5px;padding:4px 10px;background:rgba(255,255,255,0.06);border-radius:12px;font-size:12px;}
      .gs-score-chip.winning{background:${color}30;color:${color};}

      /* Main content area */
      .gs-body{flex:1;display:flex;flex-direction:column;overflow-y:auto;padding:16px 20px;gap:16px;-webkit-overflow-scrolling:touch;}

      /* Current player card */
      .gs-current-player{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,0.05);border-radius:16px;padding:14px 18px;border:1px solid rgba(255,255,255,0.08);}
      .gs-cp-avatar{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0;}
      .gs-cp-avatar.is-host{box-shadow:0 0 0 2.5px #ffd700;}
      .gs-cp-name{font-size:20px;font-weight:700;}
      .gs-cp-label{font-size:12px;color:rgba(255,255,255,0.5);margin-top:2px;}
      .gs-cp-turn-label{font-size:12px;color:${color};margin-top:2px;}

      /* Prompt card */
      .gs-prompt-card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;align-items:center;text-align:center;cursor:pointer;transition:all 0.3s;min-height:160px;justify-content:center;position:relative;overflow:hidden;}
      .gs-prompt-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,${color}15,transparent);opacity:0;transition:opacity 0.3s;}
      .gs-prompt-card.revealed::before{opacity:1;}
      .gs-prompt-card:active{transform:scale(0.98);}
      .gs-prompt-icon{width:64px;height:64px;border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;background:${color}20;}
      .gs-prompt-icon svg{width:36px;height:36px;color:${color};}
      .gs-prompt-tap{font-size:16px;color:rgba(255,255,255,0.35);font-weight:500;}
      .gs-prompt-text{font-size:20px;font-weight:600;line-height:1.45;color:#fff;}
      .gs-prompt-answer{margin-top:14px;padding:12px 16px;background:rgba(255,255,255,0.06);border-radius:12px;font-size:14px;color:rgba(255,255,255,0.65);display:none;}
      .gs-prompt-answer.show{display:block;animation:fadeSlideUp 0.3s ease;}
      .gs-mode-badge{position:absolute;top:12px;right:12px;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;background:${color}30;color:${color};border:1px solid ${color}50;}

      /* Mode tabs (only for truth-or-dare type games) */
      .gs-mode-tabs{display:flex;gap:6px;background:rgba(255,255,255,0.05);padding:5px;border-radius:14px;flex-shrink:0;}
      .gs-mode-tab{flex:1;padding:9px;border-radius:10px;border:none;font-size:13px;font-weight:600;color:rgba(255,255,255,0.45);cursor:pointer;background:transparent;transition:all 0.25s;}
      .gs-mode-tab.active{background:${color};color:#fff;box-shadow:0 4px 16px ${color}60;}

      /* Hot potato engine */
      .gs-potato{display:flex;flex-direction:column;align-items:center;gap:24px;padding:20px;}
      .gs-potato-timer{width:180px;height:180px;position:relative;display:flex;align-items:center;justify-content:center;}
      .gs-potato-ring{position:absolute;inset:0;}
      .gs-potato-ring circle{transition:stroke-dashoffset 1s linear;transform-origin:center;transform:rotate(-90deg);}
      .gs-potato-count{font-size:56px;font-weight:800;line-height:1;}
      .gs-potato-label{font-size:14px;color:rgba(255,255,255,0.5);margin-top:4px;}
      .gs-potato-instruction{background:rgba(255,255,255,0.06);border-radius:16px;padding:16px 20px;text-align:center;font-size:15px;color:rgba(255,255,255,0.8);width:100%;}
      .gs-potato-pass{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:18px;border-radius:16px;border:none;font-size:16px;font-weight:700;cursor:pointer;background:linear-gradient(135deg,${color},${color}cc);color:#fff;box-shadow:0 6px 24px ${color}50;transition:all 0.2s;}
      .gs-potato-pass:active{transform:scale(0.97);}
      .gs-potato-loser{text-align:center;padding:20px;}
      .gs-potato-loser .loser-emoji{font-size:64px;display:block;margin-bottom:12px;}
      .gs-potato-loser h2{font-size:24px;font-weight:800;margin-bottom:8px;}
      .gs-potato-loser p{color:rgba(255,255,255,0.6);font-size:15px;}

      /* Word input engine */
      .gs-word{display:flex;flex-direction:column;gap:16px;}
      .gs-word-prompt{background:rgba(255,255,255,0.05);border-radius:16px;padding:20px;text-align:center;}
      .gs-word-prompt .wp-label{font-size:12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;}
      .gs-word-prompt .wp-word{font-size:28px;font-weight:800;letter-spacing:2px;color:${color};}
      .gs-word-prompt .wp-hint{font-size:13px;color:rgba(255,255,255,0.5);margin-top:6px;}
      .gs-word-input-wrap{display:flex;gap:10px;}
      .gs-word-input{flex:1;padding:14px 18px;background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.12);border-radius:14px;font-size:18px;font-weight:600;color:#fff;outline:none;transition:border-color 0.2s;font-family:inherit;}
      .gs-word-input:focus{border-color:${color};}
      .gs-word-input::placeholder{color:rgba(255,255,255,0.25);}
      .gs-word-submit{padding:14px 20px;background:${color};border:none;border-radius:14px;color:#fff;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.2s;}
      .gs-word-submit:active{transform:scale(0.95);}
      .gs-word-result{padding:14px 18px;border-radius:14px;font-size:15px;font-weight:600;text-align:center;display:none;}
      .gs-word-result.correct{display:block;background:rgba(78,203,113,0.2);color:#4ecb71;border:1px solid rgba(78,203,113,0.3);}
      .gs-word-result.wrong{display:block;background:rgba(255,71,87,0.2);color:#ff4757;border:1px solid rgba(255,71,87,0.3);}

      /* Tap reaction engine */
      .gs-tap{display:flex;flex-direction:column;align-items:center;gap:20px;}
      .gs-tap-zone{width:200px;height:200px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;background:${color}20;border:3px solid ${color}50;transition:all 0.15s;position:relative;overflow:hidden;}
      .gs-tap-zone:active{transform:scale(0.93);background:${color}40;}
      .gs-tap-zone .tz-icon{font-size:64px;}
      .gs-tap-zone .tz-ripple{position:absolute;width:100%;height:100%;border-radius:50%;background:${color};opacity:0;animation:tapRipple 0.4s ease-out;}
      @keyframes tapRipple{0%{transform:scale(0);opacity:0.4;}100%{transform:scale(2);opacity:0;}}
      .gs-tap-count{font-size:48px;font-weight:800;color:${color};}
      .gs-tap-label{font-size:14px;color:rgba(255,255,255,0.5);}
      .gs-tap-timer{font-size:20px;font-weight:700;}

      /* Charades engine */
      .gs-charades-card{background:linear-gradient(135deg,${color}20,${color}08);border:1.5px solid ${color}40;border-radius:20px;padding:28px 24px;text-align:center;position:relative;}
      .gs-charades-category{font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:${color};margin-bottom:12px;font-weight:600;}
      .gs-charades-word{font-size:32px;font-weight:800;margin-bottom:12px;letter-spacing:-0.5px;}
      .gs-charades-instruction{font-size:14px;color:rgba(255,255,255,0.55);line-height:1.5;}
      .gs-charades-cover{position:absolute;inset:0;background:rgba(10,10,15,0.92);border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all 0.3s;}
      .gs-charades-cover .cc-icon{font-size:48px;margin-bottom:12px;}
      .gs-charades-cover .cc-text{font-size:16px;font-weight:600;color:rgba(255,255,255,0.7);}
      .gs-charades-cover.hidden{opacity:0;pointer-events:none;}
      .gs-charades-timer-bar{height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden;margin-top:16px;}
      .gs-charades-timer-fill{height:100%;background:${color};border-radius:2px;transition:width 1s linear;}

      /* Riddle engine */
      .gs-riddle-q{background:rgba(255,255,255,0.05);border-radius:16px;padding:22px;text-align:center;font-size:18px;font-weight:600;line-height:1.5;}
      .gs-riddle-reveal{width:100%;padding:14px;border-radius:14px;border:1.5px dashed rgba(255,255,255,0.2);background:transparent;color:rgba(255,255,255,0.5);font-size:14px;font-weight:600;cursor:pointer;transition:all 0.25s;font-family:inherit;}
      .gs-riddle-reveal:hover{border-color:${color};color:${color};}
      .gs-riddle-answer{padding:16px;background:${color}20;border:1px solid ${color}40;border-radius:14px;text-align:center;font-size:18px;font-weight:700;color:${color};display:none;animation:fadeSlideUp 0.3s ease;}
      .gs-riddle-answer.show{display:block;}

      /* Two-choice engine */
      .gs-choice-vs{display:flex;align-items:center;gap:12px;}
      .gs-choice-btn{flex:1;padding:20px 16px;border-radius:16px;border:2px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#fff;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.25s;line-height:1.4;font-family:inherit;}
      .gs-choice-btn:active{transform:scale(0.96);}
      .gs-choice-btn.selected-a{border-color:${color};background:${color}25;}
      .gs-choice-btn.selected-b{border-color:#ff6b6b;background:#ff6b6b25;}
      .gs-choice-vs-badge{font-size:14px;font-weight:800;color:rgba(255,255,255,0.3);flex-shrink:0;}
      .gs-choice-votes{display:flex;gap:8px;margin-top:12px;}
      .gs-choice-vote-bar{flex:1;height:6px;border-radius:3px;background:rgba(255,255,255,0.1);overflow:hidden;}
      .gs-choice-vote-fill{height:100%;border-radius:3px;transition:width 0.5s ease;}

      /* Physical engine */
      .gs-physical{display:flex;flex-direction:column;align-items:center;gap:20px;}
      .gs-physical-instruction{width:100%;background:${color}15;border:1.5px solid ${color}30;border-radius:16px;padding:22px;text-align:center;font-size:18px;font-weight:600;line-height:1.5;color:#fff;}
      .gs-physical-timer-big{font-size:80px;font-weight:800;color:${color};line-height:1;}
      .gs-physical-timer-label{font-size:14px;color:rgba(255,255,255,0.4);}
      .gs-physical-start{width:100%;padding:18px;border-radius:16px;border:none;background:linear-gradient(135deg,${color},${color}bb);color:#fff;font-size:17px;font-weight:700;cursor:pointer;transition:all 0.2s;font-family:inherit;}
      .gs-physical-start:active{transform:scale(0.97);}

      /* Score track engine */
      .gs-scoretrack{display:flex;flex-direction:column;gap:16px;}
      .gs-scoretrack-instruction{text-align:center;font-size:16px;color:rgba(255,255,255,0.7);line-height:1.5;}
      .gs-scoretrack-players{display:flex;gap:12px;}
      .gs-scoretrack-player{flex:1;background:rgba(255,255,255,0.05);border-radius:16px;padding:16px;text-align:center;border:1.5px solid transparent;transition:all 0.25s;}
      .gs-scoretrack-player.winner-selected{border-color:${color};background:${color}20;}
      .gs-scoretrack-avatar{font-size:32px;margin-bottom:8px;}
      .gs-scoretrack-name{font-size:14px;font-weight:600;margin-bottom:4px;}
      .gs-scoretrack-pts{font-size:20px;font-weight:800;color:${color};}
      .gs-scoretrack-win-btn{width:100%;padding:12px;border-radius:12px;border:none;background:${color}25;color:${color};font-size:14px;font-weight:700;cursor:pointer;margin-top:8px;transition:all 0.2s;font-family:inherit;}
      .gs-scoretrack-win-btn:active{transform:scale(0.96);}

      /* Trivia engine */
      .gs-trivia-q{background:rgba(255,255,255,0.05);border-radius:16px;padding:22px;font-size:18px;font-weight:600;line-height:1.5;text-align:center;}
      .gs-trivia-options{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
      .gs-trivia-opt{padding:14px 12px;border-radius:14px;border:1.5px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#fff;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.25s;font-family:inherit;text-align:center;line-height:1.3;}
      .gs-trivia-opt:active{transform:scale(0.96);}
      .gs-trivia-opt.correct{border-color:#4ecb71;background:rgba(78,203,113,0.2);color:#4ecb71;}
      .gs-trivia-opt.wrong{border-color:#ff4757;background:rgba(255,71,87,0.2);color:#ff4757;}
      .gs-trivia-opt.disabled{pointer-events:none;opacity:0.5;}

      /* Footer */
      .gs-footer{padding:16px 20px;padding-bottom:calc(16px + env(safe-area-inset-bottom,0));background:rgba(255,255,255,0.03);border-top:1px solid rgba(255,255,255,0.06);flex-shrink:0;}
      .gs-footer-actions{display:flex;gap:10px;}
      .gs-btn{display:flex;align-items:center;justify-content:center;gap:8px;padding:15px 20px;border-radius:14px;border:none;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.2s;font-family:inherit;}
      .gs-btn svg{width:18px;height:18px;stroke:currentColor;}
      .gs-btn:active{transform:scale(0.97);}
      .gs-btn-primary{flex:1;background:linear-gradient(135deg,${color},${color}cc);color:#fff;box-shadow:0 4px 20px ${color}40;}
      .gs-btn-secondary{background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.7);}
      .gs-btn-success{background:rgba(78,203,113,0.2);color:#4ecb71;border:1.5px solid rgba(78,203,113,0.3);}
      .gs-btn-danger{background:rgba(255,71,87,0.15);color:#ff4757;}

      /* Round end modal */
      .gs-modal{position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:200;animation:fadeIn 0.2s ease;}
      .gs-modal-box{background:#1a1a2e;border-radius:24px;padding:28px 24px;width:88%;max-width:340px;animation:scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1);}
      .gs-modal-title{font-size:22px;font-weight:800;text-align:center;margin-bottom:8px;}
      .gs-modal-sub{font-size:14px;color:rgba(255,255,255,0.5);text-align:center;margin-bottom:20px;}
      .gs-modal-actions{display:flex;gap:10px;}
      .gs-modal-actions .gs-btn{flex:1;}

      /* Animations */
      @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
      @keyframes scaleIn{from{opacity:0;transform:scale(0.85);}to{opacity:1;transform:scale(1);}}
      @keyframes fadeSlideUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
      @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}
      @keyframes shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-6px);}75%{transform:translateX(6px);}}
      @keyframes potatoGlow{0%,100%{box-shadow:0 0 20px #ff6b6b40;}50%{box-shadow:0 0 60px #ff6b6b90;}}
    </style>`;
  }

  // ─── Shell HTML ───────────────────────────────────────────────────────────
  private buildShell(): string {
    const isHost = this.currentPlayer()?.id === this.hostId;
    return `
      <div class="gs-header">
        <button class="gs-exit" id="gs-exit">${ICONS.X}</button>
        <div class="gs-title">
          <div class="gs-game-name">${this.game?.icon} ${this.game?.name}</div>
          <div class="gs-round" id="gs-round">Round ${this.round} of ${this.maxRounds}</div>
        </div>
        <div class="gs-host-badge">${ICONS.Crown}<span>Host</span></div>
      </div>

      <div class="gs-players" id="gs-players">
        ${this.buildPlayerChips()}
      </div>

      <div class="gs-body" id="gs-body">
        <!-- engine renders here -->
      </div>

      <div class="gs-footer" id="gs-footer">
        <!-- footer renders here -->
      </div>
    `;
  }

  private buildPlayerChips(): string {
    return this.players.map((p, i) => `
      <div class="gs-player-chip ${i === this.currentPlayerIndex ? 'active' : ''}" data-player-id="${p.id}">
        <span class="chip-avatar">${p.avatar}</span>
        <span class="chip-name">${p.name}</span>
        <span class="chip-score" id="score-chip-${p.id}">${this.scores[p.id] || 0}</span>
      </div>
    `).join('');
  }

  private currentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  // ─── Engine renderers ─────────────────────────────────────────────────────
  private renderCurrentEngine(): void {
    const body = this.container?.querySelector('#gs-body') as HTMLElement;
    const footer = this.container?.querySelector('#gs-footer') as HTMLElement;
    if (!body || !footer) return;

    this.currentPrompt = null;
    this.promptRevealed = false;

    switch (this.engine) {
      case 'hot-potato': this.renderHotPotato(body, footer); break;
      case 'word-input': this.renderWordInput(body, footer); break;
      case 'tap-reaction': this.renderTapReaction(body, footer); break;
      case 'charades': this.renderCharades(body, footer); break;
      case 'riddle': this.renderRiddle(body, footer); break;
      case 'two-choice': this.renderTwoChoice(body, footer); break;
      case 'physical': this.renderPhysical(body, footer); break;
      case 'score-track': this.renderScoreTrack(body, footer); break;
      case 'trivia': this.renderTrivia(body, footer); break;
      default: this.renderPromptCard(body, footer); break;
    }

    this.updatePlayerChips();
    this.updateRoundDisplay();
  }

  // ─── 1. PROMPT CARD ENGINE ────────────────────────────────────────────────
  private renderPromptCard(body: HTMLElement, footer: HTMLElement): void {
    const game = this.game!;
    const player = this.currentPlayer();
    const isHost = player.id === this.hostId;
    const showModeTabs = ['truth-or-dare', 'never-have-i', 'never-have-i-ever', 'dessert-roulette', 'compliment-chain'].includes(game.id);

    body.innerHTML = `
      ${this.buildCurrentPlayerCard(player, isHost)}
      ${showModeTabs ? this.buildModeTabs() : ''}
      <div class="gs-prompt-card" id="gs-prompt-card">
        <div class="gs-prompt-icon">${getGameIcon(game.id)}</div>
        <p class="gs-prompt-tap">Tap to reveal</p>
        <p class="gs-prompt-text" id="gs-prompt-text" style="display:none;"></p>
        <div class="gs-prompt-answer" id="gs-prompt-answer"></div>
      </div>
    `;

    footer.innerHTML = `
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${ICONS.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-success" id="gs-correct">${ICONS.Check}<span>Done ✓</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next"><span>Next</span>${ICONS.ArrowRight}</button>
      </div>
    `;

    const card = body.querySelector('#gs-prompt-card')!;
    card.addEventListener('click', () => {
      if (!this.currentPrompt) {
        this.currentPrompt = this.pickPrompt();
        const textEl = card.querySelector('#gs-prompt-text') as HTMLElement;
        const tapEl = card.querySelector('.gs-prompt-tap') as HTMLElement;
        const iconEl = card.querySelector('.gs-prompt-icon') as HTMLElement;
        if (textEl && tapEl) {
          tapEl.style.display = 'none';
          iconEl.style.display = 'none';
          textEl.style.display = 'block';
          textEl.textContent = this.currentPrompt.text;
          card.classList.add('revealed');
        }
        // add mode badge
        const badge = document.createElement('div');
        badge.className = 'gs-mode-badge';
        badge.textContent = this.gameMode.toUpperCase();
        card.appendChild(badge);
      } else if (this.currentPrompt.answer && !this.promptRevealed) {
        this.promptRevealed = true;
        const answerEl = card.querySelector('#gs-prompt-answer') as HTMLElement;
        if (answerEl) {
          answerEl.textContent = `💡 ${this.currentPrompt.answer}`;
          answerEl.classList.add('show');
        }
      }
    });

    footer.querySelector('#gs-skip')?.addEventListener('click', () => {
      this.currentPrompt = null;
      this.renderCurrentEngine();
    });
    footer.querySelector('#gs-correct')?.addEventListener('click', () => {
      this.awardPoints(player.id, 10);
      this.copilot?.react('correct');
      this.playSound('correct');
      this.goNext();
    });
    footer.querySelector('#gs-next')?.addEventListener('click', () => {
      this.copilot?.react('next');
      this.goNext();
    });

    if (showModeTabs) this.attachModeTabListeners(body);
  }

  // ─── 2. HOT POTATO ENGINE ─────────────────────────────────────────────────
  private renderHotPotato(body: HTMLElement, footer: HTMLElement): void {
    const duration = 15 + Math.floor(Math.random() * 16); // 15-30s random
    this.hotPotatoCountdown = duration;
    this.hotPotatoActive = false;

    body.innerHTML = `
      <div class="gs-potato">
        <div style="text-align:center;">
          <p style="font-size:14px;color:rgba(255,255,255,0.5);">Pass the phone! When time runs out...</p>
          <p style="font-size:13px;color:rgba(255,255,255,0.3);margin-top:4px;">🔥 Whoever holds it loses a point!</p>
        </div>
        <div class="gs-potato-timer" id="potato-timer">
          <svg class="gs-potato-ring" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="10"/>
            <circle id="potato-progress" cx="80" cy="80" r="70" fill="none" stroke="#ff6b6b" stroke-width="10"
              stroke-dasharray="${2 * Math.PI * 70}" stroke-dashoffset="0" stroke-linecap="round"/>
          </svg>
          <div>
            <div class="gs-potato-count" id="potato-count">${duration}</div>
            <div class="gs-potato-label">seconds</div>
          </div>
        </div>
        <div class="gs-potato-instruction" id="potato-instruction">
          🥔 Pass the phone to <strong>${this.nextPlayerName()}</strong> as fast as you can!
        </div>
        <button class="gs-potato-pass" id="potato-start">
          ${ICONS.Play} <span>Start Hot Potato!</span>
        </button>
      </div>
    `;

    footer.innerHTML = `
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${ICONS.SkipForward}<span>Skip Round</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next" style="display:none;"><span>Next Round</span>${ICONS.ArrowRight}</button>
      </div>
    `;

    const startBtn = body.querySelector('#potato-start')!;
    const circumference = 2 * Math.PI * 70;

    startBtn.addEventListener('click', () => {
      if (!this.hotPotatoActive) {
        this.hotPotatoActive = true;
        startBtn.textContent = '🔥 PASS IT NOW!';
        (startBtn as HTMLElement).style.animation = 'potatoGlow 0.5s ease infinite';
        this.runHotPotatoTimer(duration, circumference);
      }
    });

    footer.querySelector('#gs-skip')?.addEventListener('click', () => {
      this.clearHotPotato();
      this.goNext();
    });
    footer.querySelector('#gs-next')?.addEventListener('click', () => {
      this.clearHotPotato();
      this.goNext();
    });
  }

  private runHotPotatoTimer(total: number, circumference: number): void {
    let remaining = total;
    const progressEl = this.container?.querySelector('#potato-progress') as SVGCircleElement;
    const countEl = this.container?.querySelector('#potato-count') as HTMLElement;
    const instrEl = this.container?.querySelector('#potato-instruction') as HTMLElement;

    this.hotPotatoTimer = window.setInterval(() => {
      remaining--;
      if (countEl) countEl.textContent = String(remaining);
      if (progressEl) {
        const offset = circumference * (1 - remaining / total);
        progressEl.style.strokeDashoffset = String(offset);
        if (remaining <= 5) progressEl.style.stroke = '#ff2244';
      }

      if (remaining <= 0) {
        this.clearHotPotato();
        const loser = this.currentPlayer();
        this.awardPoints(loser.id, -5);
        this.copilot?.react('wrong');
      this.playSound('wrong');

        const body = this.container?.querySelector('#gs-body') as HTMLElement;
        const footer = this.container?.querySelector('#gs-footer') as HTMLElement;
        if (body) {
          body.innerHTML = `
            <div class="gs-potato-loser">
              <span class="loser-emoji">💥</span>
              <h2>${loser.name} gets burned!</h2>
              <p>You were holding the potato when time ran out!</p>
              <p style="margin-top:12px;font-size:13px;color:rgba(255,255,255,0.3);">-5 points</p>
            </div>
          `;
        }
        if (footer) {
          const nextBtn = footer.querySelector('#gs-next') as HTMLElement;
          const skipBtn = footer.querySelector('#gs-skip') as HTMLElement;
          if (nextBtn) nextBtn.style.display = 'flex';
          if (skipBtn) skipBtn.style.display = 'none';
        }
      }
    }, 1000);
  }

  private clearHotPotato(): void {
    if (this.hotPotatoTimer) {
      clearInterval(this.hotPotatoTimer);
      this.hotPotatoTimer = null;
    }
    this.hotPotatoActive = false;
  }

  private nextPlayerName(): string {
    const next = (this.currentPlayerIndex + 1) % this.players.length;
    return this.players[next]?.name || 'next player';
  }

  // ─── 3. WORD INPUT ENGINE ─────────────────────────────────────────────────
  private renderWordInput(body: HTMLElement, footer: HTMLElement): void {
    const player = this.currentPlayer();
    const isHost = player.id === this.hostId;
    const prompt = this.pickPrompt();
    this.currentPrompt = prompt;

    const gameId = this.game!.id;
    let label = 'Your word:';
    let hint = '';
    let placeholder = 'Type your answer...';

    if (gameId === 'word-chain') {
      const lastLetter = prompt.text?.slice(-1).toUpperCase() || 'A';
      label = `Must start with: "${lastLetter}"`;
      hint = `Previous word: ${prompt.text}`;
      placeholder = `Word starting with ${lastLetter}...`;
    } else if (gameId === 'spelling-bee' || gameId === 'spelling-bee-pro') {
      label = 'Spell this word:';
      hint = 'Type the correct spelling';
      placeholder = 'Spell it out...';
    } else if (gameId === 'anagram-attack') {
      label = 'Unscramble:';
      placeholder = 'What word is it?';
    } else if (gameId === 'word-scramble') {
      label = 'Unscramble these letters:';
      placeholder = 'The word is...';
    } else if (gameId === 'tongue-twister') {
      label = 'Say this 5 times fast:';
      placeholder = 'When ready, tap Done';
    } else if (gameId === 'alphabet-game') {
      label = 'Category: Animals (A-Z)';
      placeholder = 'Name starting with next letter...';
    }

    body.innerHTML = `
      ${this.buildCurrentPlayerCard(player, isHost)}
      <div class="gs-word">
        <div class="gs-word-prompt">
          <div class="wp-label">${label}</div>
          <div class="wp-word">${prompt.text || prompt.icon || '?'}</div>
          ${hint ? `<div class="wp-hint">${hint}</div>` : ''}
        </div>
        <div class="gs-word-input-wrap">
          <input class="gs-word-input" id="gs-word-input" type="text" placeholder="${placeholder}" autocomplete="off" autocorrect="off" spellcheck="false"/>
          <button class="gs-word-submit" id="gs-word-submit">${ICONS.Check}</button>
        </div>
        <div class="gs-word-result" id="gs-word-result"></div>
      </div>
    `;

    footer.innerHTML = `
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${ICONS.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next"><span>Next</span>${ICONS.ArrowRight}</button>
      </div>
    `;

    const input = body.querySelector('#gs-word-input') as HTMLInputElement;
    const submitBtn = body.querySelector('#gs-word-submit')!;
    const resultEl = body.querySelector('#gs-word-result') as HTMLElement;

    const checkAnswer = () => {
      const val = input.value.trim().toLowerCase();
      if (!val) return;
      const correct = prompt.answer?.toLowerCase();

      // For word chain, check if starts with right letter
      if (gameId === 'word-chain') {
        const lastLetter = prompt.text?.slice(-1).toLowerCase();
        if (val.startsWith(lastLetter || '')) {
          resultEl.textContent = `✓ Great! "${val.toUpperCase()}" — pass it on!`;
          resultEl.className = 'gs-word-result correct';
          this.awardPoints(player.id, 10);
          this.copilot?.react('correct');
      this.playSound('correct');
        } else {
          resultEl.textContent = `✗ Must start with "${lastLetter?.toUpperCase()}"`;
          resultEl.className = 'gs-word-result wrong';
          resultEl.style.animation = 'shake 0.4s ease';
        }
        return;
      }

      // For tongue twister / open prompts — always award
      if (!correct || gameId === 'tongue-twister' || gameId === 'limerick-game') {
        resultEl.textContent = '✓ Nice! Others vote if it counts!';
        resultEl.className = 'gs-word-result correct';
        this.awardPoints(player.id, 10);
        return;
      }

      if (val === correct) {
        resultEl.textContent = `✓ Correct! The answer is "${correct}"`;
        resultEl.className = 'gs-word-result correct';
        this.awardPoints(player.id, 10);
        this.copilot?.react('correct');
      this.playSound('correct');
      } else {
        resultEl.textContent = `✗ The answer was "${correct}" — try again!`;
        resultEl.className = 'gs-word-result wrong';
        this.copilot?.react('wrong');
      this.playSound('wrong');
      }
    };

    submitBtn.addEventListener('click', checkAnswer);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkAnswer(); });

    footer.querySelector('#gs-skip')?.addEventListener('click', () => this.goNext());
    footer.querySelector('#gs-next')?.addEventListener('click', () => this.goNext());

    setTimeout(() => input.focus(), 300);
  }

  // ─── 4. TAP REACTION ENGINE ───────────────────────────────────────────────
  private renderTapReaction(body: HTMLElement, footer: HTMLElement): void {
    const player = this.currentPlayer();
    const gameId = this.game!.id;
    let tapCount = 0;
    let timerSecs = 10;
    let gameRunning = false;

    const icons: Record<string, string> = {
      'speed-tap': '👆', 'button-mash': '🎮', 'reaction-test': '⚡',
      'rhythm-tap': '🥁', 'shape-tap': '⬡', 'color-match': '🎨',
      'memory-tap': '🧠', 'countdown': '⏰', 'ninja-clap': '🥷', 'hand-slap': '✋',
    };
    const icon = icons[gameId] || '👆';
    const targetTaps = gameId === 'button-mash' ? 50 : 20;
    const isCountMode = ['button-mash', 'speed-tap', 'ninja-clap'].includes(gameId);

    body.innerHTML = `
      <div class="gs-tap">
        <div>
          <p style="text-align:center;font-size:14px;color:rgba(255,255,255,0.5);">${player.name}'s turn</p>
          ${isCountMode ? `<p style="text-align:center;font-size:13px;color:rgba(255,255,255,0.3);margin-top:4px;">Tap as fast as you can in ${timerSecs}s!</p>` : `<p style="text-align:center;font-size:13px;color:rgba(255,255,255,0.3);margin-top:4px;">Tap when you're ready to react!</p>`}
        </div>
        <div class="gs-tap-zone" id="gs-tap-zone">
          <div class="gs-tap-zone tz-icon" style="font-size:64px;">${icon}</div>
        </div>
        <div class="gs-tap-count" id="gs-tap-count">0</div>
        <div class="gs-tap-label" id="gs-tap-label">${isCountMode ? 'taps' : 'Tap to start!'}</div>
        <div class="gs-tap-timer" id="gs-tap-timer" style="color:rgba(255,255,255,0.4);">${timerSecs}s</div>
      </div>
    `;

    footer.innerHTML = `
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${ICONS.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next" style="display:none;"><span>Next</span>${ICONS.ArrowRight}</button>
      </div>
    `;

    const zone = body.querySelector('#gs-tap-zone')!;
    const countEl = body.querySelector('#gs-tap-count') as HTMLElement;
    const labelEl = body.querySelector('#gs-tap-label') as HTMLElement;
    const timerEl = body.querySelector('#gs-tap-timer') as HTMLElement;

    const finishGame = () => {
      gameRunning = false;
      const pts = Math.min(tapCount * 2, 50);
      this.awardPoints(player.id, pts);
      labelEl.textContent = `${tapCount} taps = +${pts} points!`;
      timerEl.style.color = '#4ecb71';
      const nextBtn = footer.querySelector('#gs-next') as HTMLElement;
      const skipBtn = footer.querySelector('#gs-skip') as HTMLElement;
      if (nextBtn) nextBtn.style.display = 'flex';
      if (skipBtn) skipBtn.style.display = 'none';
    };

    zone.addEventListener('click', () => {
      // Add ripple
      const ripple = document.createElement('div');
      ripple.className = 'tz-ripple';
      zone.appendChild(ripple);
      setTimeout(() => ripple.remove(), 400);

      if (!gameRunning && isCountMode) {
        gameRunning = true;
        let remaining = timerSecs;
        timerEl.style.color = '#fff';
        const interval = window.setInterval(() => {
          remaining--;
          timerEl.textContent = `${remaining}s`;
          if (remaining <= 3) timerEl.style.color = '#ff4757';
          if (remaining <= 0) {
            clearInterval(interval);
            finishGame();
          }
        }, 1000);
      }

      if (gameRunning || !isCountMode) {
        tapCount++;
        countEl.textContent = String(tapCount);
        if (!isCountMode && tapCount >= 1 && !gameRunning) {
          const elapsed = Date.now();
          gameRunning = true;
          // For reaction test, measure time until next tap
          labelEl.textContent = 'Now tap again as fast as possible!';
          countEl.textContent = '⏱';
          const start = Date.now();
          const onNextTap = () => {
            const ms = Date.now() - start;
            const pts = ms < 500 ? 20 : ms < 1000 ? 15 : ms < 2000 ? 10 : 5;
            this.awardPoints(player.id, pts);
            countEl.textContent = `${ms}ms`;
            labelEl.textContent = `Reaction time! +${pts} pts`;
            zone.removeEventListener('click', onNextTap);
            gameRunning = false;
            const nextBtn = footer.querySelector('#gs-next') as HTMLElement;
            const skipBtn = footer.querySelector('#gs-skip') as HTMLElement;
            if (nextBtn) nextBtn.style.display = 'flex';
            if (skipBtn) skipBtn.style.display = 'none';
          };
          setTimeout(() => zone.addEventListener('click', onNextTap), 50);
        }
      }
    });

    footer.querySelector('#gs-skip')?.addEventListener('click', () => {
      this.clearTimer();
      this.goNext();
    });
    footer.querySelector('#gs-next')?.addEventListener('click', () => this.goNext());
  }

  // ─── 5. CHARADES ENGINE ───────────────────────────────────────────────────
  private renderCharades(body: HTMLElement, footer: HTMLElement): void {
    const player = this.currentPlayer();
    const isHost = player.id === this.hostId;
    const prompt = this.pickPrompt();
    this.currentPrompt = prompt;

    const gameId = this.game!.id;
    const instructions: Record<string, string> = {
      'charades': '🎭 Act it out — no talking, no sounds!',
      'pictionary': '🖊️ Draw it on paper — no letters or numbers!',
      'emoji-pictionary': '😀 Act using only emoji gestures!',
      'heads-up': '📱 Hold the phone to your forehead — others give clues!',
      'drawing-doodle': '✏️ Draw it any way you like!',
      'portrait-party': '🎨 Draw the person sitting next to you!',
      'improv-theater': '🎬 Act out the scene! Yes, and...',
      'lip-sync': '👄 Lip sync perfectly — no actual singing!',
      'air-guitar': '🎸 Rock out on your air guitar!',
      'voice-actor': '🎙️ Say this in a different voice or accent!',
      'sound-effects': '🔊 Make only the sound — no words!',
      'dance-improv': '💃 Dance to express this word!',
      'dance-off': '🕺 Show your best dance move for this style!',
      'beat-box': '🥁 Beatbox a rhythm for this!',
      'karaoke': '🎤 Sing this genre — make up the words!',
      'silent-scream': '😱 Scream silently — as dramatically as possible!',
      'slow-motion': '🐢 Do this action in slow motion!',
      'talent-show': '⭐ Perform your best 30-second talent!',
      'hot-seat': '🔥 Answer rapid fire questions from everyone!',
      'battle-rap': '🎤 Freestyle rap about the person to your left!',
    };

    const instruction = instructions[gameId] || '🎭 Act it out — others must guess!';
    const timerDuration = 45;

    body.innerHTML = `
      ${this.buildCurrentPlayerCard(player, isHost)}
      <div class="gs-charades-card" id="charades-card">
        <div class="gs-charades-cover" id="charades-cover">
          <div class="cc-icon">👁️</div>
          <div class="cc-text">Tap to see your word</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.3);margin-top:6px;">Only ${player.name} should look!</div>
        </div>
        <div class="gs-charades-category">${this.game?.category?.toUpperCase()} CHALLENGE</div>
        <div class="gs-charades-word" id="charades-word">${typeof prompt === 'string' ? prompt : prompt.text || prompt.icon || '?'}</div>
        <div class="gs-charades-instruction">${instruction}</div>
        <div class="gs-charades-timer-bar">
          <div class="gs-charades-timer-fill" id="charades-timer-fill" style="width:100%;"></div>
        </div>
      </div>
      <div style="text-align:center;font-size:13px;color:rgba(255,255,255,0.4);padding:4px 0;">Everyone else — look away until they tap!</div>
    `;

    footer.innerHTML = `
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${ICONS.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-success" id="gs-correct">${ICONS.Check}<span>Guessed! +10</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next"><span>Next</span>${ICONS.ArrowRight}</button>
      </div>
    `;

    let timerStarted = false;
    const cover = body.querySelector('#charades-cover') as HTMLElement;
    cover.addEventListener('click', () => {
      cover.classList.add('hidden');
      if (!timerStarted) {
        timerStarted = true;
        this.runCharadesTimer(timerDuration);
      }
    });

    footer.querySelector('#gs-skip')?.addEventListener('click', () => {
      this.clearTimer();
      this.goNext();
    });
    footer.querySelector('#gs-correct')?.addEventListener('click', () => {
      this.clearTimer();
      this.awardPoints(player.id, 10);
      this.copilot?.react('correct');
      this.playSound('correct');
      this.goNext();
    });
    footer.querySelector('#gs-next')?.addEventListener('click', () => {
      this.clearTimer();
      this.goNext();
    });
  }

  private runCharadesTimer(total: number): void {
    let remaining = total;
    const fillEl = this.container?.querySelector('#charades-timer-fill') as HTMLElement;
    this.timerInterval = window.setInterval(() => {
      remaining--;
      if (fillEl) fillEl.style.width = `${(remaining / total) * 100}%`;
      if (remaining <= 10 && fillEl) fillEl.style.background = '#ff4757';
      if (remaining <= 0) {
        this.clearTimer();
        this.copilot?.react('wrong');
      this.playSound('wrong');
      }
    }, 1000);
  }

  // ─── 6. RIDDLE ENGINE ─────────────────────────────────────────────────────
  private renderRiddle(body: HTMLElement, footer: HTMLElement): void {
    const player = this.currentPlayer();
    const isHost = player.id === this.hostId;
    const prompt = this.pickPrompt();
    this.currentPrompt = prompt;

    body.innerHTML = `
      ${this.buildCurrentPlayerCard(player, isHost)}
      <div class="gs-riddle-q">
        <div style="font-size:32px;margin-bottom:14px;">${prompt.icon || '🧩'}</div>
        ${prompt.text}
      </div>
      <button class="gs-riddle-reveal" id="gs-reveal-answer">
        👁️ Reveal Answer
      </button>
      <div class="gs-riddle-answer" id="gs-riddle-answer">
        ${prompt.answer || '?'}
      </div>
    `;

    footer.innerHTML = `
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${ICONS.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-success" id="gs-correct">${ICONS.Check}<span>Got it! +10</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next"><span>Next</span>${ICONS.ArrowRight}</button>
      </div>
    `;

    body.querySelector('#gs-reveal-answer')?.addEventListener('click', () => {
      const answerEl = body.querySelector('#gs-riddle-answer') as HTMLElement;
      if (answerEl) answerEl.classList.add('show');
    });

    footer.querySelector('#gs-skip')?.addEventListener('click', () => this.goNext());
    footer.querySelector('#gs-correct')?.addEventListener('click', () => {
      this.awardPoints(player.id, 10);
      this.copilot?.react('correct');
      this.playSound('correct');
      this.goNext();
    });
    footer.querySelector('#gs-next')?.addEventListener('click', () => this.goNext());
  }

  // ─── 7. TWO CHOICE ENGINE ─────────────────────────────────────────────────
  private renderTwoChoice(body: HTMLElement, footer: HTMLElement): void {
    const player = this.currentPlayer();
    const prompt = this.pickPrompt();
    this.currentPrompt = prompt;

    // Split "Would you rather X or Y?" into two options
    let optA = '', optB = '';
    const text = prompt.text || '';
    const orIdx = text.toLowerCase().indexOf(' or ');
    if (orIdx > -1) {
      optA = text.substring(0, orIdx).replace(/would you rather\s*/i, '').trim();
      optB = text.substring(orIdx + 4).trim().replace(/\?$/, '');
    } else {
      optA = text;
      optB = 'Something else';
    }

    let votesA = 0, votesB = 0;

    body.innerHTML = `
      <div style="text-align:center;padding:8px 0;">
        <p style="font-size:13px;color:rgba(255,255,255,0.4);">Everyone votes — tap your choice!</p>
      </div>
      <div class="gs-choice-vs">
        <button class="gs-choice-btn" id="choice-a">${optA || 'Option A'}</button>
        <span class="gs-choice-vs-badge">OR</span>
        <button class="gs-choice-btn" id="choice-b">${optB || 'Option B'}</button>
      </div>
      <div class="gs-choice-votes" id="choice-votes" style="display:none;">
        <div style="flex:1;text-align:center;">
          <div style="font-size:20px;font-weight:800;" id="votes-a">0</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.4);">votes</div>
          <div class="gs-choice-vote-bar"><div class="gs-choice-vote-fill" id="fill-a" style="background:#667eea;width:50%;"></div></div>
        </div>
        <div style="flex:1;text-align:center;">
          <div style="font-size:20px;font-weight:800;" id="votes-b">0</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.4);">votes</div>
          <div class="gs-choice-vote-bar"><div class="gs-choice-vote-fill" id="fill-b" style="background:#ff6b6b;width:50%;"></div></div>
        </div>
      </div>
      <div style="text-align:center;padding:8px 0;">
        <p style="font-size:13px;color:rgba(255,255,255,0.4);">Discuss why after voting!</p>
      </div>
    `;

    footer.innerHTML = `
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${ICONS.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next"><span>Next</span>${ICONS.ArrowRight}</button>
      </div>
    `;

    const updateVotes = () => {
      const total = votesA + votesB || 1;
      const votesAEl = body.querySelector('#votes-a') as HTMLElement;
      const votesBEl = body.querySelector('#votes-b') as HTMLElement;
      const fillAEl = body.querySelector('#fill-a') as HTMLElement;
      const fillBEl = body.querySelector('#fill-b') as HTMLElement;
      const votesDiv = body.querySelector('#choice-votes') as HTMLElement;
      votesDiv.style.display = 'flex';
      if (votesAEl) votesAEl.textContent = String(votesA);
      if (votesBEl) votesBEl.textContent = String(votesB);
      if (fillAEl) fillAEl.style.width = `${(votesA / total) * 100}%`;
      if (fillBEl) fillBEl.style.width = `${(votesB / total) * 100}%`;
    };

    body.querySelector('#choice-a')?.addEventListener('click', () => {
      votesA++;
      body.querySelector('#choice-a')?.classList.add('selected-a');
      this.awardPoints(player.id, 5);
      updateVotes();
    });
    body.querySelector('#choice-b')?.addEventListener('click', () => {
      votesB++;
      body.querySelector('#choice-b')?.classList.add('selected-b');
      this.awardPoints(player.id, 5);
      updateVotes();
    });

    footer.querySelector('#gs-skip')?.addEventListener('click', () => this.goNext());
    footer.querySelector('#gs-next')?.addEventListener('click', () => this.goNext());
  }

  // ─── 8. PHYSICAL ENGINE ───────────────────────────────────────────────────
  private renderPhysical(body: HTMLElement, footer: HTMLElement): void {
    const player = this.currentPlayer();
    const isHost = player.id === this.hostId;
    const prompt = this.pickPrompt();
    this.currentPrompt = prompt;

    const durations: Record<string, number> = {
      'plank-challenge': 30, 'squat-challenge': 20, 'pushup-showdown': 20,
      'jumping-jacks': 15, 'wall-sit': 30, 'balance-test': 30,
      'balance-challenge': 30, 'endurance-test': 45, 'breath-hold': 20,
      'stretch-challenge': 20, 'meditation-game': 30, 'one-leg-stand': 30,
      'laughter-hold': 30,
    };
    const duration = durations[this.game!.id] || 30;
    let timerRunning = false;
    let remaining = duration;

    body.innerHTML = `
      ${this.buildCurrentPlayerCard(player, isHost)}
      <div class="gs-physical">
        <div class="gs-physical-instruction">
          ${prompt.icon || '💪'} ${prompt.text}
        </div>
        <div>
          <div class="gs-physical-timer-big" id="physical-timer">${duration}</div>
          <div class="gs-physical-timer-label">seconds</div>
        </div>
        <button class="gs-physical-start" id="physical-start">
          ${ICONS.Play} Start Timer
        </button>
      </div>
    `;

    footer.innerHTML = `
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${ICONS.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-success" id="gs-correct" style="display:none;">${ICONS.Check}<span>Completed! +10</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next" style="display:none;"><span>Next</span>${ICONS.ArrowRight}</button>
      </div>
    `;

    const timerEl = body.querySelector('#physical-timer') as HTMLElement;
    const startBtn = body.querySelector('#physical-start') as HTMLElement;

    startBtn.addEventListener('click', () => {
      if (timerRunning) return;
      timerRunning = true;
      startBtn.style.display = 'none';
      const footerCorrect = footer.querySelector('#gs-correct') as HTMLElement;
      const footerNext = footer.querySelector('#gs-next') as HTMLElement;
      const footerSkip = footer.querySelector('#gs-skip') as HTMLElement;

      this.timerInterval = window.setInterval(() => {
        remaining--;
        if (timerEl) timerEl.textContent = String(remaining);
        if (remaining <= 10 && timerEl) timerEl.style.color = '#ff4757';
        if (remaining <= 0) {
          this.clearTimer();
          if (timerEl) timerEl.textContent = '✓';
          timerEl.style.color = '#4ecb71';
          this.awardPoints(player.id, 10);
          if (footerCorrect) footerCorrect.style.display = 'flex';
          if (footerNext) footerNext.style.display = 'flex';
          if (footerSkip) footerSkip.style.display = 'none';
          this.copilot?.react('correct');
      this.playSound('correct');
        }
      }, 1000);
    });

    footer.querySelector('#gs-skip')?.addEventListener('click', () => {
      this.clearTimer();
      this.goNext();
    });
    footer.querySelector('#gs-correct')?.addEventListener('click', () => this.goNext());
    footer.querySelector('#gs-next')?.addEventListener('click', () => this.goNext());
  }

  // ─── 9. SCORE TRACK ENGINE ────────────────────────────────────────────────
  private renderScoreTrack(body: HTMLElement, footer: HTMLElement): void {
    const player = this.currentPlayer();
    const gameId = this.game!.id;

    const instructions: Record<string, string> = {
      'rock-paper-scissors': '✊ Best of 3 — play Rock Paper Scissors!',
      'thumb-war': '👍 1 2 3 4, I declare a thumb war!',
      'arm-wrestle': '💪 Arm wrestle — whoever wins gets the points!',
      'stare-down': '👀 First one to blink loses!',
      'staring-match': '👀 Stare into each other\'s eyes. No blinking!',
      'laugh-contest': '😂 Don\'t laugh! Make faces at each other.',
      'eye-contact': '👁️ Maintain eye contact — no looking away!',
      'duel-master': '⚔️ Face off in this challenge!',
      'finger-fight': '✌️ Thumb war — best 2 out of 3!',
    };

    const instruction = instructions[gameId] || '🏆 Face off and may the best player win!';

    // Pick 2 players who face off
    const p1 = this.players[this.currentPlayerIndex];
    const p2idx = (this.currentPlayerIndex + 1) % this.players.length;
    const p2 = this.players[p2idx];

    body.innerHTML = `
      <div class="gs-scoretrack">
        <div class="gs-scoretrack-instruction">${instruction}</div>
        <div class="gs-scoretrack-players">
          <div class="gs-scoretrack-player" id="st-p1">
            <div class="gs-scoretrack-avatar">${p1.avatar}</div>
            <div class="gs-scoretrack-name">${p1.name}</div>
            <div class="gs-scoretrack-pts">${this.scores[p1.id] || 0} pts</div>
            <button class="gs-scoretrack-win-btn" data-winner="${p1.id}">🏆 ${p1.name} Wins!</button>
          </div>
          <div style="display:flex;align-items:center;font-size:20px;font-weight:800;color:rgba(255,255,255,0.3);">VS</div>
          <div class="gs-scoretrack-player" id="st-p2">
            <div class="gs-scoretrack-avatar">${p2.avatar}</div>
            <div class="gs-scoretrack-name">${p2.name}</div>
            <div class="gs-scoretrack-pts">${this.scores[p2.id] || 0} pts</div>
            <button class="gs-scoretrack-win-btn" data-winner="${p2.id}">🏆 ${p2.name} Wins!</button>
          </div>
        </div>
        <div style="text-align:center;font-size:13px;color:rgba(255,255,255,0.3);">Tap the winner's button when done</div>
      </div>
    `;

    footer.innerHTML = `
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${ICONS.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next"><span>Next</span>${ICONS.ArrowRight}</button>
      </div>
    `;

    body.querySelectorAll('.gs-scoretrack-win-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const winnerId = (btn as HTMLElement).dataset.winner!;
        this.awardPoints(winnerId, 15);
        body.querySelectorAll('.gs-scoretrack-player').forEach(p => {
          if ((p as HTMLElement).id === (winnerId === p1.id ? 'st-p1' : 'st-p2')) {
            p.classList.add('winner-selected');
          }
        });
        this.copilot?.react('correct');
      this.playSound('correct');
      });
    });

    footer.querySelector('#gs-skip')?.addEventListener('click', () => this.goNext());
    footer.querySelector('#gs-next')?.addEventListener('click', () => this.goNext());
  }

  // ─── 10. TRIVIA ENGINE ────────────────────────────────────────────────────
  private renderTrivia(body: HTMLElement, footer: HTMLElement): void {
    const player = this.currentPlayer();
    const isHost = player.id === this.hostId;
    const bank = this.triviaBank;
    if (bank.length === 0) {
      this.renderPromptCard(body, footer);
      return;
    }

    const q = bank[this.triviaIndex % bank.length];
    this.triviaIndex++;
    let answered = false;

    body.innerHTML = `
      ${this.buildCurrentPlayerCard(player, isHost)}
      <div class="gs-trivia-q">${q.q}</div>
      <div class="gs-trivia-options">
        ${q.options.map(opt => `
          <button class="gs-trivia-opt" data-answer="${opt}">${opt}</button>
        `).join('')}
      </div>
    `;

    footer.innerHTML = `
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${ICONS.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next" style="display:none;"><span>Next</span>${ICONS.ArrowRight}</button>
      </div>
    `;

    body.querySelectorAll('.gs-trivia-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const selected = (btn as HTMLElement).dataset.answer;

        body.querySelectorAll('.gs-trivia-opt').forEach(b => {
          const ans = (b as HTMLElement).dataset.answer;
          if (ans === q.a) {
            b.classList.add('correct');
          } else {
            b.classList.add(ans === selected ? 'wrong' : 'disabled');
          }
        });

        if (selected === q.a) {
          this.awardPoints(player.id, 10);
          this.copilot?.react('correct');
      this.playSound('correct');
        } else {
          this.copilot?.react('wrong');
      this.playSound('wrong');
        }

        const nextBtn = footer.querySelector('#gs-next') as HTMLElement;
        const skipBtn = footer.querySelector('#gs-skip') as HTMLElement;
        if (nextBtn) nextBtn.style.display = 'flex';
        if (skipBtn) skipBtn.style.display = 'none';
      });
    });

    footer.querySelector('#gs-skip')?.addEventListener('click', () => this.goNext());
    footer.querySelector('#gs-next')?.addEventListener('click', () => this.goNext());
  }

  // ─── Shared UI helpers ────────────────────────────────────────────────────
  private buildCurrentPlayerCard(player: Player, isHost: boolean): string {
    const color = this.game?.color || '#667eea';
    return `
      <div class="gs-current-player">
        <div class="gs-cp-avatar ${isHost ? 'is-host' : ''}" style="background:${player.color}25;">
          ${player.avatar}
        </div>
        <div>
          <div class="gs-cp-name">${player.name}</div>
          <div class="gs-cp-turn-label">${isHost ? '👑 Host — It\'s your turn!' : "It's your turn!"}</div>
          <div class="gs-cp-label">${this.scores[player.id] || 0} points</div>
        </div>
      </div>
    `;
  }

  private buildModeTabs(): string {
    const color = this.game?.color || '#667eea';
    return `
      <div class="gs-mode-tabs">
        <button class="gs-mode-tab ${this.gameMode === 'truth' ? 'active' : ''}" data-mode="truth">Truth</button>
        <button class="gs-mode-tab ${this.gameMode === 'dare' ? 'active' : ''}" data-mode="dare">Dare</button>
        <button class="gs-mode-tab ${this.gameMode === 'challenge' ? 'active' : ''}" data-mode="challenge">Challenge</button>
        <button class="gs-mode-tab ${this.gameMode === 'free' ? 'active' : ''}" data-mode="free">Free</button>
      </div>
    `;
  }

  private attachModeTabListeners(body: HTMLElement): void {
    body.querySelectorAll('.gs-mode-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.gameMode = (tab as HTMLElement).dataset.mode as GameMode;
        this.promptPool = getPromptPool(this.game!.id, this.gameMode);
        this.usedIndices.clear();
        body.querySelectorAll('.gs-mode-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.onModeChange?.(this.gameMode);
        // Reset prompt card
        const card = body.querySelector('#gs-prompt-card');
        if (card) {
          this.currentPrompt = null;
          const textEl = card.querySelector('#gs-prompt-text') as HTMLElement;
          const tapEl = card.querySelector('.gs-prompt-tap') as HTMLElement;
          const iconEl = card.querySelector('.gs-prompt-icon') as HTMLElement;
          if (textEl) { textEl.style.display = 'none'; textEl.textContent = ''; }
          if (tapEl) tapEl.style.display = 'block';
          if (iconEl) iconEl.style.display = 'flex';
          card.classList.remove('revealed');
          card.querySelectorAll('.gs-mode-badge').forEach(b => b.remove());
          const answerEl = card.querySelector('#gs-prompt-answer') as HTMLElement;
          if (answerEl) { answerEl.classList.remove('show'); answerEl.textContent = ''; }
        }
      });
    });
  }

  private pickPrompt(): any {
    if (this.promptPool.length === 0) return { text: 'What would you do with a million dollars?', icon: '💰' };
    const available = this.promptPool
      .map((p, i) => ({ p, i }))
      .filter(({ i }) => !this.usedIndices.has(i));

    if (available.length === 0) {
      this.usedIndices.clear();
      return this.promptPool[Math.floor(Math.random() * this.promptPool.length)];
    }

    const pick = available[Math.floor(Math.random() * available.length)];
    this.usedIndices.add(pick.i);
    return pick.p;
  }

  // ─── Game flow ────────────────────────────────────────────────────────────
  private goNext(): void {
    this.clearTimer();
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

    if (this.currentPlayerIndex === 0) {
      this.round++;
      if (this.round > this.maxRounds) {
        this.endGame();
        return;
      }
    }

    this.renderCurrentEngine();
  }

  private awardPoints(playerId: string, pts: number): void {
    this.scores[playerId] = (this.scores[playerId] || 0) + pts;
    this.updateScoreChip(playerId);
  }

  private updateScoreChip(playerId: string): void {
    const chip = this.container?.querySelector(`#score-chip-${playerId}`) as HTMLElement;
    if (chip) {
      chip.textContent = String(this.scores[playerId] || 0);
      chip.style.animation = 'pulse 0.4s ease';
      setTimeout(() => { if (chip) chip.style.animation = ''; }, 400);
    }
  }

  private updatePlayerChips(): void {
    const chipsContainer = this.container?.querySelector('#gs-players');
    if (chipsContainer) chipsContainer.innerHTML = this.buildPlayerChips();
  }

  private updateRoundDisplay(): void {
    const roundEl = this.container?.querySelector('#gs-round') as HTMLElement;
    if (roundEl) roundEl.textContent = `Round ${this.round} of ${this.maxRounds}`;
  }

  private clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private endGame(): void {
    this.clearTimer();
    this.clearHotPotato();
    this.copilot?.celebrate();

    setTimeout(() => {
      const sortedScores = Object.entries(this.scores).sort(([, a], [, b]) => b - a);
      const winnerId = sortedScores[0]?.[0];
      const winner = this.players.find(p => p.id === winnerId) || null;

      const result: GameResult = {
        gameId: this.game?.id || '',
        winner,
        scores: this.scores,
        totalRounds: this.round,
        duration: 0,
      };

      this.copilot?.destroy();
      this.onGameEnd?.(result);
    }, 2000);
  }

  // ─── Base listeners ───────────────────────────────────────────────────────
  private attachBaseListeners(): void {
    this.container?.querySelector('#gs-exit')?.addEventListener('click', () => {
      if (confirm('End the game and return to home?')) {
        this.clearTimer();
        this.clearHotPotato();
        this.copilot?.destroy();
        this.onExit?.();
      }
    });
  }


  // ─── Sound Effects ──────────────────────────────────────────────────────────
  private playSound(type: 'correct' | 'wrong' | 'tick' | 'complete' | 'start'): void {
    const settings = this.storage.getSettings();
    if (!settings.soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      const now = ctx.currentTime;
      switch (type) {
        case 'correct':
          o.frequency.setValueAtTime(523, now);
          o.frequency.setValueAtTime(659, now + 0.1);
          o.frequency.setValueAtTime(784, now + 0.2);
          g.gain.setValueAtTime(0.3, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          o.start(now); o.stop(now + 0.4);
          break;
        case 'wrong':
          o.frequency.setValueAtTime(300, now);
          o.frequency.setValueAtTime(200, now + 0.15);
          g.gain.setValueAtTime(0.3, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          o.start(now); o.stop(now + 0.3);
          break;
        case 'tick':
          o.frequency.setValueAtTime(800, now);
          g.gain.setValueAtTime(0.1, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          o.start(now); o.stop(now + 0.05);
          break;
        case 'complete':
          [523,659,784,1047].forEach((f, i) => {
            const o2 = ctx.createOscillator();
            const g2 = ctx.createGain();
            o2.connect(g2); g2.connect(ctx.destination);
            o2.frequency.setValueAtTime(f, now + i * 0.12);
            g2.gain.setValueAtTime(0.25, now + i * 0.12);
            g2.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.2);
            o2.start(now + i * 0.12); o2.stop(now + i * 0.12 + 0.2);
          });
          break;
        case 'start':
          o.frequency.setValueAtTime(440, now);
          o.frequency.setValueAtTime(880, now + 0.1);
          g.gain.setValueAtTime(0.2, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          o.start(now); o.stop(now + 0.25);
          break;
      }
    } catch (_) {}
  }

  // ─── Copilot ──────────────────────────────────────────────────────────────
  private initCopilot(): void {
    this.copilot = new CopilotCharacter();
    document.body.appendChild(this.copilot.render());

    const tips: Record<GameEngine, string[]> = {
      'prompt-card': ["Tap the card to reveal!", "Be honest with truth questions!", "Make dares fun, not embarrassing!"],
      'hot-potato': ["Pass fast! The timer is random!", "Don't hold it too long!", "Pass before it explodes!"],
      'word-input': ["Type your answer and hit enter!", "Be quick — there's no timer but keep it moving!", "All answers must be actual words!"],
      'tap-reaction': ["Tap as fast as you can!", "Get ready to react!", "Speed wins here!"],
      'charades': ["No talking allowed!", "Use big gestures!", "Keep guessing until time runs out!"],
      'riddle': ["Think outside the box!", "Reveal the answer after everyone guesses!", "Some riddles are tricky — take your time!"],
      'two-choice': ["Everyone votes — no sitting out!", "Discuss your choice after!", "There's no wrong answer!"],
      'physical': ["Press start then begin!", "Host confirms if you complete it!", "Give it your best effort!"],
      'score-track': ["Tap the winner when done!", "Best of 3 rounds is fair!", "No cheating!"],
      'trivia': ["First to answer gets the points!", "No phones allowed for answers!", "Think carefully!"],
    };

    const engineTips = tips[this.engine] || tips['prompt-card'];
    setTimeout(() => {
      this.playSound('start');
      this.copilot?.speak(`Let's play ${this.game?.name}! 🎮`);
      setTimeout(() => this.copilot?.startTipsMode(engineTips), 3000);
    }, 1000);
  }
}
