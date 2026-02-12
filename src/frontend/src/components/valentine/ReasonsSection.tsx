import { Section } from './Section';
import { CardSurface } from './CardSurface';
import { useInViewFade } from '../../hooks/useInViewFade';
import { Heart, Sparkles, Star, Smile, Sun, Moon } from 'lucide-react';

const reasons = [
  {
    icon: Heart,
    text: 'Your kindness touches everyone around you, but especially me. You make the world a better place just by being in it.',
  },
  {
    icon: Sparkles,
    text: 'The way you light up when you talk about your passions inspires me every single day.',
  },
  {
    icon: Star,
    text: 'You believe in me even when I doubt myself. Your faith gives me strength.',
  },
  {
    icon: Smile,
    text: 'Your laugh is my favorite sound in the world. It makes everything better.',
  },
  {
    icon: Sun,
    text: 'You bring warmth and joy into my life, turning ordinary moments into extraordinary memories.',
  },
  {
    icon: Moon,
    text: 'Even in the quiet, peaceful moments, just being near you feels like home.',
  },
];

export function ReasonsSection() {
  const { ref, isInView } = useInViewFade();

  return (
    <Section variant="wine">
      <div 
        ref={ref}
        className={`container mx-auto px-6 max-w-6xl transition-in-view ${isInView ? 'in-view' : 'not-in-view'}`}
      >
        <div className="text-center mb-12">
          <h2 className="text-wine-fg mb-4">Reasons I Love You</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-12 bg-gold" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="h-px w-12 bg-gold" />
          </div>
          <p className="text-wine-fg/80 text-lg mt-4">
            There are countless reasons, but here are just a few...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <CardSurface 
                key={index} 
                hover
                className="flex gap-4 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <p className="text-foreground leading-relaxed flex-1">
                  {reason.text}
                </p>
              </CardSurface>
            );
          })}
        </div>

        {/* Decorative gold icon set reference */}
        <div className="mt-12 flex justify-center gap-8 opacity-30">
          <img 
            src="/assets/generated/valentine-icons-gold.dim_512x512.png" 
            alt="" 
            className="w-12 h-12 object-contain"
            style={{ filter: 'brightness(1.2)' }}
          />
        </div>
      </div>
    </Section>
  );
}
