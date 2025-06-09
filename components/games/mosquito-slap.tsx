'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { playSound } from '@/lib/sounds';
import { incrementTaps } from '@/lib/storage';

interface MosquitoPosition {
  x: number;
  y: number;
  id: number;
}

export function MosquitoSlapGame() {
  const [mosquito, setMosquito] = useState<MosquitoPosition | null>(null);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [showSplat, setShowSplat] = useState<{x: number, y: number} | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const mosquitoTimeoutRef = useRef<NodeJS.Timeout>();
  const gameTimerRef = useRef<NodeJS.Timeout>();

  const startGame = () => {
    incrementTaps();
    setGameActive(true);
    setScore(0);
    setMisses(0);
    setTimeLeft(30);
    spawnMosquito();
    
    gameTimerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setGameActive(false);
    setMosquito(null);
    if (mosquitoTimeoutRef.current) {
      clearTimeout(mosquitoTimeoutRef.current);
    }
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
  };

  const spawnMosquito = () => {
    if (!gameActive) return;
    
    const x = Math.random() * 80 + 10; // 10% to 90% to keep mosquito in bounds
    const y = Math.random() * 80 + 10;
    
    setMosquito({
      x,
      y,
      id: Date.now()
    });

    // Move mosquito after 1-3 seconds
    mosquitoTimeoutRef.current = setTimeout(() => {
      if (gameActive) {
        spawnMosquito();
      }
    }, Math.random() * 2000 + 1000);
  };

  const slapMosquito = (event: React.MouseEvent, caught: boolean = false) => {
    incrementTaps();
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    if (caught && mosquito) {
      setScore(prev => prev + 1);
      setShowSplat({ x, y });
      playSound('splat');
      
      setTimeout(() => setShowSplat(null), 1000);
      
      // Spawn new mosquito after short delay
      setTimeout(() => {
        if (gameActive) spawnMosquito();
      }, 500);
    } else {
      setMisses(prev => prev + 1);
      playSound('fail');
    }
    
    setMosquito(null);
  };

  const getAccuracy = () => {
    const totalAttempts = score + misses;
    return totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;
  };

  const getPerformanceMessage = () => {
    const accuracy = getAccuracy();
    if (score === 0) return "No mosquitoes eliminated. They're still buzzing around!";
    if (accuracy >= 80) return "Mosquito Terminator! You're a slapping machine!";
    if (accuracy >= 60) return "Good hunting! Most mosquitoes fear you.";
    if (accuracy >= 40) return "Not bad! Some mosquitoes escaped though.";
    return "The mosquitoes are winning this battle...";
  };

  useEffect(() => {
    return () => {
      if (mosquitoTimeoutRef.current) {
        clearTimeout(mosquitoTimeoutRef.current);
      }
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current);
      }
    };
  }, []);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>🦟 Virtual Mosquito Slap</CardTitle>
        <p className="text-sm text-muted-foreground">
          Hunt down the annoying mosquito before time runs out!
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!gameActive && timeLeft === 30 ? (
          <div className="text-center space-y-4">
            <div className="text-6xl animate-bounce">🦟</div>
            <div className="text-lg">Ready to hunt some mosquitoes?</div>
            <Button onClick={startGame} size="lg" className="w-full">
              Start Hunting!
            </Button>
          </div>
        ) : (
          <>
            {/* Game Stats */}
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{score}</div>
                <div className="text-xs text-muted-foreground">Killed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft}</div>
                <div className="text-xs text-muted-foreground">Seconds</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{misses}</div>
                <div className="text-xs text-muted-foreground">Missed</div>
              </div>
            </div>

            {/* Game Area */}
            <div className="relative">
              <div
                ref={gameAreaRef}
                onClick={(e) => slapMosquito(e, false)}
                className="w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 border-2 border-green-300 rounded-lg cursor-crosshair relative overflow-hidden"
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(120,200,120,0.3)_0%,_transparent_50%)]"></div>
                  <div className="w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(120,120,200,0.3)_0%,_transparent_50%)]"></div>
                </div>

                {/* Instructions */}
                {!mosquito && gameActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-green-700">
                      <div className="text-2xl mb-2">👀</div>
                      <div className="text-sm">Looking for mosquito...</div>
                    </div>
                  </div>
                )}

                {/* Mosquito */}
                {mosquito && gameActive && (
                  <div
                    className="absolute text-2xl cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-pulse hover:scale-110 transition-transform"
                    style={{
                      left: `${mosquito.x}%`,
                      top: `${mosquito.y}%`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      slapMosquito(e, true);
                    }}
                  >
                    🦟
                  </div>
                )}

                {/* Splat Effect */}
                {showSplat && (
                  <div
                    className="absolute text-3xl transform -translate-x-1/2 -translate-y-1/2 animate-ping pointer-events-none"
                    style={{
                      left: `${showSplat.x}%`,
                      top: `${showSplat.y}%`,
                    }}
                  >
                    💥
                  </div>
                )}

                {/* Game Over Overlay */}
                {!gameActive && timeLeft === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">⏰</div>
                      <div className="text-lg font-bold">Time's Up!</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Game Over Stats */}
            {!gameActive && timeLeft === 0 && (
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-green-100 to-blue-100 border border-green-300 rounded-lg">
                  <div className="text-lg font-bold mb-2">Final Results</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold">Mosquitoes Killed</div>
                      <div className="text-2xl">{score}</div>
                    </div>
                    <div>
                      <div className="font-semibold">Accuracy</div>
                      <div className="text-2xl">{getAccuracy()}%</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    {getPerformanceMessage()}
                  </div>
                </div>
                
                <Button onClick={startGame} className="w-full">
                  🔄 Hunt Again
                </Button>
              </div>
            )}
          </>
        )}

        {/* Pro Tips */}
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>💡 Pro tip: Mosquitoes move every 1-3 seconds</p>
          <p>🎯 Click directly on the mosquito to squash it</p>
          <p>⚡ Quick reflexes are key to success!</p>
        </div>
      </CardContent>
    </Card>
  );
}