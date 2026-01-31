
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { getAgenticStep } from '../services/geminiService';
import { ChatMessage } from '../types';

const AgenticForm: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'agent', content: "SYSTEM: INITIALIZING_ONBOARDING_AGENT... Hello. I'm the qualifying bot for Nexus AI. What technical project are you looking to architect?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const response = await getAgenticStep([...messages, { role: 'user', content: userMsg }]);
      setMessages(prev => [...prev, { role: 'agent', content: response || "Understood. Please continue." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'agent', content: "NETWORK_ERROR. Please retry or contact hello@nexus.ai directly." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="py-24 px-6 md:px-20 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3">
          <h2 className="text-3xl font-bold uppercase tracking-tighter mb-6">Start_Project</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Our agent will qualify your technical needs and draft an initial strategy. This is more than a form; it's the start of your implementation.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-slate-500 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Agent_Active
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
              <div className="text-[10px] text-[#00f3ff] uppercase mb-1">Response_Time</div>
              <div className="text-lg font-mono">&lt; 200ms</div>
            </div>
          </div>
        </div>

        <div className="flex-1 glass rounded-2xl p-6 flex flex-col h-[500px]">
          <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 pr-4">
            {messages.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'agent' ? 'bg-[#00f3ff] text-black' : 'bg-slate-800 text-slate-200'}`}>
                  {m.role === 'agent' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-xl text-sm leading-relaxed ${m.role === 'agent' ? 'bg-slate-900 text-slate-200 rounded-tl-none border border-slate-800' : 'bg-[#00f3ff] text-black font-medium rounded-tr-none'}`}>
                  {m.content}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00f3ff] text-black flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="bg-slate-900 p-4 rounded-xl rounded-tl-none border border-slate-800 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-[#00f3ff]" />
                  <span className="text-[10px] uppercase text-slate-500 font-mono">Agent_Thinking...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your project goals..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-6 pr-14 focus:outline-none focus:border-[#00f3ff] text-sm text-slate-200 font-mono"
            />
            <button
              type="submit"
              disabled={isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#00f3ff] rounded-lg text-black flex items-center justify-center hover:bg-cyan-400 transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AgenticForm;
