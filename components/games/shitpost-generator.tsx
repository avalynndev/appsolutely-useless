'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Copy, Share } from 'lucide-react';
import { playSound } from '@/lib/sounds';
import { incrementTaps } from '@/lib/storage';
import { toast } from 'sonner';

const postTemplates = [
  "TIL that {adjective} {noun} {verb} {object} in {location}. Mind = {reaction}.",
  "Unpopular opinion: {adjective} {noun} is {comparison} than {alternative}. Fight me.",
  "When you {action} and your {noun} starts {verb}: {reaction}",
  "POV: You're a {adjective} {noun} trying to {action} in {timeOfDay}",
  "Nobody:\nAbsolutely nobody:\nMe: {randomStatement}",
  "Breaking: Local {person} discovers that {noun} can {verb}. Scientists are {reaction}.",
  "This {noun} really said '{quote}' and thought it was {adjective} 💀",
  "Me: I'm going to be {adjective} today\nAlso me: *{action}*",
  "{adjective} {noun} hits different when you {action} at {timeOfDay}",
  "The {adjective} to {adjective} pipeline is real and it starts with {noun}",
];

const adjectives = [
  'cursed', 'blessed', 'chaotic', 'unhinged', 'crispy', 'soggy', 'forbidden', 'legendary',
  'microscopic', 'cosmic', 'vintage', 'futuristic', 'invisible', 'magical', 'toxic', 'wholesome',
  'savage', 'gentle', 'mysterious', 'obvious', 'premium', 'budget', 'organic', 'artificial'
];

const nouns = [
  'potato', 'banana', 'sock', 'doorknob', 'penguin', 'wifi router', 'rubber duck', 'cactus',
  'toothbrush', 'ceiling fan', 'keyboard', 'microwave', 'pillow', 'stapler', 'lamp', 'sandwich',
  'vampire', 'unicorn', 'robot', 'ninja', 'pirate', 'wizard', 'alien', 'ghost', 'dragon'
];

const verbs = [
  'vibes', 'slaps', 'hits different', 'goes hard', 'is sus', 'is bussin', 'is cap', 'is mid',
  'transcends reality', 'defies physics', 'exists', 'doesn\'t exist', 'screams internally',
  'judges you silently', 'plots revenge', 'achieves enlightenment', 'gets canceled'
];

const objects = [
  'your sleep schedule', 'my sanity', 'the laws of physics', 'your browser history', 'reality itself',
  'my wifi connection', 'the space-time continuum', 'your search history', 'my will to live',
  'the matrix', 'your hopes and dreams', 'the simulation', 'my faith in humanity'
];

const locations = [
  'the metaverse', 'Wendy\'s parking lot', 'your DMs', 'the void', 'Ohio', 'the shadow realm',
  'my kitchen', 'the 4th dimension', 'Walmart at 3am', 'your browser tabs', 'the quantum realm',
  'my recommended feed', 'the backrooms', 'your notifications'
];

const reactions = [
  'blown 🤯', 'shook', 'deceased ☠️', 'crying 😭', 'speechless', 'triggered', 'confused',
  'vibing', 'malding', 'seething', 'coping', 'questioning reality', 'enlightened'
];

const people = [
  'Florida man', 'Karen', 'Chad', 'millennial', 'Gen Z kid', 'boomer', 'influencer',
  'TikToker', 'streamer', 'Discord mod', 'Reddit user', 'Twitter user', 'your cousin'
];

const actions = [
  'touch grass', 'go outside', 'log off', 'delete this', 'seek therapy', 'call your mom',
  'take a shower', 'eat a vegetable', 'read a book', 'exercise', 'meditate', 'sleep'
];

const timesOfDay = [
  '3am', 'Monday morning', 'during a Zoom call', 'while crying', 'in public',
  'at 2pm on a Tuesday', 'during your lunch break', 'right before bed'
];

const quotes = [
  'it\'s giving main character energy', 'periodt', 'we don\'t talk about Bruno', 'slay queen',
  'I understand the assignment', 'tell me you\'re [blank] without telling me', 'this ain\'t it chief',
  'I\'m baby', 'no cap fr fr', 'it\'s the [blank] for me', 'living rent free in my head'
];

const randomStatements = [
  'I wonder if my dog judges my life choices',
  'Why do we park in driveways and drive on parkways?',
  'The real treasure was the anxiety we gained along the way',
  'I\'m not like other girls, I\'m worse',
  'I have the same energy as a Windows 95 computer trying to run Chrome'
];

const comparisons = [
  'more chaotic', 'less cursed', 'more unhinged', 'way more sus', 'significantly more blessed',
  'infinitely better', 'dramatically worse', 'surprisingly similar to', 'basically identical to'
];

const alternatives = [
  'pineapple on pizza', 'your ex', 'a participation trophy', 'cold pizza', 'free wifi',
  'getting rickrolled', 'a Windows update', 'airplane food', 'your YouTube recommendations'
];

export function ShitpostGeneratorGame() {
  const [currentPost, setCurrentPost] = useState('');
  const [generatedCount, setGeneratedCount] = useState(0);

  const getRandomElement = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const generatePost = () => {
    incrementTaps();
    
    const template = getRandomElement(postTemplates);
    
    let post = template
      .replace(/{adjective}/g, () => getRandomElement(adjectives))
      .replace(/{noun}/g, () => getRandomElement(nouns))
      .replace(/{verb}/g, () => getRandomElement(verbs))
      .replace(/{object}/g, () => getRandomElement(objects))
      .replace(/{location}/g, () => getRandomElement(locations))
      .replace(/{reaction}/g, () => getRandomElement(reactions))
      .replace(/{person}/g, () => getRandomElement(people))
      .replace(/{action}/g, () => getRandomElement(actions))
      .replace(/{timeOfDay}/g, () => getRandomElement(timesOfDay))
      .replace(/{quote}/g, () => getRandomElement(quotes))
      .replace(/{randomStatement}/g, () => getRandomElement(randomStatements))
      .replace(/{comparison}/g, () => getRandomElement(comparisons))
      .replace(/{alternative}/g, () => getRandomElement(alternatives));
    
    setCurrentPost(post);
    setGeneratedCount(prev => prev + 1);
    playSound('success');
  };

  const copyPost = async () => {
    incrementTaps();
    
    if (!currentPost) return;
    
    try {
      await navigator.clipboard.writeText(currentPost);
      toast.success('Shitpost copied to clipboard!');
      playSound('click');
    } catch (error) {
      toast.error('Failed to copy. Your shitpost is too powerful!');
    }
  };

  const sharePost = () => {
    incrementTaps();
    
    if (!currentPost) return;
    
    if (navigator.share) {
      navigator.share({
        title: 'Check out this shitpost!',
        text: currentPost,
      });
    } else {
      copyPost();
    }
  };

  const getQualityRating = () => {
    if (!currentPost) return null;
    
    const ratings = [
      { level: 'Trash Tier', emoji: '🗑️', description: 'So bad it\'s good' },
      { level: 'Cursed', emoji: '😈', description: 'Questionable content' },
      { level: 'Chaotic Neutral', emoji: '🤪', description: 'Pure randomness' },
      { level: 'Unhinged', emoji: '💀', description: 'Concerning but funny' },
      { level: 'Peak Shitpost', emoji: '👑', description: 'Absolute masterpiece' },
      { level: 'Ascended', emoji: '✨', description: 'Transcends human comprehension' }
    ];
    
    return ratings[Math.floor(Math.random() * ratings.length)];
  };

  const qualityRating = getQualityRating();

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>💩 Daily Shitpost Generator</CardTitle>
        <p className="text-sm text-muted-foreground">
          Generate the most random, useless posts imaginable
        </p>
        {generatedCount > 0 && (
          <div className="text-sm">
            Posts Generated: <span className="font-bold">{generatedCount}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {!currentPost ? (
          <div className="text-center space-y-4">
            <div className="text-6xl">💩</div>
            <div className="text-lg">Ready to create some premium content?</div>
            <Button onClick={generatePost} size="lg" className="w-full">
              Generate Shitpost
            </Button>
          </div>
        ) : (
          <>
            {/* Generated Post */}
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg">
              <div className="text-sm font-mono leading-relaxed">
                {currentPost}
              </div>
            </div>

            {/* Quality Rating */}
            {qualityRating && (
              <div className="text-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                <div className="text-lg">
                  <span className="text-2xl mr-2">{qualityRating.emoji}</span>
                  <span className="font-semibold">{qualityRating.level}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {qualityRating.description}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={copyPost}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </Button>
              <Button
                onClick={sharePost}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Share className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>

            {/* Generate New */}
            <Button
              onClick={generatePost}
              className="w-full flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate Another Masterpiece</span>
            </Button>
          </>
        )}

        {/* Stats */}
        {generatedCount > 0 && (
          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">
              {generatedCount === 1 && "Your first shitpost! Many more to come."}
              {generatedCount > 1 && generatedCount < 5 && "You're getting the hang of this!"}
              {generatedCount >= 5 && generatedCount < 10 && "Shitpost machine activated!"}
              {generatedCount >= 10 && generatedCount < 25 && "Professional shitposter status achieved!"}
              {generatedCount >= 25 && "You are now a certified Shitpost Master! 🏆"}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>⚠️ Warning: May cause uncontrollable laughter</p>
          <p>📱 Perfect for social media confusion</p>
          <p>🧠 No brain cells were harmed in the making</p>
        </div>
      </CardContent>
    </Card>
  );
}