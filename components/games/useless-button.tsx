'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { playSound } from '@/lib/sounds';
import { incrementTaps } from '@/lib/storage';

export function UselessButtonGame() {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [motivation, setMotivation] = useState('');

  const getMotivationalMessage = (count: number) => {
    if (count === 0) return "Go ahead, click it. You know you want to.";
    if (count === 1) return "Congratulations! You've accomplished absolutely nothing.";
    if (count < 10) return "Keep going! This is definitely a productive use of your time.";
    if (count < 25) return "Wow, such dedication to pointlessness!";
    if (count < 50) return "You're really committed to this meaningless task.";
    if (count < 100) return "This is impressive levels of time wasting.";
    if (count < 250) return "You've clicked this button more times than most people blink in a minute.";
    if (count < 500) return "At this point, you might as well keep going...";
    if (count < 1000) return "You're approaching legendary levels of button clicking.";
    return "You are officially a master of pointless clicking. Congratulations?";
  };

  const getButtonSize = () => {
    if (count < 10) return "w-32 h-32";
    if (count < 50) return "w-36 h-36";
    if (count < 100) return "w-40 h-40";
    if (count < 500) return "w-44 h-44";
    return "w-48 h-48";
  };

  const getButtonColor = () => {
    const colors = [
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600',
      'from-teal-400 to-teal-600',
      'from-orange-400 to-orange-600',
      'from-pink-400 to-pink-600',
      'from-green-400 to-green-600',
      'from-red-400 to-red-600',
    ];
    return colors[count % colors.length];
  };

  useEffect(() => {
    setMotivation(getMotivationalMessage(count));
  }, [count]);

  const handleClick = () => {
    incrementTaps();
    setCount(prev => prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
    playSound('click');
  };

  const reset = () => {
    incrementTaps();
    setCount(0);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>🔘 The Button That Does Nothing</CardTitle>
        <p className="text-sm text-muted-foreground">
          Revolutionary technology that counts clicks. Patent pending.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* The Button */}
        <div className="flex flex-col items-center space-y-4">
          <Button
            onClick={handleClick}
            className={`${getButtonSize()} rounded-full font-bold text-2xl transition-all duration-200 ${
              isAnimating ? 'scale-110' : 'scale-100'
            } bg-gradient-to-br ${getButtonColor()} hover:scale-105 shadow-lg`}
          >
            CLICK
          </Button>
          
          {/* Counter */}
          <div className="text-center">
            <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              {count.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Meaningless clicks
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-teal-50 border border-purple-200 rounded-lg">
          <p className="text-sm italic">
            {motivation}
          </p>
        </div>

        {/* Achievements */}
        {count > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">🏆 Achievements Unlocked:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {count >= 1 && (
                <div className="p-2 bg-green-100 border border-green-300 rounded text-center">
                  First Click!
                </div>
              )}
              {count >= 10 && (
                <div className="p-2 bg-blue-100 border border-blue-300 rounded text-center">
                  Double Digits
                </div>
              )}
              {count >= 50 && (
                <div className="p-2 bg-purple-100 border border-purple-300 rounded text-center">
                  Half Century
                </div>
              )}
              {count >= 100 && (
                <div className="p-2 bg-orange-100 border border-orange-300 rounded text-center">
                  Centurion
                </div>
              )}
              {count >= 500 && (
                <div className="p-2 bg-red-100 border border-red-300 rounded text-center">
                  Time Waster
                </div>
              )}
              {count >= 1000 && (
                <div className="p-2 bg-yellow-100 border border-yellow-300 rounded text-center">
                  Legend
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reset Button */}
        {count > 0 && (
          <Button
            variant="outline"
            onClick={reset}
            className="w-full"
          >
            🗑️ Reset (Lose All Progress)
          </Button>
        )}

        {/* Stats */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Time invested in clicking: Approximately {Math.round(count * 0.5)} seconds</p>
          <p>Productivity gained: 0%</p>
          <p>Satisfaction level: Questionable</p>
        </div>
      </CardContent>
    </Card>
  );
}