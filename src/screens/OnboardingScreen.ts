export class OnboardingScreen {
  private app: { showScreen: (screen: string) => void };
  private container: HTMLElement;

  constructor(app: { showScreen: (screen: string) => void }) {
    this.app = app;
    this.container = this.render();
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'onboarding-screen';
    container.innerHTML = `
      <div class="onboarding-header">
        <button class="btn-icon" id="onboarding-back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div class="onboarding-content">
        <div class="onboarding-slides" id="onboarding-slides">
          <!-- Slide 1: Welcome -->
          <div class="onboarding-slide active" data-slide="0">
            <div class="slide-icon">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="55" fill="url(#slideGradient1)" opacity="0.2"/>
                <circle cx="60" cy="60" r="40" fill="url(#slideGradient1)" opacity="0.3"/>
                <path d="M40 50L60 35L80 50V70L60 85L40 70V50Z" stroke="#5B7FFF" stroke-width="3" stroke-linejoin="round"/>
                <path d="M60 35V55M60 55L40 70M60 55L80 70" stroke="#5B7FFF" stroke-width="3"/>
                <defs>
                  <linearGradient id="slideGradient1" x1="20" y1="20" x2="100" y2="100">
                    <stop stop-color="#5B7FFF"/>
                    <stop offset="1" stop-color="#4ECDC4"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h2 class="slide-title">Welcome!</h2>
            <p class="slide-desc">The ultimate pass-and-play game hub for families. 25+ games, no internet needed.</p>
          </div>
          
          <!-- Slide 2: Quick Setup -->
          <div class="onboarding-slide" data-slide="1">
            <div class="slide-icon">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="55" fill="#4ECDC4" opacity="0.2"/>
                <circle cx="40" cy="50" r="15" stroke="#4ECDC4" stroke-width="3"/>
                <circle cx="80" cy="50" r="15" stroke="#4ECDC4" stroke-width="3"/>
                <circle cx="30" cy="80" r="15" stroke="#4ECDC4" stroke-width="3"/>
                <circle cx="60" cy="90" r="15" stroke="#4ECDC4" stroke-width="3"/>
                <circle cx="90" cy="80" r="15" stroke="#4ECDC4" stroke-width="3"/>
                <circle cx="40" cy="50" r="5" fill="#4ECDC4"/>
                <circle cx="80" cy="50" r="5" fill="#4ECDC4"/>
                <circle cx="30" cy="80" r="5" fill="#4ECDC4"/>
                <circle cx="60" cy="90" r="5" fill="#4ECDC4"/>
                <circle cx="90" cy="80" r="5" fill="#4ECDC4"/>
              </svg>
            </div>
            <h2 class="slide-title">Add Your Family</h2>
            <p class="slide-desc">Create player profiles for everyone who will play. Pick names and colors.</p>
          </div>
          
          <!-- Slide 3: Pass & Play -->
          <div class="onboarding-slide" data-slide="2">
            <div class="slide-icon">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="30" cy="60" r="20" stroke="#FF6B6B" stroke-width="3"/>
                <circle cx="90" cy="60" r="20" stroke="#5B7FFF" stroke-width="3"/>
                <path d="M50 60H70" stroke="#FFB800" stroke-width="3" stroke-dasharray="5,5"/>
                <path d="M65 55L75 60L65 65" fill="#FFB800"/>
              </svg>
            </div>
            <h2 class="slide-title">Pass & Play</h2>
            <p class="slide-desc">Games are designed for one phone. Pass it around as players take turns!</p>
          </div>
          
          <!-- Slide 4: Learn as You Go -->
          <div class="onboarding-slide" data-slide="3">
            <div class="slide-icon">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="55" fill="#FFB800" opacity="0.2"/>
                <circle cx="60" cy="45" r="15" stroke="#FFB800" stroke-width="3"/>
                <path d="M45 75C45 65 50 60 60 60C70 60 75 65 75 75V80H45V75Z" stroke="#FFB800" stroke-width="3"/>
                <circle cx="60" cy="45" r="5" fill="#FFB800"/>
              </svg>
            </div>
            <h2 class="slide-title">Easy Tutorials</h2>
            <p class="slide-desc">Each game shows you how to play with simple picture guides. Learn as you explore!</p>
          </div>
          
          <!-- Slide 5: Ready -->
          <div class="onboarding-slide" data-slide="4">
            <div class="slide-icon">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="55" fill="url(#slideGradient2)" opacity="0.2"/>
                <path d="M40 65L55 80L85 45" stroke="#4ECB71" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                <defs>
                  <linearGradient id="slideGradient2" x1="20" y1="20" x2="100" y2="100">
                    <stop stop-color="#4ECB71"/>
                    <stop offset="1" stop-color="#4ECDC4"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h2 class="slide-title">You're All Set!</h2>
            <p class="slide-desc">Ready to have fun with your family? Let's add players and start playing!</p>
          </div>
        </div>
        
        <div class="onboarding-dots" id="onboarding-dots">
          <span class="dot active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
      
      <div class="onboarding-footer">
        <button class="btn btn-primary btn-large btn-full" id="onboarding-next">
          <span>Next</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <style>
        .onboarding-screen {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: var(--space-md);
        }
        
        .onboarding-header {
          display: flex;
          justify-content: flex-start;
        }
        
        .onboarding-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .onboarding-slides {
          position: relative;
          min-height: 400px;
        }
        
        .onboarding-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          opacity: 0;
          visibility: hidden;
          transform: translateX(50px);
          transition: all var(--transition-slow);
        }
        
        .onboarding-slide.active {
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
        }
        
        .slide-icon {
          margin-bottom: var(--space-xl);
        }
        
        .slide-title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-md);
        }
        
        .slide-desc {
          font-size: var(--font-size-md);
          color: var(--color-text-secondary);
          max-width: 280px;
          line-height: 1.6;
        }
        
        .onboarding-dots {
          display: flex;
          justify-content: center;
          gap: var(--space-sm);
          margin: var(--space-xl) 0;
        }
        
        .dot {
          width: 8px;
          height: 8px;
          border-radius: var(--radius-full);
          background: var(--color-text-muted);
          transition: all var(--transition-normal);
        }
        
        .dot.active {
          width: 24px;
          background: var(--color-primary);
        }
        
        .onboarding-footer {
          padding-top: var(--space-md);
        }
      </style>
    `;

    this.setupEventListeners(container);
    return container;
  }

  private setupEventListeners(container: HTMLElement) {
    const backBtn = container.querySelector('#onboarding-back') as HTMLButtonElement;
    const nextBtn = container.querySelector('#onboarding-next') as HTMLButtonElement;
    const slides = container.querySelectorAll('.onboarding-slide');
    const dots = container.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    const goToSlide = (index: number) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      currentSlide = index;
      
      const btnText = nextBtn.querySelector('span') as HTMLSpanElement;
      if (currentSlide === totalSlides - 1) {
        btnText.textContent = 'Get Started';
      } else {
        btnText.textContent = 'Next';
      }
    };

    backBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
      } else {
        this.app.showScreen('players');
      }
    });
  }
}
