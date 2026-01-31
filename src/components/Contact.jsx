import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { Mail, Github, Linkedin, Send, MessageCircle, Copy, Check } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const emailAddress = "dhanushka@email.com"; // ඔයාගේ Email එක මෙතනට දාන්න

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('messages').insert([formData]);

    if (!error) {
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } else {
      alert("Something went wrong. Please try again!");
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
              READY TO <br />
              <span className="bg-gradient-to-r from-accent-blue via-slate-200 to-accent-purple bg-clip-text text-transparent italic">
                CONNECT?
              </span>
            </h2>
            <div className="flex items-center gap-6">
               <div className="h-[1px] w-24 bg-gradient-to-r from-accent-blue to-transparent" />
               <p className="text-slate-400 text-lg font-medium tracking-tight">
                 Let's turn your <span className="text-white italic">vision</span> into digital reality.
               </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Info Cards (Bento Style) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card with Copy Feature */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 p-8 rounded-[2rem] group relative overflow-hidden"
            >
              <div className="relative z-10">
                <p className="text-[10px] font-bold text-accent-blue uppercase tracking-[0.3em] mb-4">Official Channel</p>
                <h3 className="text-2xl font-bold text-white mb-6">Drop me a line</h3>
                <div 
                  onClick={copyEmail}
                  className="flex items-center justify-between bg-black/20 border border-white/5 p-4 rounded-xl cursor-pointer hover:border-accent-blue/50 transition-all group/item"
                >
                  <span className="text-slate-300 font-medium truncate mr-4">{emailAddress}</span>
                  {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-slate-500 group-hover/item:text-accent-blue" />}
                </div>
              </div>
            </motion.div>

            {/* Social Connect Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 p-8 rounded-[2rem]"
            >
              <p className="text-[10px] font-bold text-accent-purple uppercase tracking-[0.3em] mb-6">Digital Presence</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: <Github size={22} />, label: 'GitHub', link: '#' },
                  { icon: <Linkedin size={22} />, label: 'LinkedIn', link: '#' },
                  { icon: <MessageCircle size={22} />, label: 'Facebook', link: '#' }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.link} 
                    target="_blank" 
                    className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/5 hover:border-accent-blue/50 hover:bg-accent-blue/5 transition-all group"
                  >
                    <span className="text-slate-400 group-hover:text-accent-blue transition-colors">{social.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200">{social.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: Professional Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Your Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all placeholder:text-slate-700" 
                    placeholder="E.g. Elon Musk" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all placeholder:text-slate-700" 
                    placeholder="name@company.com" 
                  />
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Message</label>
                <textarea 
                  required 
                  rows="5" 
                  value={formData.message} 
                  onChange={(e) => setFormData({...formData, message: e.target.value})} 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all placeholder:text-slate-700 resize-none" 
                  placeholder="Describe your project goals..."
                ></textarea>
              </div>

              <button 
                disabled={loading} 
                className="group relative w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm overflow-hidden transition-all hover:bg-accent-blue hover:text-white disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? "TRANSMITTING..." : (success ? "MISSION SUCCESSFUL ✓" : "SEND INQUIRY")}
                  {!loading && !success && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;