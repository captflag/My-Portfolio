
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Search, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { generateLeadInsights } from '../services/geminiService';
import { Insight } from '../types';

const POCPlayground: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<Insight[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setInsights(null);

    try {
      const data = await generateLeadInsights(url);
      setInsights(data);
    } catch (err) {
      setError("FAILED_TO_SCRAPE_TARGET. Verify URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 md:px-20 bg-[#050505] border-y border-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Terminal className="text-[#00f3ff]" />
          <h2 className="text-2xl font-bold uppercase tracking-widest">POC_Playground: Lead_Gen_Agent</h2>
        </div>

        <div className="glass rounded-2xl p-8 border-[#00f3ff]/20">
          <p className="text-slate-400 mb-8 text-sm">
            Input any business URL. Our agent will perform a mock deep-scrape and provide 3 business intelligence insights in real-time.
          </p>

          <form onSubmit={handleScrape} className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example-saas.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-4 pl-12 pr-4 focus:outline-none focus:border-[#00f3ff] text-sm font-mono text-slate-200"
              />
            </div>
            <button
              disabled={loading}
              className="bg-[#00f3ff] text-black font-bold uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? "Analyzing..." : "Analyze_Now"}
            </button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="p-4 bg-red-950/30 border border-red-900 rounded-lg flex items-center gap-3 text-red-400 text-xs font-mono mb-6"
              >
                <AlertCircle className="w-4 h-4" /> {error}
              </motion.div>
            )}

            {insights && (
              <div className="grid md:grid-cols-3 gap-4">
                {insights.map((insight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-[#00f3ff]/30 transition-all"
                  >
                    <div className="text-[10px] text-[#00f3ff] font-mono mb-2 uppercase tracking-widest">Insight_0{idx+1}</div>
                    <h4 className="text-xs font-bold text-slate-200 mb-2 uppercase">{insight.topic}</h4>
                    <p className="text-sm text-slate-400 mb-4">{insight.value}</p>
                    <div className="pt-3 border-t border-slate-800">
                      <div className="text-[9px] text-slate-500 uppercase mb-1">Proposed_Strategy</div>
                      <p className="text-xs text-slate-300 italic">"{insight.strategy}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {!insights && !loading && !error && (
            <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-900 rounded-xl">
              <p className="text-slate-600 text-xs uppercase tracking-widest">Awaiting_Target_Data...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default POCPlayground;
