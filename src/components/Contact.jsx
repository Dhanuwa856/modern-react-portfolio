import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { Mail, Github, Linkedin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Consistent with Works & About */}
        <div className="mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none">
              GET IN <br />
              <span className="bg-gradient-to-r from-accent-blue via-slate-100 to-accent-purple bg-clip-text text-transparent italic">
                TOUCH
              </span>
            </h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
               <div className="h-[2px] w-16 bg-accent-blue rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
               <p className="text-slate-400 text-sm md:text-base font-medium max-w-md">
                 Have a project in mind or just want to say hi? <span className="text-white">Let's build something great.</span>
               </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info & Socials */}
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <a href="mailto:your-email@gmail.com" className="flex items-center gap-4 group">
                  <div className="p-4 bg-accent-blue/10 rounded-2xl group-hover:bg-accent-blue group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Email Me</p>
                    <p className="text-slate-200">dhanushka@email.com</p>
                  </div>
                </a>
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-[0.3em] mb-6 text-center lg:text-left">FOLLOW MY JOURNEY</p>
                <div className="flex gap-4 justify-center lg:justify-start">
                  {[
                    { icon: <Github />, link: 'https://github.com' },
                    { icon: <Linkedin />, link: 'https://linkedin.com' },
                    { icon: <MessageCircle />, link: 'https://facebook.com' } // FB Page එකට
                  ].map((social, i) => (
                    <a key={i} href={social.link} target="_blank" className="p-4 bg-white/5 border border-white/10 rounded-full hover:border-accent-blue hover:text-accent-blue transition-all">
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-blue transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Email</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-blue transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Subject</label>
              <input type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-blue transition-all" placeholder="How can I help?" />
            </div>
            <div className="space-y-2 mb-8">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Message</label>
              <textarea required rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-blue transition-all" placeholder="Tell me more about your project..."></textarea>
            </div>

            <button disabled={loading} className="w-full bg-accent-blue py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              {loading ? "SENDING..." : (success ? "MESSAGE SENT! ✓" : "SEND MESSAGE")}
              {!loading && !success && <Send size={20} />}
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  );
};

export default Contact;