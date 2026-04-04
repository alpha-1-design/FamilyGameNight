import { ICONS } from '../utils/ICONS';
import { Storage, Player } from '../utils/Storage';

export class PlayersScreen {
  private storage: Storage;
  private container: HTMLElement | null = null;
  private players: Player[] = [];
  private selectedColor: string = '#5B7FFF';
  private currentStep: 'players' | 'host' = 'players';
  private onContinue: ((players: Player[], hostId: string) => void) | null = null;
  private onBack: (() => void) | null = null;

  constructor() {
    this.storage = new Storage();
    this.players = this.storage.getPlayers();
  }

  setOnContinue(callback: (players: Player[], hostId: string) => void): void {
    this.onContinue = callback;
  }

  setOnBack(callback: () => void): void {
    this.onBack = callback;
  }

  render(): HTMLElement {
    this.container = document.createElement('div');
    this.container.className = 'players-screen';
    this.container.innerHTML = this.getStyles() + this.renderStep();
    this.attachEventListeners();
    return this.container;
  }

  private getStyles(): string {
    return `
      <style>
        .players-screen {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
          color: #fff;
        }

        .screen-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
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
        }

        .back-btn svg {
          width: 24px;
          height: 24px;
          stroke: #fff;
        }

        .header-title {
          font-size: 20px;
          font-weight: 700;
        }

        .step-indicator {
          display: flex;
          gap: 8px;
          padding: 0 20px 16px;
        }

        .step-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          transition: all 0.3s ease;
        }

        .step-dot.active {
          width: 24px;
          border-radius: 4px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .step-dot.completed {
          background: #4ecdc4;
        }

        .screen-content {
          padding: 0 20px;
          min-height: calc(100vh - 200px);
        }

        .step-title {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .step-subtitle {
          color: #888;
          margin-bottom: 24px;
          font-size: 15px;
        }

        .player-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .player-card {
          background: rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .player-card:hover {
          background: rgba(255,255,255,0.08);
          transform: translateY(-2px);
        }

        .player-card.host-selected {
          border-color: #ffd700;
          background: rgba(255, 215, 0, 0.1);
        }

        .player-card.host-candidate {
          border-color: #667eea;
        }

        .player-card .host-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%);
          color: #000;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 8px;
          display: none;
        }

        .player-card.host-selected .host-badge {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .player-card .host-badge svg {
          width: 12px;
          height: 12px;
          fill: #000;
        }

        .player-remove {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255,100,100,0.2);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .player-remove:hover {
          background: rgba(255,100,100,0.4);
          transform: scale(1.1);
        }

        .player-remove svg {
          width: 14px;
          height: 14px;
          stroke: #ff6b6b;
        }

        .player-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        .player-name {
          font-weight: 600;
          font-size: 14px;
          text-align: center;
        }

        .add-player-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 20px;
          background: rgba(255,255,255,0.05);
          border: 2px dashed rgba(255,255,255,0.2);
          border-radius: 16px;
          color: #888;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-player-btn:hover {
          border-color: #667eea;
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .add-player-btn svg {
          width: 20px;
          height: 20px;
          stroke: currentColor;
        }

        .screen-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: linear-gradient(to top, #0a0a0f 80%, transparent);
          padding-bottom: calc(20px + env(safe-area-inset-bottom, 0));
        }

        .btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 18px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 16px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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
          width: 100%;
          padding: 16px 24px;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 16px;
          color: #fff;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.15);
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 100;
        }

        .modal-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .modal-content {
          background: #1a1a2e;
          border-radius: 24px;
          width: 90%;
          max-width: 320px;
          transform: scale(0.9);
          transition: transform 0.3s ease;
        }

        .modal-overlay.active .modal-content {
          transform: scale(1);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .modal-title {
          font-size: 18px;
          font-weight: 700;
        }

        .modal-close {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .modal-close svg {
          width: 18px;
          height: 18px;
          stroke: #888;
        }

        .modal-body {
          padding: 20px;
        }

        .input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255,255,255,0.1);
          border: 2px solid transparent;
          border-radius: 12px;
          font-size: 15px;
          color: #fff;
          outline: none;
          transition: all 0.3s ease;
        }

        .input:focus {
          border-color: #667eea;
        }

        .input::placeholder {
          color: #666;
        }

        .color-picker {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-top: 16px;
        }

        .color-option {
          aspect-ratio: 1;
          border-radius: 50%;
          border: 3px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .color-option:hover {
          transform: scale(1.1);
        }

        .color-option.selected {
          border-color: #fff;
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .modal-footer {
          padding: 20px;
          padding-top: 0;
        }

        /* Host Selection */
        .host-info {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 183, 0, 0.1) 100%);
          border: 1px solid rgba(255, 215, 0, 0.3);
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .host-info-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .host-info-icon svg {
          width: 20px;
          height: 20px;
          fill: #000;
        }

        .host-info-text {
          flex: 1;
        }

        .host-info-title {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 2px;
        }

        .host-info-desc {
          font-size: 12px;
          color: #888;
        }

        .tap-hint {
          text-align: center;
          color: #666;
          font-size: 12px;
          margin-top: 8px;
        }

        .crown-animation {
          animation: bounce 1s ease infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      </style>
    `;
  }

  private renderStep(): string {
    if (this.currentStep === 'players') {
      return this.renderPlayersStep();
    } else {
      return this.renderHostStep();
    }
  }

  private renderPlayersStep(): string {
    return `
      <div class="screen-header">
        <button class="back-btn" data-action="back">
          ${ICONS.ArrowLeft}
        </button>
        <h1 class="header-title">Players</h1>
        <div style="width: 44px;"></div>
      </div>

      <div class="step-indicator">
        <div class="step-dot active"></div>
        <div class="step-dot"></div>
      </div>

      <div class="screen-content">
        <h2 class="step-title">Who's Playing?</h2>
        <p class="step-subtitle">Add family members to start the game night</p>
        
        <div class="player-grid" id="player-grid">
          ${this.players.map(p => this.createPlayerCard(p)).join('')}
        </div>
        
        <button class="add-player-btn" data-action="add-player">
          ${ICONS.Plus}
          <span>Add Player</span>
        </button>
      </div>

      <div class="screen-footer">
        <button class="btn-primary" data-action="continue" ${this.players.length < 2 ? 'disabled' : ''}>
          <span>Continue</span>
          ${ICONS.ArrowRight}
        </button>
      </div>

      <!-- Add Player Modal -->
      <div class="modal-overlay" id="add-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Add Player</h3>
            <button class="modal-close" data-action="modal-close">
              ${ICONS.X}
            </button>
          </div>
          <div class="modal-body">
            <input type="text" class="input" id="player-name-input" placeholder="Enter name" maxlength="15" autocomplete="off">
            <div class="color-picker" id="color-picker">
              ${['#5B7FFF', '#FF6B6B', '#4ECDC4', '#FFB800', '#9B59B6', '#E67E22', '#2ECC71', '#3498DB', '#E91E63', '#00BCD4'].map((color, i) => `
                <button class="color-option ${i === 0 ? 'selected' : ''}" 
                        data-color="${color}"
                        style="background: ${color};">
                </button>
              `).join('')}
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-primary" data-action="confirm-add">
              Add Player
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private renderHostStep(): string {
    return `
      <div class="screen-header">
        <button class="back-btn" data-action="back">
          ${ICONS.ArrowLeft}
        </button>
        <h1 class="header-title">Host</h1>
        <div style="width: 44px;"></div>
      </div>

      <div class="step-indicator">
        <div class="step-dot completed"></div>
        <div class="step-dot active"></div>
      </div>

      <div class="screen-content">
        <h2 class="step-title">Who's Hosting?</h2>
        <p class="step-subtitle">Select the game night host - they'll control the game</p>
        
        <div class="host-info">
          <div class="host-info-icon">
            ${ICONS.Crown}
          </div>
          <div class="host-info-text">
            <div class="host-info-title">Game Night Host</div>
            <div class="host-info-desc">Can start games, manage rounds, and control prompts</div>
          </div>
        </div>

        <div class="player-grid" id="host-grid">
          ${this.players.map(p => this.createHostCard(p)).join('')}
        </div>
        
        <p class="tap-hint">Tap to select the host</p>
      </div>

      <div class="screen-footer">
        <button class="btn-primary" id="confirm-host-btn" disabled>
          <span>Start Game Night</span>
          ${ICONS.Gamepad2}
        </button>
      </div>
    `;
  }

  private createPlayerCard(player: Player): string {
    return `
      <div class="player-card" data-player-id="${player.id}">
        <button class="player-remove" data-player-id="${player.id}">
          ${ICONS.X}
        </button>
        <div class="player-avatar" style="background: ${player.color};">
          ${player.avatar}
        </div>
        <span class="player-name">${player.name}</span>
      </div>
    `;
  }

  private createHostCard(player: Player): string {
    return `
      <div class="player-card host-candidate" data-player-id="${player.id}" data-action="select-host">
        <div class="host-badge crown-animation">
          ${ICONS.Crown}
          <span>HOST</span>
        </div>
        <div class="player-avatar" style="background: ${player.color};">
          ${player.avatar}
        </div>
        <span class="player-name">${player.name}</span>
      </div>
    `;
  }

  private attachEventListeners(): void {
    if (!this.container) return;

    if (this.currentStep === 'players') {
      this.attachPlayersListeners();
    } else {
      this.attachHostListeners();
    }
  }

  private attachPlayersListeners(): void {
    if (!this.container) return;

    this.container.querySelector('[data-action="back"]')?.addEventListener('click', () => {
      this.onBack?.();
    });

    this.container.querySelector('[data-action="add-player"]')?.addEventListener('click', () => {
      this.openAddModal();
    });

    this.container.querySelector('[data-action="continue"]')?.addEventListener('click', () => {
      this.currentStep = 'host';
      this.container!.innerHTML = this.getStyles() + this.renderHostStep();
      this.attachHostListeners();
    });

    this.container.querySelectorAll('.player-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const playerId = (btn as HTMLElement).getAttribute('data-player-id');
        if (playerId && confirm('Remove this player?')) {
          this.players = this.players.filter(p => p.id !== playerId);
          this.storage.removePlayer(playerId);
          this.refreshPlayerGrid();
        }
      });
    });
  }

  private attachHostListeners(): void {
    if (!this.container) return;

    this.container.querySelector('[data-action="back"]')?.addEventListener('click', () => {
      this.currentStep = 'players';
      this.container!.innerHTML = this.getStyles() + this.renderPlayersStep();
      this.attachPlayersListeners();
    });

    let selectedHostId: string | null = null;

    this.container.querySelectorAll('[data-action="select-host"]').forEach(card => {
      card.addEventListener('click', () => {
        this.container!.querySelectorAll('.player-card').forEach(c => c.classList.remove('host-selected'));
        card.classList.add('host-selected');
        selectedHostId = card.getAttribute('data-player-id');
        
        const confirmBtn = this.container!.querySelector('#confirm-host-btn') as HTMLButtonElement;
        if (confirmBtn) {
          confirmBtn.disabled = !selectedHostId;
        }
      });
    });

    this.container.querySelector('#confirm-host-btn')?.addEventListener('click', () => {
      if (selectedHostId) {
        this.storage.savePlayers(this.players);
        localStorage.setItem('fgn_host', selectedHostId);
        this.onContinue?.(this.players, selectedHostId);
      }
    });
  }

  private openAddModal(): void {
    const modal = this.container?.querySelector('#add-modal') as HTMLElement;
    if (!modal) return;

    modal.classList.add('active');
    const input = modal.querySelector('#player-name-input') as HTMLInputElement;
    input.value = '';
    input.focus();

    const colorOptions = modal.querySelectorAll('.color-option');
    colorOptions.forEach((opt, i) => {
      opt.classList.toggle('selected', i === 0);
    });
    this.selectedColor = '#5B7FFF';

    const closeBtn = modal.querySelector('[data-action="modal-close"]');
    closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });

    colorOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        colorOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        this.selectedColor = opt.getAttribute('data-color') || '#5B7FFF';
      });
    });

    const confirmBtn = modal.querySelector('[data-action="confirm-add"]');
    confirmBtn?.addEventListener('click', () => {
      const name = input.value.trim();
      if (name) {
        this.addPlayer(name);
        modal.classList.remove('active');
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const name = input.value.trim();
        if (name) {
          this.addPlayer(name);
          modal.classList.remove('active');
        }
      }
    });
  }

  private addPlayer(name: string): void {
    const avatars = ['😀', '😎', '🤪', '😇', '🥳', '😋', '🤩', '🥰', '😺', '🦊', '🐱', '🐶', '🦁', '🐼', '🐨'];
    const player: Player = {
      id: Date.now().toString(),
      name: name,
      color: this.selectedColor,
      avatar: avatars[Math.floor(Math.random() * avatars.length)]
    };
    this.players.push(player);
    this.storage.addPlayer(player);
    this.refreshPlayerGrid();
  }

  private refreshPlayerGrid(): void {
    const grid = this.container?.querySelector('#player-grid');
    if (grid) {
      grid.innerHTML = this.players.map(p => this.createPlayerCard(p)).join('');
    }
    
    const continueBtn = this.container?.querySelector('[data-action="continue"]') as HTMLButtonElement;
    if (continueBtn) {
      continueBtn.disabled = this.players.length < 2;
    }

    this.attachPlayersListeners();
  }
}
