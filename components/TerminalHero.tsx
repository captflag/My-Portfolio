
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Activity, Terminal as TerminalIcon, Calendar } from 'lucide-react';
import NeuralGrid from './NeuralGrid';

const TerminalHero: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const systemMessages = [
    "[SYSTEM] BOOTING_CORE_CAPT_v5.0.4...",
    "[NETWORK] ESTABLISHING SECURE TUNNEL TO VECTOR_DB_SHARD_01",
    "[AGENT] DEPLOYING AUTONOMOUS SCRAPER #402...",
    "[RAG] INDEXING LATEST KNOWLEDGE GRAPHS...",
    "[SYSTEM] STATUS: OPTIMIZED | LATENCY: 14ms",
    "[SECURITY] ENCRYPTION_LAYER: ACTIVE",
    "[AI] LLM_ORCHESTRATOR: READY"
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-6), systemMessages[i % systemMessages.length]]);
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center px-4 md:px-20 pt-20 md:pt-20 overflow-hidden">
      <NeuralGrid />
      
      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-6 font-mono">
            <Activity size={10} className="animate-pulse" />
            System_Status: Operational
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.9] mb-6 md:mb-8 text-white">
            CAPT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple animate-glitch">Command</span> Center.
          </h1>
          <p className="text-cyber-purple/60 text-base md:text-xl max-w-xl mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed font-light">
            Architecting the future of enterprise automation through <span className="text-cyber-blue font-bold">agentic workflows</span> and high-fidelity <span className="text-white">RAG architecture</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 bg-cyber-blue text-white font-bold uppercase tracking-widest hover:bg-cyber-purple hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(201,41,36,0.3)] haptic-pulse"
            >
              Launch_Project
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-cyber-blue transition-all uppercase text-xs tracking-widest font-bold text-cyber-purple/80 bg-white/5 flex items-center justify-center gap-3"
            >
              <Calendar size={16} className="text-cyber-blue" />
              Book_a_Meeting
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hidden lg:block relative"
        >
          <div className="glass rounded-xl p-1 border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="bg-cyber-dark p-6 rounded-lg min-h-[350px] font-mono text-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyber-blue/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-cyber-purple/30"></div>
                </div>
                <div className="text-cyber-purple/30 uppercase flex items-center gap-2 text-[9px]">
                  <TerminalIcon size={12} />
                  capt_shell_v5.0
                </div>
              </div>
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {logs.map((log, idx) => (
                    <motion.div
                      key={log + idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`${log.includes('[SYSTEM]') ? 'text-cyber-blue' : log.includes('[SECURITY]') ? 'text-cyber-purple font-bold' : 'text-cyber-purple/50'}`}
                    >
                      {log}
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
