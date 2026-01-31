
import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Activity, Shield, Cpu, Zap, ChevronRight, Clock, Globe, Database, Server, UserPlus, Github } from 'lucide-react';
import { sfx } from '../services/audioService';

const CHARS = '0123456789ABCDEF!@#$%^&*';

const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const startScramble = () => {
    sfx.play('hover');
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = window.setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );

      if (iteration >= text.length) clearInterval(intervalRef.current!);
      iteration += 1 / 2;
    }, 40);
  };

  return (
    <span className={className} onMouseEnter={startScramble}>
      {displayText}
    </span>
  );
};

const SystemClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden sm:flex flex-col items-end border-r border-white/10 pr-4 mr-4 font-mono text-[9px] text-white/40 uppercase tracking-widest leading-none">
      <div className="flex items-center gap-1.5 mb-1 text-cyber-purple/60">
        <Clock size={10} />
        <span>T_SYNC_UTC</span>
      </div>
      <span className="text-white font-bold">{time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
    </div>
  );
};

const NetworkStatus = () => {
  return (
    <div className="hidden md:flex items-center gap-3 px-4 text-[8px] font-mono uppercase tracking-[0.2em]">
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-1 text-white/30">
          <Globe size={10} className="text-cyber-blue" />
          <span>GEO_REGION</span>
        </div>
        <span className="text-white">AP_SOUTH_01</span>
      </div>
    </div>
  );
};

const AdvancedWaveform = () => {
  return (
    <div className="hidden md:flex items-end gap-[1.5px] h-3 px-3 border-l border-white/10 ml-4">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            height: [3 + Math.random() * 3, 8 + Math.random() * 4, 3 + Math.random() * 3],
            opacity: [0.2, 0.7, 0.2]
          }}
          transition={{ duration: 0.5 + (Math.random() * 0.5), repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] rounded-full bg-cyber-blue"
        />
      ))}
    </div>
  );
};

const MagneticCTA = ({ onClick }: { onClick: () => void }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.35);
    mouseY.set((e.clientY - centerY) * 0.35);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseEnter={() => sfx.play('hover')}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      onClick={() => { sfx.play('click'); onClick(); }}
      style={{ x: springX, y: springY }}
      className="relative group bg-cyber-blue text-white px-4 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl overflow-hidden flex items-center gap-2 md:gap-3 transition-all hover:scale-105 shadow-[0_10px_25px_rgba(201,41,36,0.3)] border border-cyber-blue/50"
    >
      <UserPlus size={12} className="relative z-10 sm:w-3.5 sm:h-3.5" />
      <span className="relative z-10 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] whitespace-nowrap">Hire Me</span>
      <ChevronRight size={10} className="relative z-10 group-hover:translate-x-1 transition-transform" />
    </motion.button>
  );
};

const NeuralLogo = () => {
  return (
    <div 
      className="flex items-center gap-2 md:gap-5 group cursor-pointer shrink-0"
      onMouseEnter={() => sfx.play('hover')}
    >
      <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-cyber-blue/20 rounded-full"
        />
        <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-black/40 rounded-lg md:rounded-xl border border-white/5 shadow-[0_0_20px_rgba(201,41,36,0.15)] overflow-hidden">
          <svg viewBox="0 0 40 40" className="w-6 h-6 md:w-8 md:h-8">
             <rect x="10" y="10" width="20" height="20" rx="4" fill="none" stroke="#c92924" strokeWidth="1.5" />
             <motion.circle 
               cx="20" cy="20" r="3" 
               fill="#c92924" 
               animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
             />
          </svg>
        </div>
      </div>
      
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <h1 className="text-xl md:text-3xl font-sans font-black text-white tracking-tighter uppercase">CAPT</h1>
          <h1 className="text-lg md:text-2xl font-mono font-bold text-cyber-blue tracking-widest uppercase">AI</h1>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 mt-1">
          <div className="w-1 h-1 bg-cyber-blue rounded-full" />
          <span className="text-[7px] md:text-[9px] font-mono text-white/40 uppercase tracking-[0.2em] font-bold">AUTONOMOUS_CORE</span>
        </div>
      </div>
    </div>
  );
};

export const LivingCommandBar = ({ onIntent }: { onIntent: (intent: string) => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-2 md:px-4 pt-2 md:pt-4 pointer-events-none">
      <motion.div 
        animate={{ width: scrolled ? '98%' : '100%', maxWidth: '1440px' }}
        className="mx-auto pointer-events-auto"
      >
        <div className="relative glass rounded-2xl md:rounded-[28px] overflow-hidden backdrop-blur-3xl bg-cyber-black/90 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="relative z-10 p-2 md:p-3 px-4 md:px-10 flex justify-between items-center min-h-[64px] md:min-h-[92px]">
            <NeuralLogo />
            
            <nav className="hidden xl:flex items-center gap-10">
              {['Capabilities', 'Protocols', 'Launch'].map((item) => (
                <button 
                  key={item}
                  onClick={() => onIntent(item)}
                  className="group relative text-[9px] font-mono uppercase tracking-[0.4em] text-cyber-purple/40 hover:text-white transition-colors"
                >
                  <ScrambleText text={`/${item}`} />
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-5">
              <div className="hidden lg:flex items-center">
                 <SystemClock />
                 <NetworkStatus />
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 border-l border-white/10 font-mono text-[8px] uppercase tracking-widest">
                <Database size={10} className="text-cyber-blue" />
                <span className="text-cyber-blue font-black">LIVE</span>
              </div>

              <motion.a
                href="https://github.com/captflag"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.play('click')}
                whileHover={{ scale: 1.1 }}
                className="p-2 md:p-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl text-white/50 hover:text-white hover:border-cyber-blue transition-all"
              >
                <Github size={18} />
              </motion.a>

              <MagneticCTA onClick={() => onIntent('contact')} />
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
};
