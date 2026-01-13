
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, ShieldCheck, ArrowRight, Calendar } from 'lucide-react';

const ConsultationBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(124); // Simulated active nodes countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 1 ? prev - 1 : 124));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 md:py-12 px-4 md:px-20 bg-cyber-black overflow-hidden" id="consultation">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass rounded-3xl md:rounded-[40px] border-2 border-cyber-blue/30 p-6 md:p-16 overflow-hidden flex flex-col lg:flex-row items-center gap-8 md:gap-12"
        >
          {/* Background visuals */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-cyber-blue/5 skew-x-12 translate-x-1/4 pointer-events-none" />
          <div className="absolute inset-0 micro-grid opacity-10 pointer-events-none" />

          <div className="flex-1 relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue text-[10px] md:text-[11px] uppercase tracking-[0.2em] mb-4 md:mb-6 font-mono">
              <Clock size={14} className="animate-pulse" />
              Slot_Availability: {Math.floor(timeLeft / 10)}/12 Open
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-sans font-black uppercase tracking-tighter text-white mb-4 md:mb-6 leading-[0.9]">
              Strategic Recon <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple animate-glitch">Session_Free</span>
            </h2>
            <p className="text-base md:text-xl text-cyber-purple/60 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed mb-6 md:mb-10">
              Spend 30 minutes with our lead architect to identify your highest-impact automation targets. No strings, just pure technical roadmap.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 mb-4">
              <div className="flex items-center gap-3 text-white/70 font-mono text-[10px] md:text-xs uppercase tracking-widest">
                <ShieldCheck size={16} className="text-cyber-blue" />
                Full Stack Audit
              </div>
              <div className="flex items-center gap-3 text-white/70 font-mono text-[10px] md:text-xs uppercase tracking-widest">
                <Zap size={16} className="text-cyber-blue" />
                ROI Forecast
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center lg:items-end gap-4 md:gap-6 w-full lg:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group w-full lg:w-[400px] py-6 md:py-8 min-h-[56px] bg-cyber-blue text-white rounded-2xl md:rounded-3xl flex flex-col items-center justify-center shadow-[0_0_50px_rgba(201,41,36,0.3)] transition-all hover:bg-white hover:text-black border border-cyber-blue/50 haptic-pulse"
            >
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-mono mb-1 opacity-70">Initialize_Protocol</span>
              <span className="text-xl md:text-2xl font-black uppercase tracking-tight flex items-center gap-2 md:gap-3">
                Claim Free Session <ArrowRight size={22} className="md:w-6 md:h-6" />
              </span>
            </motion.button>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group w-full lg:w-[400px] py-4 md:py-6 min-h-[52px] border border-white/10 hover:border-cyber-blue bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center gap-4 transition-all hover:bg-white/10"
            >
              <Calendar size={20} className="text-cyber-blue group-hover:animate-bounce" />
              <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-white">Book a Meeting</span>
            </button>

            <div className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em]">
              Valued at ₹38,000 // SECURE_ACCESS
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultationBanner;
