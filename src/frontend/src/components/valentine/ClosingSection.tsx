import { Section } from './Section';
import { useInViewFade } from '../../hooks/useInViewFade';
import { Heart } from 'lucide-react';

export function ClosingSection() {
  const { ref, isInView } = useInViewFade();

  return (
    <Section variant="cream">
      <div 
        ref={ref}
        className={`container mx-auto px-6 max-w-3xl text-center transition-in-view ${isInView ? 'in-view' : 'not-in-view'}`}
      >
        <Heart className="w-16 h-16 mx-auto text-primary fill-primary/20 mb-8" />
        
        <blockquote className="text-2xl md:text-3xl font-serif italic text-foreground mb-8 leading-relaxed">
          "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
        </blockquote>
        
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-px w-16 bg-gold" />
          <Heart className="w-4 h-4 text-gold fill-gold" />
          <div className="h-px w-16 bg-gold" />
        </div>
        
        <p className="text-xl text-muted-foreground mb-2">
          Happy Valentine's Day, my love
        </p>
        
        <p className="script-font text-3xl text-primary mt-6">
          by vkayyy
        </p>
      </div>
    </Section>
  );
}
