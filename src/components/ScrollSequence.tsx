import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'motion/react';

function RobotLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="10 10 80 70" fill="currentColor" className={className}>
      <mask id="robot-mask-seq">
        <rect x="0" y="0" width="100" height="100" fill="white" />
        <circle cx="35" cy="58" r="7.5" fill="black" />
        <circle cx="65" cy="58" r="7.5" fill="black" />
      </mask>
      <g mask="url(#robot-mask-seq)">
        <circle cx="20" cy="58" r="7.5" />
        <circle cx="80" cy="58" r="7.5" />
        <rect x="20" y="40" width="60" height="36" rx="12" />
        <rect x="46.5" y="26" width="7" height="15" />
        <circle cx="50" cy="20" r="7.5" />
      </g>
    </svg>
  );
}

export function ScrollSequence() {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });

  const fullText = "The biggest AI newsletters and websites";
  const typewriterCount = useMotionValue(0);
  const typewriterRounded = useTransform(typewriterCount, (latest) => Math.round(latest));
  const displayText = useTransform(typewriterRounded, (latest) => fullText.slice(0, latest));

  useEffect(() => {
    if (step === 4) {
      const controls = animate(typewriterCount, [0, fullText.length, fullText.length, 0], {
        duration: 4.5,
        times: [0, 0.4, 0.8, 1],
        ease: "linear",
      });
      return controls.stop;
    } else {
      typewriterCount.set(0);
    }
  }, [step, fullText.length, typewriterCount]);

  useEffect(() => {
    if (!isInView) {
      setStep(0);
      return;
    }

    let timeout: NodeJS.Timeout;

    const durations = [
      1500, // 0: best
      1500, // 1: newest
      2500, // 2: most recommended
      2000, // 3: According to
      4500, // 4: Typewriter
      4000, // 5: BOTtom Line
    ];

    const nextStep = () => {
      setStep((prev) => (prev + 1) % durations.length);
    };

    timeout = setTimeout(nextStep, durations[step]);

    return () => clearTimeout(timeout);
  }, [step, isInView]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-[#000000] h-[70vh] md:h-[90vh] flex items-center justify-center overflow-hidden"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="relative z-10 flex items-center justify-center w-full px-4 md:px-6 h-full">
        <AnimatePresence mode="wait">
          {step <= 2 && (
            <motion.div 
              key="group1" 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-4 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter"
            >
              <span>Use the</span>
              <div className="relative inline-grid overflow-hidden px-1 py-2" style={{ gridTemplateColumns: '1fr', gridTemplateRows: '1fr' }}>
                <AnimatePresence>
                  {step === 0 && (
                    <motion.span key="best" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="col-start-1 row-start-1 flex items-center justify-center" style={{ color: '#3E2F84' }}>
                      best
                    </motion.span>
                  )}
                  {step === 1 && (
                    <motion.span key="newest" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="col-start-1 row-start-1 flex items-center justify-center" style={{ color: '#3E2F84' }}>
                      newest
                    </motion.span>
                  )}
                  {step === 2 && (
                    <motion.span key="most" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="col-start-1 row-start-1 flex items-center justify-center whitespace-nowrap" style={{ color: '#3E2F84' }}>
                      recommended
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span>AI tools</span>
            </motion.div>
          )}
          
          {step === 3 && (
            <motion.h2 
              key="group2" 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl md:text-8xl font-bold text-white text-center tracking-tighter"
            >
              According to
            </motion.h2>
          )}
          
          {step === 4 && (
            <motion.div 
              key="group3" 
              className="w-full flex justify-center items-center"
              // No exit animation so it unmounts instantly, allowing layoutId to take over smoothly
            >
              <div className="relative flex justify-center w-full max-w-[90vw] md:max-w-none">
                {/* Invisible text to set exact width and height, allowing natural wrap */}
                <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter opacity-0 pointer-events-none select-none text-center">
                  {fullText}
                </span>
                
                {/* Absolute container */}
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                  <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white text-center">
                    <motion.span>{displayText}</motion.span>
                    <motion.div 
                      layoutId="pipe" 
                      className="inline-block w-2 md:w-3 bg-white align-middle ml-1 md:ml-2" 
                      style={{ height: '0.9em', borderRadius: '12px', marginTop: '-0.1em' }} 
                      transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.8 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {step === 5 && (
            <motion.div 
              key="group4" 
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <motion.div 
                layoutId="pipe"
                className="absolute inset-4 sm:inset-8 md:inset-12 lg:inset-16 bg-white z-0"
                style={{ borderRadius: "140px" }}
                transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.8 }}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} 
                className="flex flex-col items-center justify-center gap-4 md:gap-8 z-10"
              >
                <RobotLogo className="w-24 md:w-40 h-auto text-black" />
                <span 
                  className="text-5xl sm:text-7xl md:text-[8rem] text-black leading-none tracking-tighter text-center" 
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                >
                  BOTtom Line.
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
