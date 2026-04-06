'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Box, Globe, ArrowRight, Keyboard, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app with Supabase URL/KEY set:
    // const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    // Mock login for now to show the UI flow
    setTimeout(() => {
        setIsLoading(false);
        router.push('/lobby');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-6 overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    <Keyboard className="text-white" size={24} />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Typing <span className="text-primary">Race</span></h1>
            </Link>
            <h2 className="text-2xl font-bold mt-4">Welcome Back, Racer!</h2>
            <p className="text-foreground/40 mt-2">Sign in to track your progress and climb the ranks.</p>
        </div>

        <div className="glass p-10 rounded-[2.5rem] border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <ShieldCheck size={120} />
            </div>

            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/40 ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                        <input 
                            type="email" 
                            required
                            placeholder="racer@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:outline-none focus:border-primary transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-sm font-bold text-foreground/40">Password</label>
                        <button type="button" className="text-xs font-bold text-primary hover:underline">Forgot?</button>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                        <input 
                            type="password" 
                            required
                            placeholder="min 8 characters" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:outline-none focus:border-primary transition-all"
                        />
                    </div>
                </div>

                <button 
                    disabled={isLoading}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/40 active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                    {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>Enter Match <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} /></>
                    )}
                </button>

                <div className="relative py-4 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                    <span className="relative bg-[#0a0a0c] px-4 text-xs font-bold text-foreground/20 uppercase tracking-widest">Or continue with</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button type="button" className="flex items-center justify-center gap-3 py-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all font-bold text-sm">
                        <Box size={18} /> GitHub
                    </button>
                    <button type="button" className="flex items-center justify-center gap-3 py-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all font-bold text-sm">
                        <Globe size={18} /> Google
                    </button>
                </div>
            </form>
        </div>

        <p className="text-center mt-10 text-foreground/40 text-sm">
            Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Race Join</Link>
        </p>
      </motion.div>
    </div>
  );
}
