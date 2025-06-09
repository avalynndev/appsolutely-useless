import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Shuffle, TrendingUp, Star } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: '🎮',
      title: '14 Pointless Games',
      description: 'Carefully crafted to waste your time in the most entertaining ways possible.'
    },
    {
      icon: '📊',
      title: 'Comprehensive Stats',
      description: 'Track every second wasted and tap made. Because data is beautiful, even when useless.'
    },
    {
      icon: '🎵',
      title: 'Sound Effects',
      description: 'Annoying sounds that will make you question your life choices.'
    },
    {
      icon: '📱',
      title: 'Mobile Optimized',
      description: 'Waste time anywhere, anytime, on any device.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <span className="text-6xl animate-bounce">🥔</span>
          <div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              Appsolutely Useless
            </h1>
            <Badge variant="secondary" className="mt-2">Version 0.0.1</Badge>
          </div>
        </div>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Welcome to the world's most comprehensive collection of pointless mini-games. 
          This app exists purely for chaos and fun. Nothing else.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700">
            <Link href="/games" className="flex items-center space-x-2">
              <Gamepad2 className="w-5 h-5" />
              <span>Explore Games</span>
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" asChild>
            <Link href="/random" className="flex items-center space-x-2">
              <Shuffle className="w-5 h-5" />
              <span>Random Game</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-3xl mb-2">{feature.icon}</div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card className="mb-12 bg-gradient-to-r from-purple-100 to-teal-100 border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Why Waste Time Here?</CardTitle>
          <CardDescription>Because life is too short to be productive all the time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">14</div>
              <div className="text-sm text-muted-foreground">Useless Games</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600">∞</div>
              <div className="text-sm text-muted-foreground">Hours to Waste</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-muted-foreground">Pointless Fun</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Categories */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Game Categories</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Badge className="bg-purple-100 text-purple-800 px-4 py-2">🎯 Pointless</Badge>
          <Badge className="bg-orange-100 text-orange-800 px-4 py-2">😤 Annoying</Badge>
          <Badge className="bg-teal-100 text-teal-800 px-4 py-2">🤪 Weird</Badge>
          <Badge className="bg-pink-100 text-pink-800 px-4 py-2">🤔 Confusing</Badge>
        </div>
        
        <div className="text-muted-foreground mb-8">
          <p>Each game is carefully categorized by its level of uselessness.</p>
          <p>Choose your preferred way to waste time!</p>
        </div>

        <Button size="lg" asChild>
          <Link href="/games">
            Start Wasting Time Now
          </Link>
        </Button>
      </div>
    </div>
  );
}