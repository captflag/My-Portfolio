
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Search, MessageSquare, Database, ArrowUpRight } from 'lucide-react';
import { ServiceCard } from '../types';

const SERVICES: ServiceCard[] = [
  {
    id: 'ai-int',
    title: 'AI Integration',
    description: 'Embedding deep learning models into complex existing SaaS architectures.',
    icon: 'Cpu',
    tags: ['OpenAI', 'Gemini', 'Anthropic'],
    caseStudy: 'Optimized internal knowledge retrieval for a ₹1.6B ARR Fintech SaaS, reducing ticket resolution time by 42%.'
  },
  {
    id: 'workflow',
    title: 'Workflow Automations',
    description: 'Complex LangGraph & n8n sequences for autonomous ops.',
    icon: 'Zap',
    tags: ['n8n', 'Make', 'LangGraph'],
    caseStudy: 'Engineered an autonomous content supply chain that generates 200+ localized SEO articles daily.'
  },
  {
    id: 'lead-gen',
    title: 'Lead Gen Agents',
    description: 'AI agents that find, verify, and qualify leads at massive scale.',
    icon: 'Search',
    tags: ['Agents', 'Scraping', 'CRM'],
    caseStudy: 'Built a multi-agent system that automated 90% of a B2B sales development cycle for a YC-backed startup.'
  },
  {
    id: 'chatbots',
    title: 'Conversational UI',
    description: 'Human-like bots that actually solve user problems.',
    icon: 'MessageSquare',
    tags: ['Voice', 'Chat', 'UI'],
    caseStudy: 'Custom multi-lingual support agent handling 15,000 queries/month with a 98% CSAT score.'
  },
  {
    id: 'rag',
    title: 'RAG Systems',
    description: 'High-accuracy retrieval via Vector DBs and Semantic Search.',
    icon: 'Database',
    tags: ['Pinecone', 'Weaviate', 'Chroma'],
    caseStudy: 'Implemented high-fidelity RAG for medical documentation with strict adherence to HIPAA and source attribution.'
  }
];

const IconMap: any = {
  Cpu: <Cpu className="w-8 h-8 text-[#00f3ff]" />,
  Zap: <Zap className="w-8 h-8 text-[#00f3ff]" />,
  Search: <Search className="w-8 h-8 text-[#00f3ff]" />,
  MessageSquare: <MessageSquare className="w-8 h-8 text-[#00f3ff]" />,
  Database: <Database className="w-8 h-8 text-[#00f3ff]" />
};

const BentoGrid: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-[#050505]">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-4">Core_Capabilities</h2>
        <div className="h-1 w-20 bg-[#00f3ff]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SERVICES.map((s, idx) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`group relative p-8 glass rounded-2xl overflow-hidden cursor-default transition-all duration-500 hover:border-[#00f3ff]/50 
              ${idx === 0 ? 'md:col-span-2' : ''} 
              ${idx === 4 ? 'md:col-span-2' : ''}`}
          >
            <div className="mb-6 relative z-10">{IconMap[s.icon]}</div>
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-3 relative z-10">{s.title}</h3>
            <p className="text-slate-400 mb-6 relative z-10 max-w-sm">{s.description}</p>
            
            <div className="flex flex-wrap gap-2 relative z-10">
              {s.tags.map(tag => (
                <span key={tag} className="text-[10px] px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 uppercase tracking-widest">{tag}</span>
              ))}
            </div>

            {/* Hover Content: Mini Case Study */}
            <div className="absolute inset-0 bg-[#050505] translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-8 flex flex-col justify-center">
              <div className="text-[#00f3ff] text-xs uppercase tracking-[0.2em] mb-4">Case_Study_Snippet</div>
              <p className="text-lg font-medium text-slate-200 leading-tight mb-6">{s.caseStudy}</p>
              <button className="flex items-center gap-2 text-sm text-[#00f3ff] font-bold uppercase hover:underline">
                View Full Logic Flow <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;
