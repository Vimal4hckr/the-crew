import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Film } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [timecode, setTimecode] = useState('01:00:00:00');

  // DOM references for GSAP timeline
  const introRootRef = useRef<HTMLDivElement>(null);
  const idleContainerRef = useRef<HTMLDivElement>(null);
  const countdownContainerRef = useRef<HTMLDivElement>(null);
  const num1Ref = useRef<HTMLDivElement>(null);
  const num2Ref = useRef<HTMLDivElement>(null);
  const num3Ref = useRef<HTMLDivElement>(null);
  const shutterTopRef = useRef<HTMLDivElement>(null);
  const shutterBottomRef = useRef<HTMLDivElement>(null);
  const lensFlareRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isClickableRef = useRef<boolean>(true);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // SMPTE running timecode (24 FPS)
  useEffect(() => {
    let frame = 0;
    const interval = window.setInterval(() => {
      frame = (frame + 1) % 24;
      const secs = Math.floor(Date.now() / 1000) % 60;
      const mins = Math.floor(Date.now() / 60000) % 60;
      const hrs = 1;
      const fmt = (n: number) => n.toString().padStart(2, '0');
      setTimecode(`${fmt(hrs)}:${fmt(mins)}:${fmt(secs)}:${fmt(frame)}`);
    }, 41.6);

    return () => clearInterval(interval);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      try {
        soundEngine.stopProjectorRoll();
      } catch {
        // safe
      }
    };
  }, []);

  const handleStartRoll = () => {
    if (!isClickableRef.current) return;
    isClickableRef.current = false;

    if (buttonRef.current) {
      buttonRef.current.disabled = true;
      buttonRef.current.style.pointerEvents = 'none';
      buttonRef.current.style.opacity = '0.5';
    }

    // Master GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        try {
          soundEngine.stopProjectorRoll();
        } catch {
          // safe
        }
        onComplete();
      }
    });

    timelineRef.current = tl;

    // Fail-safe timeout
    const safetyTimeout = window.setTimeout(() => {
      try {
        soundEngine.stopProjectorRoll();
      } catch {
        // safe
      }
      onComplete();
    }, 6000);

    // ==========================================
    // STEP 1: FADE OUT TITLE & BUTTON (0.3s)
    // ==========================================
    tl.call(() => {
      try {
        soundEngine.playClapper();
      } catch {
        // safe
      }
    });

    tl.to(idleContainerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        if (idleContainerRef.current) {
          idleContainerRef.current.style.display = 'none';
        }
      }
    });

    // ========================================================================
    // STEP 2: CLASSIC FILM COUNTDOWN (1 → 2 → 3)
    // ~800ms per number with smooth scale, opacity, and sound sync
    // ========================================================================
    tl.set(countdownContainerRef.current, { display: 'flex', opacity: 1 });

    // --- NUMBER 1 ---
    tl.call(() => {
      try {
        soundEngine.playClapper();
      } catch {
        // safe
      }
    });
    tl.fromTo(
      num1Ref.current,
      { opacity: 0, scale: 1.35, display: 'block' },
      { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
    );
    tl.to(num1Ref.current, {
      opacity: 1,
      duration: 0.45 // Hold visible (~700-800ms total)
    });
    tl.to(num1Ref.current, {
      opacity: 0,
      scale: 0.7,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        if (num1Ref.current) num1Ref.current.style.display = 'none';
      }
    });

    // --- NUMBER 2 ---
    tl.call(() => {
      try {
        soundEngine.playClapper();
      } catch {
        // safe
      }
    });
    tl.fromTo(
      num2Ref.current,
      { opacity: 0, scale: 1.35, display: 'block' },
      { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
    );
    tl.to(num2Ref.current, {
      opacity: 1,
      duration: 0.45 // Hold visible (~700-800ms total)
    });
    tl.to(num2Ref.current, {
      opacity: 0,
      scale: 0.7,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        if (num2Ref.current) num2Ref.current.style.display = 'none';
      }
    });

    // --- NUMBER 3 ---
    tl.call(() => {
      try {
        soundEngine.playClapper();
      } catch {
        // safe
      }
    });
    tl.fromTo(
      num3Ref.current,
      { opacity: 0, scale: 1.35, display: 'block' },
      { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
    );
    tl.to(num3Ref.current, {
      opacity: 1,
      duration: 0.45 // Hold visible (~700-800ms total)
    });
    tl.to(num3Ref.current, {
      opacity: 0,
      scale: 0.7,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        if (num3Ref.current) num3Ref.current.style.display = 'none';
      }
    });

    // ========================================================================
    // STEP 3: CINEMATIC SHUTTER OPENING TRANSITION
    // Immediately after 3, shutter wipes open to reveal Writer & Director
    // ========================================================================
    tl.to(countdownContainerRef.current, {
      opacity: 0,
      duration: 0.1,
      onComplete: () => {
        if (countdownContainerRef.current) {
          countdownContainerRef.current.style.display = 'none';
        }
      }
    });

    // Sub-bass cinematic boom
    tl.call(() => {
      try {
        soundEngine.playCinematicImpact();
      } catch {
        // safe
      }
    });

    // Shutter blades open vertically + lens flare flash
    tl.set([shutterTopRef.current, shutterBottomRef.current], { display: 'block' });
    tl.set(lensFlareRef.current, { display: 'block', opacity: 0 });

    tl.to(lensFlareRef.current, {
      opacity: 0.8,
      duration: 0.2,
      ease: 'power2.in'
    });

    tl.to(shutterTopRef.current, {
      yPercent: -100,
      duration: 0.65,
      ease: 'power3.inOut'
    }, '-=0.1');

    tl.to(shutterBottomRef.current, {
      yPercent: 100,
      duration: 0.65,
      ease: 'power3.inOut'
    }, '<');

    tl.to(lensFlareRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, '-=0.3');

    // Fade out intro root to seamlessly expose Writer & Director (Member 01)
    tl.to(introRootRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.out',
      onComplete: () => {
        clearTimeout(safetyTimeout);
      }
    }, '-=0.25');
  };

  return (
    <div
      ref={introRootRef}
      className="fixed inset-0 z-50 bg-[#050507] text-white overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Cinematic Shutter Transition Panels (Top & Bottom Blades) */}
      <div
        ref={shutterTopRef}
        style={{ display: 'none' }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-black z-40 border-b border-white/10"
      />
      <div
        ref={shutterBottomRef}
        style={{ display: 'none' }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-black z-40 border-t border-white/10"
      />

      {/* Optical Lens Flare Burst Flash */}
      <div
        ref={lensFlareRef}
        style={{ display: 'none', opacity: 0 }}
        className="absolute inset-0 z-50 bg-radial from-white/40 via-amber-100/10 to-transparent pointer-events-none"
      />

      {/* Top 2.39:1 Anamorphic Letterbox Bar */}
      <div className="relative top-0 left-0 right-0 h-10 sm:h-12 md:h-14 bg-black z-30 border-b border-white/5 flex items-center justify-between px-4 sm:px-8 text-[9px] sm:text-[10px] font-mono-code tracking-widest text-zinc-400 shrink-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-zinc-300 font-bold">REEL 01-A</span>
          <span className="hidden xs:inline text-zinc-600">/</span>
          <span className="hidden xs:inline">35MM · 24 FPS</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-300">TC {timecode}</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-400">
          <span className="hidden sm:inline text-zinc-600">COLOR SPACE:</span>
          <span>DCI-P3 · 5600K</span>
        </div>
      </div>

      {/* Viewfinder Framing Marks */}
      <div className="absolute inset-x-4 sm:inset-x-8 inset-y-12 sm:inset-y-16 pointer-events-none border border-white/5 z-20">
        <div className="absolute top-0 left-0 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-l-2 border-white/20" />
        <div className="absolute top-0 right-0 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-r-2 border-white/20" />
        <div className="absolute bottom-0 left-0 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-l-2 border-white/20" />
        <div className="absolute bottom-0 right-0 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-r-2 border-white/20" />
      </div>

      {/* MAIN VIEWPORT STAGE */}
      <div className="relative flex-1 flex items-center justify-center w-full px-4 sm:px-8 py-6 overflow-hidden">
        {/* STAGE 1: IDLE TITLE & CALL TO ACTION */}
        <div
          ref={idleContainerRef}
          className="relative z-30 text-center max-w-4xl flex flex-col items-center px-2"
        >
          {/* Kicker */}
          <div className="mb-5 sm:mb-6 flex items-center gap-2.5 text-zinc-400 text-[10px] sm:text-xs tracking-[0.3em] font-mono-code uppercase">
            <Film className="w-3.5 h-3.5 text-zinc-300 animate-spin" style={{ animationDuration: '16s' }} />
            <span>CINEMATIC PRODUCTION COLLECTIVE</span>
          </div>

          {/* Title */}
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-[0.1em] font-black text-white uppercase drop-shadow-[0_10px_35px_rgba(255,255,255,0.08)] leading-none mb-5 sm:mb-6">
            THE FILM CREW
          </h1>

          {/* Tagline */}
          <p className="text-xs sm:text-sm md:text-lg tracking-[0.25em] sm:tracking-[0.35em] text-zinc-300 font-light uppercase mb-10 sm:mb-12">
            EVERY FRAME HAS A STORY.
          </p>

          {/* Interactive CLICK TO ROLL Button */}
          <button
            ref={buttonRef}
            type="button"
            onClick={handleStartRoll}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-11 py-4 sm:py-4.5 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-700 hover:border-zinc-300 text-white tracking-[0.25em] text-xs sm:text-sm font-semibold uppercase hover:shadow-[0_0_30px_rgba(255,255,255,0.18)] transition-all cursor-pointer overflow-hidden active:scale-95"
          >
            {/* Visual sheen swipe */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            <Play className="w-3.5 h-3.5 fill-white text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
            <span className="relative z-10 whitespace-nowrap">CLICK TO ROLL</span>
          </button>
        </div>

        {/* STAGE 2: ACADEMY COUNTDOWN SEQUENCE (1 → 2 → 3) */}
        <div
          ref={countdownContainerRef}
          style={{ display: 'none' }}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
          {/* Concentric Countdown Discs */}
          <div className="relative flex items-center justify-center w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96">
            {/* Outer rings */}
            <div className="absolute inset-0 rounded-full border border-white/30" />
            <div className="absolute inset-6 rounded-full border border-white/20" />
            <div className="absolute inset-16 rounded-full border border-white/10" />

            {/* Crosshair lines */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/40" />
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/40" />

            {/* Radar sweep */}
            <div
              className="absolute inset-0 rounded-full animate-radar origin-center pointer-events-none"
              style={{
                background:
                  'conic-gradient(from 0deg, rgba(255,255,255,0.35) 0deg, transparent 60deg, transparent 360deg)'
              }}
            />

            {/* NUMBER 1 */}
            <div
              ref={num1Ref}
              style={{ display: 'none', opacity: 0 }}
              className="absolute font-bebas text-9xl sm:text-[11rem] md:text-[13rem] font-bold text-white tracking-normal leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              1
            </div>

            {/* NUMBER 2 */}
            <div
              ref={num2Ref}
              style={{ display: 'none', opacity: 0 }}
              className="absolute font-bebas text-9xl sm:text-[11rem] md:text-[13rem] font-bold text-white tracking-normal leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              2
            </div>

            {/* NUMBER 3 */}
            <div
              ref={num3Ref}
              style={{ display: 'none', opacity: 0 }}
              className="absolute font-bebas text-9xl sm:text-[11rem] md:text-[13rem] font-bold text-white tracking-normal leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              3
            </div>

            {/* Sub-label */}
            <div className="absolute -bottom-8 font-mono-code text-[10px] sm:text-[11px] tracking-[0.3em] text-zinc-400 uppercase">
              OPTICAL SOUND SYNC · 24 FPS
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 2.39:1 Anamorphic Letterbox Bar */}
      <div className="relative bottom-0 left-0 right-0 h-10 sm:h-12 md:h-14 bg-black z-30 border-t border-white/5 flex items-center justify-between px-4 sm:px-8 text-[9px] sm:text-[10px] font-mono-code tracking-widest text-zinc-400 shrink-0">
        <div>ASPECT RATIO 2.39:1 SCOPE</div>
        <div className="hidden sm:inline text-zinc-500">ACADEMY APERTURE GATE · MASTER PROJECTION</div>
        <div className="text-zinc-300">FPS: 24.000</div>
      </div>
    </div>
  );
};
