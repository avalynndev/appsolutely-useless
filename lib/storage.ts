export interface GameStats {
  timesPlayed: number;
  timeSpent: number; // in seconds
  lastPlayed: number; // timestamp
  highScore?: number;
  customStats?: Record<string, any>;
}

export interface UserStats {
  totalGamesPlayed: number;
  totalTimeWasted: number;
  totalTaps: number;
  regretLevel: number;
  achievements: string[];
  gameStats: Record<string, GameStats>;
  favorites: string[];
}

const STORAGE_KEY = 'appsolutely-useless-stats';

export const getStats = (): UserStats => {
  if (typeof window === 'undefined') {
    return getDefaultStats();
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultStats();
    
    const stats = JSON.parse(stored);
    return { ...getDefaultStats(), ...stats };
  } catch {
    return getDefaultStats();
  }
};

export const saveStats = (stats: UserStats): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save stats:', error);
  }
};

export const updateGameStats = (gameId: string, updates: Partial<GameStats>): void => {
  const stats = getStats();
  
  if (!stats.gameStats[gameId]) {
    stats.gameStats[gameId] = {
      timesPlayed: 0,
      timeSpent: 0,
      lastPlayed: Date.now()
    };
  }
  
  stats.gameStats[gameId] = {
    ...stats.gameStats[gameId],
    ...updates,
    lastPlayed: Date.now()
  };
  
  // Update global stats
  stats.totalGamesPlayed++;
  stats.totalTimeWasted += updates.timeSpent || 0;
  stats.regretLevel = Math.min(100, stats.regretLevel + 0.1);
  
  saveStats(stats);
};

export const incrementTaps = (count: number = 1): void => {
  const stats = getStats();
  stats.totalTaps += count;
  saveStats(stats);
};

export const addToFavorites = (gameId: string): void => {
  const stats = getStats();
  if (!stats.favorites.includes(gameId)) {
    stats.favorites.push(gameId);
    saveStats(stats);
  }
};

export const removeFromFavorites = (gameId: string): void => {
  const stats = getStats();
  stats.favorites = stats.favorites.filter(id => id !== gameId);
  saveStats(stats);
};

export const addAchievement = (achievement: string): void => {
  const stats = getStats();
  if (!stats.achievements.includes(achievement)) {
    stats.achievements.push(achievement);
    saveStats(stats);
  }
};

export const clearAllData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};

const getDefaultStats = (): UserStats => ({
  totalGamesPlayed: 0,
  totalTimeWasted: 0,
  totalTaps: 0,
  regretLevel: 0,
  achievements: [],
  gameStats: {},
  favorites: []
});

export const getMostPlayedGame = (): string | null => {
  const stats = getStats();
  let mostPlayed = '';
  let maxPlays = 0;
  
  for (const [gameId, gameStats] of Object.entries(stats.gameStats)) {
    if (gameStats.timesPlayed > maxPlays) {
      maxPlays = gameStats.timesPlayed;
      mostPlayed = gameId;
    }
  }
  
  return mostPlayed || null;
};