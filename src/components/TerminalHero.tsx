
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Activity, Terminal as TerminalIcon, Calendar } from 'lucide-react';
import NeuralGrid from './NeuralGrid';
import { sfx } from '../services/audioService';

const SCRAMBLE_CHARS = '0123456789ABCDEF!@#$%^&*<>[]';

const DecryptingLog = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    let timeout: number;
    const typeNextChar = () => {
      if (indexRef.current < text.length) {
        const randomChar = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        setDisplayText(text.substring(0, indexRef.current) + randomChar);
        setTimeout(() => {
          setDisplayText(text.substring(0, indexRef.current + 1));
          indexRef.current++;
          timeout = window.setTimeout(typeNextChar, 15 + Math.random() * 50);
          if (Math.random() > 0.8) sfx.play('typing');
        }, 10);
      } else {
        setIsComplete(true);
      }
    };
    typeNextChar();
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <div className="flex items-center gap-1">
      <span className="shrink-0">{displayText}</span>
      {!isComplete && <motion.div animate={{ opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity }} className="w-1 h-3 bg-cyber-blue" />}
    </div>
  );
};

const AdvancedGlitchText = ({ text }: { text: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  useEffect(() => {
    const loop = () => {
      const delay = 3000 + Math.random() * 5000;
      setTimeout(() => {
        setIsGlitching(true);
        sfx.play('glitch');
        setTimeout(() => setIsGlitching(false), 200);
        loop();
      }, delay);
    };
    loop();
  }, []);

  return (
    <span className={`relative inline-block ${isGlitching ? 'animate-glitch' : ''}`}>
      <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue via-white to-cyber-purple">{text}</span>
    </span>
  );
};

const TerminalHero: React.FC = () => {
  const [logs, setLogs] = useState<{ id: number; text: string }[]>([]);
  const logIdRef = useRef(0);
  const systemMessages = [
    "[SYSTEM] BOOTING_CORE_CAPT_v5.0.4...",
    "[NETWORK] ESTABLISHING SECURE TUNNEL...",
    "[AGENT] DEPLOYING SCRAPER #402...",
    "[RAG] INDEXING KNOWLEDGE GRAPHS...",
    "[SYSTEM] STATUS: OPTIMIZED | 14ms",
    "[AI] LLM_ORCHESTRATOR: READY",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-6), { id: logIdRef.current++, text: systemMessages[i % systemMessages.length] }]);
      i++;
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex flex-col justify-center px-4 md:px-20 pt-16 md:pt-0 overflow-hidden">
      <NeuralGrid />
      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue text-[9px] md:text-[10px] uppercase tracking-widest mb-6 font-mono">
            <Activity size={10} className="animate-pulse" /> System_Status: Operational
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6 md:mb-8 text-white">
            CAPT <br /> <AdvancedGlitchText text="Command Center." />
          </h1>
          <p className="text-cyber-purple/60 text-sm md:text-xl max-w-xl mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed font-light">
            Architecting the future of enterprise automation through <span className="text-cyber-blue font-bold">agentic workflows</span> and high-fidelity <span className="text-white">RAG architecture</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button onClick={() => document.getElementById('protocols')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-4 bg-cyber-blue text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg text-xs md:text-sm">Launch_Project</button>
            <button onClick={() => window.open('mailto:divyanshd666@gmail.com')} className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-cyber-blue transition-all uppercase text-[10px] md:text-xs tracking-widest font-bold text-cyber-purple/80 bg-white/5 flex items-center justify-center gap-3">
              <Calendar size={16} className="text-cyber-blue" /> Book_a_Meeting
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="hidden lg:block">
          <div className="glass rounded-xl p-1 border border-white/10 shadow-2xl relative group">
            <div className="bg-cyber-dark p-6 rounded-lg min-h-[350px] font-mono text-xs overflow-hidden">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2 opacity-50">
                <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500/50" /><div className="w-2 h-2 rounded-full bg-yellow-500/30" /></div>
                <div className="uppercase flex items-center gap-2 text-[9px]"><TerminalIcon size={12} /> capt_shell_v5.0</div>
              </div>
              <div className="space-y-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  {logs.map((log) => (
                    <motion.div key={log.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, filter: 'blur(5px)' }} className={`font-mono ${log.text.includes('[SYSTEM]') ? 'text-cyber-blue' : 'text-white/60'}`}>
                      <DecryptingLog text={log.text} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalHero;
