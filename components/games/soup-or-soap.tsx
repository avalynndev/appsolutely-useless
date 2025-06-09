'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { playSound } from '@/lib/sounds';
import { incrementTaps } from '@/lib/storage';

interface Question {
  imageUrl: string;
  answer: 'soup' | 'soap';
  description: string;
}

const questions: Question[] = [
  {
    imageUrl: 'https://images.pexels.com/photos/725998/pexels-photo-725998.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    answer: 'soup',
    description: 'Creamy tomato soup with herbs'
  },
  {
    imageUrl: 'https://images.pexels.com/photos/4202334/pexels-photo-4202334.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    answer: 'soap',
    description: 'Handmade lavender soap bar'
  },
  {
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    answer: 'soup',
    description: 'Hearty vegetable soup'
  },
  {
    imageUrl: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    answer: 'soap',
    description: 'Natural olive oil soap'
  },
  {
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    answer: 'soup',
    description: 'Pumpkin soup with cream'
  }
];

export function SoupOrSoapGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [userAnswer, setUserAnswer] = useState<'soup' | 'soap' | null>(null);

  const question = questions[currentQuestion];

  const handleAnswer = (answer: 'soup' | 'soap') => {
    incrementTaps();
    setUserAnswer(answer);
    setShowAnswer(true);
    
    if (answer === question.answer) {
      setScore(score + 1);
      playSound('success');
    } else {
      playSound('fail');
    }
  };

  const nextQuestion = () => {
    incrementTaps();
    
    if (currentQuestion + 1 >= questions.length) {
      setGameOver(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
      setUserAnswer(null);
    }
  };

  const resetGame = () => {
    incrementTaps();
    setCurrentQuestion(0);
    setScore(0);
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
          <div className="text-4xl font-bold">
            {score}/{questions.length}
          </div>
          <p className="text-muted-foreground">
            {score === questions.length ? "Perfect! You're a soup/soap expert!" :
             score >= questions.length / 2 ? "Not bad! You can tell food from hygiene products." :
             "Maybe stick to clearly labeled items..."}
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
          <CardTitle>Is It Soup or Soap?</CardTitle>
          <Badge>
            {currentQuestion + 1}/{questions.length}
          </Badge>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">Score: {score}</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <img
            src={question.imageUrl}
            alt="Mysterious substance"
            className="w-full h-64 object-cover rounded-lg filter blur-sm hover:blur-none transition-all duration-300"
          />
          <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
            <div className="text-white text-lg font-bold bg-black/50 px-3 py-1 rounded">
              🤔 What is this?
            </div>
          </div>
        </div>

        {!showAnswer ? (
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleAnswer('soup')}
              className="h-16 text-lg"
              variant="outline"
            >
              🍲 Soup
            </Button>
            <Button
              onClick={() => handleAnswer('soap')}
              className="h-16 text-lg"
              variant="outline"
            >
              🧼 Soap
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`text-center p-4 rounded-lg ${
              userAnswer === question.answer ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
            }`}>
              <div className="text-2xl mb-2">
                {userAnswer === question.answer ? '✅ Correct!' : '❌ Wrong!'}
              </div>
              <div className="font-semibold">
                It's {question.answer}!
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {question.description}
              </div>
            </div>
            <Button onClick={nextQuestion} className="w-full">
              {currentQuestion + 1 >= questions.length ? 'Finish Game' : 'Next Question'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}