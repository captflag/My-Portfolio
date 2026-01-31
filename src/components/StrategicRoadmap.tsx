
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Layers, 
  Rocket, 
  ShieldCheck, 
  ArrowRight, 
  FileSearch,
  CheckCircle2,
  Clock
} from 'lucide-react';

const PHASES = [
  {
    id: '01',
    title: 'Strategic Recon',
    subtitle: 'Discovery & Audit',
    description: 'Deep-dive analysis of your current stack and business bottlenecks to identify high-ROI AI integration points.',
    deliverables: ['Tech Stack Audit', 'Feasibility Report', 'Strategic Roadmap'],
    icon: FileSearch,
    color: 'border-cyber-blue',
    status: 'Ready_for_Intel'
  },
  {
    id: '02',
    title: 'Neural Architecture',
    subtitle: 'System Design',
    description: 'Designing bespoke Agentic workflows and RAG data structures tailored to your specific enterprise knowledge base.',
    deliverables: ['Agent Flowcharts', 'Vector DB Schema', 'API Documentation'],
    icon: Layers,
    color: 'border-cyber-purple',
    status: 'Logic_Gating'
  },
  {
    id: '03',
    title: 'Heavy Deployment',
    subtitle: 'Production Build',
    description: 'Engineering the infrastructure. We move from sandbox to high-concurrency production environments with strict security protocols.',
    deliverables: ['Production LLM Bridge', 'Autonomous Agents', 'Custom Dashboard'],
    icon: Rocket,
    color: 'border-white',
    status: 'Engine_Start'
  },
  {
    id: '04',
    title: 'Command & Control',
    subtitle: 'Optimization & Scaling',
    description: 'Post-launch monitoring and iterative fine-tuning to ensure maximum accuracy and system reliability under load.',
    deliverables: ['24/7 Monitoring', 'Accuracy Fine-tuning', 'Scaling Protocol'],
    icon: ShieldCheck,
    color: 'border-cyber-blue',
    status: 'Global_Watch'
  }
];

const RoadmapPhase: React.FC<{ phase: typeof PHASES[0], index: number }> = ({ phase, index }) => {
  const Icon = phase.icon;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative flex flex-col lg:flex-row gap-6 md:gap-8 mb-16 lg:mb-16 group"
    >
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-[-64px] w-px bg-white/5 -translate-x-1/2 group-last:hidden" />
      
      <div className={`flex-1 flex flex-col ${index % 2 === 0 ? 'lg:items-end lg:text-right' : 'lg:order-last lg:items-start lg:text-left'}`}>
        <div className="flex items-center lg:justify-end gap-3 mb-2 font-mono text-[9px] md:text-[10px] text-cyber-blue uppercase tracking-widest">
          <Icon size={12} className="shrink-0" />
          Phase_{phase.id} // {phase.status}
        </div>
        <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter mb-3">{phase.title}</h3>
        <p className="text-cyber-purple/60 text-xs md:text-base max-w-sm leading-relaxed mb-6">
          {phase.description}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-start lg:justify-center shrink-0 mb-4 lg:mb-0">
        <motion.div 
          className={`w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl glass border-2 ${phase.color} flex items-center justify-center text-white bg-cyber-black shadow-[0_0_20px_rgba(201,41,36,0.2)]`}
        >
          <span className="font-mono text-base md:text-xl font-black italic">{phase.id}</span>
        </motion.div>
        <div className="lg:hidden h-px flex-1 bg-white/10 ml-4" />
      </div>

      <div className={`flex-1 p-4 md:p-6 glass rounded-xl md:rounded-2xl border-white/5 bg-white/5 transition-all duration-500 group-hover:border-cyber-blue/30 ${index % 2 === 0 ? 'lg:order-last' : 'lg:order-first'}`}>
        <div className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
          <Target size={12} />
          Deliverables
        </div>
        <ul className="space-y-2 md:space-y-3">
          {phase.deliverables.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-[9px] md:text-xs font-mono text-white/80">
              <CheckCircle2 size={10} className="text-cyber-blue shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const StrategicRoadmap: React.FC = () => {
  const handleConnectLinkedIn = () => {
    window.open('https://www.linkedin.com/in/divyansh-dewangan-aa8aa721b/', '_blank');
  };

  return (
    <section className="py-12 md:py-24 px-6 md:px-20 bg-cyber-black relative overflow-hidden" id="roadmap">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b border-white/5 pb-8 md:pb-12">
          <div>
            <div className="text-cyber-blue font-mono text-[9px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 flex items-center gap-3">
              <div className="w-8 md:w-12 h-[1px] bg-cyber-blue" />
              Service_Protocol
            </div>
            <h2 className="text-3xl md:text-7xl font-sans font-black uppercase tracking-tighter text-white leading-[0.95] md:leading-none">
              The Deployment<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple italic">Lifecycle</span>
            </h2>
          </div>
          <div className="text-left md:text-right">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-2 md:gap-3 md:ml-auto text-[10px] md:text-xs font-bold uppercase tracking-widest text-cyber-blue hover:text-white transition-all"
            >
              Start_Engagement <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="relative mt-8 md:mt-20">
          {PHASES.map((phase, idx) => (
            <RoadmapPhase key={phase.id} phase={phase} index={idx} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 md:mt-12 p-6 md:p-12 glass rounded-2xl md:rounded-3xl border-cyber-blue/20 bg-gradient-to-br from-cyber-blue/10 to-transparent text-center"
        >
          <h4 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight mb-4 md:mb-6">Initialize protocol?</h4>
          <button 
            onClick={handleConnectLinkedIn}
            className="w-full sm:w-auto px-8 md:px-10 py-4 bg-cyber-blue text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-[0_0_30px_rgba(201,41,36,0.3)] haptic-pulse"
          >
            Connect_Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default StrategicRoadmap;
