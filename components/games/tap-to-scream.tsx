'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, VolumeX } from 'lucide-react';
import { playSound, playRandomScream } from '@/lib/sounds';
import { incrementTaps } from '@/lib/storage';

const screamTypes = [
  { emoji: '😱', name: 'Classic Scream', description: 'The timeless human scream' },
  { emoji: '🐐', name: 'Goat Scream', description: 'BAAAHHHHH!' },
  { emoji: '👶', name: 'Baby Scream', description: 'Ear-piercing infant wails' },
  { emoji: '🦅', name: 'Eagle Scream', description: 'SCREEEEEECH!' },
  { emoji: '🐷', name: 'Pig Scream', description: 'Squealing swine sounds' },
  { emoji: '🤖', name: 'Robot Scream', description: 'ERROR ERROR ERROR' },
  { emoji: '👻', name: 'Ghost Scream', description: 'Spooky supernatural wails' },
  { emoji: '🦖', name: 'Dinosaur Scream', description: 'ROAAAAAR!' },
];

export function TapToScreamGame() {
  const [screamCount, setScreamCount] = useState(0);
  const [currentScream, setCurrentScream] = useState<typeof screamTypes[0] | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [screamHistory, setScreamHistory] = useState<string[]>([]);

  const scream = () => {
    incrementTaps();
    
    const randomScream = screamTypes[Math.floor(Math.random() * screamTypes.length)];
    setCurrentScream(randomScream);
    setScreamCount(prev => prev + 1);
    setScreamHistory(prev => [randomScream.name, ...prev.slice(0, 4)]);
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    
    if (soundEnabled) {
      playRandomScream();
    }
  };

  const toggleSound = () => {
    incrementTaps();
    setSoundEnabled(!soundEnabled);
    playSound('click');
  };

  const reset = () => {
    incrementTaps();
    setScreamCount(0);
    setCurrentScream(null);
    setScreamHistory([]);
  };

  const getScreamLevel = () => {
    if (screamCount === 0) return { level: 'Silent', emoji: '🤐', color: 'text-gray-600' };
    if (screamCount < 5) return { level: 'Whisperer', emoji: '🤫', color: 'text-blue-600' };
    if (screamCount < 15) return { level: 'Casual Screamer', emoji: '😮', color: 'text-green-600' };
    if (screamCount < 30) return { level: 'Loud Person', emoji: '📢', color: 'text-orange-600' };
    if (screamCount < 50) return { level: 'Scream Machine', emoji: '🔊', color: 'text-red-600' };
    if (screamCount < 100) return { level: 'Banshee', emoji: '👻', color: 'text-purple-600' };
    return { level: 'Scream Lord', emoji: '👑', color: 'text-yellow-600' };
  };

  const screamLevel = getScreamLevel();

  const getMotivationalMessage = () => {
    if (screamCount === 0) return "Let it all out! Tap to release your inner screamer.";
    if (screamCount < 10) return "Good start! The neighbors are starting to worry.";
    if (screamCount < 25) return "You're really getting into this screaming thing!";
    if (screamCount < 50) return "Professional screamer level achieved!";
    return "You have transcended normal human vocal capabilities.";
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-between">
          <CardTitle>😱 Tap to Scream</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSound}
            className="p-2"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Tap to hear increasingly absurd screaming sounds
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Scream Display */}
        <div className="text-center space-y-4">
          {currentScream ? (
            <div className={`transition-all duration-500 ${isAnimating ? 'scale-125 rotate-12' : 'scale-100'}`}>
              <div className="text-8xl mb-2">{currentScream.emoji}</div>
              <div className="text-lg font-semibold">{currentScream.name}</div>
              <div className="text-sm text-muted-foreground">{currentScream.description}</div>
            </div>
          ) : (
            <div>
              <div className="text-8xl mb-2">🤐</div>
              <div className="text-lg">Ready to scream?</div>
            </div>
          )}
        </div>

        {/* Scream Button */}
        <div className="text-center">
          <Button
            onClick={scream}
            size="lg"
            className={`w-32 h-32 rounded-full text-4xl transition-all duration-300 ${
              isAnimating ? 'scale-110' : 'scale-100'
            } bg-gradient-to-br from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 shadow-lg`}
          >
            😱
          </Button>
        </div>

        {/* Stats */}
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold">{screamCount}</div>
          <div className="text-sm text-muted-foreground">Total Screams</div>
          
          <div className={`text-lg font-semibold ${screamLevel.color}`}>
            {screamLevel.emoji} {screamLevel.level}
          </div>
        </div>

        {/* Motivation */}
        <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg">
          <p className="text-sm text-center italic">
            {getMotivationalMessage()}
          </p>
        </div>

        {/* Scream History */}
        {screamHistory.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">🎵 Recent Screams:</div>
            <div className="space-y-1">
              {screamHistory.map((scream, index) => (
                <div
                  key={index}
                  className={`text-xs p-2 rounded ${
                    index === 0 ? 'bg-red-100 border border-red-300' : 'bg-gray-100'
                  }`}
                >
                  {scream}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {screamCount > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">🏆 Scream Achievements:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {screamCount >= 1 && (
                <div className="p-2 bg-blue-100 border border-blue-300 rounded text-center">
                  First Scream!
                </div>
              )}
              {screamCount >= 10 && (
                <div className="p-2 bg-green-100 border border-green-300 rounded text-center">
                  Loud & Proud
                </div>
              )}
              {screamCount >= 25 && (
                <div className="p-2 bg-orange-100 border border-orange-300 rounded text-center">
                  Noise Maker
                </div>
              )}
              {screamCount >= 50 && (
                <div className="p-2 bg-red-100 border border-red-300 rounded text-center">
                  Scream Master
                </div>
              )}
              {screamCount >= 100 && (
                <div className="p-2 bg-purple-100 border border-purple-300 rounded text-center">
                  Legendary
                </div>
              )}
              {screamHistory.length >= 5 && (
                <div className="p-2 bg-yellow-100 border border-yellow-300 rounded text-center">
                  Variety Pack
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sound Warning */}
        <div className="text-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-sm">
            ⚠️ Warning: May cause {soundEnabled ? 'actual noise' : 'silent confusion'}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {soundEnabled ? 'Turn off sound if you value your eardrums' : 'Sound is disabled - screaming silently'}
          </div>
        </div>

        {/* Reset Button */}
        {screamCount > 0 && (
          <Button
            variant="outline"
            onClick={reset}
            className="w-full"
          >
            🔄 Reset Scream Counter
          </Button>
        )}
      </CardContent>
    </Card>
  );
}