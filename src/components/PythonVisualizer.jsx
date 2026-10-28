import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, StepForward, Cpu, Plus, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';

const PythonVisualizer = ({ embedded = false }) => {
  const [scenarios, setScenarios] = useState({
    ai_layers: {
      label: 'AI Model Layers (Deep Learning)',
      varName: 'layer',
      listName: 'model_layers',
      items: ['Input_Layer', 'Dense_ReLU', 'Dropout_0.2', 'Softmax_Out'],
    },
    fullstack_api: {
      label: 'Full-Stack API Routes (FastAPI)',
      varName: 'route',
      listName: 'api_routes',
      items: ['/api/auth', '/api/projects', '/api/predict', '/api/chat'],
    },
    fruits: {
      label: 'පලතුරු ලැයිස්තුව (Fruits List)',
      varName: 'fruit',
      listName: 'fruits_list',
      items: ['Apple', 'Mango', 'Banana', 'Orange'],
    },
  });

  const [activeScenario, setActiveScenario] = useState('ai_layers');
  const [customItem, setCustomItem] = useState('');
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(1200);

  const currentScenario = scenarios[activeScenario];
  const currentData = currentScenario.items;
  const totalSteps = currentData.length * 2;

  useEffect(() => {
    let timer;
    if (isPlaying && step < totalSteps) {
      timer = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, speedMs);
    } else if (step >= totalSteps) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step, totalSteps, speedMs]);

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  const handleAddCustomItem = (e) => {
    e.preventDefault();
    const trimmed = customItem.trim();
    if (!trimmed) return;
    setScenarios((prev) => ({
      ...prev,
      [activeScenario]: {
        ...prev[activeScenario],
        items: [...prev[activeScenario].items.slice(0, 6), trimmed],
      },
    }));
    setCustomItem('');
    handleReset();
  };

  const activeCodeLine = step === 0 ? 0 : step % 2 === 1 ? 2 : 3;
  const currentItemIndex = Math.floor((step - 1) / 2);
  const currentItem =
    step > 0 && currentItemIndex < currentData.length
      ? currentData[currentItemIndex]
      : null;
  const outputLines = currentData.slice(0, Math.floor(step / 2));

  return (
    <div id="python-playground" className={embedded ? '' : 'py-20 px-4 sm:px-6 max-w-6xl mx-auto'}>
      <TiltCard
        intensity={2}
        scaleOnHover={1}
        className="bg-zinc-900/85 backdrop-blur-xl rounded-3xl p-5 sm:p-8 shadow-xl"
      >
        {/* Top Controls Bar (Mobile Responsive) */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-7 pb-6 border-b border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-zinc-200 font-semibold text-xs sm:text-sm flex items-center gap-2">
              <Cpu size={16} className="text-accent-blue" /> Scenario:
            </span>
            <select
              className="bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none focus:border-accent-blue transition cursor-pointer"
              value={activeScenario}
              onChange={(e) => {
                setActiveScenario(e.target.value);
                handleReset();
              }}
            >
              {Object.entries(scenarios).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>

            <form onSubmit={handleAddCustomItem} className="flex items-center gap-2">
              <input
                type="text"
                value={customItem}
                onChange={(e) => setCustomItem(e.target.value)}
                placeholder="Add item to list..."
                maxLength={16}
                className="flex-1 sm:w-36 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:border-accent-blue outline-none"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-zinc-800 hover:bg-white hover:text-zinc-950 text-zinc-200 transition cursor-pointer"
                title="Add Item"
              >
                <Plus size={15} />
              </button>
            </form>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-zinc-400">
              <span>Speed:</span>
              {[
                { label: '0.5x', ms: 1800 },
                { label: '1x', ms: 1200 },
                { label: '2x', ms: 650 },
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSpeedMs(s.ms)}
                  className={`px-2 py-0.5 rounded-md font-mono font-bold transition cursor-pointer ${
                    speedMs === s.ms ? 'bg-white text-zinc-950' : 'hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={step >= totalSteps}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                isPlaying
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-white text-zinc-950 hover:bg-zinc-200'
              } disabled:opacity-40`}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setStep((prev) => Math.min(prev + 1, totalSteps));
              }}
              disabled={step >= totalSteps || isPlaying}
              className="px-3.5 py-2.5 bg-zinc-800/80 border border-zinc-700 text-white rounded-xl font-semibold text-xs flex items-center gap-1.5 hover:bg-zinc-800 transition disabled:opacity-40 cursor-pointer"
            >
              <StepForward size={14} /> Step
            </button>

            <button
              onClick={handleReset}
              className="px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* Main Visualizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Sparkles size={15} className="text-accent-blue" /> Python Execution Trace
              </h3>
              <span className="text-xs font-mono text-zinc-400">
                Step {step} / {totalSteps}
              </span>
            </div>

            <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-sm leading-loose space-y-1 overflow-x-auto">
              <div className="px-3 py-1 rounded text-zinc-400">
                <span className="text-indigo-300">{currentScenario.listName}</span> = [
                {currentData.map((d, idx) => (
                  <span key={idx} className="text-amber-300">
                    &apos;{d}&apos;{idx < currentData.length - 1 ? ', ' : ''}
                  </span>
                ))}
                ]
              </div>
              <div
                className={`px-3 py-1 rounded transition-colors ${
                  activeCodeLine === 2
                    ? 'bg-accent-blue/20 border-l-4 border-accent-blue text-white font-bold'
                    : 'text-zinc-300'
                }`}
              >
                <span className="text-accent-blue">for</span>{' '}
                <span className="text-white">{currentScenario.varName}</span>{' '}
                <span className="text-accent-blue">in</span>{' '}
                <span className="text-indigo-300">{currentScenario.listName}</span>:
              </div>
              <div
                className={`px-3 py-1 rounded transition-colors ${
                  activeCodeLine === 3
                    ? 'bg-accent-blue/20 border-l-4 border-accent-blue text-white font-bold'
                    : 'text-zinc-300'
                }`}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-accent-blue">print</span>(
                <span className="text-white">{currentScenario.varName}</span>)
              </div>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-300 mb-2.5">
                විචල්‍යයන් (Current Variable in Memory)
              </h4>
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 min-h-[88px] flex items-center justify-between gap-2">
                {currentItem ? (
                  <>
                    <div className="min-w-0">
                      <span className="text-[11px] font-mono text-accent-blue block mb-1">
                        Index [{currentItemIndex}]
                      </span>
                      <motion.div
                        key={`${currentItem}-${step}`}
                        initial={{ scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-base sm:text-xl font-mono font-bold text-white truncate"
                      >
                        {currentScenario.varName} = &quot;{currentItem}&quot;
                      </motion.div>
                    </div>
                    <span className="shrink-0 px-3 py-1 rounded-lg bg-accent-blue/20 border border-accent-blue/40 text-accent-blue text-xs font-bold">
                      {step % 2 === 1 ? 'Assigned' : 'Printed'}
                    </span>
                  </>
                ) : (
                  <span className="text-zinc-500 text-xs sm:text-sm">
                    Loop එක ආරම්භ කිරීමට &quot;Play&quot; හෝ &quot;Step&quot; ඔබන්න...
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm sm:text-base font-bold text-white">
              දත්ත ලැයිස්තුව (Python List Items)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
              {currentData.map((item, index) => {
                const isActive =
                  index === currentItemIndex && step > 0 && step <= totalSteps;
                const isVisited = index < Math.floor(step / 2);

                return (
                  <div
                    key={`${item}-${index}`}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isActive
                        ? 'border-accent-blue bg-accent-blue/15 text-white scale-105 shadow-md'
                        : isVisited
                        ? 'border-zinc-700 bg-zinc-900 text-zinc-200'
                        : 'border-zinc-800/80 bg-zinc-900/40 text-zinc-500'
                    }`}
                  >
                    <span className="text-[10px] font-mono block opacity-70 mb-1">
                      Index {index}
                    </span>
                    <span className="font-bold text-xs break-all">{item}</span>
                  </div>
                );
              })}
            </div>

            <h3 className="text-sm sm:text-base font-bold text-white">
              ප්‍රතිදානය (Terminal Output)
            </h3>
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-5 h-40 font-mono text-xs sm:text-sm text-zinc-200 overflow-y-auto">
              <div className="mb-2 text-zinc-500 text-xs">Terminal &gt;&gt;</div>
              {outputLines.map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="py-0.5 text-white"
                >
                  <span className="text-accent-blue mr-2">&gt;</span>
                  {line}
                </motion.div>
              ))}
              {step >= totalSteps && (
                <div className="text-accent-blue mt-2 text-xs font-bold">
                  ✓ [Loop finished!]
                </div>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};

export default PythonVisualizer;