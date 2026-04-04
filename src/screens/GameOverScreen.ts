import { ICONS } from '../utils/ICONS';
import { GameResult, gameManager } from '../games/GameManager';
import { GAMES_DATA } from '../data/games-data';
import { Player } from '../utils/Storage';

export class GameOverScreen {
  private container: HTMLElement | null = null;
  private result: GameResult | null = null;
  private onPlayAgain: ((gameId: string) => void) | null = null;
  private onHome: (() => void) | null = null;
  private onNewGame: (() => void) | null = null;

  setCallbacks(
    onPlayAgain: (gameId: string) => void,
    onHome: () => void,
    onNewGame: () => void
  ): void {
    this.onPlayAgain = onPlayAgain;
    this.onHome = onHome;
    this.onNewGame = onNewGame;
  }

  setResult(result: GameResult): void {
    this.result = result;
  }

  render(): HTMLElement {
    this.container = document.createElement('div');
    this.container.className = 'gameover-screen';
    this.container.innerHTML = this.getStyles() + this.renderContent();

    this.attachEventListeners();
    return this.container;
  }

  private getStyles(): string {
    return `
      <style>
        .gameover-screen {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: #fff;
        }

        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          pointer-events: none;
        }

        .result-card {
          background: rgba(255,255,255,0.05);
          border-radius: 24px;
          padding: 32px;
          width: 100%;
          max-width: 400px;
          text-align: center;
          animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        .trophy-container {
          margin-bottom: 24px;
          animation: bounce 1s ease infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .trophy-icon {
          width: 100px;
          height: 100px;
          margin: 0 auto;
          background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 40px rgba(255, 215, 0, 0.3);
        }

        .trophy-icon svg {
          width: 50px;
          height: 50px;
          fill: #000;
        }

        .result-title {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .winner-section {
          margin-bottom: 24px;
        }

        .winner-label {
          font-size: 14px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }

        .winner-avatar {
          width: 80px;
          height: 80px;
          margin: 0 auto 12px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          position: relative;
        }

        .winner-avatar::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%);
          z-index: -1;
          animation: pulse 2s ease infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }

        .winner-name {
          font-size: 24px;
          font-weight: 700;
        }

        .winner-score {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-top: 4px;
        }

        .scores-section {
          margin-bottom: 24px;
        }

        .scores-title {
          font-size: 14px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 16px;
        }

        .scores-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 12px;
        }

        .score-item {
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 16px;
        }

        .score-item.winner {
          background: rgba(255, 215, 0, 0.1);
          border: 1px solid rgba(255, 215, 0, 0.3);
        }

        .score-avatar {
          width: 40px;
          height: 40px;
          margin: 0 auto 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .score-name {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .score-points {
          font-size: 18px;
          font-weight: 700;
          color: #667eea;
        }

        .stats-row {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 32px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
        }

        .stat-label {
          font-size: 12px;
          color: #888;
        }

        .actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 16px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }

        .btn-primary svg {
          width: 20px;
          height: 20px;
          stroke: currentColor;
        }

        .btn-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 24px;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 16px;
          color: #fff;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.15);
        }

        .btn-secondary svg {
          width: 20px;
          height: 20px;
          stroke: currentColor;
        }

        .draw-state .trophy-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .draw-state .trophy-icon svg {
          fill: #fff;
        }
      </style>
    `;
  }

  private renderContent(): string {
    if (!this.result) {
      return '<div class="result-card"><p>No game result available</p></div>';
    }

    const game = GAMES_DATA.getGameById(this.result.gameId);
    const sortedScores = Object.entries(this.result.scores)
      .sort(([, a], [, b]) => b - a);
    
    const isDraw = sortedScores.length > 1 && sortedScores[0][1] === sortedScores[1][1];

    const duration = Math.floor(this.result.duration / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    const trophyIcon = isDraw ? ICONS.Users : ICONS.Trophy;

    const winnerSection = this.result.winner ? `
      <div class="winner-section">
        <div class="winner-label">Winner</div>
        <div class="winner-avatar" style="background: ${this.result.winner.color}20;">
          ${this.result.winner.avatar}
        </div>
        <div class="winner-name">${this.result.winner.name}</div>
        <div class="winner-score">${this.result.scores[this.result.winner.id]} pts</div>
      </div>
    ` : '';

    return `
      <div class="result-card ${isDraw ? 'draw-state' : ''}">
        <div class="trophy-container">
          <div class="trophy-icon">
            ${trophyIcon}
          </div>
        </div>

        <h1 class="result-title">${isDraw ? 'It\'s a Tie!' : 'Game Over!'}</h1>

        ${game ? `
          <div style="margin-bottom: 16px; color: #888;">
            ${game.icon} ${game.name}
          </div>
        ` : ''}

        ${winnerSection}

        <div class="stats-row">
          <div class="stat-item">
            <div class="stat-value">${this.result.totalRounds}</div>
            <div class="stat-label">Rounds</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${minutes}:${seconds.toString().padStart(2, '0')}</div>
            <div class="stat-label">Duration</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${Object.keys(this.result.scores).length}</div>
            <div class="stat-label">Players</div>
          </div>
        </div>

        <div class="scores-section">
          <div class="scores-title">Final Scores</div>
          <div class="scores-grid">
            ${sortedScores.map(([playerId, score], index) => {
              const isWinner = !isDraw && index === 0 && score > 0;
              const player = this.getPlayerById(playerId);
              return `
                <div class="score-item ${isWinner ? 'winner' : ''}">
                  <div class="score-avatar" style="background: ${player?.color || '#666'}20;">
                    ${player?.avatar || '👤'}
                  </div>
                  <div class="score-name">${player?.name || 'Player'}</div>
                  <div class="score-points">${score}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="actions">
          ${this.result.gameId && this.onPlayAgain ? `
            <button class="btn-primary" data-action="play-again">
              ${ICONS.RotateCcw}
              Play Again
            </button>
          ` : ''}
          <button class="btn-secondary" data-action="new-game">
            ${ICONS.Grid}
            Choose New Game
          </button>
          <button class="btn-secondary" data-action="home">
            ${ICONS.Home}
            Back to Home
          </button>
        </div>
      </div>
    `;
  }

  private getPlayerById(playerId: string): Player | null {
    const storage = new Storage();
    return storage.getPlayers().find(p => p.id === playerId) || null;
  }

  private attachEventListeners(): void {
    if (!this.container) return;

    this.container.querySelector('[data-action="play-again"]')?.addEventListener('click', () => {
      if (this.result?.gameId && this.onPlayAgain) {
        this.onPlayAgain(this.result.gameId);
      }
    });

    this.container.querySelector('[data-action="new-game"]')?.addEventListener('click', () => {
      this.onNewGame?.();
    });

    this.container.querySelector('[data-action="home"]')?.addEventListener('click', () => {
      this.onHome?.();
    });

    this.createConfetti();
  }

  private createConfetti(): void {
    const colors = ['#ffd700', '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4ecdc4'];
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
          position: fixed;
          left: ${Math.random() * 100}%;
          top: -10px;
          width: ${Math.random() * 10 + 5}px;
          height: ${Math.random() * 10 + 5}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
          animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
          @keyframes confettiFall {
            to {
              transform: translateY(100vh) rotate(${Math.random() * 720}deg);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          confetti.remove();
          style.remove();
        }, 4000);
      }, i * 50);
    }
  }
}
