import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { 
  Trophy, RefreshCcw, CheckCircle2, XCircle, BrainCircuit, 
  Code, ChevronRight, Loader2, Sparkles, BarChart3, 
  Clock, Zap, Gift, Mail, User, Send, Info, AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const TechQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState('tech');
  
  // Giveaway States
  const [entryData, setEntryData] = useState({ name: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 🔄 Fetch Questions from Supabase ---
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('category', activeQuiz)
        .order('order_rank', { ascending: true });

      if (!error && data) {
        setQuestions(data.map(q => ({
          q: q.question,
          options: q.options,
          a: q.correct_answer,
          explanation: q.explanation,
          difficulty: q.difficulty || 'medium'
        })));
      }
      setLoading(false);
    };

    fetchQuestions();
  }, [activeQuiz]);

  // --- 🎯 Handle Answer Selection ---
  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    const correct = index === questions[currentQuestion].a;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
        // Celebration for High Scorers
        if ((score + (correct ? 1 : 0)) >= Math.floor(questions.length * 0.8)) {
          confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#a855f7', '#6366f1', '#ffffff']
          });
        }
      }
    }, 1500);
  };

  // --- 🎁 Submit Giveaway Entry ---
  const submitGiveaway = async (e) => {
    e.preventDefault();
    
    // Check local storage for previous entries
    const alreadyEntered = localStorage.getItem('giveaway_entered');
    if (alreadyEntered) {
      alert("You have already entered the giveaway from this device! ✋");
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase
      .from('giveaway_entries')
      .insert([{
        user_name: entryData.name,
        user_email: entryData.email,
        quiz_score: score,
        quiz_category: activeQuiz
      }]);

    if (!error) {
      setIsSubmitted(true);
      localStorage.setItem('giveaway_entered', 'true'); 
      confetti({ particleCount: 100, spread: 70 });
    } else if (error.code === '23505') { 
      alert("This email has already been registered for the giveaway!");
    } else {
      alert("Something went wrong. Please try again!");
    }
    setIsSubmitting(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setEntryData({ name: '', email: '' });
  };

  const switchQuiz = (quizType) => {
    setActiveQuiz(quizType);
    resetQuiz();
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  return (
    <section id="quiz" className="py-24 px-4 md:px-6 relative overflow-hidden">
      
      {/* 🎊 Scrolling Announcement Banner */}
      <div className="absolute top-0 left-0 w-full bg-accent-purple/90 backdrop-blur-md py-2 overflow-hidden flex whitespace-nowrap z-50 border-b border-white/10">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex gap-10 items-center text-[10px] font-black uppercase tracking-[0.3em] text-white"
        >
          <span className="flex items-center gap-2"><Gift size={12}/> 10 LinkedIn Premium Coupons Giveaway</span>
          <span className="text-white/50">|</span>
          <span>🔥 Score 80%+ to enter the draw</span>
          <span className="text-white/50">|</span>
          {/* <span className="flex items-center gap-2"><Sparkles size={12}/> Winners Announced: Feb 10th @ 10 PM</span> */}
          {/* <span className="text-white/50">|</span> */}
          <span className="flex items-center gap-2"><Gift size={12}/> 10 LinkedIn Premium Coupons Giveaway</span>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pt-10">
        
        {/* --- Header (Matching "About Myself" Style) --- */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles className="w-3 h-3 text-accent-purple" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-white">Interactive Learning</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none text-white uppercase">
              KNOWLEDGE <br />
              <span className="bg-gradient-to-r from-accent-purple via-slate-100 to-accent-blue bg-clip-text text-transparent italic">
                BATTLEGROUND
              </span>
            </h2>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
              <div className="h-[2px] w-16 bg-accent-purple rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              <p className="text-slate-400 text-sm md:text-base font-medium max-w-lg leading-relaxed">
                Test your skills in <span className="text-white font-bold">Modern Tech</span> and 
                <span className="text-accent-blue font-bold"> Python Development</span>. Beat the quiz to win premium rewards!
              </p>
            </div>
          </motion.div>
        </div>

        {/* --- Main Quiz Console --- */}
        <div className="bg-gradient-to-br from-white/5 via-white/5 to-transparent backdrop-blur-2xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
          
          {/* Category Tabs */}
          <div className="p-6 md:p-8 border-b border-white/10 bg-white/[0.02]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex gap-3">
                <button onClick={() => switchQuiz('tech')} className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 transition-all ${activeQuiz === 'tech' ? 'bg-accent-purple border-accent-purple text-white shadow-lg shadow-accent-purple/20' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  <BrainCircuit size={18} /> <span className="text-sm font-bold">General Tech</span>
                </button>
                <button onClick={() => switchQuiz('python')} className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 transition-all ${activeQuiz === 'python' ? 'bg-accent-blue border-accent-blue text-white shadow-lg shadow-accent-blue/20' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  <Code size={18} /> <span className="text-sm font-bold">Python Mastery</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 min-h-[500px] flex items-center justify-center">
            {loading ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-accent-purple animate-spin" />
                <p className="text-xs font-bold tracking-widest text-slate-500 uppercase italic">Loading from Database...</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.div key="question" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
                    <div className="mb-10 text-left">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black text-accent-purple uppercase tracking-[0.3em]">Module {currentQuestion + 1} / {questions.length}</span>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter ${getDifficultyColor(questions[currentQuestion]?.difficulty)}`}>
                          {questions[currentQuestion]?.difficulty?.toUpperCase()}
                        </div>
                      </div>
                      <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight tracking-tight">
                        {questions[currentQuestion]?.q}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {questions[currentQuestion]?.options?.map((option, idx) => (
                        <button
                          key={idx}
                          disabled={selectedAnswer !== null}
                          onClick={() => handleAnswer(idx)}
                          className={`p-6 rounded-[1.5rem] border-2 text-left transition-all duration-300 relative group
                            ${selectedAnswer === idx 
                              ? (isCorrect ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-red-500/10 border-red-500 text-red-400')
                              : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/10'}`}
                        >
                          <div className="flex items-center gap-4">
                             <span className="text-xs font-black opacity-20 group-hover:opacity-100 transition-opacity">{(idx + 1).toString().padStart(2, '0')}</span>
                             <span className="font-medium text-sm md:text-base">{option}</span>
                          </div>
                          {selectedAnswer === idx && (
                            <div className="absolute right-6 top-1/2 -translate-y-1/2">
                              {isCorrect ? <CheckCircle2 size={20}/> : <XCircle size={20}/>}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl text-center">
                    
                    {/* Final Score */}
                    <div className="mb-10">
                      <div className="inline-block p-6 rounded-full bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 mb-6 border border-white/10">
                        <Trophy className={score >= Math.floor(questions.length * 0.8) ? "text-yellow-400" : "text-white"} size={64} />
                      </div>
                      <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Quiz Complete</h3>
                      <p className="text-slate-400 font-medium text-lg">You secured <span className="text-white font-bold">{score} / {questions.length}</span> points.</p>
                    </div>

                    {/* 🎁 Giveaway Form Card */}
                    {score >= Math.floor(questions.length * 0.8) ? (
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        className="bg-white/5 border border-accent-purple/30 p-8 rounded-[3rem] relative overflow-hidden mb-8 shadow-2xl"
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Gift size={120}/></div>
                        
                        {!isSubmitted ? (
                          <>
                            <h4 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2 uppercase tracking-tighter">
                              <Sparkles className="text-yellow-400" size={18}/> CLAIM YOUR CHANCE
                            </h4>
                            <p className="text-[10px] text-slate-400 mb-8 uppercase tracking-[0.2em]">LinkedIn Premium Giveaway Entry</p>
                            
                            <form onSubmit={submitGiveaway} className="space-y-4 max-w-sm mx-auto mb-10">
                              <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16}/>
                                <input 
                                  required type="text" placeholder="Your Name" 
                                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:border-accent-purple outline-none transition-all"
                                  onChange={(e) => setEntryData({...entryData, name: e.target.value})}
                                />
                              </div>
                              <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16}/>
                                <input 
                                  required type="email" placeholder="Email Address" 
                                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:border-accent-purple outline-none transition-all"
                                  onChange={(e) => setEntryData({...entryData, email: e.target.value})}
                                />
                              </div>
                              <button 
                                disabled={isSubmitting}
                                className="w-full bg-accent-purple hover:bg-white hover:text-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent-purple/20"
                              >
                                {isSubmitting ? <Loader2 className="animate-spin" size={16}/> : <><Send size={14}/> Enter Giveaway</>}
                              </button>
                            </form>

                            {/* 📜 Official Rules & Conditions */}
                            <div className="border-t border-white/10 pt-6 text-left">
                              <div className="flex items-center gap-2 mb-4">
                                <Info size={14} className="text-accent-purple" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Eligibility & Terms</span>
                              </div>
                              <ul className="space-y-3">
                                {[
                                  "Exclusively for members who have NOT used a trial in the last 12 months.",
                                  "Existing Premium members are not eligible for this voucher.",
                                  "Trial lasts for 2 months; standard rates apply thereafter unless canceled."
                                ].map((rule, i) => (
                                  <li key={i} className="flex items-start gap-3 text-[10px] text-slate-400 leading-relaxed">
                                    <div className="mt-1.5 w-1 h-1 rounded-full bg-accent-purple shrink-0" />
                                    {rule}
                                  </li>
                                ))}
                              </ul>
                              <p className="mt-6 text-[9px] text-slate-600 italic leading-tight uppercase tracking-tighter">
                                * activation required immediately upon receipt. vouchers are provided as referral links.
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="py-10">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                              <CheckCircle2 className="text-green-400" size={40}/>
                            </div>
                            <h4 className="text-white font-black text-3xl uppercase tracking-tighter">BATTLE WON!</h4>
                            {/* <p className="text-slate-400 text-sm mt-3 max-w-xs mx-auto">
                              Your entry is locked in. Winners will be notified on <span className="text-white font-bold">Feb 10th @ 22:00</span> via email.
                            </p> */}
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <div className="p-12 bg-white/5 rounded-[3rem] border border-white/10 mb-8 max-w-sm mx-auto shadow-inner">
                        <AlertCircle className="mx-auto text-slate-600 mb-6" size={48} />
                        <p className="text-slate-400 text-sm leading-relaxed mb-2 uppercase tracking-wide">Insufficient Score</p>
                        <p className="text-slate-500 text-xs">
                          You need at least <span className="text-accent-purple font-bold">80% accuracy</span> to unlock the giveaway entry. Try again!
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                      <button onClick={resetQuiz} className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-accent-purple hover:text-white transition-all shadow-xl">
                        <RefreshCcw size={14} /> Re-Attempt
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechQuiz;