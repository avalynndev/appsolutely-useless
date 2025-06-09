'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { playSound } from '@/lib/sounds';
import { incrementTaps } from '@/lib/storage';

export function PunchSimulatorGame() {
  const [painLevel, setPainLevel] = useState(0);
  const [punchCount, setPunchCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const punchYourself = () => {
    incrementTaps();
    setPunchCount(prev => prev + 1);
    setPainLevel(prev => Math.min(100, prev + Math.random() * 10 + 5));
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    playSound('punch');
  };

  const getPainEmoji = () => {
    if (painLevel < 20) return '😐';
    if (painLevel < 40) return '😬';
    if (painLevel < 60) return '😣';
    if (painLevel < 80) return '😵';
    return '💀';
  };

  const getPainDescription = () => {
    if (painLevel < 20) return "Just a gentle tap. You're being too nice to yourself.";
    if (painLevel < 40) return "That stung a bit. You're getting warmer.";
    if (painLevel < 60) return "Ouch! That actually hurt. Why are you doing this?";
    if (painLevel < 80) return "Seriously painful now. Please reconsider your life choices.";
    return "MAXIMUM PAIN ACHIEVED! You've mastered the art of self-punishment.";
  };

  const getPainColor = () => {
    if (painLevel < 20) return 'from-green-400 to-green-600';
    if (painLevel < 40) return 'from-yellow-400 to-yellow-600';
    if (painLevel < 60) return 'from-orange-400 to-orange-600';
    if (painLevel < 80) return 'from-red-400 to-red-600';
    return 'from-purple-400 to-purple-600';
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>👊 Punch Yourself Simulator</CardTitle>
        <p className="text-sm text-muted-foreground">
          Why would you want to do this? We don't know either.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pain Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Pain Level</span>
            <span className="text-2xl">{getPainEmoji()}</span>
          </div>
          <Progress value={painLevel} className="h-4" />
          <div className="text-center">
            <div className="text-2xl font-bold">{Math.round(painLevel)}%</div>
            <div className="text-xs text-muted-foreground">
              {getPainDescription()}
            </div>
          </div>
        </div>

        {/* Punch Button */}
        <div className="text-center">
          <Button
            onClick={punchYourself}
            size="lg"
            className={`w-32 h-32 rounded-full text-4xl transition-all duration-300 ${
              isAnimating ? 'scale-110 rotate-12' : 'scale-100'
            } bg-gradient-to-br ${getPainColor()} hover:scale-105 shadow-lg`}
          >
            👊
          </Button>
          <div className="mt-4">
            <div className="text-lg font-semibold">Punch Counter</div>
            <div className="text-3xl font-bold text-primary">{punchCount}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">Punches</div>
            <div className="text-xl font-bold">{punchCount}</div>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">Max Pain</div>
            <div className="text-xl font-bold">{Math.round(painLevel)}%</div>
          </div>
        </div>

        {/* Encouragement/Discouragement */}
        <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="text-sm">
            {punchCount === 0 && "Come on, don't be shy! Give yourself a good punch!"}
            {punchCount > 0 && punchCount < 10 && "You're getting the hang of this masochistic lifestyle."}
            {punchCount >= 10 && punchCount < 25 && "Impressive dedication to self-harm simulation."}
            {punchCount >= 25 && punchCount < 50 && "You might have a problem. But keep going!"}
            {punchCount >= 50 && "You are officially a professional self-puncher. Seek help."}
          </div>
        </div>

        {/* Reset Button */}
        {punchCount > 0 && (
          <Button
            variant="outline"
            onClick={() => {
              setPainLevel(0);
              setPunchCount(0);
              incrementTaps();
            }}
            className="w-full"
          >
            🔄 Reset Pain (Start Over)
          </Button>
        )}
      </CardContent>
    </Card>
  );
}