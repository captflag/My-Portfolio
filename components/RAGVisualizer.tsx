
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Database, Cpu, Zap, Activity } from 'lucide-react';
import { RealisticSearch, RealisticDatabase, RealisticMessage, RealisticCpu } from './RealisticIcons';
import { sfx } from '../services/audioService';

const RAGVisualizer: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  
  // Real-time simulated stats
  const [stats, setStats] = useState({
    vectors: 1240582,
    latency: 0,
    tokens: 0,
    throughput: 0
  });

  const stages = [
    { name: "Query", icon: RealisticSearch, color: "text-cyber-blue" },
    { name: "Vector DB", icon: RealisticDatabase, color: "text-cyber-purple" },
    { name: "Context", icon: RealisticMessage, color: "text-white" },
    { name: "LLM", icon: RealisticCpu, color: "text-cyber-blue" }
  ];

  useEffect(() => {
    let timer: number;
    if (isSimulating) {
      timer = window.setInterval(() => {
        setActiveStage(prev => {
          const next = prev < 3 ? prev + 1 : 0;
          if (next === 0) sfx.play('hover'); // Pulse sound on loop restart
          return next;
        });

        // Update stats based on stage
        setStats(prev => ({
          vectors: prev.vectors + Math.floor(Math.random() * 5), // Slowly growing DB
          latency: 12 + Math.floor(Math.random() * 45),
          tokens: prev.tokens + (Math.floor(Math.random() * 150) + 50),
          throughput: 85 + Math.floor(Math.random() * 15)
        }));
      }, 1500);
    } else {
      setActiveStage(-1);
      setStats(prev => ({ ...prev, latency: 0, throughput: 0 }));
    }
    return () => clearInterval(timer);
  }, [isSimulating]);

  const toggleSimulation = () => {
    sfx.play('glitch');
    setIsSimulating(!isSimulating);
  };

  return (
    <section className="py-24 px-6 md:px-20 bg-cyber-black overflow-hidden relative" id="visualizer">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-cyber-blue font-mono text-[10px] uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
              <Activity size={12} className={isSimulating ? "animate-pulse" : ""} />
              Neural_Engine_Direct_Feed
            </div>
            <h2 className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter mb-4 text-white">
              High_Fidelity <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple italic">RAG Architecture</span>
            </h2>
            <p className="text-cyber-purple/40 max-w-xl font-mono text-xs uppercase leading-relaxed">
              Monitoring high-concurrency retrieval flows between localized vector shards and frontier LLM kernels.
            </p>
          </div>
          <button 
            onClick={toggleSimulation}
            onMouseEnter={() => sfx.play('hover')}
            className={`px-8 py-4 border-2 transition-all font-mono text-xs font-black tracking-widest uppercase haptic-pulse ${
              isSimulating 
                ? "bg-cyber-blue border-cyber-blue text-white shadow-[0_0_30px_rgba(201,41,36,0.4)]" 
                : "border-white/10 text-white hover:border-cyber-blue hover:text-cyber-blue"
            }`}
          >
            {isSimulating ? "Terminate_Stream" : "Initialize_Flow"}
          </button>
        </div>

        <div className="glass rounded-3xl p-8 md:p-16 relative overflow-hidden border border-white/5">
          {/* Internal HUD Grid */}
          <div className="absolute inset-0 micro-grid opacity-10 pointer-events-none" />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStage === idx;
              
              return (
                <div key={idx} className="flex flex-col items-center">
                  <motion.div
                    animate={isActive ? {
                      scale: [1, 1.05, 1],
                      filter: 'brightness(1.3) contrast(1.1)',
                      boxShadow: '0 0 40px rgba(201,41,36,0.15)'
                    } : {
                      scale: 1,
                      filter: 'brightness(0.6) contrast(0.8)',
                      boxShadow: 'none'
                    }}
                    transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                    className={`w-28 h-28 md:w-36 md:h-36 rounded-2xl md:rounded-[2rem] bg-cyber-dark border-2 flex items-center justify-center mb-6 relative transition-all duration-500 ${
                      isActive ? 'border-cyber-blue' : 'border-white/5'
                    }`}
                  >
                    <Icon className="w-14 h-14 md:w-20 md:h-20" />
                    
                    {/* Activity Indicator */}
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-lg bg-cyber-blue flex items-center justify-center text-[10px] font-mono text-white font-bold"
                      >
                        !
                      </motion.div>
                    )}

                    {/* Stage Index */}
                    <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[8px] font-mono font-black border transition-colors ${
                      isActive ? 'bg-cyber-blue border-cyber-blue text-white' : 'bg-cyber-black border-white/10 text-white/30'
                    }`}>
                      NODE_0{idx + 1}
                    </div>
                  </motion.div>
                  
                  <div className="text-center">
                    <div className={`text-sm md:text-lg font-black uppercase tracking-tight transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/20'}`}>
                      {stage.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real-time Statistics HUD */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col gap-1 relative overflow-hidden group">
              <div className="text-[8px] font-mono text-cyber-blue uppercase tracking-widest flex items-center gap-1.5">
                <Database size={10} /> Vector_Index_Size
              </div>
              <div className="text-xl md:text-2xl font-black text-white tabular-nums">
                {stats.vectors.toLocaleString()}
              </div>
              <div className="text-[7px] font-mono text-white/20 uppercase">Chunks_Processed_Secure</div>
              {isSimulating && <motion.div className="absolute bottom-0 left-0 h-[1px] bg-cyber-blue" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, repeat: Infinity }} />}
            </div>

            <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col gap-1 relative overflow-hidden">
              <div className="text-[8px] font-mono text-cyber-purple uppercase tracking-widest flex items-center gap-1.5">
                <Zap size={10} /> Query_Latency
              </div>
              <div className="text-xl md:text-2xl font-black text-white tabular-nums">
                {stats.latency}ms
              </div>
              <div className="text-[7px] font-mono text-white/20 uppercase">P99_Resolution_Target</div>
              {isSimulating && <motion.div className="absolute bottom-0 left-0 h-[1px] bg-cyber-purple" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />}
            </div>

            <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col gap-1 relative overflow-hidden">
              <div className="text-[8px] font-mono text-white uppercase tracking-widest flex items-center gap-1.5">
                <Cpu size={10} /> Token_Accumulation
              </div>
              <div className="text-xl md:text-2xl font-black text-white tabular-nums">
                {stats.tokens.toLocaleString()}
              </div>
              <div className="text-[7px] font-mono text-white/20 uppercase">Context_Window_Utilization</div>
              {isSimulating && <motion.div className="absolute bottom-0 left-0 h-[1px] bg-white" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />}
            </div>

            <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col gap-1 relative overflow-hidden">
              <div className="text-[8px] font-mono text-cyber-blue uppercase tracking-widest flex items-center gap-1.5">
                <Activity size={10} /> System_Throughput
              </div>
              <div className="text-xl md:text-2xl font-black text-white tabular-nums">
                {stats.throughput}%
              </div>
              <div className="text-[7px] font-mono text-white/20 uppercase">Resource_Optimization_Index</div>
              {isSimulating && <motion.div className="absolute bottom-0 left-0 h-[1px] bg-cyber-blue" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} />}
            </div>
          </div>

          {/* Flow Simulation Bar */}
          <div className="mt-8 h-12 relative bg-cyber-black rounded-xl border border-white/5 overflow-hidden flex items-center px-6">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(201,41,36,0.2)_0%,transparent_70%)]" />
            <AnimatePresence>
              {isSimulating && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ 
                    x: activeStage === 0 ? "5%" : activeStage === 1 ? "30%" : activeStage === 2 ? "55%" : "80%",
                    opacity: 1 
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="w-8 h-2 rounded-full bg-cyber-blue shadow-[0_0_20px_rgba(201,41,36,0.8)]"
                />
              )}
            </AnimatePresence>
            <div className="ml-auto flex gap-6">
              <div className="flex flex-col">
                <span className="text-[7px] font-mono text-slate-600 uppercase">Buffer_Entropy</span>
                <span className="text-[10px] font-mono text-white">0.00{Math.floor(Math.random() * 9)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[7px] font-mono text-slate-600 uppercase">Encryption</span>
                <span className="text-[10px] font-mono text-cyber-blue">AES_256</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RAGVisualizer;
