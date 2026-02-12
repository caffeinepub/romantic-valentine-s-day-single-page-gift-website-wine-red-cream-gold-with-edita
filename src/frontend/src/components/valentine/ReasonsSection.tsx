import { useState } from 'react';
import { Section } from './Section';
import { CardSurface } from './CardSurface';
import { useInViewFade } from '../../hooks/useInViewFade';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Heart, Sparkles, Star, Smile, Sun, Moon, Edit3, Eye, Plus, Trash2, Save, X } from 'lucide-react';

interface Reason {
  id: string;
  icon: typeof Heart;
  text: string;
}

const iconOptions = [Heart, Sparkles, Star, Smile, Sun, Moon];

const initialReasons: Reason[] = [
  {
    id: '1',
    icon: Heart,
    text: 'Your kindness touches everyone around you, but especially me. You make the world a better place just by being in it.',
  },
  {
    id: '2',
    icon: Sparkles,
    text: 'The way you light up when you talk about your passions inspires me every single day.',
  },
  {
    id: '3',
    icon: Star,
    text: 'You believe in me even when I doubt myself. Your faith gives me strength.',
  },
  {
    id: '4',
    icon: Smile,
    text: 'Your laugh is my favorite sound in the world. It makes everything better.',
  },
  {
    id: '5',
    icon: Sun,
    text: 'You bring warmth and joy into my life, turning ordinary moments into extraordinary memories.',
  },
  {
    id: '6',
    icon: Moon,
    text: 'Even in the quiet, peaceful moments, just being near you feels like home.',
  },
];

export function ReasonsSection() {
  const { ref, isInView } = useInViewFade();
  const [reasons, setReasons] = useState<Reason[]>(initialReasons);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleAddReason = () => {
    const newReason: Reason = {
      id: Date.now().toString(),
      icon: iconOptions[reasons.length % iconOptions.length],
      text: 'Add your reason here...',
    };
    setReasons([...reasons, newReason]);
    setEditingId(newReason.id);
    setEditText(newReason.text);
  };

  const handleStartEdit = (reason: Reason) => {
    setEditingId(reason.id);
    setEditText(reason.text);
  };

  const handleSaveEdit = (id: string) => {
    setReasons(reasons.map(r => 
      r.id === id ? { ...r, text: editText } : r
    ));
    setEditingId(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleDeleteReason = (id: string) => {
    setReasons(reasons.filter(r => r.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditText('');
    }
  };

  const handleCycleIcon = (id: string) => {
    setReasons(reasons.map(r => {
      if (r.id === id) {
        const currentIndex = iconOptions.indexOf(r.icon);
        const nextIndex = (currentIndex + 1) % iconOptions.length;
        return { ...r, icon: iconOptions[nextIndex] };
      }
      return r;
    }));
  };

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

        <div className="flex justify-end gap-2 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="gap-2"
          >
            {isEditing ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            {isEditing ? 'Preview' : 'Edit'}
          </Button>
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddReason}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Reason
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            const isEditingThis = editingId === reason.id;
            
            return (
              <CardSurface 
                key={reason.id} 
                hover={!isEditingThis}
                className="flex gap-4 items-start"
              >
                <button
                  onClick={() => isEditing && handleCycleIcon(reason.id)}
                  disabled={!isEditing}
                  className={`flex-shrink-0 w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center ${
                    isEditing ? 'cursor-pointer hover:bg-gold/30 transition-colors' : ''
                  }`}
                  title={isEditing ? 'Click to change icon' : ''}
                >
                  <Icon className="w-6 h-6 text-gold" />
                </button>
                
                <div className="flex-1 min-w-0">
                  {isEditingThis ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Write your reason here..."
                        className="min-h-[100px] resize-none"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(reason.id)}
                          className="gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-foreground leading-relaxed">
                        {reason.text}
                      </p>
                      {isEditing && (
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStartEdit(reason)}
                            className="gap-2"
                          >
                            <Edit3 className="w-3 h-3" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteReason(reason.id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
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
