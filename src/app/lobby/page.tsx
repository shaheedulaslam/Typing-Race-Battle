'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Users, User, ArrowRight, Shield, Globe } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export default function LobbyPage() {
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();
  const setMe = useGameStore(state => state.setMe);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName) return;
    
    // In a real app, we would emit 'create_room' here
    // For now, let's mock it and navigate to a generated roomId
    const mockRoomId = Math.random().toString(36).substring(7);
    setMe({
      id: 'me',
      name: playerName,
      isReady: false,
      progress: 0,
      wpm: 0,
      accuracy: 100,
      isFinished: false
    });
    router.push(`/race/${mockRoomId}`);
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName || !roomId) return;
    
    setMe({
      id: 'me',
      name: playerName,
      isReady: false,
      progress: 0,
      wpm: 0,
      accuracy: 100,
      isFinished: false
    });
    router.push(`/race/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-6">
      <div className="absolute top-0 left-0 w-full h-full opacity-60 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-accent/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
      >
        <div className="glass p-10 rounded-[2.5rem] border-white/5 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-primary/20">
                <Plus size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Create Room</h2>
            <p className="text-foreground/40 mb-10">Start a new race and invite your friends to compete with you.</p>
            
            <form onSubmit={handleCreateRoom} className="w-full space-y-4">
                <div className="flex flex-col gap-4">
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Your Nickname" 
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:outline-none focus:border-primary transition-all text-lg"
                        />
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/5 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <Shield size={18} className="text-primary" />
                            <span className="text-sm font-bold">Private Room</span>
                        </div>
                        <div className="w-12 h-6 bg-slate-800 rounded-full relative p-1 cursor-pointer">
                            <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_rgba(0,74,172,0.8)]" />
                        </div>
                    </div>
                </div>
                <button 
                    disabled={!playerName}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                    Initialize Room
                </button>
            </form>

            <div className="mt-12 pt-8 border-t border-white/5 w-full flex justify-between text-sm text-foreground/40 font-medium">
                <div className="flex items-center gap-2">
                    <Shield size={16} /> Private Room
                </div>
                <div className="flex items-center gap-2">
                    <Globe size={16} /> Global Servers
                </div>
            </div>
        </div>

        <div className="glass p-10 rounded-[2.5rem] border-white/5 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-accent/20">
                <Users size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Join Room</h2>
            <p className="text-foreground/40 mb-10">Enter a room code to join an existing race already in lobby.</p>
            
            <form onSubmit={handleJoinRoom} className="w-full space-y-4">
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Your Nickname" 
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:outline-none focus:border-accent transition-all text-lg"
                    />
                </div>
                <div className="relative group">
                    <ArrowRight className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Room Code (ex: a1b2c3)" 
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:outline-none focus:border-accent transition-all text-lg"
                    />
                </div>
                <button 
                    disabled={!playerName || !roomId}
                    className="w-full py-4 bg-accent text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-accent/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                    Enter Battle
                </button>
            </form>
            
            <div className="mt-12 flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-slate-800 flex items-center justify-center text-xs">
                        {String.fromCharCode(64 + i)}
                    </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-background bg-slate-100/10 flex items-center justify-center text-[10px] text-white/40">
                    +12
                </div>
            </div>
            <div className="text-xs text-foreground/40 mt-3 font-medium">Players currently in races</div>
        </div>
      </motion.div>
    </div>
  );
}
