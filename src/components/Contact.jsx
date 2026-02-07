import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import emailjs from '@emailjs/browser'; // ✅ EmailJS Import කළා
import { Mail, Github, Linkedin, Send, MessageCircle, Copy, Check } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const emailAddress = "infoname259@gmail.com"; 

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // --- 1. Supabase එකට දත්ත ඇතුළත් කිරීම ---
      const { error: supabaseError } = await supabase.from('messages').insert([formData]);
      if (supabaseError) throw supabaseError;

      // --- 2. EmailJS හරහා Email එකක් යැවීම ---
      // මේ Keys ටික ඔයාගේ EmailJS Dashboard එකෙන් ලබාගන්න
      const serviceId =import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId =import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey =import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_name: 'Dhanushka',
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      // සාර්ථක නම් UI එක Update කිරීම
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none text-white uppercase">
              READY TO <br />
              <span className="bg-gradient-to-r from-accent-blue via-slate-200 to-accent-purple bg-clip-text text-transparent italic">
                CONNECT?
              </span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div whileHover={{ y: -5 }} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] group relative overflow-hidden">
              <p className="text-[10px] font-bold text-accent-blue uppercase tracking-[0.3em] mb-4">Official Channel</p>
              <h3 className="text-2xl font-bold text-white mb-6">Drop me a line</h3>
              <div onClick={copyEmail} className="flex items-center justify-between bg-black/20 border border-white/5 p-4 rounded-xl cursor-pointer hover:border-accent-blue/50 transition-all group/item">
                <span className="text-slate-300 font-medium truncate mr-4">{emailAddress}</span>
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-slate-500" />}
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
              <p className="text-[10px] font-bold text-accent-purple uppercase tracking-[0.3em] mb-6">Social Connect</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: <Github size={22} />, label: 'GitHub', link: 'https://github.com/Dhanuwa856' },
                  { icon: <Linkedin size={22} />, label: 'LinkedIn', link: 'https://www.linkedin.com/in/dhanushka-rathnayaka' },
                  { icon: <MessageCircle size={22} />, label: 'Facebook', link: 'https://www.facebook.com/profile.php?id=61577681014893' }
                ].map((social, i) => (
                  <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/5 hover:border-accent-blue/50 transition-all group">
                    <span className="text-slate-400 group-hover:text-accent-blue">{social.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200">{social.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Your Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:border-accent-blue transition-all text-white" placeholder="Dhanushka Rathnayaka" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Address</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:border-accent-blue transition-all text-white" placeholder="name@company.com" />
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Message</label>
                <textarea required rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] px-6 py-4 focus:border-accent-blue transition-all text-white resize-none" placeholder="Let's build something AI-driven..."></textarea>
              </div>

              <button disabled={loading} className="group relative w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm overflow-hidden transition-all hover:bg-accent-blue hover:text-white disabled:opacity-50">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? "TRANSMITTING..." : (success ? "MISSION SUCCESSFUL ✓" : "SEND INQUIRY")}
                  {!loading && !success && <Send size={18} />}
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