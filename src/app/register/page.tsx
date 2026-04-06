'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, Keyboard, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock registration
    setTimeout(() => {
        setIsLoading(false);
        router.push('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                    <Keyboard className="text-white" size={24} />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Typing <span className="text-accent">Race</span></h1>
            </Link>
            <h2 className="text-2xl font-bold mt-4">Join the Elite Racers</h2>
            <p className="text-foreground/40 mt-2">Create an account to start your journey to #1.</p>
        </div>

        <div className="glass p-10 rounded-[2.5rem] border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 p-4 opacity-5 pointer-events-none">
                <Sparkles size={120} />
            </div>

            <form onSubmit={handleRegister} className="space-y-6 relative z-10">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/40 ml-1">Nickname</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={18} />
                        <input 
                            type="text" 
                            required
                            placeholder="Speedster_99" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:outline-none focus:border-accent transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/40 ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={18} />
                        <input 
                            type="email" 
                            required
                            placeholder="racer@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:outline-none focus:border-accent transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/40 ml-1">Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={18} />
                        <input 
                            type="password" 
                            required
                            placeholder="min 8 characters" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:outline-none focus:border-accent transition-all"
                        />
                    </div>
                </div>

                <button 
                    disabled={isLoading}
                    className="w-full py-4 bg-accent text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-accent/40 active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                    {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>Create Account <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} /></>
                    )}
                </button>
            </form>
        </div>

        <p className="text-center mt-10 text-foreground/40 text-sm">
            Already a racer? <Link href="/login" className="text-accent font-bold hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
