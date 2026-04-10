import { Background3D } from '../components/Background3D';
import { useData } from '../hooks/useData';
import { FieldsGrid } from '../components/FieldsGrid';
import { TrendingTools } from '../components/TrendingTools';
import { ScrollSequence } from '../components/ScrollSequence';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TypewriterHeadline({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [text]);

  const lastSpaceIndex = displayedText.lastIndexOf(' ');
  const rest = lastSpaceIndex !== -1 ? displayedText.substring(0, lastSpaceIndex + 1) : '';
  const lastPart = lastSpaceIndex !== -1 ? displayedText.substring(lastSpaceIndex + 1) : displayedText;

  return (
    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white min-h-[1.2em]" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      {rest}
      <span className="whitespace-nowrap">
        {lastPart}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="inline-block w-[2px] sm:w-[3px] md:w-[6px] h-[0.85em] bg-white ml-1 md:ml-2 align-baseline rounded-full"
        />
      </span>
    </h1>
  );
}

export function Home() {
  const { fieldTools, trendingTools, loading, error } = useData();

  return (
    <div className="bg-[#000000] text-white font-sans selection:bg-indigo-500/30">
      
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        <Background3D />
        <div className="glow-bg" />
        
        <header className="relative z-10 text-center space-y-6 flex flex-col items-center px-6 max-w-7xl mx-auto mt-12 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none"
          >
            <TypewriterHeadline text="The Only AI Updates You Actually Need" />
            <p className="mt-3 md:mt-8 text-xs sm:text-sm md:text-xl text-white/50 max-w-2xl mx-auto font-normal md:font-light leading-relaxed pointer-events-none">
              If you're struggling to keep pace with weekly company updates, shifting tool recommendations, biased chatbots, and traffic-based AI directories, we can help. We scan the latest newsletters and articles from top AI websites every week.
            </p>
          </motion.div>
        </header>
      </div>

      <main id="tools" className="max-w-7xl mx-auto px-6 pt-24 pb-8 space-y-32 relative z-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-lg mx-auto text-center">
            <h2 className="text-2xl font-semibold text-red-400 mb-4">Error Loading Data</h2>
            <p className="text-white/70 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <FieldsGrid fields={fieldTools} />
            <TrendingTools tools={trendingTools} />
          </>
        )}
      </main>

      <ScrollSequence />
    </div>
  );
}
