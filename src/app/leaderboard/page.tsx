'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Rocket, Users, Target, Search, ArrowLeft, Globe, Zap, History } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getLeaderboard } from '@/lib/supabase';

// Mock data if Supabase is not configured
const mockLeaderboard = [
  { id: '1', name: 'Zippy-Bot ⚡', wpm: 124, accuracy: 99, wins: 45, rank: 1, avatar: '🚀' },
  { id: '2', name: 'Ghost Rider', wpm: 118, accuracy: 97, wins: 38, rank: 2, avatar: '👻' },
  { id: '3', name: 'Typer Prime', wpm: 112, accuracy: 96, wins: 32, rank: 3, avatar: '🏆' },
  { id: '4', name: 'Storm King', wpm: 108, accuracy: 95, wins: 28, rank: 4, avatar: '👑' },
  { id: '5', name: 'Cyber Ninja', wpm: 104, accuracy: 94, wins: 24, rank: 5, avatar: '🥷' },
  { id: '6', name: 'Sonic Scribe', wpm: 98, accuracy: 93, wins: 19, rank: 6, avatar: '🌀' },
  { id: '7', name: 'Elite Master', wpm: 94, accuracy: 92, wins: 15, rank: 7, avatar: '🎖️' },
  { id: '8', name: 'Fast Fingers', wpm: 88, accuracy: 90, wins: 12, rank: 8, avatar: '✋' },
  { id: '9', name: 'Neon Blazer', wpm: 82, accuracy: 88, wins: 9, rank: 9, avatar: '🔥' },
  { id: '10', name: 'Quiet Rain', wpm: 76, accuracy: 86, wins: 6, rank: 10, avatar: '🌧️' },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'global' | 'friends' | 'history'>('global');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background relative p-8">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full" />

      <header className="max-w-6xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
        <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-6 group text-foreground/40 hover:text-white transition-colors">
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={18} /> Home
            </Link>
            <h1 className="text-5xl font-black mb-2 flex items-center gap-4">
                <Trophy size={48} className="text-yellow-400" /> Champions <span className="text-primary font-serif">Hall</span>
            </h1>
            <p className="text-foreground/40 text-lg font-medium">Be the fastest across the digital realms.</p>
        </div>

        <div className="flex gap-3 bg-glass border border-white/5 p-2 rounded-2xl">
            {[
              { id: 'global', name: 'Global', icon: Globe },
              { id: 'friends', name: 'Friends', icon: Users },
              { id: 'history', name: 'History', icon: History },
            ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-foreground/40 hover:bg-white/5'}`}
                >
                    <tab.icon size={16} /> {tab.name}
                </button>
            ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Top 3 Podiums */}
            <div className="lg:col-span-1 space-y-6">
                <div className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden flex flex-col items-center text-center">
                    <div className="absolute top-0 right-0 p-4 font-black text-8xl opacity-10 pointer-events-none">#1</div>
                    <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-5xl mb-6 shadow-2xl shadow-yellow-400/20 border-4 border-yellow-400/30">
                        🚀
                    </div>
                    <div className="text-xs font-black uppercase tracking-[0.3em] text-yellow-400 mb-2">Grandmaster</div>
                    <h3 className="text-2xl font-black mb-4">Zippy-Bot ⚡</h3>
                    <div className="w-full bg-white/5 p-4 rounded-2xl border border-white/5 grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-[10px] text-foreground/40 uppercase font-black tracking-widest mb-1">Speed</div>
                            <div className="text-xl font-black text-primary">124 <span className="text-[8px] opacity-40">WPM</span></div>
                        </div>
                        <div>
                            <div className="text-[10px] text-foreground/40 uppercase font-black tracking-widest mb-1">Accuracy</div>
                            <div className="text-xl font-black text-green-400">99<span className="text-[10px] opacity-40">%</span></div>
                        </div>
                    </div>
                </div>

                <div className="glass p-8 rounded-[2.5rem] border-white/5 bg-primary/5 flex flex-col items-center justify-center gap-4 group hover:bg-primary/10 transition-colors">
                    <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
                        <Zap size={28} />
                    </div>
                    <h4 className="text-xl font-bold">Ready to Rise?</h4>
                    <p className="text-sm text-foreground/40 text-center leading-relaxed">Join a race now and see if you can break the speed of sound.</p>
                    <button onClick={() => router.push('/lobby')} className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95">
                        Start Racing
                    </button>
                </div>
            </div>

            {/* Leaderboard Table */}
            <div className="lg:col-span-3">
                <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex justify-between items-center">
                        <div className="relative w-full max-w-sm group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search racers..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:outline-none focus:border-primary transition-all text-sm"
                            />
                        </div>
                        <div className="hidden md:flex gap-6 text-[10px] font-black uppercase tracking-widest text-foreground/40">
                            <div>Win Rate</div>
                            <div>Avg Accuracy</div>
                            <div className="text-primary">Avg WPM</div>
                        </div>
                    </div>

                    <div className="p-4 space-y-3">
                        <AnimatePresence>
                            {mockLeaderboard.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((player, i) => (
                                <motion.div 
                                    key={player.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/0 hover:border-white/10 group transition-all"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${player.rank === 1 ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : player.rank === 2 ? 'bg-slate-300 text-black shadow-lg shadow-slate-300/20' : player.rank === 3 ? 'bg-orange-400 text-black shadow-lg shadow-orange-400/20' : 'bg-slate-800 text-foreground/40'}`}>
                                            {player.id}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                                {player.avatar}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{player.name}</h4>
                                                <div className="text-xs text-foreground/40 font-medium">Rank {player.rank} • {player.wins} Wins</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-12">
                                        <div className="hidden md:block text-center">
                                            <div className="text-xl font-bold">{Math.round((player.wins / (player.wins + 5)) * 100)}%</div>
                                        </div>
                                        <div className="hidden md:block text-center">
                                            <div className="text-xl font-bold flex items-center gap-2">
                                                <Target size={16} className="text-green-400" /> {player.accuracy}%
                                            </div>
                                        </div>
                                        <div className="text-center bg-primary/10 px-6 py-3 rounded-xl border border-primary/20 min-w-[120px]">
                                            <div className="text-2xl font-black text-primary">{player.wpm} <span className="text-[8px] font-medium opacity-40">WPM</span></div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    
                    <div className="p-8 bg-white/5 flex items-center justify-center gap-2 text-foreground/40 text-xs font-bold border-t border-white/5">
                        <Rocket size={14} className="text-primary animate-pulse" /> Updated every 5 minutes globally.
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
