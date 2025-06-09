'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRandomGame } from '@/lib/game-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RandomPage() {
  const router = useRouter();

  useEffect(() => {
    const randomGame = getRandomGame();
    const timer = setTimeout(() => {
      router.push(`/games/${randomGame.id}`);
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>🎲 Random Game Loading...</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl animate-spin">🎮</div>
          <div className="text-lg">Selecting a perfectly useless game for you...</div>
          <div className="text-sm text-muted-foreground">
            Prepare for maximum pointlessness!
          </div>
        </CardContent>
      </Card>
    </div>
  );
}