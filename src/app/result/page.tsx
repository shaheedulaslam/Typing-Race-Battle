'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Share2, RefreshCw, Trophy, Target, Zap, Clock, Home, Award } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { Player } from '@/types';

export default function ResultPage() {
  const router = useRouter();
  const { me, room } = useGameStore();

  if (!me || !room) {
    if (typeof window !== 'undefined') {
        router.push('/lobby');
    }
    return null;
  }

  // Determine rank
  const sortedPlayers = [...room.players].sort((a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy);
  const myRank = sortedPlayers.findIndex(p => p.id === me.id) + 1;

  const handlePlayAgain = () => {
    router.push('/lobby');
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-8 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[200px]" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl glass rounded-[3rem] p-16 relative z-10 flex flex-col items-center text-center shadow-2xl border-white/5"
      >
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className={`w-32 h-32 rounded-full flex items-center justify-center mb-10 shadow-2xl ${myRank === 1 ? 'bg-yellow-400 text-black shadow-yellow-400/20' : 'bg-primary text-white shadow-primary/20'}`}
        >
            <Trophy size={60} />
        </motion.div>
        
        <h2 className="text-sm font-black uppercase tracking-[0.5em] text-foreground/40 mb-4">Race Results</h2>
        <h3 className="text-6xl font-black mb-12 flex gap-4 items-center">
            {myRank === 1 ? 'VICTORY' : 'GG! GOOD RACE'} <span className="text-primary font-serif">#</span>{myRank}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-16">
            <div className="glass p-8 rounded-3xl border-white/5 group translate-y-0 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Zap size={24} />
                </div>
                <div className="text-5xl font-black mb-2">{me.wpm}</div>
                <div className="text-xs font-bold text-foreground/40 uppercase tracking-widest">WPM SPEED</div>
            </div>
            <div className="glass p-8 rounded-3xl border-white/5 group translate-y-0 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-green-400/20 rounded-2xl flex items-center justify-center text-green-400 mb-6 group-hover:bg-green-400 group-hover:text-white transition-colors">
                    <Target size={24} />
                </div>
                <div className="text-5xl font-black mb-2">{me.accuracy}%</div>
                <div className="text-xs font-bold text-foreground/40 uppercase tracking-widest">ACCURACY</div>
            </div>
            <div className="glass p-8 rounded-3xl border-white/5 group translate-y-0 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                    <Award size={24} />
                </div>
                <div className="text-5xl font-black mb-2">980</div>
                <div className="text-xs font-bold text-foreground/40 uppercase tracking-widest">XP EARNED</div>
            </div>
        </div>

        <div className="w-full max-w-md space-y-6">
            <div className="flex gap-4">
                <button 
                    onClick={handlePlayAgain}
                    className="flex-1 py-5 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-primary/40 active:scale-95 transition-all text-xl"
                >
                    <RefreshCw size={24} /> Practice More
                </button>
                <button 
                    className="w-20 bg-glass text-white rounded-2xl font-bold flex items-center justify-center border border-white/5 hover:bg-white/10 active:scale-95 transition-all"
                >
                    <Share2 size={24} />
                </button>
            </div>
            <button 
                onClick={() => router.push('/')}
                className="w-full py-4 text-foreground/40 hover:text-white transition-colors flex items-center justify-center gap-2 font-medium"
            >
                <Home size={18} /> Home Sweet Home
            </button>
        </div>

        <div className="mt-16 pt-12 border-t border-white/5 w-full max-w-4xl opacity-50">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8">Match Leaderboard</h4>
            <div className="space-y-3">
                {sortedPlayers.map((player, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${i === 0 ? 'bg-yellow-400 text-black' : 'bg-slate-800'}`}>
                                {i + 1}
                            </div>
                            <span className="font-bold">{player.name}</span>
                        </div>
                        <div className="font-mono text-sm opacity-60">
                           {player.wpm} WPM • {player.accuracy}% ACC
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </motion.div>
    </div>
  );
}
