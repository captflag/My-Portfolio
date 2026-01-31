
import React from 'react';

const Glow = ({ id, color }: { id: string; color: string }) => (
  <defs>
    <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
    </filter>
    <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor={color} stopOpacity="1" />
      <stop offset="100%" stopColor="#280b0b" stopOpacity="0.5" />
    </linearGradient>
  </defs>
);

export const RealisticCpu = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Glow id="cpu" color="#c92924" />
    <rect x="12" y="12" width="40" height="40" rx="4" fill="url(#cpu-grad)" fillOpacity="0.2" stroke="#c92924" strokeWidth="0.5" />
    <rect x="18" y="18" width="28" height="28" rx="2" fill="#1d0808" stroke="#f9e7c9" strokeWidth="1" strokeOpacity="0.3" />
    <path d="M24 24H40V40H24V24Z" fill="#c92924" fillOpacity="0.1" />
    <path d="M12 20H8M12 32H8M12 44H8M52 20H56M52 32H56M52 44H56M20 12V8M32 12V8M44 12V8M20 52V56M32 52V56M44 52V56" stroke="#c92924" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="32" r="6" fill="#c92924" filter="url(#cpu-blur)" />
    <circle cx="32" cy="32" r="3" fill="#f9e7c9" />
  </svg>
);

export const RealisticZap = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Glow id="zap" color="#f9e7c9" />
    <path d="M38 4L14 36H30L26 60L50 28H34L38 4Z" fill="url(#zap-grad)" fillOpacity="0.3" stroke="#f9e7c9" strokeWidth="1" />
    <path d="M38 4L14 36H30L26 60L50 28H34L38 4Z" stroke="#c92924" strokeWidth="2" strokeLinejoin="round" filter="url(#zap-blur)" />
    <circle cx="30" cy="36" r="2" fill="white" />
  </svg>
);

export const RealisticSearch = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Glow id="search" color="#c92924" />
    <circle cx="28" cy="28" r="20" stroke="#c92924" strokeWidth="2" />
    <circle cx="28" cy="28" r="16" fill="url(#search-grad)" fillOpacity="0.1" />
    <path d="M44 44L56 56" stroke="#f9e7c9" strokeWidth="4" strokeLinecap="round" />
    <path d="M20 28H36M28 20V36" stroke="#f9e7c9" strokeWidth="0.5" strokeOpacity="0.5" />
    <rect x="22" y="22" width="12" height="12" stroke="#c92924" strokeWidth="0.5" strokeDasharray="2 2" />
  </svg>
);

export const RealisticMessage = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Glow id="msg" color="#c92924" />
    <path d="M52 12H12C9.8 12 8 13.8 8 16V40C8 42.2 9.8 44 12 44H44L56 56V16C56 13.8 54.2 12 52 12Z" fill="url(#msg-grad)" fillOpacity="0.2" stroke="#c92924" strokeWidth="1" />
    <rect x="16" y="20" width="24" height="2" rx="1" fill="#f9e7c9" fillOpacity="0.6" />
    <rect x="16" y="28" width="32" height="2" rx="1" fill="#f9e7c9" fillOpacity="0.6" />
    <rect x="16" y="36" width="16" height="2" rx="1" fill="#f9e7c9" fillOpacity="0.6" />
    <circle cx="48" cy="20" r="4" fill="#c92924" filter="url(#msg-blur)" />
  </svg>
);

export const RealisticDatabase = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Glow id="db" color="#c92924" />
    <ellipse cx="32" cy="16" rx="20" ry="8" fill="url(#db-grad)" fillOpacity="0.4" stroke="#c92924" strokeWidth="1" />
    <path d="M12 16V28C12 32.4 21 36 32 36C43 36 52 32.4 52 28V16" stroke="#c92924" strokeWidth="1" />
    <path d="M12 28V40C12 44.4 21 48 32 48C43 48 52 44.4 52 40V28" stroke="#c92924" strokeWidth="1" />
    <ellipse cx="32" cy="16" rx="8" ry="3" fill="#f9e7c9" filter="url(#db-blur)" fillOpacity="0.5" />
    <path d="M32 20V44" stroke="#f9e7c9" strokeWidth="0.5" strokeDasharray="2 4" strokeOpacity="0.4" />
  </svg>
);
