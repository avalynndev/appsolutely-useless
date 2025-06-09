'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { playSound } from '@/lib/sounds';
import { incrementTaps } from '@/lib/storage';

const brutallyhonestFortunes = [
  "Give up.",
  "This site is your peak.",
  "Your potential is limited.",
  "Lower your expectations.",
  "You're exactly where you belong.",
  "Stop trying so hard.",
  "Mediocrity suits you.",
  "Your dreams are unrealistic.",
  "You peaked in high school.",
  "This is as good as it gets.",
  "You're not the main character.",
  "Your horoscope is lying to you.",
  "That 'great idea' isn't that great.",
  "You're procrastinating right now.",
  "Your phone battery will die at the worst moment.",
  "You'll never finish that project.",
  "Your WiFi will fail during important calls.",
  "You're overthinking this fortune.",
  "Your socks will always go missing.",
  "You'll forget why you opened the fridge.",
  "Your favorite show will get canceled.",
  "You'll always be 5 minutes late.",
  "Your earphones will tangle themselves.",
  "You'll never find the perfect playlist.",
  "Your food will always be too hot or too cold.",
  "You'll step on a LEGO barefoot.",
  "Your phone will update at the worst time.",
  "You'll always choose the slowest checkout line.",
  "Your favorite restaurant will close down.",
  "You'll never remember where you put your keys.",
  "Your autocorrect will betray you.",
  "You'll always get the broken shopping cart.",
  "Your favorite song will get overplayed.",
  "You'll never win an argument with your GPS.",
  "Your ice cream will fall off the cone.",
  "You'll always sit behind the tall person at movies.",
  "Your printer will jam when you're in a hurry.",
  "You'll never find matching Tupperware lids.",
  "Your favorite meme will become cringe.",
  "You'll always forget what you came upstairs for.",
  "Your delivery will arrive when you're in the shower.",
  "You'll never untangle Christmas lights easily.",
  "Your favorite parking spot will always be taken.",
  "You'll always get the squeaky shopping cart wheel.",
  "Your phone will die right before you need directions.",
  "You'll never remember if you locked the door.",
  "Your favorite TV character will be killed off.",
  "You'll always get the middle seat on flights.",
  "Your coffee will always be either too weak or too strong.",
  "You'll never find the end of the tape roll.",
];

export function FortuneCookieGame() {
  const [currentFortune, setCurrentFortune] = useState<string | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [fortuneCount, setFortuneCount] = useState(0);
  const [fortuneHistory, setFortuneHistory] = useState<string[]>([]);

  const openCookie = () => {
    incrementTaps();
    setIsOpening(true);
    
    setTimeout(() => {
      const randomFortune = brutallyhonestFortunes[Math.floor(Math.random() * brutallyhonestFortunes.length)];
      setCurrentFortune(randomFortune);
      setFortuneCount(prev => prev + 1);
      setFortuneHistory(prev => [randomFortune, ...prev.slice(0, 4)]);
      setIsOpening(false);
      playSound('success');
    }, 1500);
  };

  const getNewCookie = () => {
    incrementTaps();
    setCurrentFortune(null);
  };

  const reset = () => {
    incrementTaps();
    setCurrentFortune(null);
    setFortuneCount(0);
    setFortuneHistory([]);
  };

  const getEncouragementLevel = () => {
    if (fortuneCount === 0) return { level: 'Hopeful', emoji: '😊', description: 'Still believes in positive outcomes' };
    if (fortuneCount < 3) return { level: 'Slightly Concerned', emoji: '😐', description: 'Starting to question life choices' };
    if (fortuneCount < 6) return { level: 'Mildly Depressed', emoji: '😔', description: 'Reality is setting in' };
    if (fortuneCount < 10) return { level: 'Existentially Confused', emoji: '😵‍💫', description: 'Questioning the meaning of everything' };
    if (fortuneCount < 15) return { level: 'Embracing Nihilism', emoji: '💀', description: 'Nothing matters anyway' };
    return { level: 'Enlightened Pessimist', emoji: '🧘‍♂️', description: 'Found peace in brutal honesty' };
  };

  const encouragementLevel = getEncouragementLevel();

  const getMotivationalMessage = () => {
    if (fortuneCount === 0) return "Ready to receive some life-changing wisdom?";
    if (fortuneCount === 1) return "Well, that was... honest. Want another dose of reality?";
    if (fortuneCount < 5) return "These cookies don't believe in sugar-coating anything.";
    if (fortuneCount < 10) return "You keep coming back for more brutal honesty. Respect.";
    return "You've achieved mastery in accepting harsh truths. Congratulations?";
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>🥠 Fortune Cookie That Tells You to Quit</CardTitle>
        <p className="text-sm text-muted-foreground">
          Get brutally honest life advice from our wisdom cookies
        </p>
        {fortuneCount > 0 && (
          <div className="text-sm">
            Fortunes Received: <span className="font-bold">{fortuneCount}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {!currentFortune && !isOpening ? (
          <div className="text-center space-y-4">
            <div className="text-8xl animate-bounce">🥠</div>
            <div className="text-lg">Crack open your fortune!</div>
            <div className="text-sm text-muted-foreground">
              {getMotivationalMessage()}
            </div>
            <Button onClick={openCookie} size="lg" className="w-full">
              Open Fortune Cookie
            </Button>
          </div>
        ) : isOpening ? (
          <div className="text-center space-y-4">
            <div className="text-8xl animate-pulse">💥</div>
            <div className="text-lg">Cracking open wisdom...</div>
            <div className="text-sm text-muted-foreground">
              Preparing brutal honesty...
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Fortune Display */}
            <div className="text-center space-y-3">
              <div className="text-6xl">📜</div>
              <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-lg">
                <div className="text-lg font-medium italic text-center">
                  "{currentFortune}"
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Your brutally honest fortune
              </div>
            </div>

            {/* Reaction */}
            <div className="text-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg">
              <div className="text-sm">
                {currentFortune === "Give up." && "Well, that's direct."}
                {currentFortune === "This site is your peak." && "Ouch. But probably accurate."}
                {currentFortune === "Lower your expectations." && "Solid life advice, honestly."}
                {currentFortune === "You're procrastinating right now." && "Called out by a cookie. New low."}
                {currentFortune === "Your dreams are unrealistic." && "The cookie knows you too well."}
                {!["Give up.", "This site is your peak.", "Lower your expectations.", "You're procrastinating right now.", "Your dreams are unrealistic."].includes(currentFortune!) && 
                 "The cookie has spoken. Harsh but fair."}
              </div>
            </div>

            <Button onClick={getNewCookie} className="w-full">
              Get Another Dose of Reality
            </Button>
          </div>
        )}

        {/* Encouragement Level */}
        {fortuneCount > 0 && (
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
            <div className="text-2xl mb-2">{encouragementLevel.emoji}</div>
            <div className="font-semibold">{encouragementLevel.level}</div>
            <div className="text-sm text-muted-foreground">
              {encouragementLevel.description}
            </div>
          </div>
        )}

        {/* Fortune History */}
        {fortuneHistory.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">📚 Recent Wisdom:</div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {fortuneHistory.map((fortune, index) => (
                <div
                  key={index}
                  className={`text-xs p-2 rounded ${
                    index === 0 ? 'bg-orange-100 border border-orange-300' : 'bg-gray-100'
                  }`}
                >
                  "{fortune}"
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {fortuneCount > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">🏆 Harsh Truth Achievements:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {fortuneCount >= 1 && (
                <div className="p-2 bg-orange-100 border border-orange-300 rounded text-center">
                  Reality Check
                </div>
              )}
              {fortuneCount >= 5 && (
                <div className="p-2 bg-red-100 border border-red-300 rounded text-center">
                  Glutton for Punishment
                </div>
              )}
              {fortuneCount >= 10 && (
                <div className="p-2 bg-purple-100 border border-purple-300 rounded text-center">
                  Masochist
                </div>
              )}
              {fortuneCount >= 20 && (
                <div className="p-2 bg-gray-100 border border-gray-300 rounded text-center">
                  Enlightened
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reset Button */}
        {fortuneCount > 0 && (
          <Button
            variant="outline"
            onClick={reset}
            className="w-full"
          >
            🔄 Start Fresh (Forget All Wisdom)
          </Button>
        )}

        {/* Cookie Facts */}
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>🥠 These cookies contain 0% sugar, 100% harsh reality</p>
          <p>📊 Accuracy rate: Uncomfortably high</p>
          <p>⚠️ Side effects may include existential crisis</p>
        </div>
      </CardContent>
    </Card>
  );
}