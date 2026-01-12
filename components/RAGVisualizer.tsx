
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { RealisticSearch, RealisticDatabase, RealisticMessage, RealisticCpu } from './RealisticIcons';

const RAGVisualizer: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const stages = [
    { name: "Query", icon: RealisticSearch, color: "text-cyber-blue" },
    { name: "Vector DB", icon: RealisticDatabase, color: "text-cyber-purple" },
    { name: "Context", icon: RealisticMessage, color: "text-white" },
    { name: "LLM", icon: RealisticCpu, color: "text-cyber-blue" }
  ];

  useEffect(() => {
    if (isSimulating) {
      const timer = setInterval(() => {
        setActiveStage(prev => (prev < 3 ? prev + 1 : 0));
      }, 1500);
      return () => clearInterval(timer);
    }
  }, [isSimulating]);

  return (
    <section className="py-24 px-6 md:px-20 bg-cyber-black overflow-hidden relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4 text-glow-blue">High_Fidelity_RAG</h2>
            <p className="text-slate-500 max-w-xl font-mono text-sm uppercase">Simulating the semantic retrieval architecture that powers our enterprise integrations.</p>
          </div>
          <button 
            onClick={() => setIsSimulating(!isSimulating)}
            className="px-6 py-3 border border-cyber-blue/30 text-cyber-blue uppercase font-bold text-xs tracking-widest hover:bg-cyber-blue hover:text-black transition-all"
          >
            {isSimulating ? "Stop_Simulation" : "Initialize_Flow"}
          </button>
        </div>

        <div className="glass rounded-3xl p-12 relative overflow-hidden">
          {/* Flow Lines */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent -translate-y-1/2"></div>
          
          <div className="grid grid-cols-4 gap-4 relative z-10">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: activeStage === idx ? 1.1 : 1,
                      filter: activeStage === idx ? 'brightness(1.5)' : 'brightness(0.7)'
                    }}
                    className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-cyber-dark border border-white/5 flex items-center justify-center mb-6 relative group transition-all duration-500`}
                  >
                    <Icon className="w-12 h-12 md:w-16 md:h-16" />
                    
                    {activeStage === idx && (
                      <motion.div 
                        layoutId="glow"
                        className="absolute inset-0 bg-cyber-blue/5 blur-2xl -z-10 rounded-full"
                      />
                    )}

                    {/* Connecting Arrows */}
                    {idx < 3 && (
                      <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden md:block">
                        <ArrowRight className="text-slate-800" size={16} />
                      </div>
                    )}
                  </motion.div>
                  <div className="text-center">
                    <div className={`text-[10px] font-mono uppercase mb-1 ${activeStage === idx ? stage.color : 'text-slate-600'}`}>0{idx + 1}_PROC</div>
                    <div className={`text-sm font-bold uppercase tracking-tight ${activeStage === idx ? 'text-white' : 'text-slate-500'}`}>{stage.name}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Particle Simulation Container */}
          <div className="mt-12 h-20 relative bg-cyber-black/50 rounded-xl border border-white/5 overflow-hidden flex items-center px-6">
            <AnimatePresence>
              {isSimulating && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ 
                    x: activeStage === 0 ? "10%" : activeStage === 1 ? "35%" : activeStage === 2 ? "60%" : "85%",
                    opacity: 1 
                  }}
                  className="w-4 h-4 rounded-full bg-cyber-blue shadow-[0_0_15px_rgba(0,243,255,1)]"
                />
              )}
            </AnimatePresence>
            <div className="ml-auto font-mono text-[10px] text-slate-600 flex gap-4 uppercase">
              <span>Entropy: 0.002</span>
              <span>Vectors: 1.2M</span>
              <span>Latency: 42ms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RAGVisualizer;
