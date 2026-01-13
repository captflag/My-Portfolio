
import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import TerminalHero from './components/TerminalHero';
import SolutionGrid from './components/SolutionGrid';
import RAGVisualizer from './components/RAGVisualizer';
import StrategicRoadmap from './components/StrategicRoadmap';
import AgenticContact from './components/AgenticContact';
import ConsultationBanner from './components/ConsultationBanner';
import CommandBar from './components/CommandBar';
import { LivingCommandBar } from './components/LivingCommandBar';

type SectionId = 'hero' | 'promo' | 'services' | 'visualizer' | 'roadmap' | 'contact';

const App: React.FC = () => {
  const [sectionOrder, setSectionOrder] = useState<SectionId[]>([
    'hero',
    'promo',
    'services',
    'visualizer',
    'roadmap',
    'contact'
  ]);

  // Detect if user is on a touch device
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleIntent = (intent: string) => {
    // Basic intent matching to re-order sections
    let newOrder = [...sectionOrder];

    if (intent.includes('service') || intent.includes('work') || intent.includes('case')) {
      newOrder = moveSectionToFront('services', newOrder);
    } else if (intent.includes('rag') || intent.includes('visual') || intent.includes('logic')) {
      newOrder = moveSectionToFront('visualizer', newOrder);
    } else if (intent.includes('roadmap') || intent.includes('process') || intent.includes('step') || intent.includes('how')) {
      newOrder = moveSectionToFront('roadmap', newOrder);
    } else if (intent.includes('contact') || intent.includes('hire') || intent.includes('build') || intent.includes('free') || intent.includes('consult')) {
      newOrder = moveSectionToFront('promo', newOrder);
      newOrder = moveSectionToFront('contact', newOrder);
    } else if (intent.includes('reset')) {
      newOrder = ['hero', 'promo', 'services', 'visualizer', 'roadmap', 'contact'];
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
      case 'visualizer': return <RAGVisualizer key="visualizer" />;
      case 'roadmap': return <StrategicRoadmap key="roadmap" />;
      case 'promo': return <ConsultationBanner key="promo" />;
      case 'contact': return <AgenticContact key="contact" />;
      default: return null;
    }
  };

  return (
    <div className="bg-cyber-black min-h-screen relative">
      <LivingCommandBar onIntent={handleIntent} />

      <main className="relative pt-32">
        {isTouchDevice ? (
          // Mobile: Simple scrollable list without reordering
          <div className="list-none">
            {sectionOrder.map(id => (
              <motion.div
                key={id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {renderSection(id)}
              </motion.div>
            ))}
          </div>
        ) : (
          // Desktop: Reorderable sections
          <Reorder.Group axis="y" values={sectionOrder} onReorder={setSectionOrder} className="list-none">
            {sectionOrder.map(id => (
              <Reorder.Item key={id} value={id}>
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
        )}
      </main>

      <CommandBar onIntent={handleIntent} />

      <footer className="py-24 px-6 md:px-20 border-t border-white/5 bg-cyber-black relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="text-3xl font-bold uppercase tracking-tighter mb-6">Autonomous <span className="text-cyber-blue">Dominance</span>.</div>
            <p className="text-slate-500 font-mono text-[10px] uppercase max-w-sm leading-relaxed">Scaling intelligence at the edge. CAPT specializes in bespoke cognitive architecture for Tier-1 enterprise operations.</p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-6">Internal_Nodes</h4>
            <ul className="space-y-3 font-mono text-[9px] text-slate-500 uppercase tracking-widest">
              <li><button onClick={() => handleIntent('reset')} className="hover:text-white transition-colors">System_Reset</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Knowledge_Base</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security_Audits</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-6">Encrypted_Comms</h4>
            <ul className="space-y-3 font-mono text-[9px] text-slate-500 uppercase tracking-widest">
              <li><a href="#" className="hover:text-white transition-colors">Twitter_X_Feed</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub_Logs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Protocol_Mail</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-mono text-slate-700 uppercase tracking-widest">
          <div>© 2026 CAPT_AI_SYSTEMS. HAPTIC_ENGINE_V2_ACTIVE.</div>
          <div className="flex gap-8 opacity-50">
            <span>Lat: 37.7749° N</span>
            <span>Long: 122.4194° W</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
