import { useState, useRef } from 'react';
import { CardSurface } from './CardSurface';
import { useClipboardCopy } from '../../hooks/useClipboardCopy';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Copy, Check, Edit3, Save, Trash2, Image as ImageIcon } from 'lucide-react';

interface Memory {
  id: string;
  title: string;
  description: string;
  image?: string;
}

interface MemoryCardProps {
  memory: Memory;
  onUpdate: (updates: Partial<Memory>) => void;
  onDelete: () => void;
}

export function MemoryCard({ memory, onUpdate, onDelete }: MemoryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(memory.title);
  const [description, setDescription] = useState(memory.description);
  const { copyToClipboard, status } = useClipboardCopy();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    onUpdate({ title, description });
    setIsEditing(false);
  };

  const handleCopy = () => {
    const text = `${memory.title}\n\n${memory.description}`;
    copyToClipboard(text);
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event.target?.result as string;
            onUpdate({ image: imageUrl });
          };
          reader.readAsDataURL(blob);
        }
      }
    }
  };

  return (
    <CardSurface hover className="group">
      <div
        ref={cardRef}
        onPaste={handlePaste}
        tabIndex={0}
        className="outline-none"
      >
        {/* Image area */}
        {memory.image ? (
          <div className="relative mb-4 rounded-lg overflow-hidden">
            <img
              src={memory.image}
              alt={memory.title}
              className="w-full h-48 object-cover"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onUpdate({ image: undefined })}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="mb-4 h-48 rounded-lg border-2 border-dashed border-border/50 flex items-center justify-center bg-muted/20">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Paste an image here</p>
              <p className="text-xs mt-1">(Ctrl/Cmd + V)</p>
            </div>
          </div>
        )}

        {isEditing ? (
          <div className="space-y-3">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Memory title"
              className="font-semibold"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this special moment..."
              className="min-h-[100px] resize-none"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSave}
                className="flex-1 gap-2"
              >
                <Save className="w-4 h-4" />
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setTitle(memory.title);
                  setDescription(memory.description);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-3 text-foreground">{memory.title}</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">{memory.description}</p>
            
            <div className="flex gap-2 pt-4 border-t border-border/50">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="flex-1 gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="gap-2"
              >
                {status === 'success' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onDelete}
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </CardSurface>
  );
}
