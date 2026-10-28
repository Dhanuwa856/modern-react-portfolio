import { useState } from 'react';
import { supabase } from '../supabaseClient';
import emailjs from '@emailjs/browser';
import { Github, Linkedin, Send, MessageCircle, Copy, Check, Mail } from 'lucide-react';
import TiltCard from './TiltCard';
import ScrollReveal3D from './ScrollReveal3D';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const emailAddress = 'infoname259@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error: supabaseError } = await supabase.from('messages').insert([formData]);
      if (supabaseError) throw supabaseError;

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            to_name: 'Dhanushka',
            message: formData.message,
          },
          publicKey
        );
      }

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal3D>
          <div className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-blue block mb-2">
              07 / Contact
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Start a{' '}
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                Conversation
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-2">
              Reach out for AI engineering collaborations, full-stack web projects, or freelance inquiries.
            </p>
          </div>
        </ScrollReveal3D>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal3D>
              <TiltCard className="bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-accent-blue uppercase tracking-wider mb-3">
                  <Mail size={15} /> Direct Email
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Drop me a line</h3>
                <div
                  onClick={copyEmail}
                  className="flex items-center justify-between bg-zinc-950 border border-zinc-800 p-4 rounded-2xl cursor-pointer hover:border-zinc-700 transition-all"
                >
                  <span className="text-zinc-200 text-sm font-medium truncate mr-4">
                    {emailAddress}
                  </span>
                  {copied ? (
                    <span className="text-xs font-bold text-accent-blue flex items-center gap-1 shrink-0">
                      <Check size={16} /> Copied
                    </span>
                  ) : (
                    <Copy size={17} className="text-zinc-400 shrink-0" />
                  )}
                </div>
              </TiltCard>
            </ScrollReveal3D>

            <ScrollReveal3D delay={0.08}>
              <TiltCard className="bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                  Social Channels
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    {
                      icon: <Github size={17} />,
                      label: 'GitHub',
                      link: 'https://github.com/Dhanuwa856',
                    },
                    {
                      icon: <Linkedin size={17} />,
                      label: 'LinkedIn',
                      link: 'https://www.linkedin.com/in/dhanushka-rathnayaka',
                    },
                    {
                      icon: <MessageCircle size={17} />,
                      label: 'Facebook',
                      link: 'https://www.facebook.com/profile.php?id=61577681014893',
                    },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-zinc-950 rounded-xl border border-zinc-800 hover:border-zinc-700 hover:text-white transition-all text-xs font-semibold text-zinc-300"
                    >
                      {social.icon}
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </TiltCard>
            </ScrollReveal3D>
          </div>

          <ScrollReveal3D className="lg:col-span-7" delay={0.1}>
            <TiltCard scaleOnHover={1} className="bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-2">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 focus:border-accent-blue outline-none transition text-sm text-white"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-2">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 focus:border-accent-blue outline-none transition text-sm text-white"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 focus:border-accent-blue outline-none transition text-sm text-white resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-white hover:bg-zinc-200 text-zinc-950 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-lg"
                >
                  {loading
                    ? 'Sending Message...'
                    : success
                    ? 'Message Sent Successfully ✓'
                    : 'Send Message'}
                  {!loading && !success && <Send size={16} />}
                </button>
              </form>
            </TiltCard>
          </ScrollReveal3D>
        </div>
      </div>
    </section>
  );
};

export default Contact;