
import React from 'react';
import { motion } from 'framer-motion';

const NODES = [
  { name: 'OpenAI', x: 20, y: 30, size: 60, color: 'bg-emerald-500' },
  { name: 'Anthropic', x: 70, y: 20, size: 50, color: 'bg-orange-500' },
  { name: 'n8n', x: 40, y: 70, size: 70, color: 'bg-rose-500' },
  { name: 'Pinecone', x: 80, y: 60, size: 45, color: 'bg-cyber-blue' },
  { name: 'LangGraph', x: 10, y: 80, size: 55, color: 'bg-cyber-purple' },
  { name: 'Make', x: 50, y: 10, size: 40, color: 'bg-indigo-500' },
];

const KnowledgeGraph: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-cyber-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/3">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">Tech_Nexus</h2>
          <p className="text-slate-500 font-mono text-xs uppercase mb-8">Our integrated ecosystem of state-of-the-art AI tooling and vector orchestration.</p>
          <div className="flex flex-wrap gap-2">
            {NODES.map(node => (
              <span key={node.name} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold">{node.name}</span>
            ))}
          </div>
        </div>
        
        <div className="flex-1 aspect-video glass rounded-3xl relative overflow-hidden group">
          {/* Animated Background SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <pattern id="dotPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#fff" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>

          {/* Connections (Simplified) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {NODES.map((node, i) => (
              <motion.line 
                key={i}
                x1={`${node.x}%`} y1={`${node.y}%`}
                x2={`${NODES[(i + 1) % NODES.length].x}%`} y2={`${NODES[(i + 1) % NODES.length].y}%`}
                stroke="rgba(0, 243, 255, 0.1)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
            ))}
          </svg>

          {NODES.map((node, i) => (
            <motion.div
              key={node.name}
              className={`absolute ${node.color} rounded-xl flex items-center justify-center text-white font-bold text-[10px] uppercase tracking-tighter shadow-2xl z-10 p-2 cursor-pointer border border-white/20`}
              style={{ 
                left: `${node.x}%`, 
                top: `${node.y}%`,
                width: node.size,
                height: node.size
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.2, zIndex: 50 }}
            >
              <div className="bg-black/40 absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center p-1 text-center">
                {node.name}
              </div>
              <span className="pointer-events-none">{node.name[0]}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeGraph;
