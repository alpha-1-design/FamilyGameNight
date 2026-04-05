var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=`modulepreload`,r=function(e){return`/`+e},i={},a=function(e,t,a){let o=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(t.map(t=>{if(t=r(t,a),t in i)return;i[t]=!0;let o=t.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``;if(a)for(let n=e.length-1;n>=0;n--){let r=e[n];if(r.href===t&&(!o||r.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${s}`))return;let l=document.createElement(`link`);if(l.rel=o?`stylesheet`:n,o||(l.as=`script`),l.crossOrigin=``,l.href=t,c&&l.setAttribute(`nonce`,c),document.head.appendChild(l),o)return new Promise((e,n)=>{l.addEventListener(`load`,e),l.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(t=>{for(let e of t||[])e.status===`rejected`&&s(e.reason);return e().catch(s)})},o=class{container;animationPhase=0;animationTimer=0;onComplete=null;constructor(){this.container=this.render(),this.startAnimation()}setOnComplete(e){this.onComplete=e}render(){let e=document.createElement(`div`);return e.className=`intro-screen`,e.innerHTML=`
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
    `,e.querySelector(`.intro-start-btn`).addEventListener(`click`,()=>{this.handleStart()}),e}startAnimation(){let e=this.container.querySelector(`.lighter`),t=this.container.querySelector(`.sparks-container`),n=this.container.querySelector(`.light-burst`),r=this.container.querySelector(`.intro-title-container`),i=this.container.querySelector(`.intro-features`),a=this.container.querySelector(`.intro-start-btn`),o=this.container.querySelector(`.flame-container`);setTimeout(()=>{this.triggerSpark(e,t)},1e3),setTimeout(()=>{this.triggerSpark(e,t)},2e3),setTimeout(()=>{this.triggerSpark(e,t),o.style.opacity=`1`,o.classList.add(`visible`),e.classList.add(`lit`)},3e3),setTimeout(()=>{n.classList.add(`active`),r.classList.add(`visible`)},4e3),setTimeout(()=>{i.classList.add(`visible`)},5e3),setTimeout(()=>{a.classList.add(`visible`)},6e3)}triggerSpark(e,t){e.classList.add(`click-`+(this.animationPhase+1)),t.classList.add(`sparking`),`vibrate`in navigator&&navigator.vibrate(50),setTimeout(()=>{e.classList.remove(`click-`+(this.animationPhase+1)),t.classList.remove(`sparking`)},300),this.animationPhase++}async handleStart(){let{Storage:e}=await a(async()=>{let{Storage:e}=await Promise.resolve().then(()=>l);return{Storage:e}},void 0);new e,this.onComplete&&this.onComplete()}},s=class{app;container;constructor(e){this.app=e,this.container=this.render()}render(){let e=document.createElement(`div`);return e.className=`onboarding-screen`,e.innerHTML=`
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
    `,this.setupEventListeners(e),e}setupEventListeners(e){let t=e.querySelector(`#onboarding-back`),n=e.querySelector(`#onboarding-next`),r=e.querySelectorAll(`.onboarding-slide`),i=e.querySelectorAll(`.dot`),a=0,o=r.length,s=e=>{r.forEach((t,n)=>{t.classList.toggle(`active`,n===e)}),i.forEach((t,n)=>{t.classList.toggle(`active`,n===e)}),a=e;let t=n.querySelector(`span`);a===o-1?t.textContent=`Get Started`:t.textContent=`Next`};t.addEventListener(`click`,()=>{a>0&&s(a-1)}),n.addEventListener(`click`,()=>{a<o-1?s(a+1):this.app.showScreen(`players`)})}},c={Copilot:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/><circle cx="12" cy="12" r="9" stroke-dasharray="4 2"/></svg>`,Plus:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,Check:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,X:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,Crown:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 17l2-11 5 4 3-6 3 6 5-4 2 11H2z"/><path d="M2 17h20v3H2z"/></svg>`,ArrowRight:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,ArrowLeft:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,ArrowUp:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`,ArrowDown:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`,SkipForward:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>`,SkipBack:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>`,ChevronRight:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,ChevronLeft:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,ChevronsRight:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>`,ChevronsLeft:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>`,Home:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,Settings:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,Trophy:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,Medal:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/></svg>`,Play:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,Pause:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,Volume:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,VolumeX:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>`,Globe:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,Trash:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,RotateCcw:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>`,Users:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,User:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,UserPlus:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>`,Star:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,Heart:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,Zap:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,Sparkles:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 4.5L18 3l-1.5 4.5L18 12l-4.5 1.5L12 18l-1.5-4.5L6 12l4.5-4.5L12 3z"/><path d="M5 3l.5 1.5L7 3l-.5 1.5L7 6l-1.5.5L5 9l-.5-1.5L3 6l1.5-.5L5 3z"/><path d="M19 17l.5 1.5L21 17l-.5 1.5L21 20l-1.5.5L19 23l-.5-1.5L17 20l1.5-.5L19 17z"/></svg>`,Confetti:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3l1.5 4.5L12 3l4.5 4.5L18 3l1 5-5 4-3 7-3-7-5-4 1-5z"/><circle cx="5" cy="17" r="1"/><circle cx="19" cy="19" r="1"/><circle cx="8" cy="21" r="0.5"/></svg>`,Flame:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,Award:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,Target:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,Lightbulb:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>`,ThumbsUp:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`,Party:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5.8 11.3L2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/></svg>`,Brain:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>`,Grid:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,Info:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,AlertTriangle:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,Sun:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,Moon:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,RefreshCw:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,Shuffle:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>`,Share:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,ExternalLink:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,Github:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,Twitter:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,Instagram:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,Dice1:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="12" r="2"/></svg>`,Dice2:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>`,Dice3:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>`,Dice4:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>`,Dice5:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>`,Dice6:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="7" r="1.5" fill="currentColor"/><circle cx="16" cy="7" r="1.5" fill="currentColor"/><circle cx="8" cy="12" r="1.5" fill="currentColor"/><circle cx="16" cy="12" r="1.5" fill="currentColor"/><circle cx="8" cy="17" r="1.5" fill="currentColor"/><circle cx="16" cy="17" r="1.5" fill="currentColor"/></svg>`,Dices:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="8" height="8" rx="1"/><circle cx="5" cy="5" r="1"/><circle cx="17" cy="5" r="1"/><circle cx="5" cy="17" r="1"/><circle cx="17" cy="17" r="1"/></svg>`,Puzzles:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19.439 7.85c-.049.644.297 1.15.944 1.15 1.056 0 1.932-.54 2.593-1.448.767-1.053-.098-2.345-1.226-1.351-.56.487-.924 1.13-1.097 1.84-.149.6.202 1.24.744 1.24.656 0 1.095-.556 1.218-1.364.144-.956-.36-1.848-1.127-1.848-.54 0-1.04.38-1.423.902-.48.658-.63 1.514-.42 2.252-.44.25-1.2.6-1.8.3-.67-.33-1.04-.97-1.18-1.7-.17-.93.23-1.88 1.12-2.57 1.15-.9 2.74-.49 3.72.95.57.83.83 1.88.77 2.76z"/><path d="M10.66 16.151c.049-.645-.297-1.15-.944-1.15-1.056 0-1.932.54-2.593 1.448-.767 1.053.098 2.345 1.226 1.351.56-.487.924-1.13 1.097-1.84.149-.6-.202-1.24-.744-1.24-.656 0-1.095.556-1.218 1.364-.144.956.36 1.848 1.127 1.848.54 0 1.04-.38 1.423-.902.48-.658.63-1.514.42-2.252.44-.25 1.2-.6 1.8-.3.67.33 1.04.97 1.18 1.7.17.93-.23 1.88-1.12 2.57-1.15.9-2.74.49-3.72-.95-.57-.83-.83-1.88-.77-2.76z"/></svg>`,Pencil:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`,BookOpen:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,Eye:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,EyeOff:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`,Lock:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,Clock:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,Timer:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/></svg>`,Search:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,Filter:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,Mic:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,Camera:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,Image:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`,Download:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,Upload:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,MapPin:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,Gift:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,Rocket:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,Coffee:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`,Dumbbell:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>`,Music:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,Smile:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,Menu:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>`,MoreHorizontal:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,Flag:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,Compass:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,Cloud:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,Mountain:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="m4.14 15.08 2.86-2.86"/></svg>`,Wifi:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,Battery:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="18" height="10" rx="2" ry="2"/><line x1="22" y1="11" x2="22" y2="13"/><line x1="6" y1="11" x2="6" y2="13"/><line x1="10" y1="11" x2="10" y2="13"/><line x1="14" y1="11" x2="14" y2="13"/></svg>`,Monitor:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,Smartphone:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,Headphones:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`,Gamepad:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>`,Crosshair:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>`,Swords:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" y1="14" x2="9" y2="18"/><line x1="7" y1="17" x2="4" y2="20"/><line x1="3" y1="19" x2="5" y2="21"/></svg>`,Ghost:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/></svg>`,Bomb:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="13" r="9"/><path d="m19.5 9.5 1.8-1.8a2.4 2.4 0 0 0 0-3.4l-1.6-1.6a2.41 2.41 0 0 0-3.4 0l-1.8 1.8"/><path d="m22 2-1.5 1.5"/></svg>`,Puzzle:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19.439 7.85c-.049.644.297 1.15.944 1.15 1.056 0 1.932-.54 2.593-1.448.767-1.053-.098-2.345-1.226-1.351-.56.487-.924 1.13-1.097 1.84-.149.6.202 1.24.744 1.24.656 0 1.095-.556 1.218-1.364.144-.956-.36-1.848-1.127-1.848-.54 0-1.04.38-1.423.902-.48.658-.63 1.514-.42 2.252-.44.25-1.2.6-1.8.3-.67-.33-1.04-.97-1.18-1.7-.17-.93.23-1.88 1.12-2.57 1.15-.9 2.74-.49 3.72.95.57.83.83 1.88.77 2.76z"/></svg>`,Palette:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>`,Sparkle:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,ChevronUp:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,ChevronDown:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,PlusMinus:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/><line x1="5" y1="8" x2="19" y2="8"/></svg>`,Minus:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,Clipboard:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`,File:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>`,Folder:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,Save:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`,Send:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,Bell:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,Book:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,Calculator:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="8" y2="18.01"/><line x1="12" y1="18" x2="16" y2="18"/></svg>`,Languages:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>`,Volume1:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,Volume2:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,Bookmark:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,Tag:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>`,Layers:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`},l=t({Storage:()=>u}),u=class{PLAYERS_KEY=`fgn_players`;SCORES_KEY=`fgn_scores`;SETTINGS_KEY=`fgn_settings`;ONBOARDED_KEY=`fgn_onboarded`;TUTORIALS_KEY=`fgn_tutorials`;FAVORITES_KEY=`fgn_favorites`;getPlayers(){let e=localStorage.getItem(this.PLAYERS_KEY);return e?JSON.parse(e):[]}savePlayers(e){localStorage.setItem(this.PLAYERS_KEY,JSON.stringify(e))}addPlayer(e){let t=this.getPlayers();t.push(e),this.savePlayers(t)}removePlayer(e){let t=this.getPlayers().filter(t=>t.id!==e);this.savePlayers(t)}updatePlayer(e,t){let n=this.getPlayers().map(n=>n.id===e?{...n,...t}:n);this.savePlayers(n)}getScores(){let e=localStorage.getItem(this.SCORES_KEY);return e?JSON.parse(e):{}}saveScore(e,t,n){let r=this.getScores();r[e]||(r[e]={}),r[e][t]||(r[e][t]={wins:0,points:0}),r[e][t].points+=n,r[e][t].wins+=n>0?1:0,localStorage.setItem(this.SCORES_KEY,JSON.stringify(r))}getGameScores(e){return this.getScores()[e]||{}}resetAllScores(){localStorage.removeItem(this.SCORES_KEY)}getSettings(){let e=localStorage.getItem(this.SETTINGS_KEY);return e?JSON.parse(e):{soundEnabled:!0,musicEnabled:!1,timerDuration:30,defaultRounds:10,darkMode:!0}}updateSettings(e){let t={...this.getSettings(),...e};localStorage.setItem(this.SETTINGS_KEY,JSON.stringify(t))}isOnboarded(){return localStorage.getItem(this.ONBOARDED_KEY)===`true`}setOnboarded(e){localStorage.setItem(this.ONBOARDED_KEY,e.toString())}getCompletedTutorials(){let e=localStorage.getItem(this.TUTORIALS_KEY);return e?JSON.parse(e):[]}markTutorialCompleted(e){let t=this.getCompletedTutorials();t.includes(e)||(t.push(e),localStorage.setItem(this.TUTORIALS_KEY,JSON.stringify(t)))}isTutorialCompleted(e){return this.getCompletedTutorials().includes(e)}resetTutorials(){localStorage.removeItem(this.TUTORIALS_KEY)}getFavorites(){let e=localStorage.getItem(this.FAVORITES_KEY);return e?JSON.parse(e):[]}toggleFavorite(e){let t=this.getFavorites(),n=t.indexOf(e);return n===-1?t.push(e):t.splice(n,1),localStorage.setItem(this.FAVORITES_KEY,JSON.stringify(t)),t.includes(e)}isFavorite(e){return this.getFavorites().includes(e)}},d=class{storage;container=null;players=[];selectedColor=`#5B7FFF`;currentStep=`players`;onContinue=null;onBack=null;constructor(){this.storage=new u,this.players=this.storage.getPlayers()}setOnContinue(e){this.onContinue=e}setOnBack(e){this.onBack=e}render(){return this.container=document.createElement(`div`),this.container.className=`players-screen`,this.container.innerHTML=this.getStyles()+this.renderStep(),this.attachEventListeners(),this.container}getStyles(){return`
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
    `}renderStep(){return this.currentStep===`players`?this.renderPlayersStep():this.renderHostStep()}renderPlayersStep(){return`
      <div class="screen-header">
        <button class="back-btn" data-action="back">
          ${c.ArrowLeft}
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
          ${this.players.map(e=>this.createPlayerCard(e)).join(``)}
        </div>
        
        <button class="add-player-btn" data-action="add-player">
          ${c.Plus}
          <span>Add Player</span>
        </button>
      </div>

      <div class="screen-footer">
        <button class="btn-primary" data-action="continue" ${this.players.length<2?`disabled`:``}>
          <span>Continue</span>
          ${c.ArrowRight}
        </button>
      </div>

      <!-- Add Player Modal -->
      <div class="modal-overlay" id="add-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Add Player</h3>
            <button class="modal-close" data-action="modal-close">
              ${c.X}
            </button>
          </div>
          <div class="modal-body">
            <input type="text" class="input" id="player-name-input" placeholder="Enter name" maxlength="15" autocomplete="off">
            <div class="color-picker" id="color-picker">
              ${[`#5B7FFF`,`#FF6B6B`,`#4ECDC4`,`#FFB800`,`#9B59B6`,`#E67E22`,`#2ECC71`,`#3498DB`,`#E91E63`,`#00BCD4`].map((e,t)=>`
                <button class="color-option ${t===0?`selected`:``}" 
                        data-color="${e}"
                        style="background: ${e};">
                </button>
              `).join(``)}
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-primary" data-action="confirm-add">
              Add Player
            </button>
          </div>
        </div>
      </div>
    `}renderHostStep(){return`
      <div class="screen-header">
        <button class="back-btn" data-action="back">
          ${c.ArrowLeft}
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
            ${c.Crown}
          </div>
          <div class="host-info-text">
            <div class="host-info-title">Game Night Host</div>
            <div class="host-info-desc">Can start games, manage rounds, and control prompts</div>
          </div>
        </div>

        <div class="player-grid" id="host-grid">
          ${this.players.map(e=>this.createHostCard(e)).join(``)}
        </div>
        
        <p class="tap-hint">Tap to select the host</p>
      </div>

      <div class="screen-footer">
        <button class="btn-primary" id="confirm-host-btn" disabled>
          <span>Start Game Night</span>
          ${c.Gamepad}
        </button>
      </div>
    `}createPlayerCard(e){return`
      <div class="player-card" data-player-id="${e.id}">
        <button class="player-remove" data-player-id="${e.id}">
          ${c.X}
        </button>
        <div class="player-avatar" style="background: ${e.color};">
          ${e.avatar}
        </div>
        <span class="player-name">${e.name}</span>
      </div>
    `}createHostCard(e){return`
      <div class="player-card host-candidate" data-player-id="${e.id}" data-action="select-host">
        <div class="host-badge crown-animation">
          ${c.Crown}
          <span>HOST</span>
        </div>
        <div class="player-avatar" style="background: ${e.color};">
          ${e.avatar}
        </div>
        <span class="player-name">${e.name}</span>
      </div>
    `}attachEventListeners(){this.container&&(this.currentStep===`players`?this.attachPlayersListeners():this.attachHostListeners())}attachPlayersListeners(){this.container&&(this.container.querySelector(`[data-action="back"]`)?.addEventListener(`click`,()=>{this.onBack?.()}),this.container.querySelector(`[data-action="add-player"]`)?.addEventListener(`click`,()=>{this.openAddModal()}),this.container.querySelector(`[data-action="continue"]`)?.addEventListener(`click`,()=>{this.currentStep=`host`,this.container.innerHTML=this.getStyles()+this.renderHostStep(),this.attachHostListeners()}),this.container.querySelectorAll(`.player-remove`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.getAttribute(`data-player-id`);n&&confirm(`Remove this player?`)&&(this.players=this.players.filter(e=>e.id!==n),this.storage.removePlayer(n),this.refreshPlayerGrid())})}))}attachHostListeners(){if(!this.container)return;this.container.querySelector(`[data-action="back"]`)?.addEventListener(`click`,()=>{this.currentStep=`players`,this.container.innerHTML=this.getStyles()+this.renderPlayersStep(),this.attachPlayersListeners()});let e=null;this.container.querySelectorAll(`[data-action="select-host"]`).forEach(t=>{t.addEventListener(`click`,()=>{this.container.querySelectorAll(`.player-card`).forEach(e=>e.classList.remove(`host-selected`)),t.classList.add(`host-selected`),e=t.getAttribute(`data-player-id`);let n=this.container.querySelector(`#confirm-host-btn`);n&&(n.disabled=!e)})}),this.container.querySelector(`#confirm-host-btn`)?.addEventListener(`click`,()=>{e&&(this.storage.savePlayers(this.players),localStorage.setItem(`fgn_host`,e),this.onContinue?.(this.players,e))})}openAddModal(){let e=this.container?.querySelector(`#add-modal`);if(!e)return;e.classList.add(`active`);let t=e.querySelector(`#player-name-input`);t.value=``,t.focus();let n=e.querySelectorAll(`.color-option`);n.forEach((e,t)=>{e.classList.toggle(`selected`,t===0)}),this.selectedColor=`#5B7FFF`,e.querySelector(`[data-action="modal-close"]`)?.addEventListener(`click`,()=>e.classList.remove(`active`),{once:!0}),e.addEventListener(`click`,t=>{t.target===e&&e.classList.remove(`active`)},{once:!0}),n.forEach(e=>{e.addEventListener(`click`,()=>{n.forEach(e=>e.classList.remove(`selected`)),e.classList.add(`selected`),this.selectedColor=e.getAttribute(`data-color`)||`#5B7FFF`})}),e.querySelector(`[data-action="confirm-add"]`)?.addEventListener(`click`,()=>{let n=t.value.trim();n&&(this.addPlayer(n),e.classList.remove(`active`))},{once:!0}),t.addEventListener(`keydown`,n=>{if(n.key===`Enter`){let n=t.value.trim();n&&(this.addPlayer(n),e.classList.remove(`active`))}},{once:!0})}addPlayer(e){let t=[`😀`,`😎`,`🤪`,`😇`,`🥳`,`😋`,`🤩`,`🥰`,`😺`,`🦊`,`🐱`,`🐶`,`🦁`,`🐼`,`🐨`],n={id:Date.now().toString(),name:e,color:this.selectedColor,avatar:t[Math.floor(Math.random()*t.length)]};if(this.players.push(n),this.storage.getPlayers().some(e=>e.name.trim().toLowerCase()===n.name.trim().toLowerCase())){let e=document.createElement(`div`);e.style.cssText=`position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#FF6B6B;color:#fff;padding:10px 20px;border-radius:20px;font-size:14px;z-index:9999;pointer-events:none;`,e.textContent=`"${n.name}" is already added`,document.body.appendChild(e),setTimeout(()=>e.remove(),2e3);return}this.storage.addPlayer(n),this.refreshPlayerGrid()}refreshPlayerGrid(){let e=this.container?.querySelector(`#player-grid`);e&&(e.innerHTML=this.players.map(e=>this.createPlayerCard(e)).join(``));let t=this.container?.querySelector(`[data-action="continue"]`);t&&(t.disabled=this.players.length<2),this.attachPlayersListeners()}},f=class{static games=[{id:`hot-potato`,name:`Hot Potato`,icon:`🔥`,category:`quick`,minPlayers:2,description:`Pass the phone before time runs out!`,color:`#FF6B6B`,difficulty:`easy`,duration:`2-5 min`,energy:`high`},{id:`quick-math`,name:`Quick Math`,icon:`🔢`,category:`quick`,minPlayers:1,description:`Solve math problems against the clock`,color:`#4ECDC4`,difficulty:`medium`,duration:`1-3 min`,energy:`medium`},{id:`word-scramble`,name:`Word Scramble`,icon:`🔤`,category:`quick`,minPlayers:1,description:`Unscramble letters to form words`,color:`#9B59B6`,difficulty:`medium`,duration:`1-5 min`,energy:`low`},{id:`trivia-flash`,name:`Trivia Flash`,icon:`⚡`,category:`quick`,minPlayers:1,description:`Rapid-fire trivia questions`,color:`#F39C12`,difficulty:`medium`,duration:`2-5 min`,energy:`medium`},{id:`emoji-guess`,name:`Emoji Guess`,icon:`🤔`,category:`quick`,minPlayers:1,description:`Decode the emoji puzzle`,color:`#E74C3C`,difficulty:`easy`,duration:`1-3 min`,energy:`low`},{id:`speed-tap`,name:`Speed Tap`,icon:`👆`,category:`quick`,minPlayers:1,description:`Tap as fast as you can!`,color:`#3498DB`,difficulty:`easy`,duration:`30 sec`,energy:`high`},{id:`color-match`,name:`Color Match`,icon:`🎨`,category:`quick`,minPlayers:1,description:`Match colors at lightning speed`,color:`#1ABC9C`,difficulty:`hard`,duration:`1-2 min`,energy:`high`},{id:`memory-tap`,name:`Memory Tap`,icon:`🧠`,category:`quick`,minPlayers:1,description:`Remember and tap the pattern`,color:`#8E44AD`,difficulty:`medium`,duration:`1-3 min`,energy:`medium`},{id:`reaction-test`,name:`Reaction Test`,icon:`⚡`,category:`quick`,minPlayers:1,description:`Test your reaction time`,color:`#E67E22`,difficulty:`easy`,duration:`30 sec`,energy:`medium`},{id:`button-mash`,name:`Button Mash`,icon:`🎮`,category:`quick`,minPlayers:1,description:`Mash the button as fast as possible`,color:`#2ECC71`,difficulty:`easy`,duration:`30 sec`,energy:`high`},{id:`rhythm-tap`,name:`Rhythm Tap`,icon:`🎵`,category:`quick`,minPlayers:1,description:`Tap to the beat!`,color:`#E91E63`,difficulty:`medium`,duration:`1-2 min`,energy:`high`},{id:`shape-tap`,name:`Shape Tap`,icon:`⬡`,category:`quick`,minPlayers:1,description:`Tap the correct shapes!`,color:`#00BCD4`,difficulty:`easy`,duration:`1 min`,energy:`medium`},{id:`number-sequence`,name:`Number Sequence`,icon:`🔢`,category:`quick`,minPlayers:1,description:`Complete the number pattern`,color:`#FF5722`,difficulty:`medium`,duration:`1-3 min`,energy:`low`},{id:`word-chain`,name:`Word Chain`,icon:`🔗`,category:`quick`,minPlayers:2,description:`Link words together!`,color:`#795548`,difficulty:`medium`,duration:`3-5 min`,energy:`low`},{id:`guess-the-number`,name:`Guess the Number`,icon:`🎯`,category:`quick`,minPlayers:2,description:`Guess the secret number`,color:`#607D8B`,difficulty:`easy`,duration:`2-3 min`,energy:`low`},{id:`rock-paper-scissors`,name:`Rock Paper Scissors`,icon:`✊`,category:`quick`,minPlayers:2,description:`Classic RPS tournament`,color:`#9C27B0`,difficulty:`easy`,duration:`2-5 min`,energy:`medium`},{id:`thumb-war`,name:`Thumb War`,icon:`👍`,category:`quick`,minPlayers:2,description:`Defeat your opponent with speed!`,color:`#FF9800`,difficulty:`easy`,duration:`2-3 min`,energy:`high`},{id:`ninja-clap`,name:`Ninja Clap`,icon:`🥷`,category:`quick`,minPlayers:2,description:`Blink and you lose!`,color:`#424242`,difficulty:`medium`,duration:`1-2 min`,energy:`high`},{id:`impossible-task`,name:`Impossible Task`,icon:`🤯`,category:`quick`,minPlayers:1,description:`Complete the impossible challenge`,color:`#F44336`,difficulty:`hard`,duration:`1 min`,energy:`high`},{id:`silent-scream`,name:`Silent Scream`,icon:`😱`,category:`quick`,minPlayers:1,description:`Scream silently - no sound!`,color:`#E91E63`,difficulty:`easy`,duration:`30 sec`,energy:`medium`},{id:`tongue-twister`,name:`Tongue Twister`,icon:`🗣️`,category:`quick`,minPlayers:1,description:`Say this 5 times fast!`,color:`#3F51B5`,difficulty:`hard`,duration:`1 min`,energy:`low`},{id:`stare-down`,name:`Stare Down`,icon:`👀`,category:`quick`,minPlayers:2,description:`First one to blink loses`,color:`#00BCD4`,difficulty:`easy`,duration:`1-5 min`,energy:`low`},{id:`balance-test`,name:`Balance Test`,icon:`🧍`,category:`quick`,minPlayers:1,description:`Stand on one foot!`,color:`#8BC34A`,difficulty:`medium`,duration:`1-3 min`,energy:`low`},{id:`breath-hold`,name:`Breath Hold`,icon:`🌬️`,category:`quick`,minPlayers:1,description:`Hold your breath!`,color:`#00E5FF`,difficulty:`easy`,duration:`30 sec`,energy:`low`},{id:`laughter-hold`,name:`Laughter Hold`,icon:`😂`,category:`quick`,minPlayers:2,description:`Don't laugh! Game!`,color:`#FFC107`,difficulty:`medium`,duration:`2-5 min`,energy:`high`},{id:`tickles`,name:`Tickle Battle`,icon:`🪶`,category:`quick`,minPlayers:2,description:`Tickle fight - last one laughing loses`,color:`#FF4081`,difficulty:`easy`,duration:`2-3 min`,energy:`high`},{id:`hand-slap`,name:`Hand Slap`,icon:`✋`,category:`quick`,minPlayers:2,description:`React faster than your opponent!`,color:`#7C4DFF`,difficulty:`medium`,duration:`2-5 min`,energy:`high`},{id:`finger-count`,name:`Finger Count`,icon:`🤞`,category:`quick`,minPlayers:2,description:`Count fingers faster!`,color:`#FF6E40`,difficulty:`easy`,duration:`1-2 min`,energy:`medium`},{id:`musical-silence`,name:`Musical Silence`,icon:`🤫`,category:`quick`,minPlayers:3,description:`Pass when music stops!`,color:`#9E9E9E`,difficulty:`easy`,duration:`3-5 min`,energy:`medium`},{id:`slow-motion`,name:`Slow Motion`,icon:`🐢`,category:`quick`,minPlayers:1,description:`Do everything in slow mo!`,color:`#26A69A`,difficulty:`easy`,duration:`1 min`,energy:`low`},{id:`opposite-day`,name:`Opposite Day`,icon:`🔄`,category:`quick`,minPlayers:2,description:`Do the opposite!`,color:`#AB47BC`,difficulty:`medium`,duration:`3-5 min`,energy:`medium`},{id:`freeze-frame`,name:`Freeze Frame`,icon:`🧊`,category:`quick`,minPlayers:1,description:`Hold a pose perfectly!`,color:`#4FC3F7`,difficulty:`medium`,duration:`1-2 min`,energy:`low`},{id:`mirror-game`,name:`Mirror Game`,icon:`🪞`,category:`quick`,minPlayers:2,description:`Mirror your partner perfectly!`,color:`#BA68C8`,difficulty:`medium`,duration:`2-3 min`,energy:`medium`},{id:`telepathy`,name:`Telepathy`,icon:`🔮`,category:`quick`,minPlayers:2,description:`Guess what your partner thinks!`,color:`#7E57C2`,difficulty:`hard`,duration:`3-5 min`,energy:`low`},{id:`countdown`,name:`Countdown`,icon:`⏰`,category:`quick`,minPlayers:1,description:`Count to 60 perfectly!`,color:`#5C6BC0`,difficulty:`hard`,duration:`1 min`,energy:`low`},{id:`animal-sounds`,name:`Animal Sounds`,icon:`🦁`,category:`quick`,minPlayers:2,description:`Guess the animal from sounds!`,color:`#FFCA28`,difficulty:`easy`,duration:`2-3 min`,energy:`medium`},{id:`sound-memory`,name:`Sound Memory`,icon:`🎶`,category:`quick`,minPlayers:1,description:`Remember the sound sequence!`,color:`#EF5350`,difficulty:`hard`,duration:`2-4 min`,energy:`medium`},{id:`taste-test`,name:`Taste Test`,icon:`👅`,category:`quick`,minPlayers:2,description:`Guess the mystery flavor!`,color:`#EC407A`,difficulty:`easy`,duration:`2-5 min`,energy:`low`},{id:`smell-challenge`,name:`Smell Challenge`,icon:`👃`,category:`quick`,minPlayers:2,description:`Identify the mystery smell!`,color:`#8D6E63`,difficulty:`medium`,duration:`2-3 min`,energy:`low`},{id:`texture-guess`,name:`Texture Guess`,icon:`🖐️`,category:`quick`,minPlayers:2,description:`Guess the hidden object!`,color:`#78909C`,difficulty:`easy`,duration:`2-5 min`,energy:`low`},{id:`weight-guess`,name:`Weight Guess`,icon:`⚖️`,category:`quick`,minPlayers:2,description:`Guess the weight!`,color:`#546E7A`,difficulty:`easy`,duration:`2 min`,energy:`low`},{id:`size-guess`,name:`Size Guess`,icon:`📏`,category:`quick`,minPlayers:2,description:`Estimate the size!`,color:`#29B6F6`,difficulty:`easy`,duration:`2 min`,energy:`low`},{id:`distance-guess`,name:`Distance Guess`,icon:`📍`,category:`quick`,minPlayers:2,description:`How far is it really?`,color:`#66BB6A`,difficulty:`medium`,duration:`2 min`,energy:`low`},{id:`age-guess`,name:`Age Guess`,icon:`🎂`,category:`quick`,minPlayers:2,description:`Guess their real age!`,color:`#FF7043`,difficulty:`easy`,duration:`1 min`,energy:`low`},{id:`height-guess`,name:`Height Guess`,icon:`📐`,category:`quick`,minPlayers:2,description:`Estimate their height!`,color:`#42A5F5`,difficulty:`easy`,duration:`1 min`,energy:`low`},{id:`fact-or-fiction`,name:`Fact or Fiction`,icon:`❓`,category:`quick`,minPlayers:2,description:`Is it real or made up?`,color:`#7E57C2`,difficulty:`medium`,duration:`3-5 min`,energy:`medium`},{id:`two-truths`,name:`Two Truths`,icon:`🎭`,category:`quick`,minPlayers:2,description:`Guess which is the lie!`,color:`#26C6DA`,difficulty:`medium`,duration:`3-5 min`,energy:`low`},{id:`riddle-me`,name:`Riddle Me`,icon:`🧩`,category:`quick`,minPlayers:1,description:`Solve the riddle!`,color:`#FFA726`,difficulty:`medium`,duration:`1-3 min`,energy:`low`},{id:`word-association`,name:`Word Association`,icon:`💭`,category:`quick`,minPlayers:2,description:`Fastest word link wins!`,color:`#EC407A`,difficulty:`easy`,duration:`2-5 min`,energy:`medium`},{id:`category-game`,name:`Category Game`,icon:`🏷️`,category:`quick`,minPlayers:2,description:`Name items in category!`,color:`#AB47BC`,difficulty:`easy`,duration:`2-5 min`,energy:`medium`},{id:`truth-or-dare`,name:`Truth or Dare`,icon:`🎭`,category:`party`,minPlayers:2,description:`Classic truth questions or daring tasks`,color:`#FF6B6B`,difficulty:`easy`,duration:`10-30 min`,energy:`high`},{id:`charades`,name:`Charades`,icon:`🎬`,category:`party`,minPlayers:4,description:`Act it out without words!`,color:`#4ECDC4`,difficulty:`medium`,duration:`15-30 min`,energy:`high`},{id:`pictionary`,name:`Pictionary`,icon:`🎨`,category:`party`,minPlayers:4,description:`Draw and guess!`,color:`#9B59B6`,difficulty:`medium`,duration:`15-30 min`,energy:`medium`},{id:`heads-up`,name:`Heads Up!`,icon:`🙈`,category:`party`,minPlayers:2,description:`Guess the word on your head!`,color:`#F39C12`,difficulty:`medium`,duration:`5-10 min`,energy:`medium`},{id:`never-have-i`,name:`Never Have I`,icon:`😮`,category:`party`,minPlayers:3,description:`Share wild experiences!`,color:`#E74C3C`,difficulty:`easy`,duration:`10-20 min`,energy:`medium`},{id:`would-you-rather`,name:`Would You Rather`,icon:`🤔`,category:`party`,minPlayers:2,description:`Impossible choices!`,color:`#3498DB`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`mafia`,name:`Mafia`,icon:`🐺`,category:`party`,minPlayers:6,maxPlayers:20,description:`Find the hidden wolves!`,color:`#2C3E50`,difficulty:`hard`,duration:`20-40 min`,energy:`medium`},{id:`spy-fall`,name:`Spy Fall`,icon:`🕵️`,category:`party`,minPlayers:4,maxPlayers:10,description:`Find the spy among you!`,color:`#1ABC9C`,difficulty:`medium`,duration:`10-20 min`,energy:`medium`},{id:`codenames`,name:`Codenames`,icon:`🗝️`,category:`party`,minPlayers:4,maxPlayers:8,description:`Give cryptic clues!`,color:`#8E44AD`,difficulty:`hard`,duration:`15-30 min`,energy:`low`},{id:`treasure-hunt`,name:`Treasure Hunt`,icon:`💎`,category:`party`,minPlayers:2,description:`Solve clues to find treasure!`,color:`#F1C40F`,difficulty:`medium`,duration:`20-60 min`,energy:`high`},{id:`murder-mystery`,name:`Murder Mystery`,icon:`🔪`,category:`party`,minPlayers:6,maxPlayers:12,description:`Solve the whodunit!`,color:`#C0392B`,difficulty:`hard`,duration:`30-60 min`,energy:`medium`},{id:`quiz-show`,name:`Quiz Show`,icon:`🏆`,category:`party`,minPlayers:2,description:`Be the trivia champion!`,color:`#27AE60`,difficulty:`medium`,duration:`15-30 min`,energy:`medium`},{id:`dance-off`,name:`Dance Off`,icon:`💃`,category:`party`,minPlayers:2,description:`Show your best moves!`,color:`#E91E63`,difficulty:`easy`,duration:`5-10 min`,energy:`high`},{id:`karaoke`,name:`Karaoke`,icon:`🎤`,category:`party`,minPlayers:1,description:`Sing your heart out!`,color:`#9C27B0`,difficulty:`easy`,duration:`10-30 min`,energy:`high`},{id:`limerick-game`,name:`Limerick Game`,icon:`📝`,category:`party`,minPlayers:3,description:`Create silly poems!`,color:`#FF9800`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`story-cascade`,name:`Story Cascade`,icon:`📖`,category:`party`,minPlayers:3,description:`Build a story together!`,color:`#795548`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`improv-theater`,name:`Improv Theater`,icon:`🎭`,category:`party`,minPlayers:3,description:`Yes, and...!`,color:`#607D8B`,difficulty:`hard`,duration:`10-20 min`,energy:`high`},{id:`freeze-dance`,name:`Freeze Dance`,icon:`🕺`,category:`party`,minPlayers:3,description:`Dance until the music stops!`,color:`#FF5722`,difficulty:`easy`,duration:`5-10 min`,energy:`high`},{id:`hot-seat`,name:`Hot Seat`,icon:`🔥`,category:`party`,minPlayers:3,description:`Celebrity interview!`,color:`#E53935`,difficulty:`medium`,duration:`10-20 min`,energy:`medium`},{id:`talent-show`,name:`Talent Show`,icon:`⭐`,category:`party`,minPlayers:2,description:`Show off your hidden talent!`,color:`#FFD700`,difficulty:`easy`,duration:`15-30 min`,energy:`high`},{id:`costume-contest`,name:`Costume Contest`,icon:`👔`,category:`party`,minPlayers:2,description:`Best dressed wins!`,color:`#9E9E9E`,difficulty:`easy`,duration:`5-15 min`,energy:`low`},{id:`photo-booth`,name:`Photo Booth`,icon:`📸`,category:`party`,minPlayers:2,description:`Strike a pose!`,color:`#E91E63`,difficulty:`easy`,duration:`10-20 min`,energy:`medium`},{id:`lip-sync`,name:`Lip Sync Battle`,icon:`👄`,category:`party`,minPlayers:2,description:`Best lip sync wins!`,color:`#9C27B0`,difficulty:`medium`,duration:`5-10 min`,energy:`high`},{id:`dance-freeze`,name:`Dance Freeze`,icon:`🧊`,category:`party`,minPlayers:4,description:`Freeze in position!`,color:`#00BCD4`,difficulty:`easy`,duration:`5-10 min`,energy:`high`},{id:`musical-chairs`,name:`Musical Chairs`,icon:`🪑`,category:`party`,minPlayers:4,description:`Grab a seat when music stops!`,color:`#FF6F00`,difficulty:`easy`,duration:`5-10 min`,energy:`high`},{id:`pass-the-parcel`,name:`Pass the Parcel`,icon:`📦`,category:`party`,minPlayers:4,description:`Unwrap with music!`,color:`#8BC34A`,difficulty:`easy`,duration:`10-20 min`,energy:`medium`},{id:`balloon-pop`,name:`Balloon Pop`,icon:`🎈`,category:`party`,minPlayers:2,description:`Pop for prizes!`,color:`#F44336`,difficulty:`easy`,duration:`5-10 min`,energy:`high`},{id:`pin-the-tail`,name:`Pin the Tail`,icon:`🦕`,category:`party`,minPlayers:3,description:`Blindfolded pin game!`,color:`#795548`,difficulty:`easy`,duration:`5-15 min`,energy:`medium`},{id:`sardines`,name:`Sardines`,icon:`🐟`,category:`party`,minPlayers:4,description:`Hide and seek backwards!`,color:`#607D8B`,difficulty:`medium`,duration:`15-30 min`,energy:`medium`},{id:`mass-scare`,name:`Mass Scare`,icon:`👻`,category:`party`,minPlayers:4,description:`Who can stay calm? (jumpscare game)`,color:`#37474F`,difficulty:`medium`,duration:`10-20 min`,energy:`high`},{id:`trust-fall`,name:`Trust Fall`,icon:`🤝`,category:`party`,minPlayers:2,description:`Fall and be caught!`,color:`#4CAF50`,difficulty:`easy`,duration:`5-10 min`,energy:`medium`},{id:`human-knot`,name:`Human Knot`,icon:`🔗`,category:`party`,minPlayers:6,description:`Untangle yourselves!`,color:`#FF9800`,difficulty:`medium`,duration:`10-15 min`,energy:`high`},{id:`word-telephone`,name:`Word Telephone`,icon:`📞`,category:`party`,minPlayers:5,description:`Whisper down the line!`,color:`#9C27B0`,difficulty:`easy`,duration:`5-10 min`,energy:`low`},{id:`alphabet-game`,name:`Alphabet Game`,icon:`🔤`,category:`party`,minPlayers:2,description:`Go through the alphabet!`,color:`#3F51B5`,difficulty:`easy`,duration:`5-10 min`,energy:`low`},{id:`rhyming-game`,name:`Rhyming Game`,icon:`🎵`,category:`party`,minPlayers:2,description:`Rhyming challenge!`,color:`#E91E63`,difficulty:`medium`,duration:`5-10 min`,energy:`medium`},{id:`antonyms`,name:`Antonym Game`,icon:`↔️`,category:`party`,minPlayers:2,description:`Opposites attract!`,color:`#00BCD4`,difficulty:`medium`,duration:`5-10 min`,energy:`low`},{id:`synonyms`,name:`Synonym Game`,icon:`🔄`,category:`party`,minPlayers:2,description:`Find the same meaning!`,color:`#8BC34A`,difficulty:`medium`,duration:`5-10 min`,energy:`low`},{id:`spelling-bee`,name:`Spelling Bee`,icon:`🐝`,category:`party`,minPlayers:2,description:`Spell or stumble!`,color:`#FFC107`,difficulty:`medium`,duration:`10-20 min`,energy:`medium`},{id:`puzzle-race`,name:`Puzzle Race`,icon:`🧩`,category:`party`,minPlayers:2,description:`Fastest puzzle solver!`,color:`#FF5722`,difficulty:`medium`,duration:`5-15 min`,energy:`high`},{id:`building-blocks`,name:`Building Blocks`,icon:`🏗️`,category:`party`,minPlayers:2,description:`Stack it up!`,color:`#795548`,difficulty:`easy`,duration:`5-10 min`,energy:`medium`},{id:`tower-build`,name:`Tower Build`,icon:`🗼`,category:`party`,minPlayers:2,description:`Build the tallest tower!`,color:`#9E9E9E`,difficulty:`easy`,duration:`5-15 min`,energy:`medium`},{id:`card-towers`,name:`Card Towers`,icon:`🃏`,category:`party`,minPlayers:2,description:`Build with cards!`,color:`#607D8B`,difficulty:`medium`,duration:`10-20 min`,energy:`medium`},{id:`marshmallow-drop`,name:`Marshmallow Drop`,icon:`🍡`,category:`party`,minPlayers:2,description:`Catch with chopsticks!`,color:`#FFCCBC`,difficulty:`medium`,duration:`5-10 min`,energy:`medium`},{id:`spoon-race`,name:`Spoon Race`,icon:`🥄`,category:`party`,minPlayers:4,description:`Balance and race!`,color:`#C0C0C0`,difficulty:`easy`,duration:`5-10 min`,energy:`high`},{id:`egg-spoon`,name:`Egg & Spoon Race`,icon:`🥚`,category:`party`,minPlayers:4,description:`Balance the egg!`,color:`#FFF8E1`,difficulty:`easy`,duration:`5-15 min`,energy:`high`},{id:`three-legged`,name:`Three Legged Race`,icon:`🦵`,category:`party`,minPlayers:4,description:`Run tied together!`,color:`#4CAF50`,difficulty:`easy`,duration:`5-10 min`,energy:`high`},{id:`sack-race`,name:`Sack Race`,icon:`🛒`,category:`party`,minPlayers:4,description:`Hop to victory!`,color:`#8BC34A`,difficulty:`easy`,duration:`5-15 min`,energy:`high`},{id:`relay-race`,name:`Relay Race`,icon:`🏃`,category:`party`,minPlayers:4,description:`Team relay!`,color:`#2196F3`,difficulty:`easy`,duration:`10-20 min`,energy:`high`},{id:`obstacle-course`,name:`Obstacle Course`,icon:`🏃`,category:`party`,minPlayers:2,description:`Race through obstacles!`,color:`#FF9800`,difficulty:`medium`,duration:`10-20 min`,energy:`high`},{id:`blindfold-maze`,name:`Blindfold Maze`,icon:`🧿`,category:`party`,minPlayers:3,description:`Navigate blind!`,color:`#9C27B0`,difficulty:`medium`,duration:`10-20 min`,energy:`medium`},{id:`feely-game`,name:`Feely Game`,icon:`🖐️`,category:`party`,minPlayers:3,description:`Identify blindfolded!`,color:`#795548`,difficulty:`easy`,duration:`10-15 min`,energy:`low`},{id:`guess-who`,name:`Guess Who?`,icon:`👤`,category:`party`,minPlayers:2,description:`Eliminate suspects!`,color:`#607D8B`,difficulty:`easy`,duration:`15-30 min`,energy:`low`},{id:`twenty-questions`,name:`Twenty Questions`,icon:`2️⃣`,category:`party`,minPlayers:2,description:`Guess with yes/no!`,color:`#3F51B5`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`name-that-tune`,name:`Name That Tune`,icon:`🎵`,category:`party`,minPlayers:3,description:`Identify the song!`,color:`#E91E63`,difficulty:`easy`,duration:`10-20 min`,energy:`medium`},{id:`movie-quotes`,name:`Movie Quotes`,icon:`🎬`,category:`party`,minPlayers:2,description:`Complete the quote!`,color:`#9C27B0`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`songs-forced`,name:`Songs Forced`,icon:`🎤`,category:`party`,minPlayers:2,description:`Sing assigned songs!`,color:`#FF5722`,difficulty:`medium`,duration:`10-30 min`,energy:`high`},{id:`freeze-song`,name:`Freeze Song`,icon:`⏸️`,category:`party`,minPlayers:3,description:`Stop on command!`,color:`#00BCD4`,difficulty:`easy`,duration:`5-10 min`,energy:`high`},{id:`sing-along`,name:`Sing Along`,icon:`🎶`,category:`party`,minPlayers:2,description:`Complete the lyrics!`,color:`#8BC34A`,difficulty:`easy`,duration:`10-20 min`,energy:`medium`},{id:`hum-it`,name:`Hum It`,icon:`🎵`,category:`party`,minPlayers:3,description:`Hum, don't sing!`,color:`#FFC107`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`air-instrument`,name:`Air Instrument`,icon:`🎸`,category:`party`,minPlayers:2,description:`Play invisible instrument!`,color:`#E91E63`,difficulty:`easy`,duration:`5-10 min`,energy:`medium`},{id:`commercial-challenger`,name:`Commercial Challenge`,icon:`📺`,category:`party`,minPlayers:2,description:`Create a commercial!`,color:`#2196F3`,difficulty:`medium`,duration:`10-20 min`,energy:`high`},{id:`pitch-it`,name:`Pitch It`,icon:`💼`,category:`party`,minPlayers:2,description:`Sell this random item!`,color:`#4CAF50`,difficulty:`medium`,duration:`5-15 min`,energy:`high`},{id:`news-anchor`,name:`News Anchor`,icon:`📰`,category:`party`,minPlayers:2,description:`Read breaking news!`,color:`#9E9E9E`,difficulty:`medium`,duration:`5-15 min`,energy:`medium`},{id:`weather-report`,name:`Weather Report`,icon:`🌤️`,category:`party`,minPlayers:1,description:`Be the weatherman!`,color:`#03A9F4`,difficulty:`easy`,duration:`5-10 min`,energy:`low`},{id:`sports-announce`,name:`Sports Announcer`,icon:`🏈`,category:`party`,minPlayers:2,description:`Commentate action!`,color:`#4CAF50`,difficulty:`medium`,duration:`5-10 min`,energy:`high`},{id:`interview-game`,name:`Celebrity Interview`,icon:`🎤`,category:`party`,minPlayers:3,description:`Interview the star!`,color:`#9C27B0`,difficulty:`medium`,duration:`10-20 min`,energy:`medium`},{id:`confession-booth`,name:`Confession Booth`,icon:`💬`,category:`party`,minPlayers:2,description:`Share secrets!`,color:`#607D8B`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`dream-share`,name:`Dream Share`,icon:`💭`,category:`party`,minPlayers:2,description:`Interpret dreams!`,color:`#9C27B0`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`wish-list`,name:`Wish List`,icon:`🌟`,category:`party`,minPlayers:2,description:`Desert island items!`,color:`#FFC107`,difficulty:`easy`,duration:`10-15 min`,energy:`low`},{id:`time-capsule`,name:`Time Capsule`,icon:`⏳`,category:`party`,minPlayers:2,description:`Future predictions!`,color:`#795548`,difficulty:`easy`,duration:`10-15 min`,energy:`low`},{id:`bucket-list`,name:`Bucket List`,icon:`🪣`,category:`party`,minPlayers:2,description:`Ultimate experiences!`,color:`#00BCD4`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`memory-match`,name:`Memory Match`,icon:`🧠`,category:`brain`,minPlayers:1,description:`Classic card matching`,color:`#00BCD4`,difficulty:`medium`,duration:`3-10 min`,energy:`low`},{id:`sudoku`,name:`Sudoku`,icon:`9️⃣`,category:`brain`,minPlayers:1,description:`Number puzzle challenge`,color:`#2196F3`,difficulty:`hard`,duration:`10-30 min`,energy:`low`},{id:`crossword`,name:`Crossword`,icon:`📰`,category:`brain`,minPlayers:1,description:`Word puzzle challenge`,color:`#4CAF50`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`word-search`,name:`Word Search`,icon:`🔍`,category:`brain`,minPlayers:1,description:`Find hidden words`,color:`#FF9800`,difficulty:`easy`,duration:`5-15 min`,energy:`low`},{id:`boggle`,name:`Boggle`,icon:`🎲`,category:`brain`,minPlayers:1,description:`Find words in letters`,color:`#9C27B0`,difficulty:`medium`,duration:`3-5 min`,energy:`medium`},{id:`brain-teaser`,name:`Brain Teaser`,icon:`💡`,category:`brain`,minPlayers:1,description:`Solve tricky puzzles`,color:`#FFC107`,difficulty:`hard`,duration:`1-5 min`,energy:`low`},{id:`logic-puzzle`,name:`Logic Puzzle`,icon:`🔢`,category:`brain`,minPlayers:1,description:`Deductive reasoning`,color:`#607D8B`,difficulty:`hard`,duration:`10-30 min`,energy:`low`},{id:`pattern-lock`,name:`Pattern Lock`,icon:`⬛`,category:`brain`,minPlayers:1,description:`Complete the pattern`,color:`#E91E63`,difficulty:`medium`,duration:`2-5 min`,energy:`medium`},{id:`color-sequence`,name:`Color Sequence`,icon:`🌈`,category:`brain`,minPlayers:1,description:`Remember the colors`,color:`#F44336`,difficulty:`medium`,duration:`2-5 min`,energy:`medium`},{id:`math-quest`,name:`Math Quest`,icon:`➕`,category:`brain`,minPlayers:1,description:`Math challenges`,color:`#4CAF50`,difficulty:`medium`,duration:`5-15 min`,energy:`medium`},{id:`spatial-reasoning`,name:`Spatial Reasoning`,icon:`🧊`,category:`brain`,minPlayers:1,description:`Rotate and think!`,color:`#00BCD4`,difficulty:`hard`,duration:`5-15 min`,energy:`medium`},{id:`pattern-recognition`,name:`Pattern Recognition`,icon:`🔲`,category:`brain`,minPlayers:1,description:`Find the pattern!`,color:`#9E9E9E`,difficulty:`medium`,duration:`3-10 min`,energy:`low`},{id:`lateral-thinking`,name:`Lateral Thinking`,icon:`🌀`,category:`brain`,minPlayers:2,description:`Think outside the box!`,color:`#7C4DFF`,difficulty:`hard`,duration:`10-20 min`,energy:`low`},{id:`deduction-game`,name:`Deduction Game`,icon:`🔎`,category:`brain`,minPlayers:2,description:`Find the logic!`,color:`#607D8B`,difficulty:`hard`,duration:`10-20 min`,energy:`low`},{id:`sequence-master`,name:`Sequence Master`,icon:`🔢`,category:`brain`,minPlayers:1,description:`Complete the sequence!`,color:`#FF5722`,difficulty:`medium`,duration:`3-10 min`,energy:`low`},{id:`anagram-attack`,name:`Anagram Attack`,icon:`🔤`,category:`brain`,minPlayers:1,description:`Rearrange letters!`,color:`#9C27B0`,difficulty:`medium`,duration:`3-10 min`,energy:`medium`},{id:`cryptogram`,name:`Cryptogram`,icon:`🔐`,category:`brain`,minPlayers:1,description:`Crack the code!`,color:`#3F51B5`,difficulty:`hard`,duration:`10-30 min`,energy:`low`},{id:`tower-of-hanoi`,name:`Tower of Hanoi`,icon:`🗼`,category:`brain`,minPlayers:1,description:`Move the disks!`,color:`#FF9800`,difficulty:`hard`,duration:`5-20 min`,energy:`low`},{id:`kenken`,name:`KenKen`,icon:`🧮`,category:`brain`,minPlayers:1,description:`Math and logic!`,color:`#4CAF50`,difficulty:`hard`,duration:`10-30 min`,energy:`low`},{id:`fillomino`,name:`Fillomino`,icon:`⬜`,category:`brain`,minPlayers:1,description:`Number puzzle!`,color:`#2196F3`,difficulty:`hard`,duration:`10-30 min`,energy:`low`},{id:`nonogram`,name:`Nonogram`,icon:`⬛`,category:`brain`,minPlayers:1,description:`Picture logic!`,color:`#607D8B`,difficulty:`hard`,duration:`10-30 min`,energy:`low`},{id:`tangram`,name:`Tangram`,icon:`🔺`,category:`brain`,minPlayers:1,description:`Shape puzzles!`,color:`#E91E63`,difficulty:`medium`,duration:`5-15 min`,energy:`low`},{id:`pencil-puzzle`,name:`Pencil Puzzle`,icon:`✏️`,category:`brain`,minPlayers:1,description:`Classic brain teasers!`,color:`#FFC107`,difficulty:`medium`,duration:`5-20 min`,energy:`low`},{id:`number-fill`,name:`Number Fill`,icon:`🔢`,category:`brain`,minPlayers:1,description:`Fill the grid!`,color:`#00BCD4`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`word-grid`,name:`Word Grid`,icon:`🔤`,category:`brain`,minPlayers:1,description:`Connect letters!`,color:`#9C27B0`,difficulty:`medium`,duration:`5-15 min`,energy:`medium`},{id:`maze-runner`,name:`Maze Runner`,icon:`🗺️`,category:`brain`,minPlayers:1,description:`Find the exit!`,color:`#4CAF50`,difficulty:`easy`,duration:`2-5 min`,energy:`low`},{id:`wire-puzzle`,name:`Wire Puzzle`,icon:`🔗`,category:`brain`,minPlayers:1,description:`Untangle the wires!`,color:`#FF5722`,difficulty:`medium`,duration:`5-15 min`,energy:`low`},{id:`lock-pick`,name:`Lock Pick`,icon:`🔓`,category:`brain`,minPlayers:1,description:`Crack the code!`,color:`#607D8B`,difficulty:`hard`,duration:`5-20 min`,energy:`low`},{id:`combination-lock`,name:`Combination Lock`,icon:`🔐`,category:`brain`,minPlayers:1,description:`Find the combo!`,color:`#795548`,difficulty:`medium`,duration:`3-10 min`,energy:`low`},{id:`spot-difference`,name:`Spot the Difference`,icon:`👀`,category:`brain`,minPlayers:1,description:`Find what changed!`,color:`#E91E63`,difficulty:`easy`,duration:`2-5 min`,energy:`low`},{id:`hidden-objects`,name:`Hidden Objects`,icon:`🔍`,category:`brain`,minPlayers:1,description:`Find them all!`,color:`#9C27B0`,difficulty:`easy`,duration:`3-10 min`,energy:`low`},{id:`optical-illusion`,name:`Optical Illusions`,icon:`👁️`,category:`brain`,minPlayers:1,description:`What do you see?`,color:`#3F51B5`,difficulty:`easy`,duration:`2-5 min`,energy:`low`},{id:`counting-game`,name:`Counting Game`,icon:`🔢`,category:`brain`,minPlayers:1,description:`Count carefully!`,color:`#FFC107`,difficulty:`medium`,duration:`2-5 min`,energy:`low`},{id:`estimation`,name:`Estimation`,icon:`📊`,category:`brain`,minPlayers:1,description:`Guess the count!`,color:`#00BCD4`,difficulty:`easy`,duration:`1-3 min`,energy:`low`},{id:`clock-puzzle`,name:`Clock Puzzle`,icon:`🕐`,category:`brain`,minPlayers:1,description:`Time challenges!`,color:`#607D8B`,difficulty:`medium`,duration:`3-10 min`,energy:`low`},{id:`calendar-math`,name:`Calendar Math`,icon:`📅`,category:`brain`,minPlayers:1,description:`Day calculations!`,color:`#4CAF50`,difficulty:`medium`,duration:`3-10 min`,energy:`low`},{id:`age-calc`,name:`Age Calculator`,icon:`🎂`,category:`brain`,minPlayers:1,description:`Calculate ages!`,color:`#FF9800`,difficulty:`easy`,duration:`2-5 min`,energy:`low`},{id:`probability-game`,name:`Probability Game`,icon:`🎲`,category:`brain`,minPlayers:1,description:`What are the odds?`,color:`#9C27B0`,difficulty:`medium`,duration:`5-10 min`,energy:`low`},{id:`strategy-chess`,name:`Strategy Chess`,icon:`♟️`,category:`brain`,minPlayers:2,description:`Plan and conquer!`,color:`#424242`,difficulty:`hard`,duration:`15-45 min`,energy:`low`},{id:`checkers`,name:`Checkers`,icon:`⭕`,category:`brain`,minPlayers:2,description:`Classic strategy!`,color:`#C62828`,difficulty:`medium`,duration:`10-30 min`,energy:`low`},{id:`connect-four`,name:`Connect Four`,icon:`🔵`,category:`brain`,minPlayers:2,description:`Four in a row!`,color:`#1565C0`,difficulty:`easy`,duration:`5-15 min`,energy:`medium`},{id:`tic-tac-toe`,name:`Tic Tac Toe`,icon:`❌`,category:`brain`,minPlayers:2,description:`Classic X and O!`,color:`#424242`,difficulty:`easy`,duration:`2-5 min`,energy:`low`},{id:`dots-boxes`,name:`Dots and Boxes`,icon:`⬜`,category:`brain`,minPlayers:2,description:`Draw and win!`,color:`#E91E63`,difficulty:`medium`,duration:`5-15 min`,energy:`medium`},{id:`battleship`,name:`Battleship`,icon:`🚢`,category:`brain`,minPlayers:2,description:`Sink the fleet!`,color:`#3F51B5`,difficulty:`medium`,duration:`15-30 min`,energy:`low`},{id:`hangman`,name:`Hangman`,icon:`🎭`,category:`brain`,minPlayers:2,description:`Guess the word!`,color:`#607D8B`,difficulty:`easy`,duration:`5-10 min`,energy:`low`},{id:`word-builder`,name:`Word Builder`,icon:`🧱`,category:`brain`,minPlayers:1,description:`Build words!`,color:`#4CAF50`,difficulty:`easy`,duration:`3-10 min`,energy:`medium`},{id:`letter-grid`,name:`Letter Grid`,icon:`🔤`,category:`brain`,minPlayers:1,description:`Find words!`,color:`#FF9800`,difficulty:`medium`,duration:`5-15 min`,energy:`medium`},{id:`sentence-unscramble`,name:`Sentence Scramble`,icon:`📝`,category:`brain`,minPlayers:1,description:`Unscramble sentences!`,color:`#9C27B0`,difficulty:`medium`,duration:`3-10 min`,energy:`low`},{id:`jumble-words`,name:`Word Jumble`,icon:`🔀`,category:`brain`,minPlayers:1,description:`Unjumble words!`,color:`#E91E63`,difficulty:`easy`,duration:`2-5 min`,energy:`low`},{id:`spelling-bee-pro`,name:`Spelling Pro`,icon:`🐝`,category:`brain`,minPlayers:1,description:`Advanced spelling!`,color:`#FFC107`,difficulty:`hard`,duration:`5-15 min`,energy:`medium`},{id:`vocabulary-blast`,name:`Vocabulary Blast`,icon:`💥`,category:`brain`,minPlayers:1,description:`Know your words!`,color:`#00BCD4`,difficulty:`medium`,duration:`5-15 min`,energy:`medium`},{id:`synonym-burst`,name:`Synonym Burst`,icon:`💭`,category:`brain`,minPlayers:1,description:`Find synonyms!`,color:`#8BC34A`,difficulty:`easy`,duration:`3-10 min`,energy:`low`},{id:`antonym-attack`,name:`Antonym Attack`,icon:`⚡`,category:`brain`,minPlayers:1,description:`Opposite day!`,color:`#F44336`,difficulty:`medium`,duration:`3-10 min`,energy:`medium`},{id:`homophone-hunt`,name:`Homophone Hunt`,icon:`🔊`,category:`brain`,minPlayers:1,description:`Same sound, different!`,color:`#9E9E9E`,difficulty:`medium`,duration:`5-10 min`,energy:`low`},{id:`grammar-police`,name:`Grammar Police`,icon:`👮`,category:`brain`,minPlayers:1,description:`Spot the error!`,color:`#FF5722`,difficulty:`medium`,duration:`5-15 min`,energy:`low`},{id:`punctuation-panic`,name:`Punctuation Panic`,icon:`❗`,category:`brain`,minPlayers:1,description:`Fix the sentences!`,color:`#607D8B`,difficulty:`medium`,duration:`5-10 min`,energy:`low`},{id:`capitalization`,name:`Capital Case`,icon:`🔠`,category:`brain`,minPlayers:1,description:`Capital rules!`,color:`#3F51B5`,difficulty:`easy`,duration:`3-5 min`,energy:`low`},{id:`fact-check`,name:`Fact Check`,icon:`✅`,category:`brain`,minPlayers:1,description:`True or false?`,color:`#4CAF50`,difficulty:`easy`,duration:`5-15 min`,energy:`low`},{id:`general-knowledge`,name:`General Knowledge`,icon:`📚`,category:`brain`,minPlayers:1,description:`Test your smarts!`,color:`#9C27B0`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`history-hunt`,name:`History Hunt`,icon:`📜`,category:`brain`,minPlayers:1,description:`History facts!`,color:`#795548`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`science-quiz`,name:`Science Quiz`,icon:`🔬`,category:`brain`,minPlayers:1,description:`Science facts!`,color:`#00BCD4`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`geography-genius`,name:`Geography Genius`,icon:`🌍`,category:`brain`,minPlayers:1,description:`World knowledge!`,color:`#4CAF50`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`pop-culture`,name:`Pop Culture`,icon:`🎬`,category:`brain`,minPlayers:1,description:`Movies, music, TV!`,color:`#E91E63`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`sports-trivia`,name:`Sports Trivia`,icon:`⚽`,category:`brain`,minPlayers:1,description:`Sports facts!`,color:`#4CAF50`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`food-facts`,name:`Food Facts`,icon:`🍕`,category:`brain`,minPlayers:1,description:`Culinary trivia!`,color:`#FF9800`,difficulty:`easy`,duration:`5-15 min`,energy:`low`},{id:`animal-kingdom`,name:`Animal Kingdom`,icon:`🦁`,category:`brain`,minPlayers:1,description:`Animal facts!`,color:`#FFB300`,difficulty:`easy`,duration:`5-15 min`,energy:`low`},{id:`space-explorer`,name:`Space Explorer`,icon:`🚀`,category:`brain`,minPlayers:1,description:`Space trivia!`,color:`#3F51B5`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`tech-trivia`,name:`Tech Trivia`,icon:`💻`,category:`brain`,minPlayers:1,description:`Technology facts!`,color:`#607D8B`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`emoji-pictionary`,name:`Emoji Pictionary`,icon:`🎨`,category:`creative`,minPlayers:2,description:`Draw with emojis!`,color:`#9B59B6`,difficulty:`easy`,duration:`10-20 min`,energy:`medium`},{id:`story-starter`,name:`Story Starter`,icon:`✍️`,category:`creative`,minPlayers:2,description:`Start a story!`,color:`#3498DB`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`drawing-doodle`,name:`Drawing Doodle`,icon:`🖌️`,category:`creative`,minPlayers:1,description:`Draw something random!`,color:`#E74C3C`,difficulty:`easy`,duration:`5-15 min`,energy:`medium`},{id:`color-challenge`,name:`Color Challenge`,icon:`🎨`,category:`creative`,minPlayers:1,description:`Draw with restrictions!`,color:`#1ABC9C`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`portrait-party`,name:`Portrait Party`,icon:`👤`,category:`creative`,minPlayers:2,description:`Draw each other!`,color:`#E91E63`,difficulty:`easy`,duration:`10-15 min`,energy:`low`},{id:`caption-contest`,name:`Caption Contest`,icon:`💬`,category:`creative`,minPlayers:2,description:`Write funny captions!`,color:`#FF9800`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`ad-story`,name:`Ad Story`,icon:`📺`,category:`creative`,minPlayers:2,description:`Create an ad!`,color:`#9C27B0`,difficulty:`medium`,duration:`10-20 min`,energy:`medium`},{id:`joke-factory`,name:`Joke Factory`,icon:`😄`,category:`creative`,minPlayers:1,description:`Write jokes!`,color:`#FFC107`,difficulty:`easy`,duration:`5-15 min`,energy:`low`},{id:`comic-creator`,name:`Comic Creator`,icon:`📚`,category:`creative`,minPlayers:1,description:`Make a comic!`,color:`#E91E63`,difficulty:`medium`,duration:`15-30 min`,energy:`medium`},{id:`song-lyrics`,name:`Song Lyrics`,icon:`🎵`,category:`creative`,minPlayers:2,description:`Write original lyrics!`,color:`#9C27B0`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`poetry-party`,name:`Poetry Party`,icon:`📝`,category:`creative`,minPlayers:1,description:`Write a poem!`,color:`#3F51B5`,difficulty:`medium`,duration:`10-15 min`,energy:`low`},{id:`haiku-write`,name:`Haiku Write`,icon:`🌸`,category:`creative`,minPlayers:1,description:`5-7-5 syllables!`,color:`#FFB6C1`,difficulty:`medium`,duration:`5-10 min`,energy:`low`},{id:`acrostic-name`,name:`Acrostic Names`,icon:`🔤`,category:`creative`,minPlayers:2,description:`Name poems!`,color:`#00BCD4`,difficulty:`easy`,duration:`5-10 min`,energy:`low`},{id:`sculpture-pose`,name:`Human Sculpture`,icon:`🗿`,category:`creative`,minPlayers:3,description:`Pose as statues!`,color:`#607D8B`,difficulty:`easy`,duration:`10-20 min`,energy:`medium`},{id:`sound-effects`,name:`Sound Effects`,icon:`🔊`,category:`creative`,minPlayers:2,description:`Create sound stories!`,color:`#FF5722`,difficulty:`easy`,duration:`5-10 min`,energy:`medium`},{id:`voice-actor`,name:`Voice Actor`,icon:`🎙️`,category:`creative`,minPlayers:1,description:`Different voices!`,color:`#9E9E9E`,difficulty:`easy`,duration:`5-15 min`,energy:`medium`},{id:`character-create`,name:`Character Create`,icon:`👥`,category:`creative`,minPlayers:1,description:`Design a character!`,color:`#E91E63`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`world-build`,name:`World Building`,icon:`🌍`,category:`creative`,minPlayers:1,description:`Create a world!`,color:`#4CAF50`,difficulty:`hard`,duration:`20-40 min`,energy:`low`},{id:`future-invent`,name:`Future Inventor`,icon:`💡`,category:`creative`,minPlayers:1,description:`Invent something!`,color:`#FFC107`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`recipe-create`,name:`Recipe Create`,icon:`🍳`,category:`creative`,minPlayers:2,description:`Invent a recipe!`,color:`#FF9800`,difficulty:`easy`,duration:`10-15 min`,energy:`low`},{id:`flag-design`,name:`Flag Design`,icon:`🚩`,category:`creative`,minPlayers:1,description:`Design a flag!`,color:`#F44336`,difficulty:`easy`,duration:`10-15 min`,energy:`low`},{id:`logo-design`,name:`Logo Design`,icon:`🏷️`,category:`creative`,minPlayers:1,description:`Create a logo!`,color:`#3F51B5`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`mascot-create`,name:`Mascot Create`,icon:`🎭`,category:`creative`,minPlayers:1,description:`Design a mascot!`,color:`#9C27B0`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`meme-factory`,name:`Meme Factory`,icon:`😂`,category:`creative`,minPlayers:1,description:`Create memes!`,color:`#FFC107`,difficulty:`easy`,duration:`5-15 min`,energy:`low`},{id:`superhero-create`,name:`Superhero Create`,icon:`🦸`,category:`creative`,minPlayers:1,description:`Design a hero!`,color:`#E91E63`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`villain-vision`,name:`Villain Vision`,icon:`🦹`,category:`creative`,minPlayers:1,description:`Create a villain!`,color:`#424242`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`pet-name`,name:`Pet Namer`,icon:`🐾`,category:`creative`,minPlayers:2,description:`Name pets!`,color:`#795548`,difficulty:`easy`,duration:`5-10 min`,energy:`low`},{id:`baby-name`,name:`Baby Name Game`,icon:`👶`,category:`creative`,minPlayers:2,description:`Suggest baby names!`,color:`#FFB6C1`,difficulty:`easy`,duration:`5-15 min`,energy:`low`},{id:`band-name`,name:`Band Name Generator`,icon:`🎸`,category:`creative`,minPlayers:2,description:`Name a band!`,color:`#9C27B0`,difficulty:`easy`,duration:`5-10 min`,energy:`low`},{id:`app-idea`,name:`App Idea`,icon:`📱`,category:`creative`,minPlayers:1,description:`Invent an app!`,color:`#00BCD4`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`game-concept`,name:`Game Concept`,icon:`🎮`,category:`creative`,minPlayers:1,description:`Design a game!`,color:`#4CAF50`,difficulty:`medium`,duration:`15-30 min`,energy:`low`},{id:`movie-plot`,name:`Movie Plot`,icon:`🎬`,category:`creative`,minPlayers:2,description:`Create a plot!`,color:`#E91E63`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`book-title`,name:`Book Title Game`,icon:`📖`,category:`creative`,minPlayers:2,description:`Title a book!`,color:`#795548`,difficulty:`easy`,duration:`5-15 min`,energy:`low`},{id:`travel-plan`,name:`Travel Plan`,icon:`✈️`,category:`creative`,minPlayers:2,description:`Plan a trip!`,color:`#2196F3`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`party-theme`,name:`Party Theme`,icon:`🎉`,category:`creative`,minPlayers:2,description:`Pick a theme!`,color:`#FF4081`,difficulty:`easy`,duration:`5-10 min`,energy:`low`},{id:`wedding-plan`,name:`Wedding Planner`,icon:`💒`,category:`creative`,minPlayers:2,description:`Plan a wedding!`,color:`#F8BBD9`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`business-idea`,name:`Business Idea`,icon:`💼`,category:`creative`,minPlayers:1,description:`Start a business!`,color:`#4CAF50`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`vacation-dest`,name:`Vacation Destinations`,icon:`🏝️`,category:`creative`,minPlayers:2,description:`Dream vacations!`,color:`#00BCD4`,difficulty:`easy`,duration:`10-15 min`,energy:`low`},{id:`hobby-discover`,name:`Hobby Discovery`,icon:`🎯`,category:`creative`,minPlayers:2,description:`Find new hobbies!`,color:`#FF9800`,difficulty:`easy`,duration:`10-15 min`,energy:`low`},{id:`skill-share`,name:`Skill Share`,icon:`🤹`,category:`creative`,minPlayers:2,description:`Share a skill!`,color:`#9C27B0`,difficulty:`easy`,duration:`10-20 min`,energy:`medium`},{id:`challenge-accepted`,name:`Challenge Accepted`,icon:`🏆`,category:`challenge`,minPlayers:2,description:`Accept the challenge!`,color:`#FF6B6B`,difficulty:`hard`,duration:`10-30 min`,energy:`high`},{id:`impossible-challenge`,name:`Impossible Challenge`,icon:`🤯`,category:`challenge`,minPlayers:1,description:`Do the impossible!`,color:`#E74C3C`,difficulty:`hard`,duration:`1-5 min`,energy:`high`},{id:`speed-challenge`,name:`Speed Challenge`,icon:`⚡`,category:`challenge`,minPlayers:1,description:`Race against time!`,color:`#F39C12`,difficulty:`hard`,duration:`1-5 min`,energy:`high`},{id:`endurance-test`,name:`Endurance Test`,icon:`💪`,category:`challenge`,minPlayers:1,description:`How long can you last?`,color:`#27AE60`,difficulty:`medium`,duration:`1-10 min`,energy:`high`},{id:`precision-test`,name:`Precision Test`,icon:`🎯`,category:`challenge`,minPlayers:1,description:`Be precise!`,color:`#3498DB`,difficulty:`hard`,duration:`1-5 min`,energy:`medium`},{id:`balance-challenge`,name:`Balance Challenge`,icon:`⚖️`,category:`challenge`,minPlayers:1,description:`Keep your balance!`,color:`#9B59B6`,difficulty:`medium`,duration:`1-5 min`,energy:`medium`},{id:`coordination-game`,name:`Coordination Game`,icon:`🤝`,category:`challenge`,minPlayers:2,description:`Work together!`,color:`#1ABC9C`,difficulty:`hard`,duration:`5-15 min`,energy:`high`},{id:`patience-test`,name:`Patience Test`,icon:`🧘`,category:`challenge`,minPlayers:1,description:`Be patient!`,color:`#95A5A6`,difficulty:`medium`,duration:`1-10 min`,energy:`low`},{id:`memory-stretch`,name:`Memory Stretch`,icon:`🧠`,category:`challenge`,minPlayers:1,description:`Remember more!`,color:`#8E44AD`,difficulty:`hard`,duration:`5-15 min`,energy:`medium`},{id:`focus-challenge`,name:`Focus Challenge`,icon:`🔍`,category:`challenge`,minPlayers:1,description:`Don't get distracted!`,color:`#34495E`,difficulty:`hard`,duration:`1-5 min`,energy:`low`},{id:`multi-task`,name:`Multi-Task`,icon:`🎭`,category:`challenge`,minPlayers:1,description:`Do multiple things!`,color:`#E67E22`,difficulty:`hard`,duration:`2-5 min`,energy:`high`},{id:`hide-and-seek`,name:`Hide and Seek`,icon:`🙈`,category:`challenge`,minPlayers:3,description:`Find the hiders!`,color:`#2ECC71`,difficulty:`medium`,duration:`10-30 min`,energy:`high`},{id:`tag-chase`,name:`Tag Chase`,icon:`🏃`,category:`challenge`,minPlayers:3,description:`You're it!`,color:`#E74C3C`,difficulty:`easy`,duration:`5-15 min`,energy:`high`},{id:`freeze-tag`,name:`Freeze Tag`,icon:`🧊`,category:`challenge`,minPlayers:4,description:`Freeze in place!`,color:`#00BCD4`,difficulty:`easy`,duration:`10-20 min`,energy:`high`},{id:`capture-flag`,name:`Capture the Flag`,icon:`🚩`,category:`challenge`,minPlayers:4,description:`Steal the flag!`,color:`#FF9800`,difficulty:`hard`,duration:`20-40 min`,energy:`high`},{id:`duel-master`,name:`Duel Master`,icon:`⚔️`,category:`challenge`,minPlayers:2,description:`One on one!`,color:`#795548`,difficulty:`medium`,duration:`5-15 min`,energy:`high`},{id:`trick-shot`,name:`Trick Shot`,icon:`🎯`,category:`challenge`,minPlayers:1,description:`Land the trick!`,color:`#9C27B0`,difficulty:`hard`,duration:`1-10 min`,energy:`medium`},{id:`obstacle-run`,name:`Obstacle Run`,icon:`🏃`,category:`challenge`,minPlayers:1,description:`Run the course!`,color:`#4CAF50`,difficulty:`medium`,duration:`5-15 min`,energy:`high`},{id:`plank-challenge`,name:`Plank Challenge`,icon:`💪`,category:`challenge`,minPlayers:1,description:`Hold the plank!`,color:`#607D8B`,difficulty:`medium`,duration:`1-5 min`,energy:`medium`},{id:`squat-challenge`,name:`Squat Challenge`,icon:`🏋️`,category:`challenge`,minPlayers:1,description:`How many squats?`,color:`#FF5722`,difficulty:`medium`,duration:`2-5 min`,energy:`high`},{id:`pushup-showdown`,name:`Pushup Showdown`,icon:`💪`,category:`challenge`,minPlayers:2,description:`Pushup battle!`,color:`#E91E63`,difficulty:`medium`,duration:`2-5 min`,energy:`high`},{id:`balance-beam`,name:`Balance Beam`,icon:`🤸`,category:`challenge`,minPlayers:1,description:`Walk the beam!`,color:`#00BCD4`,difficulty:`medium`,duration:`1-5 min`,energy:`medium`},{id:`one-leg-stand`,name:`One Leg Stand`,icon:`🦃`,category:`challenge`,minPlayers:1,description:`Stand on one leg!`,color:`#8BC34A`,difficulty:`easy`,duration:`1-3 min`,energy:`low`},{id:`tongue-twist-challenge`,name:`Tongue Twist Pro`,icon:`🗣️`,category:`challenge`,minPlayers:1,description:`Fast tongue!`,color:`#9C27B0`,difficulty:`hard`,duration:`1-5 min`,energy:`medium`},{id:`eye-contact`,name:`Eye Contact`,icon:`👁️`,category:`challenge`,minPlayers:2,description:`Don't look away!`,color:`#3F51B5`,difficulty:`medium`,duration:`1-10 min`,energy:`low`},{id:`sit-up-race`,name:`Sit-Up Race`,icon:`🏋️`,category:`challenge`,minPlayers:2,description:`Fastest sit-ups!`,color:`#FF9800`,difficulty:`easy`,duration:`2-5 min`,energy:`high`},{id:`jumping-jacks`,name:`Jumping Jacks`,icon:`⭐`,category:`challenge`,minPlayers:1,description:`Count the jacks!`,color:`#4CAF50`,difficulty:`easy`,duration:`1-5 min`,energy:`high`},{id:`burpee-challenge`,name:`Burpee Challenge`,icon:`💪`,category:`challenge`,minPlayers:1,description:`Burpee count!`,color:`#F44336`,difficulty:`hard`,duration:`2-10 min`,energy:`high`},{id:`wall-sit`,name:`Wall Sit`,icon:`🧱`,category:`challenge`,minPlayers:1,description:`Hold the wall sit!`,color:`#607D8B`,difficulty:`medium`,duration:`1-5 min`,energy:`medium`},{id:`finger-fight`,name:`Finger Fight`,icon:`👊`,category:`challenge`,minPlayers:2,description:`Thumb war battle!`,color:`#E91E63`,difficulty:`easy`,duration:`1-5 min`,energy:`high`},{id:`arm-wrestle`,name:`Arm Wrestle`,icon:`💪`,category:`challenge`,minPlayers:2,description:`Strength contest!`,color:`#795548`,difficulty:`easy`,duration:`1-5 min`,energy:`medium`},{id:`staring-match`,name:`Staring Match`,icon:`👀`,category:`challenge`,minPlayers:2,description:`Blink and lose!`,color:`#00BCD4`,difficulty:`easy`,duration:`1-10 min`,energy:`low`},{id:`laugh-contest`,name:`Laugh Contest`,icon:`😂`,category:`challenge`,minPlayers:2,description:`Hold your laugh!`,color:`#FFC107`,difficulty:`medium`,duration:`2-10 min`,energy:`medium`},{id:`cough-contest`,name:`Cough Contest`,icon:`😤`,category:`challenge`,minPlayers:2,description:`Don't cough! (joke game)`,color:`#9E9E9E`,difficulty:`easy`,duration:`1-5 min`,energy:`low`},{id:`yawn-contest`,name:`Yawn Contest`,icon:`😴`,category:`challenge`,minPlayers:2,description:`Fight the yawn!`,color:`#607D8B`,difficulty:`medium`,duration:`2-5 min`,energy:`low`},{id:`snack-speed`,name:`Snack Speed`,icon:`🍿`,category:`challenge`,minPlayers:1,description:`Eat fast!`,color:`#FF9800`,difficulty:`easy`,duration:`1-3 min`,energy:`high`},{id:`water-hold`,name:`Water Hold`,icon:`💧`,category:`challenge`,minPlayers:1,description:`Hold water in mouth!`,color:`#00BCD4`,difficulty:`easy`,duration:`30 sec-2 min`,energy:`low`},{id:`nutritional-trivia`,name:`Food Trivia`,icon:`🍎`,category:`challenge`,minPlayers:1,description:`Healthy eating facts!`,color:`#4CAF50`,difficulty:`easy`,duration:`5-10 min`,energy:`low`},{id:`exercise-count`,name:`Exercise Counter`,icon:`🏃`,category:`challenge`,minPlayers:1,description:`Track your moves!`,color:`#FF5722`,difficulty:`easy`,duration:`5-15 min`,energy:`high`},{id:`stretch-challenge`,name:`Stretch Challenge`,icon:`🧘`,category:`challenge`,minPlayers:1,description:`Ultimate stretch!`,color:`#9C27B0`,difficulty:`easy`,duration:`5-10 min`,energy:`low`},{id:`meditation-game`,name:`Meditation Game`,icon:`🧘`,category:`challenge`,minPlayers:1,description:`Clear your mind!`,color:`#00BCD4`,difficulty:`hard`,duration:`5-15 min`,energy:`low`},{id:`dance-freeze-pro`,name:`Dance Freeze Pro`,icon:`💃`,category:`music`,minPlayers:4,description:`Freeze on command!`,color:`#E91E63`,difficulty:`easy`,duration:`5-10 min`,energy:`high`},{id:`musical-styles`,name:`Musical Styles`,icon:`🎵`,category:`music`,minPlayers:2,description:`Dance in styles!`,color:`#9C27B0`,difficulty:`medium`,duration:`10-20 min`,energy:`high`},{id:`rhythm-battle`,name:`Rhythm Battle`,icon:`🥁`,category:`music`,minPlayers:2,description:`Keep the beat!`,color:`#FF5722`,difficulty:`medium`,duration:`5-10 min`,energy:`high`},{id:`song-association`,name:`Song Association`,icon:`🎶`,category:`music`,minPlayers:2,description:`Link songs!`,color:`#4CAF50`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`lyrics-fill`,name:`Lyrics Fill`,icon:`🎤`,category:`music`,minPlayers:2,description:`Complete the lyrics!`,color:`#2196F3`,difficulty:`medium`,duration:`10-20 min`,energy:`medium`},{id:`genre-change`,name:`Genre Change`,icon:`🔄`,category:`music`,minPlayers:2,description:`Sing in different genres!`,color:`#9C27B0`,difficulty:`hard`,duration:`5-15 min`,energy:`high`},{id:`beat-box`,name:`Beat Box Battle`,icon:`🥁`,category:`music`,minPlayers:2,description:`Make beats!`,color:`#795548`,difficulty:`hard`,duration:`5-10 min`,energy:`high`},{id:`air-guitar`,name:`Air Guitar Hero`,icon:`🎸`,category:`music`,minPlayers:1,description:`Rock out!`,color:`#E91E63`,difficulty:`easy`,duration:`2-5 min`,energy:`high`},{id:`dance-improv`,name:`Dance Improv`,icon:`🕺`,category:`music`,minPlayers:2,description:`Freestyle dance!`,color:`#FF4081`,difficulty:`medium`,duration:`5-15 min`,energy:`high`},{id:`song-emotion`,name:`Song Emotion`,icon:`🎭`,category:`music`,minPlayers:2,description:`Sing with emotion!`,color:`#3F51B5`,difficulty:`medium`,duration:`10-15 min`,energy:`medium`},{id:`music-memory`,name:`Music Memory`,icon:`🎵`,category:`music`,minPlayers:1,description:`Remember the melody!`,color:`#00BCD4`,difficulty:`medium`,duration:`5-10 min`,energy:`low`},{id:`instrument-sound`,name:`Instrument Sounds`,icon:`🎺`,category:`music`,minPlayers:2,description:`Identify instruments!`,color:`#FF9800`,difficulty:`easy`,duration:`5-10 min`,energy:`low`},{id:`concert-act`,name:`Concert Act`,icon:`🎤`,category:`music`,minPlayers:1,description:`Perform a concert!`,color:`#9C27B0`,difficulty:`medium`,duration:`5-15 min`,energy:`high`},{id:`dance-charades`,name:`Dance Charades`,icon:`💃`,category:`music`,minPlayers:4,description:`Dance to songs!`,color:`#E91E63`,difficulty:`medium`,duration:`10-20 min`,energy:`high`},{id:`music-trivia-pro`,name:`Music Trivia Pro`,icon:`🎵`,category:`music`,minPlayers:2,description:`Music knowledge!`,color:`#607D8B`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`song-decoder`,name:`Song Decoder`,icon:`🔓`,category:`music`,minPlayers:2,description:`Guess from clues!`,color:`#4CAF50`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`melody-catch`,name:`Melody Catch`,icon:`🎶`,category:`music`,minPlayers:2,description:`Hum and guess!`,color:`#9C27B0`,difficulty:`medium`,duration:`5-10 min`,energy:`medium`},{id:`dance-off-battle`,name:`Dance Off Battle`,icon:`🏆`,category:`music`,minPlayers:2,description:`Best dancer wins!`,color:`#FFD700`,difficulty:`medium`,duration:`10-20 min`,energy:`high`},{id:`song-genre-bingo`,name:`Genre Bingo`,icon:`🎱`,category:`music`,minPlayers:4,description:`Bingo with genres!`,color:`#E91E63`,difficulty:`easy`,duration:`10-20 min`,energy:`medium`},{id:`music-mafia`,name:`Music Mafia`,icon:`🎵`,category:`music`,minPlayers:6,description:`Musical version of mafia!`,color:`#424242`,difficulty:`hard`,duration:`20-30 min`,energy:`medium`},{id:`silent-disco`,name:`Silent Disco`,icon:`🎧`,category:`music`,minPlayers:4,description:`Dance with headphones!`,color:`#9C27B0`,difficulty:`easy`,duration:`15-30 min`,energy:`high`},{id:`music-statues`,name:`Music Statues`,icon:`🗿`,category:`music`,minPlayers:4,description:`Freeze to music!`,color:`#607D8B`,difficulty:`easy`,duration:`5-15 min`,energy:`high`},{id:`battle-rap`,name:`Battle Rap`,icon:`🎤`,category:`music`,minPlayers:2,description:`Freestyle rap!`,color:`#FF5722`,difficulty:`hard`,duration:`5-15 min`,energy:`high`},{id:`song-origins`,name:`Song Origins`,icon:`🌍`,category:`music`,minPlayers:1,description:`Know the artist!`,color:`#00BCD4`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`playlist-showdown`,name:`Playlist Showdown`,icon:`📋`,category:`music`,minPlayers:2,description:`Compare playlists!`,color:`#E91E63`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`dessert-roulette`,name:`Dessert Roulette`,icon:`🍰`,category:`social`,minPlayers:2,description:`Random dessert dare!`,color:`#FF4081`,difficulty:`easy`,duration:`5-15 min`,energy:`medium`},{id:`most-likely`,name:`Most Likely To`,icon:`👆`,category:`social`,minPlayers:3,description:`Who is most likely to...?`,color:`#9C27B0`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`question-game`,name:`Question Game`,icon:`❓`,category:`social`,minPlayers:2,description:`Ask anything!`,color:`#3F51B5`,difficulty:`easy`,duration:`10-30 min`,energy:`low`},{id:`hot-seat-interview`,name:`Hot Seat Interview`,icon:`🎤`,category:`social`,minPlayers:3,description:`Interview someone!`,color:`#FF9800`,difficulty:`easy`,duration:`10-20 min`,energy:`medium`},{id:`speed-friending`,name:`Speed Friending`,icon:`👥`,category:`social`,minPlayers:4,description:`Quick conversations!`,color:`#4CAF50`,difficulty:`easy`,duration:`10-20 min`,energy:`medium`},{id:`get-to-know`,name:`Get to Know`,icon:`💬`,category:`social`,minPlayers:2,description:`Learn new things!`,color:`#00BCD4`,difficulty:`easy`,duration:`15-30 min`,energy:`low`},{id:`life-story`,name:`Life Story`,icon:`📖`,category:`social`,minPlayers:2,description:`Share your story!`,color:`#795548`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`bucket-list-share`,name:`Bucket List Share`,icon:`🎯`,category:`social`,minPlayers:2,description:`Share dreams!`,color:`#9C27B0`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`childhood-memory`,name:`Childhood Memories`,icon:`👶`,category:`social`,minPlayers:2,description:`Nostalgia time!`,color:`#FFB6C1`,difficulty:`easy`,duration:`15-30 min`,energy:`low`},{id:`travel-stories`,name:`Travel Stories`,icon:`✈️`,category:`social`,minPlayers:2,description:`Share adventures!`,color:`#2196F3`,difficulty:`easy`,duration:`15-30 min`,energy:`low`},{id:`food-memory`,name:`Food Memories`,icon:`🍕`,category:`social`,minPlayers:2,description:`Favorite foods!`,color:`#FF9800`,difficulty:`easy`,duration:`10-15 min`,energy:`low`},{id:`movie-moment`,name:`Movie Moments`,icon:`🎬`,category:`social`,minPlayers:2,description:`Favorite movie scenes!`,color:`#E91E63`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`book-favorites`,name:`Book Favorites`,icon:`📚`,category:`social`,minPlayers:2,description:`Book recommendations!`,color:`#795548`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`music-favorites`,name:`Music Favorites`,icon:`🎵`,category:`social`,minPlayers:2,description:`Share playlists!`,color:`#9C27B0`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`pet-stories`,name:`Pet Stories`,icon:`🐾`,category:`social`,minPlayers:2,description:`Tell pet tales!`,color:`#795548`,difficulty:`easy`,duration:`10-15 min`,energy:`low`},{id:`embarrassing-moments`,name:`Embarrassing Moments`,icon:`😳`,category:`social`,minPlayers:2,description:`Share laughs!`,color:`#E91E63`,difficulty:`easy`,duration:`10-20 min`,energy:`medium`},{id:`proud-moments`,name:`Proud Moments`,icon:`🏆`,category:`social`,minPlayers:2,description:`Share achievements!`,color:`#FFC107`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`regrets-game`,name:`Regrets Game`,icon:`😔`,category:`social`,minPlayers:2,description:`What would you change?`,color:`#607D8B`,difficulty:`medium`,duration:`10-20 min`,energy:`low`},{id:`superpower-talk`,name:`Superpower Talk`,icon:`⚡`,category:`social`,minPlayers:2,description:`If you had powers...`,color:`#9C27B0`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`time-travel`,name:`Time Travel`,icon:`⏰`,category:`social`,minPlayers:2,description:`Visit any era!`,color:`#3F51B5`,difficulty:`easy`,duration:`15-30 min`,energy:`low`},{id:`zombie-apocalypse`,name:`Zombie Apocalypse`,icon:`🧟`,category:`social`,minPlayers:2,description:`Survive the zombie apocalypse!`,color:`#4CAF50`,difficulty:`medium`,duration:`15-30 min`,energy:`medium`},{id:`desert-island`,name:`Desert Island`,icon:`🏝️`,category:`social`,minPlayers:2,description:`Stranded together!`,color:`#00BCD4`,difficulty:`easy`,duration:`15-30 min`,energy:`low`},{id:`first-date`,name:`First Date`,icon:`💑`,category:`social`,minPlayers:2,description:`Roleplay first date!`,color:`#E91E63`,difficulty:`medium`,duration:`10-20 min`,energy:`medium`},{id:`intergalactic`,name:`Intergalactic Travel`,icon:`🚀`,category:`social`,minPlayers:2,description:`Space adventures!`,color:`#3F51B5`,difficulty:`easy`,duration:`15-30 min`,energy:`low`},{id:`undercover-agent`,name:`Undercover Agent`,icon:`🕵️`,category:`social`,minPlayers:2,description:`Secret missions!`,color:`#424242`,difficulty:`medium`,duration:`15-30 min`,energy:`medium`},{id:`alternate-universe`,name:`Alternate Universe`,icon:`🌌`,category:`social`,minPlayers:2,description:`What if...?`,color:`#9C27B0`,difficulty:`easy`,duration:`15-30 min`,energy:`low`},{id:`dream-job`,name:`Dream Job`,icon:`💼`,category:`social`,minPlayers:2,description:`理想工作!`,color:`#4CAF50`,difficulty:`easy`,duration:`10-15 min`,energy:`low`},{id:`fantasy-world`,name:`Fantasy World`,icon:`🏰`,category:`social`,minPlayers:2,description:`Create a fantasy world!`,color:`#795548`,difficulty:`medium`,duration:`15-30 min`,energy:`low`},{id:`superhero-life`,name:`Superhero Life`,icon:`🦸`,category:`social`,minPlayers:2,description:`Living as a hero!`,color:`#E91E63`,difficulty:`easy`,duration:`10-20 min`,energy:`medium`},{id:`haunted-house`,name:`Haunted House`,icon:`👻`,category:`social`,minPlayers:2,description:`Survive the night!`,color:`#37474F`,difficulty:`medium`,duration:`15-30 min`,energy:`high`},{id:`mystery-dinner`,name:`Mystery Dinner`,icon:`🍽️`,category:`social`,minPlayers:4,description:`Dinner party mystery!`,color:`#607D8B`,difficulty:`hard`,duration:`30-60 min`,energy:`medium`},{id:`life-advice`,name:`Life Advice`,icon:`💡`,category:`social`,minPlayers:2,description:`Give advice!`,color:`#FFC107`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`future-prediction`,name:`Future Predictions`,icon:`🔮`,category:`social`,minPlayers:2,description:`Predict the future!`,color:`#9C27B0`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`philosophy-chat`,name:`Philosophy Chat`,icon:`🤔`,category:`social`,minPlayers:2,description:`Deep thoughts!`,color:`#3F51B5`,difficulty:`medium`,duration:`15-30 min`,energy:`low`},{id:`culture-share`,name:`Culture Share`,icon:`🌍`,category:`social`,minPlayers:2,description:`Share cultures!`,color:`#FF9800`,difficulty:`easy`,duration:`15-30 min`,energy:`low`},{id:`language-lesson`,name:`Language Lesson`,icon:`🗣️`,category:`social`,minPlayers:2,description:`Teach phrases!`,color:`#00BCD4`,difficulty:`easy`,duration:`10-20 min`,energy:`medium`},{id:`tradition-share`,name:`Tradition Share`,icon:`🎊`,category:`social`,minPlayers:2,description:`Share traditions!`,color:`#E91E63`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`recipe-exchange`,name:`Recipe Exchange`,icon:`🍳`,category:`social`,minPlayers:2,description:`Share recipes!`,color:`#FF9800`,difficulty:`easy`,duration:`10-20 min`,energy:`low`},{id:`hobby-showcase`,name:`Hobby Showcase`,icon:`🎯`,category:`social`,minPlayers:2,description:`Show hobbies!`,color:`#4CAF50`,difficulty:`easy`,duration:`15-30 min`,energy:`medium`},{id:`skill-swap`,name:`Skill Swap`,icon:`🔄`,category:`social`,minPlayers:2,description:`Teach and learn!`,color:`#9C27B0`,difficulty:`medium`,duration:`15-30 min`,energy:`medium`}];static getGameById(e){return this.games.find(t=>t.id===e)}static getGamesByCategory(e){return e===`all`?this.games:this.games.filter(t=>t.category===e)}static getCategories(){return[{id:`all`,name:`All Games`,icon:`🎮`},{id:`quick`,name:`Quick Play`,icon:`⚡`},{id:`party`,name:`Party`,icon:`🎉`},{id:`brain`,name:`Brain Games`,icon:`🧠`},{id:`creative`,name:`Creative`,icon:`🎨`},{id:`challenge`,name:`Challenges`,icon:`🏆`},{id:`music`,name:`Music & Dance`,icon:`🎵`},{id:`social`,name:`Social & Talk`,icon:`💬`}]}static getRandomGame(){return this.games[Math.floor(Math.random()*this.games.length)]}static getRandomGameFromCategory(e){let t=this.getGamesByCategory(e);if(t.length!==0)return t[Math.floor(Math.random()*t.length)]}static getTotalGameCount(){return this.games.length}static searchGames(e){let t=e.toLowerCase();return this.games.filter(e=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t))}},p={"hot-potato":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="14" rx="7" ry="5.5" fill="currentColor" opacity="0.15"/><path d="M12 2c-1 2-3 3-2 6s3 4 2 7c2-1 4-4 3-7s-1-4-1-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M8 5c-.5 1.5-1.5 2-1 4s2 3 1.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.6"/><path d="M16 5c.5 1.5 1.5 2 1 4s-2 3-1.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.6"/><ellipse cx="12" cy="18" rx="5" ry="3" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,"quick-math":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 8h8M12 6v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 16h3m5 0h-3m0 0v-2m0 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,"word-scramble":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="6" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><rect x="9" y="6" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><rect x="16" y="6" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><text x="5" y="13" font-size="5" fill="currentColor" font-weight="bold" text-anchor="middle">W</text><text x="12" y="13" font-size="5" fill="currentColor" font-weight="bold" text-anchor="middle">O</text><text x="19" y="13" font-size="5" fill="currentColor" font-weight="bold" text-anchor="middle">R</text><path d="M4 16l3 3-3 3M20 16l-3 3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 19h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"trivia-flash":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="currentColor" opacity="0.15"/><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,"emoji-guess":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><circle cx="9" cy="10" r="1.2" fill="currentColor"/><circle cx="15" cy="10" r="1.2" fill="currentColor"/><path d="M8 15s1.5 2.5 4 2.5 4-2.5 4-2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M17 5l2-2M7 5L5 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"speed-tap":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 4v8l-3 3v3h12v-3l-3-3V4a3 3 0 0 0-6 0z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="currentColor" opacity="0.1"/><circle cx="12" cy="4" r="1" fill="currentColor"/><path d="M6 20h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,"color-match":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.3"/><circle cx="16" cy="8" r="5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/><circle cx="12" cy="15" r="5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/></svg>`,"memory-tap":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.3"/><rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/></svg>`,"reaction-test":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 3v1M21 12h-1M12 21v-1M3 12h1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,"button-mash":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="6" width="20" height="12" rx="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><circle cx="7" cy="12" r="2" fill="currentColor" opacity="0.4"/><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="17" cy="12" r="2" fill="currentColor" opacity="0.4"/><path d="M7 8v1M17 8v1M7 15v1M17 15v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"rhythm-tap":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h3l3-8 3 16 3-10 3 5 3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"shape-tap":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="12,3 22,21 2,21" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/><rect x="13" y="5" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="6" cy="9" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,"number-sequence":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="8" width="4" height="8" rx="1" fill="currentColor" opacity="0.3"/><rect x="8" y="5" width="4" height="11" rx="1" fill="currentColor" opacity="0.5"/><rect x="14" y="2" width="4" height="14" rx="1" fill="currentColor" opacity="0.7"/><rect x="20" y="11" width="2" height="2" rx="1" fill="currentColor" stroke="currentColor" stroke-width="1"/><path d="M2 20h20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"word-chain":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="12" r="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><circle cx="19" cy="12" r="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><path d="M8 12h1M15 12h1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,"guess-the-number":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M12 8v1a3 3 0 0 1 0 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>`,"rock-paper-scissors":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 11V6a2 2 0 0 1 4 0v3M11 9V5a2 2 0 0 1 4 0v4M15 9V6a2 2 0 0 1 4 0v8a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-3a2 2 0 0 1 4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"thumb-war":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10V7a1 1 0 0 1 2 0v3M9 9V6a1 1 0 0 1 2 0v3M11 9V7a1 1 0 0 1 2 0v2M13 9a1 1 0 0 1 2 0v1M7 10v4a4 4 0 0 0 8 0v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M5 15a7 7 0 0 0 14 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>`,"ninja-clap":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l4-8 4 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 9l-3 5h18l-3-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/><rect x="3" y="17" width="18" height="3" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>`,"impossible-task":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,"silent-scream":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/><ellipse cx="12" cy="15" rx="3" ry="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M18 4l3-3M20 7l3-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,"tongue-twister":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="11" r="8" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M8 14s2 3 4 3 4-3 4-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9.5 9.5c1-1.5 4-1.5 5 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 14v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"stare-down":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.3"/><circle cx="11" cy="11" r="1" fill="currentColor"/></svg>`,"balance-test":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="4" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v6l-4 5M12 12l4 5M8 21h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 12h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,"breath-hold":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-4 0-8 4-8 9s4 9 8 9 8-4 8-9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 3c2 3 4 5 8 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>`,"laughter-hold":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M8 15s1.5 3 4 3 4-3 4-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M9 9h.01M15 9h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5 8l2 1M19 8l-2 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,tickles:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c1.5 0 3 .5 4 1.5M16 4.5c1 1 1.5 2.5 1.5 4M5 12c0-1.5.5-3 1.5-4M6.5 8c1-1 2.5-1.5 4-1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M10 13s1 1.5 2 1.5 2-1.5 2-1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"hand-slap":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 7v10M12 5v12M15 7v10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6 12h12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M3 17l3-3 3 3M15 17l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/></svg>`,"finger-count":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 14V8M10 14V6M12 14V8M14 14V10M16 14v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6 14h12v3a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-3z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/></svg>`,"musical-silence":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="1.5"/><line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/></svg>`,"slow-motion":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M3 3l4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,"opposite-day":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 16l-4-4 4-4M17 8l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 12h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"freeze-frame":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="4" height="16" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><rect x="14" y="4" width="4" height="16" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/></svg>`,"mirror-game":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="8" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="8" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 20v-4a2.5 2.5 0 0 1 5 0v4M14.5 20v-4a2.5 2.5 0 0 1 5 0v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 3v18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 2"/></svg>`,telepathy:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M6 10l-3-3M6 14l-3 3M18 10l3-3M18 14l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,countdown:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="13" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 9v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 2h6M12 2v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"animal-sounds":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 8a4 4 0 0 1-8 0c0-3 2-5 4-6 2 1 4 3 4 6z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/><path d="M8 8c-2 0-4 2-3 5 0 0 1 2 3 2M16 8c2 0 4 2 3 5 0 0-1 2-3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 15v2a3 3 0 0 0 6 0v-2" stroke="currentColor" stroke-width="1.5"/><path d="M12 3v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"sound-memory":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="20" cy="5" r="2" fill="currentColor" stroke="currentColor" stroke-width="1"/></svg>`,"taste-test":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-4 4-6 8-4 13 1 3 4 5 7 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 3c4 4 6 8 4 13-1 3-4 5-7 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 3v5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="10" r="2" fill="currentColor" opacity="0.4"/></svg>`,"smell-challenge":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/><path d="M12 9c0-3-2-5-2-5s2 0 4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 7c-1-2-3-2-3-2s0 2 2 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M16 7c1-2 3-2 3-2s0 2-2 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"texture-guess":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"weight-guess":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9a6 6 0 0 1 12 0" stroke="currentColor" stroke-width="1.5"/><path d="M3 9h18M3 13h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="9" y="9" width="6" height="4" fill="currentColor" opacity="0.3"/><path d="M12 13v6M9 19h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"size-guess":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h18M3 17h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 7v10M21 7v10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M7 12h10M7 12l2-2M7 12l2 2M17 12l-2-2M17 12l-2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"distance-guess":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="12" r="2" fill="currentColor" opacity="0.5"/><circle cx="19" cy="12" r="2" fill="currentColor" opacity="0.5"/><path d="M7 12h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 2"/><path d="M5 8l-3 4 3 4M19 8l3 4-3 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"age-guess":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,"height-guess":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18M4 3h4M4 21h4M16 3h4M16 21h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 12h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 2"/><path d="M8 6l4-3 4 3M8 18l4 3 4-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/></svg>`,"fact-or-fiction":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" stroke-width="1.5"/><path d="M15 3l6 6M15 9l6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,"two-truths":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 11l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 17l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.2"/></svg>`,"riddle-me":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M12 8a2 2 0 0 1 2 2c0 1.5-2 2-2 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="16" r="1" fill="currentColor"/></svg>`,"word-association":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="8" r="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><circle cx="17" cy="8" r="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><circle cx="12" cy="17" r="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><path d="M9.5 9.5l3 5M14.5 9.5l-3 5M10 8h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"category-game":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="8" height="5" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><rect x="13" y="3" width="8" height="5" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><rect x="3" y="11" width="8" height="5" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><rect x="13" y="11" width="8" height="5" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><path d="M5 19h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"truth-or-dare":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 19l10-14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,charades:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="5" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v5M9 11l-3 4M15 11l3 4M9 21h6M12 13v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M5 7l2 2M19 7l-2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,pictionary:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M3 21h7M14 21h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M7 13l3-6 3 4 2-3 3 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="8" r="1.5" fill="currentColor" opacity="0.4"/></svg>`,"heads-up":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M9 7h6M9 11h6M9 15h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="17" cy="16" r="1" fill="currentColor" opacity="0.4"/></svg>`,"never-have-i":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"would-you-rather":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18M3 12h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M5 5l4 4M19 5l-4 4M5 19l4-4M19 19l-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,mafia:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M6 20a6 6 0 0 1 12 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 3l18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><circle cx="12" cy="8" r="1.5" fill="currentColor" opacity="0.2"/></svg>`,"spy-fall":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M8 14a6 6 0 0 0-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M16 14a6 6 0 0 1 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 11l-4 7h14l-4-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/><circle cx="19" cy="5" r="2.5" fill="currentColor" opacity="0.3" stroke="currentColor" stroke-width="1"/></svg>`,codenames:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="4" height="4" rx="1" fill="currentColor" opacity="0.5"/><rect x="7" y="4" width="4" height="4" rx="1" fill="currentColor" opacity="0.2"/><rect x="12" y="4" width="4" height="4" rx="1" fill="currentColor" opacity="0.4"/><rect x="17" y="4" width="4" height="4" rx="1" fill="currentColor" opacity="0.1"/><rect x="2" y="10" width="4" height="4" rx="1" fill="currentColor" opacity="0.1"/><rect x="7" y="10" width="4" height="4" rx="1" fill="currentColor" opacity="0.3"/><rect x="12" y="10" width="4" height="4" rx="1" fill="currentColor" opacity="0.5"/><rect x="17" y="10" width="4" height="4" rx="1" fill="currentColor" opacity="0.2"/><rect x="2" y="16" width="4" height="4" rx="1" fill="currentColor" opacity="0.3"/><rect x="7" y="16" width="4" height="4" rx="1" fill="currentColor" opacity="0.5"/><rect x="12" y="16" width="4" height="4" rx="1" fill="currentColor" opacity="0.1"/><rect x="17" y="16" width="4" height="4" rx="1" fill="currentColor" opacity="0.4"/></svg>`,"treasure-hunt":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 11l3-8 3 8M5 21l7-10 7 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 21h20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.3"/></svg>`,"murder-mystery":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 1 0 4 10.47V14h3v3h3v-6.5A6 6 0 0 0 10 2z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><circle cx="10" cy="8" r="1.5" fill="currentColor"/><path d="M3 21l5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,"quiz-show":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"dance-off":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="4" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="15" cy="4" r="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M6 8l3 3-2 5M18 8l-3 3 2 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 21l2-4M17 21l-2-4M9 11l6 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,karaoke:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M16 6l2-2M16 10l3 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>`,"limerick-game":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 10h12M4 14h16M4 18h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M18 15l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"story-cascade":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h3M9 6h3M14 6h3M19 6h1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 10h8M14 10h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 14h4M10 14h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 18h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,"improv-theater":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 19c0-3.87 3.58-7 8-7s8 3.13 8 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M18 19c0-2.21 1.79-4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/><circle cx="10" cy="7" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M8 9s1 1.5 2 1.5 2-1.5 2-1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"freeze-dance":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18M3 12h18M5.64 5.64l12.72 12.72M18.36 5.64 5.64 18.36" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.2"/></svg>`,"hot-seat":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 11V6a3 3 0 0 1 6 0v5M13 11V7a3 3 0 0 1 6 0v4M3 11h18v2a7 7 0 0 1-7 7H10a7 7 0 0 1-7-7v-2z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M9 20v2M15 20v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"talent-show":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/></svg>`,"costume-contest":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M9 4l3 2 3-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"photo-booth":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="13" r="1.5" fill="currentColor" opacity="0.4"/></svg>`,"lip-sync":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" stroke-width="1.5"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 19v4M8 23h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 7s1.5 2 4 2 4-2 4-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"dance-freeze":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="4" height="16" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><rect x="14" y="4" width="4" height="16" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><path d="M3 8l2 2-2 2M21 8l-2 2 2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/></svg>`,"musical-chairs":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 10h16v3H4zM6 13v5M18 13v5M4 18h4M16 18h4M7 10V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="currentColor" opacity="0.1"/></svg>`,"pass-the-parcel":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6M22 7H2v5h20V7zM12 22V7M12 7s-3-3-5-3H2M12 7s3-3 5-3h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="currentColor" opacity="0.1"/></svg>`,"balloon-pop":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c-4 0-7 3-7 7 0 4.5 3.5 7 7 7s7-2.5 7-7c0-4-3-7-7-7z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><path d="M12 16l-1 5M11 21c1 1 2 1 2 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M16 5l3-3M8 5L5 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,sardines:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12c0-5 9-9 18-5-9 4-9 10 0 14-9 4-18 0-18-9z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><circle cx="18" cy="10" r="1.5" fill="currentColor"/><path d="M18 10l-8 3-4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"mass-scare":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" opacity="0.1"/><path d="M9 14s1.5 2 3 2 3-2 3-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"trust-fall":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="4" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 12l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 19h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,"human-knot":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c-4-2-6-8-2-10 2 4 8 2 8 6-4 0-6 4-2 8-4 0-8-2-6-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,"word-telephone":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" opacity="0.1"/></svg>`,"alphabet-game":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7l4 10M4 7h4L12 17M20 7l-4 10M20 7h-4L12 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 13h4M14 13h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"rhyming-game":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M6 9l6-1M6 13l6-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>`,"spelling-bee":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L8 8H4l3 3-1 5 6-3 6 3-1-5 3-3h-4L12 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="currentColor" opacity="0.15"/><circle cx="12" cy="10" r="1.5" fill="currentColor"/></svg>`,"puzzle-race":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2H3v10h3v-3a2 2 0 0 1 4 0v3h3V2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="currentColor" opacity="0.1"/><path d="M13 12h-3v3a2 2 0 0 1-4 0v-3H3v10h10V12z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="currentColor" opacity="0.1"/><path d="M21 2h-8v5h2a2 2 0 0 1 0 4h-2v5h8V2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="currentColor" opacity="0.15"/></svg>`,"guess-who":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 8c0-2 1.5-3 3-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/><circle cx="12" cy="14" r="1" fill="currentColor" opacity="0.4"/></svg>`,"twenty-questions":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 3-3 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>`,"movie-quotes":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="2.18" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M17 7h5M2 17h5M17 17h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"name-that-tune":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M3 10l18-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"memory-match":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.3"/><rect x="13" y="2" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><rect x="2" y="13" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><rect x="13" y="13" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.3"/><path d="M6.5 6.5h.01M17.5 17.5h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,"brain-teaser":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/></svg>`,"logic-puzzle":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M14 17.5h4M16 15.5v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,"lateral-thinking":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5.64 5.64l2.83 2.83M15.54 15.54l2.83 2.83M5.64 18.36l2.83-2.83M15.54 8.46l2.83-2.83" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"deduction-game":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M21 21l-5.2-5.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 10h6M10 7v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"anagram-attack":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="5" height="10" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><rect x="9.5" y="7" width="5" height="10" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/><rect x="17" y="7" width="5" height="10" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><path d="M4 3l3 4M20 3l-3 4M4 21l3-4M20 21l-3-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,"maze-runner":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18v18H3V3z" stroke="currentColor" stroke-width="1.5"/><path d="M7 3v4H3M7 7h8M15 7v4h4M7 11v4M7 15h8M15 15v4M3 15h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"tic-tac-toe":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2v20M16 2v20M2 8h20M2 16h20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M5 5l2 2M7 5L5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M17 17l2 2M19 17l-2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"connect-four":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><circle cx="6" cy="9" r="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.3"/><circle cx="12" cy="9" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="9" r="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.3"/><circle cx="6" cy="15" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="15" r="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.3"/><circle cx="18" cy="15" r="2" stroke="currentColor" stroke-width="1.5"/></svg>`,hangman:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2h12M6 2v20M14 2v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="14" cy="9" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M14 11.5v4M11.5 14h5M12 18l-1.5 3M16 18l1.5 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,battleship:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 14l3-8h12l3 8H3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="currentColor" opacity="0.15"/><path d="M2 14h20v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M12 6V3M9 4h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M7 14v3M12 14v3M17 14v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>`,"dots-boxes":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="1.5" fill="currentColor"/><circle cx="12" cy="4" r="1.5" fill="currentColor"/><circle cx="20" cy="4" r="1.5" fill="currentColor"/><circle cx="4" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="20" cy="12" r="1.5" fill="currentColor"/><circle cx="4" cy="20" r="1.5" fill="currentColor"/><circle cx="12" cy="20" r="1.5" fill="currentColor"/><circle cx="20" cy="20" r="1.5" fill="currentColor"/><path d="M4 4h8M4 12h8M12 4v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="4" y="4" width="8" height="8" fill="currentColor" opacity="0.1"/></svg>`,"strategy-chess":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 4h2M9 4h6M9 4v3l-2 4h10l-2-4V4M7 11h10M7 11l-1 4h12l-1-4M6 15h12M5 18h14M5 18v2h14v-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" opacity="0.1"/></svg>`,checkers:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="2" width="5" height="5" fill="currentColor" opacity="0.2"/><rect x="12" y="2" width="5" height="5" fill="currentColor" opacity="0.2"/><rect x="7" y="7" width="5" height="5" fill="currentColor" opacity="0.2"/><rect x="17" y="7" width="5" height="5" fill="currentColor" opacity="0.2"/><circle cx="9.5" cy="9.5" r="2.5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.4"/><circle cx="14.5" cy="14.5" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>`,"word-search":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.05"/><path d="M6 6h12M6 10h12M6 14h8M6 18h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="17" cy="16" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M19.5 18.5l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,crossword:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="4" height="4" rx=".5" fill="currentColor" opacity="0.3"/><rect x="7" y="2" width="4" height="4" rx=".5" fill="currentColor" opacity="0.3"/><rect x="12" y="2" width="4" height="4" rx=".5" fill="currentColor" opacity="0.3"/><rect x="2" y="7" width="4" height="4" rx=".5" fill="currentColor" opacity="0.3"/><rect x="17" y="2" width="5" height="5" rx=".5" fill="currentColor" stroke="currentColor" stroke-width="1"/><rect x="12" y="7" width="4" height="4" rx=".5" fill="currentColor" opacity="0.3"/><rect x="2" y="12" width="4" height="4" rx=".5" fill="currentColor" opacity="0.3"/><rect x="7" y="12" width="4" height="4" rx=".5" fill="currentColor" opacity="0.3"/><rect x="12" y="12" width="4" height="4" rx=".5" fill="currentColor" opacity="0.3"/></svg>`,boggle:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="2" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><rect x="16" y="2" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="9" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="16" y="9" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><rect x="2" y="16" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="16" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><rect x="16" y="16" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>`,"general-knowledge":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"history-hunt":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.05 11a9 9 0 1 0 .5-4M3 3v4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"science-quiz":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3h6M9 3v5l-5 10a1 1 0 0 0 .9 1.5h10.2A1 1 0 0 0 22 18L17 8V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" opacity="0.1"/><circle cx="12" cy="15" r="2" fill="currentColor" opacity="0.4"/><circle cx="8" cy="17" r="1" fill="currentColor" opacity="0.3"/><circle cx="16" cy="17" r="1" fill="currentColor" opacity="0.3"/></svg>`,"geography-genius":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"pop-culture":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/><circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"/></svg>`,"sports-trivia":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M12 3c1.5 3 1.5 6 0 9s-1.5 6 0 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 12c3 1.5 6 1.5 9 0s6-1.5 9 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"food-facts":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M6 12s0-5 6-5 6 5 6 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 16s1 2 4 2 4-2 4-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 12h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"animal-kingdom":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3C6 3 4 5 4 7c0 3 2 4 2 7v4h4v-3h4v3h4v-4c0-3 2-4 2-7 0-2-2-4-4-4-1.5 0-2.5.5-4 2C10.5 3.5 9.5 3 8 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="currentColor" opacity="0.15"/><path d="M12 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" opacity="0.3"/></svg>`,"space-explorer":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"tech-trivia":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><circle cx="12" cy="17" r="1.5" fill="currentColor" opacity="0.4"/><path d="M9 7h6M9 11h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,tangram:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 22L12 2l10 20H2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="currentColor" opacity="0.1"/><path d="M2 22h10V12L2 22z" fill="currentColor" opacity="0.2"/><path d="M12 12l10 10H12V12z" fill="currentColor" opacity="0.15"/><path d="M7 12l5-10 5 10H7z" fill="currentColor" opacity="0.2"/></svg>`,"tower-of-hanoi":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v16M5 21h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="9" y="7" width="6" height="3" rx="1" fill="currentColor" opacity="0.5"/><rect x="7" y="12" width="10" height="3" rx="1" fill="currentColor" opacity="0.35"/><rect x="5" y="17" width="14" height="3" rx="1" fill="currentColor" opacity="0.2"/></svg>`,"spot-difference":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5" width="9" height="14" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><rect x="13" y="5" width="9" height="14" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><circle cx="6.5" cy="10" r="1.5" fill="currentColor" opacity="0.4"/><circle cx="17.5" cy="10" r="1.5" fill="currentColor" opacity="0.4"/><path d="M4 14h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="19" cy="15" r="2" stroke="currentColor" stroke-width="1.5"/></svg>`,"hidden-objects":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="9" r="2" fill="currentColor" opacity="0.3"/><circle cx="13" cy="13" r="1.5" fill="currentColor" opacity="0.2"/></svg>`,"optical-illusion":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="1" opacity="0.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" stroke-width="1" opacity="0.3"/></svg>`,"fact-check":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"emoji-pictionary":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="10" r="7" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M9 12s1.5 2 3 2 3-2 3-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 8h.01M15 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 19l5 3 5-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/></svg>`,"story-starter":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M8 7h8M8 11h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M16 14l2 2-2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"drawing-doodle":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="currentColor" opacity="0.15"/><path d="M15 5l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"portrait-party":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><circle cx="12" cy="9" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M6 21v-1a6 6 0 0 1 12 0v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"caption-contest":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M3 19h18M7 22h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 8h6M9 11h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,"joke-factory":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M8 13s1.5 3 4 3 4-3 4-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M9 9h.01M15 9h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6 5l2 2M18 5l-2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,"song-lyrics":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M8 9h4M8 12h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>`,"poetry-party":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="1.5"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M8 7h5M8 10h8M8 13h6M8 16h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"haiku-write":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 4h12M8 8h8M5 12h14M8 16h8M6 20h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="20" cy="8" r="2.5" fill="currentColor" opacity="0.3"/></svg>`,"sound-effects":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"voice-actor":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M5 8l-2-1M5 12H3M5 16l-2 1M19 8l2-1M19 12h2M19 16l2 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>`,"meme-factory":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M3 19h18M7 22h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="9" r="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.3"/><path d="M13 13l8-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,"superhero-create":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L7 9h4l-3 10 9-11h-5l5-6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="currentColor" opacity="0.2"/></svg>`,"future-invent":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14H15.09z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" opacity="0.1"/></svg>`,"recipe-create":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M21 15V2a5 5 0 0 0-5 5v6h5zm0 0v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"app-idea":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M9 7h6M9 11h6M9 15h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="17" cy="17" r="4" fill="currentColor" opacity="0.2" stroke="currentColor" stroke-width="1.5"/><path d="M17 15v2l1 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"movie-plot":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="2.18" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M17 7h5M2 17h5M17 17h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/><polygon points="10 9 15 12 10 15" fill="currentColor" opacity="0.5"/></svg>`,"travel-plan":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" opacity="0.15"/></svg>`,"business-idea":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 12v4M10 14h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"skill-share":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M15 11l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/></svg>`,"challenge-accepted":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="currentColor" opacity="0.1"/></svg>`,"impossible-challenge":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4.93 4.93l14.14 14.14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>`,"speed-challenge":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="currentColor" opacity="0.2"/></svg>`,"endurance-test":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 4v16M18 4v16M6 12h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M2 4h4M18 4h4M2 20h4M18 20h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,"precision-test":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.5" opacity="0.6"/><circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,"balance-challenge":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18M4 21h16M5 8l7-5 7 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="13" r="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><circle cx="18" cy="13" r="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/></svg>`,"coordination-game":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><circle cx="18" cy="6" r="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><path d="M9 6h6M6 9v6M18 9v6M9 18h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"patience-test":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 22h14M5 2h14M5 2l2 10H7l2 10M19 2l-2 10h.5l-2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" opacity="0.1"/></svg>`,"memory-stretch":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44" stroke="currentColor" stroke-width="1.5"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44" stroke="currentColor" stroke-width="1.5"/><path d="M5 8l-2 2 2 2M19 8l2 2-2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/></svg>`,"hide-and-seek":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"tag-chase":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="17" cy="4" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M17 7v5l-5 5M17 12l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="5" cy="18" r="2.5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><path d="M5 15.5V10l5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M14 17l-7 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.4"/></svg>`,"freeze-tag":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18M3 12h18M5.64 5.64l12.72 12.72M18.36 5.64 5.64 18.36" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/></svg>`,"duel-master":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 17.5 3 6 3 3 6 3 17.5 14.5M13 19l6-6M16 16l4 4M19 21l2-2M14.5 6.5 18 3 21 3 21 6 17.5 9.5M5 14l4 4M7 17l-4 4M3 19l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"trick-shot":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>`,"plank-challenge":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 16h16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="18" cy="12" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M18 14.5v3M4 16v3M10 16v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,"pushup-showdown":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="5" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M18 8v4l-14 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 14v4M18 12v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>`,"squat-challenge":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="3" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M12 5v5l-4 4v4M12 10l4 4v4M8 18h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"arm-wrestle":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 11V6a2 2 0 0 0-4 0v3M14 9V4a2 2 0 0 0-4 0v5M10 9V6a2 2 0 0 0-4 0v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2C9.2 22 7.5 21.14 6.01 19.66l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"staring-match":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><circle cx="11" cy="11" r="1.5" fill="currentColor"/></svg>`,"laugh-contest":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M8 14s1.5 3 4 3 4-3 4-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M9 9h.01M15 9h.01" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M6 7l1 2M18 7l-1 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,"jumping-jacks":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="3" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M12 5v6M5 8l7 3 7-3M8 21l4-7 4 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"wall-sit":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3v18M3 12h8v9M11 12l8-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="11" cy="5" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>`,"meditation-game":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="5" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M5 21c1-4 3-7 7-7s6 3 7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 8v6M8 13l4 1 4-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1" opacity="0.2" stroke-dasharray="3 2"/></svg>`,"stretch-challenge":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="4" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v5M6 9l6 3 6-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 20c2-4 4-7 8-8 4 1 6 4 8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"dance-freeze-pro":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="4" r="1.5" fill="currentColor"/><circle cx="16" cy="4" r="1.5" fill="currentColor"/><path d="M8 6v4l-3 4v6M8 10l3 4M16 6v4l3 4v6M16 10l-3 4M11 14h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"rhythm-battle":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12h3l3-8 4 16 3-10 3 5 3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"song-association":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 10l12-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 8l6-2M21 6l-6 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>`,"lyrics-fill":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="1.5"/><rect x="6" y="8" width="6" height="2" rx="1" fill="currentColor" opacity="0.4"/></svg>`,"beat-box":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 9l3 3-3 3M21 9l-3 3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/></svg>`,"air-guitar":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3h6M9 3v3l-2 4h10l-2-4V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 10h10v2H7z" fill="currentColor" opacity="0.2"/><path d="M9 12v8M15 12v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M7 20h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="16" r="1.5" fill="currentColor" opacity="0.4"/></svg>`,"dance-improv":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="4" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 8l4 4 4-4M8 15l2 6M16 15l-2 6M10 15h4M12 8v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 10l2-1M19 10l-2-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>`,"music-memory":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M6 14l-3-3 3-3M18 11l3-3-3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/></svg>`,"dance-off-battle":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="4" r="1.5" fill="currentColor"/><circle cx="17" cy="4" r="1.5" fill="currentColor"/><path d="M4 8l3 3-2 5M10 8l-3 3M14 8l3 3 2 5M18 8l-3 3M10 16l2 4 2-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 9v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 2"/></svg>`,"battle-rap":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="currentColor" opacity="0.1"/><path d="M8 10h8M8 14h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"silent-disco":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 18v-6a9 9 0 0 1 18 0v6" stroke="currentColor" stroke-width="1.5"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/><path d="M9 12l3-8 3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/></svg>`,"playlist-showdown":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M3 10h18M3 14h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M17 14l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"music-statues":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 21V8a1 1 0 0 1 .55-.89l14-7A1 1 0 0 1 21 1v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="currentColor" opacity="0.1"/><circle cx="5" cy="21" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="21" cy="21" r="3" stroke="currentColor" stroke-width="1.5"/></svg>`,"genre-change":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 4 4.6 12.5 11 14.5l2 6.5 3-6 7-11z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" opacity="0.15"/></svg>`,"dessert-roulette":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M12 2v10l6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.4"/></svg>`,"most-likely":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M21 10l-2 2 2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/></svg>`,"question-game":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>`,"hot-seat-interview":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 11V6a3 3 0 0 1 6 0v5M13 11V7a3 3 0 0 1 6 0v4M3 11h18v2a7 7 0 0 1-7 7H10a7 7 0 0 1-7-7v-2z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M9 20v2M15 20v2M8 6l2 1M16 6l-2 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,"speed-friending":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="1.5"/><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" stroke-width="1" fill="currentColor" opacity="0.1" transform="translate(5, -2) scale(0.5)"/></svg>`,"get-to-know":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.15"/></svg>`,"life-story":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="1.5"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"childhood-memory":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="5" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M12 3c-2 2-4 3-4 6 0 2 1.5 4 4 4s4-2 4-4c0-3-2-4-4-6z" fill="currentColor" opacity="0.2"/><path d="M8 18a8 8 0 0 0 8 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 13v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"travel-stories":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="8" r="1.5" fill="currentColor" opacity="0.5"/></svg>`,"embarrassing-moments":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M8 15s2-3 4-3 4 3 4 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 9h.01M15 9h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16 5l2-2M8 5L6 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,"proud-moments":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.2"/></svg>`,"superpower-talk":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.25"/><circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.4"/></svg>`,"time-travel":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 3v5h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 7v5l4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"zombie-apocalypse":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 10h.01M15 10h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M8 15s2 2 4 2 4-2 4-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"desert-island":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-1 2-3 4-3 7 1.5-1 4-1 6 0-1-3-2-5-3-7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="currentColor" opacity="0.3"/><path d="M9 10h6M12 10v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><ellipse cx="12" cy="18" rx="8" ry="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M4 18c0-2 3.5-4 8-4s8 2 8 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"philosophy-chat":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44" stroke="currentColor" stroke-width="1.5"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44" stroke="currentColor" stroke-width="1.5"/><path d="M5 10l-2 2 2 2M19 10l2 2-2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/></svg>`,"culture-share":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"dream-job":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" stroke-width="1.5"/><path d="M12 12v4M10 14h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"fantasy-world":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"mystery-dinner":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11l19-9-9 19-2-8-8-2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" opacity="0.15"/><circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.4"/></svg>`,"life-advice":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M9 11l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"future-prediction":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M12 8a4 4 0 0 1 0 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.4"/><path d="M12 5v1M19 12h-1M12 19v-1M5 12h1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>`,"language-lesson":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,"recipe-exchange":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2s-5 0-5 7l5-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,"hobby-showcase":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M12 6l2 4 4 .5-3 3 .7 4-3.7-2-3.7 2 .7-4-3-3 4-.5z" fill="currentColor" opacity="0.3"/></svg>`,"skill-swap":`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,default:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="6" width="20" height="12" rx="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.1"/><path d="M6 12h4M8 10v4M14 11h.01M17 13h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`};function m(e){return p[e]||p.default}var h=class{container=null;selectedCategory=`all`;onGameSelect=null;onSettings=null;onLeaderboard=null;onPlayers=null;onQuickPlay=null;constructor(){}setOnGameSelect(e){this.onGameSelect=e}setOnSettings(e){this.onSettings=e}setOnLeaderboard(e){this.onLeaderboard=e}setOnPlayers(e){this.onPlayers=e}setOnQuickPlay(e){this.onQuickPlay=e}render(){return this.container=document.createElement(`div`),this.container.className=`home-screen`,this.container.innerHTML=this.getStyles()+this.getHTML(),this.setupEventListeners(),this.container}getStyles(){return`
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
    `}getHTML(){return`
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
          ${[{id:`all`,name:`All`,icon:`grid`},{id:`quick`,name:`Quick`,icon:`zap`},{id:`party`,name:`Party`,icon:`party`},{id:`word`,name:`Word`,icon:`word`},{id:`creative`,name:`Creative`,icon:`creative`},{id:`physical`,name:`Physical`,icon:`physical`},{id:`trivia`,name:`Trivia`,icon:`brain`}].map(e=>`
            <button class="category-tab ${e.id===this.selectedCategory?`active`:``}" data-category="${e.id}">
              ${this.getCategoryIcon(e.icon)}
              <span>${e.name}</span>
            </button>
          `).join(``)}
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
    `}getCategoryIcon(e){return{grid:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,zap:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,party:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/></svg>`,brain:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z"/></svg>`,word:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>`,creative:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,physical:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="2"/><path d="M10 22v-5h4v5"/><path d="M10 17H6l2-7h8l2 7h-4"/><path d="M6 10l-2 4"/><path d="M18 10l2 4"/></svg>`}[e]||``}getGameIcon(e){return m(e)}renderGamesList(){return f.getGamesByCategory(this.selectedCategory).map(e=>`
      <div class="game-card" data-game-id="${e.id}">
        <div class="game-icon" style="background: ${e.color};">
          ${this.getGameIcon(e.id)}
        </div>
        <div class="game-info">
          <div class="game-name">${e.name}</div>
          <div class="game-description">${e.description}</div>
          <div class="game-players">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>${e.minPlayers}+ players</span>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    `).join(``)}setupEventListeners(){if(!this.container)return;let e=this.container.querySelector(`#home-leaderboard`),t=this.container.querySelector(`#home-settings`),n=this.container.querySelector(`#quick-play`),r=this.container.querySelectorAll(`.category-tab`),i=this.container.querySelector(`#games-list`);e?.addEventListener(`click`,()=>this.onLeaderboard?.()),t?.addEventListener(`click`,()=>this.onSettings?.()),n?.addEventListener(`click`,()=>this.onQuickPlay?.()),r.forEach(e=>{e.addEventListener(`click`,()=>{r.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),this.selectedCategory=e.dataset.category||`all`;let t=this.container?.querySelector(`#games-list`);t&&(t.innerHTML=this.renderGamesList(),this.setupGameCardListeners(t))})}),i&&this.setupGameCardListeners(i)}setupGameCardListeners(e){e.querySelectorAll(`.game-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.gameId;t&&this.onGameSelect&&this.onGameSelect(t)})})}},g=class{app;gameId=``;container=null;onComplete=null;onSkip=null;currentGame=null;constructor(){this.app={game:{getGameById:e=>this.currentGame},showScreen:()=>{}}}setGame(e){this.currentGame=e,this.gameId=e?.id||``}setOnComplete(e){this.onComplete=e}setOnSkip(e){this.onSkip=e}render(){let e=document.createElement(`div`);e.className=`tutorial-screen`;let t=this.app.game.getGameById(this.gameId),n=this.getTutorialSlides(this.gameId);return e.innerHTML=`
      <div class="tutorial-header">
        <button class="btn-icon" id="tutorial-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      
      <div class="tutorial-content">
        <div class="game-icon-large" style="background: ${t?.color||`#5B7FFF`};">
          ${this.getGameIcon(t?.icon||`🎮`)}
        </div>
        <h2 class="tutorial-title">${t?.name||`Game`}</h2>
        <p class="tutorial-subtitle">How to Play</p>
        
        <div class="tutorial-slides" id="tutorial-slides">
          ${n.map((e,n)=>`
            <div class="tutorial-slide ${n===0?`active`:``}" data-index="${n}">
              <div class="slide-image" style="background: ${t?.color||`#5B7FFF`}20;">
                ${e.icon}
              </div>
              <h3 class="slide-title">${e.title}</h3>
              <p class="slide-description">${e.description}</p>
            </div>
          `).join(``)}
        </div>
        
        <div class="tutorial-dots" id="tutorial-dots">
          ${n.map((e,t)=>`
            <div class="dot ${t===0?`active`:``}" data-index="${t}"></div>
          `).join(``)}
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
          width: 70px;
          height: 70px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-md);
          font-size: 36px;
        }
        
        .game-icon-large svg {
          width: 36px;
          height: 36px;
          color: white;
        }
        
        .tutorial-title {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-xs);
        }
        
        .tutorial-subtitle {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-md);
          font-size: var(--font-size-sm);
        }
        
        .tutorial-slides {
          flex: 1;
          width: 100%;
          position: relative;
          overflow: hidden;
          min-height: 0;
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
          justify-content: flex-start;
          padding-top: var(--space-md);
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
          width: 80px;
          height: 80px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-md);
        }
        
        .slide-image svg {
          width: 40px;
          height: 40px;
          color: var(--color-primary);
        }
        
        .slide-title {
          font-size: var(--font-size-md);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--space-xs);
        }
        
        .slide-description {
          color: var(--color-text-secondary);
          line-height: 1.5;
          max-width: 280px;
          font-size: var(--font-size-sm);
        }
        
        .tutorial-dots {
          display: flex;
          gap: var(--space-sm);
          margin: var(--space-sm) 0;
        }
        
        .dot {
          width: 6px;
          height: 6px;
          border-radius: var(--radius-full);
          background: var(--color-text-muted);
          transition: all var(--transition-fast);
        }
        
        .dot.active {
          width: 18px;
          background: var(--color-primary);
        }
        
        .tutorial-footer {
          padding: var(--space-md);
          padding-bottom: calc(var(--space-md) + env(safe-area-inset-bottom, 0));
        }
        
        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-md);
          font-weight: var(--font-weight-semibold);
          font-size: var(--font-size-sm);
          transition: all var(--transition-fast);
        }
        
        .btn-primary {
          background: var(--gradient-primary);
          color: white;
        }
        
        .btn-large { padding: var(--space-md); }
        
        .btn-full { width: 100%; }
        
        .btn:active {
          transform: scale(0.98);
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      </style>
    `,this.setupEventListeners(e),e}getTutorialSlides(e){let t={"truth-or-dare":[{icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,title:`Ask a Question`,description:`Choose a player and ask them "Truth or Dare?"`},{icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,title:`Tell the Truth`,description:`If they choose Truth, they must answer honestly!`},{icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,title:`Complete the Dare`,description:`If they choose Dare, they must do the challenge!`}],"hot-potato":[{icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,title:`Pass the Phone!`,description:`When the timer starts, pass the phone to the next person quickly!`},{icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,title:`Don't Hold Too Long!`,description:`When the timer hits zero, whoever is holding the phone loses!`}],charades:[{icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/></svg>`,title:`Act It Out!`,description:`Without speaking, act out the word or phrase shown.`},{icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>`,title:`Others Guess`,description:`The rest of the group tries to guess what you're acting out!`}],default:[{icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,title:`Get Ready!`,description:`Get ready to play this exciting game with your family!`},{icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,title:`Follow the Rules`,description:`Each game has its own unique rules. Pay attention and have fun!`},{icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,title:`Win & Celebrate!`,description:`Compete to win and climb the leaderboard!`}]};return t[e]||t.default}getGameIcon(e){let t={"🎭":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,"🎱":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,"🔥":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,"🎬":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/></svg>`,"🎨":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>`,"🎡":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,"⚡":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,"🙈":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,"🔗":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,"✊":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`,"🧩":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.452-.743-.93a.96.96 0 0 0-.277-.837l-1.61-1.61a2.404 2.404 0 0 0-1.705-.706 2.402 2.402 0 0 0-1.704.706l-1.61 1.61a.98.98 0 0 1-.837.276c-.47-.07-.802-.452-.743-.93a.96.96 0 0 0-.277-.837l-1.611-1.611a2.404 2.404 0 0 0-1.705-.706 2.402 2.402 0 0 0-1.704.706l-1.61 1.61a.98.98 0 0 1-.837.276c-.47-.07-.802-.452-.743-.93a.96.96 0 0 0-.277-.837L.706 8.694a2.404 2.404 0 0 0-.706-1.704A2.402 2.402 0 0 0 .706 5.29L2.316 3.68c.47-.47 1.087-.706 1.704-.706s1.233.235 1.704.706l1.61 1.61a.98.98 0 0 1 .276.837c-.07.47.272.86.743.93a.98.98 0 0 0 .837-.276l1.61-1.61a2.402 2.402 0 0 1 1.705-.706c.617 0 1.233.236 1.704.706l1.61 1.61a.98.98 0 0 1 .276.837c-.07.47.272.86.743.93a.98.98 0 0 0 .837-.276l1.61-1.61a2.404 2.404 0 0 1 1.705-.706c.617 0 1.233.235 1.704.706l1.611 1.611a.98.98 0 0 0 .837.276c.47-.07.802-.452.743-.93a.96.96 0 0 1 .277-.837l1.61-1.61a2.404 2.404 0 0 1 1.705-.706c.617 0 1.233.235 1.704.706l1.611 1.611a.98.98 0 0 0 .837.276c.47-.07.802-.452.743-.93a.96.96 0 0 1 .277-.837l1.611-1.611a2.404 2.404 0 0 1 .706-1.704 2.402 2.402 0 0 1 1.704-.706c.617 0 1.233.236 1.704.706l1.568 1.568a.98.98 0 0 1 .276.837c-.07.47.272.86.743.93a.98.98 0 0 0 .837-.276l1.611-1.611a2.404 2.404 0 0 0 .706-1.704 2.402 2.402 0 0 0-.706-1.704l-1.568-1.568a.98.98 0 0 1-.276-.837c.07-.47-.272-.86-.743-.93a.98.98 0 0 0-.837.276z"/></svg>`,"👄":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,"📊":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,"😋":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,"🎰":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 6v12"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="12" r="2"/></svg>`,"📷":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,"🎵":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,"👆":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8V4"/><path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>`,"🔊":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,"🪣":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2v6a6 6 0 0 0 12 0V2"/><path d="M6 8H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2"/></svg>`,"🤚":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`,"💝":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,"🤔":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,"🧠":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z"/></svg>`,"🍰":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/></svg>`,"🎮":`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>`};return t[e]||t[`🎮`]}currentSlide=0;setupEventListeners(e){let t=e.querySelector(`#tutorial-close`),n=e.querySelector(`#tutorial-start`),r=e.querySelectorAll(`.tutorial-slide`),i=e.querySelectorAll(`.dot`);t?.addEventListener(`click`,()=>{this.onSkip?.()}),n?.addEventListener(`click`,()=>{this.onComplete?.()});let a=e=>{r.forEach((t,n)=>{t.classList.remove(`active`,`prev`),n===e?t.classList.add(`active`):n<e&&t.classList.add(`prev`)}),i.forEach((t,n)=>{t.classList.toggle(`active`,n===e)}),this.currentSlide=e},o=0,s=0;e.addEventListener(`touchstart`,e=>{o=e.changedTouches[0].screenX},{passive:!0}),e.addEventListener(`touchend`,e=>{s=e.changedTouches[0].screenX;let t=o-s,n=Array.from(r);Math.abs(t)>50&&(t>0&&this.currentSlide<n.length-1?a(this.currentSlide+1):t<0&&this.currentSlide>0&&a(this.currentSlide-1))},{passive:!0}),i.forEach((e,t)=>{e.addEventListener(`click`,()=>a(t))})}},_={en:{name:`English`,flag:`🇬🇧`},es:{name:`Español`,flag:`🇪🇸`},fr:{name:`Français`,flag:`🇫🇷`},de:{name:`Deutsch`,flag:`🇩🇪`},pt:{name:`Português`,flag:`🇧🇷`},zh:{name:`中文`,flag:`🇨🇳`},ja:{name:`日本語`,flag:`🇯🇵`},ko:{name:`한국어`,flag:`🇰🇷`},hi:{name:`हिन्दी`,flag:`🇮🇳`},ar:{name:`العربية`,flag:`🇸🇦`},ru:{name:`Русский`,flag:`🇷🇺`},sw:{name:`Kiswahili`,flag:`🇰🇪`}},v={es:{truthQuestions:[{icon:`😴`,text:`¿Quién ronca más fuerte?`},{icon:`🍕`,text:`¿Quién come más rápido?`},{icon:`😰`,text:`¿Quién se asusta fácilmente?`},{icon:`🗣️`,text:`¿Quién habla dormido?`},{icon:`📱`,text:`¿Quién revisa el teléfono primero?`},{icon:`🦥`,text:`¿Quién siempre llega tarde?`},{icon:`😂`,text:`¿Quién se ríe de los chistes malos?`},{icon:`🧹`,text:`¿Quién odia limpiar?`},{icon:`🚿`,text:`¿Quién tarda más en la ducha?`},{icon:`🦋`,text:`¿Quién tiene miedo a las mariposas?`}],dareChallenges:[{icon:`🦘`,text:`Haz 20 saltos de tijera`},{icon:`🏃`,text:`Corre en el lugar por 30 segundos`},{icon:`🧘`,text:`Haz una plancha por 30 segundos`},{icon:`🦵`,text:`Haz 10 sentadillas`},{icon:`🏋️`,text:`Haz 10 flexiones`},{icon:`🤸`,text:`Haz 5 volteretas`},{icon:`🎤`,text:`Canta el alfabeto al revés`},{icon:`🎵`,text:`Tararea una canción`},{icon:`🦆`,text:`Habla como un pato por 1 minuto`},{icon:`💃`,text:`Baila como un robot`}],neverHaveIEver:[{icon:`✈️`,text:`He viajado en avión`},{icon:`🏊`,text:`He nadado en el mar`},{icon:`🏔️`,text:`He subido a una montaña`},{icon:`🎭`,text:`He actuado en una obra`},{icon:`🎤`,text:`He cantado en público`},{icon:`🍳`,text:`He cocinado una comida completa`},{icon:`🐕`,text:`He tenido una mascota`},{icon:`🎮`,text:`He jugado toda la noche`},{icon:`❄️`,text:`He visto nieve`},{icon:`🎢`,text:`He montado en montaña rusa`}],wouldYouRather:[{icon:`🦅`,text:`¿Volar o ser invisible?`},{icon:`🐟`,text:`¿Respirar bajo el agua o volar al espacio?`},{icon:`📱`,text:`¿Sin internet o sin aire acondicionado?`},{icon:`🌍`,text:`¿Viajar por el mundo o vivir en un lugar?`},{icon:`💰`,text:`¿Ser rico o famoso?`},{icon:`🐕`,text:`¿Ser un perro o un gato?`},{icon:`🍕`,text:`¿Nunca comer pizza o helado?`},{icon:`⏰`,text:`¿Nunca dormir o nunca comer?`},{icon:`🌊`,text:`¿Playa o montaña?`},{icon:`🎭`,text:`¿Ser gracioso o inteligente?`}],riddles:[{icon:`⏰`,text:`¿Qué tiene manos pero no puede aplaudir?`,answer:`⏰ Un reloj`},{icon:`💰`,text:`¿Qué tiene cabeza y cola pero no tiene cuerpo?`,answer:`💰 Una moneda`},{icon:`🧱`,text:`¿Qué tiene muchas llaves pero no abre ninguna puerta?`,answer:`🎹 Un piano`},{icon:`🌍`,text:`¿Qué tiene muchos países pero no viaja?`,answer:`🗺️ Un mapa`},{icon:`🌹`,text:`¿Qué tiene espinas pero es hermoso?`,answer:`🥀 Una rosa`},{icon:`🌽`,text:`¿Qué tiene orejas pero no puede oír?`,answer:`🌽 El maíz`},{icon:`👣`,text:`¿Cuanto más tomas, más dejas?`,answer:`👣 Pasos`},{icon:`🌂`,text:`¿Qué se moja más mientras se seca?`,answer:`🧽 Una toalla`},{icon:`🏠`,text:`¿Qué hay que romper antes de usar?`,answer:`🥚 Un huevo`},{icon:`💡`,text:`¿Qué se hace más grande cuando quitas?`,answer:`🕳️ Un hoyo`}]},fr:{truthQuestions:[{icon:`😴`,text:`Qui ronfle le plus fort?`},{icon:`🍕`,text:`Qui mange le plus vite?`},{icon:`😰`,text:`Qui se fait peur facilement?`},{icon:`🗣️`,text:`Qui parle en dormant?`},{icon:`📱`,text:`Qui vérifie son téléphone en premier?`},{icon:`🦥`,text:`Qui est toujours en retard?`},{icon:`😂`,text:`Qui rit des mauvaises blagues?`},{icon:`🧹`,text:`Qui déteste nettoyer?`},{icon:`🚿`,text:`Qui prend les douches les plus longues?`},{icon:`🦋`,text:`Qui a peur des papillons?`}],dareChallenges:[{icon:`🦘`,text:`Fais 20 sauts de page`},{icon:`🏃`,text:`Cours sur place pendant 30 secondes`},{icon:`🧘`,text:`Fais la planche pendant 30 secondes`},{icon:`🦵`,text:`Fais 10 squats`},{icon:`🏋️`,text:`Fais 10 pompes`},{icon:`🤸`,text:`Fais 5 roues`},{icon:`🎤`,text:`Chante l'alphabet à l'envers`},{icon:`🎵`,text:`Fredonne une chanson`},{icon:`🦆`,text:`Parle comme un canard pendant 1 minute`},{icon:`💃`,text:`Danse comme un robot`}],neverHaveIEver:[{icon:`✈️`,text:`J'ai pris l'avion`},{icon:`🏊`,text:`J'ai nagé dans l'océan`},{icon:`🏔️`,text:`J'ai grimpé une montagne`},{icon:`🎭`,text:`J'ai joué dans une pièce`},{icon:`🎤`,text:`J'ai chanté en public`},{icon:`🍳`,text:`J'ai cuisiné un repas complet`},{icon:`🐕`,text:`J'ai eu un animal de compagnie`},{icon:`🎮`,text:`J'ai joué toute la nuit`},{icon:`❄️`,text:`J'ai vu de la neige`},{icon:`🎢`,text:`J'ai fait les montagnes russes`}],wouldYouRather:[{icon:`🦅`,text:`Voler ou être invisible?`},{icon:`🐟`,text:`Respirer sous l'eau ou voler dans l'espace?`},{icon:`📱`,text:`Pas d'internet ou pas de clim?`},{icon:`🌍`,text:`Voyager dans le monde ou vivre au même endroit?`},{icon:`💰`,text:`Être riche ou célèbre?`},{icon:`🐕`,text:`Être un chien ou un chat?`},{icon:`🍕`,text:`Ne jamais manger de pizza ou de glace?`},{icon:`⏰`,text:`Ne jamais dormir ou ne jamais manger?`},{icon:`🌊`,text:`Plage ou montagne?`},{icon:`🎭`,text:`Être drôle ou intelligent?`}],riddles:[{icon:`⏰`,text:`Qu'est-ce qui a des mains mais ne peut pas applaudir?`,answer:`⏰ Une horloge`},{icon:`💰`,text:`Qu'est-ce qui a une tête et une queue mais pas de corps?`,answer:`💰 Une pièce`},{icon:`🧱`,text:`Qu'est-ce qui a beaucoup de clés mais ne peut ouvrir aucune porte?`,answer:`🎹 Un piano`},{icon:`🌍`,text:`Qu'est-ce qui a beaucoup de pays mais ne voyage pas?`,answer:`🗺️ Une carte`},{icon:`🌹`,text:`Qu'est-ce qui a des épines mais est beau?`,answer:`🥀 Une rose`},{icon:`🌽`,text:`Qu'est-ce qui a des oreilles mais ne peut entendre?`,answer:`🌽 Du maïs`},{icon:`👣`,text:`Plus on en prend, plus on en laisse?`,answer:`👣 Des pas`},{icon:`🌂`,text:`Qu'est-ce qui devient plus mouillé en séchant?`,answer:`🧽 Une serviette`},{icon:`🏠`,text:`Qu'est-ce qu'il faut casser avant d'utiliser?`,answer:`🥚 Un œuf`},{icon:`💡`,text:`Qu'est-ce qui grossit quand on enlève?`,answer:`🕳️ Un trou`}]},de:{truthQuestions:[{icon:`😴`,text:`Wer schnarcht am lautesten?`},{icon:`🍕`,text:`Wer isst am schnellsten?`},{icon:`😰`,text:`Wer erschrickt leicht?`},{icon:`🗣️`,text:`Wer spricht im Schlaf?`},{icon:`📱`,text:`Wer schaut zuerst aufs Handy?`},{icon:`🦥`,text:`Wer kommt immer zu spät?`},{icon:`😂`,text:`Wer lacht über schlechte Witze?`},{icon:`🧹`,text:`Wer hasst Putzen?`},{icon:`🚿`,text:`Wer duscht am längsten?`},{icon:`🦋`,text:`Wer hat Angst vor Schmetterlingen?`}],dareChallenges:[{icon:`🦘`,text:`Mache 20 Hampelmänner`},{icon:`🏃`,text:`Laufe 30 Sekunden auf der Stelle`},{icon:`🧘`,text:`Mache 30 Sekunden Plank`},{icon:`🦵`,text:`Mache 10 Kniebeugen`},{icon:`🏋️`,text:`Mache 10 Liegestütze`},{icon:`🤸`,text:`Mache 5 Räder`},{icon:`🎤`,text:`Sing das Alphabet rückwärts`},{icon:`🎵`,text:`Summ ein Lied`},{icon:`🦆`,text:`Sprich wie eine Ente für 1 Minute`},{icon:`💃`,text:`Tanze wie ein Roboter`}],neverHaveIEver:[{icon:`✈️`,text:`Ich bin geflogen`},{icon:`🏊`,text:`Ich bin im Meer geschwommen`},{icon:`🏔️`,text:`Ich bin auf einen Berg gestiegen`},{icon:`🎭`,text:`Ich habe in einem Stück gespielt`},{icon:`🎤`,text:`Ich habe in der Öffentlichkeit gesungen`},{icon:`🍳`,text:`Ich habe ein ganzes Essen gekocht`},{icon:`🐕`,text:`Ich hatte ein Haustier`},{icon:`🎮`,text:`Ich habe die ganze Nacht gespielt`},{icon:`❄️`,text:`Ich habe Schnee gesehen`},{icon:`🎢`,text:`Ich bin Achterbahn gefahren`}],wouldYouRather:[{icon:`🦅`,text:`Fliegen oder unsichtbar sein?`},{icon:`🐟`,text:`Unter Wasser atmen oder ins All fliegen?`},{icon:`📱`,text:`Kein Internet oder keine Klimaanlage?`},{icon:`🌍`,text:`Die Welt bereisen oder an einem Ort leben?`},{icon:`💰`,text:`Reich oder berühmt sein?`},{icon:`🐕`,text:`Ein Hund oder eine Katze sein?`},{icon:`🍕`,text:`Nie Pizza oder Eis essen?`},{icon:`⏰`,text:`Nie schlafen oder nie essen?`},{icon:`🌊`,text:`Strand oder Berge?`},{icon:`🎭`,text:`Witzig oder intelligent sein?`}],riddles:[{icon:`⏰`,text:`Was hat Hände aber kann nicht klatschen?`,answer:`⏰ Eine Uhr`},{icon:`💰`,text:`Was hat einen Kopf und einen Schwanz aber keinen Körper?`,answer:`💰 Eine Münze`},{icon:`🧱`,text:`Was hat viele Schlüssel aber öffnet keine Tür?`,answer:`🎹 Ein Klavier`},{icon:`🌍`,text:`Was hat viele Länder aber reist nicht?`,answer:`🗺️ Eine Landkarte`},{icon:`🌹`,text:`Was hat Dornen aber ist schön?`,answer:`🥀 Eine Rose`},{icon:`🌽`,text:`Was hat Ohren aber kann nicht hören?`,answer:`🌽 Mais`},{icon:`👣`,text:`Je mehr man nimmt, desto mehr lässt man?`,answer:`👣 Schritte`},{icon:`🌂`,text:`Was wird nasser beim Trocknen?`,answer:`🧽 Ein Handtuch`},{icon:`🏠`,text:`Was muss man brechen bevor man es benutzt?`,answer:`🥚 Ein Ei`},{icon:`💡`,text:`Was wird größer wenn man wegnimmt?`,answer:`🕳️ Ein Loch`}]}},y=class{static getLanguage(){return localStorage.getItem(`fgn_language`)||`en`}static setLanguage(e){localStorage.setItem(`fgn_language`,e)}static getCountryPrompts(){return v[this.getLanguage()]||null}static getLocalizedPrompt(e){let t=this.getCountryPrompts();if(!t)return e;let n=[t.truthQuestions,t.dareChallenges,t.neverHaveIEver,t.wouldYouRather,t.riddles];for(let t of n){let n=t.find(t=>t.icon===e.icon);if(n)return n}return e}static generateMassiveData(){return{truthQuestions:this.generateTruthQuestions(),dareChallenges:this.generateDareChallenges(),neverHaveIEver:this.generateNeverHaveIEver(),wouldYouRather:this.generateWouldYouRather(),riddles:this.generateRiddles(),charadesAnimals:this.generateCharadesAnimals(),charadesActions:this.generateCharadesActions(),charadesObjects:this.generateCharadesObjects(),charadesMovies:this.generateCharadesMovies(),charadesJobs:this.generateCharadesJobs(),emojiWords:this.generateEmojiWords(),scavengerItems:this.generateScavengerItems(),dessertDares:this.generateDessertDares(),complimentPrompts:this.generateComplimentPrompts(),soundEffects:this.generateSoundEffects(),lipReadingWords:this.generateLipReadingWords(),wordChainWords:this.generateWordChainWords()}}static generateTruthQuestions(){let e={funny:[{icon:`😴`,text:`Who snores the loudest?`},{icon:`🍕`,text:`Who eats the fastest?`},{icon:`😰`,text:`Who gets scared easily?`},{icon:`🗣️`,text:`Who talks in their sleep?`},{icon:`😴`,text:`Who sleeps the most?`},{icon:`🦷`,text:`Who forgot to brush teeth today?`},{icon:`👕`,text:`Who wore the same clothes twice this week?`},{icon:`🍳`,text:`Who burned food this month?`},{icon:`📱`,text:`Who checks phone first thing in morning?`},{icon:`😴`,text:`Who hit snooze more than twice?`},{icon:`🎵`,text:`Who sings in the shower?`},{icon:`🕺`,text:`Who dances when no one is watching?`},{icon:`🤫`,text:`Who talks to themselves?`},{icon:`😋`,text:`Who steals food from others plates?`},{icon:`🦥`,text:`Who is always late?`},{icon:`🏃`,text:`Who avoids exercise?`},{icon:`😤`,text:`Who gets annoyed fastest?`},{icon:`😂`,text:`Who laughs at bad jokes?`},{icon:`🤥`,text:`Who tells white lies?`},{icon:`😬`,text:`Who forgot a birthday?`},{icon:`🧹`,text:`Who hates cleaning?`},{icon:`🚿`,text:`Who takes longest showers?`},{icon:`😴`,text:`Who could sleep all day?`},{icon:`🍿`,text:`Who eats popcorn kernel by kernel?`},{icon:`🦋`,text:`Who is afraid of butterflies?`},{icon:`🐛`,text:`Who screams at tiny bugs?`},{icon:`🕷️`,text:`Who fears spiders?`},{icon:`🌊`,text:`Who fears the ocean?`},{icon:`⛰️`,text:`Who fears heights?`},{icon:`🎪`,text:`Who fears clowns?`},{icon:`📀`,text:`Who cannot watch horror movies?`},{icon:`🦇`,text:`Who fears bats?`},{icon:`🐁`,text:`Who fears mice?`},{icon:`🐍`,text:`Who fears snakes?`},{icon:`🕳️`,text:`Who fears dark places?`},{icon:`💉`,text:`Who fears needles?`},{icon:`🏥`,text:`Who fears the doctor?`},{icon:`🦷`,text:`Who fears the dentist?`},{icon:`✈️`,text:`Who fears flying?`}],family:[{icon:`👨`,text:`Who is the funniest parent?`},{icon:`👩`,text:`Who is the strictest?`},{icon:`👦`,text:`Who is the messiest child?`},{icon:`👧`,text:`Who gets away with everything?`},{icon:`💕`,text:`Who shows love most openly?`},{icon:`😤`,text:`Who argues most?`},{icon:`🤝`,text:`Who helps without being asked?`},{icon:`📚`,text:`Who reads the most?`},{icon:`🎮`,text:`Who plays the most games?`},{icon:`🏃`,text:`Who is the most active?`},{icon:`🍳`,text:`Who cooks the best?`},{icon:`🧹`,text:`Who cleans the most?`},{icon:`💰`,text:`Who spends money fastest?`},{icon:`💵`,text:`Who saves money best?`},{icon:`📱`,text:`Who uses phone the most?`},{icon:`📺`,text:`Who watches the most TV?`},{icon:`😴`,text:`Who sleeps in the latest?`},{icon:`🌅`,text:`Who wakes up the earliest?`},{icon:`🎂`,text:`Who forgot your birthday?`},{icon:`🎁`,text:`Who gives the best gifts?`},{icon:`🗣️`,text:`Who talks the most?`},{icon:`🤫`,text:`Who is the best secret keeper?`},{icon:`😊`,text:`Who smiles the most?`},{icon:`😢`,text:`Who cries the most?`},{icon:`😠`,text:`Who gets angry easiest?`},{icon:`🦸`,text:`Who protects the family?`},{icon:`💪`,text:`Who is physically strongest?`},{icon:`🧠`,text:`Who is smartest?`},{icon:`🎨`,text:`Who is most creative?`},{icon:`⚽`,text:`Who is best at sports?`},{icon:`🎵`,text:`Who sings the best?`}],experiences:[{icon:`✈️`,text:`Who has flown on a plane?`},{icon:`🏊`,text:`Who has swum in the ocean?`},{icon:`🏔️`,text:`Who has climbed a mountain?`},{icon:`🎭`,text:`Who has acted in a play?`},{icon:`🎤`,text:`Who has sung in front of people?`},{icon:`🍳`,text:`Who has cooked a full meal?`},{icon:`🐕`,text:`Who has had a pet?`},{icon:`🚴`,text:`Who has cycled more than 10km?`},{icon:`🎮`,text:`Who has played games all night?`},{icon:`📚`,text:`Who has read a book in one day?`},{icon:`🎨`,text:`Who has drawn something impressive?`},{icon:`🏆`,text:`Who has won a competition?`},{icon:`🌙`,text:`Who has stayed up all night?`},{icon:`❄️`,text:`Who has seen snow?`},{icon:`🌋`,text:`Who has seen a volcano?`},{icon:`🦁`,text:`Who has seen a wild animal?`},{icon:`🎪`,text:`Who has been to a circus?`},{icon:`🎢`,text:`Who has ridden a roller coaster?`},{icon:`🏄`,text:`Who has surfed or skateboarded?`},{icon:`🎯`,text:`Who has hit a bullseye?`},{icon:`🎸`,text:`Who has played an instrument?`},{icon:`🗣️`,text:`Who speaks multiple languages?`},{icon:`🌟`,text:`Who has met someone famous?`},{icon:`🏥`,text:`Who has broken a bone?`},{icon:`🦷`,text:`Who has lost a tooth?`},{icon:`🚗`,text:`Who has been in a car accident?`},{icon:`✂️`,text:`Who has cut their own hair badly?`},{icon:`🎁`,text:`Who has kept a big secret?`},{icon:`😢`,text:`Who has cried at a movie?`},{icon:`😂`,text:`Who has laughed until crying?`},{icon:`🤕`,text:`Who has fainted?`},{icon:`🏃`,text:`Who has run a marathon?`},{icon:`🧗`,text:`Who has rock climbed?`},{icon:`🤿`,text:`Who has gone diving?`},{icon:`🚁`,text:`Who has been in a helicopter?`},{icon:`🚂`,text:`Who has ridden a train?`},{icon:`⛵`,text:`Who has sailed a boat?`},{icon:`🎿`,text:`Who has skied?`},{icon:`🏂`,text:`Who has snowboarded?`},{icon:`🛶`,text:`Who has canoed or kayaked?`}],habits:[{icon:`🛁`,text:`Who takes baths instead of showers?`},{icon:`☕`,text:`Who drinks coffee every morning?`},{icon:`🍵`,text:`Who drinks tea daily?`},{icon:`🥤`,text:`Who drinks soda daily?`},{icon:`💧`,text:`Who drinks enough water?`},{icon:`🍎`,text:`Who eats fruits daily?`},{icon:`🥗`,text:`Who eats vegetables daily?`},{icon:`🍕`,text:`Who loves pizza?`},{icon:`🍔`,text:`Who loves burgers?`},{icon:`🍦`,text:`Who eats ice cream weekly?`},{icon:`🍰`,text:`Who has a sweet tooth?`},{icon:`🥛`,text:`Who drinks milk?`},{icon:`🧀`,text:`Who loves cheese?`},{icon:`🌶️`,text:`Who eats spicy food?`},{icon:`🐟`,text:`Who eats fish?`},{icon:`🥩`,text:`Who eats red meat?`},{icon:`🥬`,text:`Who is vegetarian?`},{icon:`🌱`,text:`Who is vegan?`},{icon:`🚭`,text:`Who has tried smoking?`},{icon:`🍺`,text:`Who has tried alcohol?`},{icon:`😴`,text:`Who sleeps before midnight?`},{icon:`⏰`,text:`Who uses an alarm clock?`},{icon:`📖`,text:`Who reads before bed?`},{icon:`📱`,text:`Who scrolls phone before sleeping?`},{icon:`🧘`,text:`Who meditates?`},{icon:`🏃`,text:`Who exercises daily?`},{icon:`🚶`,text:`Who walks 10,000 steps daily?`},{icon:`💊`,text:`Who takes vitamins?`},{icon:`🦷`,text:`Who flosses daily?`},{icon:`🚿`,text:`Who showers twice daily?`}],embarrassing:[{icon:`🚽`,text:`Who has walked into a glass door?`},{icon:`👖`,text:`Who has worn clothes inside out all day?`},{icon:`📢`,text:`Who has called a teacher "Mom" or "Dad"?`},{icon:`📱`,text:`Who has sent a text to the wrong person?`},{icon:`😰`,text:`Who has waved back at someone who was not waving at them?`},{icon:`🚿`,text:`Who has forgotten to turn off the shower when done?`},{icon:`👗`,text:`Who has had a wardrobe malfunction?`},{icon:`🚗`,text:`Who has locked keys in the car?`},{icon:`🏠`,text:`Who has locked themselves out of the house?`},{icon:`🛒`,text:`Who has forgotten to pay at the store?`},{icon:`📞`,text:`Who has answered their phone in a quiet place by accident?`},{icon:`🎤`,text:`Who has sung the wrong lyrics out loud?`},{icon:`👋`,text:`Who has tripped in public?`},{icon:`🥛`,text:`Who has spilled a drink on someone?`},{icon:`🍽️`,text:`Who has choked on food in public?`},{icon:`😴`,text:`Who has fallen asleep in class?`},{icon:`💨`,text:`Who has accidentally passed gas in public?`},{icon:`👃`,text:`Who has had a runny nose in public?`},{icon:`😳`,text:`Who has blushed so hard it was obvious?`},{icon:`📣`,text:`Who has screamed in a public place by accident?`}],opinions:[{icon:`👻`,text:`Who believes in ghosts?`},{icon:`🔮`,text:`Who believes in astrology?`},{icon:`🧲`,text:`Who believes in luck?`},{icon:`👽`,text:`Who believes in aliens?`},{icon:`🦄`,text:`Who believes unicorns exist?`},{icon:`🌈`,text:`Who believes in magic?`},{icon:`☀️`,text:`Who is an early bird?`},{icon:`🦉`,text:`Who is a night owl?`},{icon:`🏠`,text:`Who prefers staying home over going out?`},{icon:`✈️`,text:`Who loves traveling?`},{icon:`📚`,text:`Who prefers books over movies?`},{icon:`🎬`,text:`Who prefers movies over books?`},{icon:`🎮`,text:`Who prefers video games over sports?`},{icon:`⚽`,text:`Who prefers sports over video games?`},{icon:`🍕`,text:`Who is a picky eater?`},{icon:`🌮`,text:`Who tries any food once?`},{icon:`😴`,text:`Who needs 8+ hours of sleep?`},{icon:`☕`,text:`Who can function on little sleep?`},{icon:`📱`,text:`Who could live without phone?`},{icon:`🚗`,text:`Who prefers driving over walking?`}],relationships:[{icon:`💕`,text:`Who has a crush right now?`},{icon:`💔`,text:`Who has been heartbroken?`},{icon:`💍`,text:`Who believes in love at first sight?`},{icon:`👫`,text:`Who has the most friends?`},{icon:`🤝`,text:`Who makes friends easily?`},{icon:`🦸`,text:`Who is the protector of the group?`},{icon:`😢`,text:`Who takes longest to forgive?`},{icon:`💪`,text:`Who would survive a zombie apocalypse?`},{icon:`🏃`,text:`Who would you call in an emergency?`},{icon:`🎭`,text:`Who changes personality around others?`}],hypothetical:[{icon:`🏝️`,text:`Who would survive on a deserted island?`},{icon:`🕐`,text:`If you could stop time, what would you do?`},{icon:`🦄`,text:`If you could be any animal, what would you be?`},{icon:`🚀`,text:`If you could travel anywhere, where would you go?`},{icon:`🎁`,text:`If you could have any superpower, what would you choose?`},{icon:`💰`,text:`If you won the lottery, what would you buy first?`},{icon:`👥`,text:`If you could meet anyone, who would it be?`},{icon:`📚`,text:`If you could learn any skill instantly, what would it be?`},{icon:`🏠`,text:`If you could live anywhere, where would it be?`},{icon:`⏰`,text:`If you could redo one moment, what would it be?`},{icon:`🌟`,text:`If you could be famous for one thing, what would it be?`},{icon:`🤖`,text:`If you could invent something, what would it be?`},{icon:`🎬`,text:`If you could star in any movie, which would it be?`},{icon:`🎵`,text:`If you could sing a duet with anyone, who?`},{icon:`👗`,text:`If you could wear any clothes forever, what style?`}]},t=[];Object.values(e).forEach(e=>{t.push(...e)});let n=[...t];for(let e=0;e<5;e++)t.forEach(e=>{n.push({icon:e.icon,text:e.text})});return n}static generateDareChallenges(){let e={physical:[{icon:`🦘`,text:`Do 20 jumping jacks`},{icon:`🏃`,text:`Run in place for 30 seconds`},{icon:`🧘`,text:`Hold a plank for 30 seconds`},{icon:`🦵`,text:`Do 10 squats`},{icon:`🏋️`,text:`Do 10 push-ups`},{icon:`🤸`,text:`Do 5 cartwheels`},{icon:`🦘`,text:`Jump as high as you can 5 times`},{icon:`🧍`,text:`Walk like a penguin for 1 minute`},{icon:`🐔`,text:`Walk like a chicken for 1 minute`},{icon:`🐍`,text:`Slither on the floor like a snake`},{icon:`🦋`,text:`Flap arms like a bird for 30 seconds`},{icon:`🦍`,text:`Beat your chest like a gorilla`},{icon:`🐸`,text:`Croak and jump like a frog 5 times`},{icon:`🦘`,text:`Kangaroo hop across the room`},{icon:`🕷️`,text:`Walk on all fours like a spider`},{icon:`🦀`,text:`Walk sideways like a crab for 30 seconds`},{icon:`🐛`,text:`Crawl like a caterpillar`},{icon:`🦆`,text:`Waddle like a duck around the room`},{icon:`🐺`,text:`Howl like a wolf`},{icon:`🦁`,text:`Roar like a lion`},{icon:`🐒`,text:`Scratch your head and rub your belly`},{icon:`⛹️`,text:`Bounce a ball while standing`},{icon:`🎾`,text:`Toss and catch an object 10 times`},{icon:`🧦`,text:`Remove and put on socks without using hands`},{icon:`👟`,text:`Walk backwards for 30 seconds`},{icon:`🔄`,text:`Spin around 10 times then walk straight`},{icon:`⚽`,text:`Kick a ball against a wall 10 times`},{icon:`🏀`,text:`Dribble an imaginary ball`},{icon:`🎳`,text:`Do a bowling motion and celebrate`},{icon:`⛷️`,text:`Do a skiing motion across the room`}],vocal:[{icon:`🎤`,text:`Sing the alphabet backwards`},{icon:`🎵`,text:`Hum a song, others must guess`},{icon:`🎤`,text:`Sing your favorite song dramatically`},{icon:`🗣️`,text:`Speak without using the letter "E"`},{icon:`🤫`,text:`Whisper everything for 3 rounds`},{icon:`📢`,text:`Speak loudly for 3 rounds`},{icon:`🎭`,text:`Do 5 different animal sounds`},{icon:`🦆`,text:`Speak only in duck sounds for 1 minute`},{icon:`🎺`,text:`Beatbox for 30 seconds`},{icon:`🎻`,text:`Mimic playing an instrument`},{icon:`🚗`,text:`Make car sounds while walking`},{icon:`🚂`,text:`Choo-choo train sounds across the room`},{icon:`✈️`,text:`Make airplane sounds with your mouth`},{icon:`🔔`,text:`Ring a bell sound with your mouth`},{icon:`🎵`,text:`Rap about the person to your left`},{icon:`🎤`,text:`Sing a lullaby in a funny voice`},{icon:`🗣️`,text:`Talk like a robot for 2 rounds`},{icon:`👽`,text:`Talk like an alien for 2 rounds`},{icon:`👴`,text:`Talk like your grandparent`},{icon:`👶`,text:`Talk in baby voice for 2 rounds`},{icon:`🏃`,text:`Give a sports commentary while walking`},{icon:`📺`,text:`Be a news anchor reporting nonsense`},{icon:`🎬`,text:`Do a movie trailer voiceover`},{icon:`🦸`,text:`Speak like a superhero for 3 rounds`},{icon:`😈`,text:`Speak like a villain for 3 rounds`}],acting:[{icon:`😴`,text:`Pretend to be sleeping for 30 seconds`},{icon:`🤕`,text:`Act out being sick for 30 seconds`},{icon:`😱`,text:`Act out being scared for 30 seconds`},{icon:`🥰`,text:`Act out being in love for 30 seconds`},{icon:`😠`,text:`Act out being angry for 30 seconds`},{icon:`😂`,text:`Act out laughing without smiling`},{icon:`😢`,text:`Act out crying dramatically`},{icon:`🤔`,text:`Act out thinking deeply`},{icon:`😋`,text:`Act out eating something delicious`},{icon:`🤮`,text:`Act out eating something disgusting`},{icon:`🏃`,text:`Act out running a marathon`},{icon:`🧗`,text:`Act out climbing a mountain`},{icon:`🏊`,text:`Act out swimming`},{icon:`🚴`,text:`Act out riding a bicycle`},{icon:`✈️`,text:`Act out being on an airplane`},{icon:`🚀`,text:`Act out launching into space`},{icon:`🦸`,text:`Act out being a superhero`},{icon:`🧙`,text:`Act out being a wizard`},{icon:`🤖`,text:`Act out being a robot`},{icon:`👻`,text:`Act out being a ghost`},{icon:`🦕`,text:`Act out being a dinosaur`},{icon:`🌳`,text:`Act out being a tree`},{icon:`🌻`,text:`Act out being a sunflower`},{icon:`⏰`,text:`Act out being a clock`},{icon:`📱`,text:`Act out being obsessed with phone`},{icon:`🍕`,text:`Act out eating pizza`},{icon:`🧊`,text:`Act out melting like ice cream`},{icon:`🎈`,text:`Act out floating away like a balloon`},{icon:`⚡`,text:`Act out being struck by lightning`},{icon:`🌪️`,text:`Act out being in a tornado`}],creative:[{icon:`🎨`,text:`Draw a self-portrait blindfolded`},{icon:`🎨`,text:`Draw the person to your right`},{icon:`🎨`,text:`Draw using only your feet`},{icon:`🎨`,text:`Draw with your non-dominant hand`},{icon:`📝`,text:`Write your name with your eyes closed`},{icon:`🎭`,text:`Tell a story in 30 seconds`},{icon:`🎬`,text:`Act out a movie scene without speaking`},{icon:`📷`,text:`Strike 3 different poses`},{icon:`🗿`,text:`Make a sculpture with available items`},{icon:`🎵`,text:`Create a new dance move`},{icon:`📢`,text:`Make up a commercial for nothing`},{icon:`🎤`,text:` freestyle rap for 30 seconds`},{icon:`📜`,text:`Tell a joke in 20 seconds`},{icon:`🎭`,text:`Impersonate someone in the room`},{icon:`🎬`,text:`Create a mini movie scene`},{icon:`🖌️`,text:`Draw on your face with imaginary marker`},{icon:`👔`,text:`Tie an imaginary tie`},{icon:`👗`,text:`Model imaginary clothes`},{icon:`🍳`,text:`Act out cooking a meal`},{icon:`🌿`,text:`Create a bouquet with imaginary flowers`}],social:[{icon:`🤝`,text:`Give a compliment to everyone in the room`},{icon:`🙇`,text:`Bow to everyone like a royal`},{icon:`🤗`,text:`Give the person to your left a hug`},{icon:`👋`,text:`Wave at everyone as if on a talk show`},{icon:`🙏`,text:`Give a fake speech about nothing`},{icon:`👑`,text:`Give someone a crown and bow to them`},{icon:`🏆`,text:`Present an imaginary award to someone`},{icon:`📸`,text:`Take an imaginary selfie with everyone`},{icon:`🤝`,text:`Shake hands with everyone as a politician`},{icon:`💌`,text:`Deliver a love letter to an object`}],misc:[{icon:`🙈`,text:`Cover your eyes for 2 minutes`},{icon:`🤫`,text:`Do not speak for 3 rounds`},{icon:`🦶`,text:`Balance on one foot for 30 seconds`},{icon:`👀`,text:`Close your eyes and walk 10 steps`},{icon:`🔇`,text:`Mute yourself for the next game`},{icon:`😵`,text:`Spin 5 times then try to walk straight`},{icon:`🎯`,text:`Throw an imaginary dart`},{icon:`🎳`,text:`Roll an imaginary bowling ball`},{icon:`🏹`,text:`Shoot an imaginary arrow`},{icon:`⚾`,text:`Pitch an imaginary baseball`},{icon:`🥊`,text:`Shadowbox for 30 seconds`},{icon:`🧘`,text:`Do the tree pose for 30 seconds`},{icon:`🧘`,text:`Do the warrior pose for 30 seconds`},{icon:`🙆`,text:`Do headstands against a wall`},{icon:`💃`,text:`Do the moonwalk across the room`},{icon:`🕺`,text:`Do a wiggle dance`},{icon:`💫`,text:`Do a spinning dance move`},{icon:`🦘`,text:`Do a jumping jack dance`},{icon:`🐍`,text:`Do a snake dance`},{icon:`🌊`,text:`Do a wave dance`}]},t=[];Object.values(e).forEach(e=>{t.push(...e)});let n=[...t];for(let e=0;e<5;e++)t.forEach(e=>{n.push({icon:e.icon,text:e.text})});return n}static generateNeverHaveIEver(){return[{icon:`✈️`,text:`Been on an airplane`},{icon:`🏊`,text:`Swum in the ocean`},{icon:`🏔️`,text:`Climbed a mountain`},{icon:`🎭`,text:`Acted in a play`},{icon:`🎤`,text:`Sang in front of people`},{icon:`🍳`,text:`Cooked a full meal alone`},{icon:`🐕`,text:`Owned a pet`},{icon:`🚴`,text:`Cycled more than 10km`},{icon:`🎮`,text:`Played video games all night`},{icon:`📚`,text:`Read a book in one day`},{icon:`🎨`,text:`Drawn something impressive`},{icon:`🏆`,text:`Won a competition`},{icon:`🌙`,text:`Stayed up all night`},{icon:`❄️`,text:`Seen snow`},{icon:`🌋`,text:`Seen a volcano`},{icon:`🦁`,text:`Seen a wild animal up close`},{icon:`🎪`,text:`Been to a circus`},{icon:`🎢`,text:`Ridden a roller coaster`},{icon:`🏄`,text:`Surfed or skateboarded`},{icon:`🎯`,text:`Hit a bullseye`},{icon:`🎸`,text:`Played a musical instrument`},{icon:`🗣️`,text:`Spoken multiple languages`},{icon:`🌟`,text:`Met someone famous`},{icon:`🏥`,text:`Broken a bone`},{icon:`🦷`,text:`Lost a tooth`},{icon:`🚗`,text:`Been in a car accident`},{icon:`✂️`,text:`Cut own hair badly`},{icon:`🎁`,text:`Kept a big secret`},{icon:`😢`,text:`Cried at a movie`},{icon:`😂`,text:`Laughed until I cried`},{icon:`🤕`,text:`Fainted`},{icon:`🏃`,text:`Run a marathon`},{icon:`🧗`,text:`Rock climbed`},{icon:`🤿`,text:`Gone diving`},{icon:`🚁`,text:`Been in a helicopter`},{icon:`🚂`,text:`Ridden a train`},{icon:`⛵`,text:`Sailed a boat`},{icon:`🎿`,text:`Skied`},{icon:`🏂`,text:`Snowboarded`},{icon:`🛶`,text:`Canoed or kayaked`},{icon:`🏹`,text:`Shot a bow and arrow`},{icon:`🔫`,text:`Played paintball`},{icon:`⚔️`,text:`Fenced`},{icon:`🥊`,text:`Boxed`},{icon:`🤼`,text:`Wrestled`},{icon:`🏊`,text:`Won a swimming race`},{icon:`⚽`,text:`Scored a goal`},{icon:`🏀`,text:`Made a basketball shot`},{icon:`🎾`,text:`Played tennis`},{icon:`🏐`,text:`Played volleyball`},{icon:`🏉`,text:`Played rugby`},{icon:`🎳`,text:`Bowled a strike`},{icon:`🎱`,text:`Pocketed all pool balls`},{icon:`🎯`,text:`Thrown darts`},{icon:`🎮`,text:`Won at arcade`},{icon:`🕹️`,text:`Speedrun a game`},{icon:`👑`,text:`Won a crown or title`},{icon:`🎓`,text:`Graduated`},{icon:`📜`,text:`Written a story`},{icon:`🎬`,text:`Made a video`},{icon:`📷`,text:`Taken a professional photo`},{icon:`🎙️`,text:`Recorded a podcast`},{icon:`📺`,text:`Been on TV`},{icon:`🎥`,text:`Been in a movie`},{icon:`🎤`,text:`Had a viral moment`},{icon:`💰`,text:`Earned my own money`},{icon:`💸`,text:`Lost a lot of money`},{icon:`🎁`,text:`Received a surprise party`},{icon:`🎂`,text:`Baked a cake`},{icon:`🍕`,text:`Made pizza from scratch`},{icon:`🍝`,text:`Made pasta from scratch`},{icon:`🍞`,text:`Baked bread`},{icon:`🍦`,text:`Made ice cream`},{icon:`🥤`,text:`Made a smoothie`},{icon:`☕`,text:`Made coffee`},{icon:`🍵`,text:`Made tea`},{icon:`🍺`,text:`Made beer`},{icon:`🍷`,text:`Made wine`},{icon:`🧪`,text:`Done a science experiment`},{icon:`🔬`,text:`Visited a science lab`},{icon:`🏛️`,text:`Visited a museum`},{icon:`🎨`,text:`Visited an art gallery`},{icon:`🏰`,text:`Visited a castle`},{icon:`⛪`,text:`Visited a church`},{icon:`🕌`,text:`Visited a mosque`},{icon:`🛕`,text:`Visited a temple`},{icon:`🏛️`,text:`Visited ruins`},{icon:`🎭`,text:`Seen a Broadway show`},{icon:`🎤`,text:`Been to a concert`},{icon:`🎧`,text:`Met a musician`},{icon:`⚽`,text:`Been to a stadium`},{icon:`🏟️`,text:`Been to a world cup event`},{icon:`🎬`,text:`Met an actor`},{icon:`📚`,text:`Met an author`},{icon:`🧑‍🚀`,text:`Met an astronaut`},{icon:`👨‍⚕️`,text:`Met a doctor`},{icon:`👨‍🏫`,text:`Met a teacher who inspired me`},{icon:`🦸`,text:`Met a hero`},{icon:`👑`,text:`Met royalty`},{icon:`🤝`,text:`Shaken hands with someone famous`},{icon:`📸`,text:`Taken a selfie with a celebrity`},{icon:`🌉`,text:`Been to a famous bridge`},{icon:`🏗️`,text:`Seen the Eiffel Tower`},{icon:`🗿`,text:`Seen the pyramids`},{icon:`🏔️`,text:`Seen Mt. Everest`},{icon:`🌋`,text:`Seen an active volcano`},{icon:`🌊`,text:`Seen a tsunami`},{icon:`🌈`,text:`Seen a rainbow`},{icon:`⭐`,text:`Seen a shooting star`},{icon:`🌙`,text:`Walked on the moon (in VR)`},{icon:`👽`,text:`Seen a UFO`},{icon:`🦄`,text:`Believed in unicorns as a kid`},{icon:`🧙`,text:`Believed in wizards as a kid`},{icon:`👻`,text:`Thought I saw a ghost`},{icon:`💀`,text:`Been scared of the dark`},{icon:`🕷️`,text:`Caught a spider`},{icon:`🐍`,text:`Held a snake`},{icon:`🦎`,text:`Held a lizard`},{icon:`🐸`,text:`Held a frog`},{icon:`🦋`,text:`Held a butterfly`},{icon:`🐢`,text:`Held a turtle`},{icon:`🦀`,text:`Caught a crab`},{icon:`🐙`,text:`Touched an octopus`},{icon:`🦈`,text:`Seen a shark`},{icon:`🐬`,text:`Swum with dolphins`},{icon:`🐋`,text:`Seen a whale`},{icon:`🐠`,text:`Seen a clownfish`},{icon:`🦈`,text:`Feared sharks`},{icon:`🦅`,text:`Fed a bird`},{icon:`🦆`,text:`Ridden a horse`},{icon:`🐴`,text:`Galloped on horseback`},{icon:`🐫`,text:`Ridden a camel`},{icon:`🐘`,text:`Ridden an elephant`},{icon:`🦒`,text:`Fed a giraffe`},{icon:`🦙`,text:`Touched a llama`},{icon:`🐕`,text:`Walked a dog`},{icon:`🐈`,text:`Adopted a pet`},{icon:`🐹`,text:`Owned a hamster`},{icon:`🐰`,text:`Owned a rabbit`},{icon:`🦜`,text:`Owned a bird`},{icon:`🐠`,text:`Had an aquarium`},{icon:`🦂`,text:`Been stung by a scorpion`},{icon:`🐝`,text:`Been stung by a bee`},{icon:`🦟`,text:`Been bitten by a mosquito`},{icon:`🕷️`,text:`Been bitten by a spider`},{icon:`🐕`,text:`Been bitten by a dog`},{icon:`🐈`,text:`Been scratched by a cat`}]}static generateWouldYouRather(){return[{icon:`🦅`,text:`Fly or be invisible?`},{icon:`🐟`,text:`Breathe underwater or fly in space?`},{icon:`📱`,text:`No internet or no AC?`},{icon:`🌍`,text:`Travel the world or live in one place?`},{icon:`💰`,text:`Be rich or famous?`},{icon:`🐕`,text:`Be a dog or cat?`},{icon:`🍕`,text:`Never eat pizza or ice cream?`},{icon:`⏰`,text:`Never sleep or never eat?`},{icon:`🌊`,text:`Be at the beach or mountains?`},{icon:`🎭`,text:`Be funny or smart?`},{icon:`📚`,text:`Read minds or predict future?`},{icon:`🦄`,text:`Have a dragon or unicorn?`},{icon:`🏠`,text:`Live in a treehouse or cave?`},{icon:`⛈️`,text:`Control weather or read thoughts?`},{icon:`🎨`,text:`Paint or play music?`},{icon:`🍳`,text:`Cook or clean?`},{icon:`📺`,text:`Never watch TV or movies?`},{icon:`🎮`,text:`Play games or play sports?`},{icon:`🦸`,text:`Be a hero or have a hero?`},{icon:`🌙`,text:`Be nocturnal or diurnal?`},{icon:`🏰`,text:`Live in castle or spaceship?`},{icon:`🧟`,text:`Zombies or aliens?`},{icon:`🌈`,text:`Never see color or never hear music?`},{icon:`⏪`,text:`Go back or forward in time?`},{icon:`🌍`,text:`Speak all languages or play all instruments?`},{icon:`👀`,text:`Have x-ray vision or read minds?`},{icon:`💪`,text:`Be strongest or fastest?`},{icon:`🧠`,text:`Have perfect memory or forget everything?`},{icon:`⏳`,text:`Never age or never die?`},{icon:`🌟`,text:`Be the best or most loved?`},{icon:`💎`,text:`Have diamonds or gold?`},{icon:`🏆`,text:`Win an Olympic medal or Nobel prize?`},{icon:`🚀`,text:`Go to Mars or the bottom of the ocean?`},{icon:`🌳`,text:`Live in forest or city?`},{icon:`❄️`,text:`Live in Arctic or desert?`},{icon:`🏝️`,text:`Stranded on island or lost in jungle?`},{icon:`🎁`,text:`Give gifts or receive gifts?`},{icon:`🤝`,text:`Help others or be helped?`},{icon:`💕`,text:`Love deeply or be loved deeply?`},{icon:`🦋`,text:`Transform into animal or insect?`},{icon:`👻`,text:`Be ghost or vampire?`},{icon:`🦄`,text:`Have magic powers or super technology?`},{icon:`🧙`,text:`Be wizard or warrior?`},{icon:`🤖`,text:`Have robot servant or AI friend?`},{icon:`🌱`,text:`Grow own food or have endless money?`},{icon:`💧`,text:`Have endless water or endless food?`},{icon:`⚡`,text:`Be always happy or always wise?`},{icon:`🌅`,text:`Sunrise or sunset?`},{icon:`🌃`,text:`City night or starlit sky?`},{icon:`🍎`,text:`Apples or oranges?`},{icon:`☕`,text:`Coffee or tea?`},{icon:`🍺`,text:`Beer or wine?`},{icon:`🚬`,text:`Coke or Pepsi?`},{icon:`📖`,text:`Books or podcasts?`},{icon:`🎬`,text:`Movies or series?`},{icon:`🎮`,text:`Console or mobile games?`},{icon:`⚽`,text:`Soccer or basketball?`},{icon:`🏊`,text:`Swimming or running?`},{icon:`🎸`,text:`Guitar or drums?`},{icon:`🎨`,text:`Draw or sculpt?`},{icon:`📝`,text:`Write or speak?`},{icon:`🧩`,text:`Puzzles or mazes?`},{icon:`🎯`,text:`Strategy or luck games?`},{icon:`👥`,text:`Small party or big party?`},{icon:`🌍`,text:`Travel solo or with friends?`},{icon:`🏨`,text:`Hotel or camping?`},{icon:`🚗`,text:`Drive or be driven?`},{icon:`✈️`,text:`Window or aisle seat?`},{icon:`🏖️`,text:`Vacation or staycation?`},{icon:`🎁`,text:`Surprise or planned event?`},{icon:`🎂`,text:`Birthday or Christmas?`},{icon:`🌹`,text:`Roses or sunflowers?`},{icon:`🌙`,text:`Full moon or new moon?`},{icon:`⭐`,text:`Stars or clouds?`},{icon:`🌈`,text:`Rainbow or Northern Lights?`},{icon:`❄️`,text:`Snowflakes or raindrops?`},{icon:`🔥`,text:`Fire or ice?`},{icon:`💨`,text:`Wind or stillness?`},{icon:`🌊`,text:`Ocean or lake?`},{icon:`🏔️`,text:`Mountain or hill?`},{icon:`🌋`,text:`Active or dormant volcano?`},{icon:`🌲`,text:`Pine or deciduous forest?`},{icon:`🦁`,text:`Lions or tigers?`},{icon:`🐘`,text:`Elephants or whales?`},{icon:`🦅`,text:`Eagles or owls?`},{icon:`🐬`,text:`Dolphins or seals?`},{icon:`🐼`,text:`Pandas or koalas?`},{icon:`🦊`,text:`Foxes or wolves?`},{icon:`🐕`,text:`Dogs or cats?`},{icon:`🐴`,text:`Horses or ponies?`},{icon:`🐄`,text:`Cows or goats?`},{icon:`🐔`,text:`Chickens or ducks?`},{icon:`🦃`,text:`Turkeys or geese?`},{icon:`🐝`,text:`Bees or butterflies?`},{icon:`🐜`,text:`Ants or beetles?`},{icon:`🦎`,text:`Lizards or geckos?`},{icon:`🐍`,text:`Snakes or worms?`},{icon:`🐢`,text:`Turtles or tortoises?`},{icon:`🦀`,text:`Crabs or lobsters?`},{icon:`🦐`,text:`Shrimp or prawns?`},{icon:`🐙`,text:`Octopus or squid?`},{icon:`🦈`,text:`Sharks or orcas?`},{icon:`🐋`,text:`Blue whales or humpbacks?`},{icon:`🐠`,text:`Clownfish or angelfish?`},{icon:`🍎`,text:`Apples or pears?`},{icon:`🍌`,text:`Bananas or strawberries?`},{icon:`🍊`,text:`Oranges or tangerines?`},{icon:`🍇`,text:`Grapes or blueberries?`},{icon:`🍓`,text:`Strawberries or raspberries?`},{icon:`🍍`,text:`Pineapple or mango?`},{icon:`🥭`,text:`Mango or papaya?`},{icon:`🥥`,text:`Coconut or avocado?`},{icon:`🍋`,text:`Lemon or lime?`},{icon:`🍒`,text:`Cherries or plums?`},{icon:`🍑`,text:`Peaches or nectarines?`},{icon:`🥝`,text:`Kiwi or passion fruit?`},{icon:`🍈`,text:`Melon or watermelon?`},{icon:`🫐`,text:`Blackberries or blueberries?`},{icon:`🥦`,text:`Broccoli or cauliflower?`},{icon:`🥕`,text:`Carrots or celery?`},{icon:`🍅`,text:`Tomatoes or cucumbers?`},{icon:`🌽`,text:`Corn or peas?`},{icon:`🥔`,text:`Potatoes or sweet potatoes?`},{icon:`🧅`,text:`Onions or garlic?`},{icon:`🌶️`,text:`Mild or spicy?`},{icon:`🥬`,text:`Lettuce or spinach?`},{icon:`🥒`,text:`Cucumber or zucchini?`},{icon:`🍄`,text:`Mushrooms or truffles?`},{icon:`🌰`,text:`Chestnuts or hazelnuts?`},{icon:`🥜`,text:`Peanuts or almonds?`},{icon:`🌰`,text:`Walnuts or pecans?`},{icon:`🥛`,text:`Milk or dark chocolate?`},{icon:`🍦`,text:`Ice cream or gelato?`},{icon:`🍰`,text:`Cake or pie?`},{icon:`🍩`,text:`Donuts or cookies?`},{icon:`🍪`,text:`Chocolate chip or oatmeal raisin?`},{icon:`🥜`,text:`Peanut butter or almond butter?`},{icon:`🍞`,text:`Toast or pancakes?`},{icon:`🥚`,text:`Scrambled or fried eggs?`},{icon:`🥓`,text:`Bacon or sausage?`},{icon:`🧀`,text:`Cheddar or mozzarella?`},{icon:`🍕`,text:`Pepperoni or cheese pizza?`},{icon:`🌮`,text:`Tacos or burritos?`},{icon:`🌯`,text:`Wraps or sandwiches?`},{icon:`🍜`,text:`Noodles or rice?`},{icon:`🍝`,text:`Spaghetti or mac and cheese?`},{icon:`🍛`,text:`Curry or stir fry?`},{icon:`🍣`,text:`Sushi or ramen?`},{icon:`🥟`,text:`Dumplings or spring rolls?`},{icon:`🥘`,text:`Paella or risotto?`},{icon:`🍲`,text:`Soup or salad?`},{icon:`🥩`,text:`Steak or chicken?`},{icon:`🍖`,text:`Ribs or brisket?`},{icon:`🐟`,text:`Fish or seafood?`},{icon:`🦐`,text:`Shrimp or crab?`},{icon:`🦞`,text:`Lobster or crawfish?`},{icon:`🦀`,text:`Crab or scallops?`},{icon:`☕`,text:`Latte or cappuccino?`},{icon:`🍵`,text:`Green or black tea?`},{icon:`🥤`,text:`Soda or juice?`},{icon:`💧`,text:`Sparkling or still water?`},{icon:`🍺`,text:`IPA or lager?`},{icon:`🍷`,text:`Red or white wine?`},{icon:`🍸`,text:`Cocktails or mocktails?`}]}static generateRiddles(){return[{icon:`⏰`,text:`What has hands but cannot clap?`,answer:`⏰ A clock`},{icon:`💰`,text:`What has a head and a tail but no body?`,answer:`💰 A coin`},{icon:`🧱`,text:`What has many keys but cannot open any door?`,answer:`🎹 A piano`},{icon:`🌍`,text:`What has a head and a tail but no body?`,answer:`🐍 A snake`},{icon:`🏠`,text:`What building has the most stories?`,answer:`📚 The library`},{icon:`⭕`,text:`What has no start or end?`,answer:`⭕ A circle`},{icon:`🌹`,text:`What has thorns but is beautiful?`,answer:`🥀 A rose`},{icon:`🌽`,text:`What has ears but cannot hear?`,answer:`🌽 Corn`},{icon:`🧠`,text:`What opens everything but cannot enter?`,answer:`🧠 Mind`},{icon:`👣`,text:`The more you take, the more you leave behind?`,answer:`👣 Steps`},{icon:`📅`,text:`What goes up but never comes down?`,answer:`📈 Your age`},{icon:`🌂`,text:`What gets wetter as it dries?`,answer:`🧽 A towel`},{icon:`☀️`,text:`I am not alive, but I grow; no lungs, yet I need air`,answer:`🔥 Fire`},{icon:`🌱`,text:`I have branches but no fruit, trunk, or leaves`,answer:`🏦 Bank`},{icon:`🔒`,text:`What can you catch but not throw?`,answer:`🤧 A cold`},{icon:`👕`,text:`What has hands and a face but cannot smile?`,answer:`⏰ Clock`},{icon:`📖`,text:`What book has the most pages?`,answer:`📔 Phonebook`},{icon:`🧦`,text:`What has holes but holds water?`,answer:`🧽 Sponge`},{icon:`🌙`,text:`What has a neck but no head?`,answer:`👔 Bottle`},{icon:`🍎`,text:`What fruit can you never unwind?`,answer:`🍎 Apple of my eye`},{icon:`📚`,text:`What has words but never speaks?`,answer:`📖 Book`},{icon:`🎵`,text:`What has teeth but cannot bite?`,answer:`🪥 Comb`},{icon:`🌈`,text:`What disappears as soon as you name it?`,answer:`🤫 Silence`},{icon:`🏠`,text:`What has to be broken before you can use it?`,answer:`🥚 Egg`},{icon:`🌍`,text:`Where can you find cities, shops, and streets but no people?`,answer:`🗺️ Map`},{icon:`👀`,text:`What can travel around the world while staying in a corner?`,answer:`📮 Stamp`},{icon:`💡`,text:`What gets bigger when more is taken away?`,answer:`🕳️ Hole`},{icon:`🌊`,text:`What can be cracked, made, told, and played?`,answer:`😀 Joke`},{icon:`⏰`,text:`What runs but never walks?`,answer:`🚿 Water`},{icon:`🏠`,text:`What has legs but cannot walk?`,answer:`🪑 Table`},{icon:`🌹`,text:`What can make a loud noise without being upset?`,answer:`💥 Popcorn`},{icon:`🔑`,text:`What kind of room has no doors or windows?`,answer:`🍄 Mushroom`},{icon:`🎯`,text:`What has a bottom at the top?`,answer:`🦶 Leg`},{icon:`💎`,text:`What is cut on a table, but never eaten?`,answer:`🃏 Cards`},{icon:`🌙`,text:`What has hands but points?`,answer:`⏰ Clock`},{icon:`🔨`,text:`What can fill a room but takes no space?`,answer:`💡 Light`},{icon:`🧊`,text:`What melts in your mouth but not in your hand?`,answer:`🍬 Candy`},{icon:`📦`,text:`What has a spine but no bones?`,answer:`📚 Book`},{icon:`🌊`,text:`What gets wet while drying?`,answer:`🧽 Towel`},{icon:`🏃`,text:`What can run but never walks?`,answer:`🚿 Water`},{icon:`🎭`,text:`What has a head, a foot, and four legs?`,answer:`🛏️ Bed`},{icon:`🍎`,text:`What is red and points everywhere?`,answer:`🚨 Red light`},{icon:`👻`,text:`I am not afraid to be destroyed`,answer:`🧱 Brick`},{icon:`🌱`,text:`What grows when it eats?`,answer:`🔥 Fire`},{icon:`🎪`,text:`What belongs to you but others use it more?`,answer:`👤 Name`},{icon:`⏰`,text:`What is always in front of you but cannot be seen?`,answer:`�_future Future`},{icon:`🌈`,text:`What has 13 hearts but no organs?`,answer:`🃏 Deck of cards`},{icon:`🏠`,text:`What has 4 wheels and flies?`,answer:`🗑️ Garbage truck`},{icon:`🦆`,text:`What bird can lift the most weight?`,answer:`🦩 Crane`},{icon:`🎵`,text:`What can you hold without touching?`,answer:`🤔 Conversation`},{icon:`🌊`,text:`What can you drop without breaking?`,answer:`💧 Water`},{icon:`👕`,text:`What has thousands of needles but cannot sew?`,answer:`🧁 Hedgehog`},{icon:`🕐`,text:`What has rings but no fingers?`,answer:`📱 Phone`},{icon:`🍎`,text:`What is easy to get into but hard to get out of?`,answer:`🧊 Trouble`},{icon:`🏠`,text:`What has keys but no locks?`,answer:`🎹 Piano`},{icon:`🌙`,text:`What has a bark but no bite?`,answer:`🌳 Tree`},{icon:`👀`,text:`What can you see with your eyes closed?`,answer:`😴 Dreams`},{icon:`⏰`,text:`What goes up when rain comes down?`,answer:`☂️ Umbrella`},{icon:`🧊`,text:`What is as big as you but weighs nothing?`,answer:`🌈 Shadow`},{icon:`🦊`,text:`What has a tail and a head but no body?`,answer:`🪙 Coin`},{icon:`🍕`,text:`What has cheese but no milk?`,answer:`🍕 Pizza`},{icon:`🚗`,text:`What has wheels and moves but is not alive?`,answer:`🚗 Car`},{icon:`🏠`,text:`What has a roof and walls but is not a house?`,answer:`🌮 Taco`},{icon:`📖`,text:`What has pages but is not a book?`,answer:`🧑‍🤝‍🧑 Couple`},{icon:`🌟`,text:`What is always hungry and never satisfied?`,answer:`🔥 Fire`},{icon:`❄️`,text:`What melts in your mouth and in your hand?`,answer:`🧊 Ice`},{icon:`🌊`,text:`What can you make but cannot see?`,answer:`💨 Noise`},{icon:`🎯`,text:`What has arrows but cannot shoot?`,answer:`🧭 Compass`},{icon:`🏠`,text:`What has stairs but no steps?`,answer:`👔 Dresser`},{icon:`🌙`,text:`What is light as a feather but the strongest person cannot hold it?`,answer:`💨 Breath`},{icon:`🍎`,text:`What kind of apple is not an apple?`,answer:`🍎 Pineapple`},{icon:`🏃`,text:`What runs all day but never moves?`,answer:`⏰ Clock`},{icon:`🌲`,text:`What has leaves but is not a tree?`,answer:`📚 Book`},{icon:`👻`,text:`What has a face but no body?`,answer:`🃏 Playing card`},{icon:`💎`,text:`What is hard but not a rock?`,answer:`🦷 Tooth`},{icon:`🔑`,text:`What opens locks but has no key?`,answer:`🧠 Knowledge`},{icon:`🌈`,text:`What can be broken but never falls?`,answer:`🤝 Promise`},{icon:`🏠`,text:`What has a bed but never sleeps?`,answer:`🚗 Car`},{icon:`🍎`,text:`What fruit is never found in a fruit salad?`,answer:`🍎 Apple of discord`},{icon:`⏰`,text:`What can you hear but never see?`,answer:`🔊 Sound`},{icon:`🌙`,text:`What has hands but never claps?`,answer:`⏰ Clock`},{icon:`🦊`,text:`What is always wet but never cold?`,answer:`🌊 Ocean`},{icon:`🌟`,text:`What shines bright but is not alive?`,answer:`💡 Light bulb`},{icon:`🎵`,text:`What has keys that lock and open but no doors?`,answer:`🎹 Piano`},{icon:`🌊`,text:`What can you float in but never sink?`,answer:`🪂 Air`},{icon:`👕`,text:`What has a pocket but cannot carry money?`,answer:`🏕️ Tent`},{icon:`🏠`,text:`What has windows but no glass?`,answer:`🏠 House`},{icon:`🌈`,text:`What can be touched but cannot be seen?`,answer:`💨 Wind`},{icon:`🧊`,text:`What is cold and comes in cans?`,answer:`🥤 Soda`},{icon:`🔥`,text:`What never asks questions but needs answers?`,answer:`📞 Telephone`},{icon:`🏃`,text:`What has a head that never stops moving?`,answer:`💡 Light bulb`},{icon:`🎂`,text:`What has a birthday but never gets older?`,answer:`🎂 Cake`},{icon:`🌟`,text:`What can you serve but never eat?`,answer:`⚽ Ball`},{icon:`🏠`,text:`What has a thumb and four fingers but is not alive?`,answer:`🧤 Glove`},{icon:`🌊`,text:`What falls but never breaks?`,answer:`🌙 Night`},{icon:`🔒`,text:`What has a lock but no door?`,answer:`⌨️ Keyboard`},{icon:`🍎`,text:`What gets bigger when taken away?`,answer:`🕳️ Hole`},{icon:`👻`,text:`What walks through walls?`,answer:`🚪 Door`},{icon:`⭐`,text:`What has 13 hearts?`,answer:`🃏 Deck of cards`},{icon:`🌙`,text:`What has a head and a tail?`,answer:`🐱 Cat (penny)`},{icon:`💎`,text:`What is always in the past tense?`,answer:`👖 Pants`},{icon:`🎈`,text:`What goes up and down without moving?`,answer:`🌡️ Temperature`}]}static generateCharadesAnimals(){return[{icon:`🐕`,text:`🐕 Dog`},{icon:`🐈`,text:`🐈 Cat`},{icon:`🐘`,text:`🐘 Elephant`},{icon:`🦁`,text:`🦁 Lion`},{icon:`🐒`,text:`🐒 Monkey`},{icon:`🐦`,text:`🐦 Bird`},{icon:`🐍`,text:`🐍 Snake`},{icon:`🐇`,text:`🐇 Rabbit`},{icon:`🐴`,text:`🐴 Horse`},{icon:`🐷`,text:`🐷 Pig`},{icon:`🐔`,text:`🐔 Chicken`},{icon:`🦆`,text:`🦆 Duck`},{icon:`🦅`,text:`🦅 Eagle`},{icon:`🦉`,text:`🦉 Owl`},{icon:`🦜`,text:`🦜 Parrot`},{icon:`🦋`,text:`🦋 Butterfly`},{icon:`🐝`,text:`🐝 Bee`},{icon:`🐢`,text:`🐢 Turtle`},{icon:`🐊`,text:`🐊 Crocodile`},{icon:`🦎`,text:`🦎 Lizard`},{icon:`🐸`,text:`🐸 Frog`},{icon:`🦈`,text:`🦈 Shark`},{icon:`🐬`,text:`🐬 Dolphin`},{icon:`🐋`,text:`🐋 Whale`},{icon:`🐠`,text:`🐠 Fish`},{icon:`🦀`,text:`🦀 Crab`},{icon:`🦐`,text:`🦐 Shrimp`},{icon:`🐙`,text:`🐙 Octopus`},{icon:`🦑`,text:`🦑 Squid`},{icon:`🦀`,text:`🦀 Lobster`},{icon:`🐼`,text:`🐼 Panda`},{icon:`🐨`,text:`🐨 Koala`},{icon:`🦊`,text:`🦊 Fox`},{icon:`🐺`,text:`🐺 Wolf`},{icon:`🐻`,text:`🐻 Bear`},{icon:`🐯`,text:`🐯 Tiger`},{icon:`🦓`,text:`🦓 Zebra`},{icon:`🦒`,text:`🦒 Giraffe`},{icon:`🦘`,text:`🦘 Kangaroo`},{icon:`🦥`,text:`🦥 Sloth`},{icon:`🦔`,text:`🦔 Hedgehog`},{icon:`🦡`,text:`🦡 Badger`},{icon:`🦫`,text:`🦫 Beaver`},{icon:`🦩`,text:`🦩 Flamingo`},{icon:`🦚`,text:`🦚 Peacock`},{icon:`🦆`,text:`🦆 Goose`},{icon:`🦃`,text:`�🦃 Turkey`},{icon:`🦢`,text:`🦢 Swan`},{icon:`🦜`,text:`🦜 Cockatoo`},{icon:`🦜`,text:`🦜 Macaw`},{icon:`🦜`,text:`🦜 Canary`},{icon:`🦜`,text:`🦜 Toucan`},{icon:`🦜`,text:`🦜 Hummingbird`},{icon:`🦜`,text:`🦜 Owl`},{icon:`🐛`,text:`🐛 Caterpillar`},{icon:`🪱`,text:`🪱 Earthworm`},{icon:`🐌`,text:`🐌 Snail`},{icon:`🦟`,text:`🦟 Mosquito`},{icon:`🪰`,text:`🪰 Fly`},{icon:`🪲`,text:`🪲 Beetle`},{icon:`🦗`,text:`🦗 Cricket`},{icon:`🦗`,text:`🦗 Grasshopper`},{icon:`🐜`,text:`🐜 Ant`},{icon:`🐜`,text:`🐜 Termite`},{icon:`🦂`,text:`🦂 Scorpion`},{icon:`🕷️`,text:`🕷️ Spider`},{icon:`🦠`,text:`🦠 Amoeba`},{icon:`🦠`,text:`🦠 Bacteria`},{icon:`🦠`,text:`🦠 Virus`},{icon:`🐳`,text:`🐳 Orca`},{icon:`🦭`,text:`🦭 Seal`},{icon:`🦦`,text:`🦦 Otter`},{icon:`🦫`,text:`🦫 Platypus`},{icon:`🦔`,text:`🦔 Porcupine`},{icon:`🦡`,text:`🦡 Skunk`},{icon:`🦨`,text:`🦨 Raccoon`},{icon:`🦝`,text:`🦝 Coati`},{icon:`🦝`,text:`🦝 Civet`},{icon:`🦛`,text:`🦛 Hippo`},{icon:`🦏`,text:`🦏 Rhino`},{icon:`🦬`,text:`🦬 Bison`},{icon:`🦌`,text:`🦌 Deer`},{icon:`🦙`,text:`🦙 Llama`},{icon:`🦌`,text:`🦌 Moose`},{icon:`🦫`,text:`🦫 Muskrat`},{icon:`🦦`,text:`🦦 Meerkat`},{icon:`🦥`,text:`🦥 Wombat`},{icon:`🦦`,text:`🦦 Sea otter`},{icon:`🦥`,text:`🦥 Armadillo`},{icon:`🦥`,text:`🦥 Anteater`},{icon:`🐃`,text:`🐃 Water buffalo`},{icon:`🐂`,text:`🐂 Ox`},{icon:`🐄`,text:`🐄 Cow`},{icon:`🐎`,text:`🐎 Pony`},{icon:`🐑`,text:`🐑 Sheep`},{icon:`🐐`,text:`🐐 Goat`},{icon:`🦙`,text:`🦙 Alpaca`},{icon:`🦙`,text:`🦙 Vicuna`},{icon:`🐪`,text:`🐪 Camel`},{icon:`🐫`,text:`🐫 Dromedary`},{icon:`🦌`,text:`🦌 Caribou`},{icon:`🦌`,text:`🦌 Elk`}]}static generateCharadesActions(){return[{icon:`🏃`,text:`🏃 Running`},{icon:`😴`,text:`😴 Sleeping`},{icon:`🍽️`,text:`🍽️ Eating`},{icon:`💃`,text:`💃 Dancing`},{icon:`🧘`,text:`🧘 Meditating`},{icon:`🏊`,text:`🏊 Swimming`},{icon:`🚴`,text:`🚴 Cycling`},{icon:`⛹️`,text:`⛹️ Playing ball`},{icon:`🎸`,text:`🎸 Playing guitar`},{icon:`📖`,text:`📖 Reading`},{icon:`✍️`,text:`✍️ Writing`},{icon:`🎨`,text:`🎨 Painting`},{icon:`🧹`,text:`🧹 Cleaning`},{icon:`🍳`,text:`🍳 Cooking`},{icon:`🛏️`,text:`🛏️ Making bed`},{icon:`🚿`,text:`🚿 Showering`},{icon:`🛁`,text:`🛁 Taking bath`},{icon:`🪥`,text:`🪥 Brushing teeth`},{icon:`💇`,text:`💇 Cutting hair`},{icon:`👔`,text:`👔 Tying tie`},{icon:`👗`,text:`👗 Getting dressed`},{icon:`🚗`,text:`🚗 Driving`},{icon:`✈️`,text:`✈️ Flying`},{icon:`🚢`,text:`🚢 Sailing`},{icon:`🚂`,text:`🚂 Riding train`},{icon:`🚌`,text:`🚌 Riding bus`},{icon:`🚶`,text:`🚶 Walking`},{icon:`🏃`,text:`🏃 Jogging`},{icon:`🧗`,text:`🧗 Climbing`},{icon:`🏄`,text:`🏄 Surfing`},{icon:`🎿`,text:`🎿 Skiing`},{icon:`⛷️`,text:`⛷️ Snowboarding`},{icon:`🛷`,text:`🛷 Sledding`},{icon:`⛸️`,text:`⛸️ Ice skating`},{icon:`🛼`,text:`🛼 Roller skating`},{icon:`🏄`,text:`🏄 Water skiing`},{icon:`🛶`,text:`🛶 Rowing`},{icon:`🚣`,text:`🚣 Kayaking`},{icon:`🤿`,text:`🤿 Diving`},{icon:`🎣`,text:`🎣 Fishing`},{icon:`🏹`,text:`🏹 Archery`},{icon:`🎯`,text:`🎯 Darts`},{icon:`🏀`,text:`🏀 Shooting hoops`},{icon:`⚽`,text:`⚽ Kicking ball`},{icon:`🏈`,text:`🏈 Throwing football`},{icon:`⚾`,text:`⚾ Pitching`},{icon:`🎾`,text:`🎾 Hitting tennis`},{icon:`🏓`,text:`🏓 Table tennis`},{icon:`🏸`,text:`🏸 Badminton`},{icon:`🥊`,text:`🥊 Boxing`},{icon:`🤼`,text:`🤼 Wrestling`},{icon:`🤸`,text:`🤸 Gymnastics`},{icon:`🏋️`,text:`🏋️ Weightlifting`},{icon:`🧘`,text:`🧘 Doing yoga`},{icon:`💪`,text:`💪 Flexing`},{icon:`🧍`,text:`🧍 Standing`},{icon:`🪑`,text:`🪑 Sitting`},{icon:`🛏️`,text:`🛏️ Lying down`},{icon:`🙆`,text:`🙆 Stretching`},{icon:`🙋`,text:`🙋 Raising hand`},{icon:`🤲`,text:`🤲 Praying`},{icon:`👏`,text:`👏 Clapping`},{icon:`🤝`,text:`🤝 Handshake`},{icon:`👋`,text:`👋 Waving`},{icon:`✋`,text:`✋ Stopping`},{icon:`👊`,text:`👊 Punching`},{icon:`🤜`,text:`🤜 Slapping`},{icon:`👋`,text:`👋 High five`},{icon:`🤞`,text:`🤞 Crossing fingers`},{icon:`✌️`,text:`✌️ Peace sign`},{icon:`👍`,text:`👍 Thumbs up`},{icon:`👎`,text:`👎 Thumbs down`},{icon:`🤙`,text:`🤙 Call me`},{icon:`👌`,text:`👌 Perfect`},{icon:`☝️`,text:`☝️ Pointing`},{icon:`👃`,text:`👃 Smelling`},{icon:`👅`,text:`👅 Tasting`},{icon:`👀`,text:`👀 Looking`},{icon:`👂`,text:`👂 Listening`},{icon:`🗣️`,text:`🗣️ Talking`},{icon:`😱`,text:`😱 Screaming`},{icon:`😂`,text:`😂 Crying`},{icon:`😭`,text:`😭 Sobbing`},{icon:`🤬`,text:`🤬 Cursing`},{icon:`😁`,text:`😁 Smiling`},{icon:`😠`,text:`😠 Angry`},{icon:`😮`,text:`😮 Surprised`},{icon:`🥱`,text:`🥱 Bored`},{icon:`😴`,text:`😴 Yawning`},{icon:`🤧`,text:`🤧 Sneezing`},{icon:`🤢`,text:`🤢 Vomiting`},{icon:`💩`,text:`💩 Pooping`},{icon:`🚽`,text:`🚽 Using toilet`},{icon:`🧻`,text:`🧻 Wiping`},{icon:`🚿`,text:`🚿 Washing`},{icon:`🧼`,text:`🧼 Washing hands`},{icon:`💇`,text:`💇 Hair dryer`},{icon:`🪒`,text:`🪒 Shaving`},{icon:`💅`,text:`💅 Painting nails`}]}static generateCharadesObjects(){return[{icon:`🚗`,text:`🚗 Car`},{icon:`✈️`,text:`✈️ Plane`},{icon:`🚢`,text:`🚢 Ship`},{icon:`🏠`,text:`🏠 House`},{icon:`🌳`,text:`🌳 Tree`},{icon:`☀️`,text:`☀️ Sun`},{icon:`🌙`,text:`🌙 Moon`},{icon:`⭐`,text:`⭐ Star`},{icon:`🏔️`,text:`🏔️ Mountain`},{icon:`🌊`,text:`🌊 Wave`},{icon:`🌈`,text:`🌈 Rainbow`},{icon:`⛈️`,text:`⛈️ Storm`},{icon:`❄️`,text:`❄️ Snowflake`},{icon:`🌧️`,text:`🌧️ Rain`},{icon:`🌪️`,text:`🌪️ Tornado`},{icon:`🌋`,text:`🌋 Volcano`},{icon:`🏜️`,text:`🏜️ Desert`},{icon:`🌲`,text:`🌲 Forest`},{icon:`🏝️`,text:`🏝️ Island`},{icon:`🏖️`,text:`🏖️ Beach`},{icon:`🌅`,text:`🌅 Sunrise`},{icon:`🌄`,text:`🌄 Sunset`},{icon:`🏕️`,text:`🏕️ Campfire`},{icon:`⛺`,text:`⛺ Tent`},{icon:`🏰`,text:`🏰 Castle`},{icon:`🗼`,text:`🗼 Tower`},{icon:`🗽`,text:`🗽 Statue`},{icon:`⛪`,text:`⛪ Church`},{icon:`🕌`,text:`🕌 Mosque`},{icon:`🛕`,text:`🛕 Temple`},{icon:`⛩️`,text:`⛩️ Shrine`},{icon:`🏛️`,text:`🏛️ Museum`},{icon:`🏥`,text:`🏥 Hospital`},{icon:`🏫`,text:`🏫 School`},{icon:`🏢`,text:`🏢 Office`},{icon:`🏪`,text:`🏪 Store`},{icon:`🏦`,text:`🏦 Bank`},{icon:`🏨`,text:`🏨 Hotel`},{icon:`🏩`,text:`🏩 Love hotel`},{icon:`🎠`,text:`🎠 Carousel`},{icon:`🎡`,text:`🎡 Ferris wheel`},{icon:`🎢`,text:`🎢 Roller coaster`},{icon:`🎪`,text:`🎪 Circus`},{icon:`🎭`,text:`🎭 Theater`},{icon:`🎬`,text:`🎬 Movie`},{icon:`📚`,text:`📚 Books`},{icon:`📖`,text:`📖 Book`},{icon:`📰`,text:`📰 Newspaper`},{icon:`📱`,text:`📱 Phone`},{icon:`💻`,text:`💻 Computer`},{icon:`📺`,text:`📺 TV`},{icon:`📷`,text:`📷 Camera`},{icon:`🎥`,text:`🎥 Video camera`},{icon:`📻`,text:`📻 Radio`},{icon:`🎮`,text:`🎮 Video game`},{icon:`🕹️`,text:`🕹️ Joystick`},{icon:`🎯`,text:`🎯 Target`},{icon:`🎲`,text:`🎲 Dice`},{icon:`🃏`,text:`🃏 Cards`},{icon:`♟️`,text:`♟️ Chess`},{icon:`🏆`,text:`🏆 Trophy`},{icon:`🥇`,text:`🥇 Gold medal`},{icon:`🎖️`,text:`🎖️ Medal`},{icon:`💍`,text:`💍 Ring`},{icon:`👑`,text:`👑 Crown`},{icon:`💎`,text:`💎 Diamond`},{icon:`💰`,text:`💰 Money`},{icon:`💵`,text:`💵 Dollar`},{icon:`🪙`,text:`🪙 Coin`},{icon:`🏦`,text:`🏦 ATM`},{icon:`💳`,text:`💳 Credit card`},{icon:`🧳`,text:`🧳 Suitcase`},{icon:`🎒`,text:`🎒 Backpack`},{icon:`👝`,text:`👝 Purse`},{icon:`👛`,text:`👛 Wallet`},{icon:`🔑`,text:`🔑 Key`},{icon:`🔒`,text:`🔒 Lock`},{icon:`🔓`,text:`🔓 Unlock`},{icon:`🔔`,text:`🔔 Bell`},{icon:`⏰`,text:`⏰ Alarm clock`},{icon:`⌚`,text:`⌚ Watch`},{icon:`🔦`,text:`🔦 Flashlight`},{icon:`🔋`,text:`🔋 Battery`},{icon:`🔌`,text:`🔌 Plug`},{icon:`💡`,text:`💡 Light bulb`},{icon:`🔌`,text:`🔌 Outlet`},{icon:`💻`,text:`💻 Laptop`},{icon:`🖥️`,text:`🖥️ Desktop`},{icon:`🖱️`,text:`🖱️ Mouse`},{icon:`⌨️`,text:`⌨️ Keyboard`},{icon:`📀`,text:`📀 DVD`},{icon:`💿`,text:`💿 CD`},{icon:`📼`,text:`📼 VHS`}]}static generateCharadesMovies(){return[{icon:`🦸`,text:`🦸 Superhero`},{icon:`👻`,text:`👻 Ghost`},{icon:`🤖`,text:`🤖 Robot`},{icon:`🧙`,text:`🧙 Wizard`},{icon:`🦖`,text:`🦖 Dinosaur`},{icon:`🧜`,text:`🧜 Mermaid`},{icon:`🧚`,text:`🧚 Fairy`},{icon:`🤴`,text:`🤴 Prince`},{icon:`👸`,text:`👸 Princess`},{icon:`🐉`,text:`🐉 Dragon`},{icon:`🧛`,text:`🧛 Vampire`},{icon:`🧟`,text:`🧟 Zombie`},{icon:`👽`,text:`👽 Alien`},{icon:`🚀`,text:`🚀 Space`},{icon:`🌌`,text:`🌌 Galaxy`},{icon:`🦈`,text:`🦈 Jaws`},{icon:`🐻`,text:`🐻 Bear`},{icon:`🦁`,text:`🦁 Lion King`},{icon:`🧚`,text:`🧚 Tinkerbell`},{icon:`🏴‍☠️`,text:`🏴‍☠️ Pirate`},{icon:`🗡️`,text:`🗡️ Sword`},{icon:`🛡️`,text:`🛡️ Shield`},{icon:`⚔️`,text:`⚔️ Battle`},{icon:`🏰`,text:`🏰 Castle`},{icon:`🧙`,text:`🧙 Harry Potter`},{icon:`🦸`,text:`🦸 Avengers`},{icon:`🕷️`,text:`🕷️ Spider-Man`},{icon:`🦇`,text:`🦇 Batman`},{icon:`🤖`,text:`🤖 Wall-E`},{icon:`👸`,text:`👸 Frozen`},{icon:`🐟`,text:`🐟 Finding Nemo`},{icon:`🐠`,text:`🐠 Finding Dory`},{icon:`🧞`,text:`🧞 Genie`},{icon:`🐘`,text:`🐘 Dumbo`},{icon:`🦒`,text:`🦒 Madagascar`},{icon:`🐼`,text:`🐼 Kung Fu Panda`},{icon:`🐯`,text:`🐯 Tiger`},{icon:`🐻`,text:`🐻 Winnie the Pooh`},{icon:`🐰`,text:`🐰 Bambi`},{icon:`🦊`,text:`🦊 Zootopia`},{icon:`🐷`,text:`🐷 Peppa Pig`},{icon:`🧸`,text:`🧸 Toy Story`},{icon:`🚗`,text:`🚗 Cars`},{icon:`👾`,text:`👾 Monsters Inc`},{icon:`👻`,text:`👻 Ghostbusters`},{icon:`🦖`,text:`🦖 Jurassic Park`},{icon:`🌋`,text:`🌋 Volcano`},{icon:`🏔️`,text:`🏔️ Everest`},{icon:`🌊`,text:`🌊 Titanic`},{icon:`🚀`,text:`🚀 Star Wars`},{icon:`⚡`,text:`⚡ Superhero`},{icon:`🔮`,text:`🔮 Crystal Ball`},{icon:`🧲`,text:`🧲 Magnet`},{icon:`🔭`,text:`🔭 Telescope`},{icon:`🔬`,text:`🔬 Science`},{icon:`🧪`,text:`🧪 Lab`},{icon:`🦠`,text:`🦠 Contagion`},{icon:`🦁`,text:`🦁 Jungle Book`},{icon:`🐒`,text:`🐒 Jungle`},{icon:`🦜`,text:`🦜 Pirates`},{icon:`🏴‍☠️`,text:`🏴‍☠️ Captain`},{icon:`🗺️`,text:`🗺️ Treasure Map`},{icon:`💎`,text:`💎 Heist`},{icon:`🚓`,text:`🚓 Police`},{icon:`🥷`,text:`🥷 Ninja`},{icon:`🤵`,text:`🤵 Spy`},{icon:`🦹`,text:`🦹 Supervillain`},{icon:`🕵️`,text:`🕵️ Detective`},{icon:`👨‍⚕️`,text:`👨‍⚕️ Doctor`},{icon:`👨‍🚀`,text:`👨‍🚀 Astronaut`},{icon:`🦸`,text:`🦸 Wonder Woman`},{icon:`🛡️`,text:`🛡️ Captain America`},{icon:`⚡`,text:`⚡ Thor`},{icon:`🦾`,text:`🦾 Iron Man`},{icon:`🕷️`,text:`🕷️ Venom`},{icon:`🦎`,text:`🦎 Godzilla`},{icon:`👹`,text:`👹 Monster`},{icon:`🤖`,text:`🤖 Transformers`},{icon:`🚀`,text:`🚀 Buzz Lightyear`},{icon:`🧸`,text:`🧸 Buzz`},{icon:`👽`,text:`👽 E.T.`},{icon:`👻`,text:`👻 Casper`},{icon:`🦇`,text:`🦇 Batman`},{icon:`🧙`,text:`🧙 Gandalf`},{icon:`⚔️`,text:`⚔️ Lord of Rings`},{icon:`🧝`,text:`🧝 Elf`},{icon:`🪓`,text:`🪓 Viking`},{icon:`🦄`,text:`🦄 Unicorn`},{icon:`🧚`,text:`🧚 Angel`},{icon:`😈`,text:`😈 Devil`},{icon:`👼`,text:`👼 Cupid`},{icon:`🦹`,text:`🦹 Cruella`},{icon:`🐺`,text:`🐺 Wolf`},{icon:`🐺`,text:`🐺 Big Bad Wolf`},{icon:`🦹`,text:`🦹 Maleficent`},{icon:`🧙`,text:`🧙 Witch`},{icon:`🧙`,text:`🧙 Wizard of Oz`},{icon:`🌈`,text:`🌈 Rainbow`},{icon:`🏠`,text:`🏠 Wizard`}]}static generateCharadesJobs(){return[{icon:`👨‍🍳`,text:`👨‍🍳 Chef`},{icon:`👨‍⚕️`,text:`👨‍⚕️ Doctor`},{icon:`👨‍🏫`,text:`👨‍🏫 Teacher`},{icon:`👮`,text:`👮 Police`},{icon:`🧑‍🔬`,text:`🧑‍🔬 Scientist`},{icon:`👨‍🎨`,text:`👨‍🎨 Artist`},{icon:`🧑‍🎤`,text:`🧑‍🎤 Singer`},{icon:`⚽`,text:`⚽ Athlete`},{icon:`🦸`,text:`🦸 Superhero`},{icon:`🧙`,text:`🧙 Magician`},{icon:`👨‍💼`,text:`👨‍💼 Businessman`},{icon:`👩‍💼`,text:`👩‍💼 Businesswoman`},{icon:`👨‍🚀`,text:`👨‍🚀 Astronaut`},{icon:`👨‍✈️`,text:`👨‍✈️ Pilot`},{icon:`🧑‍🚒`,text:`🧑‍🚒 Firefighter`},{icon:`👨‍🌾`,text:`👨‍🌾 Farmer`},{icon:`🧑‍🍳`,text:`🧑‍🍳 Cook`},{icon:`👨‍🏭`,text:`👨‍🏭 Factory worker`},{icon:`👷`,text:`👷 Construction worker`},{icon:`🧑‍🔧`,text:`🧑‍🔧 Mechanic`},{icon:`👨‍🎓`,text:`👨‍🎓 Student`},{icon:`👩‍🏫`,text:`👩‍🏫 Professor`},{icon:`👨‍💻`,text:`👨‍💻 Programmer`},{icon:`🧑‍🎨`,text:`🧑‍🎨 Designer`},{icon:`👨‍🎬`,text:`👨‍🎬 Director`},{icon:`🎬`,text:`🎬 Actor`},{icon:`📸`,text:`📸 Photographer`},{icon:`📺`,text:`📺 News anchor`},{icon:`🎙️`,text:`🎙️ DJ`},{icon:`📝`,text:`📝 Writer`},{icon:`📚`,text:`📚 Librarian`},{icon:`👨‍⚖️`,text:`👨‍⚖️ Judge`},{icon:`⚖️`,text:`⚖️ Lawyer`},{icon:`👨‍🔬`,text:`👨‍🔬 Researcher`},{icon:`👩‍🔬`,text:`👩‍🔬 Scientist`},{icon:`🧬`,text:`🧬 Biologist`},{icon:`🔬`,text:`🔬 Chemist`},{icon:`🔭`,text:`🔭 Astronomer`},{icon:`🗺️`,text:`🗺️ Geographer`},{icon:`🧪`,text:`🧪 Lab technician`},{icon:`🏥`,text:`🏥 Nurse`},{icon:`👩‍🍼`,text:`👩‍🍼 Dentist`},{icon:`👨‍🦷`,text:`👨‍🦷 Dentist`},{icon:`👩‍🦰`,text:`👩‍🦰 Vet`},{icon:`🐾`,text:`🐾 Animal doctor`},{icon:`👨‍🚒`,text:`👨‍🚒 Firefighter`},{icon:`🚒`,text:`🚒 Firefighter`},{icon:`🚑`,text:`🚑 Paramedic`},{icon:`🚓`,text:`🚓 Police officer`},{icon:`👮`,text:`👮 Detective`},{icon:`🕵️`,text:`🕵️ Spy`},{icon:`💂`,text:`💂 Guard`},{icon:`🥷`,text:`🥷 Ninja`},{icon:`🦸`,text:`🦸 Hero`},{icon:`🧑‍✈️`,text:`🧑‍✈️ Captain`},{icon:`🚢`,text:`🚢 Sailor`},{icon:`⚓`,text:`⚓ Fisherman`},{icon:`🐟`,text:`🐟 Fisher`},{icon:`🛶`,text:`🛶 Raft guide`},{icon:`🏄`,text:`🏄 Surfer`},{icon:`🤿`,text:`🤿 Diver`},{icon:`🏊`,text:`🏊 Swimmer`},{icon:`🏃`,text:`🏃 Runner`},{icon:`⚽`,text:`⚽ Footballer`},{icon:`🏀`,text:`🏀 Basketball player`},{icon:`🎾`,text:`🎾 Tennis player`},{icon:`🏆`,text:`🏆 Champion`},{icon:`🥊`,text:`🥊 Boxer`},{icon:`🤼`,text:`🤼 Wrestler`},{icon:`🎮`,text:`🎮 Gamer`},{icon:`🕹️`,text:`🕹️ Arcade player`},{icon:`👑`,text:`👑 King`},{icon:`👸`,text:`👸 Queen`},{icon:`🤴`,text:`🤴 Prince`},{icon:`🧙`,text:`🧙 Wizard`},{icon:`🦹`,text:`🦹 Villain`},{icon:`🧛`,text:`🧛 Vampire`},{icon:`🧟`,text:`🧟 Zombie`},{icon:`👻`,text:`👻 Ghost`},{icon:`🦇`,text:`🦇 Bat`},{icon:`🐺`,text:`🐺 Wolf`},{icon:`🦁`,text:`🦁 Lion`},{icon:`🐻`,text:`🐻 Bear`},{icon:`🦊`,text:`🦊 Fox`},{icon:`🐕`,text:`🐕 Dog`},{icon:`🐈`,text:`🐈 Cat`},{icon:`🦜`,text:`🦜 Parrot`},{icon:`🐍`,text:`🐍 Snake`},{icon:`🦎`,text:`🦎 Lizard`},{icon:`🐸`,text:`🐸 Frog`},{icon:`🐢`,text:`🐢 Turtle`},{icon:`🦂`,text:`🦂 Scorpion`},{icon:`🕷️`,text:`🕷️ Spider`},{icon:`🐝`,text:`🐝 Bee`},{icon:`🦋`,text:`🦋 Butterfly`},{icon:`🐛`,text:`🐛 Worm`},{icon:`🐠`,text:`🐠 Fish`},{icon:`🦈`,text:`🦈 Shark`},{icon:`🐬`,text:`🐬 Dolphin`}]}static generateEmojiWords(){return[{icon:`🍎`,text:`🍎 Apple`},{icon:`🌟`,text:`🌟 Star`},{icon:`🏠`,text:`🏠 House`},{icon:`🐕`,text:`🐕 Dog`},{icon:`🎂`,text:`🎂 Birthday`},{icon:`🌈`,text:`🌈 Rainbow`},{icon:`🎸`,text:`🎸 Guitar`},{icon:`🏖️`,text:`🏖️ Beach`},{icon:`🌙`,text:`🌙 Moon`},{icon:`🔥`,text:`🔥 Fire`},{icon:`⛄`,text:`⛄ Snowman`},{icon:`🎃`,text:`🎃 Halloween`},{icon:`🎄`,text:`🎄 Christmas`},{icon:`🌸`,text:`🌸 Cherry Blossom`},{icon:`🦋`,text:`🦋 Butterfly`},{icon:`🐢`,text:`🐢 Turtle`},{icon:`🦊`,text:`🦊 Fox`},{icon:`🐼`,text:`🐼 Panda`},{icon:`🦁`,text:`🦁 Lion`},{icon:`🐬`,text:`🐬 Dolphin`},{icon:`🌻`,text:`🌻 Sunflower`},{icon:`🌵`,text:`🌵 Cactus`},{icon:`🍕`,text:`🍕 Pizza`},{icon:`🍦`,text:`🍦 Ice Cream`},{icon:`🎪`,text:`🎪 Circus`},{icon:`🎭`,text:`🎭 Theater`},{icon:`🏰`,text:`🏰 Castle`},{icon:`🚀`,text:`🚀 Rocket`},{icon:`⚔️`,text:`⚔️ Sword`},{icon:`🛡️`,text:`🛡️ Shield`},{icon:`👑`,text:`👑 Crown`},{icon:`💎`,text:`💎 Diamond`},{icon:`💰`,text:`💰 Money bag`},{icon:`🔑`,text:`🔑 Key`},{icon:`🔒`,text:`🔒 Lock`},{icon:`📱`,text:`📱 Phone`},{icon:`💻`,text:`💻 Computer`},{icon:`🎮`,text:`🎮 Video game`},{icon:`📚`,text:`📚 Books`},{icon:`✏️`,text:`✏️ Pencil`},{icon:`🔬`,text:`🔬 Science`},{icon:`🎨`,text:`🎨 Art`},{icon:`🎵`,text:`🎵 Music`},{icon:`🎤`,text:`🎤 Microphone`},{icon:`🎬`,text:`🎬 Movie`},{icon:`📷`,text:`📷 Camera`},{icon:`🏖️`,text:`🏖️ Vacation`},{icon:`✈️`,text:`✈️ Airplane`},{icon:`🚗`,text:`🚗 Car`},{icon:`🚢`,text:`🚢 Ship`},{icon:`🏔️`,text:`🏔️ Mountain`},{icon:`🌊`,text:`🌊 Ocean`},{icon:`🌋`,text:`🌋 Volcano`},{icon:`🏝️`,text:`🏝️ Island`},{icon:`🌅`,text:`🌅 Sunrise`},{icon:`🌄`,text:`🌄 Sunset`},{icon:`🌌`,text:`🌌 Galaxy`},{icon:`⭐`,text:`⭐ Shooting star`},{icon:`🌈`,text:`🌈 Rainbow`},{icon:`⛈️`,text:`⛈️ Thunderstorm`},{icon:`❄️`,text:`❄️ Winter`},{icon:`☀️`,text:`☀️ Summer`},{icon:`🍂`,text:`🍂 Fall`},{icon:`🌱`,text:`🌱 Spring`},{icon:`🌹`,text:`🌹 Rose`},{icon:`🌺`,text:`🌺 Hibiscus`},{icon:`🍀`,text:`🍀 Lucky clover`},{icon:`🎋`,text:`🎋 Bamboo`},{icon:`🌲`,text:`🌲 Forest`},{icon:`🦒`,text:`🦒 Giraffe`},{icon:`🐘`,text:`🐘 Elephant`},{icon:`🦒`,text:`🦒 Long neck`},{icon:`🐍`,text:`🐍 Snake`},{icon:`🦎`,text:`🦎 Lizard`},{icon:`🐸`,text:`🐸 Frog`},{icon:`🦋`,text:`🦋 Metamorphosis`},{icon:`🐝`,text:`🐝 Bee`},{icon:`🐌`,text:`🐌 Snail`},{icon:`🦀`,text:`🦀 Crab`},{icon:`🦐`,text:`🦐 Shrimp`},{icon:`🦈`,text:`🦈 Shark`},{icon:`🐳`,text:`🐳 Whale`},{icon:`🦭`,text:`🦭 Seal`},{icon:`🐙`,text:`🐙 Octopus`},{icon:`🍕`,text:`🍕 Italian food`},{icon:`🍣`,text:`🍣 Sushi`},{icon:`🌮`,text:`🌮 Taco`},{icon:`🍔`,text:`🍔 Hamburger`},{icon:`🍟`,text:`🍟 French fries`},{icon:`🌭`,text:`🌭 Hot dog`},{icon:`🍩`,text:`🍩 Donut`},{icon:`🍪`,text:`🍪 Cookie`},{icon:`🍰`,text:`🍰 Cake`},{icon:`🍫`,text:`🍫 Chocolate`},{icon:`🍬`,text:`🍬 Candy`},{icon:`🍭`,text:`🍭 Lollipop`},{icon:`☕`,text:`☕ Coffee`},{icon:`🍵`,text:`🍵 Tea`},{icon:`🥛`,text:`🥛 Milk`}]}static generateScavengerItems(){return[{icon:`👟`,text:`👟 A shoe`},{icon:`🔑`,text:`🔑 Something with a key`},{icon:`📖`,text:`📖 A book`},{icon:`🎨`,text:`🎨 Something colorful`},{icon:`🌿`,text:`🌿 A plant or leaf`},{icon:`🍴`,text:`🍴 Something to eat with`},{icon:`👕`,text:`👕 Something you wear`},{icon:`🕶️`,text:`🕶️ Something with glass`},{icon:`📱`,text:`📱 Something electronic`},{icon:`🧸`,text:`🧸 Something soft`},{icon:`🎁`,text:`🎁 Something wrapped`},{icon:`🖊️`,text:`🖊️ Something to write with`},{icon:`🎵`,text:`🎵 Something musical`},{icon:`🏆`,text:`🏆 A trophy or medal`},{icon:`🪞`,text:`🪞 A mirror`},{icon:`👓`,text:`👓 Glasses`},{icon:`🧢`,text:`🧢 A hat`},{icon:`🧣`,text:`🧣 A scarf`},{icon:`🧤`,text:`🧤 Gloves`},{icon:`🧦`,text:`🧦 Socks`},{icon:`💍`,text:`💍 A ring`},{icon:`⏰`,text:`⏰ A clock`},{icon:`🔔`,text:`🔔 A bell`},{icon:`🕯️`,text:`🕯️ A candle`},{icon:`🏠`,text:`🏠 Something from your home`},{icon:`🖼️`,text:`🖼️ A picture frame`},{icon:`🗺️`,text:`🗺️ A map`},{icon:`📅`,text:`📅 A calendar`},{icon:`📁`,text:`📁 A folder`},{icon:`📦`,text:`📦 A box`},{icon:`🧲`,text:`🧲 A magnet`},{icon:`🔋`,text:`🔋 A battery`},{icon:`💡`,text:`💡 A light bulb`},{icon:`🔌`,text:`🔌 A plug`},{icon:`🎈`,text:`🎈 A balloon`},{icon:`🎀`,text:`🎀 A ribbon`},{icon:`🪆`,text:`🪆 A nesting doll`},{icon:`🧩`,text:`🧩 A puzzle piece`},{icon:`🎲`,text:`🎲 A die or dice`},{icon:`♟️`,text:`♟️ A chess piece`},{icon:`🃏`,text:`🃏 A playing card`},{icon:`🎯`,text:`🎯 A target`},{icon:`🏀`,text:`🏀 A ball`},{icon:`🎾`,text:`🎾 A tennis ball`},{icon:`⚽`,text:`⚽ A soccer ball`},{icon:`🏈`,text:`🏈 A football`},{icon:`⚾`,text:`⚾ A baseball`},{icon:`🏐`,text:`🏐 A volleyball`},{icon:`🥏`,text:`🥏 A frisbee`},{icon:`🎳`,text:`🎳 A bowling ball`},{icon:`🪁`,text:`🪁 A kite`},{icon:`🧸`,text:`🧸 A teddy bear`},{icon:`🎭`,text:`🎭 A mask`},{icon:`🎪`,text:`🎪 A circus item`},{icon:`🎨`,text:`🎨 A paintbrush`},{icon:`🖌️`,text:`🖌️ Paint`},{icon:`✏️`,text:`✏️ A pencil`},{icon:`🖊️`,text:`🖊️ A pen`},{icon:`📏`,text:`📏 A ruler`},{icon:`📐`,text:`📐 A protractor`},{icon:`✂️`,text:`✂️ Scissors`},{icon:`🖇️`,text:`🖇️ Paper clips`},{icon:`📌`,text:`📌 A pushpin`},{icon:`🗃️`,text:`🗃️ A file cabinet`},{icon:`🗄️`,text:`🗄️ A filing cabinet`},{icon:`📧`,text:`📧 An envelope`},{icon:`📮`,text:`📮 A mailbox`},{icon:`📬`,text:`📬 A mail slot`},{icon:`📪`,text:`📪 A flag`},{icon:`🚪`,text:`🚪 A door handle`},{icon:`🪑`,text:`🪑 A chair`},{icon:`🛏️`,text:`🛏️ A pillow`},{icon:`🛋️`,text:`🛋️ A couch cushion`},{icon:`🪟`,text:`🪟 A curtain`},{icon:`🪠`,text:`🪠 A plunger`},{icon:`🧰`,text:`🧰 A tool`},{icon:`🔧`,text:`🔧 A wrench`},{icon:`🔩`,text:`🔩 A bolt`},{icon:`🔨`,text:`🔨 A hammer`},{icon:`🪓`,text:`🪓 An axe`},{icon:`⛏️`,text:`⛏️ A pickaxe`},{icon:`🔪`,text:`🔪 A knife`},{icon:`🪃`,text:`🪃 A bow`},{icon:`🦯`,text:`🦯 A cane`},{icon:`🚴`,text:`🚴 A bicycle part`},{icon:`🔗`,text:`🔗 A chain`},{icon:`⛓️`,text:`⛓️ A padlock`},{icon:`💈`,text:`💈 A bar sign`},{icon:`🔭`,text:`🔭 A telescope`},{icon:`🔬`,text:`🔬 A microscope`}]}static generateDessertDares(){return[{icon:`😜`,text:`😜 Make a funny face`},{icon:`🎤`,text:`🎤 Sing a song`},{icon:`🕺`,text:`🕺 Do a dance move`},{icon:`🤪`,text:`🤪 Speak backwards`},{icon:`🦘`,text:`🦘 Jump 5 times`},{icon:`🗣️`,text:`🗣️ Tell a short story`},{icon:`🎭`,text:`🎭 Act surprised`},{icon:`😴`,text:`😴 Pretend to be asleep`},{icon:`🐔`,text:`🐔 Cluck like a chicken`},{icon:`🦆`,text:`🦆 Quack like a duck`},{icon:`🐸`,text:`🐸 Croak like a frog`},{icon:`🦁`,text:`🦁 Roar like a lion`},{icon:`🐺`,text:`🐺 Howl like a wolf`},{icon:`🐕`,text:`🐕 Bark like a dog`},{icon:`🐈`,text:`🐈 Meow like a cat`},{icon:`🦉`,text:`🦉 Hoot like an owl`},{icon:`🐦`,text:`🐦 Chirp like a bird`},{icon:`🐝`,text:`🐝 Buzz like a bee`},{icon:`🐍`,text:`🐍 Hiss like a snake`},{icon:`🦆`,text:`🦆 Honk like a goose`},{icon:`🐖`,text:`🐖 Oink like a pig`},{icon:`🐴`,text:`🐴 Neigh like a horse`},{icon:`🐔`,text:`🐔 Gobble like a turkey`},{icon:`🦙`,text:`🦙 Spitting llama`},{icon:`🧘`,text:`🧘 Do a yoga pose`},{icon:`🤸`,text:`🤸 Do a somersault`},{icon:`💃`,text:`💃 Spin around`},{icon:`🕺`,text:`🕺 Moonwalk`},{icon:`💫`,text:`💫 Tiptoe`},{icon:`🦘`,text:`🦘 Hop like a kangaroo`},{icon:`🐛`,text:`🐛 Crawl like a caterpillar`},{icon:`🦀`,text:`🦀 Walk sideways`},{icon:`🕷️`,text:`🕷️ Walk on all fours`},{icon:`🦋`,text:`🦋 Flap arms like a butterfly`},{icon:`🐍`,text:`🐍 Slither on floor`},{icon:`🦎`,text:`🦎 Lizard pushups`},{icon:`🗣️`,text:`🗣️ Whisper for 30 seconds`},{icon:`📢`,text:`📢 Speak loudly for 30 seconds`},{icon:`🎵`,text:`🎵 Hum a tune`},{icon:`🎺`,text:`🎺 Make trumpet sounds`},{icon:`🚗`,text:`🚗 Make car sounds`},{icon:`🚂`,text:`🚂 Choo choo sounds`},{icon:`⏰`,text:`⏰ Tick tock sounds`},{icon:`📯`,text:`📯 Make horn sounds`},{icon:`🔔`,text:`🔔 Ring a bell`},{icon:`💥`,text:`💥 Make explosion sounds`},{icon:`🌧️`,text:`🌧️ Make rain sounds`},{icon:`⚡`,text:`⚡ Make lightning sounds`},{icon:`🔥`,text:`🔥 Make fire crackling sounds`},{icon:`🌊`,text:`🌊 Make wave sounds`},{icon:`🎻`,text:`🎻 Pretend to play violin`},{icon:`🥁`,text:`🥁 Pretend to play drums`},{icon:`🎹`,text:`🎹 Pretend to play piano`},{icon:`🎸`,text:`🎸 Pretend to play guitar`},{icon:`🎺`,text:`🎺 Pretend to play trumpet`},{icon:`🎷`,text:`🎷 Pretend to play sax`},{icon:`🎤`,text:`🎤 Beatbox`},{icon:`🗣️`,text:`🗣️ Talk in accent`},{icon:`👽`,text:`👽 Talk like alien`},{icon:`🤖`,text:`🤖 Talk like robot`},{icon:`👴`,text:`👴 Talk like grandparent`},{icon:`👶`,text:`👶 Talk in baby voice`},{icon:`😏`,text:`😏 Smirk for 10 seconds`},{icon:`😱`,text:`😱 Look scared for 10 seconds`},{icon:`🥳`,text:`🥳 Party face for 10 seconds`},{icon:`😴`,text:`😴 Yawn dramatically`},{icon:`🤧`,text:`🤧 Fake sneeze`},{icon:`🤢`,text:`🤢 Look disgusted`},{icon:`😵`,text:`😵 Look dizzy`},{icon:`🤯`,text:`🤯 Mind blown expression`},{icon:`🥶`,text:`🥶 Shake like cold`},{icon:`🔥`,text:`🔥 Fan yourself`},{icon:`💦`,text:`💦 Sweat dramatically`},{icon:`😤`,text:`😤 Stomp feet angrily`},{icon:`😢`,text:`😢 Fake cry`},{icon:`😂`,text:`😂 Laugh for 10 seconds`},{icon:`🤭`,text:`🤭 Giggle`},{icon:`😬`,text:`😬 Make awkward face`},{icon:`🙄`,text:`🙄 Roll eyes`},{icon:`😒`,text:`😒 Unimpressed look`},{icon:`🤔`,text:`🤔 Stroke chin thoughtfully`},{icon:`😎`,text:`😎 Cool pose`},{icon:`🙋`,text:`🙋 Raise hand`},{icon:`👏`,text:`👏 Slow clap`},{icon:`✌️`,text:`✌️ Peace sign`},{icon:`🤙`,text:`🤙 Shaka sign`},{icon:`👋`,text:`👋 Wave goodbye`},{icon:`🤝`,text:`🤝 Shake hands with air`},{icon:`🙇`,text:`🙇 Bow`},{icon:`🧍`,text:`🧍 Stand like a soldier`},{icon:`🧎`,text:`🧎 Kneel`},{icon:`💪`,text:`💪 Flex`},{icon:`🤷`,text:`🤷 Shrug`},{icon:`👆`,text:`👆 Point up`},{icon:`👇`,text:`👇 Point down`},{icon:`👉`,text:`👉 Point right`},{icon:`👈`,text:`👈 Point left`},{icon:`☝️`,text:`☝️ Index finger up`},{icon:`✋`,text:`✋ Stop hand`}]}static generateComplimentPrompts(){return[{icon:`😊`,text:`😊 Say something kind about their smile`},{icon:`💪`,text:`💪 Compliment their strength`},{icon:`🧠`,text:`🧠 Praise their smarts`},{icon:`❤️`,text:`❤️ Tell them why they are important`},{icon:`🌟`,text:`🌟 Share their best quality`},{icon:`🎯`,text:`🎯 Compliment something they did`},{icon:`😊`,text:`😊 Say what makes them special`},{icon:`💝`,text:`💝 Give a heartfelt compliment`},{icon:`👁️`,text:`👁️ Compliment their eyes`},{icon:`💇`,text:`💇 Compliment their hair`},{icon:`👔`,text:`👔 Compliment their style`},{icon:`🎭`,text:`🎭 Compliment their personality`},{icon:`😄`,text:`😄 Praise their laugh`},{icon:`🎵`,text:`🎵 Praise their voice`},{icon:`🕺`,text:`🕺 Praise their dance moves`},{icon:`🎨`,text:`🎨 Praise their creativity`},{icon:`📚`,text:`📚 Praise their knowledge`},{icon:`💡`,text:`💡 Praise their ideas`},{icon:`🤝`,text:`🤝 Thank them for something`},{icon:`🌈`,text:`🌈 Say something colorful about them`},{icon:`⭐`,text:`⭐ Call them a star`},{icon:`👑`,text:`👑 Call them royalty`},{icon:`🦸`,text:`🦸 Call them a hero`},{icon:`🧙`,text:`🧙 Call them magical`},{icon:`🌟`,text:`🌟 Call them brilliant`},{icon:`💖`,text:`💖 Call them lovable`},{icon:`🔥`,text:`🔥 Call them on fire`},{icon:`❄️`,text:`❄️ Call them cool`},{icon:`☀️`,text:`☀️ Call them sunny`},{icon:`🌙`,text:`🌙 Call them dreamy`},{icon:`🌊`,text:`🌊 Call them wave-worthy`},{icon:`🏔️`,text:`🏔️ Call them mountain-strong`},{icon:`🦁`,text:`🦁 Call them brave`},{icon:`🦊`,text:`🦊 Call them clever`},{icon:`🐘`,text:`🐘 Call them big-hearted`},{icon:`🦋`,text:`🦋 Call them beautiful`},{icon:`🐝`,text:`🐝 Call them busy and productive`},{icon:`🦅`,text:`🦅 Call them soaring`},{icon:`🌱`,text:`🌱 Call them growing`},{icon:`🌻`,text:`🌻 Call them bright`},{icon:`🍀`,text:`🍀 Call them lucky`},{icon:`🎯`,text:`🎯 Call them accurate`},{icon:`⚡`,text:`⚡ Call them electric`},{icon:`💎`,text:`💎 Call them precious`},{icon:`🌈`,text:`🌈 Call them colorful`},{icon:`🎪`,text:`🎪 Call them entertaining`},{icon:`🏆`,text:`🏆 Call them a winner`},{icon:`🎖️`,text:`🎖️ Call them accomplished`},{icon:`💫`,text:`💫 Call them a superstar`},{icon:`🎉`,text:`🎉 Call them celebratory`},{icon:`🥳`,text:`🥳 Call them party-ready`},{icon:`🤗`,text:`🤗 Call them huggable`},{icon:`💪`,text:`💪 Call them powerful`},{icon:`🧠`,text:`🧠 Call them a genius`},{icon:`🎨`,text:`🎨 Call them artistic`},{icon:`🎵`,text:`🎵 Call them musical`},{icon:`📝`,text:`📝 Call them articulate`},{icon:`🗣️`,text:`🗣️ Call them expressive`},{icon:`👂`,text:`👂 Praise their listening`},{icon:`🤝`,text:`🤝 Praise their teamwork`},{icon:`💪`,text:`💪 Praise their effort`},{icon:`🎯`,text:`🎯 Praise their focus`},{icon:`🔥`,text:`🔥 Praise their passion`},{icon:`💖`,text:`💖 Praise their kindness`},{icon:`🌟`,text:`🌟 Praise their leadership`},{icon:`🤝`,text:`🤝 Praise their friendship`},{icon:`💯`,text:`💯 Say they are 100%`},{icon:`♾️`,text:`♾️ Say they are endless`},{icon:`🌟`,text:`🌟 Say they shine`},{icon:`⭐`,text:`⭐ Give them a gold star`},{icon:`👑`,text:`👑 Say they rule`},{icon:`🏆`,text:`🏆 Say they are champion`},{icon:`🎯`,text:`🎯 Say they are spot-on`},{icon:`💯`,text:`💯 Give them a perfect 10`},{icon:`🔥`,text:`🔥 Say they are on fire`},{icon:`❄️`,text:`❄️ Say they are ice cool`},{icon:`🌪️`,text:`🌪️ Say they are unstoppable`},{icon:`⛰️`,text:`⛰️ Say they are mountain-worthy`},{icon:`🌊`,text:`🌊 Say they make waves`},{icon:`🌈`,text:`🌈 Say they are a rainbow`},{icon:`🌅`,text:`🌅 Say they are a sunrise`},{icon:`🌄`,text:`🌄 Say they are inspiring`},{icon:`🌌`,text:`🌌 Say they are stellar`},{icon:`🌠`,text:`🌠 Say they are wish-worthy`},{icon:`🏔️`,text:`🏔️ Say they peak`},{icon:`🌋`,text:`🌋 Say they are explosive`},{icon:`🌊`,text:`🌊 Say they flow`},{icon:`🍃`,text:`🍃 Say they are refreshing`},{icon:`🌿`,text:`🌿 Say they are growing`},{icon:`🌸`,text:`🌸 Say they bloom`},{icon:`🌺`,text:`🌺 Say they are vibrant`},{icon:`🌻`,text:`🌻 Say they are sunny`},{icon:`🍀`,text:`🍀 Say they bring luck`},{icon:`🌰`,text:`🌰 Say they are brave (chestnut)`},{icon:`🌱`,text:`🌱 Say they are fresh`},{icon:`🌲`,text:`🌲 Say they are strong`},{icon:`🦁`,text:`🦁 Say they are regal`},{icon:`🦊`,text:`🦊 Say they are cunning`},{icon:`🦄`,text:`🦄 Say they are magical`},{icon:`🐉`,text:`🐉 Say they are legendary`},{icon:`🦅`,text:`🦅 Say they soar`},{icon:`🐬`,text:`🐬 Say they are playful`},{icon:`🦋`,text:`🦋 Say they transform`},{icon:`🐢`,text:`🐢 Say they are wise`},{icon:`🦩`,text:`🦩 Say they are flaming`},{icon:`🦚`,text:`🦚 Say they are dazzling`}]}static generateSoundEffects(){return[{icon:`🔔`,text:`💫 Ding dong!`},{icon:`🐕`,text:`🐾 Woof woof!`},{icon:`🚗`,text:`💨 Vroom!`},{icon:`📢`,text:`📣 Loudspeaker!`},{icon:`💧`,text:`💦 Splish splash!`},{icon:`⚡`,text:`💥 Zap!`},{icon:`🎵`,text:`🎶 Hum hum!`},{icon:`⏰`,text:`🔔 Tick tock!`},{icon:`🌧️`,text:`💧 Pitter patter!`},{icon:`🔥`,text:`🔥 Fwoosh!`},{icon:`🦇`,text:`🦇 Swoosh!`},{icon:`🕳️`,text:`🕳️ Whoosh!`},{icon:`💥`,text:`💥 Boom!`},{icon:`🧨`,text:`🧨 Pop! Bang!`},{icon:`🔫`,text:`💨 Pew pew!`},{icon:`⚔️`,text:`⚔️ Clash!`},{icon:`🛡️`,text:`🛡️ Clang!`},{icon:`🔔`,text:`🔔 Ding!`},{icon:`🎵`,text:`🎵 Ta-da!`},{icon:`🐸`,text:`🐸 Ribbit!`},{icon:`🐔`,text:`🐔 Cluck!`},{icon:`🦆`,text:`🦆 Quack!`},{icon:`🐕`,text:`🐕 Bark!`},{icon:`🐈`,text:`🐈 Meow!`},{icon:`🐄`,text:`🐄 Moo!`},{icon:`🐷`,text:`🐷 Oink!`},{icon:`🐑`,text:`🐑 Baa!`},{icon:`🐴`,text:`🐴 Neigh!`},{icon:`🦁`,text:`🦁 Roar!`},{icon:`🐺`,text:`🐺 Howl!`},{icon:`🦉`,text:`🦉 Hoot!`},{icon:`🐦`,text:`🐦 Tweet!`},{icon:`🐝`,text:`🐝 Buzz!`},{icon:`🦟`,text:`🦟 Bzzz!`},{icon:`🐍`,text:`🐍 Hiss!`},{icon:`🦂`,text:`🦂 Hiss!`},{icon:`🦆`,text:`🦆 Honk!`},{icon:`🚂`,text:`🚂 Choo choo!`},{icon:`🚗`,text:`🚗 Honk honk!`},{icon:`🚑`,text:`🚑 Wee-woo!`},{icon:`🚒`,text:`🚒 Wee-woo!`},{icon:`🚓`,text:`🚓 Wee-woo!`},{icon:`🚚`,text:`🚚 Beep beep!`},{icon:`✈️`,text:`✈️ Whoosh!`},{icon:`🚀`,text:`🚀 Vroooom!`},{icon:`🎆`,text:`🎆 Boom! Pop!`},{icon:`🎇`,text:`🎇 Fizzle!`},{icon:`💣`,text:`💣 Explosion!`},{icon:`🔫`,text:`💥 Bang!`},{icon:`⚽`,text:`⚽ Whomp!`},{icon:`🏀`,text:`🏀 Swish!`},{icon:`🎾`,text:`🎾 Pop!`},{icon:`🏐`,text:`🏐 Whomp!`},{icon:`⚾`,text:`⚾ Crack!`},{icon:`🎳`,text:`🎳 Strike!`},{icon:`🎯`,text:`🎯 Thwip!`},{icon:`🪃`,text:`🪃 Thwack!`},{icon:`🧨`,text:`🧨 Baaang!`},{icon:`💣`,text:`💣 Boom!`},{icon:`🔧`,text:`🔧 Clink!`},{icon:`🔨`,text:`🔨 Bang!`},{icon:`🪓`,text:`🪓 Thunk!`},{icon:`⚙️`,text:`⚙️ Click!`},{icon:`🔑`,text:`🔑 Click!`},{icon:`🔒`,text:`🔒 Clunk!`},{icon:`🔓`,text:`🔓 Click!`},{icon:`🚪`,text:`🚪 Creak!`},{icon:`🪟`,text:`🪟 Rattle!`},{icon:`🚿`,text:`🚿 Sss!`},{icon:`🛁`,text:`🛁 Splosh!`},{icon:`🚽`,text:`🚽 Flush!`},{icon:`💧`,text:`💧 Drip!`},{icon:`🫧`,text:`🫧 Pop!`},{icon:`🍳`,text:`🍳 Sizzle!`},{icon:`🥓`,text:`🥓 Crackle!`},{icon:`🍿`,text:`🍿 Pop pop!`},{icon:`🥤`,text:`🥤 Slurp!`},{icon:`🍾`,text:`🍾 Pop!`},{icon:`🫖`,text:`🫖 Pour!`},{icon:`☕`,text:`☕ Sip!`},{icon:`🍝`,text:`🍝 Slurp!`},{icon:`🍕`,text:`🍕 Crunch!`},{icon:`🍎`,text:`🍎 Crunch!`},{icon:`🥕`,text:`🥕 Crunch!`},{icon:`🍪`,text:`🍪 Snap!`},{icon:`🥛`,text:`🥛 Glug!`},{icon:`🍺`,text:`🍺 Clink!`},{icon:`📱`,text:`📱 Ding!`},{icon:`⏰`,text:`⏰ Alarm!`},{icon:`🔔`,text:`🔔 Ring!`},{icon:`⏱️`,text:`⏱️ Tick!`},{icon:`💿`,text:`💿 Whirr!`},{icon:`📷`,text:`📷 Click!`},{icon:`📸`,text:`📸 Flash!`},{icon:`🎥`,text:`🎥 Whirr!`},{icon:`💻`,text:`💻 Beep!`},{icon:`🖨️`,text:`🖨️ Vrrrm!`},{icon:`📠`,text:`📠 Whirr!`},{icon:`📻`,text:`📻 Static!`},{icon:`🎮`,text:`🎮 Pew pew!`},{icon:`🕹️`,text:`🕹️ Click!`},{icon:`🎯`,text:`🎯 Darts!`},{icon:`🎲`,text:`🎲 Roll!`},{icon:`🃏`,text:`🃏 Shuffle!`},{icon:`🎭`,text:`🎭 Drama!`}]}static generateLipReadingWords(){return[{icon:`👄`,text:`Hello`},{icon:`👄`,text:`Goodbye`},{icon:`👄`,text:`Thank you`},{icon:`👄`,text:`Please`},{icon:`👄`,text:`Yes`},{icon:`👄`,text:`No`},{icon:`👄`,text:`Maybe`},{icon:`👄`,text:`Sorry`},{icon:`👄`,text:`Help`},{icon:`👄`,text:`Water`},{icon:`👄`,text:`Food`},{icon:`👄`,text:`Hungry`},{icon:`👄`,text:`Thirsty`},{icon:`👄`,text:`Tired`},{icon:`👄`,text:`Happy`},{icon:`👄`,text:`Sad`},{icon:`👄`,text:`Angry`},{icon:`👄`,text:`Scared`},{icon:`👄`,text:`Love`},{icon:`👄`,text:`Hate`},{icon:`👄`,text:`Like`},{icon:`👄`,text:`Dislike`},{icon:`👄`,text:`Mom`},{icon:`👄`,text:`Dad`},{icon:`👄`,text:`Baby`},{icon:`👄`,text:`Friend`},{icon:`👄`,text:`Enemy`},{icon:`👄`,text:`Cat`},{icon:`👄`,text:`Dog`},{icon:`👄`,text:`Bird`},{icon:`👄`,text:`Fish`},{icon:`👄`,text:`House`},{icon:`👄`,text:`Car`},{icon:`👄`,text:`Tree`},{icon:`👄`,text:`Water`},{icon:`👄`,text:`Sun`},{icon:`👄`,text:`Moon`},{icon:`👄`,text:`Star`},{icon:`👄`,text:`Cloud`},{icon:`👄`,text:`Rain`},{icon:`👄`,text:`Snow`},{icon:`👄`,text:`Hot`},{icon:`👄`,text:`Cold`},{icon:`👄`,text:`Big`},{icon:`👄`,text:`Small`},{icon:`👄`,text:`Fast`},{icon:`👄`,text:`Slow`},{icon:`👄`,text:`Up`},{icon:`👄`,text:`Down`},{icon:`👄`,text:`Left`},{icon:`👄`,text:`Right`},{icon:`👄`,text:`Go`},{icon:`👄`,text:`Stop`},{icon:`👄`,text:`Wait`},{icon:`👄`,text:`Come`},{icon:`👄`,text:`Run`},{icon:`👄`,text:`Walk`},{icon:`👄`,text:`Jump`},{icon:`👄`,text:`Sit`},{icon:`👄`,text:`Stand`},{icon:`👄`,text:`Lie down`},{icon:`👄`,text:`Eat`},{icon:`👄`,text:`Drink`},{icon:`👄`,text:`Sleep`},{icon:`👄`,text:`Wake up`},{icon:`👄`,text:`Bath`},{icon:`👄`,text:`Brush teeth`},{icon:`👄`,text:`Wash hands`},{icon:`👄`,text:`Play`},{icon:`👄`,text:`Work`},{icon:`👄`,text:`School`},{icon:`👄`,text:`Home`},{icon:`👄`,text:`Store`},{icon:`👄`,text:`Book`},{icon:`👄`,text:`Phone`},{icon:`👄`,text:`TV`},{icon:`👄`,text:`Game`},{icon:`👄`,text:`Ball`},{icon:`👄`,text:`Money`},{icon:`👄`,text:`Time`},{icon:`👄`,text:`Day`},{icon:`👄`,text:`Night`},{icon:`👄`,text:`Morning`},{icon:`👄`,text:`Evening`},{icon:`👄`,text:`Birthday`},{icon:`👄`,text:`Party`},{icon:`👄`,text:`Gift`},{icon:`👄`,text:`Cake`},{icon:`👄`,text:`Ice cream`},{icon:`👄`,text:`Cookie`},{icon:`👄`,text:`Pizza`},{icon:`👄`,text:`Apple`},{icon:`👄`,text:`Banana`},{icon:`👄`,text:`Orange`},{icon:`👄`,text:`Grape`},{icon:`👄`,text:`Milk`},{icon:`👄`,text:`Juice`},{icon:`👄`,text:`Coffee`},{icon:`👄`,text:`Tea`},{icon:`👄`,text:`Bread`},{icon:`👄`,text:`Butter`},{icon:`👄`,text:`Cheese`},{icon:`👄`,text:`Egg`},{icon:`👄`,text:`Meat`},{icon:`👄`,text:`Rice`},{icon:`👄`,text:`Soup`},{icon:`👄`,text:`Salad`},{icon:`👄`,text:`Chicken`}]}static generateWordChainWords(){return`Apple.Elephant.Tiger.Rainbow.Waterfall.Lion.Night.Dream.Mountain.River.Sunset.Thunder.Jungle.Gorilla.Galaxy.Yacht.Treasure.Robot.Monkey.Yak.Kite.Eagle.Ladder.Rainbow.Honey.Yo-yo.Octopus.Sunflower.Rocket.Tiger.Garden.Ninja.Anchor.Robot.Panda.Astronaut.Telescope.Elephant.Tiger.Gorilla.Penguin.Narwhal.Lighthouse.Hamster.Raincoat.Tornado.Owl.Llama.Avocado.Oyster.Pineapple.Eclair.Igloo.Emu.Yogurt.Turtle.Lobster.Rhinoceros.Humpty Dumpty.Tyrannosaurus.Unicorn.Neptune.Eclipse.Tapestry.Yodel.Nougat.Leprechaun.Echidna.Umbrella.Yachtsman.Mustache.Horseshoe.Noodles.Egret.Yearbook.Tuxedo.Eyebrow.Yam.Rye bread.Yacht.Tornado.Oboe.Egret.Nutmeg.Ukelele.Eyeball.Tadpole`.split(`.`).map(e=>({icon:`🔤`,text:e}))}},b=new class{storage;state=null;prompts=new Map;onStateChange=null;timerInterval=null;gameStartTime=0;constructor(){this.storage=new u,this.loadPrompts()}setStateChangeHandler(e){this.onStateChange=e}loadPrompts(){let e=y.generateMassiveData();Object.entries(e).forEach(([e,t])=>{this.prompts.set(e,t)})}getPromptKey(e,t){return{"truth-or-dare":`truthQuestions`,"never-have-i-ever":`neverHaveIEver`,"would-you-rather":`wouldYouRather`,"riddle-battle":`riddles`,charades:`charadesAnimals`,"emoji-pictionary":`emojiWords`,"photo-scavenger":`scavengerItems`,"dessert-roulette":`dessertDares`,"compliment-chain":`complimentPrompts`,"sound-effects-quiz":`soundEffects`,"lip-reading":`lipReadingWords`,"word-chain":`wordChainWords`}[e]||`truthQuestions`}startGame(e,t,n=`challenge`,r){let i=this.storage.getSettings(),a=f.getGameById(e);if(!a||t.length<a.minPlayers)throw Error(`Invalid game or not enough players`);this.gameStartTime=Date.now(),this.state={gameId:e,mode:n,currentPlayer:t[0],players:t,currentPrompt:null,round:1,totalRounds:r||i.defaultRounds,scores:t.reduce((e,t)=>({...e,[t.id]:0}),{}),timerDuration:i.timerDuration,isTimerActive:!1,promptHistory:[],usedPromptIds:new Set},this.nextPrompt(),this.notifyStateChange()}nextPrompt(){if(!this.state)return null;let e=this.getPromptKey(this.state.gameId,this.state.mode),t=this.prompts.get(e)||[];this.state.gameId===`truth-or-dare`&&(t=this.state.mode===`truth`?this.prompts.get(`truthQuestions`)||[]:this.prompts.get(`dareChallenges`)||[]);let n=t.filter((e,t)=>!this.state.usedPromptIds.has(`prompt_${t}`));if(n.length===0){this.state.usedPromptIds.clear();let e=t.filter((e,t)=>!this.state.usedPromptIds.has(`prompt_${t}`));if(e.length>0){let n=e[Math.floor(Math.random()*e.length)];this.state.usedPromptIds.add(`prompt_${t.indexOf(n)}`),this.state.currentPrompt=n,this.state.promptHistory.push(n)}}else{let e=n[Math.floor(Math.random()*n.length)];this.state.usedPromptIds.add(`prompt_${t.indexOf(e)}`),this.state.currentPrompt=e,this.state.promptHistory.push(e)}return this.notifyStateChange(),this.state.currentPrompt}switchMode(e){this.state&&(this.state.mode=e,this.nextPrompt(),this.notifyStateChange())}submitAnswer(e,t){if(!this.state)return;let n=t?this.state.players.find(e=>e.id===t):this.state.currentPlayer;if(n){let t=e?10:0;this.state.scores[n.id]+=t,this.storage.saveScore(this.state.gameId,n.id,t)}this.notifyStateChange()}nextPlayer(){if(!this.state)return;let e=(this.state.players.findIndex(e=>e.id===this.state.currentPlayer.id)+1)%this.state.players.length;this.state.currentPlayer=this.state.players[e],this.notifyStateChange()}nextRound(){this.state&&(this.state.round++,this.state.currentPlayer=this.state.players[0],this.nextPrompt(),this.notifyStateChange())}startTimer(e){if(!this.state)return;this.state.timerDuration=e||this.state.timerDuration,this.state.isTimerActive=!0,this.timerInterval&&clearInterval(this.timerInterval);let t=this.state.timerDuration;this.timerInterval=window.setInterval(()=>{this.state&&(t--,this.state.timerDuration=t,t<=0&&(this.stopTimer(),this.onTimerEnd()),this.notifyStateChange())},1e3),this.notifyStateChange()}stopTimer(){this.timerInterval&&=(clearInterval(this.timerInterval),null),this.state&&(this.state.isTimerActive=!1),this.notifyStateChange()}onTimerEnd(){this.submitAnswer(!1),this.nextPlayer()}endGame(){if(!this.state)return null;this.stopTimer();let e=Object.entries(this.state.scores).sort(([,e],[,t])=>t-e)[0]?.[0],t=this.state.players.find(t=>t.id===e)||null,n={gameId:this.state.gameId,winner:t,scores:this.state.scores,totalRounds:this.state.round,duration:Date.now()-this.gameStartTime};return this.state=null,n}getState(){return this.state}getRandomPrompt(e,t){let n=this.getPromptKey(e,t||`challenge`),r=this.prompts.get(n)||[];return r.length===0?null:r[Math.floor(Math.random()*r.length)]}getLeaderboard(e){let t=this.storage.getScores(),n=this.storage.getPlayers(),r={};return Object.entries(t).forEach(([t,i])=>{e&&t!==e||Object.entries(i).forEach(([e,t])=>{let i=n.find(t=>t.id===e);i&&(r[e]||(r[e]={player:i,totalPoints:0,wins:0}),r[e].totalPoints+=t.points,r[e].wins+=t.wins)})}),Object.values(r).sort((e,t)=>t.totalPoints-e.totalPoints)}notifyStateChange(){this.state&&this.onStateChange&&this.onStateChange(this.state)}},x=class{container=null;mood=`waiting`;onMoodChange=null;messageTimeout=null;_tipsMode=!1;currentTipIndex=0;tips=[];tipsInterval=null;idleInterval=null;breatheInterval=null;isHovering=!1;_lastAction=``;constructor(){}setMood(e){this.mood=e,this.updateAppearance(),this.onMoodChange?.(e)}setOnMoodChange(e){this.onMoodChange=e}render(){return this.container=document.createElement(`div`),this.container.className=`copilot-container`,this.container.innerHTML=this.getStyles()+this.renderCharacter(),this.startIdleBehaviors(),this.container}startIdleBehaviors(){this.breatheInterval=window.setInterval(()=>{this.mood===`waiting`&&!this.isHovering&&this.breathe()},3e3),this.idleInterval=window.setInterval(()=>{!this.isHovering&&Math.random()>.7&&this.randomIdleAction()},8e3)}breathe(){let e=this.container?.querySelector(`.copilot-avatar`);e&&(e.classList.add(`breathe`),setTimeout(()=>e.classList.remove(`breathe`),2e3))}randomIdleAction(){let e=[`lookAround`,`wiggle`,`nod`,`blink`];switch(e[Math.floor(Math.random()*e.length)]){case`lookAround`:this.lookAround();break;case`wiggle`:this.wiggle();break;case`nod`:this.nod();break;case`blink`:this.blink();break}}lookAround(){let e=this.container?.querySelector(`.copilot-face`);e&&(e.classList.add(`look-around`),setTimeout(()=>e.classList.remove(`look-around`),1e3))}wiggle(){let e=this.container?.querySelector(`.copilot-avatar`);e&&(e.classList.add(`wiggle`),setTimeout(()=>e.classList.remove(`wiggle`),600))}nod(){let e=this.container?.querySelector(`.copilot-avatar`);e&&(e.classList.add(`nod`),setTimeout(()=>e.classList.remove(`nod`),500))}blink(){(this.container?.querySelectorAll(`.eye`))?.forEach(e=>{e.classList.add(`blink`),setTimeout(()=>e.classList.remove(`blink`),150)})}getStyles(){return`
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
          width: 72px;
          height: 72px;
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
          gap: 12px;
          margin-bottom: 4px;
        }

        .eye {
          width: 8px;
          height: 8px;
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
          width: 16px;
          height: 8px;
          border-radius: 0 0 16px 16px;
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
          inset: -10px;
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
          bottom: 90px;
          right: -10px;
          background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);
          border: 2px solid rgba(102, 126, 234, 0.6);
          border-radius: 20px;
          padding: 14px 18px;
          max-width: 240px;
          min-width: 160px;
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
          bottom: 95px;
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
    `}renderCharacter(){return`
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
    `}renderFace(){let e={waiting:`<div class="mouth"></div>`,happy:`<div class="mouth" style="height: 10px; border-radius: 0 0 20px 20px;"></div>`,excited:`<div class="mouth" style="height: 12px; width: 20px; border-radius: 0 0 24px 24px;"></div>`,thinking:`<div class="mouth" style="width: 10px; height: 6px; border-radius: 50%;"></div>`,celebrating:`<div class="mouth" style="height: 14px; width: 24px; border-radius: 0 0 28px 28px;"></div>`,teaching:`<div class="mouth" style="height: 6px; width: 14px;"></div>`,sleepy:`<div class="mouth" style="width: 12px; height: 6px; border-radius: 50%;"></div>`,winking:`<div class="mouth" style="height: 8px; width: 16px;"></div>`};return`
      <div class="eyes">
        <div class="eye"></div>
        <div class="eye"></div>
      </div>
      ${e[this.mood]||e.waiting}
    `}updateAppearance(){if(!this.container)return;let e=this.container.querySelector(`.copilot-avatar`),t=this.container.querySelector(`.copilot-face`);e&&(e.className=`copilot-avatar ${this.mood}`),t&&(t.innerHTML=this.renderFace())}speak(e,t=5e3){let n=this.container?.querySelector(`.copilot-speech-bubble`),r=this.container?.querySelector(`#speech-text`),i=this.container?.querySelector(`#speech-typing`);if(n&&r){n.classList.add(`visible`),r.style.opacity=`0`,i.style.display=`flex`,this.setMood(`thinking`);let a=0,o=setInterval(()=>{a<e.length?(r.innerHTML=e.substring(0,a+1),a++):(clearInterval(o),i.style.display=`none`,r.style.opacity=`1`,this.setMood(`happy`))},30);this.messageTimeout&&clearTimeout(this.messageTimeout),this.messageTimeout=window.setTimeout(()=>{n.classList.remove(`visible`),this.setMood(`waiting`)},t+e.length*30)}}startTipsMode(e){this.tips=e,this.currentTipIndex=0,this._tipsMode=!0,this.updateTips();let t=this.container?.querySelector(`#tips-container`),n=this.container?.querySelector(`#tip-dots`);t?.classList.add(`visible`),n&&(n.innerHTML=e.map((e,t)=>`<div class="tip-dot ${t===0?`active`:``}"></div>`).join(``)),this.setMood(`excited`),this.tipsInterval&&clearInterval(this.tipsInterval),this.tipsInterval=window.setInterval(()=>{this.nextTip()},8e3)}updateTips(){let e=this.container?.querySelector(`#tips-track`),t=this.container?.querySelectorAll(`.tip-dot`);if(e){let t=[`💡`,`🎯`,`⭐`,`🔥`,`💪`,`🎮`,`🎲`,`🏆`];e.innerHTML=this.tips.map((e,n)=>`
        <div class="tip-item">
          <span class="tip-icon">${t[n%t.length]}</span>
          <span class="tip-text">${e}</span>
        </div>
      `).join(``),e.innerHTML=this.tips[this.currentTipIndex].split(` `).map((e,t)=>`<span style="animation: wordPop 0.3s ease ${t*.1}s both;">${e}</span>`).join(` `)}t&&t.forEach((e,t)=>{e.classList.toggle(`active`,t===this.currentTipIndex)})}nextTip(){let e=this.container?.querySelector(`#tips-track`);e&&(e.classList.add(`tip-slide-out`),setTimeout(()=>{this.currentTipIndex=(this.currentTipIndex+1)%this.tips.length,this.updateTips(),e.classList.remove(`tip-slide-out`),e.classList.add(`tip-slide-in`),setTimeout(()=>e.classList.remove(`tip-slide-in`),500)},500)),Math.random()>.7&&this.wiggle()}stopTipsMode(){this._tipsMode=!1,this.tipsInterval&&=(clearInterval(this.tipsInterval),null);let e=this.container?.querySelector(`#tips-container`),t=this.container?.querySelector(`#tip-dots`);e?.classList.remove(`visible`),t&&(t.innerHTML=``),this.setMood(`waiting`)}celebrate(){this.setMood(`celebrating`),this.createConfetti(),setTimeout(()=>{this.setMood(`happy`),setTimeout(()=>this.setMood(`waiting`),2e3)},2e3)}createConfetti(){if(this.container)for(let e=0;e<20;e++){let t=document.createElement(`div`);t.style.cssText=`
        position: absolute;
        width: 8px;
        height: 8px;
        background: ${[`#ffd700`,`#667eea`,`#ff6b6b`,`#4ecdc4`][Math.floor(Math.random()*4)]};
        border-radius: 50%;
        top: 50%;
        left: 50%;
        pointer-events: none;
        animation: confetti ${1+Math.random()}s ease-out forwards;
      `,this.container.appendChild(t);let n=Math.PI*2*e/20,r=50+Math.random()*100,i=Math.cos(n)*r,a=Math.sin(n)*r;t.animate([{transform:`translate(-50%, -50%) scale(1)`,opacity:1},{transform:`translate(calc(-50% + ${i}px), calc(-50% + ${a}px)) scale(0)`,opacity:0}],{duration:1e3+Math.random()*500,easing:`ease-out`}),setTimeout(()=>t.remove(),1500)}}spin(){let e=this.container?.querySelector(`.copilot-avatar`);e&&(e.style.animation=`none`,e.offsetHeight,e.style.animation=`spin 0.8s ease`,setTimeout(()=>{e.style.animation=`float 4s ease-in-out infinite`},800))}react(e){switch(this._lastAction=e,e){case`tap`:this.blink();break;case`correct`:this.setMood(`excited`),setTimeout(()=>this.setMood(`happy`),1e3);break;case`wrong`:this.setMood(`thinking`),setTimeout(()=>this.setMood(`waiting`),1500);break;case`skip`:this.wiggle();break;case`next`:this.nod();break}}onHoverStart(){this.isHovering=!0,this.speak(`Hi there! I'm your game companion! Tap me for tips!`)}onHoverEnd(){this.isHovering=!1}hide(){this.container?.classList.add(`hidden`)}show(){this.container?.classList.remove(`hidden`)}destroy(){this.messageTimeout&&clearTimeout(this.messageTimeout),this.idleInterval&&clearInterval(this.idleInterval),this.breatheInterval&&clearInterval(this.breatheInterval),this.tipsInterval&&clearInterval(this.tipsInterval),this.container?.remove()}},S=class{container=null;players=[];selectedPlayerId=null;onSelect=null;onAddNew=null;constructor(e){this.players=e}setOnSelect(e){this.onSelect=e}setOnAddNew(e){this.onAddNew=e}render(){return this.container=document.createElement(`div`),this.container.className=`copilot-welcome-screen`,this.container.innerHTML=this.getStyles()+this.getHTML(),this.attachEventListeners(),this.startCopilotAnimation(),this.container}startCopilotAnimation(){let e=this.container?.querySelector(`.copilot-welcome-avatar`);e&&setTimeout(()=>e.classList.add(`wave`),1e3)}getStyles(){return`
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
    `}getHTML(){return`
      <div class="copilot-welcome-avatar" id="copilot-avatar">
        <svg viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
      </div>
      
      <h1 class="welcome-title">Hey there!</h1>
      <p class="welcome-subtitle">Who's leading the fun today?</p>
      
      <div class="player-list" id="player-list">
        ${this.players.map(e=>this.renderPlayerOption(e)).join(``)}
      </div>
      
      <button class="new-player-btn" id="add-new-btn">
        ${c.Plus}
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
    `}renderPlayerOption(e){return`
      <div class="player-option" data-player-id="${e.id}">
        <div class="player-option-avatar" style="background: ${e.color}30;">
          ${e.avatar}
        </div>
        <span class="player-option-name">${e.name}</span>
        <div class="player-option-check">
          ${c.Check}
        </div>
      </div>
    `}attachEventListeners(){if(!this.container)return;let e=this.container.querySelectorAll(`.player-option`),t=this.container.querySelector(`#start-btn`),n=this.container.querySelector(`#add-new-btn`),r=this.container.querySelector(`#message-text`),i=this.container.querySelector(`#copilot-avatar`);e.forEach(n=>{n.addEventListener(`click`,()=>{e.forEach(e=>e.classList.remove(`selected`)),n.classList.add(`selected`),this.selectedPlayerId=n.getAttribute(`data-player-id`),t.classList.add(`ready`);let a=this.players.find(e=>e.id===this.selectedPlayerId);a&&r&&(r.innerHTML=`<span class="excited">Yay! <span class="highlight">${a.name}</span> will be an awesome host!</span>`),i&&(i.classList.add(`wave`),setTimeout(()=>i.classList.remove(`wave`),1e3))})}),t?.addEventListener(`click`,()=>{this.selectedPlayerId&&(this.createCelebration(),setTimeout(()=>this.onSelect?.(this.selectedPlayerId),800))}),n?.addEventListener(`click`,()=>{this.onAddNew?.()})}createCelebration(){if(!this.container)return;let e=this.container.querySelector(`.copilot-welcome-avatar`);e&&e.classList.add(`wave`);for(let e=0;e<30;e++){let t=document.createElement(`div`);t.style.cssText=`
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${[`#ffd700`,`#667eea`,`#ff6b6b`,`#4ecdc4`,`#764ba2`][Math.floor(Math.random()*5)]};
        border-radius: ${Math.random()>.5?`50%`:`2px`};
        top: 50%;
        left: 50%;
        pointer-events: none;
        z-index: 300;
      `,document.body.appendChild(t);let n=Math.PI*2*e/30,r=100+Math.random()*150,i=Math.cos(n)*r,a=Math.sin(n)*r-50;t.animate([{transform:`translate(-50%, -50%) scale(1)`,opacity:1},{transform:`translate(calc(-50% + ${i}px), calc(-50% + ${a}px)) scale(0)`,opacity:0}],{duration:1e3+Math.random()*500,easing:`ease-out`}),setTimeout(()=>t.remove(),1500)}}},C={"hot-potato":`hot-potato`,"musical-silence":`hot-potato`,"freeze-dance":`hot-potato`,"musical-chairs":`hot-potato`,"pass-the-parcel":`hot-potato`,"freeze-song":`hot-potato`,"dance-freeze":`hot-potato`,"dance-freeze-pro":`hot-potato`,"music-statues":`hot-potato`,"word-chain":`word-input`,"word-scramble":`word-input`,"anagram-attack":`word-input`,"spelling-bee":`word-input`,"spelling-bee-pro":`word-input`,"tongue-twister":`word-input`,"alphabet-game":`word-input`,"word-association":`word-input`,"category-game":`word-input`,"rhyming-game":`word-input`,"word-builder":`word-input`,"letter-grid":`word-input`,"jumble-words":`word-input`,"sentence-unscramble":`word-input`,"vocabulary-blast":`word-input`,"synonym-burst":`word-input`,"antonym-attack":`word-input`,"homophone-hunt":`word-input`,"speed-tap":`tap-reaction`,"button-mash":`tap-reaction`,"reaction-test":`tap-reaction`,"rhythm-tap":`tap-reaction`,"shape-tap":`tap-reaction`,"color-match":`tap-reaction`,"memory-tap":`tap-reaction`,countdown:`tap-reaction`,"ninja-clap":`tap-reaction`,"hand-slap":`tap-reaction`,"finger-count":`tap-reaction`,charades:`charades`,pictionary:`charades`,"emoji-pictionary":`charades`,"heads-up":`charades`,"drawing-doodle":`charades`,"portrait-party":`charades`,"improv-theater":`charades`,"lip-sync":`charades`,"air-guitar":`charades`,"voice-actor":`charades`,"sound-effects":`charades`,"dance-improv":`charades`,"dance-off":`charades`,"dance-off-battle":`charades`,"beat-box":`charades`,karaoke:`charades`,"silent-scream":`charades`,"slow-motion":`charades`,"freeze-frame":`charades`,"mirror-game":`charades`,"human-sculpture":`charades`,"talent-show":`charades`,"costume-contest":`charades`,"photo-booth":`charades`,"hot-seat":`charades`,"interview-game":`charades`,"hot-seat-interview":`charades`,"commercial-challenger":`charades`,"pitch-it":`charades`,"news-anchor":`charades`,"weather-report":`charades`,"sports-announce":`charades`,"battle-rap":`charades`,"riddle-battle":`riddle`,"riddle-me":`riddle`,"brain-teaser":`riddle`,"lateral-thinking":`riddle`,"logic-puzzle":`riddle`,"deduction-game":`riddle`,"fact-or-fiction":`riddle`,"two-truths":`riddle`,"fact-check":`riddle`,"guess-the-number":`riddle`,"optical-illusion":`riddle`,"hidden-objects":`riddle`,"spot-difference":`riddle`,"would-you-rather":`two-choice`,"this-or-that":`two-choice`,"opposite-day":`two-choice`,"most-likely":`two-choice`,"plank-challenge":`physical`,"squat-challenge":`physical`,"pushup-showdown":`physical`,"jumping-jacks":`physical`,"wall-sit":`physical`,"balance-test":`physical`,"balance-challenge":`physical`,"endurance-test":`physical`,"breath-hold":`physical`,"stretch-challenge":`physical`,"meditation-game":`physical`,"one-leg-stand":`physical`,"balance-beam":`physical`,"laughter-hold":`physical`,"rock-paper-scissors":`score-track`,"thumb-war":`score-track`,"arm-wrestle":`score-track`,"stare-down":`score-track`,"staring-match":`score-track`,"laugh-contest":`score-track`,"eye-contact":`score-track`,"duel-master":`score-track`,"finger-fight":`score-track`,"quick-math":`trivia`,"trivia-flash":`trivia`,"quiz-show":`trivia`,"general-knowledge":`trivia`,"history-hunt":`trivia`,"science-quiz":`trivia`,"geography-genius":`trivia`,"pop-culture":`trivia`,"sports-trivia":`trivia`,"food-facts":`trivia`,"animal-kingdom":`trivia`,"space-explorer":`trivia`,"tech-trivia":`trivia`,"number-sequence":`trivia`,"pattern-recognition":`trivia`,"sequence-master":`trivia`};function w(e){return C[e]||`prompt-card`}function T(e,t){let n=y.getLanguage(),r=y.generateMassiveData(),i=y.getCountryPrompts();if(n!==`en`&&i){if(e===`truth-or-dare`)return t===`truth`?i.truthQuestions:i.dareChallenges;if(e===`never-have-i`||e===`never-have-i-ever`)return i.neverHaveIEver;if(e===`would-you-rather`)return i.wouldYouRather;if(e===`riddle-battle`||e===`riddle-me`)return i.riddles}return{"truth-or-dare":t===`truth`?r.truthQuestions:r.dareChallenges,"never-have-i":r.neverHaveIEver,"never-have-i-ever":r.neverHaveIEver,"would-you-rather":r.wouldYouRather,"riddle-battle":r.riddles,"riddle-me":r.riddles,charades:r.charadesAnimals,pictionary:r.charadesObjects,"emoji-pictionary":r.emojiWords,"heads-up":r.charadesAnimals,"drawing-doodle":r.charadesObjects,"word-chain":r.wordChainWords,"dessert-roulette":r.dessertDares,"compliment-chain":r.complimentPrompts,"sound-effects":r.soundEffects,"lip-sync":r.lipReadingWords,"photo-scavenger":r.scavengerItems,"story-starter":r.truthQuestions,"limerick-game":r.truthQuestions,"hot-seat":r.truthQuestions}[e]||r.truthQuestions}var E={"quick-math":[{q:`7 × 8 = ?`,a:`56`,options:[`54`,`56`,`58`,`64`]},{q:`144 ÷ 12 = ?`,a:`12`,options:[`10`,`11`,`12`,`13`]},{q:`25% of 80 = ?`,a:`20`,options:[`15`,`20`,`25`,`30`]},{q:`√64 = ?`,a:`8`,options:[`6`,`7`,`8`,`9`]},{q:`3³ = ?`,a:`27`,options:[`9`,`18`,`27`,`36`]},{q:`15 × 15 = ?`,a:`225`,options:[`200`,`215`,`225`,`235`]},{q:`1000 ÷ 8 = ?`,a:`125`,options:[`100`,`112`,`125`,`150`]},{q:`17 + 28 = ?`,a:`45`,options:[`43`,`44`,`45`,`46`]},{q:`9 × 9 = ?`,a:`81`,options:[`72`,`81`,`90`,`99`]},{q:`200 - 67 = ?`,a:`133`,options:[`123`,`133`,`143`,`153`]}],"geography-genius":[{q:`Capital of Japan?`,a:`Tokyo`,options:[`Osaka`,`Tokyo`,`Kyoto`,`Hiroshima`]},{q:`Largest country by area?`,a:`Russia`,options:[`Canada`,`China`,`USA`,`Russia`]},{q:`Which continent is Ghana in?`,a:`Africa`,options:[`Asia`,`Europe`,`Africa`,`South America`]},{q:`Capital of Brazil?`,a:`Brasília`,options:[`São Paulo`,`Rio de Janeiro`,`Brasília`,`Salvador`]},{q:`Longest river in the world?`,a:`Nile`,options:[`Amazon`,`Nile`,`Mississippi`,`Yangtze`]},{q:`Capital of Australia?`,a:`Canberra`,options:[`Sydney`,`Melbourne`,`Canberra`,`Brisbane`]},{q:`Which country has the most islands?`,a:`Sweden`,options:[`Indonesia`,`Philippines`,`Sweden`,`Norway`]},{q:`Mount Everest is in which range?`,a:`Himalayas`,options:[`Andes`,`Alps`,`Himalayas`,`Rockies`]},{q:`Capital of Canada?`,a:`Ottawa`,options:[`Toronto`,`Vancouver`,`Ottawa`,`Montreal`]},{q:`Sahara Desert is in?`,a:`Africa`,options:[`Asia`,`Africa`,`Australia`,`South America`]}],"science-quiz":[{q:`Chemical symbol for Gold?`,a:`Au`,options:[`Go`,`Gd`,`Au`,`Ag`]},{q:`How many bones in adult human body?`,a:`206`,options:[`196`,`206`,`216`,`226`]},{q:`Speed of light (approx)?`,a:`300,000 km/s`,options:[`30,000 km/s`,`300,000 km/s`,`3,000,000 km/s`,`3,000 km/s`]},{q:`What planet is closest to the Sun?`,a:`Mercury`,options:[`Venus`,`Mercury`,`Mars`,`Earth`]},{q:`What gas do plants absorb?`,a:`CO₂`,options:[`Oxygen`,`Nitrogen`,`CO₂`,`Hydrogen`]},{q:`How many chromosomes in human cells?`,a:`46`,options:[`23`,`44`,`46`,`48`]},{q:`What is H₂O?`,a:`Water`,options:[`Hydrogen`,`Oxygen`,`Water`,`Acid`]},{q:`Largest organ in human body?`,a:`Skin`,options:[`Liver`,`Lungs`,`Brain`,`Skin`]},{q:`What does DNA stand for?`,a:`Deoxyribonucleic Acid`,options:[`Digital Nucleic Acid`,`Deoxyribonucleic Acid`,`Dynamic Nucleotide Array`,`Dense Nucleic Atom`]},{q:`Which planet has rings?`,a:`Saturn`,options:[`Jupiter`,`Saturn`,`Uranus`,`Neptune`]}],"pop-culture":[{q:`How many fingers does Mickey Mouse have?`,a:`4`,options:[`3`,`4`,`5`,`6`]},{q:`"I'll be back" is from which movie?`,a:`Terminator`,options:[`RoboCop`,`Terminator`,`Predator`,`Die Hard`]},{q:`Which band sang "Bohemian Rhapsody"?`,a:`Queen`,options:[`Led Zeppelin`,`The Beatles`,`Queen`,`Pink Floyd`]},{q:`How many seasons of Game of Thrones?`,a:`8`,options:[`6`,`7`,`8`,`9`]},{q:`What color is the Grinch?`,a:`Green`,options:[`Red`,`Blue`,`Green`,`Yellow`]},{q:`"Just Do It" is whose slogan?`,a:`Nike`,options:[`Adidas`,`Nike`,`Puma`,`Reebok`]},{q:`Spider-Man was bitten by what?`,a:`Radioactive Spider`,options:[`Snake`,`Ant`,`Radioactive Spider`,`Scorpion`]},{q:`Who played Iron Man?`,a:`Robert Downey Jr.`,options:[`Chris Evans`,`Robert Downey Jr.`,`Chris Hemsworth`,`Mark Ruffalo`]},{q:`First Harry Potter book title?`,a:`Philosopher's Stone`,options:[`Philosopher's Stone`,`Chamber of Secrets`,`Prisoner of Azkaban`,`Goblet of Fire`]},{q:`What is Batman's real name?`,a:`Bruce Wayne`,options:[`Clark Kent`,`Bruce Banner`,`Bruce Wayne`,`Peter Parker`]}],"sports-trivia":[{q:`How many players in a soccer team?`,a:`11`,options:[`9`,`10`,`11`,`12`]},{q:`How many rings on the Olympic flag?`,a:`5`,options:[`4`,`5`,`6`,`7`]},{q:`Which country invented basketball?`,a:`USA`,options:[`Canada`,`USA`,`UK`,`Germany`]},{q:`How many points is a touchdown worth?`,a:`6`,options:[`3`,`6`,`7`,`9`]},{q:`Wimbledon is played on which surface?`,a:`Grass`,options:[`Clay`,`Grass`,`Hard`,`Carpet`]},{q:`How many holes in a golf round?`,a:`18`,options:[`9`,`12`,`18`,`24`]},{q:`How many sets to win in tennis (men)?`,a:`3`,options:[`2`,`3`,`4`,`5`]},{q:`Which country has won the most World Cups?`,a:`Brazil`,options:[`Germany`,`Italy`,`Brazil`,`Argentina`]},{q:`How many players in basketball?`,a:`5`,options:[`4`,`5`,`6`,`7`]},{q:`What sport uses a shuttlecock?`,a:`Badminton`,options:[`Tennis`,`Squash`,`Badminton`,`Pickleball`]}]};function D(e){return E[e]||E[`pop-culture`]}var O=class{container=null;game=null;players=[];hostId=null;gameMode=`challenge`;currentPlayerIndex=0;round=1;maxRounds=10;scores={};engine=`prompt-card`;promptPool=[];usedIndices=new Set;currentPrompt=null;promptRevealed=!1;timerInterval=null;timerRemaining=30;copilot=null;onModeChange=null;onGameEnd=null;onExit=null;hotPotatoActive=!1;hotPotatoTimer=null;hotPotatoCountdown=0;triviaBank=[];triviaIndex=0;triviaAnswered=!1;setGame(e){this.game=e}setPlayers(e){this.players=e,e.forEach(e=>{this.scores[e.id]=0})}setHostId(e){this.hostId=e}setGameMode(e){this.gameMode=e}setOnModeChange(e){this.onModeChange=e}setOnGameEnd(e){this.onGameEnd=e}setOnExit(e){this.onExit=e}render(){if(!this.game)throw Error(`No game set`);return this.engine=w(this.game.id),this.promptPool=T(this.game.id,this.gameMode),this.triviaBank=D(this.game.id),this.container=document.createElement(`div`),this.container.className=`gs-root`,this.container.innerHTML=this.buildStyles()+this.buildShell(),this.renderCurrentEngine(),this.attachBaseListeners(),this.initCopilot(),this.container}buildStyles(){let e=this.game?.color||`#667eea`;return`<style>
      .gs-root{position:fixed;inset:0;background:linear-gradient(160deg,#0a0a0f 0%,#12122a 60%,#0a0a0f 100%);color:#fff;display:flex;flex-direction:column;font-family:'Inter',-apple-system,sans-serif;overflow:hidden;}
      .gs-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;padding-top:calc(16px + env(safe-area-inset-top,0));background:rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;}
      .gs-exit{width:44px;height:44px;background:rgba(255,255,255,0.08);border:none;border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;}
      .gs-exit:active{transform:scale(0.92);background:rgba(255,100,100,0.3);}
      .gs-exit svg{width:22px;height:22px;stroke:#fff;}
      .gs-title{text-align:center;flex:1;}
      .gs-game-name{font-size:16px;font-weight:700;letter-spacing:-0.3px;}
      .gs-round{font-size:12px;color:rgba(255,255,255,0.4);margin-top:2px;}
      .gs-host-badge{display:flex;align-items:center;gap:5px;background:rgba(255,215,0,0.15);border:1px solid rgba(255,215,0,0.3);padding:6px 12px;border-radius:20px;font-size:12px;color:#ffd700;}
      .gs-host-badge svg{width:14px;height:14px;stroke:#ffd700;}

      /* Player strip */
      .gs-players{display:flex;gap:8px;padding:12px 20px;overflow-x:auto;scrollbar-width:none;flex-shrink:0;}
      .gs-players::-webkit-scrollbar{display:none;}
      .gs-player-chip{display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:20px;background:rgba(255,255,255,0.06);border:1.5px solid transparent;transition:all 0.3s;white-space:nowrap;flex-shrink:0;}
      .gs-player-chip.active{border-color:${e};background:${e}22;transform:scale(1.05);}
      .gs-player-chip .chip-avatar{font-size:16px;}
      .gs-player-chip .chip-name{font-size:13px;font-weight:500;}
      .gs-player-chip .chip-score{font-size:12px;color:${e};font-weight:700;}

      /* Scores bar */
      .gs-scores{display:flex;gap:6px;padding:0 20px 8px;flex-wrap:wrap;flex-shrink:0;}
      .gs-score-chip{display:flex;align-items:center;gap:5px;padding:4px 10px;background:rgba(255,255,255,0.06);border-radius:12px;font-size:12px;}
      .gs-score-chip.winning{background:${e}30;color:${e};}

      /* Main content area */
      .gs-body{flex:1;display:flex;flex-direction:column;overflow-y:auto;padding:16px 20px;gap:16px;-webkit-overflow-scrolling:touch;}

      /* Current player card */
      .gs-current-player{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,0.05);border-radius:16px;padding:14px 18px;border:1px solid rgba(255,255,255,0.08);}
      .gs-cp-avatar{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0;}
      .gs-cp-avatar.is-host{box-shadow:0 0 0 2.5px #ffd700;}
      .gs-cp-name{font-size:20px;font-weight:700;}
      .gs-cp-label{font-size:12px;color:rgba(255,255,255,0.5);margin-top:2px;}
      .gs-cp-turn-label{font-size:12px;color:${e};margin-top:2px;}

      /* Prompt card */
      .gs-prompt-card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;align-items:center;text-align:center;cursor:pointer;transition:all 0.3s;min-height:160px;justify-content:center;position:relative;overflow:hidden;}
      .gs-prompt-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,${e}15,transparent);opacity:0;transition:opacity 0.3s;}
      .gs-prompt-card.revealed::before{opacity:1;}
      .gs-prompt-card:active{transform:scale(0.98);}
      .gs-prompt-icon{width:64px;height:64px;border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;background:${e}20;}
      .gs-prompt-icon svg{width:36px;height:36px;color:${e};}
      .gs-prompt-tap{font-size:16px;color:rgba(255,255,255,0.35);font-weight:500;}
      .gs-prompt-text{font-size:20px;font-weight:600;line-height:1.45;color:#fff;}
      .gs-prompt-answer{margin-top:14px;padding:12px 16px;background:rgba(255,255,255,0.06);border-radius:12px;font-size:14px;color:rgba(255,255,255,0.65);display:none;}
      .gs-prompt-answer.show{display:block;animation:fadeSlideUp 0.3s ease;}
      .gs-mode-badge{position:absolute;top:12px;right:12px;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;background:${e}30;color:${e};border:1px solid ${e}50;}

      /* Mode tabs (only for truth-or-dare type games) */
      .gs-mode-tabs{display:flex;gap:6px;background:rgba(255,255,255,0.05);padding:5px;border-radius:14px;flex-shrink:0;}
      .gs-mode-tab{flex:1;padding:9px;border-radius:10px;border:none;font-size:13px;font-weight:600;color:rgba(255,255,255,0.45);cursor:pointer;background:transparent;transition:all 0.25s;}
      .gs-mode-tab.active{background:${e};color:#fff;box-shadow:0 4px 16px ${e}60;}

      /* Hot potato engine */
      .gs-potato{display:flex;flex-direction:column;align-items:center;gap:24px;padding:20px;}
      .gs-potato-timer{width:180px;height:180px;position:relative;display:flex;align-items:center;justify-content:center;}
      .gs-potato-ring{position:absolute;inset:0;}
      .gs-potato-ring circle{transition:stroke-dashoffset 1s linear;transform-origin:center;transform:rotate(-90deg);}
      .gs-potato-count{font-size:56px;font-weight:800;line-height:1;}
      .gs-potato-label{font-size:14px;color:rgba(255,255,255,0.5);margin-top:4px;}
      .gs-potato-instruction{background:rgba(255,255,255,0.06);border-radius:16px;padding:16px 20px;text-align:center;font-size:15px;color:rgba(255,255,255,0.8);width:100%;}
      .gs-potato-pass{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:18px;border-radius:16px;border:none;font-size:16px;font-weight:700;cursor:pointer;background:linear-gradient(135deg,${e},${e}cc);color:#fff;box-shadow:0 6px 24px ${e}50;transition:all 0.2s;}
      .gs-potato-pass:active{transform:scale(0.97);}
      .gs-potato-loser{text-align:center;padding:20px;}
      .gs-potato-loser .loser-emoji{font-size:64px;display:block;margin-bottom:12px;}
      .gs-potato-loser h2{font-size:24px;font-weight:800;margin-bottom:8px;}
      .gs-potato-loser p{color:rgba(255,255,255,0.6);font-size:15px;}

      /* Word input engine */
      .gs-word{display:flex;flex-direction:column;gap:16px;}
      .gs-word-prompt{background:rgba(255,255,255,0.05);border-radius:16px;padding:20px;text-align:center;}
      .gs-word-prompt .wp-label{font-size:12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;}
      .gs-word-prompt .wp-word{font-size:28px;font-weight:800;letter-spacing:2px;color:${e};}
      .gs-word-prompt .wp-hint{font-size:13px;color:rgba(255,255,255,0.5);margin-top:6px;}
      .gs-word-input-wrap{display:flex;gap:10px;}
      .gs-word-input{flex:1;padding:14px 18px;background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.12);border-radius:14px;font-size:18px;font-weight:600;color:#fff;outline:none;transition:border-color 0.2s;font-family:inherit;}
      .gs-word-input:focus{border-color:${e};}
      .gs-word-input::placeholder{color:rgba(255,255,255,0.25);}
      .gs-word-submit{padding:14px 20px;background:${e};border:none;border-radius:14px;color:#fff;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.2s;}
      .gs-word-submit:active{transform:scale(0.95);}
      .gs-word-result{padding:14px 18px;border-radius:14px;font-size:15px;font-weight:600;text-align:center;display:none;}
      .gs-word-result.correct{display:block;background:rgba(78,203,113,0.2);color:#4ecb71;border:1px solid rgba(78,203,113,0.3);}
      .gs-word-result.wrong{display:block;background:rgba(255,71,87,0.2);color:#ff4757;border:1px solid rgba(255,71,87,0.3);}

      /* Tap reaction engine */
      .gs-tap{display:flex;flex-direction:column;align-items:center;gap:20px;}
      .gs-tap-zone{width:200px;height:200px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;background:${e}20;border:3px solid ${e}50;transition:all 0.15s;position:relative;overflow:hidden;}
      .gs-tap-zone:active{transform:scale(0.93);background:${e}40;}
      .gs-tap-zone .tz-icon{font-size:64px;}
      .gs-tap-zone .tz-ripple{position:absolute;width:100%;height:100%;border-radius:50%;background:${e};opacity:0;animation:tapRipple 0.4s ease-out;}
      @keyframes tapRipple{0%{transform:scale(0);opacity:0.4;}100%{transform:scale(2);opacity:0;}}
      .gs-tap-count{font-size:48px;font-weight:800;color:${e};}
      .gs-tap-label{font-size:14px;color:rgba(255,255,255,0.5);}
      .gs-tap-timer{font-size:20px;font-weight:700;}

      /* Charades engine */
      .gs-charades-card{background:linear-gradient(135deg,${e}20,${e}08);border:1.5px solid ${e}40;border-radius:20px;padding:28px 24px;text-align:center;position:relative;}
      .gs-charades-category{font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:${e};margin-bottom:12px;font-weight:600;}
      .gs-charades-word{font-size:32px;font-weight:800;margin-bottom:12px;letter-spacing:-0.5px;}
      .gs-charades-instruction{font-size:14px;color:rgba(255,255,255,0.55);line-height:1.5;}
      .gs-charades-cover{position:absolute;inset:0;background:rgba(10,10,15,0.92);border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all 0.3s;}
      .gs-charades-cover .cc-icon{font-size:48px;margin-bottom:12px;}
      .gs-charades-cover .cc-text{font-size:16px;font-weight:600;color:rgba(255,255,255,0.7);}
      .gs-charades-cover.hidden{opacity:0;pointer-events:none;}
      .gs-charades-timer-bar{height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden;margin-top:16px;}
      .gs-charades-timer-fill{height:100%;background:${e};border-radius:2px;transition:width 1s linear;}

      /* Riddle engine */
      .gs-riddle-q{background:rgba(255,255,255,0.05);border-radius:16px;padding:22px;text-align:center;font-size:18px;font-weight:600;line-height:1.5;}
      .gs-riddle-reveal{width:100%;padding:14px;border-radius:14px;border:1.5px dashed rgba(255,255,255,0.2);background:transparent;color:rgba(255,255,255,0.5);font-size:14px;font-weight:600;cursor:pointer;transition:all 0.25s;font-family:inherit;}
      .gs-riddle-reveal:hover{border-color:${e};color:${e};}
      .gs-riddle-answer{padding:16px;background:${e}20;border:1px solid ${e}40;border-radius:14px;text-align:center;font-size:18px;font-weight:700;color:${e};display:none;animation:fadeSlideUp 0.3s ease;}
      .gs-riddle-answer.show{display:block;}

      /* Two-choice engine */
      .gs-choice-vs{display:flex;align-items:center;gap:12px;}
      .gs-choice-btn{flex:1;padding:20px 16px;border-radius:16px;border:2px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#fff;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.25s;line-height:1.4;font-family:inherit;}
      .gs-choice-btn:active{transform:scale(0.96);}
      .gs-choice-btn.selected-a{border-color:${e};background:${e}25;}
      .gs-choice-btn.selected-b{border-color:#ff6b6b;background:#ff6b6b25;}
      .gs-choice-vs-badge{font-size:14px;font-weight:800;color:rgba(255,255,255,0.3);flex-shrink:0;}
      .gs-choice-votes{display:flex;gap:8px;margin-top:12px;}
      .gs-choice-vote-bar{flex:1;height:6px;border-radius:3px;background:rgba(255,255,255,0.1);overflow:hidden;}
      .gs-choice-vote-fill{height:100%;border-radius:3px;transition:width 0.5s ease;}

      /* Physical engine */
      .gs-physical{display:flex;flex-direction:column;align-items:center;gap:20px;}
      .gs-physical-instruction{width:100%;background:${e}15;border:1.5px solid ${e}30;border-radius:16px;padding:22px;text-align:center;font-size:18px;font-weight:600;line-height:1.5;color:#fff;}
      .gs-physical-timer-big{font-size:80px;font-weight:800;color:${e};line-height:1;}
      .gs-physical-timer-label{font-size:14px;color:rgba(255,255,255,0.4);}
      .gs-physical-start{width:100%;padding:18px;border-radius:16px;border:none;background:linear-gradient(135deg,${e},${e}bb);color:#fff;font-size:17px;font-weight:700;cursor:pointer;transition:all 0.2s;font-family:inherit;}
      .gs-physical-start:active{transform:scale(0.97);}

      /* Score track engine */
      .gs-scoretrack{display:flex;flex-direction:column;gap:16px;}
      .gs-scoretrack-instruction{text-align:center;font-size:16px;color:rgba(255,255,255,0.7);line-height:1.5;}
      .gs-scoretrack-players{display:flex;gap:12px;}
      .gs-scoretrack-player{flex:1;background:rgba(255,255,255,0.05);border-radius:16px;padding:16px;text-align:center;border:1.5px solid transparent;transition:all 0.25s;}
      .gs-scoretrack-player.winner-selected{border-color:${e};background:${e}20;}
      .gs-scoretrack-avatar{font-size:32px;margin-bottom:8px;}
      .gs-scoretrack-name{font-size:14px;font-weight:600;margin-bottom:4px;}
      .gs-scoretrack-pts{font-size:20px;font-weight:800;color:${e};}
      .gs-scoretrack-win-btn{width:100%;padding:12px;border-radius:12px;border:none;background:${e}25;color:${e};font-size:14px;font-weight:700;cursor:pointer;margin-top:8px;transition:all 0.2s;font-family:inherit;}
      .gs-scoretrack-win-btn:active{transform:scale(0.96);}

      /* Trivia engine */
      .gs-trivia-q{background:rgba(255,255,255,0.05);border-radius:16px;padding:22px;font-size:18px;font-weight:600;line-height:1.5;text-align:center;}
      .gs-trivia-options{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
      .gs-trivia-opt{padding:14px 12px;border-radius:14px;border:1.5px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#fff;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.25s;font-family:inherit;text-align:center;line-height:1.3;}
      .gs-trivia-opt:active{transform:scale(0.96);}
      .gs-trivia-opt.correct{border-color:#4ecb71;background:rgba(78,203,113,0.2);color:#4ecb71;}
      .gs-trivia-opt.wrong{border-color:#ff4757;background:rgba(255,71,87,0.2);color:#ff4757;}
      .gs-trivia-opt.disabled{pointer-events:none;opacity:0.5;}

      /* Footer */
      .gs-footer{padding:16px 20px;padding-bottom:calc(16px + env(safe-area-inset-bottom,0));background:rgba(255,255,255,0.03);border-top:1px solid rgba(255,255,255,0.06);flex-shrink:0;}
      .gs-footer-actions{display:flex;gap:10px;}
      .gs-btn{display:flex;align-items:center;justify-content:center;gap:8px;padding:15px 20px;border-radius:14px;border:none;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.2s;font-family:inherit;}
      .gs-btn svg{width:18px;height:18px;stroke:currentColor;}
      .gs-btn:active{transform:scale(0.97);}
      .gs-btn-primary{flex:1;background:linear-gradient(135deg,${e},${e}cc);color:#fff;box-shadow:0 4px 20px ${e}40;}
      .gs-btn-secondary{background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.7);}
      .gs-btn-success{background:rgba(78,203,113,0.2);color:#4ecb71;border:1.5px solid rgba(78,203,113,0.3);}
      .gs-btn-danger{background:rgba(255,71,87,0.15);color:#ff4757;}

      /* Round end modal */
      .gs-modal{position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:200;animation:fadeIn 0.2s ease;}
      .gs-modal-box{background:#1a1a2e;border-radius:24px;padding:28px 24px;width:88%;max-width:340px;animation:scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1);}
      .gs-modal-title{font-size:22px;font-weight:800;text-align:center;margin-bottom:8px;}
      .gs-modal-sub{font-size:14px;color:rgba(255,255,255,0.5);text-align:center;margin-bottom:20px;}
      .gs-modal-actions{display:flex;gap:10px;}
      .gs-modal-actions .gs-btn{flex:1;}

      /* Animations */
      @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
      @keyframes scaleIn{from{opacity:0;transform:scale(0.85);}to{opacity:1;transform:scale(1);}}
      @keyframes fadeSlideUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
      @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}
      @keyframes shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-6px);}75%{transform:translateX(6px);}}
      @keyframes potatoGlow{0%,100%{box-shadow:0 0 20px #ff6b6b40;}50%{box-shadow:0 0 60px #ff6b6b90;}}
    </style>`}buildShell(){return this.currentPlayer()?.id,this.hostId,`
      <div class="gs-header">
        <button class="gs-exit" id="gs-exit">${c.X}</button>
        <div class="gs-title">
          <div class="gs-game-name">${this.game?.icon} ${this.game?.name}</div>
          <div class="gs-round" id="gs-round">Round ${this.round} of ${this.maxRounds}</div>
        </div>
        <div class="gs-host-badge">${c.Crown}<span>Host</span></div>
      </div>

      <div class="gs-players" id="gs-players">
        ${this.buildPlayerChips()}
      </div>

      <div class="gs-body" id="gs-body">
        <!-- engine renders here -->
      </div>

      <div class="gs-footer" id="gs-footer">
        <!-- footer renders here -->
      </div>
    `}buildPlayerChips(){return this.players.map((e,t)=>`
      <div class="gs-player-chip ${t===this.currentPlayerIndex?`active`:``}" data-player-id="${e.id}">
        <span class="chip-avatar">${e.avatar}</span>
        <span class="chip-name">${e.name}</span>
        <span class="chip-score" id="score-chip-${e.id}">${this.scores[e.id]||0}</span>
      </div>
    `).join(``)}currentPlayer(){return this.players[this.currentPlayerIndex]}renderCurrentEngine(){let e=this.container?.querySelector(`#gs-body`),t=this.container?.querySelector(`#gs-footer`);if(!(!e||!t)){switch(this.currentPrompt=null,this.promptRevealed=!1,this.engine){case`hot-potato`:this.renderHotPotato(e,t);break;case`word-input`:this.renderWordInput(e,t);break;case`tap-reaction`:this.renderTapReaction(e,t);break;case`charades`:this.renderCharades(e,t);break;case`riddle`:this.renderRiddle(e,t);break;case`two-choice`:this.renderTwoChoice(e,t);break;case`physical`:this.renderPhysical(e,t);break;case`score-track`:this.renderScoreTrack(e,t);break;case`trivia`:this.renderTrivia(e,t);break;default:this.renderPromptCard(e,t);break}this.updatePlayerChips(),this.updateRoundDisplay()}}renderPromptCard(e,t){let n=this.game,r=this.currentPlayer(),i=r.id===this.hostId,a=[`truth-or-dare`,`never-have-i`,`never-have-i-ever`,`dessert-roulette`,`compliment-chain`].includes(n.id);e.innerHTML=`
      ${this.buildCurrentPlayerCard(r,i)}
      ${a?this.buildModeTabs():``}
      <div class="gs-prompt-card" id="gs-prompt-card">
        <div class="gs-prompt-icon">${m(n.id)}</div>
        <p class="gs-prompt-tap">Tap to reveal</p>
        <p class="gs-prompt-text" id="gs-prompt-text" style="display:none;"></p>
        <div class="gs-prompt-answer" id="gs-prompt-answer"></div>
      </div>
    `,t.innerHTML=`
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${c.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-success" id="gs-correct">${c.Check}<span>Done ✓</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next"><span>Next</span>${c.ArrowRight}</button>
      </div>
    `;let o=e.querySelector(`#gs-prompt-card`);o.addEventListener(`click`,()=>{if(!this.currentPrompt){this.currentPrompt=this.pickPrompt();let e=o.querySelector(`#gs-prompt-text`),t=o.querySelector(`.gs-prompt-tap`),n=o.querySelector(`.gs-prompt-icon`);e&&t&&(t.style.display=`none`,n.style.display=`none`,e.style.display=`block`,e.textContent=this.currentPrompt.text,o.classList.add(`revealed`));let r=document.createElement(`div`);r.className=`gs-mode-badge`,r.textContent=this.gameMode.toUpperCase(),o.appendChild(r)}else if(this.currentPrompt.answer&&!this.promptRevealed){this.promptRevealed=!0;let e=o.querySelector(`#gs-prompt-answer`);e&&(e.textContent=`💡 ${this.currentPrompt.answer}`,e.classList.add(`show`))}}),t.querySelector(`#gs-skip`)?.addEventListener(`click`,()=>{this.currentPrompt=null,this.renderCurrentEngine()}),t.querySelector(`#gs-correct`)?.addEventListener(`click`,()=>{this.awardPoints(r.id,10),this.copilot?.react(`correct`),this.goNext()}),t.querySelector(`#gs-next`)?.addEventListener(`click`,()=>{this.copilot?.react(`next`),this.goNext()}),a&&this.attachModeTabListeners(e)}renderHotPotato(e,t){let n=15+Math.floor(Math.random()*16);this.hotPotatoCountdown=n,this.hotPotatoActive=!1,e.innerHTML=`
      <div class="gs-potato">
        <div style="text-align:center;">
          <p style="font-size:14px;color:rgba(255,255,255,0.5);">Pass the phone! When time runs out...</p>
          <p style="font-size:13px;color:rgba(255,255,255,0.3);margin-top:4px;">🔥 Whoever holds it loses a point!</p>
        </div>
        <div class="gs-potato-timer" id="potato-timer">
          <svg class="gs-potato-ring" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="10"/>
            <circle id="potato-progress" cx="80" cy="80" r="70" fill="none" stroke="#ff6b6b" stroke-width="10"
              stroke-dasharray="${2*Math.PI*70}" stroke-dashoffset="0" stroke-linecap="round"/>
          </svg>
          <div>
            <div class="gs-potato-count" id="potato-count">${n}</div>
            <div class="gs-potato-label">seconds</div>
          </div>
        </div>
        <div class="gs-potato-instruction" id="potato-instruction">
          🥔 Pass the phone to <strong>${this.nextPlayerName()}</strong> as fast as you can!
        </div>
        <button class="gs-potato-pass" id="potato-start">
          ${c.Play} <span>Start Hot Potato!</span>
        </button>
      </div>
    `,t.innerHTML=`
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${c.SkipForward}<span>Skip Round</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next" style="display:none;"><span>Next Round</span>${c.ArrowRight}</button>
      </div>
    `;let r=e.querySelector(`#potato-start`),i=2*Math.PI*70;r.addEventListener(`click`,()=>{this.hotPotatoActive||(this.hotPotatoActive=!0,r.textContent=`🔥 PASS IT NOW!`,r.style.animation=`potatoGlow 0.5s ease infinite`,this.runHotPotatoTimer(n,i))}),t.querySelector(`#gs-skip`)?.addEventListener(`click`,()=>{this.clearHotPotato(),this.goNext()}),t.querySelector(`#gs-next`)?.addEventListener(`click`,()=>{this.clearHotPotato(),this.goNext()})}runHotPotatoTimer(e,t){let n=e,r=this.container?.querySelector(`#potato-progress`),i=this.container?.querySelector(`#potato-count`);this.container?.querySelector(`#potato-instruction`),this.hotPotatoTimer=window.setInterval(()=>{if(n--,i&&(i.textContent=String(n)),r){let i=t*(1-n/e);r.style.strokeDashoffset=String(i),n<=5&&(r.style.stroke=`#ff2244`)}if(n<=0){this.clearHotPotato();let e=this.currentPlayer();this.awardPoints(e.id,-5),this.copilot?.react(`wrong`);let t=this.container?.querySelector(`#gs-body`),n=this.container?.querySelector(`#gs-footer`);if(t&&(t.innerHTML=`
            <div class="gs-potato-loser">
              <span class="loser-emoji">💥</span>
              <h2>${e.name} gets burned!</h2>
              <p>You were holding the potato when time ran out!</p>
              <p style="margin-top:12px;font-size:13px;color:rgba(255,255,255,0.3);">-5 points</p>
            </div>
          `),n){let e=n.querySelector(`#gs-next`),t=n.querySelector(`#gs-skip`);e&&(e.style.display=`flex`),t&&(t.style.display=`none`)}}},1e3)}clearHotPotato(){this.hotPotatoTimer&&=(clearInterval(this.hotPotatoTimer),null),this.hotPotatoActive=!1}nextPlayerName(){let e=(this.currentPlayerIndex+1)%this.players.length;return this.players[e]?.name||`next player`}renderWordInput(e,t){let n=this.currentPlayer(),r=n.id===this.hostId,i=this.pickPrompt();this.currentPrompt=i;let a=this.game.id,o=`Your word:`,s=``,l=`Type your answer...`;if(a===`word-chain`){let e=i.text?.slice(-1).toUpperCase()||`A`;o=`Must start with: "${e}"`,s=`Previous word: ${i.text}`,l=`Word starting with ${e}...`}else a===`spelling-bee`||a===`spelling-bee-pro`?(o=`Spell this word:`,s=`Type the correct spelling`,l=`Spell it out...`):a===`anagram-attack`?(o=`Unscramble:`,l=`What word is it?`):a===`word-scramble`?(o=`Unscramble these letters:`,l=`The word is...`):a===`tongue-twister`?(o=`Say this 5 times fast:`,l=`When ready, tap Done`):a===`alphabet-game`&&(o=`Category: Animals (A-Z)`,l=`Name starting with next letter...`);e.innerHTML=`
      ${this.buildCurrentPlayerCard(n,r)}
      <div class="gs-word">
        <div class="gs-word-prompt">
          <div class="wp-label">${o}</div>
          <div class="wp-word">${i.text||i.icon||`?`}</div>
          ${s?`<div class="wp-hint">${s}</div>`:``}
        </div>
        <div class="gs-word-input-wrap">
          <input class="gs-word-input" id="gs-word-input" type="text" placeholder="${l}" autocomplete="off" autocorrect="off" spellcheck="false"/>
          <button class="gs-word-submit" id="gs-word-submit">${c.Check}</button>
        </div>
        <div class="gs-word-result" id="gs-word-result"></div>
      </div>
    `,t.innerHTML=`
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${c.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next"><span>Next</span>${c.ArrowRight}</button>
      </div>
    `;let u=e.querySelector(`#gs-word-input`),d=e.querySelector(`#gs-word-submit`),f=e.querySelector(`#gs-word-result`),p=()=>{let e=u.value.trim().toLowerCase();if(!e)return;let t=i.answer?.toLowerCase();if(a===`word-chain`){let t=i.text?.slice(-1).toLowerCase();e.startsWith(t||``)?(f.textContent=`✓ Great! "${e.toUpperCase()}" — pass it on!`,f.className=`gs-word-result correct`,this.awardPoints(n.id,10),this.copilot?.react(`correct`)):(f.textContent=`✗ Must start with "${t?.toUpperCase()}"`,f.className=`gs-word-result wrong`,f.style.animation=`shake 0.4s ease`);return}if(!t||a===`tongue-twister`||a===`limerick-game`){f.textContent=`✓ Nice! Others vote if it counts!`,f.className=`gs-word-result correct`,this.awardPoints(n.id,10);return}e===t?(f.textContent=`✓ Correct! The answer is "${t}"`,f.className=`gs-word-result correct`,this.awardPoints(n.id,10),this.copilot?.react(`correct`)):(f.textContent=`✗ The answer was "${t}" — try again!`,f.className=`gs-word-result wrong`,this.copilot?.react(`wrong`))};d.addEventListener(`click`,p),u.addEventListener(`keydown`,e=>{e.key===`Enter`&&p()}),t.querySelector(`#gs-skip`)?.addEventListener(`click`,()=>this.goNext()),t.querySelector(`#gs-next`)?.addEventListener(`click`,()=>this.goNext()),setTimeout(()=>u.focus(),300)}renderTapReaction(e,t){let n=this.currentPlayer(),r=this.game.id,i=0,a=!1,o={"speed-tap":`👆`,"button-mash":`🎮`,"reaction-test":`⚡`,"rhythm-tap":`🥁`,"shape-tap":`⬡`,"color-match":`🎨`,"memory-tap":`🧠`,countdown:`⏰`,"ninja-clap":`🥷`,"hand-slap":`✋`}[r]||`👆`,s=[`button-mash`,`speed-tap`,`ninja-clap`].includes(r);e.innerHTML=`
      <div class="gs-tap">
        <div>
          <p style="text-align:center;font-size:14px;color:rgba(255,255,255,0.5);">${n.name}'s turn</p>
          ${s?`<p style="text-align:center;font-size:13px;color:rgba(255,255,255,0.3);margin-top:4px;">Tap as fast as you can in 10s!</p>`:`<p style="text-align:center;font-size:13px;color:rgba(255,255,255,0.3);margin-top:4px;">Tap when you're ready to react!</p>`}
        </div>
        <div class="gs-tap-zone" id="gs-tap-zone">
          <div class="gs-tap-zone tz-icon" style="font-size:64px;">${o}</div>
        </div>
        <div class="gs-tap-count" id="gs-tap-count">0</div>
        <div class="gs-tap-label" id="gs-tap-label">${s?`taps`:`Tap to start!`}</div>
        <div class="gs-tap-timer" id="gs-tap-timer" style="color:rgba(255,255,255,0.4);">10s</div>
      </div>
    `,t.innerHTML=`
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${c.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next" style="display:none;"><span>Next</span>${c.ArrowRight}</button>
      </div>
    `;let l=e.querySelector(`#gs-tap-zone`),u=e.querySelector(`#gs-tap-count`),d=e.querySelector(`#gs-tap-label`),f=e.querySelector(`#gs-tap-timer`),p=()=>{a=!1;let e=Math.min(i*2,50);this.awardPoints(n.id,e),d.textContent=`${i} taps = +${e} points!`,f.style.color=`#4ecb71`;let r=t.querySelector(`#gs-next`),o=t.querySelector(`#gs-skip`);r&&(r.style.display=`flex`),o&&(o.style.display=`none`)};l.addEventListener(`click`,()=>{let e=document.createElement(`div`);if(e.className=`tz-ripple`,l.appendChild(e),setTimeout(()=>e.remove(),400),!a&&s){a=!0;let e=10;f.style.color=`#fff`;let t=window.setInterval(()=>{e--,f.textContent=`${e}s`,e<=3&&(f.style.color=`#ff4757`),e<=0&&(clearInterval(t),p())},1e3)}if((a||!s)&&(i++,u.textContent=String(i),!s&&i>=1&&!a)){a=!0,d.textContent=`Now tap again as fast as possible!`,u.textContent=`⏱`;let e=Date.now(),r=()=>{let i=Date.now()-e,o=i<500?20:i<1e3?15:i<2e3?10:5;this.awardPoints(n.id,o),u.textContent=`${i}ms`,d.textContent=`Reaction time! +${o} pts`,l.removeEventListener(`click`,r),a=!1;let s=t.querySelector(`#gs-next`),c=t.querySelector(`#gs-skip`);s&&(s.style.display=`flex`),c&&(c.style.display=`none`)};setTimeout(()=>l.addEventListener(`click`,r),50)}}),t.querySelector(`#gs-skip`)?.addEventListener(`click`,()=>{this.clearTimer(),this.goNext()}),t.querySelector(`#gs-next`)?.addEventListener(`click`,()=>this.goNext())}renderCharades(e,t){let n=this.currentPlayer(),r=n.id===this.hostId,i=this.pickPrompt();this.currentPrompt=i;let a=this.game.id,o={charades:`🎭 Act it out — no talking, no sounds!`,pictionary:`🖊️ Draw it on paper — no letters or numbers!`,"emoji-pictionary":`😀 Act using only emoji gestures!`,"heads-up":`📱 Hold the phone to your forehead — others give clues!`,"drawing-doodle":`✏️ Draw it any way you like!`,"portrait-party":`🎨 Draw the person sitting next to you!`,"improv-theater":`🎬 Act out the scene! Yes, and...`,"lip-sync":`👄 Lip sync perfectly — no actual singing!`,"air-guitar":`🎸 Rock out on your air guitar!`,"voice-actor":`🎙️ Say this in a different voice or accent!`,"sound-effects":`🔊 Make only the sound — no words!`,"dance-improv":`💃 Dance to express this word!`,"dance-off":`🕺 Show your best dance move for this style!`,"beat-box":`🥁 Beatbox a rhythm for this!`,karaoke:`🎤 Sing this genre — make up the words!`,"silent-scream":`😱 Scream silently — as dramatically as possible!`,"slow-motion":`🐢 Do this action in slow motion!`,"talent-show":`⭐ Perform your best 30-second talent!`,"hot-seat":`🔥 Answer rapid fire questions from everyone!`,"battle-rap":`🎤 Freestyle rap about the person to your left!`}[a]||`🎭 Act it out — others must guess!`;e.innerHTML=`
      ${this.buildCurrentPlayerCard(n,r)}
      <div class="gs-charades-card" id="charades-card">
        <div class="gs-charades-cover" id="charades-cover">
          <div class="cc-icon">👁️</div>
          <div class="cc-text">Tap to see your word</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.3);margin-top:6px;">Only ${n.name} should look!</div>
        </div>
        <div class="gs-charades-category">${this.game?.category?.toUpperCase()} CHALLENGE</div>
        <div class="gs-charades-word" id="charades-word">${typeof i==`string`?i:i.text||i.icon||`?`}</div>
        <div class="gs-charades-instruction">${o}</div>
        <div class="gs-charades-timer-bar">
          <div class="gs-charades-timer-fill" id="charades-timer-fill" style="width:100%;"></div>
        </div>
      </div>
      <div style="text-align:center;font-size:13px;color:rgba(255,255,255,0.4);padding:4px 0;">Everyone else — look away until they tap!</div>
    `,t.innerHTML=`
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${c.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-success" id="gs-correct">${c.Check}<span>Guessed! +10</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next"><span>Next</span>${c.ArrowRight}</button>
      </div>
    `;let s=!1,l=e.querySelector(`#charades-cover`);l.addEventListener(`click`,()=>{l.classList.add(`hidden`),s||(s=!0,this.runCharadesTimer(45))}),t.querySelector(`#gs-skip`)?.addEventListener(`click`,()=>{this.clearTimer(),this.goNext()}),t.querySelector(`#gs-correct`)?.addEventListener(`click`,()=>{this.clearTimer(),this.awardPoints(n.id,10),this.copilot?.react(`correct`),this.goNext()}),t.querySelector(`#gs-next`)?.addEventListener(`click`,()=>{this.clearTimer(),this.goNext()})}runCharadesTimer(e){let t=e,n=this.container?.querySelector(`#charades-timer-fill`);this.timerInterval=window.setInterval(()=>{t--,n&&(n.style.width=`${t/e*100}%`),t<=10&&n&&(n.style.background=`#ff4757`),t<=0&&(this.clearTimer(),this.copilot?.react(`wrong`))},1e3)}renderRiddle(e,t){let n=this.currentPlayer(),r=n.id===this.hostId,i=this.pickPrompt();this.currentPrompt=i,e.innerHTML=`
      ${this.buildCurrentPlayerCard(n,r)}
      <div class="gs-riddle-q">
        <div style="font-size:32px;margin-bottom:14px;">${i.icon||`🧩`}</div>
        ${i.text}
      </div>
      <button class="gs-riddle-reveal" id="gs-reveal-answer">
        👁️ Reveal Answer
      </button>
      <div class="gs-riddle-answer" id="gs-riddle-answer">
        ${i.answer||`?`}
      </div>
    `,t.innerHTML=`
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${c.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-success" id="gs-correct">${c.Check}<span>Got it! +10</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next"><span>Next</span>${c.ArrowRight}</button>
      </div>
    `,e.querySelector(`#gs-reveal-answer`)?.addEventListener(`click`,()=>{let t=e.querySelector(`#gs-riddle-answer`);t&&t.classList.add(`show`)}),t.querySelector(`#gs-skip`)?.addEventListener(`click`,()=>this.goNext()),t.querySelector(`#gs-correct`)?.addEventListener(`click`,()=>{this.awardPoints(n.id,10),this.copilot?.react(`correct`),this.goNext()}),t.querySelector(`#gs-next`)?.addEventListener(`click`,()=>this.goNext())}renderTwoChoice(e,t){let n=this.currentPlayer(),r=this.pickPrompt();this.currentPrompt=r;let i=``,a=``,o=r.text||``,s=o.toLowerCase().indexOf(` or `);s>-1?(i=o.substring(0,s).replace(/would you rather\s*/i,``).trim(),a=o.substring(s+4).trim().replace(/\?$/,``)):(i=o,a=`Something else`);let l=0,u=0;e.innerHTML=`
      <div style="text-align:center;padding:8px 0;">
        <p style="font-size:13px;color:rgba(255,255,255,0.4);">Everyone votes — tap your choice!</p>
      </div>
      <div class="gs-choice-vs">
        <button class="gs-choice-btn" id="choice-a">${i||`Option A`}</button>
        <span class="gs-choice-vs-badge">OR</span>
        <button class="gs-choice-btn" id="choice-b">${a||`Option B`}</button>
      </div>
      <div class="gs-choice-votes" id="choice-votes" style="display:none;">
        <div style="flex:1;text-align:center;">
          <div style="font-size:20px;font-weight:800;" id="votes-a">0</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.4);">votes</div>
          <div class="gs-choice-vote-bar"><div class="gs-choice-vote-fill" id="fill-a" style="background:#667eea;width:50%;"></div></div>
        </div>
        <div style="flex:1;text-align:center;">
          <div style="font-size:20px;font-weight:800;" id="votes-b">0</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.4);">votes</div>
          <div class="gs-choice-vote-bar"><div class="gs-choice-vote-fill" id="fill-b" style="background:#ff6b6b;width:50%;"></div></div>
        </div>
      </div>
      <div style="text-align:center;padding:8px 0;">
        <p style="font-size:13px;color:rgba(255,255,255,0.4);">Discuss why after voting!</p>
      </div>
    `,t.innerHTML=`
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${c.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next"><span>Next</span>${c.ArrowRight}</button>
      </div>
    `;let d=()=>{let t=l+u||1,n=e.querySelector(`#votes-a`),r=e.querySelector(`#votes-b`),i=e.querySelector(`#fill-a`),a=e.querySelector(`#fill-b`),o=e.querySelector(`#choice-votes`);o.style.display=`flex`,n&&(n.textContent=String(l)),r&&(r.textContent=String(u)),i&&(i.style.width=`${l/t*100}%`),a&&(a.style.width=`${u/t*100}%`)};e.querySelector(`#choice-a`)?.addEventListener(`click`,()=>{l++,e.querySelector(`#choice-a`)?.classList.add(`selected-a`),this.awardPoints(n.id,5),d()}),e.querySelector(`#choice-b`)?.addEventListener(`click`,()=>{u++,e.querySelector(`#choice-b`)?.classList.add(`selected-b`),this.awardPoints(n.id,5),d()}),t.querySelector(`#gs-skip`)?.addEventListener(`click`,()=>this.goNext()),t.querySelector(`#gs-next`)?.addEventListener(`click`,()=>this.goNext())}renderPhysical(e,t){let n=this.currentPlayer(),r=n.id===this.hostId,i=this.pickPrompt();this.currentPrompt=i;let a={"plank-challenge":30,"squat-challenge":20,"pushup-showdown":20,"jumping-jacks":15,"wall-sit":30,"balance-test":30,"balance-challenge":30,"endurance-test":45,"breath-hold":20,"stretch-challenge":20,"meditation-game":30,"one-leg-stand":30,"laughter-hold":30}[this.game.id]||30,o=!1,s=a;e.innerHTML=`
      ${this.buildCurrentPlayerCard(n,r)}
      <div class="gs-physical">
        <div class="gs-physical-instruction">
          ${i.icon||`💪`} ${i.text}
        </div>
        <div>
          <div class="gs-physical-timer-big" id="physical-timer">${a}</div>
          <div class="gs-physical-timer-label">seconds</div>
        </div>
        <button class="gs-physical-start" id="physical-start">
          ${c.Play} Start Timer
        </button>
      </div>
    `,t.innerHTML=`
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${c.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-success" id="gs-correct" style="display:none;">${c.Check}<span>Completed! +10</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next" style="display:none;"><span>Next</span>${c.ArrowRight}</button>
      </div>
    `;let l=e.querySelector(`#physical-timer`),u=e.querySelector(`#physical-start`);u.addEventListener(`click`,()=>{if(o)return;o=!0,u.style.display=`none`;let e=t.querySelector(`#gs-correct`),r=t.querySelector(`#gs-next`),i=t.querySelector(`#gs-skip`);this.timerInterval=window.setInterval(()=>{s--,l&&(l.textContent=String(s)),s<=10&&l&&(l.style.color=`#ff4757`),s<=0&&(this.clearTimer(),l&&(l.textContent=`✓`),l.style.color=`#4ecb71`,this.awardPoints(n.id,10),e&&(e.style.display=`flex`),r&&(r.style.display=`flex`),i&&(i.style.display=`none`),this.copilot?.react(`correct`))},1e3)}),t.querySelector(`#gs-skip`)?.addEventListener(`click`,()=>{this.clearTimer(),this.goNext()}),t.querySelector(`#gs-correct`)?.addEventListener(`click`,()=>this.goNext()),t.querySelector(`#gs-next`)?.addEventListener(`click`,()=>this.goNext())}renderScoreTrack(e,t){this.currentPlayer();let n=this.game.id,r={"rock-paper-scissors":`✊ Best of 3 — play Rock Paper Scissors!`,"thumb-war":`👍 1 2 3 4, I declare a thumb war!`,"arm-wrestle":`💪 Arm wrestle — whoever wins gets the points!`,"stare-down":`👀 First one to blink loses!`,"staring-match":`👀 Stare into each other's eyes. No blinking!`,"laugh-contest":`😂 Don't laugh! Make faces at each other.`,"eye-contact":`👁️ Maintain eye contact — no looking away!`,"duel-master":`⚔️ Face off in this challenge!`,"finger-fight":`✌️ Thumb war — best 2 out of 3!`}[n]||`🏆 Face off and may the best player win!`,i=this.players[this.currentPlayerIndex],a=(this.currentPlayerIndex+1)%this.players.length,o=this.players[a];e.innerHTML=`
      <div class="gs-scoretrack">
        <div class="gs-scoretrack-instruction">${r}</div>
        <div class="gs-scoretrack-players">
          <div class="gs-scoretrack-player" id="st-p1">
            <div class="gs-scoretrack-avatar">${i.avatar}</div>
            <div class="gs-scoretrack-name">${i.name}</div>
            <div class="gs-scoretrack-pts">${this.scores[i.id]||0} pts</div>
            <button class="gs-scoretrack-win-btn" data-winner="${i.id}">🏆 ${i.name} Wins!</button>
          </div>
          <div style="display:flex;align-items:center;font-size:20px;font-weight:800;color:rgba(255,255,255,0.3);">VS</div>
          <div class="gs-scoretrack-player" id="st-p2">
            <div class="gs-scoretrack-avatar">${o.avatar}</div>
            <div class="gs-scoretrack-name">${o.name}</div>
            <div class="gs-scoretrack-pts">${this.scores[o.id]||0} pts</div>
            <button class="gs-scoretrack-win-btn" data-winner="${o.id}">🏆 ${o.name} Wins!</button>
          </div>
        </div>
        <div style="text-align:center;font-size:13px;color:rgba(255,255,255,0.3);">Tap the winner's button when done</div>
      </div>
    `,t.innerHTML=`
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${c.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next"><span>Next</span>${c.ArrowRight}</button>
      </div>
    `,e.querySelectorAll(`.gs-scoretrack-win-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.winner;this.awardPoints(n,15),e.querySelectorAll(`.gs-scoretrack-player`).forEach(e=>{e.id===(n===i.id?`st-p1`:`st-p2`)&&e.classList.add(`winner-selected`)}),this.copilot?.react(`correct`)})}),t.querySelector(`#gs-skip`)?.addEventListener(`click`,()=>this.goNext()),t.querySelector(`#gs-next`)?.addEventListener(`click`,()=>this.goNext())}renderTrivia(e,t){let n=this.currentPlayer(),r=n.id===this.hostId,i=this.triviaBank;if(i.length===0){this.renderPromptCard(e,t);return}let a=i[this.triviaIndex%i.length];this.triviaIndex++;let o=!1;e.innerHTML=`
      ${this.buildCurrentPlayerCard(n,r)}
      <div class="gs-trivia-q">${a.q}</div>
      <div class="gs-trivia-options">
        ${a.options.map(e=>`
          <button class="gs-trivia-opt" data-answer="${e}">${e}</button>
        `).join(``)}
      </div>
    `,t.innerHTML=`
      <div class="gs-footer-actions">
        <button class="gs-btn gs-btn-secondary" id="gs-skip">${c.SkipForward}<span>Skip</span></button>
        <button class="gs-btn gs-btn-primary" id="gs-next" style="display:none;"><span>Next</span>${c.ArrowRight}</button>
      </div>
    `,e.querySelectorAll(`.gs-trivia-opt`).forEach(r=>{r.addEventListener(`click`,()=>{if(o)return;o=!0;let i=r.dataset.answer;e.querySelectorAll(`.gs-trivia-opt`).forEach(e=>{let t=e.dataset.answer;t===a.a?e.classList.add(`correct`):e.classList.add(t===i?`wrong`:`disabled`)}),i===a.a?(this.awardPoints(n.id,10),this.copilot?.react(`correct`)):this.copilot?.react(`wrong`);let s=t.querySelector(`#gs-next`),c=t.querySelector(`#gs-skip`);s&&(s.style.display=`flex`),c&&(c.style.display=`none`)})}),t.querySelector(`#gs-skip`)?.addEventListener(`click`,()=>this.goNext()),t.querySelector(`#gs-next`)?.addEventListener(`click`,()=>this.goNext())}buildCurrentPlayerCard(e,t){return this.game?.color,`
      <div class="gs-current-player">
        <div class="gs-cp-avatar ${t?`is-host`:``}" style="background:${e.color}25;">
          ${e.avatar}
        </div>
        <div>
          <div class="gs-cp-name">${e.name}</div>
          <div class="gs-cp-turn-label">${t?`👑 Host — It's your turn!`:`It's your turn!`}</div>
          <div class="gs-cp-label">${this.scores[e.id]||0} points</div>
        </div>
      </div>
    `}buildModeTabs(){return this.game?.color,`
      <div class="gs-mode-tabs">
        <button class="gs-mode-tab ${this.gameMode===`truth`?`active`:``}" data-mode="truth">Truth</button>
        <button class="gs-mode-tab ${this.gameMode===`dare`?`active`:``}" data-mode="dare">Dare</button>
        <button class="gs-mode-tab ${this.gameMode===`challenge`?`active`:``}" data-mode="challenge">Challenge</button>
        <button class="gs-mode-tab ${this.gameMode===`free`?`active`:``}" data-mode="free">Free</button>
      </div>
    `}attachModeTabListeners(e){e.querySelectorAll(`.gs-mode-tab`).forEach(t=>{t.addEventListener(`click`,()=>{this.gameMode=t.dataset.mode,this.promptPool=T(this.game.id,this.gameMode),this.usedIndices.clear(),e.querySelectorAll(`.gs-mode-tab`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`),this.onModeChange?.(this.gameMode);let n=e.querySelector(`#gs-prompt-card`);if(n){this.currentPrompt=null;let e=n.querySelector(`#gs-prompt-text`),t=n.querySelector(`.gs-prompt-tap`),r=n.querySelector(`.gs-prompt-icon`);e&&(e.style.display=`none`,e.textContent=``),t&&(t.style.display=`block`),r&&(r.style.display=`flex`),n.classList.remove(`revealed`),n.querySelectorAll(`.gs-mode-badge`).forEach(e=>e.remove());let i=n.querySelector(`#gs-prompt-answer`);i&&(i.classList.remove(`show`),i.textContent=``)}})})}pickPrompt(){if(this.promptPool.length===0)return{text:`What would you do with a million dollars?`,icon:`💰`};let e=this.promptPool.map((e,t)=>({p:e,i:t})).filter(({i:e})=>!this.usedIndices.has(e));if(e.length===0)return this.usedIndices.clear(),this.promptPool[Math.floor(Math.random()*this.promptPool.length)];let t=e[Math.floor(Math.random()*e.length)];return this.usedIndices.add(t.i),t.p}goNext(){if(this.clearTimer(),this.currentPlayerIndex=(this.currentPlayerIndex+1)%this.players.length,this.currentPlayerIndex===0&&(this.round++,this.round>this.maxRounds)){this.endGame();return}this.renderCurrentEngine()}awardPoints(e,t){this.scores[e]=(this.scores[e]||0)+t,this.updateScoreChip(e)}updateScoreChip(e){let t=this.container?.querySelector(`#score-chip-${e}`);t&&(t.textContent=String(this.scores[e]||0),t.style.animation=`pulse 0.4s ease`,setTimeout(()=>{t&&(t.style.animation=``)},400))}updatePlayerChips(){let e=this.container?.querySelector(`#gs-players`);e&&(e.innerHTML=this.buildPlayerChips())}updateRoundDisplay(){let e=this.container?.querySelector(`#gs-round`);e&&(e.textContent=`Round ${this.round} of ${this.maxRounds}`)}clearTimer(){this.timerInterval&&=(clearInterval(this.timerInterval),null)}endGame(){this.clearTimer(),this.clearHotPotato(),this.copilot?.celebrate(),setTimeout(()=>{let e=Object.entries(this.scores).sort(([,e],[,t])=>t-e)[0]?.[0],t=this.players.find(t=>t.id===e)||null,n={gameId:this.game?.id||``,winner:t,scores:this.scores,totalRounds:this.round,duration:0};this.copilot?.destroy(),this.onGameEnd?.(n)},2e3)}attachBaseListeners(){this.container?.querySelector(`#gs-exit`)?.addEventListener(`click`,()=>{confirm(`End the game and return to home?`)&&(this.clearTimer(),this.clearHotPotato(),this.copilot?.destroy(),this.onExit?.())})}initCopilot(){this.copilot=new x,document.body.appendChild(this.copilot.render());let e={"prompt-card":[`Tap the card to reveal!`,`Be honest with truth questions!`,`Make dares fun, not embarrassing!`],"hot-potato":[`Pass fast! The timer is random!`,`Don't hold it too long!`,`Pass before it explodes!`],"word-input":[`Type your answer and hit enter!`,`Be quick — there's no timer but keep it moving!`,`All answers must be actual words!`],"tap-reaction":[`Tap as fast as you can!`,`Get ready to react!`,`Speed wins here!`],charades:[`No talking allowed!`,`Use big gestures!`,`Keep guessing until time runs out!`],riddle:[`Think outside the box!`,`Reveal the answer after everyone guesses!`,`Some riddles are tricky — take your time!`],"two-choice":[`Everyone votes — no sitting out!`,`Discuss your choice after!`,`There's no wrong answer!`],physical:[`Press start then begin!`,`Host confirms if you complete it!`,`Give it your best effort!`],"score-track":[`Tap the winner when done!`,`Best of 3 rounds is fair!`,`No cheating!`],trivia:[`First to answer gets the points!`,`No phones allowed for answers!`,`Think carefully!`]},t=e[this.engine]||e[`prompt-card`];setTimeout(()=>{this.copilot?.speak(`Let's play ${this.game?.name}! 🎮`),setTimeout(()=>this.copilot?.startTipsMode(t),3e3)},1e3)}},k=class{container=null;storage;onBack=null;onLanguageChange=null;constructor(){this.storage=new u}setOnBack(e){this.onBack=e}setOnLanguageChange(e){this.onLanguageChange=e}render(){let e=this.storage.getSettings(),t=y.getLanguage();return this.container=document.createElement(`div`),this.container.className=`settings-screen`,this.container.innerHTML=`
      <style>
        .settings-screen {
          min-height: 100vh;
          height: 100vh;
          overflow-y: auto;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
          padding: 20px;
          padding-bottom: 100px;
          color: #fff;
          box-sizing: border-box;
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
          max-height: 200px;
          overflow-y: auto;
          padding-right: 8px;
        }

        .language-selector::-webkit-scrollbar {
          width: 6px;
        }

        .language-selector::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }

        .language-selector::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 3px;
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
          ${c.ArrowLeft}
        </button>
        <h1 class="settings-title">Settings</h1>
      </div>

      <div class="settings-section">
        <h3 class="section-title">Sound</h3>
        <div class="settings-card">
          <div class="setting-item">
            <div class="setting-label">
              <div class="setting-icon">${c.Volume2}</div>
              <div class="setting-text">
                <h4>Sound Effects</h4>
                <p>Game sounds and feedback</p>
              </div>
            </div>
            <div class="toggle-switch ${e.soundEnabled?`active`:``}" data-setting="soundEnabled"></div>
          </div>
          <div class="setting-item">
            <div class="setting-label">
              <div class="setting-icon">${c.Music}</div>
              <div class="setting-text">
                <h4>Background Music</h4>
                <p>Ambient music while playing</p>
              </div>
            </div>
            <div class="toggle-switch ${e.musicEnabled?`active`:``}" data-setting="musicEnabled"></div>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h3 class="section-title">Game Settings</h3>
        <div class="settings-card">
          <div class="setting-item">
            <div class="setting-label">
              <div class="setting-icon">${c.Timer}</div>
              <div class="setting-text">
                <h4>Timer Duration</h4>
                <p>Default time per round</p>
              </div>
            </div>
            <div class="slider-setting">
              <div class="slider-header">
                <span></span>
                <span class="slider-value">${e.timerDuration}s</span>
              </div>
              <input type="range" min="10" max="120" step="5" value="${e.timerDuration}" data-setting="timerDuration">
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-label">
              <div class="setting-icon">${c.RotateCcw}</div>
              <div class="setting-text">
                <h4>Default Rounds</h4>
                <p>Rounds per game</p>
              </div>
            </div>
            <div class="slider-setting">
              <div class="slider-header">
                <span></span>
                <span class="slider-value">${e.defaultRounds}</span>
              </div>
              <input type="range" min="5" max="50" step="5" value="${e.defaultRounds}" data-setting="defaultRounds">
            </div>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h3 class="section-title">Language</h3>
        <div class="settings-card">
          <div class="setting-item" style="flex-direction: column; align-items: stretch;">
            <div class="language-selector">
              ${Object.entries(_).map(([e,{name:n,flag:r}])=>`
                <button class="language-btn ${e===t?`active`:``}" data-lang="${e}">
                  <span class="language-flag">${r}</span>
                  <span class="language-name">${n}</span>
                </button>
              `).join(``)}
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
                ${c.Globe}
              </a>
              <a class="social-link" href="https://github.com" target="_blank" rel="noopener">
                ${c.Github}
              </a>
              <a class="social-link" href="https://twitter.com" target="_blank" rel="noopener">
                ${c.Twitter}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-section danger-zone">
        <h3 class="section-title" style="color: #ff6b6b;">Danger Zone</h3>
        <div class="settings-card">
          <button class="danger-btn" data-action="reset-scores">
            <div class="setting-icon" style="background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);">${c.Trash}</div>
            <div class="setting-text" style="text-align: left;">
              <h4>Reset All Scores</h4>
              <p>Clear all game scores and leaderboard</p>
            </div>
          </button>
          <button class="danger-btn" data-action="reset-tutorials">
            <div class="setting-icon" style="background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);">${c.Info}</div>
            <div class="setting-text" style="text-align: left;">
              <h4>Reset Tutorials</h4>
              <p>Show game tutorials again</p>
            </div>
          </button>
          <button class="danger-btn" data-action="reset-all">
            <div class="setting-icon" style="background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);">${c.AlertTriangle}</div>
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
    `,this.attachEventListeners(),this.container}attachEventListeners(){this.container&&(this.container.querySelector(`[data-action="back"]`)?.addEventListener(`click`,()=>{this.onBack?.()}),this.container.querySelectorAll(`.toggle-switch`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-setting`),n=this.storage.getSettings();this.storage.updateSettings({[t]:!n[t]}),e.classList.toggle(`active`)})}),this.container.querySelectorAll(`input[type="range"]`).forEach(e=>{e.addEventListener(`input`,t=>{let n=t.target,r=n.getAttribute(`data-setting`),i=parseInt(n.value);this.storage.updateSettings({[r]:i});let a=e.parentElement?.querySelector(`.slider-value`);a&&(a.textContent=`${i}${r===`timerDuration`?`s`:``}`)})}),this.container.querySelectorAll(`.language-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-lang`);t&&(y.setLanguage(t),this.container?.querySelectorAll(`.language-btn`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),this.showToast(`Language changed to ${_[t]?.name||t}`),this.onLanguageChange?.())})}),this.container.querySelector(`[data-action="reset-scores"]`)?.addEventListener(`click`,()=>{confirm(`Are you sure you want to reset all scores?`)&&(this.storage.resetAllScores(),this.showToast(`Scores reset successfully`))}),this.container.querySelector(`[data-action="reset-tutorials"]`)?.addEventListener(`click`,()=>{confirm(`Are you sure you want to reset all tutorials?`)&&(this.storage.resetTutorials(),this.showToast(`Tutorials reset successfully`))}),this.container.querySelector(`[data-action="reset-all"]`)?.addEventListener(`click`,()=>{confirm(`This will delete ALL data including scores, players, and settings. Are you sure?`)&&(localStorage.clear(),window.location.reload())}))}showToast(e){let t=document.createElement(`div`);t.style.cssText=`
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
    `,t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.style.animation=`toastOut 0.3s ease forwards`,setTimeout(()=>t.remove(),300)},2e3)}},A=class{container=null;onBack=null;currentGameId=null;setOnBack(e){this.onBack=e}setGameFilter(e){this.currentGameId=e}render(){return this.container=document.createElement(`div`),this.container.className=`leaderboard-screen`,this.container.innerHTML=this.getStyles()+this.renderContent(),this.attachEventListeners(),this.container}getStyles(){return`
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
    `}renderContent(){let e=b.getLeaderboard(this.currentGameId||void 0),t=this.currentGameId?f.getGameById(this.currentGameId):null,n=f.games;f.getCategories();let r=e.slice(0,3),i=e.slice(3),a=``;r.length>0&&(a=`
        <div class="top-three">
          ${(this.currentGameId?r:this.reorderForPodium(r)).map((e,t)=>`
            <div class="top-player ${t===1?`first-place`:``}">
              ${t===0?`<div class="crown-icon">${c.Crown}</div>`:``}
              <div class="player-avatar" style="background: ${e.player.color}20;">
                ${e.player.avatar}
              </div>
              <span class="player-name">${e.player.name}</span>
              <span class="player-score">${e.totalPoints.toLocaleString()}</span>
              <span class="wins-badge">${e.wins} wins</span>
            </div>
          `).join(``)}
        </div>
      `);let o=``;i.length>0&&(o=`
        <div class="leaderboard-list">
          ${i.map((e,t)=>`
            <div class="leaderboard-item">
              <div class="rank">${t+4}</div>
              <div class="item-avatar" style="background: ${e.player.color}20;">
                ${e.player.avatar}
              </div>
              <div class="item-info">
                <div class="item-name">${e.player.name}</div>
                <div class="item-wins">${e.wins} wins</div>
              </div>
              <div class="item-score">${e.totalPoints.toLocaleString()}</div>
            </div>
          `).join(``)}
        </div>
      `);let s=e.length===0?`
      <div class="empty-state">
        <div class="empty-icon">
          ${c.Trophy}
        </div>
        <h3 class="empty-title">No Scores Yet</h3>
        <p class="empty-text">Play some games to see your scores here!</p>
      </div>
    `:``;return`
      <div class="leaderboard-header">
        <button class="back-btn" data-action="back">
          ${c.ArrowLeft}
        </button>
        <h1 class="header-title">Leaderboard</h1>
        <div style="width: 44px;"></div>
      </div>

      ${t?`
        <div style="text-align: center; padding: 0 20px 8px;">
          <span style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 20px; font-size: 14px;">
            <span>${t.icon}</span>
            ${t.name}
          </span>
        </div>
      `:``}

      <div class="filter-tabs">
        <button class="filter-tab ${this.currentGameId?``:`active`}" data-game="all">All Games</button>
        ${n.map(e=>`
          <button class="filter-tab ${this.currentGameId===e.id?`active`:``}" data-game="${e.id}">
            ${e.icon} ${e.name}
          </button>
        `).join(``)}
      </div>

      <div class="leaderboard-content">
        ${a}
        ${o}
        ${s}
      </div>
    `}reorderForPodium(e){if(e.length<3)return e;let[t,n,r]=e;return[n,t,r]}attachEventListeners(){this.container&&(this.container.querySelector(`[data-action="back"]`)?.addEventListener(`click`,()=>{this.onBack?.()}),this.container.querySelectorAll(`.filter-tab`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-game`);this.currentGameId=t===`all`?null:t,this.container.querySelectorAll(`.filter-tab`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),this.container.querySelector(`.leaderboard-content`).innerHTML=this.renderLeaderboardContent()})}))}renderLeaderboardContent(){let e=b.getLeaderboard(this.currentGameId||void 0),t=e.slice(0,3),n=e.slice(3),r=``;t.length>0&&(r=`
        <div class="top-three">
          ${this.reorderForPodium(t).map((e,t)=>`
            <div class="top-player ${t===1?`first-place`:``}">
              ${t===0?`<div class="crown-icon">${c.Crown}</div>`:``}
              <div class="player-avatar" style="background: ${e.player.color}20;">
                ${e.player.avatar}
              </div>
              <span class="player-name">${e.player.name}</span>
              <span class="player-score">${e.totalPoints.toLocaleString()}</span>
              <span class="wins-badge">${e.wins} wins</span>
            </div>
          `).join(``)}
        </div>
      `);let i=``;n.length>0&&(i=`
        <div class="leaderboard-list">
          ${n.map((e,t)=>`
            <div class="leaderboard-item">
              <div class="rank">${t+4}</div>
              <div class="item-avatar" style="background: ${e.player.color}20;">
                ${e.player.avatar}
              </div>
              <div class="item-info">
                <div class="item-name">${e.player.name}</div>
                <div class="item-wins">${e.wins} wins</div>
              </div>
              <div class="item-score">${e.totalPoints.toLocaleString()}</div>
            </div>
          `).join(``)}
        </div>
      `);let a=e.length===0?`
      <div class="empty-state">
        <div class="empty-icon">
          ${c.Trophy}
        </div>
        <h3 class="empty-title">No Scores Yet</h3>
        <p class="empty-text">Play some games to see your scores here!</p>
      </div>
    `:``;return`${r}${i}${a}`}},j=class{container=null;result=null;onPlayAgain=null;onHome=null;onNewGame=null;setCallbacks(e,t,n){this.onPlayAgain=e,this.onHome=t,this.onNewGame=n}setResult(e){this.result=e}render(){return this.container=document.createElement(`div`),this.container.className=`gameover-screen`,this.container.innerHTML=this.getStyles()+this.renderContent(),this.attachEventListeners(),this.container}getStyles(){return`
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
    `}renderContent(){if(!this.result)return`<div class="result-card"><p>No game result available</p></div>`;let e=f.getGameById(this.result.gameId),t=Object.entries(this.result.scores).sort(([,e],[,t])=>t-e),n=t.length>1&&t[0][1]===t[1][1],r=Math.floor(this.result.duration/1e3),i=Math.floor(r/60),a=r%60,o=n?c.Users:c.Trophy,s=this.result.winner?`
      <div class="winner-section">
        <div class="winner-label">Winner</div>
        <div class="winner-avatar" style="background: ${this.result.winner.color}20;">
          ${this.result.winner.avatar}
        </div>
        <div class="winner-name">${this.result.winner.name}</div>
        <div class="winner-score">${this.result.scores[this.result.winner.id]} pts</div>
      </div>
    `:``;return`
      <div class="result-card ${n?`draw-state`:``}">
        <div class="trophy-container">
          <div class="trophy-icon">
            ${o}
          </div>
        </div>

        <h1 class="result-title">${n?`It's a Tie!`:`Game Over!`}</h1>

        ${e?`
          <div style="margin-bottom: 16px; color: #888;">
            ${e.icon} ${e.name}
          </div>
        `:``}

        ${s}

        <div class="stats-row">
          <div class="stat-item">
            <div class="stat-value">${this.result.totalRounds}</div>
            <div class="stat-label">Rounds</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${i}:${a.toString().padStart(2,`0`)}</div>
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
            ${t.map(([e,t],r)=>{let i=!n&&r===0&&t>0,a=this.getPlayerById(e);return`
                <div class="score-item ${i?`winner`:``}">
                  <div class="score-avatar" style="background: ${a?.color||`#666`}20;">
                    ${a?.avatar||`👤`}
                  </div>
                  <div class="score-name">${a?.name||`Player`}</div>
                  <div class="score-points">${t}</div>
                </div>
              `}).join(``)}
          </div>
        </div>

        <div class="actions">
          ${this.result.gameId&&this.onPlayAgain?`
            <button class="btn-primary" data-action="play-again">
              ${c.RotateCcw}
              Play Again
            </button>
          `:``}
          <button class="btn-secondary" data-action="new-game">
            ${c.Grid}
            Choose New Game
          </button>
          <button class="btn-secondary" data-action="home">
            ${c.Home}
            Back to Home
          </button>
        </div>
      </div>
    `}getPlayerById(e){return new Storage().getPlayers().find(t=>t.id===e)||null}attachEventListeners(){this.container&&(this.container.querySelector(`[data-action="play-again"]`)?.addEventListener(`click`,()=>{this.result?.gameId&&this.onPlayAgain&&this.onPlayAgain(this.result.gameId)}),this.container.querySelector(`[data-action="new-game"]`)?.addEventListener(`click`,()=>{this.onNewGame?.()}),this.container.querySelector(`[data-action="home"]`)?.addEventListener(`click`,()=>{this.onHome?.()}),this.createConfetti())}createConfetti(){let e=[`#ffd700`,`#667eea`,`#764ba2`,`#f093fb`,`#f5576c`,`#4ecdc4`];for(let t=0;t<50;t++)setTimeout(()=>{let t=document.createElement(`div`);t.className=`confetti`,t.style.cssText=`
          position: fixed;
          left: ${Math.random()*100}%;
          top: -10px;
          width: ${Math.random()*10+5}px;
          height: ${Math.random()*10+5}px;
          background: ${e[Math.floor(Math.random()*e.length)]};
          border-radius: ${Math.random()>.5?`50%`:`0`};
          animation: confettiFall ${Math.random()*2+2}s linear forwards;
        `;let n=document.createElement(`style`);n.textContent=`
          @keyframes confettiFall {
            to {
              transform: translateY(100vh) rotate(${Math.random()*720}deg);
              opacity: 0;
            }
          }
        `,document.head.appendChild(n),document.body.appendChild(t),setTimeout(()=>{t.remove(),n.remove()},4e3)},t*50)}},M=class{container;storage;currentScreen=`intro`;selectedGameId=null;players=[];hostId=null;gameMode=`challenge`;copilot=null;copilotTip=``;constructor(){this.container=document.getElementById(`app`)||document.body,this.storage=new u,this.init()}async init(){this.currentScreen=this.storage.isOnboarded()?`players`:`onboarding`,this.showScreen()}showScreen(){switch(this.container.innerHTML=``,this.currentScreen){case`intro`:this.showIntro();break;case`onboarding`:this.showOnboarding();break;case`players`:this.showPlayers();break;case`hostselect`:this.showHostSelect();break;case`home`:this.showHome();break;case`tutorial`:this.showTutorial();break;case`game`:this.showGame();break;case`settings`:this.showSettings();break;case`leaderboard`:this.showLeaderboard();break;case`gameover`:this.showGameOver();break}}showIntro(){let e=new o;e.setOnComplete(()=>{this.currentScreen=this.storage.isOnboarded()?`players`:`onboarding`,this.showScreen()}),this.container.appendChild(e.render())}showOnboarding(){let e=new s({showScreen:e=>{this.storage.setOnboarded(!0),this.currentScreen=e,this.showScreen()}});this.container.appendChild(e.render())}showPlayers(){let e=new d;e.setOnContinue((e,t)=>{this.players=e,this.storage.savePlayers(e),this.hostId=t,this.currentScreen=`hostselect`,this.showScreen()}),e.setOnBack(()=>{this.currentScreen=`onboarding`,this.showScreen()}),this.container.appendChild(e.render())}showHostSelect(){let e=new S(this.players.map(e=>({id:e.id,name:e.name,color:e.color,avatar:e.avatar})));e.setOnSelect(e=>{this.hostId=e,localStorage.setItem(`fgn_host`,e),this.copilotTip=this.getRandomTip(),this.currentScreen=`home`,this.showScreen()}),e.setOnAddNew(()=>{this.currentScreen=`players`,this.showScreen()}),this.container.appendChild(e.render())}getRandomTip(){let e=[`Pro tip: Challenge mode gives bonus points for streaks!`,`Tip: Swipe left during any game to exit quickly.`,`Did you know? Your scores are saved automatically!`,`Fun fact: There are over 25 games to explore!`,`Hint: Check the leaderboard to see who's winning!`];return e[Math.floor(Math.random()*e.length)]}showHome(){this.copilot&&this.copilot.destroy(),this.copilot=new x;let e=this.copilot.render();document.body.appendChild(e),setTimeout(()=>{this.copilot?.speak(this.copilotTip||`Ready to play? Pick a game!`),setTimeout(()=>{this.copilot?.startTipsMode([`Quick Play picks a random game for you!`,`Check out the Party category for group games!`,`Your scores are saved automatically!`,`View the leaderboard to see who's winning!`])},3e3)},1500);let t=new h;t.setOnGameSelect(e=>{this.copilot?.stopTipsMode(),this.selectedGameId=e,this.storage.isTutorialCompleted(e)?this.currentScreen=`game`:this.currentScreen=`tutorial`,this.showScreen()}),t.setOnSettings(()=>{this.copilot?.stopTipsMode(),this.currentScreen=`settings`,this.showScreen()}),t.setOnLeaderboard(()=>{this.copilot?.stopTipsMode(),this.currentScreen=`leaderboard`,this.showScreen()}),t.setOnPlayers(()=>{this.copilot?.stopTipsMode(),this.currentScreen=`players`,this.showScreen()}),t.setOnQuickPlay(()=>{this.copilot?.stopTipsMode();let e=f.getGamesByCategory(`all`),t=e[Math.floor(Math.random()*e.length)];this.selectedGameId=t.id,this.storage.isTutorialCompleted(t.id)?this.currentScreen=`game`:this.currentScreen=`tutorial`,this.showScreen()}),this.container.appendChild(t.render())}showTutorial(){if(!this.selectedGameId){this.currentScreen=`home`,this.showScreen();return}let e=f.getGameById(this.selectedGameId),t=new g;t.setGame(e),t.setOnComplete(()=>{this.storage.markTutorialCompleted(this.selectedGameId),this.currentScreen=`game`,this.showScreen()}),t.setOnSkip(()=>{this.storage.markTutorialCompleted(this.selectedGameId),this.currentScreen=`game`,this.showScreen()}),this.container.appendChild(t.render())}showGame(){if(!this.selectedGameId){this.currentScreen=`home`,this.showScreen();return}let e=f.getGameById(this.selectedGameId),t=new O;t.setGame(e),t.setPlayers(this.players),t.setHostId(this.hostId),t.setGameMode(this.gameMode),t.setOnModeChange(e=>{this.gameMode=e}),t.setOnGameEnd(e=>{this.showGameOverWithResult(e)}),t.setOnExit(()=>{this.currentScreen=`home`,this.showScreen()}),this.container.appendChild(t.render())}showSettings(){let e=new k;e.setOnBack(()=>{this.currentScreen=`home`,this.showScreen()}),e.setOnLanguageChange(()=>{this.showScreen()}),this.container.appendChild(e.render())}showLeaderboard(){let e=new A;e.setOnBack(()=>{this.currentScreen=`home`,this.showScreen()}),this.container.appendChild(e.render())}showGameOver(){let e=new j;e.setCallbacks(e=>{this.selectedGameId=e,this.currentScreen=`game`,this.showScreen()},()=>{this.currentScreen=`home`,this.showScreen()},()=>{this.currentScreen=`home`,this.showScreen()}),this.container.appendChild(e.render())}showGameOverWithResult(e){let t=new j;t.setResult(e),t.setCallbacks(e=>{this.selectedGameId=e,this.currentScreen=`game`,this.showScreen()},()=>{this.currentScreen=`home`,this.showScreen()},()=>{this.currentScreen=`home`,this.showScreen()}),this.container.innerHTML=``,this.container.appendChild(t.render())}getHostId(){return this.hostId}isHost(e){return this.hostId===e}};document.addEventListener(`DOMContentLoaded`,()=>{new M});