"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGameById } from "@/lib/game-data";
import { updateGameStats } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RotateCcw } from "lucide-react";

import { SoupOrSoapGame } from "@/components/games/soup-or-soap";
import { PunchSimulatorGame } from "@/components/games/punch-simulator";
import { ChickenOrCeoGame } from "@/components/games/chicken-or-ceo";
import { UselessButtonGame } from "@/components/games/useless-button";
import { InvisibleCatGame } from "@/components/games/invisible-cat";
import { BananaMoodGame } from "@/components/games/banana-mood";
import { PayRespectsGame } from "@/components/games/pay-respects";
import { MosquitoSlapGame } from "@/components/games/mosquito-slap";
import { ShitpostGeneratorGame } from "@/components/games/shitpost-generator";
import { TapToScreamGame } from "@/components/games/tap-to-scream";
import { UselessnessPredictorGame } from "@/components/games/uselessness-predictor";
import { WaitingGame } from "@/components/games/waiting-game";
import { FortuneCookieGame } from "@/components/games/fortune-cookie";
import { RockNftGame } from "@/components/games/rock-nft";

export function GamePageClient({ params }: any) {
  const router = useRouter();
  const [startTime, setStartTime] = useState<number>(0);
  const [gameKey, setGameKey] = useState<number>(0);

  const game = getGameById(params);

  useEffect(() => {
    if (!game) return;

    const now = Date.now();
    setStartTime(now);

    // Track game start
    updateGameStats(game.id, {
      timesPlayed: 1,
      timeSpent: 0,
    });

    return () => {
      const timeSpent = Math.floor((Date.now() - now) / 1000);
      updateGameStats(game.id, {
        timesPlayed: 0,
        timeSpent,
      });
    };
  }, [game, gameKey]);

  const resetGame = () => {
    setGameKey((prev) => prev + 1);
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
        <Button onClick={() => router.push("/games")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Button>
      </div>
    );
  }

  const renderGame = () => {
    switch (game.id) {
      case "soup-or-soap":
        return <SoupOrSoapGame key={gameKey} />;
      case "punch-simulator":
        return <PunchSimulatorGame key={gameKey} />;
      case "chicken-or-ceo":
        return <ChickenOrCeoGame key={gameKey} />;
      case "useless-button":
        return <UselessButtonGame key={gameKey} />;
      case "invisible-cat":
        return <InvisibleCatGame key={gameKey} />;
      case "banana-mood":
        return <BananaMoodGame key={gameKey} />;
      case "pay-respects":
        return <PayRespectsGame key={gameKey} />;
      case "mosquito-slap":
        return <MosquitoSlapGame key={gameKey} />;
      case "shitpost-generator":
        return <ShitpostGeneratorGame key={gameKey} />;
      case "tap-to-scream":
        return <TapToScreamGame key={gameKey} />;
      case "uselessness-predictor":
        return <UselessnessPredictorGame key={gameKey} />;
      case "waiting-game":
        return <WaitingGame key={gameKey} />;
      case "fortune-cookie":
        return <FortuneCookieGame key={gameKey} />;
      case "rock-nft":
        return <RockNftGame key={gameKey} />;
      default:
        return <div>Game component not found</div>;
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
                onClick={() => router.push("/games")}
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

      <div className="game-container">{renderGame()}</div>
    </div>
  );
}
