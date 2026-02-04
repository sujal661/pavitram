'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue, useSpring } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Configuration ---
// MATCHING THE FILES FOUND IN PUBLIC/FRAMERS:
const FRAME_COUNT = 208; 
const IMAGE_NAME = (index: number) => {
  const padded = (index + 1).toString().padStart(3, '0');
  return `/framers/ezgif-frame-${padded}.jpg`;
};

const PLACEHOLDER_COLOR = '#1a1a1a';
const TEXT_COLOR = '#fff';

export default function HeadphoneScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  // Use Document Scroll or Local Container?
  // To blend seamlessly, we treat this component as the main page wrapper.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth out the scroll progress for a more fluid animation feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // --- 1. Optimized Progressive Loading ---
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = new Array(FRAME_COUNT);
    
    // Priority levels:
    // 0: First frame (Immediate)
    // 1: Every 4th frame (Faster "Low-FPS" interaction ready)
    // 2: The rest (Full resolution)

    const loadSingleImage = (index: number) => {
      if (imgArray[index]) return Promise.resolve(); // Already loading/loaded
      
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = IMAGE_NAME(index);
        img.onload = () => {
          imgArray[index] = img;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
          
          // Once 50 images are loaded (including every 4th one), we can show the content
          if (loadedCount >= 50 && !isLoaded) {
            setImages([...imgArray]);
            setIsLoaded(true);
            setTimeout(() => setShowContent(true), 500);
          }
          
          // Periodically update the images array to show newly loaded frames
          if (loadedCount % 5 === 0) {
            setImages([...imgArray]);
          }
          
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          resolve();
        };
      });
    };

    const loadSequence = async () => {
      // 1. Load First Frame
      await loadSingleImage(0);
      
      // 2. Load Every 4th Frame (Priority 1)
      const priority1Urls = [];
      for (let i = 4; i < FRAME_COUNT; i += 4) {
        priority1Urls.push(i);
      }
      
      // Load priority 1 in smaller chunks
      for (let i = 0; i < priority1Urls.length; i += 10) {
        const chunk = priority1Urls.slice(i, i + 10);
        await Promise.all(chunk.map(index => loadSingleImage(index)));
      }

      // 3. Load Remaining Frames (Priority 2)
      const priority2Urls = [];
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (!imgArray[i]) priority2Urls.push(i);
      }
      
      const CHUNK_SIZE = 12;
      for (let i = 0; i < priority2Urls.length; i += CHUNK_SIZE) {
        const chunk = priority2Urls.slice(i, i + CHUNK_SIZE);
        await Promise.all(chunk.map(index => loadSingleImage(index)));
        // Tiny sleep to keep UI responsive
        await new Promise(r => setTimeout(r, 20));
        
        // Final sync at the end
        if (i + CHUNK_SIZE >= priority2Urls.length) {
          setImages([...imgArray]);
        }
      }
    };

    loadSequence();
  }, []);

  // --- 2. Canvas Rendering ---
  const renderCanvas = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const activeImg = images[index] && images[index].naturalWidth > 0 ? images[index] : null;
    
    // Find nearest available frame if active is missing
    let displayImg = activeImg;
    if (!displayImg) {
      for (let i = 1; i < 20; i++) {
        if (images[index - i] && images[index - i].naturalWidth > 0) { displayImg = images[index - i]; break; }
        if (images[index + i] && images[index + i].naturalWidth > 0) { displayImg = images[index + i]; break; }
      }
    }

    if (!displayImg) return;

    const imgRatio = displayImg.width / displayImg.height;
    const canvasRatio = width / height;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(displayImg, offsetX, offsetY, drawWidth, drawHeight);
  };

  // --- 3. Animation Loop ---
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (!isLoaded) return;
    const index = Math.floor(latest);
    requestAnimationFrame(() => renderCanvas(index));
  });

  // Init & Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const currentFrame = Math.floor(frameIndex.get());
        renderCanvas(currentFrame);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, frameIndex]);

  useEffect(() => {
    if (isLoaded) {
      const currentFrame = Math.floor(frameIndex.get());
      renderCanvas(currentFrame);
    }
  }, [isLoaded]);

  // Track client-side mounting to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-[#050505]">
      {/* Cinematic Loading Reveal */}
      <motion.div 
        initial={false}
        animate={{ 
          opacity: isLoaded ? 0 : 1,
          pointerEvents: isLoaded ? 'none' : 'auto'
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
      >
        <div className="relative w-full max-w-md px-12 space-y-8">
           <div className="flex flex-col items-center">
              <motion.div 
                className="w-16 h-16 rounded-full border border-[#C6A87C]/20 flex items-center justify-center relative overflow-hidden"
              >
                 <motion.div 
                   className="absolute inset-0 bg-[#C6A87C]/10"
                   style={{ height: `${loadProgress}%`, bottom: 0, top: 'auto' }}
                 />
                 <span className="relative z-10 text-[10px] font-mono text-[#C6A87C]">{loadProgress}%</span>
              </motion.div>
              <div className="mt-8 space-y-2 text-center">
                 <h3 className="text-xs font-bold tracking-[0.6em] text-[#C6A87C] uppercase">Synchronizing</h3>
                 <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase">Molecular Frequency</p>
              </div>
           </div>
           
           {/* Progress Line */}
           <div className="relative w-full h-[1px] bg-white/5 overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#C6A87C]"
                initial={{ width: 0 }}
                animate={{ width: `${loadProgress}%` }}
              />
           </div>
        </div>
      </motion.div>

      {/* Fixed Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
         <motion.div
           animate={{ 
             scale: isLoaded ? 1 : 1.1,
             filter: isLoaded ? 'blur(0px)' : 'blur(20px)'
           }}
           transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
           className="w-full h-full"
         >
            <canvas ref={canvasRef} className="block w-full h-full object-cover" />
         </motion.div>
         
         {/* Filmic Grain Overlay */}
         <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay">
           <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
             <filter id="noise">
               <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
             </filter>
             <rect width="100%" height="100%" filter="url(#noise)" />
           </svg>
         </div>

         {/* Vignette & Color Overlay */}
         <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] opacity-60" />
         <div className="absolute inset-0 z-0 pointer-events-none bg-black/10" />
         
         {/* Floating Ambient Particles - Client Side Only */}
         {isMounted && (
           <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#C6A87C]/40 rounded-full"
                  initial={{ 
                    x: `${Math.random() * 100}%`, 
                    y: `${Math.random() * 100}%`,
                    opacity: 0
                  }}
                  animate={{ 
                    y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                    opacity: [0, 0.4, 0],
                    scale: [0, 1.2, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 20 + 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 10
                  }}
                />
              ))}
           </div>
         )}

         {/* Ambient Light Rays */}
         <div className="absolute inset-0 overflow-hidden opacity-30 mix-blend-screen pointer-events-none z-0">
            <motion.div
              animate={{ rotate: 360, opacity: [0.2, 0.4, 0.2] }}
              transition={{ rotate: { duration: 80, repeat: Infinity, ease: "linear" }, opacity: { duration: 5, repeat: Infinity } }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%]"
            >
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute top-0 left-1/2 w-[4px] h-1/2 bg-gradient-to-b from-[#C6A87C]/20 to-transparent origin-bottom" 
                  style={{ transform: `translateX(-50%) rotate(${i * 60}deg)` }}
                />
              ))}
            </motion.div>
         </div>

         {/* Sophisticated Scroll Indicator */}
         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50">
            <div className="flex items-center gap-6">
              <span className="text-[#C6A87C]/60 text-xs tracking-[0.3em] font-mono">01</span>
              <div className="relative w-32 h-[1px] bg-white/20">
                <motion.div
                  style={{ scaleX: scrollYProgress, originX: 0 }}
                  className="absolute inset-0 bg-[#C6A87C] shadow-[0_0_10px_rgba(198,168,124,0.5)]"
                />
              </div>
              <span className="text-[#C6A87C]/60 text-xs tracking-[0.3em] font-mono">03</span>
            </div>
            
            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0.8]) }}
              className="flex flex-col items-center"
            >
               <motion.div
                 animate={{ y: [0, 8, 0] }}
                 transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                 className="w-[1px] h-8 bg-gradient-to-b from-[#C6A87C] to-transparent"
               />
               <span className="text-[#C6A87C]/80 text-[10px] tracking-[0.5em] uppercase mt-2 font-bold">Evolution</span>
            </motion.div>
         </div>

         {/* Scroll Percentage (Floating Corner) */}
         <div className="absolute top-12 right-12 z-50 mix-blend-difference">
            <motion.div className="flex flex-col items-end">
              <motion.span className="text-5xl font-serif text-[#C6A87C]/60 leading-none">
                {Math.round(scrollYProgress.get() * 100)}%
              </motion.span>
              <span className="text-xs tracking-[0.4em] uppercase text-[#C6A87C]/40 mt-1 font-bold">Status</span>
            </motion.div>
         </div>
      </div>

      {/* Scrollytelling Overlay Container */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* HERO Section - Fixed at top relative to scroll flow, fading out */}
        <HeroSection scrollY={scrollYProgress} show={showContent} />

        {/* Story Sections - Distributed down the timeline */}
        <StorySections scrollY={scrollYProgress} />

      </div>
    </div>
  );
}

// --- Sub-Components ---

function HeroSection({ scrollY, show }: { scrollY: MotionValue<number>, show: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const opacity = useTransform(scrollY, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollY, [0, 0.15], [1, 0.9]);
  const y = useTransform(scrollY, [0, 0.15], [0, 100]);
  const glowY = useTransform(scrollY, [0, 0.15], [0, -50]);
  const glowScale = useTransform(scrollY, [0, 0.15], [1, 1.3]);

  useEffect(() => {
    const move = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const titleChars = "PAVITRAM".split("");

  return (
    <motion.div 
      style={{ opacity, scale, y }}
      className="sticky top-0 h-screen flex flex-col items-center justify-center text-center z-10 px-4 overflow-hidden pointer-events-auto"
    >
        {/* Interactive Cursor Glow */}
        <motion.div 
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
          className="fixed top-0 left-0 w-[400px] h-[400px] bg-[#C6A87C]/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[-1]"
        />

        {/* Enhanced Parallax Glow */}
        <motion.div 
          style={{ y: glowY, scale: glowScale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#C6A87C]/10 blur-[150px] rounded-full animate-pulse -z-10" 
        />
        
        <motion.div
           initial={{ opacity: 0, letterSpacing: "1em" }}
           animate={{ opacity: 1, letterSpacing: "0.4em" }}
           transition={{ duration: 2, ease: "easeOut" }}
           className="text-[#C6A87C] uppercase text-[10px] font-bold mb-8 tracking-[0.4em] opacity-80"
        >
          Sacred Botanical Essence
        </motion.div>

        <div className="flex overflow-hidden">
          {titleChars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              animate={show ? { y: 0, opacity: 1 } : {}}
              transition={{ 
                duration: 1.5, 
                delay: 0.8 + (0.1 * i), 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="text-[12vw] leading-none font-serif text-white font-black tracking-tighter mix-blend-overlay inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Enhanced Tagline */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="space-y-6 mt-12"
        >
          <p className="text-white/80 text-xl md:text-2xl font-light tracking-[0.2em] max-w-lg uppercase">
            The soul of nature, distilled.
          </p>
          
          <div className="flex items-center justify-center gap-6">
             <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C6A87C]/60" />
             <span className="text-xs text-[#C6A87C] font-mono tracking-widest uppercase font-bold">Est. 2024</span>
             <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C6A87C]/60" />
          </div>
        </motion.div>
    </motion.div>
  );
}

function StorySections({ scrollY }: { scrollY: MotionValue<number> }) {
  // Parallax values for story text
  const yParallaxFast = useTransform(scrollY, [0, 1], [0, -200]);
  const yParallaxSlow = useTransform(scrollY, [0, 1], [0, -100]);

  return (
    <div className="relative w-full h-full">
       {/* 1. Pure Extraction (Visible around 30% scroll) */}
       <OverlaySection scrollY={scrollY} start={0.25} end={0.45} align="left">
          <motion.div style={{ y: yParallaxSlow }} className="max-w-xl">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="w-20 h-[2px] bg-[#C6A87C] mb-8 origin-left" 
            />
            <h2 className="text-6xl md:text-8xl font-black mb-6 text-white tracking-tighter leading-none drop-shadow-2xl">
               PURE <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A87C] to-[#FFE5B4]">EXTRACTION.</span>
            </h2>
            <p className="text-2xl text-white/70 font-light drop-shadow-md leading-relaxed tracking-wide">
              Cold-pressed from organic botanicals to preserve every delicate molecular note.
            </p>
            <div className="mt-10 flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-[#C6A87C] animate-ping" />
               <span className="text-[10px] text-[#C6A87C] uppercase tracking-[0.5em] font-bold">Molecular Integrity</span>
            </div>
          </motion.div>
       </OverlaySection>

       {/* 2. Therapeutic Grade (Visible around 60% scroll) */}
       <OverlaySection scrollY={scrollY} start={0.5} end={0.7} align="right">
          <motion.div style={{ y: yParallaxFast }} className="max-w-xl text-right ml-auto">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="w-20 h-[2px] bg-[#C6A87C] mb-8 origin-right ml-auto" 
            />
            <h2 className="text-6xl md:text-8xl font-black mb-6 text-white tracking-tighter leading-none drop-shadow-2xl">
               DIVINE <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#C6A87C] to-[#FFE5B4]">BALANCE.</span>
            </h2>
            <p className="text-2xl text-white/70 font-light drop-shadow-md leading-relaxed tracking-wide">
              Scientifically calibrated to elevate the spirit and restore neural equilibrium.
            </p>
            <div className="mt-10 flex items-center gap-4 justify-end">
               <span className="text-[10px] text-[#C6A87C] uppercase tracking-[0.5em] font-bold">Neural Restoration</span>
               <div className="w-2 h-2 rounded-full bg-[#C6A87C] animate-ping" />
            </div>
          </motion.div>
       </OverlaySection>

       {/* 3. CTA (Visible near end) */}
       <OverlaySection scrollY={scrollY} start={0.75} end={0.95} align="center">
          <div className="text-center relative">
            {/* Ambient Background Glow for CTA */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#C6A87C]/5 blur-[120px] rounded-full -z-10" />

            {/* Decorative Frame Elements */}
            <div className="absolute -inset-x-32 -inset-y-20 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#C6A87C]/30 to-transparent" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#C6A87C]/30 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="space-y-4"
            >
              <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter drop-shadow-2xl leading-none">
                BREATHE.
              </h2>
              <div className="h-1" />
              <p className="text-xl md:text-2xl text-[#C6A87C] font-serif italic tracking-widest opacity-80">
                Experience the art of silence.
              </p>
            </motion.div>
            
            <div className="my-16">
              <ShopButton />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-[1px] h-12 bg-gradient-to-b from-[#C6A87C] to-transparent" />
              <p className="text-[10px] text-white/40 uppercase tracking-[0.5em] font-bold">
                Free Shipping • Premium Quality
              </p>
            </motion.div>
          </div>
       </OverlaySection>
    </div>
  );
}

function ShopButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="relative inline-block pointer-events-auto">
      {/* Multiple Outer Glow Rings - Enhanced */}
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.15, 1] : [1, 1.05, 1],
          opacity: isHovered ? [0.4, 0.6, 0.4] : [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -inset-12 bg-gradient-to-r from-[#C6A87C] via-[#FFD700] to-[#C6A87C] rounded-full blur-[60px]"
      />
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.2, 1] : [1, 1.08, 1],
          opacity: isHovered ? [0.3, 0.5, 0.3] : [0.15, 0.2, 0.15]
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
        className="absolute -inset-16 bg-gradient-to-r from-[#FFE5B4] via-[#C6A87C] to-[#FFE5B4] rounded-full blur-[80px]"
      />
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.25, 1] : 1,
          opacity: isHovered ? [0.2, 0.4, 0.2] : 0
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
        className="absolute -inset-20 bg-gradient-to-r from-[#8B5E3C] via-[#C6A87C] to-[#8B5E3C] rounded-full blur-[100px]"
      />

      {/* Sound Wave Rings */}
      {isHovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{
                scale: [1, 1.8, 2.5],
                opacity: [0.5, 0.2, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut"
              }}
            >
              <div className="w-full h-full rounded-full border-2 border-[#C6A87C]/30" />
            </motion.div>
          ))}
        </>
      )}

      <motion.div
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          x: mousePosition.x * 0.15,
          y: mousePosition.y * 0.15,
          rotateX: -mousePosition.y * 0.08,
          rotateY: mousePosition.x * 0.08,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        className="relative"
      >
        <button className="relative px-12 py-4 bg-gradient-to-br from-[#0a0a0a] via-[#1a1410] to-[#0a0a0a] backdrop-blur-xl rounded-full leading-none flex items-center justify-center border-2 border-[#C6A87C]/50 shadow-[0_0_100px_rgba(198,168,124,0.3),0_0_60px_rgba(255,215,0,0.2)] overflow-hidden group">
          
          {/* Rotating Gradient Border - Enhanced */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          >
            <div className="w-full h-full rounded-full bg-gradient-conic from-[#C6A87C] via-[#FFD700] to-[#C6A87C]" 
                 style={{
                   background: "conic-gradient(from 0deg, #C6A87C 0%, #FFD700 25%, #C6A87C 50%, #FFD700 75%, #C6A87C 100%)"
                 }}
            />
          </motion.div>

          {/* Inner Container for Isolation */}
          <div className="absolute inset-[2px] bg-gradient-to-br from-[#0a0a0a] via-[#1a1410] to-[#0a0a0a] rounded-full" />

          {/* Animated Shimmer - Enhanced */}
          <motion.div
            animate={{
              x: ["-250%", "250%"]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0.5
            }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 blur-sm"
          />

          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-[#C6A87C]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

          {/* Content */}
          <span className="relative z-10 flex items-center gap-4">
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A87C] via-[#FFE5B4] to-[#C6A87C] text-base md:text-lg font-serif font-bold uppercase tracking-[0.25em] group-hover:tracking-[0.3em] transition-all duration-300"
              style={{
                backgroundSize: "200% 100%",
                filter: "drop-shadow(0 0 15px rgba(198,168,124,0.6))"
              }}
              animate={{
                backgroundPosition: isHovered ? ["0%", "100%", "0%"] : "0%"
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Shop Pavitram
            </motion.span>
            
            <motion.div
              animate={{
                x: isHovered ? [0, 8, 0] : 0,
                rotate: isHovered ? [0, -45, 0] : 0
              }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="relative"
            >
              <motion.span 
                className="text-[#C6A87C] text-xl md:text-2xl font-bold"
                style={{
                  filter: "drop-shadow(0 0 12px rgba(198,168,124,1))"
                }}
                animate={{
                  scale: isHovered ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                →
              </motion.span>
              
              {/* Arrow Trails */}
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{
                    opacity: isHovered ? [0, 0.4, 0] : 0,
                    x: isHovered ? [0, -15 * (i + 1)] : 0
                  }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                  className="absolute inset-0 text-[#C6A87C] text-xl md:text-2xl font-bold"
                  style={{ opacity: 0.3 - i * 0.1 }}
                >
                  →
                </motion.span>
              ))}
            </motion.div>
          </span>

          {/* Enhanced Radial Particle Burst */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${i % 2 === 0 ? '#C6A87C' : '#FFD700'}, transparent)`
                  }}
                  animate={{
                    x: [0, Math.cos(i * 30 * Math.PI / 180) * 80],
                    y: [0, Math.sin(i * 30 * Math.PI / 180) * 80],
                    opacity: [1, 0.5, 0],
                    scale: [1, 0.5, 0.2]
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 0.08
                  }}
                />
              ))}
            </div>
          )}

          {/* Orbiting Micro Particles */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`orbit-${i}`}
                  className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#FFD700] rounded-full"
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5
                  }}
                  style={{
                    transformOrigin: `${40 + i * 5}px 0px`
                  }}
                />
              ))}
            </div>
          )}

          {/* Bottom Gradient Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-[#C6A87C]/30 via-[#C6A87C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-full" />
          
          {/* Top Shine */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          
          {/* Side Glows */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-1/2 bg-gradient-to-b from-transparent via-[#C6A87C]/30 to-transparent" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-1/2 bg-gradient-to-b from-transparent via-[#C6A87C]/30 to-transparent" />

          {/* Depth Shadow Inside */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)] pointer-events-none" />
        </button>
      </motion.div>
    </div>
  );
}

function OverlaySection({ 
  scrollY, 
  start, 
  end, 
  children, 
  align = 'center' 
}: { 
  scrollY: MotionValue<number>, 
  start: number, 
  end: number, 
  children: React.ReactNode,
  align?: 'left' | 'center' | 'right'
}) {
  const fadeIn = start + (end - start) * 0.15;
  const fadeOut = end - (end - start) * 0.15;

  const opacity = useTransform(scrollY, [start, fadeIn, fadeOut, end], [0, 1, 1, 0]);
  const y = useTransform(scrollY, [start, end], [50, -50]);
  const scale = useTransform(scrollY, [start, end], [0.95, 1.05]);
  const blur = useTransform(scrollY, [start, fadeIn, fadeOut, end], [8, 0, 0, 8]);

  const alignClasses = {
    left: 'items-start text-left pl-8 md:pl-24',
    center: 'items-center text-center px-4',
    right: 'items-end text-right pr-8 md:pr-24'
  };

  return (
    <motion.div 
      style={{ 
        opacity, 
        y, 
        scale,
        filter: `blur(${blur}px)`
      }}
      className={twMerge(
        "fixed inset-0 flex flex-col justify-center pointer-events-none z-20", 
        alignClasses[align]
      )}
    >
      {/* Enhanced Ambient Glow */}
      <motion.div 
        style={{ opacity: useTransform(scrollY, [start, fadeIn], [0, 0.15]) }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/20 blur-[120px] rounded-full pointer-events-none -z-10" 
      />
      
      <div className="relative z-10 w-full">
        {children}
      </div>
    </motion.div>
  );
}
