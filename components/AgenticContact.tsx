
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { getAgenticStep } from '../services/geminiService';

const AgenticContact: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([
    { role: 'agent', content: "COMMAND_LOG: New deployment target identified. Hello, I'm the CAPT Onboarding Agent. What's your name?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const response = await getAgenticStep([...messages, { role: 'user', content: userMsg }]);
      setMessages(prev => [...prev, { role: 'agent', content: response || "Log received. Specify project scope." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'agent', content: "SYSTEM_ERR: Network collision detected. Please contact protocol@capt.ai." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-20 bg-cyber-dark relative">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter mb-6 md:mb-8 text-white">Launch_Agent</h2>
          <p className="text-cyber-purple/60 mb-8 md:mb-12 text-base md:text-lg max-w-md mx-auto lg:mx-0 font-light leading-relaxed">
            Initialize your autonomous workflow by starting a conversation with our project architect bot.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="flex items-center gap-4 p-4 glass rounded-xl border-white/5 bg-white/5">
              <div className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse shadow-[0_0_10px_rgba(201,41,36,0.8)] shrink-0"></div>
              <div className="text-left">
                <div className="text-[8px] font-mono uppercase tracking-[0.2em] text-slate-400">Security</div>
                <div className="text-[10px] text-white/80 font-mono">AES-256_ACTIVE</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 glass rounded-xl border-white/5 bg-white/5">
              <div className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse shadow-[0_0_10px_rgba(201,41,36,0.8)] shrink-0"></div>
              <div className="text-left">
                <div className="text-[8px] font-mono uppercase tracking-[0.2em] text-slate-400">Node_Routing</div>
                <div className="text-[10px] text-white/80 font-mono">SECURE_AGENTIC</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col h-[500px] md:h-[600px] border-cyber-blue/20 relative overflow-hidden">
          <div className="absolute inset-0 micro-grid pointer-events-none opacity-10" />
          
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 md:pr-4 custom-scrollbar relative z-10">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 md:gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg shrink-0 flex items-center justify-center ${m.role === 'agent' ? 'bg-cyber-blue/20 border border-cyber-blue/30 text-cyber-blue' : 'bg-cyber-purple/20 border border-cyber-purple/30 text-cyber-purple'}`}>
                  {m.role === 'agent' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl max-w-[85%] text-xs md:text-sm leading-relaxed ${m.role === 'agent' ? 'bg-white/5 text-slate-300 border border-white/5' : 'bg-cyber-blue text-white font-bold shadow-[0_0_20px_rgba(201,41,36,0.3)]'}`}>
                  {m.content}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-cyber-blue/20 flex items-center justify-center"><Bot size={16} className="text-cyber-blue animate-pulse" /></div>
                <div className="bg-white/5 p-3 rounded-xl flex gap-1 items-center border border-white/5">
                  <div className="w-1 h-1 bg-cyber-blue rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-cyber-blue rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSend} className="relative mt-auto z-10">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Transmit specs..."
              className="w-full bg-cyber-black/50 border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 px-4 md:px-6 focus:outline-none focus:border-cyber-blue font-mono text-xs md:text-sm text-white placeholder:text-slate-600"
            />
            <button className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 p-2 bg-cyber-blue text-white rounded-lg hover:scale-105 shadow-[0_0_15px_rgba(201,41,36,0.4)]">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AgenticContact;
