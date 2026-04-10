import React, { useState, useMemo } from 'react';
import { TrendingTool } from '../hooks/useData';

export function TrendingGraph({ tools }: { tools: TrendingTool[] }) {
  const [hovered, setHovered] = useState<{ tool: TrendingTool; x: number; y: number } | null>(null);

  const width = 900;
  const height = 500;
  const padding = { top: 40, right: 40, bottom: 60, left: 40 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const total = tools.length;
  const third = Math.ceil(total / 3);

  const categories = [
    { id: 'ultra', label: 'Cursor', filter: (t: TrendingTool, i: number) => i < third, color: '#5c6ad8' },
    { id: 'very', label: 'Codex', filter: (t: TrendingTool, i: number) => i >= third && i < third * 2, color: '#d95b18' },
    { id: 'trending', label: 'No Agent', filter: (t: TrendingTool, i: number) => i >= third * 2, color: '#6b7280' },
  ];

  const pseudoRandom = (seed: string) => {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
    return (Math.abs(h) % 1000) / 1000;
  };

  const points = (() => {
    return categories.map((cat, colIndex) => {
      const colTools = tools.filter(cat.filter);
      const colWidth = innerWidth / categories.length;
      const centerX = padding.left + colIndex * colWidth + colWidth / 2;

      const colMax = Math.max(...colTools.map(t => t.mentions));
      const colMin = Math.min(...colTools.map(t => t.mentions));

      const getColY = (mentions: number) => {
        const availableHeight = innerHeight * 0.6; // 60% of inner height
        const offset = innerHeight * 0.1; // 10% padding top
        if (colMax === colMin) return padding.top + innerHeight / 2;
        return padding.top + offset + availableHeight - ((mentions - colMin) / (colMax - colMin)) * availableHeight;
      };

      return colTools.map(tool => {
        const jitter = (pseudoRandom(tool.toolName) - 0.5) * (colWidth * 0.3);
        return {
          ...tool,
          x: centerX + jitter,
          y: getColY(tool.mentions),
          color: cat.color,
          catId: cat.id,
          catIndex: colIndex
        };
      });
    });
  })();

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 mb-12 px-4 md:px-0">
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden">
        <div className="relative w-full h-auto md:aspect-[16/9] md:min-h-[400px] flex items-center justify-center">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto md:h-full overflow-visible">
            <defs>
            {categories.map(cat => (
              <React.Fragment key={cat.id}>
                <linearGradient id={`grad-${cat.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={cat.color} stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0.9" />
                </linearGradient>
                <radialGradient id={`glow-${cat.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={cat.color} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={cat.color} stopOpacity="0" />
                </radialGradient>
              </React.Fragment>
            ))}
          </defs>

          {/* Isometric Grid Lines */}
          <g opacity="0.1">
            {[0.25, 0.5, 0.75].map(pct => (
              <path key={pct} d={`M ${padding.left} ${padding.top + innerHeight * pct} L ${width - padding.right} ${padding.top + innerHeight * pct}`} stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" />
            ))}
            {[1, 2].map(i => {
              const x = padding.left + i * (innerWidth / 3);
              return <path key={i} d={`M ${x} ${padding.top} L ${x} ${height - padding.bottom}`} stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" />;
            })}
          </g>

          {/* X Axis Labels */}
          {categories.map((cat, i) => (
            <text
              key={`label-${i}`}
              x={padding.left + i * (innerWidth / 3) + (innerWidth / 6)}
              y={height - 20}
              fill="#ffffff"
              fillOpacity="0.4"
              fontSize="14"
              textAnchor="middle"
              className="font-medium tracking-wide"
            >
              {cat.label}
            </text>
          ))}

          {/* Points */}
          {points.map((colPoints, colIndex) => (
            <g key={`col-${colIndex}`}>
              {colPoints.map((pt, i) => {
                const isHovered = hovered?.tool.toolName === pt.toolName;
                const pointGroup = (
                  <g 
                    className="transition-all duration-300 cursor-pointer"
                    style={{ 
                      transform: `translate(${pt.x}px, ${pt.y}px) scale(${isHovered ? 1.5 : 1})`,
                      transformOrigin: '0 0'
                    }}
                    onMouseEnter={() => setHovered({ tool: pt, x: pt.x, y: pt.y })}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Simple Circle Point */}
                    <circle 
                      cx="0" 
                      cy="0" 
                      r="6" 
                      fill={pt.color} 
                      stroke="#111" 
                      strokeWidth="1.5" 
                    />
                  </g>
                );

                return pt.sourceLink ? (
                  <a key={`pt-${colIndex}-${i}`} href={pt.sourceLink} target="_blank" rel="noopener noreferrer">
                    {pointGroup}
                  </a>
                ) : (
                  <g key={`pt-${colIndex}-${i}`}>{pointGroup}</g>
                );
              })}
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        {hovered && (
          <div
            className="absolute z-50 bg-[#111] border border-white/10 rounded-lg md:rounded-xl p-2 md:p-4 shadow-2xl pointer-events-none transform -translate-x-1/2 -translate-y-[calc(100%+16px)] md:-translate-y-[calc(100%+24px)] transition-all duration-200"
            style={{ 
              left: `${(hovered.x / width) * 100}%`, 
              top: `${(hovered.y / height) * 100}%` 
            }}
          >
            {/* Tooltip Arrow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[7px] md:translate-y-[9px] w-0 h-0 border-l-[6px] md:border-l-[8px] border-r-[6px] md:border-r-[8px] border-t-[8px] md:border-t-[10px] border-l-transparent border-r-transparent border-t-white/10" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[6px] md:translate-y-[8px] w-0 h-0 border-l-[6px] md:border-l-[8px] border-r-[6px] md:border-r-[8px] border-t-[8px] md:border-t-[10px] border-l-transparent border-r-transparent border-t-[#111]" />

            <div className="text-white font-medium text-xs md:text-base mb-0.5 md:mb-1 whitespace-nowrap">{hovered.tool.toolName}</div>
            <div className="text-white/50 text-[10px] md:text-xs whitespace-nowrap">{hovered.tool.category} • <span className="text-white/80">{hovered.tool.mentions} mentions</span></div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
