import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PythonVisualizer = () => {
  // උදාහරණ ලැයිස්තු (Scenarios)
  const scenarios = {
    fruits: { label: 'පලතුරු (Fruits)', items: ['Apple', 'Mango', 'Banana'] },
    workout: { label: 'ව්‍යායාම (Workout)', items: ['Push-ups', 'Pull-ups', 'Leg Day'] }
  };

  const [activeScenario, setActiveScenario] = useState('fruits');
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentData = scenarios[activeScenario].items;
  const totalSteps = currentData.length * 2; // එක් අයිතමයකට පියවර 2ක් (Variable එකට assign වීම සහ Print වීම)

  // Auto-play Logic
  useEffect(() => {
    let timer;
    if (isPlaying && step < totalSteps) {
      timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 1500); // තත්පර 1.5 ක පරතරයක්
    } else if (step >= totalSteps) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step, totalSteps]);

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  // පියවර අනුව active වෙන code line එක
  const activeCodeLine = step % 2 === 0 ? 1 : 2;
  const currentItemIndex = Math.floor(step / 2);
  const currentItem = step > 0 ? currentData[Math.min(currentItemIndex, currentData.length - 1)] : null;
  const outputLines = currentData.slice(0, currentItemIndex + (step % 2 !== 0 ? 1 : 0));

  return (
    <section id="python-playground" className="py-20 px-6 max-w-7xl mx-auto">
      {/* --- Section Title (ඔයාගේ Style එකට අනුව) --- */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none text-white uppercase">
            PYTHON <br />
            <span className="bg-gradient-to-r from-accent-purple via-slate-100 to-accent-blue bg-clip-text text-transparent italic">
              PLAYGROUND
            </span>
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
            <div className="h-[2px] w-16 bg-accent-purple rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            <p className="text-slate-400 text-sm md:text-base font-medium max-w-md leading-relaxed">
              Interactive learning <span className="text-white">Experience</span> bridging complex logic with <span className="text-accent-purple">Visual Animations</span>.
            </p>
          </div>
        </motion.div>
      </div>

      {/* --- Visualizer Container --- */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
        
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-slate-300 font-semibold">උදාහරණය තෝරන්න:</span>
            <select 
              className="bg-dark-bg border border-accent-blue/40 text-white rounded-lg px-4 py-2 outline-none focus:border-accent-purple transition"
              value={activeScenario}
              onChange={(e) => {
                setActiveScenario(e.target.value);
                handleReset();
              }}
            >
              <option value="fruits">{scenarios.fruits.label}</option>
              <option value="workout">{scenarios.workout.label}</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={step >= totalSteps}
              className={`px-6 py-2 rounded-lg font-bold transition ${isPlaying ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' : 'bg-accent-blue/20 text-accent-blue border border-accent-blue/50 hover:bg-accent-blue/30'} disabled:opacity-50`}
            >
              {isPlaying ? 'නවතින්න (Pause)' : 'ධාවනය (Play)'}
            </button>
            <button 
              onClick={() => { setIsPlaying(false); setStep(prev => Math.min(prev + 1, totalSteps)); }}
              disabled={step >= totalSteps || isPlaying}
              className="px-6 py-2 bg-white/5 border border-white/20 text-white rounded-lg font-bold hover:bg-white/10 transition disabled:opacity-50"
            >
              පියවර (Step)
            </button>
            <button 
              onClick={handleReset}
              className="px-6 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg font-bold hover:bg-red-500/20 transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Code Editor */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-200">Python Code</h3>
            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6 font-mono text-sm leading-loose relative overflow-hidden">
              <div className={`absolute left-0 w-full h-8 bg-accent-blue/20 border-l-4 border-accent-blue transition-all duration-300 ${step === 0 ? 'opacity-0' : 'opacity-100'}`} style={{ top: `${(activeCodeLine - 1) * 2.2 + 1.2}rem` }}></div>
              
              <div className="relative z-10">
                <span className="text-pink-400">for</span> <span className="text-yellow-200">item</span> <span className="text-pink-400">in</span> <span className="text-blue-300">my_list</span>:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">print</span>(<span className="text-yellow-200">item</span>)
              </div>
            </div>

            {/* Variable Tracker */}
            <h3 className="text-xl font-bold text-slate-200 pt-4">විචල්‍යයන් (Variables)</h3>
            <div className="bg-accent-purple/10 border border-accent-purple/30 rounded-xl p-6 flex items-center justify-center">
              {currentItem ? (
                <motion.div 
                  key={currentItem}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl font-mono text-white bg-accent-purple/40 px-6 py-3 rounded-lg border border-accent-purple"
                >
                  item = "{currentItem}"
                </motion.div>
              ) : (
                <span className="text-slate-500 font-mono italic">Loop එක ආරම්භ කර නැත...</span>
              )}
            </div>
          </div>

          {/* Right Column: Visualizer & Output */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-200">දත්ත ගොනුව (The List)</h3>
            <div className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-6 overflow-x-auto">
              {currentData.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex-shrink-0 w-28 h-28 flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-500 ${index === currentItemIndex && step > 0 && step < totalSteps + 1 ? 'border-accent-blue bg-accent-blue/20 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-white/20 bg-dark-bg text-slate-400'}`}
                >
                  <span className="text-xs mb-1 opacity-50">Index {index}</span>
                  <span className={`font-bold text-center px-2 ${index === currentItemIndex && step > 0 ? 'text-white' : ''}`}>{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-slate-200 pt-4">ප්‍රතිදානය (Output Console)</h3>
            <div className="bg-black border border-white/20 rounded-xl p-6 h-48 font-mono text-green-400 overflow-y-auto shadow-inner">
              <div className="mb-2 text-slate-500 text-xs">{`Terminal >>`}</div>
              {outputLines.map((line, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {line}
                </motion.div>
              ))}
              {step >= totalSteps && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent-blue mt-4">
                  [Process completed]
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PythonVisualizer;