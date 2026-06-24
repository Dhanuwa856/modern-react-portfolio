import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DragDropBuilder from './DragDropBuilder';

const lessonsData = [
  { 
    id: 1, 
    title: '1. Print & Variables', 
    desc: 'Learn how to output text and store data.',
    content: "The 'print()' function is used to display output on the screen. Let's write a simple program to say hello to the world.",
    blocks: [
      { id: '1', text: '"Hello!"' }, { id: '2', text: ')' }, { id: '3', text: 'print' }, { id: '4', text: '(' }
    ],
    correctOrder: ['print', '(', '"Hello!"', ')'],
    // ඇත්තටම run වෙන code එක
    actualCode: `print("Hello!")` 
  },
  { 
    id: 2, 
    title: '2. Math Operations', 
    desc: 'Perform basic mathematical calculations.',
    content: "Variables can store numbers, and we can perform math operations on them. Let's calculate a total by adding 10 and 5.",
    blocks: [
      { id: '1', text: '+' }, { id: '2', text: 'total' }, { id: '3', text: '5' }, { id: '4', text: '=' }, { id: '5', text: '10' }
    ],
    correctOrder: ['total', '=', '10', '+', '5'],
    actualCode: `total = 10 + 5\nprint(f"The total is: {total}")`
  },
  { 
    id: 3, 
    title: '3. If/Else Conditions', 
    desc: 'Teach the computer to make decisions.',
    content: "Conditions allow your program to decide what to do. Let's write an 'if' statement to check if a score is greater than 50.",
    blocks: [
      { id: '1', text: 'score' }, { id: '2', text: ':' }, { id: '3', text: 'if' }, { id: '4', text: '50' }, { id: '5', text: '>' }
    ],
    correctOrder: ['if', 'score', '>', '50', ':'],
    actualCode: `score = 85\nif score > 50:\n    print(f"Score is {score}. You passed!")`
  },
  { 
    id: 4, 
    title: '4. Lists & Data', 
    desc: 'Store multiple items in a single variable.',
    content: "A list is a data structure in Python that is a mutable, or changeable, ordered sequence of elements. Let's create a list of fruits.",
    blocks: [
      { id: '1', text: '=' }, { id: '2', text: 'fruits' }, { id: '3', text: ']' }, { id: '4', text: '"Apple", "Mango"' }, { id: '5', text: '[' }
    ],
    correctOrder: ['fruits', '=', '[', '"Apple", "Mango"', ']'],
    actualCode: `fruits = ["Apple", "Mango"]\nprint("List created:", fruits)`
  },
  // PythonLearningHub.jsx ඇතුලේ lessonsData වල 5 වෙනි පාඩම මේ විදිහට update කරන්න:

  { 
    id: 5, 
    title: '5. For Loops', 
    desc: 'Execute a block of code multiple times.',
    content: "A 'for loop' is used for iterating over a sequence. Let's iterate through our items.",
    blocks: [
      { id: '1', text: 'my_list' }, { id: '2', text: 'for' }, { id: '3', text: ':' }, { id: '4', text: 'item' }, { id: '5', text: 'in' }
    ],
    correctOrder: ['for', 'item', 'in', 'my_list', ':'],
    actualCode: `my_list = ['Item 1', 'Item 2', 'Item 3']\nfor item in my_list:\n    print("Iterating:", item)\nprint("Loop finished!")`,
    // අලුතින් එකතු කරන කොටස: පියවරෙන් පියවර විස්තරය
    explanationSteps: [
      { code: "my_list = ['Item 1', 'Item 2', 'Item 3']", desc: "පළමුව, අයිතම 3ක් සහිත List එකක් 'my_list' නමින් පරිගණක මතකයේ හැදෙනවා." },
      { code: "for item in my_list:", desc: "Loop එක පටන් ගන්නවා. my_list එකේ පළවෙනි අයිතමය ('Item 1') 'item' කියන විචල්‍යයට (variable) දාගන්නවා." },
      { code: "    print(\"Iterating:\", item)", desc: "දැන් 'Item 1' තිරයේ (terminal) print කරනවා." },
      { code: "for item in my_list:", desc: "ආයෙත් උඩට යනවා! (Iteration) දැන් දෙවෙනි අයිතමය ('Item 2') 'item' එකට දාගන්නවා." },
      { code: "    print(\"Iterating:\", item)", desc: "'Item 2' print කරනවා." },
      { code: "for item in my_list:", desc: "නැවතත් උඩට! අවසාන අයිතමය ('Item 3') 'item' එකට දාගන්නවා." },
      { code: "    print(\"Iterating:\", item)", desc: "'Item 3' print කරනවා." },
      { code: "print(\"Loop finished!\")", desc: "ලිස්ට් එකේ දේවල් ඉවර නිසා loop එකෙන් එළියට ඇවිත් අවසාන පේළිය print කරලා වැඩසටහන අවසන් කරනවා." }
    ]
  }
];

const PythonLearningHub = () => {
  const [activeLessonId, setActiveLessonId] = useState(1);
  const activeLesson = lessonsData.find(l => l.id === activeLessonId);

  return (
    <section id="python-learning" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none text-white uppercase">
            PYTHON <br />
            <span className="bg-gradient-to-r from-accent-purple via-slate-100 to-accent-blue bg-clip-text text-transparent italic">
              ACADEMY
            </span>
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
            <div className="h-[2px] w-16 bg-accent-purple rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            <p className="text-slate-400 text-sm md:text-base font-medium max-w-md leading-relaxed">
              Interactive coding <span className="text-white">Basics</span> designed for <span className="text-accent-blue">Beginners</span>.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 flex flex-col gap-3">
          {lessonsData.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setActiveLessonId(lesson.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                activeLessonId === lesson.id
                  ? 'bg-accent-blue/10 border-accent-blue shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/20'
              }`}
            >
              <h3 className={`font-bold text-lg ${activeLessonId === lesson.id ? 'text-accent-blue' : 'text-slate-200'}`}>
                {lesson.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1">{lesson.desc}</p>
            </button>
          ))}
        </div>

        <div className="lg:w-2/3 bg-[#0a0f1c] border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {activeLesson.title}
          </h2>
          <hr className="border-white/10 mb-6" />
          <p className="text-slate-300 leading-relaxed mb-6">
            {activeLesson.content}
          </p>

          {/* actualCode එක pass කරනවා */}
        {/* අනිත් code කොටස්... */}
          
          <DragDropBuilder 
            key={activeLesson.id} 
            initialBlocks={activeLesson.blocks} 
            correctOrder={activeLesson.correctOrder} 
            actualCode={activeLesson.actualCode}
            explanationSteps={activeLesson.explanationSteps} /* <-- මේ පේළිය අනිවාර්යයෙන්ම එකතු කරන්න */
          />
        </div>
      </div>
    </section>
  );
};

export default PythonLearningHub;