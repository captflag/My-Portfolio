
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  X, 
  Cpu, 
  Zap, 
  Search, 
  MessageSquare, 
  Database,
  Activity,
  TrendingUp,
  GitBranch,
  ArrowRight,
  ShieldCheck,
  Code,
  UserCheck
} from 'lucide-react';
import { sfx } from '../services/audioService';

const PROTOCOLS = [
  {
    id: 'ai-int',
    title: 'Zero-Latency Core Integration',
    code: 'INT_ORCH_V5',
    description: 'Engineering deep-core cognitive layers that resolve in <50ms with 99.9% uptime.',
    advantage: 'Non-Invasive Architecture',
    icon: Cpu,
    colSpan: 'md:col-span-2',
    caseStudy: 'Optimized knowledge retrieval for a ₹1.6B ARR Fintech SaaS, slashing resolution time by 42%.',
    metric: '₹4.2M saved/mo',
    logicSteps: ['Source Hook', 'Buffer Layer', 'Neural Reroute', 'Kernel Output'],
    details: "Standard integrations suffer from token-latency. CAPT utilizes proprietary buffering and prompt-caching protocols to deliver instantaneous responses inside legacy environments."
  },
  {
    id: 'workflow',
    title: 'Autonomous Reasoning',
    code: 'AUTO_SEQ_NODE',
    description: 'Self-correcting agents that "think" through errors to reach production targets.',
    advantage: 'Agentic Self-Healing',
    icon: Zap,
    colSpan: 'md:col-span-1',
    caseStudy: 'Engineered an autonomous supply chain generating 200+ localized SEO articles daily with zero human touch.',
    metric: '90% OpEx Reduction',
    logicSteps: ['Goal Intake', 'Path Selection', 'Error Check', 'Execution'],
    details: "Most developers build rigid chains. CAPT builds Reasoning Graphs where agents autonomously handle edge cases without human intervention."
  },
  {
    id: 'lead-gen',
    title: 'Autonomous Lead Gen Engines',
    code: 'LEAD_FORCE_v3',
    description: 'Proprietary multi-agent systems that autonomously scout, verify, and qualify high-ticket prospects.',
    advantage: 'Verification Gating',
    icon: UserCheck,
    colSpan: 'md:col-span-1',
    caseStudy: 'Engineered a B2B sales machine that automated 92% of the discovery-to-meeting cycle for a YC startup.',
    metric: '₹22L pipeline/wk',
    logicSteps: ['Target Recon', 'Deep Scrape', 'Semantic Filtering', 'Lead Engage'],
    details: "Generic lead gen is dead. We build custom 'Lead Bots' that use semantic reasoning to find exact product-market fits, bypassing traditional gatekeepers with human-emulated behavior."
  },
  {
    id: 'chatbots',
    title: 'Persistent Memory Bots',
    code: 'CONV_NEURAL_v2',
    description: 'Bots that remember users for months, featuring full tool-calling capabilities.',
    advantage: 'State Management',
    icon: MessageSquare,
    colSpan: 'md:col-span-2',
    caseStudy: 'Custom multi-lingual agent handling 15,000 queries/month with a 98% CSAT score.',
    metric: '₹8.5L/mo Savings',
    logicSteps: ['Voice/Text In', 'Vector Recall', 'Context Match', 'Haptic Out'],
    details: "CAPT implements persistent vector-memory so your AI builds actual relationships with your customers over time."
  },
  {
    id: 'rag',
    title: 'Hallucination-Free RAG',
    code: 'VEC_RETRIEVE_S7',
    description: 'Military-grade grounding. 100% source attribution with zero-BS retrieval.',
    advantage: 'Zero-Error Gating',
    icon: Database,
    colSpan: 'md:col-span-3',
    caseStudy: 'High-fidelity RAG for medical documentation with strict adherence to HIPAA and source attribution.',
    metric: '100% Citation Accuracy',
    logicSteps: ['Chunking', 'Vector Embed', 'Top-K Retrieval', 'Fact Check'],
    details: "Standard RAG often invents answers. Our architecture forces the model to cite specific coordinate indices in your database."
  }
];

const LogicFlowVisual = ({ steps }: { steps: string[] }) => {
  return (
    <div className="flex flex-col gap-3 mt-6">
      <div className="text-[10px] font-mono text-cyber-blue uppercase tracking-widest mb-2 flex items-center gap-2">
        <GitBranch size={12} /> Execution_Logic_Flow
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
        {steps.map((step, i) => (
          <React.Fragment key={step}>
            <div className="shrink-0 p-3 bg-cyber-grey/20 border border-white/10 rounded-lg text-[9px] md:text-[10px] font-mono text-white/80 uppercase whitespace-nowrap">
              {step}
            </div>
            {i < steps.length - 1 && (
              <motion.div 
                animate={{ x: [0, 5, 0], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              >
                <ArrowRight size={14} className="text-cyber-blue" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ProtocolCard: React.FC<{ protocol: any; onExpand: (p: any) => void }> = ({ protocol, onExpand }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = protocol.icon;

  return (
    <motion.div
      layoutId={`card-${protocol.id}`}
      onMouseEnter={() => {
        setIsHovered(true);
        sfx.play('hover');
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        sfx.play('click');
        onExpand(protocol);
      }}
      className={`group relative overflow-hidden glass rounded-xl border border-white/5 hover:border-cyber-blue/50 p-6 flex flex-col transition-all duration-500 cursor-pointer ${protocol.colSpan} min-h-[250px] md:min-h-[300px]`}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,transparent_50%,#000_50%)] bg-[length:100%_4px]" />
      
      <div className="relative z-10 flex-1">
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center mb-1">
              <div className="text-[8px] md:text-[9px] font-mono text-cyber-blue flex items-center gap-2">
                <Activity size={10} className="animate-pulse" />
                ACTIVE
              </div>
              <div className="px-1.5 md:px-2 py-0.5 rounded bg-cyber-blue/20 border border-cyber-blue/40 text-[6px] md:text-[7px] font-bold text-cyber-blue uppercase tracking-widest">
                v5.0_CORE
              </div>
            </div>
            <h3 className="text-lg md:text-2xl font-black uppercase text-white tracking-tighter leading-none">
              {protocol.title}
            </h3>
          </div>
          <Icon className={`w-5 h-5 md:w-8 md:h-8 transition-all duration-500 ${isHovered ? 'text-cyber-blue scale-110 drop-shadow-[0_0_10px_rgba(201,41,36,0.6)]' : 'text-slate-600'}`} />
        </div>

        <div className="mb-3 md:mb-4 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 text-[7px] md:text-[8px] font-mono text-cyber-purple/80 uppercase tracking-widest">
           <ShieldCheck size={10} className="text-cyber-blue" />
           {protocol.advantage}
        </div>

        <p className="text-xs md:text-sm font-light text-cyber-purple/60 mb-6 leading-relaxed line-clamp-2 md:line-clamp-none">
          {protocol.description}
        </p>
      </div>

      <div className="mt-auto relative z-10 flex flex-col gap-3 md:gap-4">
        <div className="flex items-center justify-between text-[8px] md:text-[9px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-cyber-blue">
          <span>Success_Metric</span>
          <span className="text-white">{protocol.metric}</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-cyber-blue"
          />
        </div>
      </div>
    </motion.div>
  );
};

const SolutionGrid: React.FC = () => {
  const [expandedProtocol, setExpandedProtocol] = useState<any>(null);

  return (
    <section className="py-12 md:py-24 px-4 md:px-20 bg-cyber-black relative" id="protocols">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-cyber-blue/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8 md:mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8 gap-4 md:gap-6">
          <div>
            <div className="text-cyber-blue font-mono text-[9px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4">Strategic_Differentiators</div>
            <h2 className="text-2xl md:text-7xl font-sans font-black uppercase tracking-tighter leading-[0.95] md:leading-[0.9] text-white">
              Why CAPT AI<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple italic">Outperforms</span>
            </h2>
          </div>
          <div className="flex items-baseline gap-2 md:flex-col md:items-end">
            <div className="font-mono text-[8px] md:text-[10px] text-slate-500 uppercase tracking-widest">Aggregate_ROI</div>
            <div className="text-xl md:text-4xl font-black text-white">+314%</div>
          </div>
        </div>

        <LayoutGroup>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {PROTOCOLS.map((protocol) => (
              <ProtocolCard 
                key={protocol.id} 
                protocol={protocol} 
                onExpand={setExpandedProtocol} 
              />
            ))}
          </div>
        </LayoutGroup>
      </div>

      <AnimatePresence>
        {expandedProtocol && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-cyber-black/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setExpandedProtocol(null)}
          >
            <motion.div
              layoutId={`card-${expandedProtocol.id}`}
              className="glass w-full max-w-5xl max-h-[90vh] rounded-2xl md:rounded-3xl overflow-y-auto border border-cyber-blue/30 flex flex-col md:flex-row relative shadow-[0_0_100px_rgba(201,41,36,0.2)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_bottom,transparent_50%,#fff_50%)] bg-[length:100%_4px]" />

              <button 
                onClick={() => setExpandedProtocol(null)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-cyber-blue/20 rounded-full transition-all text-white z-50 haptic-pulse"
              >
                <X size={18} />
              </button>

              <div className="w-full md:w-3/5 p-6 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 relative z-10">
                <div className="text-cyber-blue font-mono text-[9px] md:text-xs uppercase mb-4 flex items-center gap-2">
                  <Code size={12} /> {expandedProtocol.code}
                </div>
                <h3 className="text-2xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-[1] md:leading-[0.9]">
                  {expandedProtocol.title}
                </h3>
                
                <div className="mb-6 md:mb-8 p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/5">
                   <div className="text-[9px] md:text-[10px] font-bold uppercase text-cyber-blue mb-2">Proven_Impact</div>
                   <p className="text-base md:text-xl text-white font-medium leading-snug">
                     {expandedProtocol.caseStudy}
                   </p>
                </div>

                <p className="text-sm md:text-lg text-cyber-purple/60 font-light mb-6 md:mb-8 leading-relaxed">
                  {expandedProtocol.details}
                </p>

                <LogicFlowVisual steps={expandedProtocol.logicSteps} />
              </div>

              <div className="w-full md:w-2/5 bg-cyber-dark p-8 md:p-12 relative overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="absolute inset-0 micro-grid opacity-20" />
                
                <div className="relative z-10 w-full">
                   <div className="mb-8 md:mb-12">
                      <div className="text-cyber-blue font-mono text-[9px] uppercase mb-1">Efficiency_Target</div>
                      <div className="text-4xl md:text-7xl font-black text-white tracking-tighter">99.9%</div>
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Uptime_Guaranteed</div>
                   </div>

                   <div className="text-xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight">Initial Recon</div>
                   <div className="text-5xl md:text-8xl font-black text-cyber-blue mb-8 animate-glitch tracking-tighter italic leading-none">FREE</div>
                   
                   <button 
                      onMouseEnter={() => sfx.play('hover')}
                      onClick={() => {
                         sfx.play('success');
                         setExpandedProtocol(null);
                         setTimeout(() => {
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                         }, 300);
                      }}
                      className="w-full py-4 md:py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-cyber-blue hover:text-white transition-all rounded-lg md:rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] haptic-pulse"
                   >
                      Initialize_Protocol
                   </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SolutionGrid;
