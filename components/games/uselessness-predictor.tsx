'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Sparkles, RotateCcw } from 'lucide-react';
import { playSound } from '@/lib/sounds';
import { incrementTaps } from '@/lib/storage';

interface UselessnessResult {
  score: number;
  category: string;
  explanation: string;
  recommendation: string;
  emoji: string;
}

const uselessnessCategories = [
  {
    min: 0, max: 20,
    category: 'Surprisingly Useful',
    emoji: '✨',
    explanations: [
      'This actually serves a purpose in society.',
      'Congratulations, you found something functional!',
      'This has genuine utility and value.',
      'Shockingly practical and beneficial.'
    ],
    recommendations: [
      'Keep doing this - it\'s actually helpful!',
      'Share this wisdom with others.',
      'You\'ve discovered something worthwhile.',
      'This deserves more recognition.'
    ]
  },
  {
    min: 21, max: 40,
    category: 'Mildly Pointless',
    emoji: '🤷',
    explanations: [
      'It has some merit, but questionable value.',
      'Borderline useful with hints of futility.',
      'Could be worse, could be better.',
      'Exists in the gray area of purpose.'
    ],
    recommendations: [
      'Maybe find a more productive hobby.',
      'Consider upgrading to something useful.',
      'You\'re on the fence of meaninglessness.',
      'Add some purpose to spice things up.'
    ]
  },
  {
    min: 41, max: 60,
    category: 'Moderately Useless',
    emoji: '🙄',
    explanations: [
      'This serves no real purpose but isn\'t harmful.',
      'Peak mediocrity in the uselessness spectrum.',
      'Perfectly balanced between pointless and meaningless.',
      'The Switzerland of useless activities.'
    ],
    recommendations: [
      'Embrace the meaninglessness!',
      'You\'re achieving optimal uselessness.',
      'Consider making it even more pointless.',
      'This is adequately purposeless.'
    ]
  },
  {
    min: 61, max: 80,
    category: 'Highly Useless',
    emoji: '🤪',
    explanations: [
      'This is impressively pointless and time-wasting.',
      'You\'ve mastered the art of meaningless activity.',
      'This contributes nothing to human progress.',
      'Expertly crafted uselessness with style.'
    ],
    recommendations: [
      'Teach others your useless ways!',
      'You\'re a professional time waster.',
      'Consider monetizing this uselessness.',
      'This level of pointlessness is admirable.'
    ]
  },
  {
    min: 81, max: 100,
    category: 'Transcendently Useless',
    emoji: '🌟',
    explanations: [
      'This has achieved legendary levels of pointlessness.',
      'You\'ve transcended normal uselessness into art.',
      'This is so useless it becomes meaningful again.',
      'Peak human achievement in meaningless endeavors.'
    ],
    recommendations: [
      'You are now a master of uselessness!',
      'This deserves a Nobel Prize in Pointlessness.',
      'Teach a masterclass in meaninglessness.',
      'You\'ve broken the uselessness scale!'
    ]
  }
];

export function UselessnessPredictorGame() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<UselessnessResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisCount, setAnalysisCount] = useState(0);

  const getRandomElement = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const analyzeUselessness = () => {
    if (!input.trim()) return;
    
    incrementTaps();
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      // Generate "scientific" uselessness score
      let score = Math.random() * 100;
      
      // Add some bias based on input characteristics
      const inputLower = input.toLowerCase();
      
      // Certain words increase uselessness
      if (inputLower.includes('tiktok') || inputLower.includes('social media')) score += 20;
      if (inputLower.includes('game') || inputLower.includes('app')) score += 15;
      if (inputLower.includes('work') || inputLower.includes('study')) score -= 30;
      if (inputLower.includes('exercise') || inputLower.includes('health')) score -= 25;
      if (inputLower.includes('meme') || inputLower.includes('funny')) score += 25;
      if (inputLower.includes('productive') || inputLower.includes('useful')) score -= 40;
      
      // Clamp score between 0 and 100
      score = Math.max(0, Math.min(100, score));
      
      // Find appropriate category
      const category = uselessnessCategories.find(cat => 
        score >= cat.min && score <= cat.max
      ) || uselessnessCategories[2];
      
      const newResult: UselessnessResult = {
        score: Math.round(score),
        category: category.category,
        explanation: getRandomElement(category.explanations),
        recommendation: getRandomElement(category.recommendations),
        emoji: category.emoji
      };
      
      setResult(newResult);
      setAnalysisCount(prev => prev + 1);
      setIsAnalyzing(false);
      playSound('success');
    }, 2000);
  };

  const reset = () => {
    incrementTaps();
    setInput('');
    setResult(null);
  };

  const getScoreColor = (score: number) => {
    if (score < 20) return 'from-green-400 to-green-600';
    if (score < 40) return 'from-yellow-400 to-yellow-600';
    if (score < 60) return 'from-orange-400 to-orange-600';
    if (score < 80) return 'from-red-400 to-red-600';
    return 'from-purple-400 to-purple-600';
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>🤖 AI Predicts Uselessness</CardTitle>
        <p className="text-sm text-muted-foreground">
          Our advanced AI will scientifically determine how useless anything is
        </p>
        {analysisCount > 0 && (
          <div className="text-sm">
            Analyses Performed: <span className="font-bold">{analysisCount}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {!result && !isAnalyzing ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-6xl mb-4">🤖</div>
              <div className="text-lg mb-4">What should I analyze?</div>
            </div>
            
            <div className="space-y-3">
              <Input
                placeholder="Enter anything... (e.g., 'watching TikTok', 'my job', 'this app')"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && analyzeUselessness()}
                className="text-center"
              />
              
              <Button
                onClick={analyzeUselessness}
                disabled={!input.trim()}
                className="w-full flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Analyze Uselessness</span>
              </Button>
            </div>
            
            {/* Example suggestions */}
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Try these examples:</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {['watching Netflix', 'social media', 'this website', 'my existence'].map((example) => (
                  <Button
                    key={example}
                    variant="outline"
                    size="sm"
                    onClick={() => setInput(example)}
                    className="text-xs"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : isAnalyzing ? (
          <div className="text-center space-y-4">
            <div className="text-6xl animate-spin">🤖</div>
            <div className="space-y-2">
              <div className="text-lg font-semibold">Analyzing...</div>
              <div className="text-sm text-muted-foreground">
                "{input}"
              </div>
              <Progress value={66} className="w-full" />
              <div className="text-xs text-muted-foreground">
                Running advanced uselessness algorithms...
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Results */}
            <div className="text-center space-y-3">
              <div className="text-6xl">{result!.emoji}</div>
              <div className="text-lg font-semibold">Analysis Complete!</div>
              <div className="text-sm text-muted-foreground">
                "{input}"
              </div>
            </div>

            {/* Uselessness Score */}
            <div className="space-y-3">
              <div className="text-center">
                <div className={`text-4xl font-bold bg-gradient-to-r ${getScoreColor(result!.score)} bg-clip-text text-transparent`}>
                  {result!.score}%
                </div>
                <div className="text-sm text-muted-foreground">Uselessness Score</div>
              </div>
              
              <Progress value={result!.score} className="h-3" />
              
              <div className="text-center">
                <div className="font-semibold text-lg">{result!.category}</div>
              </div>
            </div>

            {/* Explanation */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
              <div className="text-sm font-medium mb-2">🧠 AI Analysis:</div>
              <div className="text-sm mb-3">{result!.explanation}</div>
              <div className="text-sm font-medium mb-1">💡 Recommendation:</div>
              <div className="text-sm italic">{result!.recommendation}</div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={reset}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>New Analysis</span>
              </Button>
              <Button
                onClick={() => setInput('')}
                className="flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Analyze More</span>
              </Button>
            </div>
          </div>
        )}

        {/* Fun Stats */}
        {analysisCount > 0 && (
          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">
              {analysisCount === 1 && "Your first uselessness analysis! The AI is learning your patterns."}
              {analysisCount > 1 && analysisCount < 5 && "The AI is building a profile of your useless interests."}
              {analysisCount >= 5 && analysisCount < 10 && "You're becoming a uselessness analysis expert!"}
              {analysisCount >= 10 && "The AI has determined you enjoy analyzing useless things. Meta!"}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>⚠️ Results are 100% scientifically accurate*</p>
          <p>*Not actually scientific or accurate</p>
          <p>🤖 AI powered by advanced randomness algorithms</p>
        </div>
      </CardContent>
    </Card>
  );
}