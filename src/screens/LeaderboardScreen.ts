import { ICONS } from '../utils/ICONS';
import { gameManager } from '../games/GameManager';
import { GAMES_DATA } from '../data/games-data';

export class LeaderboardScreen {
  private container: HTMLElement | null = null;
  private onBack: (() => void) | null = null;
  private currentGameId: string | null = null;

  setOnBack(callback: () => void): void {
    this.onBack = callback;
  }

  setGameFilter(gameId: string | null): void {
    this.currentGameId = gameId;
  }

  render(): HTMLElement {
    this.container = document.createElement('div');
    this.container.className = 'leaderboard-screen';
    this.container.innerHTML = this.getStyles() + this.renderContent();

    this.attachEventListeners();
    return this.container;
  }

  private getStyles(): string {
    return `
      <style>
        .leaderboard-screen {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
          color: #fff;
        }

        .leaderboard-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          padding-top: 40px;
        }

        .back-btn {
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

        .back-btn:hover {
          background: rgba(255,255,255,0.2);
          transform: scale(1.05);
        }

        .back-btn svg {
          width: 24px;
          height: 24px;
          stroke: #fff;
        }

        .header-title {
          flex: 1;
          text-align: center;
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .filter-tabs {
          display: flex;
          gap: 8px;
          padding: 0 20px 16px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .filter-tabs::-webkit-scrollbar { display: none; }

        .filter-tab {
          padding: 8px 16px;
          background: rgba(255,255,255,0.05);
          border: none;
          border-radius: 20px;
          color: #888;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s ease;
        }

        .filter-tab:hover {
          background: rgba(255,255,255,0.1);
        }

        .filter-tab.active {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: #fff;
        }

        .leaderboard-content {
          padding: 0 20px 100px;
        }

        .top-three {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 8px;
          padding: 24px 0;
        }

        .top-player {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
        }

        .top-player:nth-child(1) { animation-delay: 0.1s; }
        .top-player:nth-child(2) { animation-delay: 0.2s; }
        .top-player:nth-child(3) { animation-delay: 0.3s; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .player-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 8px;
          position: relative;
        }

        .player-avatar::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .first-place .player-avatar {
          width: 80px;
          height: 80px;
          font-size: 36px;
        }

        .first-place .player-avatar::after {
          inset: -4px;
          padding: 4px;
        }

        .crown-icon {
          position: absolute;
          top: -24px;
          left: 50%;
          transform: translateX(-50%);
        }

        .crown-icon svg {
          width: 28px;
          height: 28px;
          fill: #ffd700;
          filter: drop-shadow(0 2px 4px rgba(255, 215, 0, 0.5));
        }

        .player-name {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
          max-width: 80px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .player-score {
          font-size: 18px;
          font-weight: 700;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .wins-badge {
          font-size: 11px;
          color: #888;
          margin-top: 2px;
        }

        .leaderboard-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .leaderboard-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
        }

        .leaderboard-item:nth-child(1) { animation-delay: 0.4s; }
        .leaderboard-item:nth-child(2) { animation-delay: 0.45s; }
        .leaderboard-item:nth-child(3) { animation-delay: 0.5s; }
        .leaderboard-item:nth-child(4) { animation-delay: 0.55s; }
        .leaderboard-item:nth-child(5) { animation-delay: 0.6s; }

        .rank {
          width: 28px;
          height: 28px;
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #888;
        }

        .rank.gold { background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%); color: #000; }
        .rank.silver { background: linear-gradient(135deg, #c0c0c0 0%, #a8a8a8 100%); color: #000; }
        .rank.bronze { background: linear-gradient(135deg, #cd7f32 0%, #b87333 100%); color: #000; }

        .item-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .item-info {
          flex: 1;
        }

        .item-name {
          font-size: 15px;
          font-weight: 600;
        }

        .item-wins {
          font-size: 12px;
          color: #888;
        }

        .item-score {
          font-size: 18px;
          font-weight: 700;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 16px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-icon svg {
          width: 40px;
          height: 40px;
          stroke: #666;
        }

        .empty-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .empty-text {
          font-size: 14px;
          color: #888;
        }

        .game-icon {
          width: 32px;
          height: 32px;
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
      </style>
    `;
  }

  private renderContent(): string {
    const leaderboard = gameManager.getLeaderboard(this.currentGameId || undefined);
    const currentGame = this.currentGameId ? GAMES_DATA.getGameById(this.currentGameId) : null;

    const allGames = GAMES_DATA.games;
    const categories = GAMES_DATA.getCategories();

    const topThree = leaderboard.slice(0, 3);
    const rest = leaderboard.slice(3);

    let podiumHTML = '';
    if (topThree.length > 0) {
      const orderedTopThree = this.currentGameId ? topThree : this.reorderForPodium(topThree);
      
      podiumHTML = `
        <div class="top-three">
          ${orderedTopThree.map((entry, index) => `
            <div class="top-player ${index === 1 ? 'first-place' : ''}">
              ${index === 0 ? `<div class="crown-icon">${ICONS.Crown}</div>` : ''}
              <div class="player-avatar" style="background: ${entry.player.color}20;">
                ${entry.player.avatar}
              </div>
              <span class="player-name">${entry.player.name}</span>
              <span class="player-score">${entry.totalPoints.toLocaleString()}</span>
              <span class="wins-badge">${entry.wins} wins</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    let listHTML = '';
    if (rest.length > 0) {
      listHTML = `
        <div class="leaderboard-list">
          ${rest.map((entry, index) => `
            <div class="leaderboard-item">
              <div class="rank">${index + 4}</div>
              <div class="item-avatar" style="background: ${entry.player.color}20;">
                ${entry.player.avatar}
              </div>
              <div class="item-info">
                <div class="item-name">${entry.player.name}</div>
                <div class="item-wins">${entry.wins} wins</div>
              </div>
              <div class="item-score">${entry.totalPoints.toLocaleString()}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    const emptyStateHTML = leaderboard.length === 0 ? `
      <div class="empty-state">
        <div class="empty-icon">
          ${ICONS.Trophy}
        </div>
        <h3 class="empty-title">No Scores Yet</h3>
        <p class="empty-text">Play some games to see your scores here!</p>
      </div>
    ` : '';

    return `
      <div class="leaderboard-header">
        <button class="back-btn" data-action="back">
          ${ICONS.ArrowLeft}
        </button>
        <h1 class="header-title">Leaderboard</h1>
        <div style="width: 44px;"></div>
      </div>

      ${currentGame ? `
        <div style="text-align: center; padding: 0 20px 8px;">
          <span style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 20px; font-size: 14px;">
            <span>${currentGame.icon}</span>
            ${currentGame.name}
          </span>
        </div>
      ` : ''}

      <div class="filter-tabs">
        <button class="filter-tab ${!this.currentGameId ? 'active' : ''}" data-game="all">All Games</button>
        ${allGames.map(game => `
          <button class="filter-tab ${this.currentGameId === game.id ? 'active' : ''}" data-game="${game.id}">
            ${game.icon} ${game.name}
          </button>
        `).join('')}
      </div>

      <div class="leaderboard-content">
        ${podiumHTML}
        ${listHTML}
        ${emptyStateHTML}
      </div>
    `;
  }

  private reorderForPodium(players: { player: Player; totalPoints: number; wins: number }[]): typeof players {
    if (players.length < 3) return players;
    
    const [first, second, third] = players;
    return [second, first, third];
  }

  private attachEventListeners(): void {
    if (!this.container) return;

    this.container.querySelector('[data-action="back"]')?.addEventListener('click', () => {
      this.onBack?.();
    });

    this.container.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const gameId = tab.getAttribute('data-game');
        this.currentGameId = gameId === 'all' ? null : gameId;
        
        this.container!.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        this.container!.querySelector('.leaderboard-content')!.innerHTML = 
          this.renderLeaderboardContent();
      });
    });
  }

  private renderLeaderboardContent(): string {
    const leaderboard = gameManager.getLeaderboard(this.currentGameId || undefined);

    const topThree = leaderboard.slice(0, 3);
    const rest = leaderboard.slice(3);

    let podiumHTML = '';
    if (topThree.length > 0) {
      const orderedTopThree = this.reorderForPodium(topThree);
      
      podiumHTML = `
        <div class="top-three">
          ${orderedTopThree.map((entry, index) => `
            <div class="top-player ${index === 1 ? 'first-place' : ''}">
              ${index === 0 ? `<div class="crown-icon">${ICONS.Crown}</div>` : ''}
              <div class="player-avatar" style="background: ${entry.player.color}20;">
                ${entry.player.avatar}
              </div>
              <span class="player-name">${entry.player.name}</span>
              <span class="player-score">${entry.totalPoints.toLocaleString()}</span>
              <span class="wins-badge">${entry.wins} wins</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    let listHTML = '';
    if (rest.length > 0) {
      listHTML = `
        <div class="leaderboard-list">
          ${rest.map((entry, index) => `
            <div class="leaderboard-item">
              <div class="rank">${index + 4}</div>
              <div class="item-avatar" style="background: ${entry.player.color}20;">
                ${entry.player.avatar}
              </div>
              <div class="item-info">
                <div class="item-name">${entry.player.name}</div>
                <div class="item-wins">${entry.wins} wins</div>
              </div>
              <div class="item-score">${entry.totalPoints.toLocaleString()}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    const emptyStateHTML = leaderboard.length === 0 ? `
      <div class="empty-state">
        <div class="empty-icon">
          ${ICONS.Trophy}
        </div>
        <h3 class="empty-title">No Scores Yet</h3>
        <p class="empty-text">Play some games to see your scores here!</p>
      </div>
    ` : '';

    return `${podiumHTML}${listHTML}${emptyStateHTML}`;
  }
}

interface Player {
  id: string;
  name: string;
  color: string;
  avatar: string;
}
