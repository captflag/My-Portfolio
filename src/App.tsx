
import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import TerminalHero from './components/TerminalHero';
import SolutionGrid from './components/SolutionGrid';
import RAGVisualizer from './components/RAGVisualizer';
import StrategicRoadmap from './components/StrategicRoadmap';
import AgenticContact from './components/AgenticContact';
import ConsultationBanner from './components/ConsultationBanner';
import POCPlayground from './components/POCPlayground';
import { LivingCommandBar } from './components/LivingCommandBar';

type SectionId = 'hero' | 'promo' | 'services' | 'leadgen' | 'visualizer' | 'roadmap' | 'contact';

const App: React.FC = () => {
  const [sectionOrder, setSectionOrder] = useState<SectionId[]>([
    'hero',
    'promo',
    'services',
    'leadgen',
    'visualizer',
    'roadmap',
    'contact'
  ]);

  const handleIntent = (intent: string) => {
    let newOrder = [...sectionOrder];
    const normalized = intent.toLowerCase();
    
    if (normalized.includes('lead') || normalized.includes('gen') || normalized.includes('poc')) {
      newOrder = moveSectionToFront('leadgen', newOrder);
    } else if (normalized.includes('service') || normalized.includes('work') || normalized.includes('capabilities')) {
      newOrder = moveSectionToFront('services', newOrder);
    } else if (normalized.includes('rag') || normalized.includes('visualizer')) {
      newOrder = moveSectionToFront('visualizer', newOrder);
    } else if (normalized.includes('roadmap') || normalized.includes('process')) {
      newOrder = moveSectionToFront('roadmap', newOrder);
    } else if (normalized.includes('contact') || normalized.includes('hire')) {
      newOrder = moveSectionToFront('contact', newOrder);
    } else if (normalized.includes('reset')) {
      newOrder = ['hero', 'promo', 'services', 'leadgen', 'visualizer', 'roadmap', 'contact'];
    }

    setSectionOrder(newOrder);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const moveSectionToFront = (id: SectionId, currentOrder: SectionId[]): SectionId[] => {
    const filtered = currentOrder.filter(item => item !== id);
    return [id, ...filtered];
  };

  const renderSection = (id: SectionId) => {
    switch (id) {
      case 'hero': return <TerminalHero key="hero" />;
      case 'services': return <SolutionGrid key="services" />;
      case 'leadgen': return <POCPlayground key="leadgen" />;
      case 'visualizer': return <RAGVisualizer key="visualizer" />;
      case 'roadmap': return <StrategicRoadmap key="roadmap" />;
      case 'promo': return <ConsultationBanner key="promo" />;
      case 'contact': return <AgenticContact key="contact" />;
      default: return null;
    }
  };

  return (
    <div className="bg-cyber-black min-h-screen relative overflow-x-hidden">
      <LivingCommandBar onIntent={handleIntent} />

      <main className="relative pt-24 md:pt-32 pb-12">
        <Reorder.Group axis="y" values={sectionOrder} onReorder={setSectionOrder} className="list-none flex flex-col gap-0 md:gap-4">
          {sectionOrder.map(id => (
            <Reorder.Item key={id} value={id} className="outline-none">
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ layout: { duration: 0.6, type: "spring", bounce: 0.2 } }}
              >
                {renderSection(id)}
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </main>

      <footer className="py-12 md:py-24 px-6 md:px-20 border-t border-white/5 bg-cyber-black relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 md:mb-6">Autonomous <span className="text-cyber-blue">Dominance</span>.</div>
            <p className="text-slate-500 font-mono text-[9px] md:text-[10px] uppercase max-w-sm leading-relaxed">Scaling intelligence at the edge. CAPT specializes in bespoke cognitive architecture for Tier-1 enterprise operations.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-6">Internal_Nodes</h4>
              <ul className="space-y-3 font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                <li><button onClick={() => handleIntent('reset')} className="hover:text-white transition-colors">System_Reset</button></li>
                <li><a href="https://github.com/captflag" target="_blank" className="hover:text-white transition-colors">GitHub_Logs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-6">Encrypted_Comms</h4>
              <ul className="space-y-3 font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                <li><a href="mailto:divyanshd666@gmail.com" className="hover:text-white transition-colors">Protocol_Mail</a></li>
                <li><a href="https://www.linkedin.com/in/divyansh-dewangan-aa8aa721b/" target="_blank" className="hover:text-white transition-colors">LinkedIn_Secure</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 md:mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-mono text-slate-700 uppercase tracking-widest">
          <div className="text-center md:text-left">© 2026 CAPT_AI_SYSTEMS. HAPTIC_ENGINE_V2_ACTIVE.</div>
          <div className="flex gap-4 md:gap-8 opacity-50">
            <span>Lat: 37.7749° N</span>
            <span>Long: 122.4194° W</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
