import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FieldTool } from '../hooks/useData';
import { X, ExternalLink, ArrowRight, Trophy, Medal, Award, Check, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

const IsoCube = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />
    <polygon points="50,35 75,47.5 50,60 25,47.5" fill="#222" stroke="#333" strokeWidth="0.5" />
    <polygon points="25,47.5 50,60 50,85 25,72.5" fill="#111" stroke="#222" strokeWidth="0.5" />
    <polygon points="50,60 75,47.5 75,72.5 50,85" fill="#0a0a0a" stroke="#111" strokeWidth="0.5" />
    <line x1="50" y1="35" x2="50" y2="15" stroke={color} strokeWidth="4" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
    <line x1="25" y1="72.5" x2="10" y2="80" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px #f43f5e)` }} />
    <line x1="75" y1="72.5" x2="90" y2="80" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px #3b82f6)` }} />
  </svg>
);

const IsoStack = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <linearGradient id={`stack-grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor={color} stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />
    <polygon points="50,70 80,85 50,100 20,85" fill="#0a0a0a" stroke="#222" strokeWidth="1" />
    <polygon points="20,75 50,90 80,75 50,60" fill="#111" stroke="#333" strokeWidth="1" />
    <polygon points="50,55 80,70 50,85 20,70" fill="#111" stroke="#222" strokeWidth="1" />
    <polygon points="20,60 50,75 80,60 50,45" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
    <polygon points="50,40 80,55 50,70 20,55" fill={color} opacity="0.3" />
    <polygon points="20,45 50,60 80,45 50,30" fill={`url(#stack-grad-${color.replace('#', '')})`} style={{ filter: `drop-shadow(0 0 12px ${color})` }} />
  </svg>
);

const IsoMagnifyingGlass = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <radialGradient id={`mag-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.5" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`lens-grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor={color} stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />
    
    <ellipse cx="50" cy="80" rx="35" ry="15" fill={`url(#mag-glow-${color.replace('#', '')})`} />

    {/* Base Document/Data */}
    <g transform="translate(0, 10)">
      <polygon points="25,55 50,70 75,55 50,40" fill="#0a0a0a" stroke="#222" strokeWidth="1" />
      <polygon points="25,50 50,65 75,50 50,35" fill="#111" stroke="#333" strokeWidth="1" />
      {/* Data lines on document */}
      <line x1="35" y1="45" x2="45" y2="51" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="42" y1="41" x2="62" y2="53" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="49" y1="37" x2="59" y2="43" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </g>

    {/* Floating Data Nodes being synthesized */}
    <g stroke={color} strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
      <circle cx="35" cy="40" r="1.5" fill="#fff" />
      <circle cx="65" cy="35" r="1.5" fill="#fff" />
      <circle cx="50" cy="25" r="2" fill="#fff" />
      <line x1="35" y1="40" x2="45" y2="35" strokeDasharray="2 2" opacity="0.6" />
      <line x1="65" y1="35" x2="55" y2="30" strokeDasharray="2 2" opacity="0.6" />
      <line x1="50" y1="25" x2="50" y2="35" strokeDasharray="2 2" opacity="0.6" />
    </g>

    {/* Magnifying Glass Handle */}
    <g style={{ filter: `drop-shadow(0 0 6px rgba(0,0,0,0.5))` }}>
      {/* Handle bottom */}
      <polygon points="65,65 70,68 85,58 80,55" fill="#111" stroke="#222" strokeWidth="1" />
      {/* Handle side */}
      <polygon points="70,68 70,72 85,62 85,58" fill="#050505" />
      {/* Handle top */}
      <polygon points="65,65 70,72 85,62 80,55" fill="#1a1a1a" />
    </g>

    {/* Magnifying Glass Frame */}
    <g style={{ filter: `drop-shadow(0 0 8px rgba(0,0,0,0.5))` }}>
      {/* Outer Frame Thickness */}
      <ellipse cx="50" cy="50" rx="22" ry="14" fill="#0a0a0a" stroke="#111" strokeWidth="1" />
      <ellipse cx="50" cy="48" rx="22" ry="14" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
      {/* Inner Frame */}
      <ellipse cx="50" cy="48" rx="18" ry="11" fill="#050505" stroke="#222" strokeWidth="1" />
    </g>

    {/* Magnifying Glass Lens */}
    <ellipse cx="50" cy="47" rx="17" ry="10" fill={`url(#lens-grad-${color.replace('#', '')})`} style={{ filter: `drop-shadow(0 0 10px ${color})` }} />
    
    {/* Lens Reflection */}
    <path d="M 38,44 Q 50,38 60,46" fill="none" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 4px #fff)` }} />
    
    {/* Synthesized glowing core inside lens */}
    <circle cx="50" cy="47" r="3" fill="#fff" style={{ filter: `drop-shadow(0 0 8px #fff)` }} />
    <circle cx="50" cy="47" r="1" fill="#fff" />
  </svg>
);

const IsoDocument = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <radialGradient id={`doc-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.5" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`page-grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor={color} stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />

    <ellipse cx="50" cy="80" rx="35" ry="15" fill={`url(#doc-glow-${color.replace('#', '')})`} />

    {/* Bottom Page (Shadow/Base) */}
    <g transform="translate(0, 15)">
      <polygon points="25,45 50,60 75,45 50,30" fill="#0a0a0a" stroke="#111" strokeWidth="1" />
      <polygon points="25,40 50,55 75,40 50,25" fill="#111" stroke="#222" strokeWidth="1" />
    </g>

    {/* Middle Page */}
    <g transform="translate(0, 5)">
      <polygon points="25,45 50,60 75,45 50,30" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
      <polygon points="25,40 50,55 75,40 50,25" fill="#222" stroke="#444" strokeWidth="1" />
    </g>

    {/* Top Glowing Page */}
    <g transform="translate(0, -5)" style={{ filter: `drop-shadow(0 0 10px ${color})` }}>
      {/* Page Thickness */}
      <polygon points="25,45 50,60 75,45 50,30" fill="#111" stroke="#222" strokeWidth="1" />
      {/* Page Surface */}
      <polygon points="25,40 50,55 75,40 50,25" fill={`url(#page-grad-${color.replace('#', '')})`} stroke={color} strokeWidth="1" />
      
      {/* Glowing Text Lines */}
      <g stroke="#fff" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 4px #fff)` }}>
        {/* Header */}
        <line x1="45" y1="32" x2="65" y2="44" strokeWidth="2.5" />
        {/* Paragraph 1 */}
        <line x1="38" y1="36" x2="68" y2="54" />
        <line x1="35" y1="39" x2="60" y2="54" />
        <line x1="32" y1="42" x2="50" y2="53" />
      </g>
      
      {/* Blinking Cursor / Edit Point */}
      <line x1="52" y1="51" x2="52" y2="55" stroke="#fff" strokeWidth="2" style={{ filter: `drop-shadow(0 0 6px #fff)` }} />
    </g>

    {/* Floating Stylus / Pen */}
    <g style={{ filter: `drop-shadow(0 0 8px rgba(0,0,0,0.6))` }}>
      {/* Pen Shadow */}
      <polygon points="65,25 70,30 55,45 50,40" fill="#050505" opacity="0.5" />
      {/* Pen Body */}
      <polygon points="65,20 70,25 55,40 50,35" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
      <polygon points="70,25 72,22 57,37 55,40" fill="#222" />
      <polygon points="65,20 72,22 57,37 50,35" fill="#111" />
      {/* Pen Tip */}
      <polygon points="50,35 55,40 48,45" fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      <polygon points="48,45 50,35 52,38" fill="#fff" opacity="0.8" />
    </g>
    
    {/* Floating Sparkles/Refinements */}
    <g fill="#fff" style={{ filter: `drop-shadow(0 0 4px #fff)` }}>
      <circle cx="70" cy="20" r="1.5" />
      <circle cx="75" cy="30" r="1" />
      <circle cx="45" cy="25" r="1.5" />
    </g>
  </svg>
);

const IsoCodeScreen = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <radialGradient id={`code-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />
    
    {/* Base shadow/glow */}
    <ellipse cx="50" cy="85" rx="30" ry="10" fill={`url(#code-glow-${color.replace('#', '')})`} />

    {/* Screen Back/Thickness */}
    <polygon points="15,25 55,45 55,75 15,55" fill="#0a0a0a" stroke="#111" strokeWidth="1" />
    <polygon points="15,25 55,45 60,50 20,30" fill="#222" stroke="#333" strokeWidth="1" />
    <polygon points="55,45 60,50 60,80 55,75" fill="#050505" stroke="#111" strokeWidth="1" />
    
    {/* Screen Front */}
    <polygon points="20,30 60,50 60,80 20,60" fill="#111" stroke="#333" strokeWidth="1" />
    
    {/* Code Lines */}
    <line x1="25" y1="38" x2="40" y2="45.5" stroke={color} strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    <line x1="25" y1="44" x2="50" y2="56.5" stroke={color} strokeWidth="1.5" opacity="0.7" />
    <line x1="30" y1="52.5" x2="55" y2="65" stroke={color} strokeWidth="1.5" opacity="0.5" />
    <line x1="25" y1="56" x2="35" y2="61" stroke="#f43f5e" strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 4px #f43f5e)` }} />
    <line x1="25" y1="62" x2="45" y2="72" stroke={color} strokeWidth="1.5" opacity="0.9" />
    
    {/* Floating Bracket < /> */}
    <g style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
      <path d="M70,45 L65,47.5 L70,50" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M75,42.5 L70,52.5" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M75,47.5 L80,50 L75,52.5" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

const IsoTranscript = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <linearGradient id={`trans-grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor={color} stopOpacity="0.2" />
      </linearGradient>
      <radialGradient id={`trans-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />
    
    <ellipse cx="50" cy="80" rx="35" ry="15" fill={`url(#trans-glow-${color.replace('#', '')})`} />

    {/* Base Document (Transcript) */}
    <polygon points="15,62.5 50,80 50,85 15,67.5" fill="#050505" stroke="#111" strokeWidth="1" />
    <polygon points="50,80 85,62.5 85,67.5 50,85" fill="#0a0a0a" stroke="#111" strokeWidth="1" />
    <polygon points="50,45 85,62.5 50,80 15,62.5" fill="#111" stroke="#333" strokeWidth="1" />
    
    {/* Lines on Base Document */}
    <line x1="25" y1="62.5" x2="55" y2="47.5" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="30" y1="65" x2="65" y2="47.5" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="35" y1="67.5" x2="75" y2="47.5" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="40" y1="70" x2="60" y2="60" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />

    {/* Connecting Arrow */}
    <line x1="50" y1="60" x2="50" y2="45" stroke={color} strokeWidth="2" strokeDasharray="2 2" opacity="0.8" />
    <polygon points="47,48 50,42 53,48" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />

    {/* Top Document (Summary) */}
    <polygon points="30,30 50,40 50,43 30,33" fill={color} opacity="0.6" />
    <polygon points="50,40 70,30 70,33 50,43" fill={color} opacity="0.3" />
    <polygon points="50,20 70,30 50,40 30,30" fill={`url(#trans-grad-${color.replace('#', '')})`} stroke={color} strokeWidth="1" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
    
    {/* Lines on Top Document */}
    <line x1="38" y1="31" x2="55" y2="22.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
    <line x1="42" y1="33" x2="62" y2="23" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
    <line x1="46" y1="35" x2="56" y2="30" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />

    {/* Speech Bubble */}
    <g style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
      <path d="M 65,30 L 85,40 L 85,55 L 75,50 L 70,55 L 70,47.5 L 65,45 Z" fill="#111" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="70" y1="37.5" x2="80" y2="42.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="70" y1="41.5" x2="78" y2="45.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
);

const IsoDataViz = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <linearGradient id={`data-grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor={color} stopOpacity="0.2" />
      </linearGradient>
      <radialGradient id={`data-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />

    <ellipse cx="50" cy="80" rx="35" ry="15" fill={`url(#data-glow-${color.replace('#', '')})`} />

    {/* Base Grid Plane */}
    <polygon points="10,60 50,80 90,60 50,40" fill="none" stroke="#ffffff10" strokeWidth="1" />
    <polygon points="20,65 50,80 80,65 50,50" fill="none" stroke="#ffffff10" strokeWidth="1" />
    <polygon points="30,70 50,80 70,70 50,60" fill="none" stroke="#ffffff10" strokeWidth="1" />

    {/* Bar 1 (Left) */}
    <polygon points="25,62.5 35,67.5 35,77.5 25,72.5" fill="#111" />
    <polygon points="35,67.5 45,62.5 45,72.5 35,77.5" fill="#0a0a0a" />
    <polygon points="25,62.5 35,57.5 45,62.5 35,67.5" fill={`url(#data-grad-${color.replace('#', '')})`} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />

    {/* Bar 2 (Middle, Tallest) */}
    <polygon points="40,50 50,55 50,75 40,70" fill="#111" />
    <polygon points="50,55 60,50 60,70 50,75" fill="#0a0a0a" />
    <polygon points="40,50 50,45 60,50 50,55" fill={`url(#data-grad-${color.replace('#', '')})`} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />

    {/* Bar 3 (Right) */}
    <polygon points="55,57.5 65,62.5 65,72.5 55,67.5" fill="#111" />
    <polygon points="65,62.5 75,57.5 75,67.5 65,72.5" fill="#0a0a0a" />
    <polygon points="55,57.5 65,52.5 75,57.5 65,62.5" fill={`url(#data-grad-${color.replace('#', '')})`} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />

    {/* Floating Trend Line */}
    <path d="M35,45 L50,30 L65,40 L85,20" fill="none" stroke={color} strokeWidth="2.5" style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
    
    {/* Data Nodes on Trend Line */}
    <circle cx="35" cy="45" r="3" fill="#fff" style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    <circle cx="50" cy="30" r="3" fill="#fff" style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    <circle cx="65" cy="40" r="3" fill="#fff" style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    <circle cx="85" cy="20" r="3" fill="#fff" style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
  </svg>
);

const IsoMedia = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <linearGradient id={`media-grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor={color} stopOpacity="0.2" />
      </linearGradient>
      <radialGradient id={`media-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />

    <ellipse cx="50" cy="80" rx="35" ry="15" fill={`url(#media-glow-${color.replace('#', '')})`} />

    {/* Base Canvas / Tablet */}
    <polygon points="10,50 50,70 90,50 50,30" fill="#0a0a0a" stroke="#222" strokeWidth="1" />
    <polygon points="10,50 50,70 50,75 10,55" fill="#111" stroke="#333" strokeWidth="1" />
    <polygon points="50,70 90,50 90,55 50,75" fill="#050505" stroke="#111" strokeWidth="1" />
    
    {/* Screen Inner */}
    <polygon points="15,50 50,67.5 85,50 50,32.5" fill="#111" stroke="#222" strokeWidth="1" />

    {/* Image / Photo Element (Left) */}
    <g transform="translate(-5, -5)">
      <polygon points="25,45 45,55 60,47.5 40,37.5" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
      <polygon points="28,45.5 43,53 55,47 40,39.5" fill="#050505" />
      {/* Mountains */}
      <polygon points="30,48 35,40 42,51" fill={`url(#media-grad-${color.replace('#', '')})`} opacity="0.8" />
      <polygon points="36,50 43,42 52,46.5" fill={`url(#media-grad-${color.replace('#', '')})`} opacity="0.6" />
      {/* Sun */}
      <ellipse cx="45" cy="41" rx="2.5" ry="1.5" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    </g>

    {/* Video / Play Button (Center-Right) */}
    <g transform="translate(10, 5)">
      <polygon points="45,55 45,67 55,61" fill={color} style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
      <polygon points="45,55 45,67 50,64" fill="#fff" opacity="0.3" />
    </g>

    {/* Audio / Waveform (Top-Right) */}
    <g transform="translate(5, -10)" style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
      <line x1="60" y1="45" x2="60" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="65" y1="40" x2="65" y2="57" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="35" x2="70" y2="60" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="75" y1="42" x2="75" y2="58" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="80" y1="48" x2="80" y2="54" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

const IsoTranslate = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <radialGradient id={`trans-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />

    <ellipse cx="50" cy="80" rx="35" ry="15" fill={`url(#trans-glow-${color.replace('#', '')})`} />

    {/* Right Bubble (Language B) - Back */}
    <g style={{ filter: `drop-shadow(0 0 6px #ffffff)` }}>
      <path d="M 50,40 L 80,25 L 80,45 L 70,50 L 65,60 L 65,52.5 L 50,60 Z" fill="#111" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" opacity="0.9" />
      <line x1="57" y1="42" x2="73" y2="34" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="57" y1="47" x2="67" y2="42" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Left Bubble (Language A) - Front */}
    <g style={{ filter: `drop-shadow(0 0 8px ${color})` }}>
      <path d="M 15,45 L 45,60 L 45,80 L 35,75 L 25,85 L 25,70 L 15,65 Z" fill="#0a0a0a" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="22" y1="54" x2="38" y2="62" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="59" x2="32" y2="64" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Exchange Arrows */}
    <g style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
      {/* Arrow L->R */}
      <line x1="40" y1="45" x2="52" y2="39" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="49,38 54,38 51,42" fill={color} />
      
      {/* Arrow R->L */}
      <line x1="60" y1="65" x2="48" y2="71" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="51,72 46,72 49,68" fill="#ffffff" />
    </g>
  </svg>
);

const IsoIdea = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <radialGradient id={`idea-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.5" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`bulb-grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor={color} stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />

    <ellipse cx="50" cy="80" rx="35" ry="15" fill={`url(#idea-glow-${color.replace('#', '')})`} />

    {/* Base/Socket */}
    <polygon points="40,65 50,70 60,65 50,60" fill="#222" stroke="#333" strokeWidth="1" />
    <polygon points="40,65 50,70 50,75 40,70" fill="#0a0a0a" stroke="#111" strokeWidth="1" />
    <polygon points="50,70 60,65 60,70 50,75" fill="#111" stroke="#222" strokeWidth="1" />
    
    <polygon points="42,72 50,76 58,72 50,68" fill="#1a1a1a" />
    <polygon points="42,72 50,76 50,79 42,75" fill="#050505" />
    <polygon points="50,76 58,72 58,75 50,79" fill="#0a0a0a" />

    {/* Bulb Glass */}
    <path d="M 50,20 C 75,20 75,45 60,55 L 60,60 L 50,65 L 40,60 L 40,55 C 25,45 25,20 50,20 Z" fill={`url(#bulb-grad-${color.replace('#', '')})`} stroke={color} strokeWidth="1" opacity="0.9" style={{ filter: `drop-shadow(0 0 10px ${color})` }} />
    
    {/* Filament */}
    <path d="M 45,60 L 45,45 L 40,40 L 50,35 L 60,40 L 55,45 L 55,60" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 6px #fff)` }} />
    <circle cx="50" cy="35" r="2" fill="#fff" style={{ filter: `drop-shadow(0 0 8px #fff)` }} />

    {/* Idea Sparks / Nodes */}
    <g stroke={color} strokeWidth="1.5" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
      {/* Top */}
      <line x1="50" y1="15" x2="50" y2="5" />
      <circle cx="50" cy="5" r="2" fill="#fff" />
      
      {/* Top Right */}
      <line x1="70" y1="25" x2="80" y2="15" />
      <circle cx="80" cy="15" r="2" fill="#fff" />
      
      {/* Right */}
      <line x1="75" y1="40" x2="88" y2="40" />
      <circle cx="88" cy="40" r="2" fill="#fff" />
      
      {/* Top Left */}
      <line x1="30" y1="25" x2="20" y2="15" />
      <circle cx="20" cy="15" r="2" fill="#fff" />
      
      {/* Left */}
      <line x1="25" y1="40" x2="12" y2="40" />
      <circle cx="12" cy="40" r="2" fill="#fff" />
    </g>
  </svg>
);

const IsoWorkflow = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <radialGradient id={`flow-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.5" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />

    <ellipse cx="50" cy="80" rx="35" ry="15" fill={`url(#flow-glow-${color.replace('#', '')})`} />

    {/* Path/Track */}
    <path d="M 20,60 L 80,30" stroke={color} strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />

    {/* Step 1 (Bottom Left) */}
    <g>
      <polygon points="20,60 30,55 40,60 30,65" fill={color} opacity="0.7" />
      <polygon points="20,60 30,65 30,75 20,70" fill="#0a0a0a" stroke={color} strokeWidth="0.5" />
      <polygon points="30,65 40,60 40,70 30,75" fill="#111" stroke={color} strokeWidth="0.5" />
      <circle cx="30" cy="60" r="2" fill="#fff" opacity="0.8" />
    </g>

    {/* Step 2 (Center) */}
    <g>
      <polygon points="40,50 50,45 60,50 50,55" fill={color} opacity="0.9" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
      <polygon points="40,50 50,55 50,65 40,60" fill="#0a0a0a" stroke={color} strokeWidth="0.5" />
      <polygon points="50,55 60,50 60,60 50,65" fill="#111" stroke={color} strokeWidth="0.5" />
      {/* Gear/Process icon on top */}
      <circle cx="50" cy="50" r="3" fill="#fff" style={{ filter: `drop-shadow(0 0 4px #fff)` }} />
      <path d="M 47,50 L 53,50 M 50,47 L 50,53 M 48,48 L 52,52 M 48,52 L 52,48" stroke="#fff" strokeWidth="1" />
    </g>

    {/* Step 3 (Top Right) */}
    <g>
      <polygon points="60,40 70,35 80,40 70,45" fill={color} opacity="1" style={{ filter: `drop-shadow(0 0 10px ${color})` }} />
      <polygon points="60,40 70,45 70,55 60,50" fill="#0a0a0a" stroke={color} strokeWidth="0.5" />
      <polygon points="70,45 80,40 80,50 70,55" fill="#111" stroke={color} strokeWidth="0.5" />
      <path d="M 67,40 L 69,42 L 74,37" fill="none" stroke="#fff" strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 4px #fff)` }} />
    </g>

    {/* Connecting Arrows */}
    <g stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 4px #fff)` }}>
      {/* Arrow 1 -> 2 */}
      <line x1="35" y1="57.5" x2="43" y2="53.5" />
      <polygon points="40,53 44,53 42,56" fill="#fff" />
      {/* Arrow 2 -> 3 */}
      <line x1="55" y1="47.5" x2="63" y2="43.5" />
      <polygon points="60,43 64,43 62,46" fill="#fff" />
    </g>
  </svg>
);

const IsoCalendar = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <radialGradient id={`cal-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />

    <ellipse cx="50" cy="80" rx="35" ry="15" fill={`url(#cal-glow-${color.replace('#', '')})`} />

    {/* Envelope (Back/Bottom) */}
    <g>
      {/* Back flap */}
      <polygon points="20,60 50,45 80,60" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
      {/* Envelope Body */}
      <polygon points="20,60 50,75 80,60 50,45" fill="#0a0a0a" />
      {/* Thickness */}
      <polygon points="20,60 50,75 50,80 20,65" fill="#050505" />
      <polygon points="50,75 80,60 80,65 50,80" fill="#111" />
      {/* Front Flaps */}
      <polygon points="20,60 50,75 80,60 50,65" fill="#111" stroke="#222" strokeWidth="1" />
      <polygon points="20,60 50,65 80,60" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
    </g>

    {/* Calendar (Front/Top) */}
    <g transform="translate(0, -15)" style={{ filter: `drop-shadow(0 0 10px rgba(0,0,0,0.5))` }}>
      {/* Thickness */}
      <polygon points="30,50 50,60 50,65 30,55" fill="#0a0a0a" stroke="#111" strokeWidth="1" />
      <polygon points="50,60 80,45 80,50 50,65" fill="#111" stroke="#222" strokeWidth="1" />
      
      {/* Page */}
      <polygon points="30,50 60,35 80,45 50,60" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
      
      {/* Header */}
      <polygon points="30,50 40,45 60,55 50,60" fill={color} opacity="0.9" style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      
      {/* Grid Lines */}
      <line x1="40" y1="45" x2="70" y2="30" stroke="#333" strokeWidth="1" />
      <line x1="45" y1="47.5" x2="75" y2="32.5" stroke="#333" strokeWidth="1" />
      
      <line x1="45" y1="42.5" x2="65" y2="52.5" stroke="#333" strokeWidth="1" />
      <line x1="50" y1="40" x2="70" y2="50" stroke="#333" strokeWidth="1" />
      <line x1="55" y1="37.5" x2="75" y2="47.5" stroke="#333" strokeWidth="1" />

      {/* Highlighted Day / Checkmark */}
      <polygon points="50,45 55,42.5 60,45 55,47.5" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
      <path d="M 53,45 L 55,47 L 58,43" fill="none" stroke="#fff" strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 2px #fff)` }} />

      {/* Binder Rings */}
      <path d="M 35,47.5 C 35,44 38,42 38,45" fill="none" stroke="#fff" strokeWidth="1.5" />
      <path d="M 45,42.5 C 45,39 48,37 48,40" fill="none" stroke="#fff" strokeWidth="1.5" />
      <path d="M 55,37.5 C 55,34 58,32 58,35" fill="none" stroke="#fff" strokeWidth="1.5" />
    </g>
  </svg>
);

const IsoSlides = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <radialGradient id={`slides-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.5" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`slides-grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor={color} stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />

    <ellipse cx="50" cy="85" rx="35" ry="15" fill={`url(#slides-glow-${color.replace('#', '')})`} />

    {/* Projector Screen Stand */}
    <line x1="50" y1="55" x2="50" y2="80" stroke="#333" strokeWidth="2" strokeLinecap="round" />
    <line x1="50" y1="80" x2="40" y2="88" stroke="#222" strokeWidth="2" strokeLinecap="round" />
    <line x1="50" y1="80" x2="60" y2="88" stroke="#222" strokeWidth="2" strokeLinecap="round" />
    <line x1="50" y1="80" x2="50" y2="92" stroke="#111" strokeWidth="2" strokeLinecap="round" />
    
    {/* Screen Base Tube */}
    <polygon points="15,72.5 85,37.5 85,42.5 15,77.5" fill="#111" stroke="#222" strokeWidth="1" />
    <polygon points="15,72.5 85,37.5 85,39.5 15,74.5" fill="#1a1a1a" />

    {/* Screen Canvas */}
    <g style={{ filter: `drop-shadow(0 0 10px ${color})` }}>
      <polygon points="20,70 80,40 80,15 20,45" fill="#0a0a0a" stroke={color} strokeWidth="1" />
      <polygon points="20,70 80,40 80,15 20,45" fill={`url(#slides-grad-${color.replace('#', '')})`} opacity="0.8" />
      
      {/* Slide Content */}
      {/* Title */}
      <line x1="25" y1="45" x2="45" y2="35" stroke="#fff" strokeWidth="2" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 4px #fff)` }} />
      
      {/* Chart */}
      <polygon points="30,60 35,57.5 35,62.5 30,65" fill="#fff" opacity="0.6" />
      <polygon points="40,52 45,49.5 45,57.5 40,60" fill="#fff" opacity="0.8" />
      <polygon points="50,40 55,37.5 55,52.5 50,55" fill="#fff" opacity="1" style={{ filter: `drop-shadow(0 0 4px #fff)` }} />
      
      {/* Image/Box */}
      <polygon points="60,45 75,37.5 75,25 60,32.5" fill="#fff" opacity="0.2" stroke="#fff" strokeWidth="0.5" />
      <circle cx="67.5" cy="35" r="2" fill="#fff" opacity="0.8" />
    </g>
  </svg>
);

const IsoLearning = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <radialGradient id={`learn-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.5" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`learn-grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor={color} stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />

    <ellipse cx="50" cy="80" rx="35" ry="15" fill={`url(#learn-glow-${color.replace('#', '')})`} />

    {/* Book Cover (Bottom) */}
    <polygon points="20,55 50,70 80,55 50,40" fill="#0a0a0a" stroke="#111" strokeWidth="1" />
    <polygon points="20,55 50,70 50,75 20,60" fill="#050505" />
    <polygon points="50,70 80,55 80,60 50,75" fill="#111" />

    {/* Left Pages */}
    <polygon points="22,53 48,66 48,71 22,58" fill="#1a1a1a" />
    <polygon points="22,53 48,66 48,50 22,37" fill="#222" stroke="#333" strokeWidth="1" />
    
    {/* Right Pages */}
    <polygon points="52,66 78,53 78,58 52,71" fill="#111" />
    <polygon points="52,66 78,53 78,37 52,50" fill="#1a1a1a" stroke="#333" strokeWidth="1" />

    {/* Spine Base */}
    <polygon points="48,66 50,68 52,66 52,71 50,73 48,71" fill="#050505" />

    {/* Top Glowing Pages */}
    <g style={{ filter: `drop-shadow(0 0 8px ${color})` }}>
      {/* Left Glowing Page */}
      <polygon points="22,48 48,61 48,45 22,32" fill={`url(#learn-grad-${color.replace('#', '')})`} stroke={color} strokeWidth="1" opacity="0.9" />
      {/* Right Glowing Page */}
      <polygon points="52,61 78,48 78,32 52,45" fill={`url(#learn-grad-${color.replace('#', '')})`} stroke={color} strokeWidth="1" opacity="0.9" />
      {/* Glowing Spine */}
      <polygon points="48,61 50,63 52,61 52,45 50,47 48,45" fill={color} opacity="0.5" />
    </g>

    {/* Text lines on pages */}
    <g stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
      <line x1="28" y1="42" x2="42" y2="49" />
      <line x1="26" y1="45" x2="40" y2="52" />
      <line x1="24" y1="48" x2="38" y2="55" />
      
      <line x1="58" y1="49" x2="72" y2="42" />
      <line x1="60" y1="52" x2="74" y2="45" />
      <line x1="62" y1="55" x2="76" y2="48" />
    </g>

    {/* Glowing Knowledge/Brain/Sparks emerging from the book */}
    <g stroke={color} strokeWidth="1.5" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
      <path d="M 50,55 C 40,40 30,20 50,15 C 70,20 60,40 50,55" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.8" />
      <circle cx="50" cy="15" r="2" fill="#fff" />
      <circle cx="40" cy="30" r="1.5" fill="#fff" />
      <circle cx="60" cy="30" r="1.5" fill="#fff" />
      <line x1="50" y1="55" x2="40" y2="30" strokeDasharray="2 2" />
      <line x1="50" y1="55" x2="60" y2="30" strokeDasharray="2 2" />
      
      {/* Extra sparks */}
      <circle cx="45" cy="20" r="1" fill="#fff" />
      <circle cx="55" cy="20" r="1" fill="#fff" />
      <circle cx="50" cy="35" r="1.5" fill="#fff" />
    </g>
  </svg>
);

const IsoPodiumBlock = ({ rank, color, className }: { rank: 1 | 2 | 3, color: string, className?: string }) => {
  const rank_h = rank === 1 ? 41 : rank === 2 ? 26 : 11;

  const drawIsoBlock = (cx: number, cy: number, w: number, h: number, fills: any) => {
    const dx = w / 2;
    const dy = w / 4;
    const t_bottom = cy - h;
    const t_left_x = cx - dx; const t_left_y = cy - h - dy;
    const t_right_x = cx + dx; const t_right_y = cy - h - dy;
    const t_top = cy - h - 2 * dy;

    return (
      <g>
        {/* Left Face */}
        <polygon points={`${t_left_x},${t_left_y} ${cx},${t_bottom} ${cx},${cy} ${cx - dx},${cy - dy}`} fill={fills.left} stroke={fills.stroke} strokeWidth={fills.strokeWidth || 0.5} opacity={fills.opacity || 1} />
        {/* Right Face */}
        <polygon points={`${cx},${t_bottom} ${t_right_x},${t_right_y} ${cx + dx},${cy - dy} ${cx},${cy}`} fill={fills.right} stroke={fills.stroke} strokeWidth={fills.strokeWidth || 0.5} opacity={fills.opacity || 1} />
        {/* Top Face */}
        <polygon points={`${cx},${t_top} ${t_right_x},${t_right_y} ${cx},${t_bottom} ${t_left_x},${t_left_y}`} fill={fills.top} stroke={fills.stroke} strokeWidth={fills.strokeWidth || 1} style={fills.topStyle} opacity={fills.opacity || 1} />
        {/* Left Edge */}
        {fills.edge && <line x1={t_left_x} y1={t_left_y} x2={cx - dx} y2={cy - dy} stroke={fills.edge} strokeWidth={fills.edgeWidth || 1} opacity={fills.edgeOpacity || 1} style={fills.edgeStyle} />}
        {/* Right Edge */}
        {fills.edge && <line x1={t_right_x} y1={t_right_y} x2={cx + dx} y2={cy - dy} stroke={fills.edge} strokeWidth={fills.edgeWidth || 1} opacity={fills.edgeOpacity || 1} style={fills.edgeStyle} />}
        {/* Center Edge */}
        {fills.edge && <line x1={cx} y1={t_bottom} x2={cx} y2={cy} stroke={fills.edge} strokeWidth={fills.edgeWidth || 1} opacity={fills.edgeOpacity || 1} style={fills.edgeStyle} />}
      </g>
    );
  };

  return (
    <svg viewBox="0 0 100 100" className={cn("w-full h-auto drop-shadow-2xl", className)}>
      <defs>
        <radialGradient id={`podium-glow-${rank}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`podium-glass-left-${rank}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor="#111" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`podium-glass-right-${rank}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id={`podium-core-${rank}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#050505" stopOpacity="1" />
        </linearGradient>
      </defs>
      
      {/* Base Grid - matching other icons */}
      <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
      <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />

      {/* Floor Glow */}
      <ellipse cx="50" cy="80" rx="35" ry="15" fill={`url(#podium-glow-${rank})`} />

      {/* Base Block */}
      {drawIsoBlock(50, 85, 60, 5, {
        left: "#0a0a0a", right: "#050505", top: "#111", stroke: "#222"
      })}

      {/* Inner Core Pillar */}
      {drawIsoBlock(50, 80, 30, rank_h, {
        left: "#111", right: "#0a0a0a", top: `url(#podium-core-${rank})`, stroke: "#222",
        topStyle: { filter: `drop-shadow(0 0 10px ${color})` },
        edge: color, edgeWidth: 1.5, edgeOpacity: 0.8, edgeStyle: { filter: `drop-shadow(0 0 4px ${color})` }
      })}

      {/* Outer Glass Shell Pillar */}
      {drawIsoBlock(50, 80, 46, rank_h, {
        left: `url(#podium-glass-left-${rank})`, right: `url(#podium-glass-right-${rank})`, top: `url(#podium-glass-left-${rank})`, 
        stroke: color, strokeWidth: 0.5, opacity: 0.9,
        topStyle: { filter: `drop-shadow(0 0 8px ${color})` },
        edge: color, edgeWidth: 1.5, edgeOpacity: 0.8, edgeStyle: { filter: `drop-shadow(0 0 4px ${color})` }
      })}

      {/* Top Rim Block */}
      {drawIsoBlock(50, 80 - rank_h, 52, 3, {
        left: "#1a1a1a", right: "#111", top: "#222", stroke: color, strokeWidth: 1,
        topStyle: { filter: `drop-shadow(0 0 6px ${color})` }
      })}

      {/* Top Surface Tech Details */}
      <polygon points={`50,${71.5 - rank_h} 65,${64 - rank_h} 50,${56.5 - rank_h} 35,${64 - rank_h}`} fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
      <polygon points={`50,${68 - rank_h} 58,${64 - rank_h} 50,${60 - rank_h} 42,${64 - rank_h}`} fill={color} opacity="0.4" style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      
      {/* Floating Particles above podium */}
      <g fill="#fff" style={{ filter: `drop-shadow(0 0 6px #fff)` }}>
        <circle cx="50" cy={50 - rank_h} r="2" />
        <circle cx="40" cy={56 - rank_h} r="1.5" />
        <circle cx="60" cy={58 - rank_h} r="1.5" />
        <line x1="50" y1={50 - rank_h} x2="50" y2={60 - rank_h} stroke="#fff" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      </g>

      {/* Rank Number on Left Face (isometric projection) */}
      <g transform={`translate(38.5, ${80 - rank_h/2 - 5.75}) skewY(26.565) scale(0.866, 1)`}>
        <text x="0" y="0" fill="#fff" opacity="0.8" fontSize="14" fontWeight="900" textAnchor="middle" dominantBaseline="middle" style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
          {rank}
        </text>
      </g>
    </svg>
  );
};

const IsoDesign = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <radialGradient id={`design-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`canvas-grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#222" stopOpacity="1" />
        <stop offset="100%" stopColor="#111" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />
    
    {/* Base shadow/glow */}
    <ellipse cx="50" cy="80" rx="35" ry="15" fill={`url(#design-glow-${color.replace('#', '')})`} />

    {/* Canvas Base (Tablet/Board) */}
    <g transform="translate(0, 10)">
      <polygon points="20,45 50,60 80,45 50,30" fill="#0a0a0a" stroke="#111" strokeWidth="1" />
      <polygon points="20,40 50,55 80,40 50,25" fill="#111" stroke="#222" strokeWidth="1" />
    </g>

    {/* Canvas Surface */}
    <g transform="translate(0, 5)">
      <polygon points="20,45 50,60 80,45 50,30" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
      <polygon points="20,40 50,55 80,40 50,25" fill={`url(#canvas-grad-${color.replace('#', '')})`} stroke="#444" strokeWidth="1" />
      
      {/* UI Elements on Canvas */}
      {/* Header Bar */}
      <polygon points="25,40 45,50 75,35 55,25" fill="#333" opacity="0.5" />
      {/* Sidebar */}
      <polygon points="25,42 35,47 55,37 45,32" fill="#222" opacity="0.8" />
      {/* Content Box */}
      <polygon points="38,46 48,51 68,41 58,36" fill={color} opacity="0.2" stroke={color} strokeWidth="0.5" />
      {/* Floating Button / Circle */}
      <ellipse cx="55" cy="45" rx="4" ry="2" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
      {/* Wireframe lines */}
      <line x1="40" y1="48" x2="46" y2="51" stroke="#fff" strokeWidth="1" opacity="0.5" />
      <line x1="42" y1="45" x2="62" y2="35" stroke="#fff" strokeWidth="1" opacity="0.3" />
    </g>

    {/* Floating Pen/Stylus */}
    <g style={{ filter: `drop-shadow(0 0 8px rgba(0,0,0,0.6))` }} transform="translate(10, -10)">
      {/* Pen Shadow */}
      <polygon points="65,25 70,30 55,45 50,40" fill="#050505" opacity="0.5" />
      {/* Pen Body */}
      <polygon points="65,20 70,25 55,40 50,35" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
      <polygon points="70,25 72,22 57,37 55,40" fill="#222" />
      <polygon points="65,20 72,22 57,37 50,35" fill="#111" />
      {/* Pen Tip */}
      <polygon points="50,35 55,40 48,45" fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      <polygon points="48,45 50,35 52,38" fill="#fff" opacity="0.8" />
    </g>
    
    {/* Floating Sparkles/Nodes */}
    <g fill="#fff" style={{ filter: `drop-shadow(0 0 4px #fff)` }}>
      <circle cx="30" cy="30" r="1.5" />
      <circle cx="75" cy="25" r="1" />
      <circle cx="65" cy="55" r="1.5" />
    </g>
  </svg>
);

const get3DIcon = (field: string, className?: string) => {
  const icons: Record<string, { Component: any; color: string }> = {
    "Researching and synthesizing information": { Component: IsoMagnifyingGlass, color: "#0ea5e9" }, // sky
    "Drafting and refining written content": { Component: IsoDocument, color: "#10b981" }, // emerald
    "Writing, debugging, and explaining code": { Component: IsoCodeScreen, color: "#6366f1" }, // indigo
    "Summarizing documents and meeting transcripts": { Component: IsoTranscript, color: "#f59e0b" }, // amber
    "Analyzing and visualizing complex data": { Component: IsoDataViz, color: "#ec4899" }, // pink
    "Generating and editing images, videos, and audio": { Component: IsoMedia, color: "#d946ef" }, // fuchsia
    "Translating languages and practicing conversation": { Component: IsoTranslate, color: "#3b82f6" }, // blue
    "Brainstorming and creative ideation": { Component: IsoIdea, color: "#eab308" }, // yellow
    "Automating multi-step tasks (Agentic workflows)": { Component: IsoWorkflow, color: "#64748b" }, // slate
    "Managing schedules and professional correspondence": { Component: IsoCalendar, color: "#8b5cf6" }, // violet
    "Slides preparation": { Component: IsoSlides, color: "#f43f5e" }, // rose
    "Learning and studying": { Component: IsoLearning, color: "#14b8a6" }, // teal
    "UI/UX Design Generation": { Component: IsoDesign, color: "#a855f7" }, // purple
  };

  const match = icons[field] || { Component: IsoCube, color: "#6366f1" };
  const IconComponent = match.Component;

  return <IconComponent color={match.color} className={className} />;
};

export function FieldsGrid({ fields }: { fields: Record<string, FieldTool[]> }) {
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const fieldKeys = Object.keys(fields);

  const sortedTools = useMemo(() => {
    if (!selectedField || !fields[selectedField]) return [];
    return [...fields[selectedField]].sort((a, b) => {
      const rankA = parseInt(a.rank.replace(/\D/g, ''), 10) || 99;
      const rankB = parseInt(b.rank.replace(/\D/g, ''), 10) || 99;
      return rankA - rankB;
    });
  }, [selectedField, fields]);

  return (
    <section className={cn("relative", selectedField ? "z-50" : "z-10")}>
      <div className="grid grid-cols-12 gap-4 md:gap-6 grid-flow-row-dense">
        {fieldKeys.map((field, index) => {
          const spans = [
            "col-span-12 md:col-span-8 md:row-span-2",
            "col-span-12 md:col-span-4 md:row-span-1",
            "col-span-12 md:col-span-4 md:row-span-2",
            "col-span-12 md:col-span-4 md:row-span-1",
            "col-span-12 md:col-span-4 md:row-span-1",
            "col-span-12 md:col-span-8 md:row-span-1",
            "col-span-12 md:col-span-4 md:row-span-2",
            "col-span-12 md:col-span-4 md:row-span-1",
            "col-span-12 md:col-span-4 md:row-span-1",
            "col-span-12 md:col-span-8 md:row-span-2",
            "col-span-12 md:col-span-4 md:row-span-1",
            "col-span-12 md:col-span-4 md:row-span-1",
            "col-span-12 md:col-span-12 md:row-span-1",
          ];
          const colSpanClass = spans[index % spans.length];
          const isRowSpan2 = colSpanClass.includes('row-span-2');
          const minHeightClass = isRowSpan2 ? "min-h-[240px] md:min-h-[480px]" : "min-h-[160px] md:min-h-[220px]";

          return (
            <motion.div
              key={field}
              onClick={() => setSelectedField(field)}
              className={`group cursor-pointer bg-[#111111] rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 transition-all duration-500 flex flex-col justify-between overflow-hidden relative ${colSpanClass} ${minHeightClass} hover:bg-[#1a1a1a]`}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Subtle Perspective Grid */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]" 
                style={{ 
                  backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', 
                  backgroundSize: '40px 40px',
                  transform: 'perspective(800px) rotateX(60deg) translateY(-50px) scale(3)',
                  transformOrigin: 'top center',
                  maskImage: 'radial-gradient(circle at 80% 80%, black 10%, transparent 60%)',
                  WebkitMaskImage: 'radial-gradient(circle at 80% 80%, black 10%, transparent 60%)'
                }} 
              />

              <div className="relative z-10 flex flex-col items-center text-center h-full w-full">
                {/* Text Content */}
                <div className="flex flex-col items-center w-full z-20 mt-1 md:mt-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-1 md:mb-3 leading-tight" style={{ letterSpacing: '-0.03em', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                    {field}
                  </h3>
                </div>

                {/* 3D Visual */}
                <div className="flex-1 w-full flex justify-center items-center pointer-events-none z-10 mt-2 md:mt-8 mb-2 md:mb-4">
                  <div className="transform scale-[0.6] sm:scale-[0.8] md:scale-[1.4] group-hover:scale-[0.7] sm:group-hover:scale-[0.9] md:group-hover:scale-[1.55] transition-transform duration-700 ease-out">
                    {get3DIcon(field)}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedField && (
          <motion.div 
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden custom-scrollbar"
          >
            <div className="min-h-screen px-4 text-center md:px-8 flex items-start md:items-center justify-center py-8 md:py-0">
              <div
                onClick={() => setSelectedField(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-6xl bg-[#111111] rounded-[2rem] md:rounded-[3rem] shadow-2xl flex flex-col z-10 text-left my-8 overflow-hidden"
              >
                <div className="flex items-center justify-between p-6 md:p-10 bg-[#111111]/80 backdrop-blur-xl sticky top-0 z-[100]">
                <div className="flex items-center gap-4">
                  {get3DIcon(selectedField, "w-12 h-12 group-hover:scale-100 group-hover:translate-y-0")}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white" style={{ letterSpacing: '-0.03em', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                    {selectedField}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedField(null)}
                  className="p-3 md:p-4 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white bg-white/5"
                >
                  <X className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>

              <div className="p-6 md:p-12 pb-12 md:pb-32 bg-[#111111] flex-grow flex flex-col gap-8 md:gap-16">
                {/* Podium Section */}
                <div className="flex flex-row items-end justify-center gap-2 md:gap-8 pt-2 md:pt-12">
                  {[1, 0, 2].map((idx) => {
                    const tool = sortedTools[idx];
                    if (!tool) return null;
                    
                    const rank = idx + 1;
                    const rank_h = rank === 1 ? 41 : rank === 2 ? 26 : 11;
                    const top_y = 51 - rank_h;
                    const colors = { 
                      1: "#eab308", // yellow-500
                      2: "#94a3b8", // slate-400
                      3: "#d97706"  // amber-600
                    };
                    
                    return (
                      <div key={tool.toolName} className={`flex flex-col items-center w-1/3 max-w-[260px] group hover:z-50 ${rank === 1 ? 'order-2 z-20' : rank === 2 ? 'order-1 z-10' : 'order-3 z-10'}`}>
                        {/* Card */}
                        <div 
                          className="w-full relative z-30 group-hover:z-50"
                          style={{ marginBottom: `-${top_y - 15}%` }}
                        >
                          <ToolRankCard tool={tool} rank={rank} isPodium />
                        </div>
                        
                        {/* 3D Isometric Podium Block */}
                        <div className="relative w-full z-10 flex justify-center">
                          <IsoPodiumBlock 
                            rank={rank as 1|2|3} 
                            color={colors[rank as 1|2|3]} 
                            className="w-[120%] max-w-[350px] opacity-90 transform transition-transform group-hover:scale-105 group-hover:-translate-y-2 duration-500" 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Featured Section */}
                {sortedTools.length > 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-grow" />
                      <h3 className="text-sm md:text-lg font-semibold text-white/40 uppercase tracking-widest" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>Runners-Up</h3>
                      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-grow" />
                    </div>
                    <div className="flex flex-row justify-center flex-wrap gap-2 md:gap-6">
                      {sortedTools.slice(3).map((tool, idx) => {
                        const isLeft = idx % 3 === 0;
                        const isRight = idx % 3 === 2;
                        return (
                          <div key={idx} className="w-[45%] md:w-[260px] relative hover:z-50">
                            <ToolRankCard tool={tool} rank={idx + 4} isLeft={isLeft} isRight={isRight} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </section>
  );
}

function ToolRankCard({ tool, rank, isPodium, isLeft, isRight }: { tool: FieldTool, rank: number, isPodium?: boolean, isLeft?: boolean, isRight?: boolean }) {
  const rankColors = {
    1: "hover:border-yellow-500/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]",
    2: "hover:border-slate-400/50 hover:shadow-[0_0_30px_rgba(148,163,184,0.15)]",
    3: "hover:border-amber-600/50 hover:shadow-[0_0_30px_rgba(217,119,6,0.15)]",
  };
  const hoverStyle = isPodium ? rankColors[rank as 1|2|3] : "hover:bg-[#111] hover:border-white/10";

  return (
    <div
      className={cn(
        "group bg-[#0a0a0a] border border-white/5 rounded-xl md:rounded-[2rem] p-3 md:p-6 transition-all duration-500 flex flex-col relative min-h-[60px] md:min-h-[100px] hover:z-50 items-center justify-center text-center z-10",
        hoverStyle
      )}
    >
      <div className="absolute inset-0 overflow-hidden rounded-xl md:rounded-[2rem] pointer-events-none">
        {/* Subtle Perspective Grid */}
        <div 
          className="absolute inset-0 opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            transform: 'perspective(800px) rotateX(60deg) translateY(-50px) scale(3)',
            transformOrigin: 'top center',
            maskImage: 'radial-gradient(circle at 80% 80%, black 10%, transparent 60%)',
            WebkitMaskImage: 'radial-gradient(circle at 80% 80%, black 10%, transparent 60%)'
          }} 
        />

        {/* Massive Rank Number in Background */}
        {!isPodium && (
          <div className="absolute -bottom-2 -right-2 md:-bottom-6 md:-right-4 text-[4rem] md:text-[8rem] font-black italic text-white/[0.02] group-hover:text-white/[0.04] transition-colors leading-none z-0">
            {rank}
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-col h-full w-full items-center justify-center">
        <div className="flex items-center justify-center gap-1 md:gap-2 relative w-full">
          <h4 className="text-xs sm:text-sm md:text-xl font-semibold text-white/90 inline-block" style={{ letterSpacing: '-0.02em', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
            {tool.toolName}
          </h4>
          <div className="flex items-center gap-1 md:gap-2">
            {tool.url && tool.url.split(',').map((u, i) => {
              const url = u.trim();
              if (!url) return null;
              return (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-white hover:text-white/80 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
