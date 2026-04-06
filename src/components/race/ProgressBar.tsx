'use client';

import { motion } from 'framer-motion';
import { User, Flag } from 'lucide-react';
import { Player } from '@/types';

interface ProgressBarProps {
  player: Player;
  isMe: boolean;
}

export default function ProgressBar({ player, isMe }: ProgressBarProps) {
  return (
    <div className={`w-full glass p-4 px-6 rounded-2xl relative overflow-hidden flex flex-col gap-3 group transition-all duration-500 border-white/5 ${isMe ? 'border-primary/50 border-2' : ''}`}>
      {/* Background progress track */}
      <div className="absolute inset-0 bg-white/5 opacity-40 group-hover:opacity-60 transition-opacity" />

      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isMe ? 'bg-primary text-white' : 'bg-slate-700 text-slate-300'}`}>
            {player.name[0].toUpperCase()}
          </div>
          <span className={`text-sm font-bold ${isMe ? 'text-primary' : 'text-foreground/40'}`}>
            {player.name} {isMe ? '(You)' : ''}
          </span>
        </div>
        <div className="flex gap-6 text-[10px] font-bold text-foreground/40 tracking-wider">
           <div>{player.wpm} WPM</div>
           <div>{player.accuracy}% ACC</div>
        </div>
      </div>

      <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${player.progress * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`absolute inset-y-0 left-0 h-full rounded-full ${isMe ? 'bg-primary shadow-[0_0_15px_rgba(0,74,172,0.6)]' : 'bg-white/40'}`}
        />
        
        {/* Animated indicator at current position */}
        <motion.div 
            style={{ left: `${player.progress * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 flex items-center justify-center pointer-events-none z-20`}
        >
            <div className={`w-2 h-2 rounded-full ${isMe ? 'bg-white shadow-[0_0_10px_white]' : 'bg-white/80'}`} />
        </motion.div>
      </div>
      
      {player.progress === 1 && (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-2 right-2 p-2 bg-green-500/20 rounded-full"
        >
            <Flag size={14} className="text-green-400" />
        </motion.div>
      )}
    </div>
  );
}
