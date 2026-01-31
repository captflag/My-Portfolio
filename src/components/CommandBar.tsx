
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Search, Command, Zap, MoveUp, HelpCircle } from 'lucide-react';
import { sfx } from '../services/audioService';

interface CommandBarProps {
  onIntent: (intent: string) => void;
}

const CommandBar: React.FC<CommandBarProps> = ({ onIntent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => {
          if (!prev) sfx.play('glitch');
          return !prev;
        });
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    sfx.play('success');
    onIntent(input.toLowerCase());
    setFeedback(`System re-ordered for: "${input}"`);
    setInput('');
    setTimeout(() => {
      setFeedback('');
      setIsOpen(false);
    }, 1500);
  };

  return (
    <>
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => sfx.play('hover')}
          onClick={() => {
            sfx.play('glitch');
            setIsOpen(true);
          }}
          className="glass px-6 py-3 rounded-full flex items-center gap-3 border border-cyber-blue/20 hover:border-cyber-blue/50 transition-all shadow-2xl haptic-pulse"
        >
          <Command size={16} className="text-cyber-blue" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white border border-white/10">⌘K</kbd> to Command</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-cyber-black/80 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,243,255,0.1)]"
              onClick={e => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit} className="relative p-6 bg-cyber-dark/50">
                <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-cyber-blue" size={20} />
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                    sfx.play('typing');
                  }}
                  placeholder="Tell the architect your intent... (e.g., 'Show me how you build RAG')"
                  className="w-full bg-cyber-grey/50 border border-white/5 rounded-xl py-4 pl-16 pr-6 focus:outline-none focus:border-cyber-blue transition-all font-mono text-sm text-white"
                />
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Services', 'Leads', 'Cases', 'Tech', 'Contact', 'Logic'].map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onMouseEnter={() => sfx.play('hover')}
                      onClick={() => {
                        sfx.play('click');
                        setInput(tag);
                      }}
                      className="px-3 py-1 bg-white/5 hover:bg-cyber-blue/10 border border-white/5 hover:border-cyber-blue/30 rounded-md text-[9px] uppercase tracking-widest transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-cyber-blue text-[10px] font-mono uppercase tracking-tighter"
                  >
                    <Zap size={12} className="inline mr-2 animate-pulse" /> {feedback}
                  </motion.div>
                )}
              </form>

              <div className="p-4 bg-cyber-black/40 border-t border-white/5">
                <div className="flex justify-between items-center text-[9px] text-slate-600 font-mono uppercase">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><MoveUp size={10} /> Navigate</span>
                    <span className="flex items-center gap-1"><kbd className="bg-white/5 px-1 rounded">↵</kbd> Execute Intent</span>
                  </div>
                  <HelpCircle size={14} className="opacity-50 hover:opacity-100 cursor-pointer" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandBar;
