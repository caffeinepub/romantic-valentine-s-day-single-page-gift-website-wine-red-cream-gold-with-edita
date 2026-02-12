import { useState } from 'react';
import { Section } from './Section';
import { MemoryCard } from './MemoryCard';
import { useInViewFade } from '../../hooks/useInViewFade';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

interface Memory {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export function MemoriesSection() {
  const { ref, isInView } = useInViewFade();
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: '1',
      title: 'Our First Date',
      description: 'The moment I knew you were special. Your smile lit up the entire room, and I couldn\'t stop thinking about you.',
    },
    {
      id: '2',
      title: 'That Perfect Weekend',
      description: 'Just us, no distractions. We talked for hours, laughed until our sides hurt, and I fell even deeper in love.',
    },
    {
      id: '3',
      title: 'When You Said Yes',
      description: 'The happiest moment of my life. Seeing the joy in your eyes made everything perfect.',
    },
  ]);

  const addMemory = () => {
    const newMemory: Memory = {
      id: Date.now().toString(),
      title: 'New Memory',
      description: 'Click edit to add your special moment...',
    };
    setMemories([...memories, newMemory]);
  };

  const updateMemory = (id: string, updates: Partial<Memory>) => {
    setMemories(memories.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const deleteMemory = (id: string) => {
    setMemories(memories.filter(m => m.id !== id));
  };

  return (
    <Section variant="cream">
      <div 
        ref={ref}
        className={`container mx-auto px-6 max-w-6xl transition-in-view ${isInView ? 'in-view' : 'not-in-view'}`}
      >
        <div className="text-center mb-12">
          <h2 className="text-cream-fg mb-4">Our Beautiful Memories</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-12 bg-gold" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="h-px w-12 bg-gold" />
          </div>
          <p className="text-muted-foreground text-lg mt-4">
            Every moment with you is a treasure I hold close to my heart
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {memories.map((memory) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              onUpdate={(updates) => updateMemory(memory.id, updates)}
              onDelete={() => deleteMemory(memory.id)}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={addMemory}
            variant="outline"
            className="gap-2 border-gold text-gold hover:bg-gold/10"
          >
            <Plus className="w-4 h-4" />
            Add Another Memory
          </Button>
        </div>
      </div>
    </Section>
  );
}
