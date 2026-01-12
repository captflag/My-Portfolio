
import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const CHARS = '!@#$%^&*()_+{}:"<>?|[];\',./1234567890';

const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const startScramble = () => {
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
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span 
      className={className}
      onMouseEnter={startScramble}
    >
      {displayText}
    </span>
  );
};

const ReactiveWaveform = () => {
  const [velocity, setVelocity] = useState(0);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = Math.abs(e.clientX - lastMousePos.current.x);
      const dy = Math.abs(e.clientY - lastMousePos.current.y);
      setVelocity(Math.min(dx + dy, 100));
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="flex items-center gap-[2px] h-4">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            height: [4, 8 + Math.random() * (velocity / 2), 4],
            backgroundColor: velocity > 50 ? '#f9e7c9' : '#c92924'
          }}
          transition={{ 
            duration: 0.2 + (Math.random() * 0.3), 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-[2px] rounded-full bg-cyber-blue"
        />
      ))}
    </div>
  );
};

const MagneticButton = ({ label, activeLabel, onClick }: { label: string; activeLabel: string; onClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.4);
    mouseY.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className="relative group px-4 md:px-6 py-2 bg-white text-black text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden rounded-lg haptic-pulse shrink-0"
    >
      <div className="absolute inset-0 bg-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
      <span className="relative z-10 block min-w-[80px] md:min-w-[120px]">
        {isHovered ? activeLabel : label}
      </span>
    </motion.button>
  );
};

const ProfessionalLogo = () => {
  return (
    <div className="flex items-center gap-2 md:gap-4 group/logo cursor-pointer select-none">
      <div className="relative w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
        <motion.svg 
          viewBox="0 0 100 100" 
          className="absolute inset-0 w-full h-full text-cyber-blue opacity-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <path 
            d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeDasharray="10 20"
          />
        </motion.svg>
        
        <motion.div 
          className="w-5 h-5 md:w-8 md:h-8 rounded md:rounded-lg bg-cyber-blue flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(201,41,36,0.5)]"
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 20px rgba(201, 41, 36, 0.4)",
              "0 0 40px rgba(201, 41, 36, 0.7)",
              "0 0 20px rgba(201, 41, 36, 0.4)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-white font-black text-sm md:text-xl italic tracking-tighter">C</span>
        </motion.div>
      </div>

      <div className="flex flex-col">
        <div className="relative overflow-hidden">
          <span className="font-sans font-black text-lg md:text-2xl tracking-tighter uppercase text-white flex gap-1">
            <span className="relative">CAPT</span>
            <span className="text-cyber-blue font-light">AI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 mt-[-4px]">
          <div className="w-1 h-1 bg-cyber-blue animate-pulse" />
          <div className="text-[7px] font-mono text-cyber-purple/40 uppercase tracking-[0.3em]">Architectural_Engine_v5.0</div>
        </div>
      </div>
    </div>
  );
};

export const LivingCommandBar = ({ onIntent }: { onIntent: (intent: string) => void }) => {
  return (
    <header className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 w-[98%] max-w-7xl z-[100] px-2 md:px-4">
      <div className="relative group glass rounded-xl md:rounded-2xl overflow-hidden backdrop-blur-xl bg-black/40 border border-cyber-blue/20 p-2 md:p-3 md:px-8 flex justify-between items-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 micro-grid pointer-events-none opacity-40" />
        
        <ProfessionalLogo />

        <nav className="hidden lg:flex items-center gap-10 text-[10px] font-mono uppercase tracking-[0.4em] text-cyber-purple/70">
          <button onClick={() => onIntent('services')} className="group relative">
            <ScrambleText text="/Capabilities" className="group-hover:text-cyber-blue transition-colors" />
          </button>
          <button onClick={() => onIntent('visualizer')} className="group relative">
            <ScrambleText text="/Protocols" className="group-hover:text-cyber-blue transition-colors" />
          </button>
          <button onClick={() => onIntent('contact')} className="group relative">
            <ScrambleText text="/Launch" className="group-hover:text-cyber-blue transition-colors" />
          </button>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center gap-4 glass px-4 py-2 rounded-xl border-white/5 bg-white/5">
            <ReactiveWaveform />
            <div className="flex flex-col font-mono text-[8px] uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="text-cyber-purple/90">[LIVE]</span>
                <span className="text-white">NODE_0X4F</span>
              </div>
            </div>
          </div>

          <MagneticButton 
            label="SYS_ENTRY" 
            activeLabel="INITIALIZE >" 
            onClick={() => onIntent('contact')} 
          />
        </div>
      </div>
    </header>
  );
};
