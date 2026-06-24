import React, { useState, useEffect } from 'react';
import { 
  DndContext, closestCenter, 
  useSensor, useSensors, PointerSensor, TouchSensor 
} from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';

const SortableBlock = ({ id, text }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      // Touch devices වල අකුරු select වෙන එක නවත්වන්න 'touch-none' පාවිච්චි කරමු
      className="bg-dark-bg border-2 border-accent-blue text-white px-4 py-2 rounded-lg font-mono cursor-grab active:cursor-grabbing hover:bg-accent-blue/20 transition-colors shadow-lg touch-none select-none"
    >
      {text}
    </div>
  );
};

const DragDropBuilder = ({ initialBlocks, correctOrder, actualCode, explanationSteps }) => {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [viewMode, setViewMode] = useState('drag'); // 'drag', 'terminal', 'visualizer'
  const [visualStep, setVisualStep] = useState(0);

  // --- Mobile සහ Desktop දෙකටම වැඩ කරන Sensors ---
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    // Mobile වලදී පොඩි වෙලාවක් (200ms) ඔබාගෙන හිටියම drag වෙන්න පටන් ගන්නවා
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const isCorrect = blocks.map(b => b.text).join('') === correctOrder.join('');

  return (
    <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl backdrop-blur-md mt-8">
      
      {/* ---------------- DRAG AND DROP අංශය ---------------- */}
      <h3 className="text-xl font-bold text-slate-200 mb-4">Arrange the Code:</h3>
      <p className="text-slate-400 mb-6 text-sm">Blocks drag කරලා නිවැරදි Python Code එක හදන්න.</p>
      
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex flex-wrap gap-3 bg-black/50 p-4 rounded-xl border border-white/5 min-h-[80px] items-center">
          <SortableContext items={blocks} strategy={horizontalListSortingStrategy}>
            {blocks.map((block) => (
              <SortableBlock key={block.id} id={block.id} text={block.text} />
            ))}
          </SortableContext>
        </div>
      </DndContext>

      {/* Button Controls */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className={`px-4 py-2 rounded-lg font-bold w-fit text-sm md:text-base ${isCorrect ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
          {isCorrect ? '🎉 නියමයි! Code එක නිවැරදියි.' : 'තව උත්සාහ කරන්න...'}
        </div>
        
        {isCorrect && (
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => { setViewMode('visualizer'); setVisualStep(0); }}
              className="px-6 py-2 bg-accent-blue/20 text-accent-blue border border-accent-blue hover:bg-accent-blue/30 rounded-lg transition font-bold flex items-center gap-2"
            >
              👁 Line-by-Line Visualizer
            </button>
          </div>
        )}
      </div>

      {/* ---------------- LINE BY LINE VISUALIZER අංශය ---------------- */}
      <AnimatePresence>
        {viewMode === 'visualizer' && explanationSteps && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 border-t border-white/10 pt-8"
          >
            <h3 className="text-xl font-bold text-slate-200 mb-4">පියවරෙන් පියවර ක්‍රියාත්මක වීම:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Code Display Box */}
              <div className="bg-[#0a0f1c] border border-white/10 rounded-xl p-6 font-mono text-sm leading-loose relative shadow-inner overflow-hidden">
                {/* Active Line Highlight Background */}
                <motion.div 
                  className="absolute left-0 w-full h-8 bg-accent-blue/20 border-l-4 border-accent-blue"
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  // පේළිය අනුව උස හදන්න (මේක සරල උදාහරණයක්)
                  style={{ top: `${(actualCode.split('\n').findIndex(line => line.trim() === explanationSteps[visualStep].code.trim())) * 2 + 1.5}rem` }}
                />
                
                <div className="relative z-10 text-slate-300 whitespace-pre-wrap">
                  {actualCode}
                </div>
              </div>

              {/* Explanation Box */}
              <div className="flex flex-col justify-center space-y-6">
                <motion.div 
                  key={visualStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-accent-purple/10 border border-accent-purple/30 rounded-xl p-6 shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                >
                  <span className="text-accent-purple font-bold text-sm mb-2 block">පියවර {visualStep + 1} / {explanationSteps.length}</span>
                  <p className="text-white text-lg font-medium leading-relaxed">
                    {explanationSteps[visualStep].desc}
                  </p>
                </motion.div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setVisualStep(prev => Math.max(0, prev - 1))}
                    disabled={visualStep === 0}
                    className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white disabled:opacity-30 hover:bg-white/10 transition"
                  >
                    ◀ ආපසු
                  </button>
                  <button 
                    onClick={() => setVisualStep(prev => Math.min(explanationSteps.length - 1, prev + 1))}
                    disabled={visualStep === explanationSteps.length - 1}
                    className="flex-1 px-4 py-2 bg-accent-purple/20 border border-accent-purple text-accent-purple rounded-lg font-bold disabled:opacity-30 hover:bg-accent-purple/30 transition shadow-lg shadow-accent-purple/10"
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