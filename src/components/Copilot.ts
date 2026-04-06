import { ICONS } from '../utils/ICONS';

export type CopilotMood = 'excited' | 'happy' | 'thinking' | 'waiting' | 'celebrating' | 'teaching' | 'sleepy' | 'winking';

export class CopilotCharacter {
  private container: HTMLElement | null = null;
  private mood: CopilotMood = 'waiting';
  private onMoodChange: ((mood: CopilotMood) => void) | null = null;
  private messageTimeout: number | null = null;
  private _tipsMode: boolean = false;
  private currentTipIndex: number = 0;
  private tips: string[] = [];
  private tipsInterval: number | null = null;
  private idleInterval: number | null = null;
  private breatheInterval: number | null = null;
  private isHovering: boolean = false;
  private _lastAction: string = '';

  constructor() {}

  setMood(mood: CopilotMood): void {
    this.mood = mood;
    this.updateAppearance();
    this.onMoodChange?.(mood);
  }

  setOnMoodChange(callback: (mood: CopilotMood) => void): void {
    this.onMoodChange = callback;
  }

  render(): HTMLElement {
    this.container = document.createElement('div');
    this.container.className = 'copilot-container';
    this.container.innerHTML = this.getStyles() + this.renderCharacter();
    this.startIdleBehaviors();
    return this.container;
  }

  private startIdleBehaviors(): void {
    this.breatheInterval = window.setInterval(() => {
      if (this.mood === 'waiting' && !this.isHovering) {
        this.breathe();
      }
    }, 3000);

    this.idleInterval = window.setInterval(() => {
      if (!this.isHovering && Math.random() > 0.7) {
        this.randomIdleAction();
      }
    }, 8000);
  }

  private breathe(): void {
    const avatar = this.container?.querySelector('.copilot-avatar');
    if (avatar) {
      avatar.classList.add('breathe');
      setTimeout(() => avatar.classList.remove('breathe'), 2000);
    }
  }

  private randomIdleAction(): void {
    const actions = ['lookAround', 'wiggle', 'nod', 'blink'];
    const action = actions[Math.floor(Math.random() * actions.length)];
    
    switch (action) {
      case 'lookAround':
        this.lookAround();
        break;
      case 'wiggle':
        this.wiggle();
        break;
      case 'nod':
        this.nod();
        break;
      case 'blink':
        this.blink();
        break;
    }
  }

  private lookAround(): void {
    const face = this.container?.querySelector('.copilot-face');
    if (face) {
      face.classList.add('look-around');
      setTimeout(() => face.classList.remove('look-around'), 1000);
    }
  }

  private wiggle(): void {
    const avatar = this.container?.querySelector('.copilot-avatar');
    if (avatar) {
      avatar.classList.add('wiggle');
      setTimeout(() => avatar.classList.remove('wiggle'), 600);
    }
  }

  private nod(): void {
    const avatar = this.container?.querySelector('.copilot-avatar');
    if (avatar) {
      avatar.classList.add('nod');
      setTimeout(() => avatar.classList.remove('nod'), 500);
    }
  }

  private blink(): void {
    const eyes = this.container?.querySelectorAll('.eye');
    eyes?.forEach(eye => {
      eye.classList.add('blink');
      setTimeout(() => eye.classList.remove('blink'), 150);
    });
  }

  private getStyles(): string {
    return `
      <style>
        .copilot-container {
          position: fixed;
          bottom: 120px;
          right: 20px;
          z-index: 100;
        }

        .copilot-character {
          position: relative;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .copilot-character:hover {
          transform: scale(1.1);
        }

        .copilot-avatar {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 8px 32px rgba(102, 126, 234, 0.4),
            0 0 60px rgba(102, 126, 234, 0.2);
          position: relative;
          overflow: visible;
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .copilot-avatar.breathe {
          animation: breathe 2s ease-in-out;
        }

        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .copilot-avatar.wiggle {
          animation: wiggle 0.6s ease-in-out;
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }

        .copilot-avatar.nod {
          animation: nod 0.5s ease-in-out;
        }

        @keyframes nod {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(10deg); }
        }

        .copilot-face {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .copilot-face.look-around {
          animation: lookAround 1s ease-in-out;
        }

        @keyframes lookAround {
          0%, 100% { transform: translateX(0); }
          30% { transform: translateX(-3px); }
          70% { transform: translateX(3px); }
        }

        .eyes {
          display: flex;
          gap: 8px;
          margin-bottom: 4px;
        }

        .eye {
          width: 6px;
          height: 6px;
          background: #fff;
          border-radius: 50%;
          position: relative;
        }

        .eye::after {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          background: #1a1a2e;
          border-radius: 50%;
          top: 2px;
          left: 2px;
        }

        .eye.blink {
          animation: blink 0.15s ease-in-out;
        }

        @keyframes blink {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.1); }
        }

        .mouth {
          width: 12px;
          height: 6px;
          border-radius: 0 0 12px 12px;
          background: #fff;
        }

        /* Mood-specific styles */
        .copilot-avatar.happy .eye {
          height: 4px;
          border-radius: 4px 4px 0 0;
          transform: translateY(2px);
        }

        .copilot-avatar.excited .eye {
          width: 10px;
          height: 10px;
        }

        .copilot-avatar.excited .eye::after {
          width: 5px;
          height: 5px;
        }

        .copilot-avatar.excited .mouth {
          width: 20px;
          height: 12px;
        }

        .copilot-avatar.thinking .eye:first-child {
          transform: translateX(-2px);
        }

        .copilot-avatar.thinking .eye:last-child {
          transform: translateX(2px);
        }

        .copilot-avatar.celebrating {
          animation: celebrate 0.5s ease-in-out infinite;
        }

        @keyframes celebrate {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(-5deg); }
          75% { transform: scale(1.1) rotate(5deg); }
        }

        .copilot-avatar.sleepy .eye {
          height: 3px;
          border-radius: 3px;
        }

        .copilot-avatar.sleepy .eye::after {
          display: none;
        }

        .copilot-avatar.sleepy .mouth {
          width: 10px;
          height: 6px;
          border-radius: 50%;
        }

        .copilot-avatar.winking .eye:last-child {
          height: 3px;
          border-radius: 3px;
        }

        .copilot-avatar.winking .eye:last-child::after {
          display: none;
        }

        /* Glow effect */
        .copilot-glow {
          position: absolute;
          inset: -6px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          opacity: 0.4;
          filter: blur(16px);
          z-index: -1;
          animation: glowPulse 3s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }

        /* Sparkles */
        .sparkle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #ffd700;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
        }

        .sparkle:nth-child(1) { top: -10px; left: 50%; animation: sparkle 2s ease-in-out infinite; }
        .sparkle:nth-child(2) { top: 20%; right: -10px; animation: sparkle 2s ease-in-out infinite 0.5s; }
        .sparkle:nth-child(3) { bottom: 20%; left: -10px; animation: sparkle 2s ease-in-out infinite 1s; }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        /* Speech bubble */
        .copilot-speech-bubble {
          position: absolute;
          bottom: 54px;
          right: -10px;
          background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);
          border: 2px solid rgba(102, 126, 234, 0.6);
          border-radius: 20px;
          padding: 14px 18px;
          max-width: 200px;
          min-width: 120px;
          opacity: 0;
          transform: translateY(20px) scale(0.8);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          pointer-events: none;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .copilot-speech-bubble.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .copilot-speech-bubble::after {
          content: '';
          position: absolute;
          bottom: -10px;
          right: 25px;
          width: 0;
          height: 0;
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-top: 12px solid #2d2d44;
        }

        .speech-text {
          font-size: 14px;
          color: #fff;
          line-height: 1.5;
        }

        .speech-text strong {
          color: #667eea;
        }

        .speech-typing {
          display: flex;
          gap: 4px;
          margin-top: 8px;
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          background: #667eea;
          border-radius: 50%;
          animation: typingBounce 1.4s ease-in-out infinite;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }

        /* Tips sliding mode */
        .tips-container {
          position: absolute;
          bottom: 58px;
          right: -10px;
          width: 220px;
          height: 90px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          pointer-events: none;
        }

        .tips-container.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .tips-track {
          display: flex;
          flex-direction: column;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tip-item {
          height: 90px;
          display: flex;
          align-items: center;
          padding: 0 14px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
          border: 1px solid rgba(102, 126, 234, 0.4);
          border-radius: 16px;
          flex-shrink: 0;
        }

        .tip-icon {
          font-size: 24px;
          margin-right: 12px;
          flex-shrink: 0;
          animation: tipIconPop 0.5s ease;
        }

        @keyframes tipIconPop {
          0% { transform: scale(0); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }

        .tip-text {
          font-size: 13px;
          color: #fff;
          line-height: 1.4;
        }

        .tip-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          position: absolute;
          bottom: 70px;
          right: 70px;
        }

        .tip-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .tip-dot.active {
          background: #667eea;
          transform: scale(1.4);
          box-shadow: 0 0 10px rgba(102, 126, 234, 0.6);
        }
      </style>
    `;
  }

  private renderCharacter(): string {
    return `
      <div class="copilot-character" id="copilot-character">
        <div class="copilot-glow"></div>
        <div class="sparkle"></div>
        <div class="sparkle"></div>
        <div class="sparkle"></div>
        <div class="copilot-avatar ${this.mood}" id="copilot-avatar">
          <div class="copilot-face">
            ${this.renderFace()}
          </div>
        </div>
        <div class="copilot-speech-bubble" id="speech-bubble">
          <p class="speech-text" id="speech-text"></p>
          <div class="speech-typing" id="speech-typing" style="display: none;">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
        <div class="tips-container" id="tips-container">
          <div class="tips-track" id="tips-track"></div>
        </div>
        <div class="tip-dots" id="tip-dots"></div>
      </div>
    `;
  }

  private renderFace(): string {
    const mouths: Record<CopilotMood, string> = {
      waiting: '<div class="mouth"></div>',
      happy: '<div class="mouth" style="height: 10px; border-radius: 0 0 20px 20px;"></div>',
      excited: '<div class="mouth" style="height: 12px; width: 20px; border-radius: 0 0 24px 24px;"></div>',
      thinking: '<div class="mouth" style="width: 10px; height: 6px; border-radius: 50%;"></div>',
      celebrating: '<div class="mouth" style="height: 14px; width: 24px; border-radius: 0 0 28px 28px;"></div>',
      teaching: '<div class="mouth" style="height: 6px; width: 14px;"></div>',
      sleepy: '<div class="mouth" style="width: 12px; height: 6px; border-radius: 50%;"></div>',
      winking: '<div class="mouth" style="height: 8px; width: 16px;"></div>',
    };

    return `
      <div class="eyes">
        <div class="eye"></div>
        <div class="eye"></div>
      </div>
      ${mouths[this.mood] || mouths.waiting}
    `;
  }

  private updateAppearance(): void {
    if (!this.container) return;
    const avatar = this.container.querySelector('.copilot-avatar');
    const face = this.container.querySelector('.copilot-face');
    if (avatar) avatar.className = `copilot-avatar ${this.mood}`;
    if (face) face.innerHTML = this.renderFace();
  }

  speak(message: string, duration: number = 5000): void {
    const bubble = this.container?.querySelector('.copilot-speech-bubble');
    const text = this.container?.querySelector('#speech-text');
    const typing = this.container?.querySelector('#speech-typing');

    if (bubble && text) {
      bubble.classList.add('visible');
      (text as HTMLElement).style.opacity = '0';
      (typing as HTMLElement).style.display = 'flex';
      
      this.setMood('thinking');
      
      let charIndex = 0;
      const typeSpeed = 30;
      const typeInterval = setInterval(() => {
        if (charIndex < message.length) {
          text.innerHTML = message.substring(0, charIndex + 1);
          charIndex++;
        } else {
          clearInterval(typeInterval);
          (typing as HTMLElement).style.display = 'none';
          (text as HTMLElement).style.opacity = '1';
          this.setMood('happy');
        }
      }, typeSpeed);

      if (this.messageTimeout) clearTimeout(this.messageTimeout);
      this.messageTimeout = window.setTimeout(() => {
        bubble.classList.remove('visible');
        this.setMood('waiting');
      }, duration + message.length * typeSpeed);
    }
  }

  startTipsMode(tips: string[]): void {
    this.tips = tips;
    this.currentTipIndex = 0;
    this._tipsMode = true;
    this.updateTips();
    
    const tipsContainer = this.container?.querySelector('#tips-container');
    const dots = this.container?.querySelector('#tip-dots');
    tipsContainer?.classList.add('visible');
    
    if (dots) {
      dots.innerHTML = tips.map((_, i) => `<div class="tip-dot ${i === 0 ? 'active' : ''}"></div>`).join('');
    }

    this.setMood('excited');

    if (this.tipsInterval) clearInterval(this.tipsInterval);
    this.tipsInterval = window.setInterval(() => {
      this.nextTip();
    }, 8000);
  }

  private updateTips(): void {
    const track = this.container?.querySelector('#tips-track');
    const dots = this.container?.querySelectorAll('.tip-dot');
    
    if (track) {
      const tipIcons = ['💡', '🎯', '⭐', '🔥', '💪', '🎮', '🎲', '🏆'];
      track.innerHTML = this.tips.map((tip, i) => `
        <div class="tip-item">
          <span class="tip-icon">${tipIcons[i % tipIcons.length]}</span>
          <span class="tip-text">${tip}</span>
        </div>
      `).join('');
      
      track.innerHTML = this.tips[this.currentTipIndex]
        .split(' ')
        .map((word, i) => `<span style="animation: wordPop 0.3s ease ${i * 0.1}s both;">${word}</span>`)
        .join(' ');
    }

    if (dots) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === this.currentTipIndex);
      });
    }
  }

  private nextTip(): void {
    const track = this.container?.querySelector('#tips-track');
    if (track) {
      track.classList.add('tip-slide-out');
      
      setTimeout(() => {
        this.currentTipIndex = (this.currentTipIndex + 1) % this.tips.length;
        this.updateTips();
        track.classList.remove('tip-slide-out');
        track.classList.add('tip-slide-in');
        
        setTimeout(() => track.classList.remove('tip-slide-in'), 500);
      }, 500);
    }

    if (Math.random() > 0.7) {
      this.wiggle();
    }
  }

  stopTipsMode(): void {
    this._tipsMode = false;
    if (this.tipsInterval) {
      clearInterval(this.tipsInterval);
      this.tipsInterval = null;
    }
    
    const tipsContainer = this.container?.querySelector('#tips-container');
    const dots = this.container?.querySelector('#tip-dots');
    tipsContainer?.classList.remove('visible');
    if (dots) dots.innerHTML = '';
    
    this.setMood('waiting');
  }

  celebrate(): void {
    this.setMood('celebrating');
    this.createConfetti();
    
    setTimeout(() => {
      this.setMood('happy');
      setTimeout(() => this.setMood('waiting'), 2000);
    }, 2000);
  }

  private createConfetti(): void {
    if (!this.container) return;
    
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: ${['#ffd700', '#667eea', '#ff6b6b', '#4ecdc4'][Math.floor(Math.random() * 4)]};
        border-radius: 50%;
        top: 50%;
        left: 50%;
        pointer-events: none;
        animation: confetti ${1 + Math.random()}s ease-out forwards;
      `;
      this.container.appendChild(confetti);
      
      const angle = (Math.PI * 2 * i) / 20;
      const velocity = 50 + Math.random() * 100;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      confetti.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
      ], { duration: 1000 + Math.random() * 500, easing: 'ease-out' });
      
      setTimeout(() => confetti.remove(), 1500);
    }
  }

  spin(): void {
    const avatar = this.container?.querySelector('.copilot-avatar') as HTMLElement | null;
    if (avatar) {
      avatar.style.animation = 'none';
      avatar.offsetHeight;
      avatar.style.animation = 'spin 0.8s ease';
      setTimeout(() => {
        avatar.style.animation = 'float 4s ease-in-out infinite';
      }, 800);
    }
  }

  react(action: string): void {
    this._lastAction = action;
    
    switch (action) {
      case 'tap':
        this.blink();
        break;
      case 'correct':
        this.setMood('excited');
        setTimeout(() => this.setMood('happy'), 1000);
        break;
      case 'wrong':
        this.setMood('thinking');
        setTimeout(() => this.setMood('waiting'), 1500);
        break;
      case 'skip':
        this.wiggle();
        break;
      case 'next':
        this.nod();
        break;
    }
  }

  onHoverStart(): void {
    this.isHovering = true;
    this.speak("Hi there! I'm your game companion! Tap me for tips!");
  }

  onHoverEnd(): void {
    this.isHovering = false;
  }

  hide(): void {
    this.container?.classList.add('hidden');
  }

  show(): void {
    this.container?.classList.remove('hidden');
  }

  destroy(): void {
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
    if (this.idleInterval) clearInterval(this.idleInterval);
    if (this.breatheInterval) clearInterval(this.breatheInterval);
    if (this.tipsInterval) clearInterval(this.tipsInterval);
    this.container?.remove();
  }
}

export class CopilotWelcome {
  private container: HTMLElement | null = null;
  private players: { id: string; name: string; color: string; avatar: string }[] = [];
  private selectedPlayerId: string | null = null;
  private onSelect: ((playerId: string) => void) | null = null;
  private onAddNew: (() => void) | null = null;

  constructor(players: { id: string; name: string; color: string; avatar: string }[]) {
    this.players = players;
  }

  setOnSelect(callback: (playerId: string) => void): void {
    this.onSelect = callback;
  }

  setOnAddNew(callback: () => void): void {
    this.onAddNew = callback;
  }

  render(): HTMLElement {
    this.container = document.createElement('div');
    this.container.className = 'copilot-welcome-screen';
    this.container.innerHTML = this.getStyles() + this.getHTML();

    this.attachEventListeners();
    this.startCopilotAnimation();
    return this.container;
  }

  private startCopilotAnimation(): void {
    const avatar = this.container?.querySelector('.copilot-welcome-avatar');
    if (avatar) {
      setTimeout(() => avatar.classList.add('wave'), 1000);
    }
  }

  private getStyles(): string {
    return `
      <style>
        .copilot-welcome-screen {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 200;
          padding: 20px;
        }

        .copilot-welcome-avatar {
          width: 140px;
          height: 140px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
          position: relative;
          animation: welcomeFloat 3s ease-in-out infinite;
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
        }

        .copilot-welcome-avatar::before {
          content: '';
          position: absolute;
          inset: -15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          opacity: 0.3;
          filter: blur(20px);
          z-index: -1;
          animation: welcomeGlow 2s ease-in-out infinite;
        }

        @keyframes welcomeFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }

        @keyframes welcomeGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }

        .copilot-welcome-avatar.wave {
          animation: welcomeFloat 3s ease-in-out infinite, wave 1s ease-in-out 3;
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
        }

        .copilot-welcome-avatar svg {
          width: 70px;
          height: 70px;
          fill: #fff;
        }

        .welcome-title {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
          animation: titlePop 0.6s ease backwards 0.3s;
        }

        @keyframes titlePop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        .welcome-subtitle {
          color: #888;
          font-size: 16px;
          margin-bottom: 40px;
          text-align: center;
          animation: fadeIn 0.5s ease 0.5s backwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .player-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 320px;
          max-height: 280px;
          overflow-y: auto;
          animation: fadeIn 0.5s ease 0.7s backwards;
        }

        .player-option {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.05);
          border: 2px solid transparent;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .player-option:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(102, 126, 234, 0.5);
          transform: translateX(4px);
        }

        .player-option.selected {
          background: rgba(102, 126, 234, 0.2);
          border-color: #667eea;
          transform: scale(1.02);
        }

        .player-option-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          transition: all 0.3s ease;
        }

        .player-option.selected .player-option-avatar {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
        }

        .player-option-name {
          font-size: 16px;
          font-weight: 600;
          flex: 1;
          color: #fff;
        }

        .player-option-check {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(102, 126, 234, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .player-option.selected .player-option-check {
          opacity: 1;
          background: #667eea;
        }

        .player-option-check svg {
          width: 14px;
          height: 14px;
          stroke: #fff;
        }

        .new-player-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.05);
          border: 2px dashed rgba(255,255,255,0.2);
          border-radius: 16px;
          color: #888;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          max-width: 320px;
          margin-top: 12px;
          animation: fadeIn 0.5s ease 0.9s backwards;
        }

        .new-player-btn:hover {
          border-color: #667eea;
          color: #667eea;
          transform: translateY(-2px);
        }

        .new-player-btn svg {
          width: 20px;
          height: 20px;
          stroke: currentColor;
        }

        .copilot-message {
          text-align: center;
          margin-top: 24px;
          padding: 16px;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 12px;
          max-width: 280px;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.5s ease 1s backwards;
        }

        .copilot-message-text {
          font-size: 14px;
          color: #fff;
          line-height: 1.5;
        }

        .copilot-message-text .highlight {
          color: #ffd700;
          font-weight: 600;
        }

        .copilot-message-text .excited {
          animation: textBounce 0.5s ease;
        }

        @keyframes textBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .start-btn {
          margin-top: 32px;
          padding: 18px 48px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 16px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0.5;
          pointer-events: none;
          animation: fadeIn 0.5s ease 1.1s backwards;
        }

        .start-btn.ready {
          opacity: 1;
          pointer-events: auto;
        }

        .start-btn.ready:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }
      </style>
    `;
  }

  private getHTML(): string {
    return `
      <div class="copilot-welcome-avatar" id="copilot-avatar">
        <svg viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
      </div>
      
      <h1 class="welcome-title">Hey there!</h1>
      <p class="welcome-subtitle">Who's leading the fun today?</p>
      
      <div class="player-list" id="player-list">
        ${this.players.map(player => this.renderPlayerOption(player)).join('')}
      </div>
      
      <button class="new-player-btn" id="add-new-btn">
        ${ICONS.Plus}
        <span>Add New Player</span>
      </button>
      
      <div class="copilot-message" id="copilot-message">
        <p class="copilot-message-text" id="message-text">
          Tap on a player to select them as today's host!
        </p>
      </div>
      
      <button class="start-btn" id="start-btn">
        Let's Go!
      </button>
    `;
  }

  private renderPlayerOption(player: { id: string; name: string; color: string; avatar: string }): string {
    return `
      <div class="player-option" data-player-id="${player.id}">
        <div class="player-option-avatar" style="background: ${player.color}30;">
          ${player.avatar}
        </div>
        <span class="player-option-name">${player.name}</span>
        <div class="player-option-check">
          ${ICONS.Check}
        </div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    if (!this.container) return;

    const playerOptions = this.container.querySelectorAll('.player-option');
    const startBtn = this.container.querySelector('#start-btn') as HTMLButtonElement;
    const addNewBtn = this.container.querySelector('#add-new-btn');
    const messageText = this.container.querySelector('#message-text');
    const avatar = this.container.querySelector('#copilot-avatar');

    playerOptions.forEach(option => {
      option.addEventListener('click', () => {
        playerOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        
        this.selectedPlayerId = option.getAttribute('data-player-id');
        startBtn.classList.add('ready');
        
        const selectedPlayer = this.players.find(p => p.id === this.selectedPlayerId);
        if (selectedPlayer && messageText) {
          messageText.innerHTML = `<span class="excited">Yay! <span class="highlight">${selectedPlayer.name}</span> will be an awesome host!</span>`;
        }
        
        if (avatar) {
          avatar.classList.add('wave');
          setTimeout(() => avatar.classList.remove('wave'), 1000);
        }
      });
    });

    startBtn?.addEventListener('click', () => {
      if (this.selectedPlayerId) {
        this.createCelebration();
        setTimeout(() => this.onSelect?.(this.selectedPlayerId!), 800);
      }
    });

    addNewBtn?.addEventListener('click', () => {
      this.onAddNew?.();
    });
  }

  private createCelebration(): void {
    if (!this.container) return;
    
    const avatar = this.container.querySelector('.copilot-welcome-avatar');
    if (avatar) {
      avatar.classList.add('wave');
    }

    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${['#ffd700', '#667eea', '#ff6b6b', '#4ecdc4', '#764ba2'][Math.floor(Math.random() * 5)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        top: 50%;
        left: 50%;
        pointer-events: none;
        z-index: 300;
      `;
      document.body.appendChild(confetti);
      
      const angle = (Math.PI * 2 * i) / 30;
      const velocity = 100 + Math.random() * 150;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity - 50;
      
      confetti.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
      ], { duration: 1000 + Math.random() * 500, easing: 'ease-out' });
      
      setTimeout(() => confetti.remove(), 1500);
    }
  }
}
