'use client';

import { motion } from 'framer-motion';
import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import { Keyboard, Trophy, Users, Zap } from 'lucide-react';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function LandingPage() {
  return (
    <div className={`min-h-screen bg-background relative overflow-hidden ${spaceGrotesk.className}`}>
      {/* Background blobs for aesthetics */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] bg-accent/20 blur-[150px] rounded-full animate-pulse-slow"></div>

      <nav className="relative z-10 px-8 py-6 flex justify-between items-center border-b border-glass-border glass">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
            <Keyboard className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Typing <span className="text-primary">Race</span> Battle</h1>
        </div>
        <div className="flex gap-6 items-center">
          <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">Leaderboard</Link>
          <Link href="/login" className="px-5 py-2 rounded-full border border-glass-border hover:bg-glass transition-all text-sm font-medium">Login</Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-6xl lg:text-8xl font-bold leading-tight mb-8">
              Race to the <span className="gradient-text">Speed of Light</span>
            </h2>
            <p className="text-xl text-foreground/60 mb-12 max-w-lg leading-relaxed">
              Compete against people from all around the world in real-time typing battles. 
              Improve your speed, unlock achievements, and dominate the leaderboard.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/lobby" className="group relative px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/40 active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  Play Now <Zap size={20} className="fill-current" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Link>
              <Link href="/lobby" className="px-8 py-4 bg-glass border border-glass-border hover:border-primary/50 text-white rounded-2xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center">
                Create Private Room
              </Link>
            </div>
            
            <div className="mt-16 flex gap-12 text-foreground/40 font-medium">
              <div className="flex flex-col gap-1">
                <span className="text-white text-3xl font-bold">10k+</span>
                Active Typer
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white text-3xl font-bold">500+</span>
                Daily Matches
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
            <div className="glass p-8 rounded-[2rem] border-primary/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Keyboard size={200} strokeWidth={1} />
              </div>
              
              <div className="flex gap-4 mb-8">
                <div className="w-12 h-1 bg-primary rounded-full"></div>
                <div className="w-4 h-1 bg-glass rounded-full"></div>
                <div className="w-4 h-1 bg-glass rounded-full"></div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-black/40 p-5 rounded-2xl border border-white/5">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-xl">🚀</div>
                  <div className="lex-1">
                    <div className="text-sm text-foreground/40 mb-1">Rank #1</div>
                    <div className="text-lg font-bold">Storm Typer</div>
                  </div>
                  <div className="ml-auto text-primary text-xl font-bold">142 WPM</div>
                </div>
                
                <div className="flex items-center gap-4 bg-black/40 p-5 rounded-2xl border border-white/5 opacity-50">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-xl">⚡</div>
                  <div className="lex-1">
                    <div className="text-sm text-foreground/40 mb-1">Rank #2</div>
                    <div className="text-lg font-bold">Ghost Rider</div>
                  </div>
                  <div className="ml-auto text-xl font-bold">128 WPM</div>
                </div>

                <div className="p-8 mt-4 rounded-2xl bg-primary/10 border border-primary/20 text-center relative">
                   <div className="text-foreground/60 mb-2">Live Race Progress</div>
                   <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-4">
                      <motion.div 
                        animate={{ width: "75%" }} 
                        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }} 
                        className="h-full bg-primary shadow-[0_0_10px_rgba(0,74,172,0.5)]" 
                      />
                   </div>
                   <div className="text-2xl font-bold">3 Typer Racing...</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <section className="bg-black/40 border-t border-glass-border py-20 px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "Multiplayer", desc: "Real-time sync with players globally using Socket.io" },
            { icon: Trophy, title: "Leaderboards", desc: "Track your progress and climb the global rankings" },
            { icon: Zap, title: "Lightning Fast", desc: "Low latency gameplay for professional typers" }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-3xl group transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <feature.icon className="text-primary group-hover:text-white transition-colors" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-foreground/40 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
