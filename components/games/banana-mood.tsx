'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { playSound } from '@/lib/sounds';
import { incrementTaps } from '@/lib/storage';

interface BananaMood {
  emoji: string;
  mood: string;
  description: string;
  color: string;
}

const moods: BananaMood[] = [
  {
    emoji: '😊',
    mood: 'Cheerful',
    description: 'This banana is having a great day! It\'s ripe, yellow, and ready to make someone\'s smoothie dreams come true.',
    color: 'bg-yellow-100 border-yellow-300'
  },
  {
    emoji: '😢',
    mood: 'Melancholic',
    description: 'Feeling a bit bruised today. This banana is contemplating the meaning of potassium and wondering if it will end up in bread.',
    color: 'bg-blue-100 border-blue-300'
  },
  {
    emoji: '😴',
    mood: 'Sleepy',
    description: 'This banana is in a drowsy state, slowly ripening and dreaming of tropical beaches where it once grew.',
    color: 'bg-purple-100 border-purple-300'
  },
  {
    emoji: '😠',
    mood: 'Furious',
    description: 'ANGRY BANANA ALERT! Someone left it next to an apple and it\'s not happy about the ethylene gas situation.',
    color: 'bg-red-100 border-red-300'
  },
  {
    emoji: '🤔',
    mood: 'Philosophical',
    description: 'Deep in thought about the nature of existence. Is it a fruit? Is it a berry? What is the meaning of being yellow?',
    color: 'bg-green-100 border-green-300'
  },
  {
    emoji: '😎',
    mood: 'Cool',
    description: 'This banana is the coolest fruit in the bowl. It knows it\'s the perfect snack and isn\'t afraid to show it.',
    color: 'bg-teal-100 border-teal-300'
  },
  {
    emoji: '🥺',
    mood: 'Pleading',
    description: 'Please don\'t eat me yet! I\'m not quite ripe enough. Give me another day or two to reach peak deliciousness.',
    color: 'bg-pink-100 border-pink-300'
  },
  {
    emoji: '🤪',
    mood: 'Wacky',
    description: 'This banana has gone completely bananas! It\'s dancing to its own rhythm and having the time of its life.',
    color: 'bg-orange-100 border-orange-300'
  }
];

const moodOptions = [
  'Happy', 'Sad', 'Angry', 'Excited', 'Tired', 'Confused', 'Cool', 'Silly'
];

export function BananaMoodGame() {
  const [currentBanana, setCurrentBanana] = useState<BananaMood | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [userGuess, setUserGuess] = useState<string | null>(null);

  const generateNewBanana = () => {
    incrementTaps();
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    setCurrentBanana(randomMood);
    setShowAnswer(false);
    setUserGuess(null);
  };

  const makeGuess = (guess: string) => {
    incrementTaps();
    setUserGuess(guess);
    setShowAnswer(true);
    setAttempts(prev => prev + 1);
    
    // Very loose matching - multiple correct answers possible
    const isCorrect = guess.toLowerCase().includes(currentBanana!.mood.toLowerCase()) ||
                     currentBanana!.mood.toLowerCase().includes(guess.toLowerCase()) ||
                     (guess === 'Happy' && ['Cheerful', 'Cool', 'Wacky'].includes(currentBanana!.mood)) ||
                     (guess === 'Sad' && ['Melancholic', 'Pleading'].includes(currentBanana!.mood)) ||
                     (guess === 'Tired' && currentBanana!.mood === 'Sleepy') ||
                     (guess === 'Angry' && currentBanana!.mood === 'Furious') ||
                     (guess === 'Confused' && currentBanana!.mood === 'Philosophical') ||
                     (guess === 'Silly' && currentBanana!.mood === 'Wacky');
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      playSound('success');
    } else {
      playSound('fail');
    }
  };

  const reset = () => {
    incrementTaps();
    setCurrentBanana(null);
    setShowAnswer(false);
    setScore(0);
    setAttempts(0);
    setUserGuess(null);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>🍌 Guess the Banana's Mood</CardTitle>
        <p className="text-sm text-muted-foreground">
          Every banana has feelings. Can you guess what this one is thinking?
        </p>
        {attempts > 0 && (
          <div className="flex justify-center space-x-4 text-sm">
            <span>Score: <span className="font-bold">{score}</span></span>
            <span>Attempts: <span className="font-bold">{attempts}</span></span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {!currentBanana ? (
          <div className="text-center space-y-4">
            <div className="text-8xl">🍌</div>
            <Button onClick={generateNewBanana} size="lg" className="w-full">
              Meet a Banana
            </Button>
          </div>
        ) : (
          <>
            {/* Banana Display */}
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="text-8xl">🍌</div>
                <div className="absolute -top-2 -right-2 text-4xl">
                  {currentBanana.emoji}
                </div>
              </div>
              <div className="text-lg font-medium">
                What is this banana feeling?
              </div>
            </div>

            {!showAnswer ? (
              <div className="grid grid-cols-2 gap-3">
                {moodOptions.map((mood) => (
                  <Button
                    key={mood}
                    variant="outline"
                    onClick={() => makeGuess(mood)}
                    className="h-12"
                  >
                    {mood}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border-2 ${currentBanana.color}`}>
                  <div className="text-center space-y-2">
                    <div className="text-2xl">
                      {userGuess && userGuess.toLowerCase().includes(currentBanana.mood.toLowerCase()) ? '✅' : '❌'}
                    </div>
                    <div className="font-semibold text-lg">
                      Actually: {currentBanana.mood}
                    </div>
                    <div className="text-sm">
                      {currentBanana.description}
                    </div>
                  </div>
                </div>
                
                <Button onClick={generateNewBanana} className="w-full">
                  Meet Another Banana
                </Button>
              </div>
            )}
          </>
        )}

        {/* Fun Stats */}
        {attempts > 0 && (
          <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
            <div className="text-center text-sm">
              <div className="font-medium mb-1">Banana Psychology Stats</div>
              <div>Accuracy: {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%</div>
              <div className="text-xs text-muted-foreground mt-1">
                {score === attempts && attempts > 3 ? "You're a certified Banana Mood Expert! 🏆" :
                 score / attempts > 0.7 ? "You have excellent banana empathy!" :
                 score / attempts > 0.5 ? "Not bad! Bananas are complex creatures." :
                 "Bananas are mysterious. Keep trying!"}
              </div>
            </div>
          </div>
        )}

        {/* Reset Button */}
        {attempts > 0 && (
          <Button variant="outline" onClick={reset} className="w-full">
            🔄 Start Fresh
          </Button>
        )}

        {/* Banana Facts */}
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>• All banana moods are scientifically verified*</p>
          <p>• *Not actually scientifically verified</p>
          <p>• No bananas were emotionally harmed in this game</p>
        </div>
      </CardContent>
    </Card>
  );
}