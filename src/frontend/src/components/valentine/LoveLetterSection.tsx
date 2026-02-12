import { useState } from 'react';
import { Section } from './Section';
import { CardSurface } from './CardSurface';
import { useInViewFade } from '../../hooks/useInViewFade';
import { useClipboardCopy } from '../../hooks/useClipboardCopy';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Copy, Check, Edit3, Eye } from 'lucide-react';

export function LoveLetterSection() {
  const { ref, isInView } = useInViewFade();
  const [letter, setLetter] = useState(
    `My Dearest Love,\n\nWords cannot fully capture the depth of what I feel for you, but I'll try. From the moment you entered my life, everything changed. You brought light to my darkest days and made my brightest moments even more beautiful.\n\nYou are my safe haven, my adventure, my home. With you, I've learned what it means to truly love and be loved. Every laugh we share, every quiet moment together, every challenge we face side by side—these are the threads that weave the tapestry of our love.\n\nThank you for being you. Thank you for choosing me, every single day. I promise to cherish you, support you, and love you with all that I am, today and always.\n\nForever yours,\nWith all my love`
  );
  const [isEditing, setIsEditing] = useState(false);
  const { copyToClipboard, status } = useClipboardCopy();

  const handleCopy = () => {
    copyToClipboard(letter);
  };

  return (
    <Section variant="wine">
      <div 
        ref={ref}
        className={`container mx-auto px-6 max-w-4xl transition-in-view ${isInView ? 'in-view' : 'not-in-view'}`}
      >
        <div className="text-center mb-12">
          <h2 className="text-wine-fg mb-4">A Letter From My Heart</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-12 bg-gold" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="h-px w-12 bg-gold" />
          </div>
          <p className="text-wine-fg/80 text-lg mt-4">
            Words written with love, meant only for you
          </p>
        </div>

        <CardSurface>
          <div className="flex justify-end gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="gap-2"
            >
              {isEditing ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {isEditing ? 'Preview' : 'Edit'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
            >
              {status === 'success' ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Letter
                </>
              )}
            </Button>
          </div>

          {isEditing ? (
            <Textarea
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              className="min-h-[400px] prose-valentine font-serif resize-none"
              placeholder="Write your love letter here..."
            />
          ) : (
            <div className="prose-valentine whitespace-pre-wrap font-serif text-foreground">
              {letter}
            </div>
          )}
        </CardSurface>
      </div>
    </Section>
  );
}
