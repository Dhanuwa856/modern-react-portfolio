import React, { useState } from 'react';
import DragDropBuilder from './DragDropBuilder';
import TiltCard from './TiltCard';
import { BookOpen, CheckCircle2 } from 'lucide-react';

const lessonsData = [
  {
    id: 1,
    title: '1. Print & Output',
    desc: 'Display text and AI status messages on screen.',
    content:
      "The 'print()' function is used to display output on the screen. Arrange the blocks below to print your first message.",
    blocks: [
      { id: '1', text: '"Hello!"' },
      { id: '2', text: ')' },
      { id: '3', text: 'print' },
      { id: '4', text: '(' },
    ],
    correctOrder: ['print', '(', '"Hello!"', ')'],
    actualCode: `print("Hello!")`,
    explanationSteps: [
      {
        code: `print("Hello!")`,
        desc: 'Python හි print() ශ්‍රිතය මගින් වරහන් ඇතුළත ඇති "Hello!" යන පාඨය තිරයේ (Terminal) පෙන්වයි.',
      },
    ],
  },
  {
    id: 2,
    title: '2. Variables & Math',
    desc: 'Perform calculations and store values in memory.',
    content:
      'Variables store data in memory so we can perform calculations. Arrange the blocks to calculate total = 10 + 5.',
    blocks: [
      { id: '1', text: '+' },
      { id: '2', text: 'total' },
      { id: '3', text: '5' },
      { id: '4', text: '=' },
      { id: '5', text: '10' },
    ],
    correctOrder: ['total', '=', '10', '+', '5'],
    actualCode: `total = 10 + 5\nprint(f"The total is: {total}")`,
    explanationSteps: [
      {
        code: 'total = 10 + 5',
        desc: '10 සහ 5 එකතු කර එහි පිළිතුර (15) total නම් විචල්‍යයේ (variable) තැන්පත් කරයි.',
      },
      {
        code: 'print(f"The total is: {total}")',
        desc: 'f-string එකක් භාවිතා කර total හි අගය තිරයේ පෙන්වයි.',
      },
    ],
  },
  {
    id: 3,
    title: '3. If/Else Logic',
    desc: 'Teach your program to make smart decisions.',
    content:
      "Conditions let your code make decisions based on thresholds. Build an 'if' condition checking if score > 50.",
    blocks: [
      { id: '1', text: 'score' },
      { id: '2', text: ':' },
      { id: '3', text: 'if' },
      { id: '4', text: '50' },
      { id: '5', text: '>' },
    ],
    correctOrder: ['if', 'score', '>', '50', ':'],
    actualCode: `score = 85\nif score > 50:\n    print(f"Score is {score}. You passed!")`,
    explanationSteps: [
      {
        code: 'score = 85',
        desc: 'පළමුව score විචල්‍යයට 85 යන අගය ලබා දෙයි.',
      },
      {
        code: 'if score > 50:',
        desc: 'score හි අගය 50 ට වඩා වැඩි දැයි පරීක්ෂා කරයි (85 > 50 සත්‍ය වේ).',
      },
      {
        code: '    print(f"Score is {score}. You passed!")',
        desc: 'කොන්දේසිය සත්‍ය නිසා මෙම print පේළිය ක්‍රියාත්මක වේ.',
      },
    ],
  },
  {
    id: 4,
    title: '4. Lists & Arrays',
    desc: 'Store datasets in ordered Python lists.',
    content:
      'Lists store multiple items inside square brackets. Arrange the blocks to create the fruits list.',
    blocks: [
      { id: '1', text: '=' },
      { id: '2', text: 'fruits' },
      { id: '3', text: ']' },
      { id: '4', text: '"Apple", "Mango"' },
      { id: '5', text: '[' },
    ],
    correctOrder: ['fruits', '=', '[', '"Apple", "Mango"', ']'],
    actualCode: `fruits = ["Apple", "Mango"]\nprint("List created:", fruits)`,
    explanationSteps: [
      {
        code: 'fruits = ["Apple", "Mango"]',
        desc: 'කොටු වරහන් [ ] භාවිතා කර අයිතම 2ක් සහිත Python List එකක් සාදයි.',
      },
      {
        code: 'print("List created:", fruits)',
        desc: 'සාදාගත් සම්පූර්ණ ලැයිස්තුව තිරයේ පෙන්වයි.',
      },
    ],
  },
  {
    id: 5,
    title: '5. For Loops',
    desc: 'Iterate through sequences automatically.',
    content:
      "A 'for loop' iterates over every item in a list. Arrange the blocks to loop over my_list.",
    blocks: [
      { id: '1', text: 'my_list' },
      { id: '2', text: 'for' },
      { id: '3', text: ':' },
      { id: '4', text: 'item' },
      { id: '5', text: 'in' },
    ],
    correctOrder: ['for', 'item', 'in', 'my_list', ':'],
    actualCode: `my_list = ['Item 1', 'Item 2', 'Item 3']\nfor item in my_list:\n    print("Iterating:", item)\nprint("Loop finished!")`,
    explanationSteps: [
      {
        code: "my_list = ['Item 1', 'Item 2', 'Item 3']",
        desc: "පළමුව, අයිතම 3ක් සහිත List එකක් 'my_list' නමින් පරිගණක මතකයේ හැදෙනවා.",
      },
      {
        code: 'for item in my_list:',
        desc: "Loop එක පටන් ගන්නවා. my_list එකේ පළවෙනි අයිතමය ('Item 1') 'item' කියන විචල්‍යයට දාගන්නවා.",
      },
      {
        code: '    print("Iterating:", item)',
        desc: "දැන් 'Item 1' තිරයේ (terminal) print කරනවා.",
      },
      {
        code: 'for item in my_list:',
        desc: "ආයෙත් උඩට යනවා! (Iteration) දැන් දෙවෙනි අයිතමය ('Item 2') 'item' එකට දාගන්නවා.",
      },
      {
        code: '    print("Iterating:", item)',
        desc: "'Item 2' print කරනවා.",
      },
      {
        code: 'print("Loop finished!")',
        desc: 'ලිස්ට් එකේ දේවල් ඉවර නිසා loop එකෙන් එළියට ඇවිත් අවසාන පේළිය print කරලා වැඩසටහන අවසන් කරනවා.',
      },
    ],
  },
];

const PythonLearningHub = ({ embedded = false }) => {
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [completedIds, setCompletedIds] = useState([]);
  const activeLesson = lessonsData.find((l) => l.id === activeLessonId);

  return (
    <div id="python-learning" className={embedded ? '' : 'py-20 px-4 sm:px-6 max-w-6xl mx-auto'}>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 flex flex-col gap-2.5">
          {lessonsData.map((lesson) => {
            const isSelected = activeLessonId === lesson.id;
            const isDone = completedIds.includes(lesson.id);
            return (
              <button
                key={lesson.id}
                onClick={() => setActiveLessonId(lesson.id)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-800 border-zinc-700 text-white shadow-md'
                    : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`font-bold text-sm sm:text-base flex items-center gap-2 ${
                      isSelected ? 'text-white' : 'text-zinc-300'
                    }`}
                  >
                    <BookOpen size={15} className={isSelected ? 'text-accent-blue' : 'text-zinc-500'} />
                    {lesson.title}
                  </h3>
                  {isDone && <CheckCircle2 size={16} className="text-accent-blue" />}
                </div>
                <p className="text-xs text-zinc-400 mt-1">{lesson.desc}</p>
              </button>
            );
          })}
        </div>

        <TiltCard
          intensity={2}
          scaleOnHover={1}
          className="lg:w-2/3 bg-zinc-900/85 backdrop-blur-xl rounded-3xl p-5 sm:p-8"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-accent-blue px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800">
              Lesson {activeLesson.id} of {lessonsData.length}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {activeLesson.title}
          </h3>
          <hr className="border-zinc-800 mb-4" />
          <p className="text-zinc-300 leading-relaxed mb-5 text-sm">
            {activeLesson.content}
          </p>

          <DragDropBuilder
            key={activeLesson.id}
            initialBlocks={activeLesson.blocks}
            correctOrder={activeLesson.correctOrder}
            actualCode={activeLesson.actualCode}
            explanationSteps={activeLesson.explanationSteps}
            onComplete={() => {
              if (!completedIds.includes(activeLesson.id)) {
                setCompletedIds((prev) => [...prev, activeLesson.id]);
              }
            }}
          />
        </TiltCard>
      </div>
    </div>
  );
};

export default PythonLearningHub;