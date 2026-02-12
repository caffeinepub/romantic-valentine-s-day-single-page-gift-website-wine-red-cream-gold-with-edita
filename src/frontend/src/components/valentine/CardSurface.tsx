import { ReactNode } from 'react';

interface CardSurfaceProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function CardSurface({ children, className = '', hover = false }: CardSurfaceProps) {
  return (
    <div className={`card-surface p-6 md:p-8 ${hover ? 'hover-lift' : ''} ${className}`}>
      {children}
    </div>
  );
}
