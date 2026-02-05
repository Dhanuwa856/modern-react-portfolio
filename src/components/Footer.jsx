import { motion } from 'framer-motion';
import { Github, Linkedin, Facebook, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-dark-bg relative overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black tracking-tighter">
              DHANUSHKA<span className="text-accent-blue">.</span>
            </h2>
            <p className="text-slate-500 text-xs font-mono mt-2 tracking-widest uppercase">
              Building the future with AI & Code
            </p>
          </div>

          {/* Quick Navigation */}
          <nav className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#education" className="hover:text-white transition-colors">Education</a>
            <a href="#projects" className="hover:text-white transition-colors">Works</a>
            <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-5">
            {[
              { icon: <Github size={20} />, link: "https://github.com/Dhanuwa856" },
              { icon: <Linkedin size={20} />, link: "https://www.linkedin.com/in/dhanushka-rathnayaka" },
              { icon: <Facebook size={20} />, link: "https://www.facebook.com/profile.php?id=61577681014893" }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.link} 
                target="_blank" 
                className="p-3 bg-white/5 border border-white/10 rounded-full hover:border-accent-blue hover:text-accent-blue transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright Info */}
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} All Rights Reserved
          </div>

          {/* Made With Credit */}
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <span>Developed with</span>
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
            <span>by Dhanushka Rathnayaka</span>
          </div>

          {/* Back to Top */}
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-all"
          >
            Back to top
            <div className="p-2 bg-white/5 rounded-full group-hover:bg-accent-blue group-hover:text-white transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;