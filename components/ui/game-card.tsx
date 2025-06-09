import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Play } from 'lucide-react';
import { Game } from '@/lib/game-data';
import { getStats, addToFavorites, removeFromFavorites } from '@/lib/storage';
import { useState, useEffect } from 'react';

interface GameCardProps {
  game: Game;
  showFavoriteButton?: boolean;
}

export function GameCard({ game, showFavoriteButton = true }: GameCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const currentStats = getStats();
    setStats(currentStats);
    setIsFavorite(currentStats.favorites.includes(game.id));
  }, [game.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromFavorites(game.id);
      setIsFavorite(false);
    } else {
      addToFavorites(game.id);
      setIsFavorite(true);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pointless': return 'bg-purple-100 text-purple-800';
      case 'annoying': return 'bg-orange-100 text-orange-800';
      case 'weird': return 'bg-teal-100 text-teal-800';
      case 'confusing': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const timesPlayed = stats?.gameStats[game.id]?.timesPlayed || 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
      <Link href={`/games/${game.id}`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{game.emoji}</span>
                <Badge className={getCategoryColor(game.category)}>
                  {game.category}
                </Badge>
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {game.title}
              </CardTitle>
            </div>
            {showFavoriteButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFavorite}
                className="p-2 h-auto"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`}
                />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-3">{game.description}</CardDescription>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>⏱️ {game.estimatedTime}</span>
            {timesPlayed > 0 && (
              <span>🎮 Played {timesPlayed}x</span>
            )}
          </div>
          <Button className="w-full mt-3 group-hover:bg-primary/90 transition-colors">
            <Play className="w-4 h-4 mr-2" />
            Play Now
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
}