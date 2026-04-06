'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Trophy, Play, Users, Clock, ArrowLeft, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

import TypingArea from '@/components/race/TypingArea';
import ProgressBar from '@/components/race/ProgressBar';
import { useGameStore } from '@/store/useGameStore';
import { getRandomParagraph } from '@/lib/paragraphs';
import { Player, RaceStatus } from '@/types';

export default function RaceRoomPage() {
  const { roomId } = useParams();
  const router = useRouter();
  const { me, room, setRoom, raceStatus, setRaceStatus, updatePlayerProgress } = useGameStore();
  
  const [countdown, setCountdown] = useState(3);
  const [isReady, setIsReady] = useState(false);
  
  // Use memo to prevent re-rendering text unexpectedly
  const raceText = useMemo(() => getRandomParagraph('medium'), []);

  // Sync logic for local simulation
  useEffect(() => {
    if (!me) {
      router.push('/lobby');
      return;
    }

    // Mock Room Initialization
    const initialPlayers: Player[] = [
      me,
      { id: 'bot1', name: 'Zippy-Bot ⚡', progress: 0, wpm: 0, accuracy: 100, isReady: true, isFinished: false },
      { id: 'bot2', name: 'Slow-Poke 🐢', progress: 0, wpm: 0, accuracy: 100, isReady: true, isFinished: false },
    ];

    setRoom({
      id: roomId as string,
      players: initialPlayers,
      status: 'waiting',
      text: raceText,
      countdown: 3
    });
  }, [me, roomId, raceText, router, setRoom]);

  // Start logic
  const handleReady = () => {
    setIsReady(true);
    // Simulation: if everyone ready, start countdown
    setRaceStatus('countdown');
  };

  useEffect(() => {
    if (raceStatus === 'countdown') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setRaceStatus('racing');
            return 3; // Reset for next time
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [raceStatus, setRaceStatus]);

  // Win logic simulation for bots
  useEffect(() => {
    if (raceStatus === 'racing') {
      const botSim = setInterval(() => {
        // Zippy bot progresses 5-8% every 1.5s
        updatePlayerProgress('bot1', Math.min(room?.players.find(p => p.id === 'bot1')?.progress || 0 + 0.07, 1), 110, 98);
        // Slow bot progresses 2-4% every 2s
        updatePlayerProgress('bot2', Math.min(room?.players.find(p => p.id === 'bot2')?.progress || 0 + 0.03, 1), 55, 92);
      }, 1500);
      return () => clearInterval(botSim);
    }
  }, [raceStatus, room, updatePlayerProgress]);

  const handleFinish = (wpm: number, accuracy: number) => {
    setRaceStatus('finished');
    if (wpm > 80) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
    }
    // Navigate to results
    setTimeout(() => {
        router.push('/result');
    }, 2000);
  };

  const handleProgress = (progress: number, wpm: number, accuracy: number) => {
    if (me) {
        updatePlayerProgress(me.id, progress, wpm, accuracy);
    }
  };

  if (!room || !me) return null;

  return (
    <div className="min-h-screen bg-background p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl flex justify-between items-center mb-12">
        <button onClick={() => router.push('/lobby')} className="flex items-center gap-2 text-foreground/40 hover:text-white transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Lobby
        </button>
        <div className="flex gap-4 items-center">
           <div className="glass px-4 py-2 border-white/5 rounded-full text-xs font-bold tracking-widest text-primary flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              ROOM: {roomId}
           </div>
           
           <button 
             onClick={() => {
               navigator.clipboard.writeText(window.location.href);
               alert('Invite link copied to clipboard!');
             }}
             className="glass px-4 py-2 border-white/5 hover:border-primary/50 transition-all rounded-full text-xs font-bold text-foreground/40 flex items-center gap-2"
           >
              <Send size={14} /> Invite Friend
           </button>

           <div className="glass px-4 py-2 border-white/5 rounded-full text-xs font-bold text-foreground/40 flex items-center gap-2">
              <Users size={14} /> {room.players.length} Players
           </div>
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Player Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Rocket size={20} className="text-primary" /> Competition Progress</h3>
          {room.players.map(player => (
            <ProgressBar key={player.id} player={player} isMe={player.id === me.id} />
          ))}
        </div>

        {/* Right: Main Game Area */}
        <div className="lg:col-span-2 relative">
          <AnimatePresence mode="wait">
            {raceStatus === 'waiting' && !isReady && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full h-full glass rounded-[2.5rem] border-white/5 p-12 flex flex-col items-center justify-center text-center"
              >
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8 border border-primary/20">
                    <Play size={40} className="text-primary translate-x-1" />
                  </div>
                  <h2 className="text-4xl font-bold mb-4">Waiting for players...</h2>
                  <p className="text-foreground/40 mb-10 max-w-sm">When you're ready, click start. The race will begin once everyone is set.</p>
                  <button 
                    onClick={handleReady}
                    className="px-12 py-5 bg-primary text-white rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-primary/40 active:scale-95 transition-all"
                  >
                    Set Ready
                  </button>
              </motion.div>
            )}

            {raceStatus === 'countdown' && (
              <motion.div 
                key="countdown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col items-center justify-center pt-24"
              >
                 <motion.div 
                    key={countdown}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[12rem] font-black text-primary drop-shadow-[0_0_30px_rgba(0,74,172,0.5)]"
                 >
                    {countdown}
                 </motion.div>
                 <div className="text-2xl font-bold text-foreground/40 mt-8 tracking-widest uppercase">Get Ready!</div>
              </motion.div>
            )}

            {(raceStatus === 'racing' || raceStatus === 'finished') && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                 <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="glass p-6 rounded-3xl border-white/5 text-center">
                        <div className="text-[10px] text-foreground/40 uppercase font-black tracking-widest mb-1">Speed</div>
                        <div className="text-3xl font-black text-primary">{me.wpm} <span className="text-xs font-medium text-foreground/20">WPM</span></div>
                    </div>
                    <div className="glass p-6 rounded-3xl border-white/5 text-center">
                        <div className="text-[10px] text-foreground/40 uppercase font-black tracking-widest mb-1">Accuracy</div>
                        <div className="text-3xl font-black text-green-400">{me.accuracy} <span className="text-xs font-medium text-foreground/20">%</span></div>
                    </div>
                    <div className="glass p-6 rounded-3xl border-white/5 text-center">
                        <div className="text-[10px] text-foreground/40 uppercase font-black tracking-widest mb-1">Status</div>
                        <div className="text-xl font-black text-white uppercase tracking-tighter pt-2 flex items-center justify-center gap-2">
                            {raceStatus === 'racing' ? <div className="w-3 h-3 bg-primary rounded-full animate-pulse" /> : <Trophy size={20} className="text-yellow-400" />}
                            {raceStatus}
                        </div>
                    </div>
                 </div>
                 
                 <TypingArea 
                   text={raceText} 
                   disabled={raceStatus !== 'racing'} 
                   onProgress={handleProgress}
                   onFinish={handleFinish}
                 />

                 <div className="mt-8 flex gap-3 text-xs text-foreground/20 font-bold bg-white/5 p-4 rounded-xl items-center justify-center">
                    <Clock size={14} /> TYPE AS FAST AS POSSIBLE • PRESS RESTART IF YOU GET STUCK
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
