import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, BookOpen } from 'lucide-react';
import PythonVisualizer from './PythonVisualizer';
import PythonLearningHub from './PythonLearningHub';
import ScrollReveal3D from './ScrollReveal3D';

const InteractiveLab = () => {
  const [activeTab, setActiveTab] = useState('visualizer');

  return (
    <section id="interactive-lab" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal3D>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent-blue block mb-2">
                03 / Interactive Sandbox
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Python &amp; AI{' '}
                <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                  Interactive Lab
                </span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-2">
                Step through Python loops visually or build code interactively with drag-and-drop blocks.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:flex bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('visualizer')}
                className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'visualizer'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Cpu size={15} />
                <span>Loop Visualizer</span>
              </button>
              <button
                onClick={() => setActiveTab('academy')}
                className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'academy'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <BookOpen size={15} />
                <span>Python Academy</span>
              </button>
            </div>
          </div>
        </ScrollReveal3D>

        <ScrollReveal3D>
          <AnimatePresence mode="wait">
            {activeTab === 'visualizer' ? (
              <motion.div
                key="visualizer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <PythonVisualizer embedded />
              </motion.div>
            ) : (
              <motion.div
                key="academy"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <PythonLearningHub embedded />
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal3D>
      </div>
    </section>
  );
};

export default InteractiveLab;
