'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypingAreaProps {
  text: string;
  onProgress: (progress: number, wpm: number, accuracy: number) => void;
  onFinish: (wpm: number, accuracy: number) => void;
  disabled?: boolean;
}

export default function TypingArea({ text, onProgress, onFinish, disabled }: TypingAreaProps) {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
        inputRef.current.focus();
    }
  }, [disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    const value = e.target.value;
    if (!startTime && value.length > 0) {
        setStartTime(Date.now());
    }

    // Only allow typing that matches the text so far
    if (value.length > text.length) return;

    // Check for errors
    const lastChar = value[value.length - 1];
    const expectedChar = text[value.length - 1];
    if (lastChar !== expectedChar) {
        setErrors(prev => prev + 1);
        return; // Don't allow incorrect typing to be entered in the input
    }

    setInput(value);

    // Calculate stats
    const progress = value.length / text.length;
    const timeElapsedInMinutes = (Date.now() - (startTime || Date.now())) / 60000;
    const wordsTyped = value.trim().split(/\s+/).filter(Boolean).length;
    const wpm = timeElapsedInMinutes > 0 ? Math.round(wordsTyped / timeElapsedInMinutes) : 0;
    const accuracy = value.length > 0 ? Math.round(((value.length - errors) / value.length) * 100) : 100;

    onProgress(progress, wpm, accuracy);

    if (value === text) {
        onFinish(wpm, accuracy);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10">
      <div className="glass p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
        {/* Background glow for typing area */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[80px] pointer-events-none" />

        <div className="text-2xl leading-relaxed font-medium mb-10 select-none relative z-10 font-mono tracking-wide">
          {text.split('').map((char, index) => {
             let color = 'text-white/20';
             if (index < input.length) {
                color = 'text-green-400';
             } else if (index === input.length) {
                color = 'text-primary animate-pulse border-b-2 border-primary';
             }
             return (
               <span key={index} className={`${color} transition-colors duration-200`}>
                 {char}
               </span>
             );
          })}
        </div>
        
        <input 
          ref={inputRef}
          type="text" 
          value={input}
          onChange={handleChange}
          disabled={disabled}
          className="opacity-0 absolute inset-0 cursor-default"
          autoFocus
        />
        
        <div className="flex justify-between items-center text-sm font-bold text-foreground/40 mt-6 relative z-10">
            <div className="flex gap-4">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400" /> Correct</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary" /> Current</span>
            </div>
            <div>{input.length} / {text.length} Characters</div>
        </div>
      </div>
    </div>
  );
}
