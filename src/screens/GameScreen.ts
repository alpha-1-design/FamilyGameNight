import { ICONS } from '../utils/ICONS';
import { Player } from '../utils/Storage';
import { GameMode, gameManager, GameResult } from '../games/GameManager';
import { GAMES_DATA } from '../data/games-data';
import { CopilotCharacter } from '../components/Copilot';

export class GameScreen {
  private container: HTMLElement | null = null;
  private game: typeof GAMES_DATA.games[0] | null = null;
  private players: Player[] = [];
  private hostId: string | null = null;
  private gameMode: GameMode = 'challenge';
  private currentPlayerIndex: number = 0;
  private round: number = 1;
  private maxRounds: number = 10;
  private onModeChange: ((mode: GameMode) => void) | null = null;
  private onGameEnd: ((result: GameResult) => void) | null = null;
  private onExit: (() => void) | null = null;
  private copilot: CopilotCharacter | null = null;

  setGame(game: typeof GAMES_DATA.games[0]): void {
    this.game = game;
  }

  setPlayers(players: Player[]): void {
    this.players = players;
  }

  setHostId(hostId: string | null): void {
    this.hostId = hostId;
  }

  setGameMode(mode: GameMode): void {
    this.gameMode = mode;
  }

  setOnModeChange(callback: (mode: GameMode) => void): void {
    this.onModeChange = callback;
  }

  setOnGameEnd(callback: (result: GameResult) => void): void {
    this.onGameEnd = callback;
  }

  setOnExit(callback: () => void): void {
    this.onExit = callback;
  }

  render(): HTMLElement {
    this.container = document.createElement('div');
    this.container.className = 'game-screen';
    this.container.innerHTML = this.getStyles() + this.renderContent();

    this.attachEventListeners();
    this.initCopilot();
    return this.container;
  }

  private initCopilot(): void {
    this.copilot = new CopilotCharacter();
    const copilotEl = this.copilot.render();
    document.body.appendChild(copilotEl);

    this.copilot.speak("Let's have some fun! Tap a player to give them a challenge!");
    
    setTimeout(() => {
      const gameTips = this.getGameTips();
      this.copilot?.startTipsMode(gameTips);
    }, 4000);
  }

  private getGameTips(): string[] {
    const tips = [
      "Challenge mode gives bonus points for streaks!",
      "Swipe left on any prompt to skip it!",
      "The host can see everyone's scores!",
      "Mix up Truth, Dare, and Challenge for maximum fun!",
      "The player with the most points wins!",
      "Take turns fairly - everyone gets equal play time!",
      "Be creative with your answers - bonus points!",
      "Don't forget to celebrate the winner!"
    ];
    return tips.sort(() => Math.random() - 0.5).slice(0, 5);
  }

  private getStyles(): string {
    return `
      <style>
        .game-screen {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
          color: #fff;
          display: flex;
          flex-direction: column;
        }

        .game-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          padding-top: 40px;
        }

        .header-btn {
          width: 44px;
          height: 44px;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .header-btn:hover {
          background: rgba(255,255,255,0.2);
          transform: scale(1.05);
        }

        .header-btn svg {
          width: 24px;
          height: 24px;
          stroke: #fff;
        }

        .game-info {
          text-align: center;
        }

        .game-name {
          font-size: 18px;
          font-weight: 700;
        }

        .game-round {
          font-size: 13px;
          color: #888;
          margin-top: 2px;
        }

        .host-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 215, 0, 0.2);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          color: #ffd700;
        }

        .host-indicator svg {
          width: 14px;
          height: 14px;
          fill: #ffd700;
        }

        .game-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .current-player {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 32px;
        }

        .player-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          margin-bottom: 12px;
          position: relative;
          animation: pulse 2s ease-in-out infinite;
        }

        .player-avatar.is-host::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%);
          z-index: -1;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .player-name {
          font-size: 22px;
          font-weight: 700;
        }

        .player-turn-label {
          font-size: 13px;
          color: #888;
          margin-top: 4px;
        }

        .prompt-card {
          background: rgba(255,255,255,0.05);
          border-radius: 24px;
          padding: 32px;
          width: 100%;
          max-width: 400px;
          text-align: center;
          margin-bottom: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .prompt-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.1);
        }

        .prompt-card:active {
          transform: scale(0.98);
        }

        .prompt-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 32px;
        }

        .prompt-text {
          font-size: 20px;
          font-weight: 600;
          line-height: 1.5;
        }

        .prompt-answer {
          margin-top: 16px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          font-size: 14px;
          color: #888;
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .prompt-answer.revealed {
          opacity: 1;
          max-height: 100px;
        }

        .mode-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          background: rgba(255,255,255,0.05);
          padding: 6px;
          border-radius: 16px;
        }

        .mode-tab {
          padding: 10px 20px;
          background: transparent;
          border: none;
          border-radius: 12px;
          color: #888;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mode-tab.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
        }

        .player-indicators {
          display: flex;
          gap: 8px;
        }

        .player-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          opacity: 0.4;
          transition: all 0.3s ease;
        }

        .player-dot.active {
          opacity: 1;
          transform: scale(1.3);
        }

        .game-footer {
          padding: 20px;
          padding-bottom: calc(20px + env(safe-area-inset-bottom, 0));
          background: linear-gradient(to top, #0a0a0f 60%, transparent);
        }

        .action-buttons {
          display: flex;
          gap: 12px;
        }

        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 24px;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .btn svg {
          width: 20px;
          height: 20px;
          stroke: currentColor;
        }

        .btn-primary {
          flex: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
        }

        .btn-primary:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.15);
        }

        .btn-danger {
          background: rgba(255, 100, 100, 0.2);
          color: #ff6b6b;
        }

        .btn-danger:hover {
          background: rgba(255, 100, 100, 0.3);
        }

        .btn-success {
          background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
          color: #fff;
        }

        .player-scores {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .score-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(255,255,255,0.05);
          border-radius: 20px;
          font-size: 13px;
        }

        .score-chip .avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .score-chip .points {
          font-weight: 700;
          color: #667eea;
        }
      </style>
    `;
  }

  private renderContent(): string {
    const currentPlayer = this.players[this.currentPlayerIndex] || this.players[0];
    const isHost = this.hostId && this.players[this.currentPlayerIndex]?.id === this.hostId;

    return `
      <div class="game-header">
        <button class="header-btn" data-action="exit">
          ${ICONS.X}
        </button>
        <div class="game-info">
          <div class="game-name">${this.game?.icon} ${this.game?.name || 'Game'}</div>
          <div class="game-round">Round ${this.round} of ${this.maxRounds}</div>
        </div>
        <div class="host-indicator">
          ${ICONS.Crown}
          <span>Host</span>
        </div>
      </div>

      <div class="game-content">
        <div class="mode-tabs">
          <button class="mode-tab ${this.gameMode === 'truth' ? 'active' : ''}" data-mode="truth">Truth</button>
          <button class="mode-tab ${this.gameMode === 'dare' ? 'active' : ''}" data-mode="dare">Dare</button>
          <button class="mode-tab ${this.gameMode === 'challenge' ? 'active' : ''}" data-mode="challenge">Challenge</button>
        </div>

        <div class="current-player">
          <div class="player-avatar ${isHost ? 'is-host' : ''}" style="background: ${currentPlayer?.color || '#667eea'}20;">
            ${currentPlayer?.avatar || '?'}
          </div>
          <div class="player-name">${currentPlayer?.name || 'Player'}</div>
          <div class="player-turn-label">${isHost ? '👑 Host' : "It's your turn!"}</div>
        </div>

        <div class="prompt-card" id="prompt-card">
          <div class="prompt-icon" style="background: ${this.game?.color || '#667eea'}20;">
            <span>${this.getRandomEmoji()}</span>
          </div>
          <p class="prompt-text" id="prompt-text">Tap to reveal prompt...</p>
          <div class="prompt-answer" id="prompt-answer"></div>
        </div>

        <div class="player-scores" id="player-scores">
          ${this.players.map(p => `
            <div class="score-chip">
              <div class="avatar" style="background: ${p.color}40;">${p.avatar}</div>
              <span>${p.name}</span>
              <span class="points">0</span>
            </div>
          `).join('')}
        </div>

        <div class="player-indicators">
          ${this.players.map((p, i) => `
            <div class="player-dot ${i === this.currentPlayerIndex ? 'active' : ''}" 
                 style="background: ${p.color};">
            </div>
          `).join('')}
        </div>
      </div>

      <div class="game-footer">
        <div class="action-buttons">
          <button class="btn btn-secondary" data-action="skip">
            ${ICONS.SkipForward}
            <span>Skip</span>
          </button>
          <button class="btn btn-success" data-action="correct">
            ${ICONS.Check}
            <span>Correct!</span>
          </button>
          <button class="btn btn-primary" data-action="next">
            <span>Next</span>
            ${ICONS.ArrowRight}
          </button>
        </div>
      </div>
    `;
  }

  private getRandomEmoji(): string {
    const emojis = ['🎯', '🎲', '🎭', '🎨', '🎪', '🎯', '⭐', '🔥', '💡', '🎁'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  private getRandomPrompt(): { icon: string; text: string; answer?: string } {
    const prompts = {
      truth: [
        { icon: '😴', text: "Who's the messiest in this family?" },
        { icon: '😂', text: 'Who tells the best jokes?' },
        { icon: '😰', text: 'Who is most likely to get lost?' },
        { icon: '🦥', text: 'Who is always late?' },
        { icon: '😤', text: 'Who gets angry the fastest?' },
        { icon: '🤫', text: 'Who is the best secret keeper?' },
        { icon: '💪', text: 'Who would survive in the wilderness?' },
        { icon: '🎵', text: 'Who sings the best in the shower?' },
        { icon: '🍕', text: "Who eats the fastest? Don't lie!" },
        { icon: '😴', text: 'Who needs the most sleep?' },
      ],
      dare: [
        { icon: '🦘', text: 'Do 20 jumping jacks!' },
        { icon: '🎤', text: 'Sing your favorite song out loud!' },
        { icon: '🤸', text: 'Do your best dance move!' },
        { icon: '🐔', text: 'Walk like a chicken for 30 seconds!' },
        { icon: '🗣️', text: 'Speak in a funny accent for 3 rounds!' },
        { icon: '🎨', text: 'Draw something with your eyes closed!' },
        { icon: '💃', text: 'Moonwalk across the room!' },
        { icon: '🦆', text: 'Quack like a duck for 1 minute!' },
        { icon: '🤖', text: 'Talk like a robot for the next 2 rounds!' },
        { icon: '🎭', text: 'Impersonate someone in the room!' },
      ],
      challenge: [
        { icon: '⚡', text: 'Balance on one foot for 30 seconds!' },
        { icon: '🧠', text: 'Recite the alphabet backwards!' },
        { icon: '🎯', text: 'Throw an imaginary ball into a hoop!' },
        { icon: '⏰', text: 'Spin 5 times and walk straight!' },
        { icon: '🤫', text: "Don't speak for 2 rounds!" },
        { icon: '🙈', text: 'Act out an emotion for others to guess!' },
        { icon: '🎪', text: 'Make a funny face and hold it for 10 seconds!' },
        { icon: '🏃', text: 'Run in place for 15 seconds!' },
        { icon: '🧘', text: 'Do your best yoga pose!' },
        { icon: '🎸', text: 'Air guitar for 20 seconds!' },
      ],
    };

    const category = this.gameMode === 'truth' ? 'truth' : this.gameMode === 'dare' ? 'dare' : 'challenge';
    const categoryPrompts = prompts[category];
    return categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)];
  }

  private currentPrompt: { icon: string; text: string; answer?: string } | null = null;

  private attachEventListeners(): void {
    if (!this.container) return;

    const promptCard = this.container.querySelector('#prompt-card');
    const promptText = this.container.querySelector('#prompt-text');
    const promptAnswer = this.container.querySelector('#prompt-answer');

    promptCard?.addEventListener('click', () => {
      if (!this.currentPrompt) {
        this.currentPrompt = this.getRandomPrompt();
        if (promptText) promptText.textContent = this.currentPrompt.text;
        promptCard.classList.add('revealed');
      } else {
        promptAnswer?.classList.toggle('revealed');
      }
    });

    this.container.querySelectorAll('.mode-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const mode = tab.getAttribute('data-mode') as GameMode;
        this.gameMode = mode;
        this.currentPrompt = null;
        
        this.container?.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        if (promptText) promptText.textContent = 'Tap to reveal prompt...';
        if (promptAnswer) promptAnswer.classList.remove('revealed');
        promptCard?.classList.remove('revealed');
        
        this.onModeChange?.(mode);
      });
    });

    this.container.querySelector('[data-action="exit"]')?.addEventListener('click', () => {
      if (confirm('End the game?')) {
        this.onExit?.();
      }
    });

    this.container.querySelector('[data-action="skip"]')?.addEventListener('click', () => {
      this.currentPrompt = null;
      if (promptText) promptText.textContent = 'Tap to reveal prompt...';
      if (promptAnswer) promptAnswer.classList.remove('revealed');
      promptCard?.classList.remove('revealed');
    });

    this.container.querySelector('[data-action="correct"]')?.addEventListener('click', () => {
      this.copilot?.react('correct');
      this.updateScore(this.currentPlayerIndex, 10);
      this.goToNextPlayer();
    });

    this.container.querySelector('[data-action="next"]')?.addEventListener('click', () => {
      this.copilot?.react('next');
      this.goToNextPlayer();
    });

    this.container.querySelector('[data-action="skip"]')?.addEventListener('click', () => {
      this.copilot?.react('skip');
    });
  }

  private scores: number[] = [];

  private updateScore(playerIndex: number, points: number): void {
    this.scores[playerIndex] = (this.scores[playerIndex] || 0) + points;
    
    const scoreChips = this.container?.querySelectorAll('.score-chip');
    scoreChips?.[playerIndex]?.querySelector('.points')?.setAttribute('data-score', this.scores[playerIndex].toString());
    
    const scoreChip = scoreChips?.[playerIndex];
    if (scoreChip) {
      const pointsEl = scoreChip.querySelector('.points');
      if (pointsEl) pointsEl.textContent = this.scores[playerIndex].toString();
    }
  }

  private goToNextPlayer(): void {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    this.currentPrompt = null;
    
    if (this.currentPlayerIndex === 0) {
      this.round++;
      if (this.round > this.maxRounds) {
        this.endGame();
        return;
      }
    }

    const result = this.renderGameContent();
    this.container!.querySelector('.game-content')!.innerHTML = result.content;
    this.container!.querySelector('.game-footer')!.innerHTML = result.footer;
    this.attachEventListeners();
  }

  private renderGameContent(): { content: string; footer: string } {
    const currentPlayer = this.players[this.currentPlayerIndex];
    const isHost = this.hostId && currentPlayer?.id === this.hostId;

    const content = `
      <div class="mode-tabs">
        <button class="mode-tab ${this.gameMode === 'truth' ? 'active' : ''}" data-mode="truth">Truth</button>
        <button class="mode-tab ${this.gameMode === 'dare' ? 'active' : ''}" data-mode="dare">Dare</button>
        <button class="mode-tab ${this.gameMode === 'challenge' ? 'active' : ''}" data-mode="challenge">Challenge</button>
      </div>

      <div class="current-player">
        <div class="player-avatar ${isHost ? 'is-host' : ''}" style="background: ${currentPlayer?.color || '#667eea'}20;">
          ${currentPlayer?.avatar || '?'}
        </div>
        <div class="player-name">${currentPlayer?.name || 'Player'}</div>
        <div class="player-turn-label">${isHost ? '👑 Host' : "It's your turn!"}</div>
      </div>

      <div class="prompt-card" id="prompt-card">
        <div class="prompt-icon" style="background: ${this.game?.color || '#667eea'}20;">
          <span>${this.getRandomEmoji()}</span>
        </div>
        <p class="prompt-text" id="prompt-text">Tap to reveal prompt...</p>
        <div class="prompt-answer" id="prompt-answer"></div>
      </div>

      <div class="player-scores" id="player-scores">
        ${this.players.map((p, i) => `
          <div class="score-chip">
            <div class="avatar" style="background: ${p.color}40;">${p.avatar}</div>
            <span>${p.name}</span>
            <span class="points">${this.scores[i] || 0}</span>
          </div>
        `).join('')}
      </div>

      <div class="player-indicators">
        ${this.players.map((p, i) => `
          <div class="player-dot ${i === this.currentPlayerIndex ? 'active' : ''}" 
               style="background: ${p.color};">
          </div>
        `).join('')}
      </div>
    `;

    const footer = `
      <div class="action-buttons">
        <button class="btn btn-secondary" data-action="skip">
          ${ICONS.SkipForward}
          <span>Skip</span>
        </button>
        <button class="btn btn-success" data-action="correct">
          ${ICONS.Check}
          <span>Correct!</span>
        </button>
        <button class="btn btn-primary" data-action="next">
          <span>Next</span>
          ${ICONS.ArrowRight}
        </button>
      </div>
    `;

    return { content, footer };
  }

  private endGame(): void {
    this.copilot?.stopTipsMode();
    this.copilot?.celebrate();
    
    setTimeout(() => {
      const result: GameResult = {
        gameId: this.game?.id || '',
        winner: this.getWinner(),
        scores: this.players.reduce((acc, p, i) => ({ ...acc, [p.id]: this.scores[i] || 0 }), {}),
        totalRounds: this.round,
        duration: 0,
      };
      this.onGameEnd?.(result);
      this.copilot?.destroy();
    }, 2000);
  }

  private getWinner(): Player | null {
    const maxScore = Math.max(...this.scores);
    const winnerIndex = this.scores.indexOf(maxScore);
    return this.players[winnerIndex] || null;
  }
}
