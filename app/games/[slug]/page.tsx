'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getGameById } from '@/lib/game-data';
import { updateGameStats } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw } from 'lucide-react';

// Import all game components
import { SoupOrSoapGame } from '@/components/games/soup-or-soap';
import { PunchSimulatorGame } from '@/components/games/punch-simulator';
import { ChickenOrCeoGame } from '@/components/games/chicken-or-ceo';
import { UselessButtonGame } from '@/components/games/useless-button';
import { InvisibleCatGame } from '@/components/games/invisible-cat';
import { BananaMoodGame } from '@/components/games/banana-mood';
import { PayRespectsGame } from '@/components/games/pay-respects';
import { MosquitoSlapGame } from '@/components/games/mosquito-slap';
import { ShitpostGeneratorGame } from '@/components/games/shitpost-generator';
import { TapToScreamGame } from '@/components/games/tap-to-scream';
import { UselessnessPredictorGame } from '@/components/games/uselessness-predictor';
import { WaitingGame } from '@/components/games/waiting-game';
import { FortuneCookieGame } from '@/components/games/fortune-cookie';
import { RockNftGame } from '@/components/games/rock-nft';

interface GamePageProps {
  params: { slug: string };
}

export default function GamePage({ params }: GamePageProps) {
  const router = useRouter();
  const [startTime, setStartTime] = useState<number>(0);
  const [gameKey, setGameKey] = useState<number>(0);
  
  const game = getGameById(params.slug);

  useEffect(() => {
    if (!game) return;
    
    const now = Date.now();
    setStartTime(now);
    
    // Track game start
    updateGameStats(game.id, {
      timesPlayed: 1,
      timeSpent: 0
    });

    // Track time spent when component unmounts
    return () => {
      const timeSpent = Math.floor((Date.now() - now) / 1000);
      updateGameStats(game.id, {
        timesPlayed: 0, // Don't increment again
        timeSpent
      });
    };
  }, [game, gameKey]);

  const resetGame = () => {
    setGameKey(prev => prev + 1);
    setStartTime(Date.now());
  };

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-6xl mb-4">🤔</div>
        <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
        <p className="text-muted-foreground mb-6">
          This game doesn't exist. Maybe it was too useless even for us?
        </p>
        <Button onClick={() => router.push('/games')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Button>
      </div>
    );
  }

  const renderGame = () => {
    const gameProps = { key: gameKey };
    
    switch (game.id) {
      case 'soup-or-soap': return <SoupOrSoapGame {...gameProps} />;
      case 'punch-simulator': return <PunchSimulatorGame {...gameProps} />;
      case 'chicken-or-ceo': return <ChickenOrCeoGame {...gameProps} />;
      case 'useless-button': return <UselessButtonGame {...gameProps} />;
      case 'invisible-cat': return <InvisibleCatGame {...gameProps} />;
      case 'banana-mood': return <BananaMoodGame {...gameProps} />;
      case 'pay-respects': return <PayRespectsGame {...gameProps} />;
      case 'mosquito-slap': return <MosquitoSlapGame {...gameProps} />;
      case 'shitpost-generator': return <ShitpostGeneratorGame {...gameProps} />;
      case 'tap-to-scream': return <TapToScreamGame {...gameProps} />;
      case 'uselessness-predictor': return <UselessnessPredictorGame {...gameProps} />;
      case 'waiting-game': return <WaitingGame {...gameProps} />;
      case 'fortune-cookie': return <FortuneCookieGame {...gameProps} />;
      case 'rock-nft': return <RockNftGame {...gameProps} />;
      default: return <div>Game component not found</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Game Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/games')}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">{game.emoji}</span>
                  <span>{game.title}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {game.description}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetGame}
              className="flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Game Component */}
      <div className="game-container">
        {renderGame()}
      </div>
    </div>
  );
}