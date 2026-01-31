
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Paperclip, Globe, Cpu, Zap, Maximize2, X, Terminal, Loader2, Search } from 'lucide-react';
import { startAgentSession, streamAgentResponse } from '../services/geminiService';
import { sfx } from '../services/audioService';

interface Message {
  role: 'user' | 'agent';
  content: string;
  isStreaming?: boolean;
  grounding?: any[];
  images?: string[];
  isSearching?: boolean;
}

const NeuralLogPanel = ({ logs }: { logs: string[] }) => (
  <div className="hidden xl:flex flex-col w-64 border-l border-white/5 bg-black/20 p-4 font-mono text-[9px] uppercase tracking-wider overflow-hidden">
    <div className="flex items-center gap-2 text-cyber-blue mb-4 border-b border-cyber-blue/20 pb-2">
      <Cpu size={12} className="animate-spin-slow" />
      <span>Latency_Log</span>
    </div>
    <div className="space-y-3 opacity-40">
      {logs.map((log, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, x: 10 }} 
          animate={{ opacity: 1, x: 0 }}
          className="border-l border-white/10 pl-2"
        >
          {log}
        </motion.div>
      ))}
    </div>
  </div>
);

const AgenticContact: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'agent', content: "SYSTEM_ONLINE: Low-latency handshake established. Operational Mode: DIRECT. How can I assist?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedImages, setAttachedImages] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>(["KERNEL_READY", "DIRECT_MODE_ACTIVE", "LATENCY_SUB_500MS"]);
  
  const chatInstance = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatInstance.current = startAgentSession();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImages(prev => [...prev, reader.result as string]);
        setLogs(prev => [`FILE_SCAN: ${file.name}`, ...prev]);
        sfx.play('success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && attachedImages.length === 0) || isTyping) return;

    const userContent = input;
    const currentImages = [...attachedImages];
    
    setMessages(prev => [...prev, { role: 'user', content: userContent, images: currentImages }]);
    setInput('');
    setAttachedImages([]);
    setIsTyping(true);
    sfx.play('click');
    setLogs(prev => ["MODE: DETECTING", ...prev]);

    try {
      const imageParts = currentImages.map(img => ({
        inlineData: {
          data: img.split(',')[1],
          mimeType: 'image/png'
        }
      }));

      const stream = await streamAgentResponse(userContent || "Analyze visual data.", chatInstance.current, imageParts);
      
      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'agent', content: "", isStreaming: true }]);

      for await (const chunk of stream) {
        const text = chunk.text;
        if (text) {
          if (text.includes("SEARCH:")) {
             setLogs(prev => ["MODE: SEARCHING", "BYPASSING_DIRECT", ...prev]);
             setMessages(prev => {
                const n = [...prev];
                n[n.length-1].isSearching = true;
                return n;
             });
          }
          fullResponse += text;
          setMessages(prev => {
            const newMsgs = [...prev];
            newMsgs[newMsgs.length - 1] = { 
              role: 'agent', 
              content: fullResponse, 
              isStreaming: true,
              grounding: chunk.candidates?.[0]?.groundingMetadata?.groundingChunks 
            };
            return newMsgs;
          });
          if (Math.random() > 0.8) sfx.play('typing');
        }
      }

      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].isStreaming = false;
        return newMsgs;
      });
      setLogs(prev => ["MODE: IDLE", "CACHE_UPDATED", ...prev]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'agent', content: "CORE_FAILURE: Shard unreachable." }]);
      sfx.play('error');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-24 px-4 md:px-20 bg-cyber-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <div className="text-cyber-blue font-mono text-[10px] uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
              <Zap size={12} className="animate-pulse" />
              Direct_Link: Gemini_3_Flash
            </div>
            <h2 className="text-4xl md:text-7xl font-sans font-black uppercase tracking-tighter text-white">
              Low_Latency.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-6 text-white/20 font-mono text-[10px] uppercase tracking-widest">
            <div className="flex items-center gap-2"><Globe size={14} className="text-cyber-blue" /> Router: ACTIVE</div>
            <div className="flex items-center gap-2"><Cpu size={14} className="text-cyber-blue" /> Latency: &lt;1s</div>
          </div>
        </div>

        <div className="glass rounded-[32px] overflow-hidden border border-white/5 flex flex-col md:flex-row shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative">
          <div className="flex-1 flex flex-col h-[600px] md:h-[700px] bg-black/40 relative">
            <div className="absolute inset-0 micro-grid opacity-10 pointer-events-none" />
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth custom-scrollbar relative z-10">
              <AnimatePresence mode="popLayout">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center border ${m.role === 'agent' ? 'bg-cyber-blue/10 border-cyber-blue/30 text-cyber-blue' : 'bg-white/5 border-white/10 text-white'}`}>
                      {m.role === 'agent' ? <Bot size={20} /> : <User size={20} />}
                    </div>
                    
                    <div className={`flex flex-col gap-2 max-w-[85%] ${m.role === 'user' ? 'items-end' : ''}`}>
                      {m.images && m.images.length > 0 && (
                        <div className="flex gap-2 mb-2">
                          {m.images.map((img, idx) => (
                            <img key={idx} src={img} className="w-24 h-24 object-cover rounded-lg border border-white/10" alt="Upload" />
                          ))}
                        </div>
                      )}
                      
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'agent' ? 'bg-white/5 text-slate-300 border border-white/5 font-light' : 'bg-cyber-blue text-white font-bold'}`}>
                        {m.isSearching && (
                           <div className="flex items-center gap-2 text-cyber-blue font-mono text-[9px] mb-2 border-b border-cyber-blue/10 pb-2">
                             <Search size={10} className="animate-pulse" /> SEARCH_MODE_INITIALIZED
                           </div>
                        )}
                        <div className="whitespace-pre-wrap">{m.content}</div>
                        {m.isStreaming && !m.content && <Loader2 className="animate-spin opacity-40 h-4 w-4" />}
                        
                        {m.grounding && m.grounding.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                            {m.grounding.map((chunk, idx) => chunk.web && (
                              <a 
                                key={idx} 
                                href={chunk.web.uri} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[8px] px-1.5 py-0.5 rounded bg-cyber-blue/20 hover:bg-cyber-blue/40 transition-colors flex items-center gap-1 text-cyber-blue font-mono"
                              >
                                <Globe size={8} /> Source
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="p-4 bg-black/60 border-t border-white/5 relative z-20">
              <form onSubmit={handleSend} className="relative flex gap-2">
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-slate-400"
                >
                  <Paperclip size={18} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*"
                />
                
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about projects or news (Direct vs Search)..."
                    className="w-full bg-cyber-grey/20 border border-white/10 rounded-xl py-3 px-5 focus:outline-none focus:border-cyber-blue font-mono text-xs text-white placeholder:text-slate-600 transition-all"
                  />
                  <button className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-cyber-blue text-white rounded-lg hover:scale-105 disabled:opacity-50 transition-all">
                    {isTyping ? <Loader2 className="animate-spin h-4 w-4" /> : <Send size={14} />}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <NeuralLogPanel logs={logs} />
        </div>
      </div>
    </section>
  );
};

export default AgenticContact;
