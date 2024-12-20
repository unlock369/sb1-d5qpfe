import React, { useState, KeyboardEvent } from 'react';
import { Tag as TagIcon, X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagInput({ tags, onChange }: TagInputProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        onChange([...tags, input.trim()]);
      }
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <TagIcon className="h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add tags (press Enter)"
          className="flex-1 rounded-lg bg-black/50 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-400"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="rounded-full p-0.5 hover:bg-blue-500/20"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}