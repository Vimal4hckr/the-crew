import React, { useState } from 'react';
import { Film } from 'lucide-react';
import { CinematicIntro } from './components/CinematicIntro';
import { Navigation } from './components/Navigation';
import { CrewCard } from './components/CrewCard';
import { Footer } from './components/Footer';
import { CREW_MEMBERS } from './data/crew';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-[#e2e2e8] overflow-x-hidden selection:bg-zinc-200 selection:text-black">
      {/* 35mm Film Grain Simulation Overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* STEP 1 & 2: CLICK-TO-ROLL CINEMATIC OPENING (1 -> 2 -> 3 -> SHUTTER WIPE) */}
      {showIntro && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* TOP NAVIGATION (HOME, THE CREW) */}
      <Navigation />

      {/* STEP 3 & 4: MOVIE CREW PORTFOLIO (LEADS DIRECTLY WITH WRITER & DIRECTOR) */}
      <main id="home" className="relative z-10 pt-20 sm:pt-24">
        {/* Subtle Section Header Bar */}
        <section id="crew" className="relative px-6 sm:px-8 pt-8 pb-4 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80">
          <div>
            <div className="text-[11px] font-mono-code text-zinc-400 uppercase tracking-[0.3em] mb-1.5 flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-zinc-400" />
              <span>THE PRODUCTION COLLECTIVE</span>
            </div>
            <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-[0.08em] uppercase">
              THE FILM CREW
            </h1>
          </div>
          <div className="text-xs sm:text-sm text-zinc-400 font-mono-code tracking-wide max-w-md">
            Cinematic vision from script to screen. Scroll to explore the filmmakers behind the frame.
          </div>
        </section>

        {/* CREW MEMBERS STACKED (STARTING IMMEDIATELY WITH MEMBER 01: DIRECTOR) */}
        <section className="relative px-6 sm:px-8 py-10 sm:py-16 max-w-7xl mx-auto space-y-16 lg:space-y-24">
          {CREW_MEMBERS.map((member, index) => (
            <CrewCard key={member.id} member={member} index={index} />
          ))}
        </section>
      </main>

      {/* MINIMAL FOOTER */}
      <Footer />
    </div>
  );
}
