'use client';

import { useState, useEffect } from 'react';
import { GameCard } from '@/components/ui/game-card';
import { Button } from '@/components/ui/button';
import { games } from '@/lib/game-data';
import { getStats } from '@/lib/storage';
import Link from 'next/link';

export default function FavoritesPage() {
  const [favoriteGames, setFavoriteGames] = useState<typeof games>([]);

  useEffect(() => {
    const stats = getStats();
    const favorites = games.filter(game => stats.favorites.includes(game.id));
    setFavoriteGames(favorites);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          ❤️ Favorite Useless Games
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Your personally curated collection of pointless entertainment
        </p>
      </div>

      {/* Favorites Grid */}
      {favoriteGames.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💔</div>
          <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
          <p className="text-muted-foreground mb-6">
            Start playing games and add them to your favorites by clicking the heart icon
          </p>
          <Button asChild>
            <Link href="/games">
              Explore Games
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 text-center text-muted-foreground">
            <p>
              You have {favoriteGames.length} favorite{favoriteGames.length !== 1 ? 's' : ''} out of {games.length} total games
            </p>
            <p className="text-sm mt-2">
              That's {Math.round((favoriteGames.length / games.length) * 100)}% of our useless collection!
            </p>
          </div>
        </>
      )}
    </div>
  );
}