import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  variant?: 'cream' | 'wine';
  className?: string;
}

export function Section({ children, variant = 'cream', className = '' }: SectionProps) {
  const bgClass = variant === 'wine' ? 'gradient-wine text-wine-fg' : 'gradient-cream text-cream-fg';
  const patternClass = variant === 'wine' ? 'pattern-wine' : 'pattern-cream';

  return (
    <section className={`relative py-20 md:py-32 ${bgClass} ${className}`}>
      {/* Pattern overlay */}
      <div className={`absolute inset-0 ${patternClass} pointer-events-none`} />
      
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
