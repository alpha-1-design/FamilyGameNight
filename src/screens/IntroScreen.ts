export class IntroScreen {
  private container: HTMLElement;
  private animationPhase: number = 0;
  private animationTimer: number = 0;
  private onComplete: (() => void) | null = null;

  constructor() {
    this.container = this.render();
    this.startAnimation();
  }

  setOnComplete(callback: () => void): void {
    this.onComplete = callback;
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'intro-screen';
    container.innerHTML = `
      <div class="intro-content">
        <!-- Lighter SVG -->
        <div class="lighter-container">
          <svg class="lighter" width="60" height="120" viewBox="0 0 60 120" fill="none">
            <!-- Lighter body -->
            <rect x="15" y="35" width="30" height="80" rx="4" fill="url(#lighterBody)"/>
            <rect x="18" y="40" width="24" height="70" rx="2" fill="#3a3a5a"/>
            
            <!-- Lighter cap -->
            <rect x="12" y="30" width="36" height="10" rx="2" fill="#4a4a6a"/>
            
            <!-- Spark wheel -->
            <circle class="spark-wheel" cx="30" cy="30" r="8" fill="#6a6a8a"/>
            <circle cx="30" cy="30" r="4" fill="#8a8aaa"/>
            
            <!-- Fuel window -->
            <rect x="22" y="50" width="16" height="30" rx="2" fill="#4ECDC4" opacity="0.3"/>
            
            <!-- Flame container (hidden initially) -->
            <g class="flame-container" style="opacity: 0;">
              <ellipse cx="30" cy="25" rx="8" ry="15" fill="url(#flameGradient)"/>
              <ellipse cx="30" cy="22" rx="5" ry="10" fill="#FFB800"/>
              <ellipse cx="30" cy="20" rx="3" ry="6" fill="#FFFACD"/>
            </g>
            
            <defs>
              <linearGradient id="lighterBody" x1="15" y1="35" x2="45" y2="115" gradientUnits="userSpaceOnUse">
                <stop stop-color="#5a5a7a"/>
                <stop offset="1" stop-color="#3a3a5a"/>
              </linearGradient>
              <linearGradient id="flameGradient" x1="30" y1="40" x2="30" y2="10" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FF6B6B"/>
                <stop offset="0.5" stop-color="#FFB800"/>
                <stop offset="1" stop-color="#FFFACD"/>
              </linearGradient>
            </defs>
          </svg>
          
          <!-- Sparks -->
          <div class="sparks-container">
            <div class="spark spark-1"></div>
            <div class="spark spark-2"></div>
            <div class="spark spark-3"></div>
            <div class="spark spark-4"></div>
            <div class="spark spark-5"></div>
          </div>
        </div>
        
        <!-- Light burst (hidden initially) -->
        <div class="light-burst"></div>
        
        <!-- App title (hidden initially) -->
        <div class="intro-title-container">
          <h1 class="intro-title">Family Game Night</h1>
          <p class="intro-subtitle">The ultimate game hub</p>
        </div>
        
        <!-- Feature text (animated) -->
        <div class="intro-features">
          <p class="intro-feature">Pass-and-play games for everyone</p>
          <p class="intro-feature">No internet. No accounts.</p>
          <p class="intro-feature">Pure fun, anywhere.</p>
        </div>
        
        <!-- Tap to start -->
        <button class="intro-start-btn" style="opacity: 0;">
          <span>Tap to Start</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M12 19L7 14M12 19L17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <style>
        .intro-screen {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a1a;
        }
        
        .intro-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: var(--space-xl);
        }
        
        .lighter-container {
          position: relative;
          margin-bottom: var(--space-2xl);
        }
        
        .lighter {
          transition: transform var(--transition-normal);
        }
        
        .lighter.click-1 {
          animation: shake 0.2s ease;
        }
        
        .lighter.click-2 {
          animation: shake 0.2s ease;
        }
        
        .lighter.click-3 {
          animation: shake 0.2s ease;
        }
        
        .lighter.lit {
          transform: scale(1.2);
        }
        
        .spark-wheel {
          transition: transform 0.1s ease;
        }
        
        .lighter.click-1 .spark-wheel,
        .lighter.click-2 .spark-wheel,
        .lighter.click-3 .spark-wheel {
          animation: spin 0.2s ease;
        }
        
        .flame-container {
          transition: opacity 0.5s ease;
          transform-origin: center bottom;
        }
        
        .flame-container.visible {
          animation: flame 0.3s ease-in-out infinite;
        }
        
        .sparks-container {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          pointer-events: none;
        }
        
        .spark {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #FFB800;
          border-radius: 50%;
          opacity: 0;
        }
        
        .spark-1 { top: 10px; left: 50%; }
        .spark-2 { top: 15px; left: 30%; }
        .spark-3 { top: 15px; left: 70%; }
        .spark-4 { top: 5px; left: 40%; }
        .spark-5 { top: 5px; left: 60%; }
        
        .sparks-container.sparking .spark {
          animation: spark 0.4s ease-out;
        }
        
        .sparks-container.sparking .spark-1 { animation-delay: 0s; }
        .sparks-container.sparking .spark-2 { animation-delay: 0.05s; }
        .sparks-container.sparking .spark-3 { animation-delay: 0.1s; }
        .sparks-container.sparking .spark-4 { animation-delay: 0.08s; }
        .sparks-container.sparking .spark-5 { animation-delay: 0.12s; }
        
        .light-burst {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          pointer-events: none;
          box-shadow: 0 0 100px 50px white;
        }
        
        .light-burst.active {
          animation: lightBurst 1s ease-out forwards;
        }
        
        @keyframes lightBurst {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(50);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(100);
            opacity: 0;
          }
        }
        
        .intro-title-container {
          opacity: 0;
          transform: translateY(20px);
          margin-bottom: var(--space-lg);
        }
        
        .intro-title-container.visible {
          animation: fadeInUp 1s ease forwards;
        }
        
        .intro-title {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-extrabold);
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: var(--space-sm);
        }
        
        .intro-subtitle {
          font-size: var(--font-size-lg);
          color: var(--color-text-secondary);
        }
        
        .intro-features {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          margin-bottom: var(--space-xl);
        }
        
        .intro-features.visible {
          max-height: 200px;
          opacity: 1;
          transition: max-height 1s ease, opacity 0.5s ease;
        }
        
        .intro-feature {
          font-size: var(--font-size-md);
          color: var(--color-text-muted);
          margin-bottom: var(--space-sm);
          opacity: 0;
        }
        
        .intro-features.visible .intro-feature {
          animation: fadeInUp 0.5s ease forwards;
        }
        
        .intro-features.visible .intro-feature:nth-child(1) { animation-delay: 0.2s; }
        .intro-features.visible .intro-feature:nth-child(2) { animation-delay: 0.4s; }
        .intro-features.visible .intro-feature:nth-child(3) { animation-delay: 0.6s; }
        
        .intro-start-btn {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-md) var(--space-xl);
          background: var(--gradient-primary);
          border-radius: var(--radius-full);
          font-size: var(--font-size-md);
          font-weight: var(--font-weight-semibold);
          color: white;
          cursor: pointer;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }
        
        .intro-start-btn:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-glow);
        }
        
        .intro-start-btn.visible {
          animation: fadeInUp 0.5s ease forwards, pulse 2s ease-in-out infinite;
          animation-delay: 1s, 2s;
        }
        
        .intro-start-btn svg {
          animation: bounce 1s ease-in-out infinite;
        }
      </style>
    `;

    // Add click handler
    const startBtn = container.querySelector('.intro-start-btn') as HTMLButtonElement;
    startBtn.addEventListener('click', () => {
      this.handleStart();
    });

    return container;
  }

  private startAnimation() {
    const lighter = this.container.querySelector('.lighter') as HTMLElement;
    const sparks = this.container.querySelector('.sparks-container') as HTMLElement;
    const lightBurst = this.container.querySelector('.light-burst') as HTMLElement;
    const titleContainer = this.container.querySelector('.intro-title-container') as HTMLElement;
    const features = this.container.querySelector('.intro-features') as HTMLElement;
    const startBtn = this.container.querySelector('.intro-start-btn') as HTMLButtonElement;
    const flameContainer = this.container.querySelector('.flame-container') as SVGGElement;

    // Phase 1: First spark (1s)
    setTimeout(() => {
      this.triggerSpark(lighter, sparks);
    }, 1000);

    // Phase 2: Second spark (2s)
    setTimeout(() => {
      this.triggerSpark(lighter, sparks);
    }, 2000);

    // Phase 3: Third spark + flame (3s)
    setTimeout(() => {
      this.triggerSpark(lighter, sparks);
      flameContainer.style.opacity = '1';
      flameContainer.classList.add('visible');
      lighter.classList.add('lit');
    }, 3000);

    // Phase 4: Light burst + title (4s)
    setTimeout(() => {
      lightBurst.classList.add('active');
      titleContainer.classList.add('visible');
    }, 4000);

    // Phase 5: Features appear (5s)
    setTimeout(() => {
      features.classList.add('visible');
    }, 5000);

    // Phase 6: Start button (6s)
    setTimeout(() => {
      startBtn.classList.add('visible');
    }, 6000);
  }

  private triggerSpark(lighter: HTMLElement, sparks: HTMLElement) {
    lighter.classList.add('click-' + (this.animationPhase + 1));
    sparks.classList.add('sparking');
    
    // Haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    setTimeout(() => {
      lighter.classList.remove('click-' + (this.animationPhase + 1));
      sparks.classList.remove('sparking');
    }, 300);
    
    this.animationPhase++;
  }

  private async handleStart() {
    const { Storage } = await import('../utils/Storage.js');
    const storage = new Storage();
    
    if (this.onComplete) {
      this.onComplete();
    }
  }
}
