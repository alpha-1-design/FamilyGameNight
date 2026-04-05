import { GAMES_DATA } from '../data/games-data';
import { getGameIcon } from '../utils/GAME_ICONS';

export class HomeScreen {
  private container: HTMLElement | null = null;
  private selectedCategory: string = 'all';
  private onGameSelect: ((gameId: string) => void) | null = null;
  private onSettings: (() => void) | null = null;
  private onLeaderboard: (() => void) | null = null;
  private onPlayers: (() => void) | null = null;
  private onQuickPlay: (() => void) | null = null;

  constructor() {}

  setOnGameSelect(callback: (gameId: string) => void): void {
    this.onGameSelect = callback;
  }

  setOnSettings(callback: () => void): void {
    this.onSettings = callback;
  }

  setOnLeaderboard(callback: () => void): void {
    this.onLeaderboard = callback;
  }

  setOnPlayers(callback: () => void): void {
    this.onPlayers = callback;
  }

  setOnQuickPlay(callback: () => void): void {
    this.onQuickPlay = callback;
  }

  render(): HTMLElement {
    this.container = document.createElement('div');
    this.container.className = 'home-screen';
    this.container.innerHTML = this.getStyles() + this.getHTML();

    this.setupEventListeners();
    return this.container;
  }

  private getStyles(): string {
    return `
      <style>
        .home-screen {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--gradient-bg);
        }

        .home-header {
          padding: var(--space-lg);
          padding-top: calc(var(--space-lg) + env(safe-area-inset-top, 0));
        }

        .home-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-lg);
        }

        .home-title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .home-subtitle {
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
        }

        .header-actions {
          display: flex;
          gap: var(--space-sm);
        }

        .btn-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-lg);
          background: var(--color-bg-card);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
          border: none;
          cursor: pointer;
        }

        .btn-icon:active {
          transform: scale(0.95);
          background: var(--color-bg-elevated);
        }

        .category-tabs {
          display: flex;
          gap: var(--space-sm);
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: var(--space-sm);
        }

        .category-tabs::-webkit-scrollbar { display: none; }

        .category-tab {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-sm) var(--space-md);
          background: var(--color-bg-card);
          border-radius: var(--radius-full);
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          white-space: nowrap;
          transition: all var(--transition-fast);
          border: none;
          cursor: pointer;
        }

        .category-tab svg {
          width: 16px;
          height: 16px;
        }

        .category-tab.active {
          background: var(--gradient-primary);
          color: white;
        }

        .category-tab:active {
          transform: scale(0.97);
        }

        .games-list {
          flex: 1;
          padding: 0 var(--space-lg);
          overflow-y: auto;
          padding-bottom: 120px;
        }

        .game-card {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md);
          background: var(--color-bg-card);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-md);
          transition: all var(--transition-fast);
          cursor: pointer;
        }

        .game-card:active {
          transform: scale(0.98);
          background: var(--color-bg-elevated);
        }

        .game-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .game-icon svg {
          width: 28px;
          height: 28px;
          color: white;
        }

        .game-info {
          flex: 1;
          min-width: 0;
        }

        .game-name {
          font-weight: var(--font-weight-semibold);
          font-size: var(--font-size-md);
          color: var(--color-text-primary);
          margin-bottom: var(--space-xs);
        }

        .game-description {
          color: var(--color-text-muted);
          font-size: var(--font-size-sm);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .game-players {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          color: var(--color-text-muted);
          font-size: var(--font-size-xs);
          margin-top: var(--space-xs);
        }

        .home-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: var(--space-lg);
          padding-bottom: calc(var(--space-lg) + env(safe-area-inset-bottom, 0));
          background: linear-gradient(transparent, var(--color-bg-primary) 30%);
        }

        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          padding: var(--space-md) var(--space-lg);
          border-radius: var(--radius-lg);
          font-weight: var(--font-weight-semibold);
          font-size: var(--font-size-md);
          transition: all var(--transition-fast);
          border: none;
          cursor: pointer;
        }

        .btn-primary {
          background: var(--gradient-primary);
          color: white;
        }

        .btn-full { width: 100%; }

        .btn:active {
          transform: scale(0.98);
        }
      </style>
    `;
  }

  private getHTML(): string {
    const categories = [
      { id: 'all', name: 'All', icon: 'grid' },
      { id: 'quick', name: 'Quick', icon: 'zap' },
      { id: 'party', name: 'Party', icon: 'party' },
      { id: 'word', name: 'Word', icon: 'word' },
      { id: 'creative', name: 'Creative', icon: 'creative' },
      { id: 'physical', name: 'Physical', icon: 'physical' },
      { id: 'trivia', name: 'Trivia', icon: 'brain' }
    ];

    return `
      <div class="home-header">
        <div class="home-title-row">
          <div>
            <h1 class="home-title">Family Game Night</h1>
            <p class="home-subtitle">Choose a game to play</p>
          </div>
          <div class="header-actions">
            <button class="btn-icon" id="home-leaderboard" title="Leaderboard">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
            </button>
            <button class="btn-icon" id="home-settings" title="Settings">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="category-tabs">
          ${categories.map(cat => `
            <button class="category-tab ${cat.id === this.selectedCategory ? 'active' : ''}" data-category="${cat.id}">
              ${this.getCategoryIcon(cat.icon)}
              <span>${cat.name}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="games-list" id="games-list">
        ${this.renderGamesList()}
      </div>

      <div class="home-footer">
        <button class="btn btn-primary btn-full" id="quick-play">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <span>Quick Play</span>
        </button>
      </div>
    `;
  }

  private getCategoryIcon(icon: string): string {
    const icons: Record<string, string> = {
      grid: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
      zap: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      party: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/></svg>',
      brain: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z"/></svg>',
      word: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>',
      creative: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
      physical: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="2"/><path d="M10 22v-5h4v5"/><path d="M10 17H6l2-7h8l2 7h-4"/><path d="M6 10l-2 4"/><path d="M18 10l2 4"/></svg>'
    };
    return icons[icon] || '';
  }

  private getGameIcon(gameId: string): string {
    return getGameIcon(gameId);
  }

  private renderGamesList(): string {
    const games = GAMES_DATA.getGamesByCategory(this.selectedCategory);
    return games.map(game => `
      <div class="game-card" data-game-id="${game.id}">
        <div class="game-icon" style="background: ${game.color};">
          ${this.getGameIcon(game.id)}
        </div>
        <div class="game-info">
          <div class="game-name">${game.name}</div>
          <div class="game-description">${game.description}</div>
          <div class="game-players">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>${game.minPlayers}+ players</span>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    `).join('');
  }

  private setupEventListeners(): void {
    if (!this.container) return;

    const leaderboardBtn = this.container.querySelector('#home-leaderboard');
    const settingsBtn = this.container.querySelector('#home-settings');
    const quickPlayBtn = this.container.querySelector('#quick-play');
    const categoryTabs = this.container.querySelectorAll('.category-tab');
    const gamesList = this.container.querySelector('#games-list');

    leaderboardBtn?.addEventListener('click', () => this.onLeaderboard?.());
    settingsBtn?.addEventListener('click', () => this.onSettings?.());
    quickPlayBtn?.addEventListener('click', () => this.onQuickPlay?.());

    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.selectedCategory = (tab as HTMLElement).dataset.category || 'all';
        const list = this.container?.querySelector('#games-list') as HTMLElement;
        if (list) {
          list.innerHTML = this.renderGamesList();
          this.setupGameCardListeners(list);
        }
      });
    });

    if (gamesList) {
      this.setupGameCardListeners(gamesList as HTMLElement);
    }
  }

  private setupGameCardListeners(container: HTMLElement): void {
    const cards = container.querySelectorAll('.game-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const gameId = (card as HTMLElement).dataset.gameId;
        if (gameId && this.onGameSelect) {
          this.onGameSelect(gameId);
        }
      });
    });
  }
}
