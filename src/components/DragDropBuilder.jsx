import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Eye, Shuffle } from 'lucide-react';

const SortableBlock = ({ id, text }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-zinc-900 border border-zinc-700 hover:border-accent-blue text-white px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm cursor-grab active:cursor-grabbing transition-all shadow-md touch-none select-none"
    >
      {text}
    </div>
  );
};

const DragDropBuilder = ({
  initialBlocks,
  correctOrder,
  actualCode,
  explanationSteps,
  onComplete,
}) => {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [viewMode, setViewMode] = useState('drag');
  const [visualStep, setVisualStep] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const shuffleBlocks = () => {
    setBlocks((prev) => [...prev].sort(() => Math.random() - 0.5));
    setViewMode('drag');
  };

  const isCorrect = blocks.map((b) => b.text).join('') === correctOrder.join('');

  useEffect(() => {
    if (isCorrect && onComplete) {
      onComplete();
    }
  }, [isCorrect, onComplete]);

  return (
    <div className="bg-zinc-950/70 border border-zinc-800 p-4 sm:p-6 rounded-2xl mt-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm sm:text-base font-bold text-zinc-200">
          Arrange the Code Blocks:
        </h4>
        <button
          onClick={shuffleBlocks}
          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer"
        >
          <Shuffle size={12} /> Shuffle
        </button>
      </div>
      <p className="text-zinc-400 mb-4 text-xs">
        Blocks drag කරලා නිවැරදි Python Code පේළිය සකසන්න.
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-wrap gap-2.5 bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 min-h-[76px] items-center">
          <SortableContext
            items={blocks}
            strategy={horizontalListSortingStrategy}
          >
            {blocks.map((block) => (
              <SortableBlock key={block.id} id={block.id} text={block.text} />
            ))}
          </SortableContext>
        </div>
      </DndContext>

      <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div
          className={`px-3.5 py-2 rounded-xl font-semibold w-fit text-xs ${
            isCorrect
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
          }`}
        >
          {isCorrect
            ? '✓ නියමයි! Code එක නිවැරදියි.'
            : 'Blocks නිවැරදි අනුපිළිවෙලට සකසන්න...'}
        </div>

        {isCorrect && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setViewMode('terminal')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'terminal'
                  ? 'bg-white text-zinc-950'
                  : 'bg-zinc-900 text-zinc-200 border border-zinc-800 hover:bg-zinc-800'
              }`}
            >
              <Play size={13} /> Run Output
            </button>

            {explanationSteps && (
              <button
                onClick={() => {
                  setViewMode('visualizer');
                  setVisualStep(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'visualizer'
                    ? 'bg-accent-blue text-white'
                    : 'bg-zinc-900 text-zinc-200 border border-zinc-800 hover:bg-zinc-800'
                }`}
              >
                <Eye size={13} /> Line-by-Line Trace
              </button>
            )}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isCorrect && viewMode === 'terminal' && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-5 bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-xs sm:text-sm"
          >
            <div className="text-xs text-zinc-500 mb-2">
              python3 lesson_runner.py
            </div>
            <pre className="text-zinc-300 text-xs mb-3 pb-3 border-b border-zinc-800 overflow-x-auto">
              {actualCode}
            </pre>
            <div className="text-accent-blue font-bold text-xs">
              &gt;&gt; Executed Successfully ✓
            </div>
          </motion.div>
        )}

        {isCorrect && viewMode === 'visualizer' && explanationSteps && (
          <motion.div
            key="visualizer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 border-t border-zinc-800 pt-5"
          >
            <h4 className="text-sm font-bold text-zinc-200 mb-4">
              පියවරෙන් පියවර ක්‍රියාත්මක වීම (Line-by-Line Trace):
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-xs leading-loose overflow-x-auto">
                <div className="space-y-1">
                  {actualCode.split('\n').map((line, idx) => {
                    const isCurrentLine =
                      line.trim() ===
                      explanationSteps[visualStep]?.code?.trim();
                    return (
                      <div
                        key={idx}
                        className={`px-3 py-1 rounded transition-colors ${
                          isCurrentLine
                            ? 'bg-accent-blue/20 border-l-4 border-accent-blue text-white font-bold'
                            : 'text-zinc-400'
                        }`}
                      >
                        {line}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col justify-between space-y-4">
                <motion.div
                  key={visualStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
                >
                  <span className="text-accent-blue font-bold text-xs uppercase tracking-wider mb-1.5 block">
                    පියවර {visualStep + 1} / {explanationSteps.length}
                  </span>
                  <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
                    {explanationSteps[visualStep].desc}
                  </p>
                </motion.div>

                <div className="flex gap-2.5">
                  <button
                    onClick={() =>
                      setVisualStep((prev) => Math.max(0, prev - 1))
                    }
                    disabled={visualStep === 0}
                    className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-semibold text-white disabled:opacity-30 hover:bg-zinc-800 transition cursor-pointer"
                  >
                    ◀ ආපසු
                  </button>
                  <button
                    onClick={() =>
                      setVisualStep((prev) =>
                        Math.min(explanationSteps.length - 1, prev + 1)
                      )
                    }
                    disabled={visualStep === explanationSteps.length - 1}
                    className="flex-1 px-4 py-2 bg-white text-zinc-950 rounded-xl text-xs font-bold disabled:opacity-30 hover:bg-zinc-200 transition cursor-pointer"
                  >
                    මීළඟ පියවර ▶
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DragDropBuilder;