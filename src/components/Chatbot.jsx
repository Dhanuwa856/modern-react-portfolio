import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X } from 'lucide-react';
// 1. Library එක Import කරමු
import { HfInference } from "@huggingface/inference";

// 2. Client එක Initialize කරමු (Token එක මෙතනට යනවා)
const hf = new HfInference(import.meta.env.VITE_HF_TOKEN);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Dhanushka's AI. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const DHANUSHKA_BIO = "You are Dhanushka's AI assistant. Dhanushka is an IT student at ITUM, loves Python and AI. Be helpful.";

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      // 3. Library එක හරහා AI එකට කතා කිරීම (Fetch වෙනුවට)
      const response = await hf.textGeneration({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        inputs: `<s>[INST] ${DHANUSHKA_BIO} \n User Question: ${currentInput} [/INST]`,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
        },
      });

      const botResponse = response.generated_text.split('[/INST]')[1] || "I am thinking... ask me again!";
      setMessages(prev => [...prev, { role: 'assistant', content: botResponse.trim() }]);

    } catch (error) {
      console.error("HF Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having a connection issue. Please check your Token or Internet!" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    // ... (ඔයාගේ කලින් තිබුණු UI කෝඩ් එක මෙතනට දාන්න - වෙනසක් නැත) ...
    <div className="fixed bottom-6 right-6 z-[1000]">
     <div className="fixed bottom-6 right-6 z-[1000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] h-[450px] bg-dark-bg/95 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-accent-blue/10 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold tracking-widest uppercase">Dhanushka AI</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-accent-blue text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-slate-300 rounded-tl-none'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-xs text-slate-500 font-mono animate-pulse">AI is thinking...</div>}
              <div ref={scrollRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-accent-blue"
              />
              <button onClick={handleSend} className="p-2 bg-accent-blue rounded-full hover:scale-110 transition-transform">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-accent-blue rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
    </div>
  );
};

export default Chatbot;