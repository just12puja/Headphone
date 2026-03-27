"use client";

import { useEffect, useRef } from "react";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import Lenis from "lenis";
import VideoSequence from "@/components/VideoSequence";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Plateau the animation so it rests fully assembled at the very top and very bottom
  const frameProgress = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 0, 1, 1]
  );

  const smoothProgress = useSpring(frameProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Adjusts smoothness (lower is smoother but slower)
      smoothWheel: true,
    });
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    return () => lenis.destroy();
  }, []);

  return (
    <main ref={containerRef} className="relative w-full bg-background" style={{ height: "600vh" }}>
      {/* Fixed Background Layer (Sticky replacement) - Pushed below navbar */}
      <div className="fixed top-14 left-0 w-full h-[calc(100vh-3.5rem)] overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-atmospheric-gradient from-atmospheric-start to-atmospheric-end opacity-40 z-10" />
        <VideoSequence />
      </div>

      {/* Scrolling Content Layer - using natural block flow spacing */}
      <div className="relative z-10 w-full">
        <HeroSection />
        <EngineeringSection />
        <NoiseCancellingSection />
        <SoundSection />
        <ReassemblySection />
      </div>
    </main>
  );
}

// Fade in when scrolled into view
const fadeVariant: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1] } 
  }
};

function HeroSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={fadeVariant}
      className="h-[120vh] flex flex-col items-end justify-center px-6 md:pr-[2%] text-right w-full md:w-[45%] ml-auto"
    >
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-[#1A1510] drop-shadow-md">
        Noise WH 1000XM6
      </h1>
      <p className="text-2xl md:text-3xl font-bold tracking-tight text-[#2A2015] max-w-lg mb-4 drop-shadow-sm">
        Silence, perfected.
      </p>
      <p className="text-base md:text-lg text-[#3D3020] max-w-sm font-semibold leading-relaxed drop-shadow-sm">
        Flagship wireless noise cancelling, engineered for a world that never stops.
      </p>
    </motion.div>
  );
}

function EngineeringSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
      variants={fadeVariant}
      className="h-[120vh] flex flex-col items-start justify-center px-6 md:pl-[2%] w-full md:w-[55%] mr-auto text-left"
    >
      <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-[#1A1510] drop-shadow-md">
        Precision engineered <br />for silence.
      </h2>
      <div className="space-y-4 max-w-sm text-[#3D3020] text-xl font-bold leading-relaxed drop-shadow-sm">
        <p>Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.</p>
         <button className="px-8 py-4 text-[#FAF7F2] bg-gradient-to-r from-[#4A3B28] to-[#6E5942] text-sm font-bold tracking-wide rounded-full relative overflow-hidden group shadow-lg hover:shadow-[0_0_25px_rgba(74,59,40,0.5)] hover:-translate-y-0.5 transition-all duration-300">
          <span className="relative z-10 drop-shadow-sm">Experience WH-1000XM6</span></button>
      </div>
      
    </motion.div>
  );
}

function NoiseCancellingSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
      variants={fadeVariant}
      className="h-[120vh] flex flex-col items-end justify-center px-6 md:pr-[2%] text-right w-full md:w-[45%] ml-auto"
    >
      <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-[#1A1510] drop-shadow-md">
        Adaptive noise cancelling, <br />redefined.
      </h2>
      <ul className="space-y-4 max-w-sm text-[#3D3020] text-xl flex flex-col items-end font-semibold leading-relaxed drop-shadow-sm">
        <li>Multi-microphone array listens in every direction.</li>
        <li>Real-time noise analysis adjusts to your environment.</li>
      </ul>
      <button className="px-8 py-4 text-[#3D3020] font-bold text-sm tracking-wide rounded-full border border-[#4A3B28]/20 hover:border-[#4A3B28]/50 hover:bg-white/20 transition-all duration-300 drop-shadow-sm">
          Visualise demo
        </button>
    </motion.div>
  );
}

function SoundSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
      variants={fadeVariant}
      className="h-[120vh] flex flex-col items-start justify-center px-6 md:pl-[2%] text-left w-full md:w-[45%] mr-auto"
    >
      <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-[#1A1510] drop-shadow-md">
        Immersive, life like sound.
      </h2>
      <div className="space-y-3 max-w-sm text-[#3D3020] text-xl font-bold leading-relaxed drop-shadow-sm">
        <p>High-performance drivers unlock detail, depth, and texture in every track.</p>
      </div>
    </motion.div>
  );
}

function ReassemblySection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={fadeVariant}
      className="h-[120vh] flex flex-col items-end justify-center px-6 md:pr-[2%] text-right w-full md:w-[50%] ml-auto"
    >
      <h2 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 text-[#1A1510] drop-shadow-md">
        Hear everything.<br />Feel nothing else.
      </h2>
      <p className="text-2xl font-bold tracking-tight text-[#2A2015] mb-10 max-w-lg drop-shadow-sm">
        WH-1000XM6. Designed for focus, crafted for comfort.
      </p>
      <div className="flex items-center justify-end gap-6">
        <button className="px-8 py-4 text-[#FAF7F2] bg-gradient-to-r from-[#4A3B28] to-[#6E5942] text-sm font-bold tracking-wide rounded-full relative overflow-hidden group shadow-lg hover:shadow-[0_0_25px_rgba(74,59,40,0.5)] hover:-translate-y-0.5 transition-all duration-300">
          <span className="relative z-10 drop-shadow-sm">Order WH-1000XM6</span>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
        <button className="px-8 py-4 text-[#3D3020] font-bold text-sm tracking-wide rounded-full border border-[#4A3B28]/20 hover:border-[#4A3B28]/50 hover:bg-white/20 transition-all duration-300 drop-shadow-sm">
          See full specs
        </button>
      </div>
    </motion.div>
  );
}
