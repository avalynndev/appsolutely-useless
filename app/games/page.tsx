'use client';

import { useState, useEffect } from 'react';
import { GameCard } from '@/components/ui/game-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { games, Game } from '@/lib/game-data';
import { Search, Filter } from 'lucide-react';

export default function GamesPage() {
  const [filteredGames, setFilteredGames] = useState<Game[]>(games);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Games', count: games.length },
    { id: 'pointless', label: 'Pointless', count: games.filter(g => g.category === 'pointless').length },
    { id: 'annoying', label: 'Annoying', count: games.filter(g => g.category === 'annoying').length },
    { id: 'weird', label: 'Weird', count: games.filter(g => g.category === 'weird').length },
    { id: 'confusing', label: 'Confusing', count: games.filter(g => g.category === 'confusing').length },
  ];

  useEffect(() => {
    let filtered = games;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(game => game.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredGames(filtered);
  }, [searchTerm, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pointless': return '🎯';
      case 'annoying': return '😤';
      case 'weird': return '🤪';
      case 'confusing': return '🤔';
      default: return '🎮';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          🎮 Useless Games Collection
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Carefully curated pointless entertainment for your viewing pleasure
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search for useless games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-2"
            >
              <span>{getCategoryIcon(category.id)}</span>
              <span>{category.label}</span>
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      {filteredGames.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No games found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}

      {/* Bottom Stats */}
      <div className="mt-12 text-center text-muted-foreground">
        <p>
          Showing {filteredGames.length} of {games.length} incredibly useless games
        </p>
      </div>
    </div>
  );
}