import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play, Film } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface CinematicIntroProps {
  onComplete: () => void;
}

type IntroStage = 'initial' | 'banner-fade' | 'countdown' | 'revealing';

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<IntroStage>('initial');

  // DOM references for GSAP timeline
  const introRootRef = useRef<HTMLDivElement>(null);
  const bannerWrapperRef = useRef<HTMLDivElement>(null);
  const bannerBgRef = useRef<HTMLDivElement>(null);
  const idleContainerRef = useRef<HTMLDivElement>(null);
  const countdownContainerRef = useRef<HTMLDivElement>(null);
  const num3Ref = useRef<HTMLDivElement>(null);
  const num2Ref = useRef<HTMLDivElement>(null);
  const num1Ref = useRef<HTMLDivElement>(null);
  const shutterTopRef = useRef<HTMLDivElement>(null);
  const shutterBottomRef = useRef<HTMLDivElement>(null);
  const lensFlareRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isClickableRef = useRef<boolean>(true);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

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
    if (stage !== 'initial' || !isClickableRef.current) return;
    isClickableRef.current = false;
    setStage('banner-fade');

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
    }, 7500);

    // ========================================================================
    // STEP 1: FADE OUT TITLE & BUTTON (0.3s)
    // ========================================================================
    tl.call(() => {
      try {
        soundEngine.playClapper();
      } catch {
        // safe
      }
    });

    tl.to(idleContainerRef.current, {
      opacity: 0,
      scale: 0.96,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        if (idleContainerRef.current) {
          idleContainerRef.current.style.display = 'none';
        }
      }
    });

    // ========================================================================
    // STEP 2: BANNER FADES IN (1.8s) WITH CINEMATIC ZOOM-IN EFFECT
    // Banner gradually appears from complete transparency to full visibility
    // ========================================================================
    tl.fromTo(
      bannerWrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.8, ease: 'power2.out' },
      '-=0.1'
    );

    tl.fromTo(
      bannerBgRef.current,
      { scale: 1.0 },
      { scale: 1.06, duration: 1.8, ease: 'power1.out' },
      '<'
    );

    // Transition React state to countdown stage
    tl.call(() => {
      setStage('countdown');
    });

    // ========================================================================
    // STEP 3: CINEMATIC COUNTDOWN SEQUENCE (3 → 2 → 1)
    // Runs after banner has faded in. Banner continues its slow cinematic drift.
    // ========================================================================
    tl.to(
      bannerBgRef.current,
      { scale: 1.12, duration: 2.6, ease: 'none' },
      '+=0.05'
    );

    tl.set(countdownContainerRef.current, { display: 'flex', opacity: 1 }, '<');

    // --- NUMBER 3 ---
    tl.call(() => {
      try {
        soundEngine.playClapper();
      } catch {
        // safe
      }
    }, [], '<');

    tl.fromTo(
      num3Ref.current,
      { opacity: 0, scale: 0.82, display: 'block' },
      { opacity: 1, scale: 1.04, duration: 0.28, ease: 'power2.out' },
      '<'
    );
    tl.to(num3Ref.current, {
      scale: 1.12,
      duration: 0.38,
      ease: 'none'
    });
    tl.to(num3Ref.current, {
      opacity: 0,
      scale: 1.24,
      duration: 0.18,
      ease: 'power2.in',
      onComplete: () => {
        if (num3Ref.current) num3Ref.current.style.display = 'none';
      }
    });

    // --- NUMBER 2 ---
    tl.call(() => {
      try {
        soundEngine.playClapper();
      } catch {
        // safe
      }
    }, [], '-=0.08');
    tl.fromTo(
      num2Ref.current,
      { opacity: 0, scale: 0.82, display: 'block' },
      { opacity: 1, scale: 1.04, duration: 0.28, ease: 'power2.out' },
      '-=0.08' // Seamless cross-transition prevents blank screen
    );
    tl.to(num2Ref.current, {
      scale: 1.12,
      duration: 0.38,
      ease: 'none'
    });
    tl.to(num2Ref.current, {
      opacity: 0,
      scale: 1.24,
      duration: 0.18,
      ease: 'power2.in',
      onComplete: () => {
        if (num2Ref.current) num2Ref.current.style.display = 'none';
      }
    });

    // --- NUMBER 1 ---
    tl.call(() => {
      try {
        soundEngine.playClapper();
      } catch {
        // safe
      }
    }, [], '-=0.08');
    tl.fromTo(
      num1Ref.current,
      { opacity: 0, scale: 0.82, display: 'block' },
      { opacity: 1, scale: 1.04, duration: 0.28, ease: 'power2.out' },
      '-=0.08' // Seamless cross-transition prevents blank screen
    );
    tl.to(num1Ref.current, {
      scale: 1.12,
      duration: 0.38,
      ease: 'none'
    });
    tl.to(num1Ref.current, {
      opacity: 0,
      scale: 1.24,
      duration: 0.18,
      ease: 'power2.in',
      onComplete: () => {
        if (num1Ref.current) num1Ref.current.style.display = 'none';
      }
    });

    // ========================================================================
    // STEP 4: CINEMATIC REVEAL OF CREW MEMBERS
    // Immediately after 1 disappears, smooth shutter wipe reveals the crew
    // ========================================================================
    tl.call(() => {
      setStage('revealing');
      try {
        soundEngine.playCinematicImpact();
      } catch {
        // safe
      }
    });

    tl.to(countdownContainerRef.current, {
      opacity: 0,
      duration: 0.1,
      onComplete: () => {
        if (countdownContainerRef.current) {
          countdownContainerRef.current.style.display = 'none';
        }
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

    // Fade out intro root to seamlessly expose movie crew members
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
      {/* FULL-SCREEN THE CREW BANNER BACKGROUND (Fades in smoothly on CLICK TO ROLL) */}
      <div
        ref={bannerWrapperRef}
        style={{ opacity: 0 }}
        className="absolute inset-0 z-0 overflow-hidden bg-[#050507] pointer-events-none"
      >
        <div
          ref={bannerBgRef}
          className="w-full h-full will-change-transform"
          style={{
            backgroundImage: "url('/images/crew-banner.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: 'scale(1)'
          }}
        />
        {/* Subtle 30-40% dark overlay for clear countdown number readability */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 pointer-events-none" />
      </div>

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

      {/* Top Anamorphic Letterbox Bar */}
      <div className="relative top-0 left-0 right-0 h-10 sm:h-12 md:h-14 bg-black/80 backdrop-blur-sm z-30 border-b border-white/5 shrink-0" />

      {/* Viewfinder Framing Marks */}
      <div className="absolute inset-x-4 sm:inset-x-8 inset-y-12 sm:inset-y-16 pointer-events-none border border-white/10 z-20">
        <div className="absolute top-0 left-0 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-l-2 border-white/20" />
        <div className="absolute top-0 right-0 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-r-2 border-white/20" />
        <div className="absolute bottom-0 left-0 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-l-2 border-white/20" />
        <div className="absolute bottom-0 right-0 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-r-2 border-white/20" />
      </div>

      {/* MAIN VIEWPORT STAGE */}
      <div className="relative z-20 flex-1 flex items-center justify-center w-full px-4 sm:px-8 py-6 overflow-hidden">
        {/* STAGE 1: IDLE TITLE & CALL TO ACTION */}
        <div
          ref={idleContainerRef}
          className="relative z-30 text-center max-w-4xl flex flex-col items-center px-2"
        >
          {/* Kicker */}
          <div className="mb-5 sm:mb-6 flex items-center gap-2.5 text-zinc-300 text-[10px] sm:text-xs tracking-[0.3em] font-mono-code uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <Film className="w-3.5 h-3.5 text-amber-200/90 animate-spin" style={{ animationDuration: '16s' }} />
            <span>CINEMATIC PRODUCTION COLLECTIVE</span>
          </div>

          {/* Title */}
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-[0.1em] font-black text-white uppercase drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)] leading-none mb-5 sm:mb-6">
            THE FILM CREW
          </h1>

          {/* Tagline */}
          <p className="text-xs sm:text-sm md:text-lg tracking-[0.25em] sm:tracking-[0.35em] text-zinc-200 font-light uppercase mb-10 sm:mb-12 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            EVERY FRAME HAS A STORY.
          </p>

          {/* Interactive CLICK TO ROLL Button */}
          <button
            ref={buttonRef}
            type="button"
            onClick={handleStartRoll}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-11 py-4 sm:py-4.5 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-700 hover:border-amber-400/80 text-white tracking-[0.25em] text-xs sm:text-sm font-semibold uppercase hover:shadow-[0_0_35px_rgba(245,190,80,0.3)] transition-all cursor-pointer overflow-hidden active:scale-95"
          >
            {/* Visual sheen swipe */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            <Play className="w-3.5 h-3.5 fill-white text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
            <span className="relative z-10 whitespace-nowrap">CLICK TO ROLL</span>
          </button>
        </div>

        {/* STAGE 2: COUNTDOWN SEQUENCE (3 → 2 → 1) */}
        <div
          ref={countdownContainerRef}
          style={{ display: 'none' }}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
          {/* Elegant Circular Countdown Frame */}
          <div className="relative flex items-center justify-center w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96">
            {/* Subtle rings with amber accents */}
            <div className="absolute inset-0 rounded-full border border-amber-400/25" />
            <div className="absolute inset-6 rounded-full border border-white/15" />
            <div className="absolute inset-16 rounded-full border border-amber-300/10" />

            {/* Subtle crosshairs */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/25" />
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/25" />

            {/* Subtle radar sweep */}
            <div
              className="absolute inset-0 rounded-full animate-radar origin-center pointer-events-none opacity-40"
              style={{
                background:
                  'conic-gradient(from 0deg, rgba(245,190,80,0.3) 0deg, transparent 60deg, transparent 360deg)'
              }}
            />

            {/* NUMBER 3 */}
            <div
              ref={num3Ref}
              style={{ display: 'none', opacity: 0 }}
              className="absolute font-cinzel text-9xl sm:text-[11rem] md:text-[14rem] lg:text-[16rem] font-black text-amber-50 tracking-normal leading-none select-none drop-shadow-[0_0_40px_rgba(245,190,80,0.65)] [text-shadow:_0_0_25px_rgba(245,190,80,0.7),_0_0_60px_rgba(217,148,22,0.4)]"
            >
              3
            </div>

            {/* NUMBER 2 */}
            <div
              ref={num2Ref}
              style={{ display: 'none', opacity: 0 }}
              className="absolute font-cinzel text-9xl sm:text-[11rem] md:text-[14rem] lg:text-[16rem] font-black text-amber-50 tracking-normal leading-none select-none drop-shadow-[0_0_40px_rgba(245,190,80,0.65)] [text-shadow:_0_0_25px_rgba(245,190,80,0.7),_0_0_60px_rgba(217,148,22,0.4)]"
            >
              2
            </div>

            {/* NUMBER 1 */}
            <div
              ref={num1Ref}
              style={{ display: 'none', opacity: 0 }}
              className="absolute font-cinzel text-9xl sm:text-[11rem] md:text-[14rem] lg:text-[16rem] font-black text-amber-50 tracking-normal leading-none select-none drop-shadow-[0_0_40px_rgba(245,190,80,0.65)] [text-shadow:_0_0_25px_rgba(245,190,80,0.7),_0_0_60px_rgba(217,148,22,0.4)]"
            >
              1
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Anamorphic Letterbox Bar */}
      <div className="relative bottom-0 left-0 right-0 h-10 sm:h-12 md:h-14 bg-black/80 backdrop-blur-sm z-30 border-t border-white/5 shrink-0" />
    </div>
  );
};
