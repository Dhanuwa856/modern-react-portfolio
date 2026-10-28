import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Terminal,
  BrainCircuit,
  Code2,
  Rocket,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import myCv from '/my_professional_cv.pdf';
import TiltCard from './TiltCard';

const HERO_TABS = {
  ai: {
    label: 'AI & ML',
    icon: BrainCircuit,
    title: 'Artificial Intelligence & Data Science',
    subtitle: 'Designing machine learning pipelines, predictive models, and neural networks in Python.',
    items: [
      { name: 'Python & OOP', detail: 'Core Engineering', badge: 'Advanced' },
      { name: 'NumPy & Pandas', detail: 'Matrix Math & Data', badge: 'Advanced' },
      { name: 'Scikit-Learn & XGBoost', detail: 'Predictive ML Models', badge: 'Proficient' },
      { name: 'Deep Learning & LLMs', detail: 'Neural Nets & RAG', badge: 'Active Focus' },
    ],
  },
  fullstack: {
    label: 'Full-Stack',
    icon: Code2,
    title: 'Full-Stack Web Architecture',
    subtitle: 'Crafting responsive interfaces and scalable APIs with React, Next.js, Node.js, and FastAPI.',
    items: [
      { name: 'React 19 & Next.js', detail: 'Frontend Architecture', badge: 'Advanced' },
      { name: 'Node.js & Express', detail: 'MERN Stack APIs', badge: 'Proficient' },
      { name: 'FastAPI (Python)', detail: 'AI Model Serving', badge: 'Proficient' },
      { name: 'MongoDB & Supabase', detail: 'Realtime Cloud DB', badge: 'Advanced' },
    ],
  },
  builds: {
    label: 'Top Builds',
    icon: Rocket,
    title: 'Selected Engineering Works',
    subtitle: 'Real-world systems combining machine learning models with full-stack applications.',
    items: [
      { name: 'talking-hands-lk', detail: 'SL Sign Language to Sinhala AI', badge: 'AI + Vision' },
      { name: 'Neural-Math-Engine', detail: 'Deep Learning Engine in NumPy', badge: 'Pure Python' },
      { name: 'GeoBlood Platform', detail: 'React + FastAPI + MongoDB', badge: 'Full-Stack' },
      { name: 'Riyasewana Predictor', detail: 'XGBoost Car Price Web App', badge: 'ML + React' },
    ],
  },
};

const MARQUEE_ITEMS = [
  'ARTIFICIAL INTELLIGENCE',
  'FULL-STACK ENGINEERING',
  'PYTHON & MACHINE LEARNING',
  'UNIVERSITY OF MORATUWA (ITUM)',
  'REACT & NEXT.JS',
  'FASTAPI & MERN STACK',
];

const Hero = () => {
  const [activeTab, setActiveTab] = useState('ai');
  const currentTab = HERO_TABS[activeTab];

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-driven 3D animations
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroRotateX = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 sm:pt-32 pb-10 perspective-1200"
    >
      {/* Warm Editorial Ambient Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[12%] left-[-8%] w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-accent-blue/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[15%] right-[-8%] w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-accent-purple/10 rounded-full blur-[140px]" />
      </div>

      {/* Main 3D Scroll-Animated Hero Stage */}
      <motion.div
        style={{
          y: heroY,
          rotateX: heroRotateX,
          scale: heroScale,
          opacity: heroOpacity,
          transformOrigin: 'center top',
        }}
        className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 my-auto py-6 sm:py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Typography & CTAs */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
              <span className="text-xs font-medium text-zinc-300">
                IT Undergraduate at ITUM • Open for Opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-[clamp(2.35rem,9vw,4.1rem)] font-black tracking-tight text-white mb-6 leading-[1.04] text-balance"
            >
              Designing intelligent{' '}
              <span className="bg-gradient-to-r from-accent-blue via-amber-300 to-accent-purple bg-clip-text text-transparent">
                AI systems
              </span>{' '}
              &amp; modern web apps.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="text-zinc-400 text-base sm:text-lg max-w-xl mb-8 leading-relaxed"
            >
              Hi, I&apos;m <span className="text-zinc-100 font-semibold">Dhanushka Rathnayaka</span>. I study Information Technology at the{' '}
              <span className="text-zinc-100 font-semibold">University of Moratuwa (ITUM)</span> and build practical Machine Learning models in{' '}
              <span className="text-zinc-100 font-semibold">Python</span> alongside full-stack products with{' '}
              <span className="text-zinc-100 font-semibold">React, Next.js, Node.js, and FastAPI</span>.
            </motion.p>

            {/* Mobile-Responsive Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 mb-10"
            >
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                Explore Selected Works <ArrowRight size={17} />
              </a>

              <a
                href="#interactive-lab"
                className="px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-100 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Terminal size={17} className="text-accent-blue" />
                Interactive Python Lab
              </a>

              <a
                href={myCv}
                download="Dhanushka_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-transparent hover:bg-zinc-900/70 border border-zinc-800/80 text-zinc-300 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Download size={16} />
                Resume / CV
              </a>
            </motion.div>

            {/* Clean Editorial Metrics */}
            <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80 max-w-lg">
              <div>
                <p className="text-lg sm:text-xl font-bold text-white">AI &amp; ML</p>
                <p className="text-xs text-zinc-500 mt-0.5">Python • Scikit • NumPy</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-white">Full-Stack</p>
                <p className="text-xs text-zinc-500 mt-0.5">MERN • Next.js • FastAPI</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-white">ITUM</p>
                <p className="text-xs text-zinc-500 mt-0.5">NDT Undergraduate</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Studio Console */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="lg:col-span-5 w-full"
          >
            <TiltCard
              intensity={7}
              className="bg-zinc-900/85 backdrop-blur-2xl rounded-3xl p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.65)]"
            >
              {/* Top Window Header + Tab Switcher */}
              <div className="flex items-center justify-between gap-2 mb-5 pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-blue" />
                </div>
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                  <Sparkles size={12} className="text-accent-blue" /> Interactive Overview
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800/80 mb-5">
                {Object.entries(HERO_TABS).map(([key, tab]) => {
                  const Icon = tab.icon;
                  const isSelected = activeTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-800 text-white shadow-xs'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Icon size={14} className={isSelected ? 'text-accent-blue' : ''} />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {currentTab.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {currentTab.subtitle}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {currentTab.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/70 hover:border-zinc-700 transition-all"
                      >
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-zinc-500 truncate">{item.detail}</p>
                        </div>
                        <span className="shrink-0 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-medium text-accent-blue">
                          {item.badge}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <GraduationCap size={15} className="text-accent-blue" />
                      ITUM • Sri Lanka
                    </span>
                    <a
                      href={activeTab === 'builds' ? '#projects' : '#about'}
                      className="text-zinc-200 hover:text-accent-blue font-semibold flex items-center gap-1 transition-colors"
                    >
                      View Details <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </TiltCard>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Kinetic Typography Marquee Ribbon */}
      <div className="relative z-10 w-full border-y border-zinc-800/70 bg-zinc-950/60 backdrop-blur-md py-3.5 overflow-hidden mt-8">
        <div className="animate-marquee flex items-center gap-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 shrink-0">
              <span className="text-xs font-bold tracking-[0.22em] text-zinc-400 uppercase">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;