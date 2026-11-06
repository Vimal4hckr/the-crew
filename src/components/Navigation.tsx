import React, { useState, useEffect } from 'react';
import { Film } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050507]/90 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
        {/* Brand Zone: 1 clean text wordmark */}
        <a
          href="#home"
          className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.2em] text-white hover:text-zinc-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5"
        >
          <Film className="w-4 h-4 text-zinc-400" />
          <span>THE FILM CREW</span>
        </a>

        {/* Minimal Navigation: ONLY HOME and THE CREW */}
        <nav className="flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.25em]">
          <a
            href="#home"
            className="text-zinc-300 hover:text-white transition-colors relative py-1 hover:border-b hover:border-white whitespace-nowrap"
          >
            HOME
          </a>
          <a
            href="#crew"
            className="text-zinc-300 hover:text-white transition-colors relative py-1 hover:border-b hover:border-white whitespace-nowrap"
          >
            THE CREW
          </a>
        </nav>
      </div>
    </header>
  );
};
