import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2, CircleDot, Code2, Terminal, BrainCircuit } from 'lucide-react';
import TiltCard from './TiltCard';

const roadmapData = [
  {
    step: '01',
    stage: 'PHASE 01',
    title: 'Foundations & Python Mastery',
    desc: 'Mastering CS fundamentals, Git/GitHub, and Advanced Python including OOP, Data Structures, and File Handling.',
    status: 'Completed',
    progress: '100%',
    icon: <CheckCircle2 className="text-emerald-400" size={18} />,
  },
  {
    step: '02',
    stage: 'PHASE 02',
    title: 'Data Science & Visualization',
    desc: 'NumPy, Pandas, and Exploratory Data Analysis (EDA) to manipulate, clean, and visualize real-world datasets.',
    status: 'Completed',
    progress: '100%',
    icon: <CheckCircle2 className="text-emerald-400" size={18} />,
  },
  {
    step: '03',
    stage: 'PHASE 03',
    title: 'Machine Learning & Predictive Models',
    desc: 'Linear Algebra, Calculus, and building ML algorithms including Regression, Decision Trees, and XGBoost with Scikit-learn.',
    status: 'Completed',
    progress: '100%',
    icon: <BrainCircuit className="text-accent-blue" size={18} />,
  },
  {
    step: '04',
    stage: 'PHASE 04',
    title: 'Deep Learning, Computer Vision & LLMs',
    desc: 'Building custom Neural Networks, Sign Language translators, and RAG/LLM applications using Python and modern AI APIs.',
    status: 'In Progress',
    progress: '30%',
    icon: <CircleDot className="text-accent-blue animate-pulse" size={18} />,
  },
  {
    step: '05',
    stage: 'PHASE 05',
    title: 'Full-Stack AI Integration (FastAPI + MERN)',
    desc: 'Connecting Python AI backends (FastAPI) with React, Next.js, Node.js, MongoDB, and Supabase for full-stack production apps.',
    status: 'In Progress',
    progress: '60%',
    icon: <Code2 className="text-accent-purple" size={18} />,
  },
  {
    step: '06',
    stage: 'PHASE 06',
    title: 'Scalable MLOps & AI SaaS Products',
    desc: 'Deploying containerized AI microservices with Docker and launching end-to-end intelligent SaaS solutions.',
    status: 'Upcoming',
    progress: '5%',
    icon: <Terminal className="text-zinc-400" size={18} />,
  },
];

const RoadmapStepCard = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`relative flex flex-col md:flex-row items-start ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } w-full`}
    >
      {/* Center / Left Timeline Node Dot (Lights up as you scroll to it) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="absolute left-4 md:left-1/2 -translate-x-1/2 top-8 z-20 flex items-center justify-center"
      >
        <div
          className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shadow-lg transition-colors duration-500 ${
            item.status === 'Completed'
              ? 'bg-zinc-900 border-emerald-500/60 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
              : item.status === 'In Progress'
              ? 'bg-zinc-900 border-accent-blue text-accent-blue shadow-[0_0_25px_rgba(249,115,22,0.45)]'
              : 'bg-zinc-950 border-zinc-700 text-zinc-500'
          }`}
        >
          <span className="text-[11px] font-black font-mono">{item.step}</span>
        </div>
      </motion.div>

      {/* Card Container — Animates in one-by-one on scroll */}
      <div
        className={`w-full md:w-1/2 pl-12 sm:pl-14 ${
          isEven ? 'md:pl-0 md:pr-12 lg:pr-16' : 'md:pr-0 md:pl-12 lg:pl-16'
        }`}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 55,
            x: isEven ? -35 : 35,
            rotateX: 16,
            scale: 0.94,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            x: 0,
            rotateX: 0,
            scale: 1,
          }}
          viewport={{ once: false, amount: 0.28, margin: '0px 0px -60px 0px' }}
          transition={{
            type: 'spring',
            stiffness: 110,
            damping: 20,
            mass: 0.8,
          }}
          style={{ transformPerspective: 1200 }}
        >
          <TiltCard className="relative bg-zinc-900/85 backdrop-blur-xl p-6 sm:p-7 rounded-3xl overflow-hidden">
            {/* Subtle Background Step Number Watermark */}
            <span className="pointer-events-none select-none absolute -bottom-4 right-4 text-7xl font-black text-white/[0.03] tracking-tighter">
              {item.step}
            </span>

            {/* Top Header Row */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800">
                  {item.icon}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  {item.stage}
                </span>
              </div>

              <span
                className={`text-[11px] px-3 py-1 rounded-full font-semibold border ${
                  item.status === 'Completed'
                    ? 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10'
                    : item.status === 'In Progress'
                    ? 'border-accent-blue/40 text-accent-blue bg-accent-blue/10'
                    : 'border-zinc-800 text-zinc-500 bg-zinc-950'
                }`}
              >
                {item.status}
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5">
              {item.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-5">
              {item.desc}
            </p>

            {/* Animated Scroll Progress Bar inside Card */}
            <div className="pt-3 border-t border-zinc-800/80">
              <div className="flex justify-between items-center text-[11px] font-mono text-zinc-400 mb-1.5">
                <span>Milestone Mastery</span>
                <span className="text-zinc-200 font-bold">{item.progress}</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/60">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: item.progress }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
                  className={`h-full rounded-full ${
                    item.status === 'Completed'
                      ? 'bg-emerald-400'
                      : item.status === 'In Progress'
                      ? 'bg-gradient-to-r from-accent-blue to-amber-400'
                      : 'bg-zinc-600'
                  }`}
                />
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </div>
  );
};

const AIRoadmap = () => {
  const timelineRef = useRef(null);

  // Track scroll progress through the roadmap section to draw the glowing line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 75%'],
  });

  const smoothLineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothLineProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="roadmap" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="section-heading mb-12 sm:mb-16 md:mx-auto md:text-center"
        >
          <span className="section-label mb-3">
            04 / Progression
          </span>
          <h2 className="text-[clamp(2rem,6vw,3.2rem)] font-black text-white tracking-tight leading-[1.05]">
            AI &amp; Full-Stack{' '}
            <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
              Engineering Roadmap
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl md:mx-auto mt-3">
            Scroll down to follow my step-by-step progression across Python, Machine Learning, and Full-Stack Web Engineering.
          </p>
        </motion.div>

        {/* Scroll-Animated Vertical Timeline Container */}
        <div ref={timelineRef} className="relative">
          {/* Background Static Track Line */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-zinc-800/80 rounded-full" />

          {/* Dynamic Glowing Scroll Line that fills as you scroll down */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 w-[3px] bg-gradient-to-b from-emerald-400 via-accent-blue to-accent-purple rounded-full shadow-[0_0_20px_rgba(249,115,22,0.7)] origin-top z-10"
          />

          {/* Step-by-Step Cards */}
          <div className="space-y-10 md:space-y-14 relative z-10">
            {roadmapData.map((item, index) => (
              <RoadmapStepCard key={item.stage} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIRoadmap;