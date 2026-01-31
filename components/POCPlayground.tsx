
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Search, Loader2, Sparkles, AlertCircle, Cpu, Target, ShieldAlert, Crosshair, Globe, CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import { generateLeadInsights, getCompetitorAnalysis } from '../services/geminiService';
import { Insight } from '../types';
import { sfx } from '../services/audioService';

const POCPlayground: React.FC = () => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'lead' | 'competitor'>('competitor');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Insight[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);
    setResults(null);
    sfx.play('glitch');

    try {
      let data: Insight[] = [];
      if (mode === 'lead') {
        data = await generateLeadInsights(query);
      } else {
        data = await getCompetitorAnalysis(query);
      }
      setResults(data);
      sfx.play('success');
    } catch (err) {
      setError(`EXECUTION_FAILED: System handshake interrupted. Please retry.`);
      sfx.play('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-24 px-6 md:px-20 bg-cyber-black relative overflow-hidden" id="leadgen">
      <div className="absolute inset-0 micro-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyber-blue/10 border border-cyber-blue/30 rounded-xl text-cyber-blue shadow-[0_0_20px_rgba(201,41,36,0.2)]">
              {mode === 'lead' ? <Target size={24} /> : <Crosshair size={24} className="animate-spin-slow" />}
            </div>
            <div>
              <div className="text-cyber-blue font-mono text-[10px] uppercase tracking-[0.4em] mb-1">Service_Node: WORKFLOW_ENGINE</div>
              <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter text-white">
                POC_Playground.
              </h2>
            </div>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button 
              onClick={() => { setMode('competitor'); setResults(null); setQuery(''); sfx.play('click'); }}
              className={`px-4 py-2 rounded-lg text-[9px] font-mono uppercase tracking-widest transition-all flex items-center gap-2 ${mode === 'competitor' ? 'bg-cyber-blue text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              <ShieldAlert size={12} /> Competitor_Audit
            </button>
            <button 
              onClick={() => { setMode('lead'); setResults(null); setQuery(''); sfx.play('click'); }}
              className={`px-4 py-2 rounded-lg text-[9px] font-mono uppercase tracking-widest transition-all flex items-center gap-2 ${mode === 'lead' ? 'bg-cyber-blue text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              <Zap size={12} /> Lead_Automation
            </button>
          </div>
        </div>

        <div className="glass rounded-[32px] p-8 md:p-12 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-blue/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="mb-10 max-w-3xl">
             <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg text-[10px] font-mono text-cyber-blue uppercase tracking-widest">
               <Zap size={12} className="animate-pulse" /> Strategic_Automation_Active
             </div>
             <p className="text-white text-lg md:text-3xl font-black uppercase tracking-tight leading-[1.1] mb-6">
                I engineer <span className="text-cyber-blue">Workflow Automations</span> that help companies generate and verify high-intent leads at scale.
             </p>
             <p className="text-cyber-purple/50 text-xs md:text-base font-light leading-relaxed">
              {mode === 'competitor' 
                ? "Input your brand name. I design automated intelligence workflows that identify your top 2 direct competitors and build a verified strategy to capture their market share."
                : "Input a target domain. This POC demonstrates a custom workflow that performs deep semantic crawls and multi-agent verification to deliver 100% verified prospects."
              }
             </p>
          </div>

          <form onSubmit={handleExecute} className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="flex-1 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-cyber-blue group-focus-within:scale-110 transition-transform" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={mode === 'competitor' ? "Your Company Name (e.g., SpaceX, Nike)" : "Target Prospect URL (e.g., competitor-site.com)"}
                className="w-full bg-cyber-dark/50 border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:border-cyber-blue transition-all font-mono text-sm text-white placeholder:text-slate-700"
              />
            </div>
            <button
              disabled={loading}
              onMouseEnter={() => sfx.play('hover')}
              className="bg-cyber-blue text-white font-black uppercase tracking-[0.2em] px-10 py-5 rounded-2xl hover:bg-white hover:text-black transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(201,41,36,0.3)] haptic-pulse whitespace-nowrap"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
              {loading ? "INITIALIZING_WORKFLOW..." : mode === 'competitor' ? "Audit_Competition" : "Generate_Verified_Leads"}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-5 bg-red-950/20 border border-cyber-blue/20 rounded-2xl flex items-center gap-4 text-cyber-blue text-xs font-mono mb-8"
              >
                <AlertCircle size={18} /> {error}
              </motion.div>
            )}

            {results ? (
              <div className="grid md:grid-cols-2 gap-8">
                {results.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className="p-8 bg-white/5 border border-white/5 rounded-[32px] hover:border-cyber-blue/30 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      {mode === 'lead' ? <CheckCircle2 size={80} className="text-cyber-blue" /> : <ShieldAlert size={80} className="text-cyber-blue" />}
                    </div>
                    
                    <div className="flex justify-between items-start mb-6">
                       <div className="text-[9px] text-cyber-blue font-mono uppercase tracking-[0.3em] flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse" />
                         {mode === 'competitor' ? `High_Threat_Target_0${idx+1}` : `Verified_Automation_Output_0${idx+1}`}
                       </div>
                       {mode === 'lead' && (
                         <div className="px-2 py-1 rounded bg-cyber-blue/20 border border-cyber-blue/40 text-[7px] font-bold text-cyber-blue uppercase tracking-widest flex items-center gap-1">
                           <CheckCircle2 size={10} /> 100%_VERIFIED
                         </div>
                       )}
                    </div>
                    
                    <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-cyber-blue transition-colors">
                      {item.topic}
                    </h4>
                    
                    <div className="mb-8">
                       <div className="text-[8px] text-slate-500 uppercase tracking-widest mb-2 font-bold">Workflow_Extraction_Log</div>
                       <p className="text-xs text-cyber-purple/50 leading-relaxed font-light">{item.value}</p>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <div className="text-[8px] text-cyber-blue uppercase tracking-widest mb-3 font-bold flex items-center gap-2">
                        <Cpu size={10} /> {mode === 'lead' ? 'Automated_Engagement' : 'Strategic_Disruption'}
                      </div>
                      <p className="text-xs text-white/90 italic font-mono leading-relaxed bg-cyber-blue/5 p-4 rounded-xl border border-cyber-blue/10">
                        "{item.strategy}"
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : !loading && (
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[32px] group hover:border-cyber-blue/20 transition-colors">
                <div className="relative mb-4">
                  <Target size={32} className="text-white/10 group-hover:text-cyber-blue/30 transition-colors" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-10px] border border-dashed border-white/5 rounded-full"
                  />
                </div>
                <p className="text-slate-600 text-[10px] uppercase tracking-[0.4em] font-mono">
                  {mode === 'competitor' ? 'Awaiting_Brand_Handshake...' : 'Awaiting_Workflow_Initialization...'}
                </p>
              </div>
            )}
          </AnimatePresence>

          <div className="mt-12 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-6">
                <div className="flex flex-col">
                   <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Success_Rate</div>
                   <div className="text-lg font-black text-white">99.2%</div>
                </div>
                <div className="w-[1px] h-8 bg-white/5" />
                <div className="flex flex-col">
                   <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Verification</div>
                   <div className="text-lg font-black text-cyber-blue">MULTI-AGENT</div>
                </div>
             </div>
             
             <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all"
             >
                Scale_This_Workflow <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default POCPlayground;
