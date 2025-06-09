'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { playSound } from '@/lib/sounds';
import { incrementTaps } from '@/lib/storage';

export function InvisibleCatGame() {
  const [purrMeter, setPurrMeter] = useState(0);
  const [petCount, setPetCount] = useState(0);
  const [lastPetPosition, setLastPetPosition] = useState<{x: number, y: number} | null>(null);
  const [showPetEffect, setShowPetEffect] = useState(false);

  const petTheCat = (event: React.MouseEvent) => {
    incrementTaps();
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setLastPetPosition({ x, y });
    setPetCount(prev => prev + 1);
    setPurrMeter(prev => Math.min(100, prev + Math.random() * 15 + 5));
    
    setShowPetEffect(true);
    setTimeout(() => {
      setShowPetEffect(false);
      setLastPetPosition(null);
    }, 1000);
    
    playSound('meow');
  };

  const getCatMood = () => {
    if (purrMeter < 20) return { emoji: '😾', mood: 'Grumpy', description: 'The cat is not amused by your lack of attention.' };
    if (purrMeter < 40) return { emoji: '😼', mood: 'Skeptical', description: 'The cat is warming up to you... maybe.' };
    if (purrMeter < 60) return { emoji: '😸', mood: 'Content', description: 'Nice petting! The cat approves.' };
    if (purrMeter < 80) return { emoji: '😻', mood: 'Happy', description: 'The cat is purring loudly! You\'re doing great!' };
    return { emoji: '🥰', mood: 'Euphoric', description: 'Maximum happiness achieved! The cat loves you!' };
  };

  const getPurrLevel = () => {
    if (purrMeter < 20) return 'Silent';
    if (purrMeter < 40) return 'Quiet purr';
    if (purrMeter < 60) return 'Gentle purr';
    if (purrMeter < 80) return 'Loud purr';
    return 'MEGA PURR!';
  };

  const catMood = getCatMood();

  const resetCat = () => {
    incrementTaps();
    setPurrMeter(0);
    setPetCount(0);
    setLastPetPosition(null);
    setShowPetEffect(false);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>😸 Pet the Invisible Cat</CardTitle>
        <p className="text-sm text-muted-foreground">
          There's definitely a cat here. Trust us. Just click anywhere to pet it!
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cat Status */}
        <div className="text-center space-y-2">
          <div className="text-6xl">{catMood.emoji}</div>
          <div className="text-lg font-semibold">{catMood.mood}</div>
          <div className="text-sm text-muted-foreground">{catMood.description}</div>
        </div>

        {/* Purr Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Purr Level</span>
            <span className="text-sm text-muted-foreground">{getPurrLevel()}</span>
          </div>
          <Progress value={purrMeter} className="h-3" />
          <div className="text-center text-sm text-muted-foreground">
            {Math.round(purrMeter)}% happiness
          </div>
        </div>

        {/* Petting Area */}
        <div className="relative">
          <div
            onClick={petTheCat}
            className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer transition-all duration-200 hover:from-purple-200 hover:to-pink-200 hover:border-purple-400 flex items-center justify-center relative overflow-hidden"
          >
            <div className="text-center text-purple-600">
              <div className="text-4xl mb-2">👆</div>
              <div className="text-sm font-medium">Click anywhere to pet the invisible cat!</div>
            </div>
            
            {/* Pet Effect */}
            {showPetEffect && lastPetPosition && (
              <div
                className="absolute pointer-events-none"
                style={{
                  left: lastPetPosition.x - 20,
                  top: lastPetPosition.y - 20,
                }}
              >
                <div className="animate-ping text-2xl">❤️</div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">{petCount}</div>
            <div className="text-sm text-muted-foreground">Pets Given</div>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">{Math.round(purrMeter)}%</div>
            <div className="text-sm text-muted-foreground">Cat Happiness</div>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
          <div className="text-sm text-center">
            {petCount === 0 && "The cat is waiting for attention..."}
            {petCount > 0 && petCount < 10 && "You're getting the hang of invisible cat petting!"}
            {petCount >= 10 && petCount < 25 && "The cat really likes you now!"}
            {petCount >= 25 && petCount < 50 && "You're becoming a professional invisible cat petter!"}
            {petCount >= 50 && "You are now the official Invisible Cat Whisperer! 🏆"}
          </div>
        </div>

        {/* Reset Button */}
        {petCount > 0 && (
          <Button
            variant="outline"
            onClick={resetCat}
            className="w-full"
          >
            🔄 Find a New Invisible Cat
          </Button>
        )}

        {/* Invisible Cat "Facts" */}
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>• This cat is 100% invisible and 100% real</p>
          <p>• No actual cats were harmed in the making of this game</p>
          <p>• Results may vary depending on your cat-petting skills</p>
        </div>
      </CardContent>
    </Card>
  );
}