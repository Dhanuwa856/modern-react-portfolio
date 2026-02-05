import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Zap, Cpu } from 'lucide-react';
import { getAIChatResponse } from '../utils/gemini';
import { supabase } from '../supabaseClient'; // ✅ Supabase Client එක import කරන්න

const AIChatBot = () => {
  // යූසර්ට අනන්‍ය වූ Session ID එකක් ලබා ගැනීම හෝ සෑදීම
const getSessionId = () => {
  let sessionId = localStorage.getItem('chat_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(7); // සරල unique id එකක්
    localStorage.setItem('chat_session_id', sessionId);
  }
  return sessionId;
};
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [hasNotified, setHasNotified] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm Dhanushka's AI. Want to talk about AI or check my projects?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  const bot3DImage = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png";

  // --- 1. Supabase එකෙන් පරණ Chat එක Load කිරීම ---
  const fetchChatHistory = async () => {
    const { data, error } = await supabase
      .from('chat_history')
      .select('role, message')
      .order('created_at', { ascending: true })
      .limit(50);

    if (!error && data && data.length > 0) {
      setMessages(data.map(m => ({ role: m.role, text: m.message })));
    }
  };

  // --- 2. අලුත් මැසේජ් එකක් Supabase එකට Save කිරීම ---
  const saveToSupabase = async (role, text) => {
    const { error } = await supabase
      .from('chat_history')
      .insert([{ role, message: text, session_id: getSessionId() }]); // දැනට guest_session ලෙස
    
    if (error) console.error('Supabase Save Error:', error);
  };

  // චැට් එක ඕපන් වුණාම හිස්ට්‍රි එක ලෝඩ් කරන්න
  useEffect(() => {
    if (isOpen) fetchChatHistory();
  }, [isOpen]);

  // Scroll logic
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isLoading, isOpen]);

  // Scroll Notification trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && !hasNotified && !isOpen) {
        setShowNotification(true);
        setHasNotified(true);
        setTimeout(() => setShowNotification(false), 8000);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNotified, isOpen]);

  const handleSend = async (customText = null) => {
    const textToSend = customText || input;
    if (!textToSend.trim()) return;
    
    setShowNotification(false);
    const userMsg = { role: 'user', text: textToSend };
    
    // UI එකට දාලා Supabase එකට Save කරන්න
    setMessages(prev => [...prev, userMsg]);
    await saveToSupabase('user', textToSend);
    
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIChatResponse(textToSend);
      const botMsg = { role: 'bot', text: aiResponse };
      
      // Bot ගේ මැසේජ් එක UI එකට දාලා Supabase එකට Save කරන්න
      setMessages(prev => [...prev, botMsg]);
      await saveToSupabase('bot', aiResponse);
      
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Oops! My circuits are a bit tangled. Try again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[100] font-sans select-none">
      <AnimatePresence>
        {/* Glass Notification Bubble */}
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={() => {setIsOpen(true); setShowNotification(false);}}
            className="absolute bottom-16 right-0 mb-3 p-1.5 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl cursor-pointer w-64 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-accent-blue/20 to-transparent p-3 rounded-xl flex items-center gap-3">
                <img src={bot3DImage} alt="Bot" className="w-10 h-10 object-contain drop-shadow-md" />
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-accent-blue tracking-widest uppercase">AI Assistant</span>
                    <p className="text-xs text-white/90 leading-tight">Can I help you with Dhanushka's projects?</p>
                </div>
            </div>
          </motion.div>
        )}

        {/* Main Chat Window */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="mb-4 w-[calc(100vw-2.5rem)] sm:w-[360px] h-[70vh] max-h-[550px] bg-[#0c0c0e]/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden ring-1 ring-white/10"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src={bot3DImage} alt="3D Bot" className="w-10 h-10" />
                <div>
                    <h4 className="font-bold text-white text-sm tracking-tight">Dhanushka AI</h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> ONLINE
                    </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-slate-400">
                <X size={18}/>
              </button>
            </div>

            {/* Message Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13.5px] leading-relaxed ${
                    msg.role === 'user' ? 'bg-accent-blue text-white rounded-tr-none' : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/10'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-[10px] text-accent-blue animate-pulse pl-4 italic">Thinking...</div>}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-black/20">
              <div className="relative flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-1 focus-within:border-accent-blue/40 transition-all">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Message..."
                    className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none text-white placeholder:text-slate-600"
                />
                <button 
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                    className="p-2.5 bg-accent-blue text-white rounded-xl disabled:opacity-30"
                >
                    <Send size={16}/>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Bot Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 relative ${
            isOpen ? 'bg-white/10' : 'bg-[#1a1a1e] border border-white/10'
        }`}
      >
        {isOpen ? <X size={22} className="text-white" /> : (
            <img src={bot3DImage} alt="Bot" className="w-10 h-10 object-contain drop-shadow-xl" />
        )}
      </motion.button>
    </div>
  );
};

export default AIChatBot;