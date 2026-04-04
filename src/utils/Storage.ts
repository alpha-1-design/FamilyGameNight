export class Storage {
  private readonly PLAYERS_KEY = 'fgn_players';
  private readonly SCORES_KEY = 'fgn_scores';
  private readonly SETTINGS_KEY = 'fgn_settings';
  private readonly ONBOARDED_KEY = 'fgn_onboarded';
  private readonly TUTORIALS_KEY = 'fgn_tutorials';
  private readonly FAVORITES_KEY = 'fgn_favorites';

  // Players
  getPlayers(): Player[] {
    const data = localStorage.getItem(this.PLAYERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  savePlayers(players: Player[]): void {
    localStorage.setItem(this.PLAYERS_KEY, JSON.stringify(players));
  }

  addPlayer(player: Player): void {
    const players = this.getPlayers();
    players.push(player);
    this.savePlayers(players);
  }

  removePlayer(playerId: string): void {
    const players = this.getPlayers().filter(p => p.id !== playerId);
    this.savePlayers(players);
  }

  updatePlayer(playerId: string, updates: Partial<Player>): void {
    const players = this.getPlayers().map(p => 
      p.id === playerId ? { ...p, ...updates } : p
    );
    this.savePlayers(players);
  }

  // Scores
  getScores(): GameScores {
    const data = localStorage.getItem(this.SCORES_KEY);
    return data ? JSON.parse(data) : {};
  }

  saveScore(gameId: string, playerId: string, points: number): void {
    const scores = this.getScores();
    if (!scores[gameId]) scores[gameId] = {};
    if (!scores[gameId][playerId]) scores[gameId][playerId] = { wins: 0, points: 0 };
    scores[gameId][playerId].points += points;
    scores[gameId][playerId].wins += points > 0 ? 1 : 0;
    localStorage.setItem(this.SCORES_KEY, JSON.stringify(scores));
  }

  getGameScores(gameId: string): Record<string, { wins: number; points: number }> {
    return this.getScores()[gameId] || {};
  }

  resetAllScores(): void {
    localStorage.removeItem(this.SCORES_KEY);
  }

  // Settings
  getSettings(): AppSettings {
    const data = localStorage.getItem(this.SETTINGS_KEY);
    return data ? JSON.parse(data) : {
      soundEnabled: true,
      musicEnabled: false,
      timerDuration: 30,
      defaultRounds: 10,
      darkMode: true,
    };
  }

  updateSettings(updates: Partial<AppSettings>): void {
    const settings = this.getSettings();
    const newSettings = { ...settings, ...updates };
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(newSettings));
  }

  // Onboarding
  isOnboarded(): boolean {
    return localStorage.getItem(this.ONBOARDED_KEY) === 'true';
  }

  setOnboarded(value: boolean): void {
    localStorage.setItem(this.ONBOARDED_KEY, value.toString());
  }

  // Tutorials
  getCompletedTutorials(): string[] {
    const data = localStorage.getItem(this.TUTORIALS_KEY);
    return data ? JSON.parse(data) : [];
  }

  markTutorialCompleted(gameId: string): void {
    const completed = this.getCompletedTutorials();
    if (!completed.includes(gameId)) {
      completed.push(gameId);
      localStorage.setItem(this.TUTORIALS_KEY, JSON.stringify(completed));
    }
  }

  isTutorialCompleted(gameId: string): boolean {
    return this.getCompletedTutorials().includes(gameId);
  }

  resetTutorials(): void {
    localStorage.removeItem(this.TUTORIALS_KEY);
  }

  // Favorites
  getFavorites(): string[] {
    const data = localStorage.getItem(this.FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  }

  toggleFavorite(gameId: string): boolean {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(gameId);
    if (index === -1) {
      favorites.push(gameId);
    } else {
      favorites.splice(index, 1);
    }
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    return favorites.includes(gameId);
  }

  isFavorite(gameId: string): boolean {
    return this.getFavorites().includes(gameId);
  }
}

export interface Player {
  id: string;
  name: string;
  color: string;
  avatar: string;
}

export interface GameScores {
  [gameId: string]: {
    [playerId: string]: {
      wins: number;
      points: number;
    };
  };
}

export interface AppSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  timerDuration: number;
  defaultRounds: number;
  darkMode: boolean;
}
