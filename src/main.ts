import './styles/main.css';
import { IntroScreen } from './screens/IntroScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { PlayersScreen } from './screens/PlayersScreen';
import { HomeScreen } from './screens/HomeScreen';
import { TutorialScreen } from './screens/TutorialScreen';
import { GameScreen } from './screens/GameScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { LeaderboardScreen } from './screens/LeaderboardScreen';
import { GameOverScreen, type GameResult } from './screens/GameOverScreen';
import { CopilotCharacter, CopilotWelcome } from './components/Copilot';
import { type GameMode } from './games/GameManager';
import { Storage, type Player } from './utils/Storage';
import { GAMES_DATA } from './data/games-data';

type Screen = 'intro' | 'onboarding' | 'players' | 'hostselect' | 'home' | 'tutorial' | 'game' | 'settings' | 'leaderboard' | 'gameover';

class App {
  private container: HTMLElement;
  private storage: Storage;
  private currentScreen: Screen = 'intro';
  private selectedGameId: string | null = null;
  private players: Player[] = [];
  private hostId: string | null = null;
  private gameMode: GameMode = 'challenge';
  private copilot: CopilotCharacter | null = null;
  private copilotTip: string = '';

  constructor() {
    this.container = document.getElementById('app') || document.body;
    this.storage = new Storage();
    this.init();
  }

  private async init(): Promise<void> {
    const isOnboarded = this.storage.isOnboarded();
    this.currentScreen = isOnboarded ? 'players' : 'onboarding';
    this.showScreen();
  }

  private showScreen(): void {
    this.container.innerHTML = '';
    
    switch (this.currentScreen) {
      case 'intro':
        this.showIntro();
        break;
      case 'onboarding':
        this.showOnboarding();
        break;
      case 'players':
        this.showPlayers();
        break;
      case 'hostselect':
        this.showHostSelect();
        break;
      case 'home':
        this.showHome();
        break;
      case 'tutorial':
        this.showTutorial();
        break;
      case 'game':
        this.showGame();
        break;
      case 'settings':
        this.showSettings();
        break;
      case 'leaderboard':
        this.showLeaderboard();
        break;
      case 'gameover':
        this.showGameOver();
        break;
    }
  }

  private showIntro(): void {
    const introScreen = new IntroScreen();
    introScreen.setOnComplete(() => {
      this.currentScreen = this.storage.isOnboarded() ? 'players' : 'onboarding';
      this.showScreen();
    });
    this.container.appendChild(introScreen.render());
  }

  private showOnboarding(): void {
    const onboardingScreen = new OnboardingScreen({
      showScreen: (screen) => {
        this.storage.setOnboarded(true);
        this.currentScreen = screen as Screen;
        this.showScreen();
      }
    });
    this.container.appendChild(onboardingScreen.render());
  }

  private showPlayers(): void {
    const playersScreen = new PlayersScreen();
    playersScreen.setOnContinue((players, hostId) => {
      this.players = players;
      this.storage.savePlayers(players);
      this.hostId = hostId;
      this.currentScreen = 'hostselect';
      this.showScreen();
    });
    playersScreen.setOnBack(() => {
      this.currentScreen = 'onboarding';
      this.showScreen();
    });
    this.container.appendChild(playersScreen.render());
  }

  private showHostSelect(): void {
    const welcomeScreen = new CopilotWelcome(
      this.players.map(p => ({ id: p.id, name: p.name, color: p.color, avatar: p.avatar }))
    );

    welcomeScreen.setOnSelect((hostId) => {
      this.hostId = hostId;
      localStorage.setItem('fgn_host', hostId);
      this.copilotTip = this.getRandomTip();
      this.currentScreen = 'home';
      this.showScreen();
    });

    welcomeScreen.setOnAddNew(() => {
      this.currentScreen = 'players';
      this.showScreen();
    });

    this.container.appendChild(welcomeScreen.render());
  }

  private getRandomTip(): string {
    const tips = [
      "Pro tip: Challenge mode gives bonus points for streaks!",
      "Tip: Swipe left during any game to exit quickly.",
      "Did you know? Your scores are saved automatically!",
      "Fun fact: There are over 25 games to explore!",
      "Hint: Check the leaderboard to see who's winning!",
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  }

  private showHome(): void {
    if (this.copilot) {
      this.copilot.destroy();
    }
    this.copilot = new CopilotCharacter();
    const copilotEl = this.copilot.render();
    document.body.appendChild(copilotEl);
    
    setTimeout(() => {
      this.copilot?.speak(this.copilotTip || "Ready to play? Pick a game!");
      setTimeout(() => {
        const homeTips = [
          "Quick Play picks a random game for you!",
          "Check out the Party category for group games!",
          "Your scores are saved automatically!",
          "View the leaderboard to see who's winning!"
        ];
        this.copilot?.startTipsMode(homeTips);
      }, 3000);
    }, 1500);

    const homeScreen = new HomeScreen();
    homeScreen.setOnGameSelect((gameId) => {
      this.copilot?.stopTipsMode();
      this.selectedGameId = gameId;
      
      if (!this.storage.isTutorialCompleted(gameId)) {
        this.currentScreen = 'tutorial';
      } else {
        this.currentScreen = 'game';
      }
      this.showScreen();
    });
    homeScreen.setOnSettings(() => {
      this.copilot?.stopTipsMode();
      this.currentScreen = 'settings';
      this.showScreen();
    });
    homeScreen.setOnLeaderboard(() => {
      this.copilot?.stopTipsMode();
      this.currentScreen = 'leaderboard';
      this.showScreen();
    });
    homeScreen.setOnPlayers(() => {
      this.copilot?.stopTipsMode();
      this.currentScreen = 'players';
      this.showScreen();
    });
    homeScreen.setOnQuickPlay(() => {
      this.copilot?.stopTipsMode();
      const games = GAMES_DATA.getGamesByCategory('all');
      const randomGame = games[Math.floor(Math.random() * games.length)];
      this.selectedGameId = randomGame.id;
      
      if (!this.storage.isTutorialCompleted(randomGame.id)) {
        this.currentScreen = 'tutorial';
      } else {
        this.currentScreen = 'game';
      }
      this.showScreen();
    });
    this.container.appendChild(homeScreen.render());
  }

  private showTutorial(): void {
    if (!this.selectedGameId) {
      this.currentScreen = 'home';
      this.showScreen();
      return;
    }

    const game = GAMES_DATA.getGameById(this.selectedGameId);
    const tutorialScreen = new TutorialScreen();
    
    tutorialScreen.setGame(game!);
    tutorialScreen.setOnComplete(() => {
      this.storage.markTutorialCompleted(this.selectedGameId!);
      this.currentScreen = 'game';
      this.showScreen();
    });
    tutorialScreen.setOnSkip(() => {
      this.storage.markTutorialCompleted(this.selectedGameId!);
      this.currentScreen = 'game';
      this.showScreen();
    });
    
    this.container.appendChild(tutorialScreen.render());
  }

  private showGame(): void {
    if (!this.selectedGameId) {
      this.currentScreen = 'home';
      this.showScreen();
      return;
    }

    const game = GAMES_DATA.getGameById(this.selectedGameId);
    const gameScreen = new GameScreen();
    
    gameScreen.setGame(game!);
    gameScreen.setPlayers(this.players);
    gameScreen.setHostId(this.hostId);
    gameScreen.setGameMode(this.gameMode);
    
    gameScreen.setOnModeChange((mode) => {
      this.gameMode = mode;
    });
    
    gameScreen.setOnGameEnd((result) => {
      this.showGameOverWithResult(result);
    });
    
    gameScreen.setOnExit(() => {
      this.currentScreen = 'home';
      this.showScreen();
    });
    
    this.container.appendChild(gameScreen.render());
  }

  private showSettings(): void {
    const settingsScreen = new SettingsScreen();
    settingsScreen.setOnBack(() => {
      this.currentScreen = 'home';
      this.showScreen();
    });
    this.container.appendChild(settingsScreen.render());
  }

  private showLeaderboard(): void {
    const leaderboardScreen = new LeaderboardScreen();
    leaderboardScreen.setOnBack(() => {
      this.currentScreen = 'home';
      this.showScreen();
    });
    this.container.appendChild(leaderboardScreen.render());
  }

  private showGameOver(): void {
    const gameOverScreen = new GameOverScreen();
    gameOverScreen.setCallbacks(
      (gameId) => {
        this.selectedGameId = gameId;
        this.currentScreen = 'game';
        this.showScreen();
      },
      () => {
        this.currentScreen = 'home';
        this.showScreen();
      },
      () => {
        this.currentScreen = 'home';
        this.showScreen();
      }
    );
    this.container.appendChild(gameOverScreen.render());
  }

  private showGameOverWithResult(result: GameResult): void {
    const gameOverScreen = new GameOverScreen();
    gameOverScreen.setResult(result);
    gameOverScreen.setCallbacks(
      (gameId) => {
        this.selectedGameId = gameId;
        this.currentScreen = 'game';
        this.showScreen();
      },
      () => {
        this.currentScreen = 'home';
        this.showScreen();
      },
      () => {
        this.currentScreen = 'home';
        this.showScreen();
      }
    );
    
    this.container.innerHTML = '';
    this.container.appendChild(gameOverScreen.render());
  }

  public getHostId(): string | null {
    return this.hostId;
  }

  public isHost(playerId: string): boolean {
    return this.hostId === playerId;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});

export { App };
