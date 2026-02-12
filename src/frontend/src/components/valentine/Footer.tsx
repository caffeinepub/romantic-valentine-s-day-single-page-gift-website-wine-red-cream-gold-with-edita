import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'valentine-gift';

  return (
    <footer className="bg-primary/5 border-t border-border/50 py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
          <span>© {currentYear}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-primary fill-primary inline-block" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
