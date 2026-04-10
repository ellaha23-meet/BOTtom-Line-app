import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingTool } from '../hooks/useData';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

const IsoFlame = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <radialGradient id={`flame-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.5" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`flame-grad-${color.replace('#', '')}`} x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0.9" />
      </linearGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />

    <ellipse cx="50" cy="80" rx="35" ry="15" fill={`url(#flame-glow-${color.replace('#', '')})`} />

    {/* Base Block */}
    <polygon points="35,65 50,72.5 65,65 50,57.5" fill="#222" stroke="#333" strokeWidth="1" />
    <polygon points="35,65 50,72.5 50,80 35,72.5" fill="#0a0a0a" stroke="#111" strokeWidth="1" />
    <polygon points="50,72.5 65,65 65,72.5 50,80" fill="#111" stroke="#222" strokeWidth="1" />

    {/* Flame Shape */}
    <path d="M 50,70 C 20,70 30,30 50,15 C 50,15 40,35 50,45 C 50,45 70,30 60,15 C 80,30 70,70 50,70 Z" fill={`url(#flame-grad-${color.replace('#', '')})`} style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
    
    {/* Inner Flame */}
    <path d="M 50,65 C 35,65 40,40 50,30 C 50,30 45,45 50,50 C 50,50 60,40 55,30 C 65,40 60,65 50,65 Z" fill="#fff" opacity="0.6" style={{ filter: `drop-shadow(0 0 4px #fff)` }} />
    
    {/* Sparks */}
    <circle cx="40" cy="20" r="1.5" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    <circle cx="65" cy="25" r="2" fill="#fff" style={{ filter: `drop-shadow(0 0 4px #fff)` }} />
    <circle cx="55" cy="10" r="1" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
  </svg>
);

const IsoZap = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <radialGradient id={`zap-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.5" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`zap-grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0.9" />
      </linearGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />

    <ellipse cx="50" cy="80" rx="35" ry="15" fill={`url(#zap-glow-${color.replace('#', '')})`} />

    {/* Base Block */}
    <polygon points="35,65 50,72.5 65,65 50,57.5" fill="#222" stroke="#333" strokeWidth="1" />
    <polygon points="35,65 50,72.5 50,80 35,72.5" fill="#0a0a0a" stroke="#111" strokeWidth="1" />
    <polygon points="50,72.5 65,65 65,72.5 50,80" fill="#111" stroke="#222" strokeWidth="1" />

    {/* 3D Lightning Bolt */}
    {/* Back face (darker) */}
    <polygon points="58,15 38,45 51,45 48,75 68,40 55,40" fill={color} opacity="0.5" />
    {/* Front face */}
    <polygon points="55,15 35,45 48,45 45,75 65,40 52,40" fill={`url(#zap-grad-${color.replace('#', '')})`} style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
    {/* Side faces to connect them and make it 3D */}
    <polygon points="55,15 58,15 38,45 35,45" fill="#fff" opacity="0.8" />
    <polygon points="48,45 51,45 48,75 45,75" fill="#fff" opacity="0.8" />
    
    {/* Energy rings/arcs */}
    <path d="M 30,50 Q 50,30 70,60" fill="none" stroke={color} strokeWidth="1" opacity="0.8" style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    <path d="M 25,40 Q 50,70 75,30" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.6" style={{ filter: `drop-shadow(0 0 2px #fff)` }} />
  </svg>
);

const IsoSparkles = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-24 h-24 drop-shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 duration-500", className)}>
    <defs>
      <radialGradient id={`sparkles-glow-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.5" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`sparkles-grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0.9" />
      </linearGradient>
    </defs>
    <path d="M0,50 L100,0 M0,75 L100,25 M0,100 L100,50 M0,25 L100,-25" stroke="#ffffff05" strokeWidth="1" />
    <path d="M100,50 L0,0 M100,75 L0,25 M100,100 L0,50 M100,25 L0,-25" stroke="#ffffff05" strokeWidth="1" />

    <ellipse cx="50" cy="80" rx="35" ry="15" fill={`url(#sparkles-glow-${color.replace('#', '')})`} />

    {/* Base Block */}
    <polygon points="35,65 50,72.5 65,65 50,57.5" fill="#222" stroke="#333" strokeWidth="1" />
    <polygon points="35,65 50,72.5 50,80 35,72.5" fill="#0a0a0a" stroke="#111" strokeWidth="1" />
    <polygon points="50,72.5 65,65 65,72.5 50,80" fill="#111" stroke="#222" strokeWidth="1" />

    {/* 3D Sparkles (Diamonds) */}
    {/* Main Sparkle */}
    <polygon points="50,15 55,40 80,45 55,50 50,75 45,50 20,45 45,40" fill={`url(#sparkles-grad-${color.replace('#', '')})`} style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
    <polygon points="50,15 55,40 50,45 45,40" fill="#fff" opacity="0.6" />
    <polygon points="50,45 55,40 80,45 55,50" fill={color} opacity="0.4" />
    
    {/* Small Sparkle 1 */}
    <polygon points="75,15 78,25 88,28 78,31 75,41 72,31 62,28 72,25" fill={`url(#sparkles-grad-${color.replace('#', '')})`} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    
    {/* Small Sparkle 2 */}
    <polygon points="25,55 28,65 38,68 28,71 25,81 22,71 12,68 22,65" fill={`url(#sparkles-grad-${color.replace('#', '')})`} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
  </svg>
);

const CardDecoration = ({ index }: { index: number }) => {
  const pattern = index % 4;
  
  return (
    <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl z-0">
      {/* Grid */}
      <div 
        className="absolute top-0 right-0 w-full h-full opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          backgroundPosition: 'top right',
          maskImage: 'radial-gradient(circle at top right, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 70%)'
        }}
      />
      {/* Graphic */}
      <div className="absolute -top-8 -right-8 w-48 h-48 opacity-[0.04]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="0.5">
          {pattern === 0 && (
            <g>
              <path d="M50 20 A30 30 0 1 1 49.9 20" />
              <path d="M50 10 A40 40 0 1 1 49.9 10" />
              <path d="M50 0 A50 50 0 1 1 49.9 0" />
              <path d="M50 50 L100 100 M50 50 L0 100 M50 50 L0 0 M50 50 L100 0" />
            </g>
          )}
          {pattern === 1 && (
            <g>
              <path d="M0 100 Q 50 0 100 100" />
              <path d="M10 100 Q 50 20 90 100" />
              <path d="M20 100 Q 50 40 80 100" />
              <path d="M30 100 Q 50 60 70 100" />
              <path d="M40 100 Q 50 80 60 100" />
            </g>
          )}
          {pattern === 2 && (
            <g>
              <rect x="10" y="10" width="80" height="80" transform="rotate(45 50 50)" />
              <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
              <rect x="30" y="30" width="40" height="40" transform="rotate(45 50 50)" />
              <rect x="40" y="40" width="20" height="20" transform="rotate(45 50 50)" />
            </g>
          )}
          {pattern === 3 && (
            <g>
              <circle cx="50" cy="50" r="40" />
              <polygon points="50,10 85,70 15,70" />
              <polygon points="50,90 85,30 15,30" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export function TrendingTools({ tools }: { tools: TrendingTool[] }) {
  const [openSection, setOpenSection] = useState<string | null>('ultra');

  const total = tools.length;
  const third = Math.ceil(total / 3);

  const ultraTrending = tools.slice(0, third);
  const veryTrending = tools.slice(third, third * 2);
  const trending = tools.slice(third * 2);

  const sections = [
    { id: 'ultra', label: 'Best', data: ultraTrending, icon: IsoFlame, colorHex: '#f43f5e', color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    { id: 'very', label: 'Great', data: veryTrending, icon: IsoZap, colorHex: '#fbbf24', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
    { id: 'trending', label: 'Very Good', data: trending, icon: IsoSparkles, colorHex: '#34d399', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
  ];

  return (
    <section className="relative z-10 pt-12 pb-0">
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-10 max-w-3xl leading-tight" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
          Discover the best tools at the moment!
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3">
          {sections.map((section) => {
            const isActive = openSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setOpenSection(section.id)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                  isActive 
                    ? "bg-white text-black border-white" 
                    : "bg-transparent text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                )}
              >
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {sections.map((section) => {
            if (openSection !== section.id) return null;
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                {section.data.map((tool, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group flex items-center justify-center py-5 border-b border-white/5 last:border-0 transition-colors hover:bg-white/[0.02] px-4 -mx-4 rounded-lg"
                  >
                    <div className="flex items-center justify-between w-full max-w-[240px] md:max-w-[280px] gap-4">
                      <h3 className="text-base font-medium text-white/90 group-hover:text-white transition-colors truncate">
                        {tool.toolName}
                      </h3>
                      
                      {tool.sourceLink ? (
                        <a
                          href={tool.sourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors shrink-0"
                        >
                          Visit site
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="text-sm text-white/30 shrink-0">N/A</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
