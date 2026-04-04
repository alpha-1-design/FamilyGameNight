import { ICONS } from '../utils/ICONS';
import { Storage } from '../utils/Storage';
import { TRANSLATIONS } from '../data/prompts-data';

export class SettingsScreen {
  private container: HTMLElement | null = null;
  private storage: Storage;
  private onBack: (() => void) | null = null;

  constructor() {
    this.storage = new Storage();
  }

  setOnBack(callback: () => void): void {
    this.onBack = callback;
  }

  render(): HTMLElement {
    const settings = this.storage.getSettings();
    const currentLang = PROMPTS_DATA.getLanguage();

    this.container = document.createElement('div');
    this.container.className = 'settings-screen';
    this.container.innerHTML = `
      <style>
        .settings-screen {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
          padding: 20px;
          color: #fff;
        }

        .settings-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
          padding-top: 20px;
        }

        .settings-back-btn {
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

        .settings-back-btn:hover {
          background: rgba(255,255,255,0.2);
          transform: scale(1.05);
        }

        .settings-back-btn svg {
          width: 24px;
          height: 24px;
          stroke: #fff;
        }

        .settings-title {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .settings-section {
          margin-bottom: 24px;
          animation: slideUp 0.4s ease forwards;
          opacity: 0;
        }

        .settings-section:nth-child(2) { animation-delay: 0.1s; }
        .settings-section:nth-child(3) { animation-delay: 0.2s; }
        .settings-section:nth-child(4) { animation-delay: 0.3s; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .section-title {
          font-size: 14px;
          font-weight: 600;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }

        .settings-card {
          background: rgba(255,255,255,0.05);
          border-radius: 16px;
          overflow: hidden;
        }

        .setting-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .setting-item:last-child {
          border-bottom: none;
        }

        .setting-label {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .setting-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .setting-icon svg {
          width: 20px;
          height: 20px;
          stroke: #fff;
        }

        .setting-text h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .setting-text p {
          font-size: 12px;
          color: #888;
        }

        .toggle-switch {
          width: 52px;
          height: 28px;
          background: rgba(255,255,255,0.1);
          border-radius: 14px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .toggle-switch.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .toggle-switch::after {
          content: '';
          position: absolute;
          width: 22px;
          height: 22px;
          background: #fff;
          border-radius: 50%;
          top: 3px;
          left: 3px;
          transition: all 0.3s ease;
        }

        .toggle-switch.active::after {
          left: 27px;
        }

        .slider-setting {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          max-width: 200px;
        }

        .slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .slider-value {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
        }

        input[type="range"] {
          width: 100%;
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
          outline: none;
          -webkit-appearance: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          cursor: pointer;
        }

        .language-selector {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .language-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.05);
          border: 2px solid transparent;
          border-radius: 12px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .language-btn:hover {
          background: rgba(255,255,255,0.1);
        }

        .language-btn.active {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.2);
        }

        .language-flag {
          font-size: 20px;
        }

        .language-name {
          font-size: 14px;
          font-weight: 500;
        }

        .danger-zone {
          margin-top: 32px;
        }

        .danger-zone .settings-card {
          border: 1px solid rgba(255, 100, 100, 0.3);
        }

        .danger-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 16px 20px;
          background: transparent;
          border: none;
          color: #ff6b6b;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .danger-btn:hover {
          background: rgba(255, 100, 100, 0.1);
        }

        .version-info {
          text-align: center;
          padding: 24px;
          color: #666;
          font-size: 12px;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 16px;
          padding: 16px;
        }

        .social-link {
          width: 44px;
          height: 44px;
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: rgba(255,255,255,0.1);
          transform: scale(1.1);
        }

        .social-link svg {
          width: 20px;
          height: 20px;
          stroke: #888;
        }
      </style>

      <div class="settings-header">
        <button class="settings-back-btn" data-action="back">
          ${ICONS.ArrowLeft}
        </button>
        <h1 class="settings-title">Settings</h1>
      </div>

      <div class="settings-section">
        <h3 class="section-title">Sound</h3>
        <div class="settings-card">
          <div class="setting-item">
            <div class="setting-label">
              <div class="setting-icon">${ICONS.Volume2}</div>
              <div class="setting-text">
                <h4>Sound Effects</h4>
                <p>Game sounds and feedback</p>
              </div>
            </div>
            <div class="toggle-switch ${settings.soundEnabled ? 'active' : ''}" data-setting="soundEnabled"></div>
          </div>
          <div class="setting-item">
            <div class="setting-label">
              <div class="setting-icon">${ICONS.Music}</div>
              <div class="setting-text">
                <h4>Background Music</h4>
                <p>Ambient music while playing</p>
              </div>
            </div>
            <div class="toggle-switch ${settings.musicEnabled ? 'active' : ''}" data-setting="musicEnabled"></div>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h3 class="section-title">Game Settings</h3>
        <div class="settings-card">
          <div class="setting-item">
            <div class="setting-label">
              <div class="setting-icon">${ICONS.Timer}</div>
              <div class="setting-text">
                <h4>Timer Duration</h4>
                <p>Default time per round</p>
              </div>
            </div>
            <div class="slider-setting">
              <div class="slider-header">
                <span></span>
                <span class="slider-value">${settings.timerDuration}s</span>
              </div>
              <input type="range" min="10" max="120" step="5" value="${settings.timerDuration}" data-setting="timerDuration">
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-label">
              <div class="setting-icon">${ICONS.RotateCcw}</div>
              <div class="setting-text">
                <h4>Default Rounds</h4>
                <p>Rounds per game</p>
              </div>
            </div>
            <div class="slider-setting">
              <div class="slider-header">
                <span></span>
                <span class="slider-value">${settings.defaultRounds}</span>
              </div>
              <input type="range" min="5" max="50" step="5" value="${settings.defaultRounds}" data-setting="defaultRounds">
            </div>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h3 class="section-title">Language</h3>
        <div class="settings-card">
          <div class="setting-item" style="flex-direction: column; align-items: stretch;">
            <div class="language-selector">
              ${Object.entries(TRANSLATIONS).map(([code, { name, flag }]) => `
                <button class="language-btn ${code === currentLang ? 'active' : ''}" data-lang="${code}">
                  <span class="language-flag">${flag}</span>
                  <span class="language-name">${name}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="settings-section social-section">
        <h3 class="section-title">Connect</h3>
        <div class="settings-card">
          <div class="setting-item" style="justify-content: center;">
            <div class="social-links">
              <a class="social-link" href="https://alpha1studio.vercel.app/" target="_blank" rel="noopener">
                ${ICONS.Globe}
              </a>
              <a class="social-link" href="https://github.com" target="_blank" rel="noopener">
                ${ICONS.Github}
              </a>
              <a class="social-link" href="https://twitter.com" target="_blank" rel="noopener">
                ${ICONS.Twitter}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-section danger-zone">
        <h3 class="section-title" style="color: #ff6b6b;">Danger Zone</h3>
        <div class="settings-card">
          <button class="danger-btn" data-action="reset-scores">
            <div class="setting-icon" style="background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);">${ICONS.Trash2}</div>
            <div class="setting-text" style="text-align: left;">
              <h4>Reset All Scores</h4>
              <p>Clear all game scores and leaderboard</p>
            </div>
          </button>
          <button class="danger-btn" data-action="reset-tutorials">
            <div class="setting-icon" style="background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);">${ICONS.HelpCircle}</div>
            <div class="setting-text" style="text-align: left;">
              <h4>Reset Tutorials</h4>
              <p>Show game tutorials again</p>
            </div>
          </button>
          <button class="danger-btn" data-action="reset-all">
            <div class="setting-icon" style="background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);">${ICONS.AlertTriangle}</div>
            <div class="setting-text" style="text-align: left;">
              <h4>Reset Everything</h4>
              <p>Clear all data and restart</p>
            </div>
          </button>
        </div>
      </div>

      <div class="version-info">
        <p>Family Game Night v1.0.0</p>
        <p style="margin-top: 4px;">Made with love for family fun</p>
      </div>
    `;

    this.attachEventListeners();
    return this.container;
  }

  private attachEventListeners(): void {
    if (!this.container) return;

    this.container.querySelector('[data-action="back"]')?.addEventListener('click', () => {
      this.onBack?.();
    });

    this.container.querySelectorAll('.toggle-switch').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const setting = toggle.getAttribute('data-setting') as keyof typeof this.storage.getSettings;
        const currentSettings = this.storage.getSettings();
        this.storage.updateSettings({ [setting]: !currentSettings[setting] });
        toggle.classList.toggle('active');
      });
    });

    this.container.querySelectorAll('input[type="range"]').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        const setting = target.getAttribute('data-setting') as keyof typeof this.storage.getSettings;
        const value = parseInt(target.value);
        
        this.storage.updateSettings({ [setting]: value });
        
        const valueDisplay = slider.parentElement?.querySelector('.slider-value');
        if (valueDisplay) {
          valueDisplay.textContent = `${value}${setting === 'timerDuration' ? 's' : ''}`;
        }
      });
    });

    this.container.querySelectorAll('.language-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (lang) {
          PROMPTS_DATA.setLanguage(lang);
          this.container?.querySelectorAll('.language-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    });

    this.container.querySelector('[data-action="reset-scores"]')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all scores?')) {
        this.storage.resetAllScores();
        this.showToast('Scores reset successfully');
      }
    });

    this.container.querySelector('[data-action="reset-tutorials"]')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all tutorials?')) {
        this.storage.resetTutorials();
        this.showToast('Tutorials reset successfully');
      }
    });

    this.container.querySelector('[data-action="reset-all"]')?.addEventListener('click', () => {
      if (confirm('This will delete ALL data including scores, players, and settings. Are you sure?')) {
        localStorage.clear();
        window.location.reload();
      }
    });
  }

  private showToast(message: string): void {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      padding: 12px 24px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
      z-index: 1000;
      animation: toastIn 0.3s ease forwards;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }
}

const PROMPTS_DATA = {
  getLanguage: () => localStorage.getItem('fgn_language') || 'en',
  setLanguage: (lang: string) => localStorage.setItem('fgn_language', lang),
};
