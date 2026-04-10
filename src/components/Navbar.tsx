import { Link } from 'react-router-dom';

function RobotLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="10 10 80 70" fill="currentColor" className={className}>
      <mask id="robot-mask">
        <rect x="0" y="0" width="100" height="100" fill="white" />
        <circle cx="35" cy="58" r="7.5" fill="black" />
        <circle cx="65" cy="58" r="7.5" fill="black" />
      </mask>
      
      <g mask="url(#robot-mask)">
        {/* Ears */}
        <circle cx="20" cy="58" r="7.5" />
        <circle cx="80" cy="58" r="7.5" />
        
        {/* Head */}
        <rect x="20" y="40" width="60" height="36" rx="12" />
        
        {/* Antenna Stem */}
        <rect x="46.5" y="26" width="7" height="15" />
        
        {/* Antenna Ball */}
        <circle cx="50" cy="20" r="7.5" />
      </g>
    </svg>
  );
}

export function Navbar() {
  return (
    <nav className="w-full bg-transparent py-4 sm:py-6 px-4 sm:px-12 flex justify-between items-center z-50 absolute top-0 left-0 pointer-events-auto">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');`}
      </style>
      {/* Logo */}
      <Link to="/" className="flex flex-col items-center justify-center gap-1 group">
        <RobotLogo className="w-8 sm:w-12 h-auto text-white group-hover:text-white/80 transition-colors" />
        <span 
          className="text-white text-[16px] sm:text-[22px] group-hover:text-white/80 transition-colors leading-none"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
        >
          BOTtom Line.
        </span>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-4 sm:gap-10 md:gap-12 text-white font-medium text-[14px] sm:text-[16px]">
        <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
        <a href="/#tools" className="hover:text-white/70 transition-colors">Tools</a>
        <Link to="/feedback" className="hover:text-white/70 transition-colors">Feedback</Link>
      </div>
    </nav>
  );
}
