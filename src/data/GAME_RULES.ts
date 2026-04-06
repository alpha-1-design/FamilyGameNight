export const GAME_RULES: Record<string, string> = {
  'hot-potato': 'Pass the phone around quickly. When the timer stops, whoever is holding it is out. Last player standing wins!',
  'quick-math': 'A math problem appears on screen. First player to shout the correct answer wins the round. Play to 10 points.',
  'word-scramble': 'Letters are scrambled on screen. Unscramble them to form a word. First to guess correctly wins the round.',
  'trivia-flash': 'Rapid-fire trivia questions appear one at a time. Buzz in to answer. Wrong answers lose a point.',
  'emoji-guess': 'A sequence of emojis represents a word or phrase. Guess what it means. First correct answer wins.',
  'stare-down': 'Two players stare at each other. First one to blink, look away, or laugh loses the round.',
  'balance-test': 'Host reads a balance challenge. Everyone does it simultaneously. Last one to lose balance wins.',
  'charades': 'Act out the word or phrase shown — no talking, no sounds, no pointing at objects. Team guesses within the timer.',
  'two-truths-lie': 'Each player states 2 truths and 1 lie about themselves. Others vote on which is the lie.',
  'tongue-twister': 'Read the tongue twister on screen as fast as possible without mistakes. Host judges correctness.',
  'riddle-me': 'A riddle appears on screen. Players take turns guessing. First correct answer scores a point.',
  'would-you-rather': 'Everyone must choose one option — no skipping. Discuss your choice after voting.',
  'sound-effects': 'Make only the sound for the word shown — no talking, no miming. Others guess the word.',
  'freeze-dance': 'Play music (or hum), everyone dances. When host says freeze, anyone who moves is out.',
  'simon-says': 'Host issues commands. Only follow commands that start with "Simon says". Wrong moves eliminate you.',
  'story-chain': 'First player starts a story with one sentence. Each player adds one sentence. Keep it going!',
  'alphabet-game': 'Pick a category. Players take turns naming something in that category starting with the next letter of the alphabet.',
  'trivia': 'A question appears on screen. First player to buzz in and answer correctly wins the point. Host reads aloud.',
  'physical': 'Complete the physical challenge shown on screen. Host confirms if you succeed. Most completions wins.',
  'score-track': 'Compete in the challenge shown. Host taps the winner of each round. First to the target score wins.',
};

export function getGameRules(gameId: string): string {
  return GAME_RULES[gameId] || 'Take turns as directed on screen. Host manages the rounds and awards points. Most points at the end wins!';
}
