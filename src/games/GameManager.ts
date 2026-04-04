import { PROMPTS_DATA, Prompt } from '../data/prompts-data';
import { Storage, Player } from '../utils/Storage';
import { GAMES_DATA } from '../data/games-data';

export type GameMode = 'truth' | 'dare' | 'challenge' | 'free';

export interface GameState {
  gameId: string;
  mode: GameMode;
  currentPlayer: Player;
  players: Player[];
  currentPrompt: Prompt | null;
  round: number;
  totalRounds: number;
  scores: Record<string, number>;
  timerDuration: number;
  isTimerActive: boolean;
  promptHistory: Prompt[];
  usedPromptIds: Set<string>;
}

export interface GameResult {
  gameId: string;
  winner: Player | null;
  scores: Record<string, number>;
  totalRounds: number;
  duration: number;
}

export class GameManager {
  private storage: Storage;
  private state: GameState | null = null;
  private prompts: Map<string, Prompt[]> = new Map();
  private onStateChange: ((state: GameState) => void) | null = null;
  private timerInterval: number | null = null;
  private gameStartTime: number = 0;

  constructor() {
    this.storage = new Storage();
    this.loadPrompts();
  }

  setStateChangeHandler(handler: (state: GameState) => void): void {
    this.onStateChange = handler;
  }

  private loadPrompts(): void {
    const data = PROMPTS_DATA.generateMassiveData();
    Object.entries(data).forEach(([key, prompts]) => {
      this.prompts.set(key, prompts as Prompt[]);
    });
  }

  private getPromptKey(gameId: string, mode: GameMode): string {
    const mapping: Record<string, string> = {
      'truth-or-dare': 'truthQuestions',
      'never-have-i-ever': 'neverHaveIEver',
      'would-you-rather': 'wouldYouRather',
      'riddle-battle': 'riddles',
      'charades': 'charadesAnimals',
      'emoji-pictionary': 'emojiWords',
      'photo-scavenger': 'scavengerItems',
      'dessert-roulette': 'dessertDares',
      'compliment-chain': 'complimentPrompts',
      'sound-effects-quiz': 'soundEffects',
      'lip-reading': 'lipReadingWords',
      'word-chain': 'wordChainWords',
    };
    return mapping[gameId] || 'truthQuestions';
  }

  startGame(
    gameId: string,
    players: Player[],
    mode: GameMode = 'challenge',
    totalRounds?: number
  ): void {
    const settings = this.storage.getSettings();
    const game = GAMES_DATA.getGameById(gameId);
    
    if (!game || players.length < game.minPlayers) {
      throw new Error('Invalid game or not enough players');
    }

    this.gameStartTime = Date.now();
    this.state = {
      gameId,
      mode,
      currentPlayer: players[0],
      players,
      currentPrompt: null,
      round: 1,
      totalRounds: totalRounds || settings.defaultRounds,
      scores: players.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {}),
      timerDuration: settings.timerDuration,
      isTimerActive: false,
      promptHistory: [],
      usedPromptIds: new Set(),
    };

    this.nextPrompt();
    this.notifyStateChange();
  }

  nextPrompt(): Prompt | null {
    if (!this.state) return null;

    const promptKey = this.getPromptKey(this.state.gameId, this.state.mode);
    let prompts = this.prompts.get(promptKey) || [];
    
    if (this.state.gameId === 'truth-or-dare') {
      prompts = this.state.mode === 'truth' 
        ? (this.prompts.get('truthQuestions') || [])
        : (this.prompts.get('dareChallenges') || []);
    }

    const availablePrompts = prompts.filter((_, index) => 
      !this.state!.usedPromptIds.has(`prompt_${index}`)
    );

    if (availablePrompts.length === 0) {
      this.state.usedPromptIds.clear();
      const freshPrompts = prompts.filter((_, index) => 
        !this.state!.usedPromptIds.has(`prompt_${index}`)
      );
      if (freshPrompts.length > 0) {
        const randomIndex = Math.floor(Math.random() * freshPrompts.length);
        const selectedPrompt = freshPrompts[randomIndex];
        this.state.usedPromptIds.add(`prompt_${prompts.indexOf(selectedPrompt)}`);
        this.state.currentPrompt = selectedPrompt;
        this.state.promptHistory.push(selectedPrompt);
      }
    } else {
      const randomIndex = Math.floor(Math.random() * availablePrompts.length);
      const selectedPrompt = availablePrompts[randomIndex];
      this.state.usedPromptIds.add(`prompt_${prompts.indexOf(selectedPrompt)}`);
      this.state.currentPrompt = selectedPrompt;
      this.state.promptHistory.push(selectedPrompt);
    }

    this.notifyStateChange();
    return this.state.currentPrompt;
  }

  switchMode(mode: GameMode): void {
    if (!this.state) return;
    this.state.mode = mode;
    this.nextPrompt();
    this.notifyStateChange();
  }

  submitAnswer(correct: boolean, playerId?: string): void {
    if (!this.state) return;

    const scoringPlayer = playerId 
      ? this.state.players.find(p => p.id === playerId)
      : this.state.currentPlayer;

    if (scoringPlayer) {
      const points = correct ? 10 : 0;
      this.state.scores[scoringPlayer.id] += points;
      this.storage.saveScore(this.state.gameId, scoringPlayer.id, points);
    }

    this.notifyStateChange();
  }

  nextPlayer(): void {
    if (!this.state) return;

    const currentIndex = this.state.players.findIndex(
      p => p.id === this.state!.currentPlayer.id
    );
    const nextIndex = (currentIndex + 1) % this.state.players.length;
    this.state.currentPlayer = this.state.players[nextIndex];

    this.notifyStateChange();
  }

  nextRound(): void {
    if (!this.state) return;

    this.state.round++;
    this.state.currentPlayer = this.state.players[0];
    this.nextPrompt();
    this.notifyStateChange();
  }

  startTimer(duration?: number): void {
    if (!this.state) return;

    this.state.timerDuration = duration || this.state.timerDuration;
    this.state.isTimerActive = true;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    let remaining = this.state.timerDuration;
    this.timerInterval = window.setInterval(() => {
      if (!this.state) return;
      remaining--;
      this.state.timerDuration = remaining;

      if (remaining <= 0) {
        this.stopTimer();
        this.onTimerEnd();
      }

      this.notifyStateChange();
    }, 1000);

    this.notifyStateChange();
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.state) {
      this.state.isTimerActive = false;
    }
    this.notifyStateChange();
  }

  private onTimerEnd(): void {
    this.submitAnswer(false);
    this.nextPlayer();
  }

  endGame(): GameResult | null {
    if (!this.state) return null;

    this.stopTimer();

    const sortedPlayers = Object.entries(this.state.scores)
      .sort(([, a], [, b]) => b - a);
    
    const winnerId = sortedPlayers[0]?.[0];
    const winner = this.state.players.find(p => p.id === winnerId) || null;

    const result: GameResult = {
      gameId: this.state.gameId,
      winner,
      scores: this.state.scores,
      totalRounds: this.state.round,
      duration: Date.now() - this.gameStartTime,
    };

    this.state = null;
    return result;
  }

  getState(): GameState | null {
    return this.state;
  }

  getRandomPrompt(gameId: string, mode?: GameMode): Prompt | null {
    const promptKey = this.getPromptKey(gameId, mode || 'challenge');
    const prompts = this.prompts.get(promptKey) || [];
    
    if (prompts.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  }

  getLeaderboard(gameId?: string): { player: Player; totalPoints: number; wins: number }[] {
    const scores = this.storage.getScores();
    const players = this.storage.getPlayers();
    const leaderboard: Record<string, { player: Player; totalPoints: number; wins: number }> = {};

    Object.entries(scores).forEach(([gid, playerScores]) => {
      if (gameId && gid !== gameId) return;
      
      Object.entries(playerScores).forEach(([playerId, score]) => {
        const player = players.find(p => p.id === playerId);
        if (player) {
          if (!leaderboard[playerId]) {
            leaderboard[playerId] = { player, totalPoints: 0, wins: 0 };
          }
          leaderboard[playerId].totalPoints += score.points;
          leaderboard[playerId].wins += score.wins;
        }
      });
    });

    return Object.values(leaderboard).sort((a, b) => b.totalPoints - a.totalPoints);
  }

  private notifyStateChange(): void {
    if (this.state && this.onStateChange) {
      this.onStateChange(this.state);
    }
  }
}

export const gameManager = new GameManager();
