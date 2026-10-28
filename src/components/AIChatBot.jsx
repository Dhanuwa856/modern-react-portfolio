import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, MessageSquare, Trash2 } from 'lucide-react';
import { getAIChatResponse } from '../utils/gemini';
import { supabase } from '../supabaseClient';

const QUICK_PROMPTS = [
  { label: '🚀 AI & Web Projects', text: 'What are Dhanushka’s top AI and Full-Stack projects?' },
  { label: '💻 Tech Stack', text: 'What is Dhanushka’s AI and Full-Stack tech stack?' },
  { label: '🎓 ITUM Education', text: 'Tell me about Dhanushka’s education at ITUM.' },
  { label: '🇱🇰 සිංහලෙන් විස්තර', text: 'ධනුෂ්කගේ AI සහ Full-Stack projects ගැන සිංහලෙන් කියන්න' },
];

const AIChatBot = () => {
  const getSessionId = () => {
    let sessionId = localStorage.getItem('chat_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 10);
      localStorage.setItem('chat_session_id', sessionId);
    }
    return sessionId;
  };

  const defaultGreeting = {
    role: 'bot',
    text: "Hi! 👋 I'm Dhanushka's AI Assistant. Ask me anything about his AI models, Full-Stack apps, ITUM studies, or tap a topic below!",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [hasNotified, setHasNotified] = useState(false);
  const [messages, setMessages] = useState([defaultGreeting]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  const fetchChatHistory = async () => {
    try {
      const currentSessionId = getSessionId();
      const { data, error } = await supabase
        .from('chat_history')
        .select('role, message')
        .eq('session_id', currentSessionId)
        .order('created_at', { ascending: true })
        .limit(40);

      if (!error && data && data.length > 0) {
        setMessages(data.map((m) => ({ role: m.role, text: m.message })));
      }
    } catch (err) {
      console.warn('Chat history load skipped:', err);
    }
  };

  const saveToSupabase = async (role, text) => {
    try {
      await supabase
        .from('chat_history')
        .insert([{ role, message: text, session_id: getSessionId() }]);
    } catch (err) {
      console.warn('Chat save skipped:', err);
    }
  };

  useEffect(() => {
    if (isOpen) fetchChatHistory();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 80);
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450 && !hasNotified && !isOpen) {
        setShowNotification(true);
        setHasNotified(true);
        setTimeout(() => setShowNotification(false), 7000);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNotified, isOpen]);

  const handleSend = async (customText = null) => {
    const textToSend = (customText ?? input).trim();
    if (!textToSend || isLoading) return;

    setShowNotification(false);
    const userMsg = { role: 'user', text: textToSend };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    saveToSupabase('user', textToSend);

    try {
      const aiResponse = await getAIChatResponse(textToSend);
      const botMsg = { role: 'bot', text: aiResponse };
      setMessages((prev) => [...prev, botMsg]);
      saveToSupabase('bot', aiResponse);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: "I'm here! Ask me about Dhanushka's AI projects, MERN stack apps, or contact details.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    localStorage.removeItem('chat_session_id');
    setMessages([defaultGreeting]);
  };

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:bottom-6 sm:right-6 z-[100] font-sans">
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            onClick={() => {
              setIsOpen(true);
              setShowNotification(false);
            }}
            className="hidden sm:block absolute bottom-16 right-0 mb-2 p-3.5 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-2xl cursor-pointer w-68 hover:border-accent-blue transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-blue/15 border border-accent-blue/30 flex items-center justify-center text-accent-blue shrink-0">
                <Bot size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-accent-blue tracking-wider uppercase block">
                  Dhanushka AI
                </span>
                <p className="text-xs text-zinc-200 leading-snug mt-0.5">
                  Ask me about Dhanushka&apos;s AI models or Full-Stack works!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="mb-3 w-[calc(100vw-1.5rem)] sm:w-[380px] h-[min(500px,calc(100dvh-7rem))] max-h-[75vh] bg-zinc-900/95 backdrop-blur-2xl border border-zinc-800 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-zinc-950/80 border-b border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent-blue/15 border border-accent-blue/30 flex items-center justify-center text-accent-blue">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5">
                    Dhanushka AI <Sparkles size={13} className="text-accent-blue" />
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    Online • Sinhala &amp; English
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title="Reset Conversation"
                  className="p-2 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  <Trash2 size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-white text-zinc-950 font-medium rounded-tr-sm'
                        : 'bg-zinc-950 text-zinc-200 rounded-tl-sm border border-zinc-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="px-4 py-2.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-blue animate-ping" />
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-4 py-2 border-t border-zinc-800/80 bg-zinc-950/60 flex gap-2 overflow-x-auto scrollbar-hide">
              {QUICK_PROMPTS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip.text)}
                  disabled={isLoading}
                  className="shrink-0 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-medium text-zinc-300 hover:text-white transition cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-800">
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-1.5 focus-within:border-zinc-600 transition-all">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask in English or Sinhala..."
                  className="flex-1 bg-transparent px-3 py-1.5 text-sm focus:outline-none text-white placeholder:text-zinc-500"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="p-2.5 bg-white hover:bg-zinc-200 text-zinc-950 font-bold rounded-xl disabled:opacity-30 transition cursor-pointer"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`h-12 sm:h-13 px-4 sm:px-5 rounded-full flex items-center gap-2 shadow-2xl transition-all cursor-pointer ${
          isOpen
            ? 'bg-zinc-800 text-white border border-zinc-700'
            : 'bg-white text-zinc-950 font-bold hover:bg-zinc-200'
        }`}
      >
        {isOpen ? (
          <>
            <X size={18} />
            <span className="text-xs font-bold">Close</span>
          </>
        ) : (
          <>
            <MessageSquare size={18} className="text-accent-blue" />
            <span className="text-xs font-bold">Ask AI</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default AIChatBot;