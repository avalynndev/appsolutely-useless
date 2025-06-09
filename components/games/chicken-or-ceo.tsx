'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { playSound } from '@/lib/sounds';
import { incrementTaps } from '@/lib/storage';

interface Quote {
  text: string;
  source: 'chicken' | 'ceo';
  attribution: string;
}

const quotes: Quote[] = [
  {
    text: "The key to success is to focus on goals, not obstacles.",
    source: 'ceo',
    attribution: 'Real CEO wisdom'
  },
  {
    text: "Bawk bawk excellence through innovative grain consumption strategies.",
    source: 'chicken',
    attribution: 'AI-generated chicken nonsense'
  },
  {
    text: "We need to leverage our core competencies to maximize shareholder value.",
    source: 'ceo',
    attribution: 'Every corporate meeting ever'
  },
  {
    text: "Cluck cluck disruption in the henhouse will revolutionize pecking order dynamics.",
    source: 'chicken',
    attribution: 'Definitely a chicken'
  },
  {
    text: "Innovation is the currency of the future.",
    source: 'ceo',
    attribution: 'Tech startup mantra'
  },
  {
    text: "Squawk squawk blockchain technology will transform egg-laying methodologies.",
    source: 'chicken',
    attribution: 'Forward-thinking poultry'
  },
  {
    text: "We must pivot our business model to stay competitive in today's market.",
    source: 'ceo',
    attribution: 'Business school 101'
  },
  {
    text: "Bawk bawk synergistic feather optimization yields unprecedented coop efficiency.",
    source: 'chicken',
    attribution: 'Consultant chicken'
  },
  {
    text: "Failure is not the opposite of success, it's part of success.",
    source: 'ceo',
    attribution: 'Motivational speaker CEO'
  },
  {
    text: "Cluck cluck machine learning algorithms will automate seed selection processes.",
    source: 'chicken',
    attribution: 'Tech-savvy hen'
  }
];

export function ChickenOrCeoGame() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [userAnswer, setUserAnswer] = useState<'chicken' | 'ceo' | null>(null);

  const quote = quotes[currentQuote];

  const handleAnswer = (answer: 'chicken' | 'ceo') => {
    incrementTaps();
    setUserAnswer(answer);
    setShowAnswer(true);
    
    if (answer === quote.source) {
      setScore(score + 1);
      setStreak(streak + 1);
      playSound('success');
    } else {
      setStreak(0);
      playSound('fail');
    }
  };

  const nextQuestion = () => {
    incrementTaps();
    
    if (currentQuote + 1 >= quotes.length) {
      setGameOver(true);
    } else {
      setCurrentQuote(currentQuote + 1);
      setShowAnswer(false);
      setUserAnswer(null);
    }
  };

  const resetGame = () => {
    incrementTaps();
    setCurrentQuote(0);
    setScore(0);
    setStreak(0);
    setShowAnswer(false);
    setGameOver(false);
    setUserAnswer(null);
  };

  if (gameOver) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>🏆 Game Over!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <div className="text-4xl font-bold">
              {score}/{quotes.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Final Score
            </div>
          </div>
          <p className="text-muted-foreground">
            {score === quotes.length ? "Perfect! You can tell the difference between chickens and CEOs!" :
             score >= quotes.length * 0.8 ? "Excellent! You have a good sense for corporate vs. poultry wisdom." :
             score >= quotes.length * 0.6 ? "Not bad! Sometimes it's hard to tell the difference." :
             "Maybe chickens and CEOs aren't that different after all..."}
          </p>
          <Button onClick={resetGame} className="w-full">
            Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>🐔 Chicken or CEO?</CardTitle>
          <Badge>
            {currentQuote + 1}/{quotes.length}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div>Score: <span className="font-bold">{score}</span></div>
          <div>Streak: <span className="font-bold text-orange-600">{streak}</span></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quote Display */}
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
          <div className="text-lg font-medium leading-relaxed text-center">
            "{quote.text}"
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Who said this profound statement?
        </div>

        {!showAnswer ? (
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleAnswer('chicken')}
              className="h-20 flex flex-col items-center justify-center space-y-2"
              variant="outline"
            >
              <span className="text-2xl">🐔</span>
              <span>Chicken</span>
            </Button>
            <Button
              onClick={() => handleAnswer('ceo')}
              className="h-20 flex flex-col items-center justify-center space-y-2"
              variant="outline"
            >
              <span className="text-2xl">💼</span>
              <span>CEO</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`text-center p-4 rounded-lg ${
              userAnswer === quote.source ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
            }`}>
              <div className="text-2xl mb-2">
                {userAnswer === quote.source ? '✅ Correct!' : '❌ Wrong!'}
              </div>
              <div className="font-semibold">
                It was a {quote.source}!
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {quote.attribution}
              </div>
            </div>
            <Button onClick={nextQuestion} className="w-full">
              {currentQuote + 1 >= quotes.length ? 'Finish Game' : 'Next Quote'}
            </Button>
          </div>
        )}

        {/* Streak indicator */}
        {streak > 2 && (
          <div className="text-center p-2 bg-orange-100 border border-orange-200 rounded-lg">
            <div className="text-sm">
              🔥 {streak} in a row! You're on fire!
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}