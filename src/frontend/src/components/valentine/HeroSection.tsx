import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-cream">
      {/* Pattern overlay */}
      <div className="absolute inset-0 pattern-cream pointer-events-none" />
      
      {/* Floating hearts decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-[10%] w-8 h-8 text-gold opacity-20 animate-float" style={{ animationDelay: '0s' }} />
        <Heart className="absolute top-40 right-[15%] w-6 h-6 text-gold opacity-15 animate-float" style={{ animationDelay: '1s' }} />
        <Heart className="absolute bottom-32 left-[20%] w-10 h-10 text-gold opacity-10 animate-float" style={{ animationDelay: '2s' }} />
        <Heart className="absolute bottom-20 right-[25%] w-7 h-7 text-gold opacity-20 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-in-view ${isVisible ? 'in-view' : 'not-in-view'}`}>
        <div className="mb-8">
          <Heart className="w-16 h-16 mx-auto text-primary fill-primary/20 mb-6" />
        </div>
        
        <h1 className="script-font text-primary mb-6">
          To the Love of My Life
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
          Every moment with you is a treasure, every memory a gift. This is my heart, laid bare for you.
        </p>
        
        <div className="mt-12 flex items-center justify-center gap-2">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
          <Heart className="w-4 h-4 text-gold fill-gold" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
        </div>
      </div>
    </section>
  );
}
