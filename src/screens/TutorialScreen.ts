export class TutorialScreen {
  private app: { game: { getGameById: (id: string) => any }; showScreen: (screen: string, params?: any) => void };
  private gameId: string = '';
  private container: HTMLElement;
  private onComplete: (() => void) | null = null;
  private onSkip: (() => void) | null = null;
  private currentGame: any = null;

  constructor() {
    this.app = { 
      game: { getGameById: (id: string) => this.currentGame }, 
      showScreen: () => {} 
    };
    this.container = this.render();
  }

  setGame(game: any): void {
    this.currentGame = game;
    this.gameId = game?.id || '';
    this.container = this.render();
  }

  setOnComplete(callback: () => void): void {
    this.onComplete = callback;
  }

  setOnSkip(callback: () => void): void {
    this.onSkip = callback;
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'tutorial-screen';
    
    const game = this.app.game.getGameById(this.gameId);
    const tutorials = this.getTutorialSlides(this.gameId);

    container.innerHTML = `
      <div class="tutorial-header">
        <button class="btn-icon" id="tutorial-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      
      <div class="tutorial-content">
        <div class="game-icon-large" style="background: ${game?.color || '#5B7FFF'};">
          ${this.getGameIcon(game?.icon || '🎮')}
        </div>
        <h2 class="tutorial-title">${game?.name || 'Game'}</h2>
        <p class="tutorial-subtitle">How to Play</p>
        
        <div class="tutorial-slides" id="tutorial-slides">
          ${tutorials.map((slide, i) => `
            <div class="tutorial-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
              <div class="slide-image" style="background: ${game?.color || '#5B7FFF'}20;">
                ${slide.icon}
              </div>
              <h3 class="slide-title">${slide.title}</h3>
              <p class="slide-description">${slide.description}</p>
            </div>
          `).join('')}
        </div>
        
        <div class="tutorial-dots" id="tutorial-dots">
          ${tutorials.map((_, i) => `
            <div class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>
          `).join('')}
        </div>
      </div>
      
      <div class="tutorial-footer">
        <button class="btn btn-primary btn-large btn-full" id="tutorial-start">
          <span>Start Game</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </button>
      </div>
      
      <style>
        .tutorial-screen {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--gradient-bg);
        }
        
        .tutorial-header {
          padding: var(--space-md) var(--space-lg);
          padding-top: calc(var(--space-md) + env(safe-area-inset-top, 0));
          display: flex;
          justify-content: flex-end;
        }
        
        .btn-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: var(--color-bg-card);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }
        
        .btn-icon:active {
          transform: scale(0.95);
        }
        
        .tutorial-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 var(--space-xl);
          text-align: center;
        }
        
        .game-icon-large {
          width: 100px;
          height: 100px;
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-lg);
          animation: bounce 2s ease-in-out infinite;
        }
        
        .game-icon-large svg {
          width: 50px;
          height: 50px;
          color: white;
        }
        
        .tutorial-title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-xs);
        }
        
        .tutorial-subtitle {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-xl);
        }
        
        .tutorial-slides {
          flex: 1;
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        
        .tutorial-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: translateX(100%);
          transition: all var(--transition-normal);
        }
        
        .tutorial-slide.active {
          opacity: 1;
          transform: translateX(0);
        }
        
        .tutorial-slide.prev {
          transform: translateX(-100%);
        }
        
        .slide-image {
          width: 120px;
          height: 120px;
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-lg);
        }
        
        .slide-image svg {
          width: 60px;
          height: 60px;
          color: var(--color-primary);
        }
        
        .slide-title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--space-sm);
        }
        
        .slide-description {
          color: var(--color-text-secondary);
          line-height: 1.6;
          max-width: 280px;
        }
        
        .tutorial-dots {
          display: flex;
          gap: var(--space-sm);
          margin: var(--space-lg) 0;
        }
        
        .dot {
          width: 8px;
          height: 8px;
          border-radius: var(--radius-full);
          background: var(--color-text-muted);
          transition: all var(--transition-fast);
        }
        
        .dot.active {
          width: 24px;
          background: var(--color-primary);
        }
        
        .tutorial-footer {
          padding: var(--space-lg);
          padding-bottom: calc(var(--space-lg) + env(safe-area-inset-bottom, 0));
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
        }
        
        .btn-primary {
          background: var(--gradient-primary);
          color: white;
        }
        
        .btn-large { padding: var(--space-lg); }
        
        .btn-full { width: 100%; }
        
        .btn:active {
          transform: scale(0.98);
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      </style>
    `;

    this.setupEventListeners(container);
    return container;
  }

  private getTutorialSlides(gameId: string): { icon: string; title: string; description: string }[] {
    const slides: Record<string, { icon: string; title: string; description: string }[]> = {
      'truth-or-dare': [
        { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>', title: 'Ask a Question', description: 'Choose a player and ask them "Truth or Dare?"' },
        { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>', title: 'Tell the Truth', description: 'If they choose Truth, they must answer honestly!' },
        { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>', title: 'Complete the Dare', description: 'If they choose Dare, they must do the challenge!' }
      ],
      'hot-potato': [
        { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>', title: 'Pass the Phone!', description: 'When the timer starts, pass the phone to the next person quickly!' },
        { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>', title: 'Don\'t Hold Too Long!', description: 'When the timer hits zero, whoever is holding the phone loses!' }
      ],
      'charades': [
        { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/></svg>', title: 'Act It Out!', description: 'Without speaking, act out the word or phrase shown.' },
        { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>', title: 'Others Guess', description: 'The rest of the group tries to guess what you\'re acting out!' }
      ],
      'default': [
        { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>', title: 'Get Ready!', description: 'Get ready to play this exciting game with your family!' },
        { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>', title: 'Follow the Rules', description: 'Each game has its own unique rules. Pay attention and have fun!' },
        { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>', title: 'Win & Celebrate!', description: 'Compete to win and climb the leaderboard!' }
      ]
    };
    
    return slides[gameId] || slides['default'];
  }

  private getGameIcon(icon: string): string {
    const gameIcons: Record<string, string> = {
      '🎭': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
      '🎱': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
      '🔥': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
      '🎬': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/></svg>',
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
      '👆': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8V4"/><path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>',
      '🔊': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
      '🪣': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2v6a6 6 0 0 0 12 0V2"/><path d="M6 8H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2"/></svg>',
      '🤚': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',
      '💝': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
      '🤔': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      '🧠': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z"/></svg>',
      '🍰': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/></svg>',
      '🎮': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>'
    };
    return gameIcons[icon] || gameIcons['🎮'];
  }

  private currentSlide: number = 0;

  private setupEventListeners(container: HTMLElement) {
    const closeBtn = container.querySelector('#tutorial-close');
    const startBtn = container.querySelector('#tutorial-start');
    const slides = container.querySelectorAll('.tutorial-slide');
    const dots = container.querySelectorAll('.dot');

    closeBtn?.addEventListener('click', () => {
      this.onSkip?.();
    });

    startBtn?.addEventListener('click', () => {
      this.onComplete?.();
    });

    const showSlide = (index: number) => {
      slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i === index) {
          slide.classList.add('active');
        } else if (i < index) {
          slide.classList.add('prev');
        }
      });
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      
      this.currentSlide = index;
    };

    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      const slidesArr = Array.from(slides);
      
      if (Math.abs(diff) > 50) {
        if (diff > 0 && this.currentSlide < slidesArr.length - 1) {
          showSlide(this.currentSlide + 1);
        } else if (diff < 0 && this.currentSlide > 0) {
          showSlide(this.currentSlide - 1);
        }
      }
    }, { passive: true });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => showSlide(i));
    });
  }
}
