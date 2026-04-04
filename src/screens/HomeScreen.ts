import { GAMES_DATA } from '../data/games-data';

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
      { id: 'brain', name: 'Brain', icon: 'brain' }
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
      brain: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z"/></svg>'
    };
    return icons[icon] || '';
  }

  private getGameIcon(icon: string): string {
    const gameIcons: Record<string, string> = {
      '🎭': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
      '🎱': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
      '🔥': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
      '🎬': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>',
      '🎨': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>',
      '🎡': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
      '⚡': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      '🙈': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>',
      '🔗': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
      '✊': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',
      '🧩': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.452-.743-.93a.96.96 0 0 0-.277-.837l-1.61-1.61a2.404 2.404 0 0 0-1.705-.706 2.402 2.402 0 0 0-1.704.706l-1.61 1.61a.98.98 0 0 1-.837.276c-.47-.07-.802-.452-.743-.93a.96.96 0 0 0-.277-.837l-1.611-1.611a2.404 2.404 0 0 0-1.705-.706 2.402 2.402 0 0 0-1.704.706l-1.61 1.61a.98.98 0 0 1-.837.276c-.47-.07-.802-.452-.743-.93a.96.96 0 0 0-.277-.837L.706 8.694a2.404 2.404 0 0 0-.706-1.704A2.402 2.402 0 0 0 .706 5.29L2.316 3.68c.47-.47 1.087-.706 1.704-.706s1.233.235 1.704.706l1.61 1.61a.98.98 0 0 1 .276.837c-.07.47.272.86.743.93a.98.98 0 0 0 .837-.276l1.61-1.61a2.402 2.402 0 0 1 1.705-.706c.617 0 1.233.236 1.704.706l1.61 1.61a.98.98 0 0 1 .276.837c-.07.47.272.86.743.93a.98.98 0 0 0 .837-.276l1.61-1.61a2.404 2.404 0 0 1 1.705-.706c.617 0 1.233.235 1.704.706l1.611 1.611a.98.98 0 0 0 .837.276c.47-.07.802-.452.743-.93a.96.96 0 0 1 .277-.837l1.61-1.61a2.404 2.404 0 0 1 1.705-.706c.617 0 1.233.235 1.704.706l1.611 1.611a.98.98 0 0 0 .837.276c.47-.07.802-.452.743-.93a.96.96 0 0 1 .277-.837l1.611-1.611a2.404 2.404 0 0 1 .706-1.704 2.402 2.402 0 0 1 1.704-.706c.617 0 1.233.236 1.704.706l1.568 1.568a.98.98 0 0 1 .276.837c-.07.47.272.86.743.93a.98.98 0 0 0 .837-.276l1.611-1.611a2.404 2.404 0 0 0 .706-1.704 2.402 2.402 0 0 0-.706-1.704l-1.568-1.568a.98.98 0 0 1-.276-.837c.07-.47-.272-.86-.743-.93a.98.98 0 0 0-.837.276z"/></svg>',
      '👄': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
      '📊': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
      '😋': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
      '🎰': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 6v12"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="12" r="2"/></svg>',
      '📷': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
      '🎵': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
      '👆': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8V4"/><path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M12 8l3-3"/><path d="M12 8l-3-3"/></svg>',
      '🔊': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
      '🪣': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2v6a6 6 0 0 0 12 0V2"/><path d="M6 8H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2"/></svg>',
      '🤚': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',
      '💝': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
      '🤔': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      '🧠': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z"/></svg>',
      '🍰': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></svg>'
    };
    return gameIcons[icon] || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
  }

  private renderGamesList(): string {
    const games = GAMES_DATA.getGamesByCategory(this.selectedCategory);
    return games.map(game => `
      <div class="game-card" data-game-id="${game.id}">
        <div class="game-icon" style="background: ${game.color};">
          ${this.getGameIcon(game.icon)}
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
