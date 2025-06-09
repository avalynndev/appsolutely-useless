export interface Game {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: 'pointless' | 'annoying' | 'weird' | 'confusing';
  estimatedTime: string;
}

export const games: Game[] = [
  {
    id: 'soup-or-soap',
    title: 'Is It Soup or Soap?',
    description: 'Can you tell the difference between soup and soap from blurry images?',
    emoji: '🍲',
    category: 'confusing',
    estimatedTime: '2 min'
  },
  {
    id: 'punch-simulator',
    title: 'Punch Yourself Simulator',
    description: 'Virtually punch yourself with increasingly dramatic pain levels!',
    emoji: '👊',
    category: 'weird',
    estimatedTime: '5 min'
  },
  {
    id: 'chicken-or-ceo',
    title: 'Chicken or CEO?',
    description: 'Guess if this profound quote came from a chicken or a CEO.',
    emoji: '🐔',
    category: 'confusing',
    estimatedTime: '3 min'
  },
  {
    id: 'useless-button',
    title: 'The Button That Does Nothing',
    description: 'A button. It counts. That\'s it. Truly revolutionary.',
    emoji: '🔘',
    category: 'pointless',
    estimatedTime: '∞'
  },
  {
    id: 'invisible-cat',
    title: 'Pet the Invisible Cat',
    description: 'Pet an invisible cat and watch your purr meter rise!',
    emoji: '😸',
    category: 'weird',
    estimatedTime: '4 min'
  },
  {
    id: 'banana-mood',
    title: 'Guess the Banana\'s Mood',
    description: 'This banana has feelings. Can you guess what they are?',
    emoji: '🍌',
    category: 'weird',
    estimatedTime: '3 min'
  },
  {
    id: 'pay-respects',
    title: 'F to Pay Respects',
    description: 'Press F to contribute to the global respect counter.',
    emoji: '🪦',
    category: 'pointless',
    estimatedTime: '1 min'
  },
  {
    id: 'mosquito-slap',
    title: 'Virtual Mosquito Slap',
    description: 'Hunt down the annoying mosquito before it escapes!',
    emoji: '🦟',
    category: 'annoying',
    estimatedTime: '2 min'
  },
  {
    id: 'shitpost-generator',
    title: 'Daily Shitpost Generator',
    description: 'Generate the most random, useless posts imaginable.',
    emoji: '💩',
    category: 'weird',
    estimatedTime: '3 min'
  },
  {
    id: 'tap-to-scream',
    title: 'Tap to Scream',
    description: 'Tap to hear increasingly absurd screaming sounds.',
    emoji: '😱',
    category: 'annoying',
    estimatedTime: '2 min'
  },
  {
    id: 'uselessness-predictor',
    title: 'AI Predicts Uselessness',
    description: 'Our AI will scientifically determine how useless anything is.',
    emoji: '🤖',
    category: 'confusing',
    estimatedTime: '3 min'
  },
  {
    id: 'waiting-game',
    title: 'How Long Can You Wait?',
    description: 'The ultimate test of patience and boredom tolerance.',
    emoji: '⏰',
    category: 'pointless',
    estimatedTime: '???'
  },
  {
    id: 'fortune-cookie',
    title: 'Fortune Cookie That Tells You to Quit',
    description: 'Get brutally honest life advice from our wisdom cookies.',
    emoji: '🥠',
    category: 'annoying',
    estimatedTime: '1 min'
  },
  {
    id: 'rock-nft',
    title: 'Buy a Rock NFT (Fake)',
    description: 'Mint and collect completely worthless digital rocks!',
    emoji: '🪨',
    category: 'pointless',
    estimatedTime: '5 min'
  }
];

export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id);
};

export const getRandomGame = (): Game => {
  return games[Math.floor(Math.random() * games.length)];
};