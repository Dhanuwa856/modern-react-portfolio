import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Mobile Menu එක Reveal වන ආකාරය (Animations)
  const menuVariants = {
    closed: { opacity: 0, scale: 0.95, y: -20 },
    opened: { 
      opacity: 1, scale: 1, y: 0,
      transition: { 
        type: "spring", stiffness: 300, damping: 30,
        staggerChildren: 0.1, delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, scale: 0.95, y: -20,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    opened: { opacity: 1, x: 0 }
  };

  const links = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-6 left-0 w-full z-[100] px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-dark-bg/40 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          
          {/* Brand Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-lg font-black tracking-widest cursor-pointer"
          >
            <span className="bg-gradient-to-r from-accent-blue via-white to-accent-purple bg-clip-text text-transparent">
              DHANUSHKA
            </span>
          </motion.div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all">
                {link.name}
              </a>
            ))}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent-blue/10 text-accent-blue border border-accent-blue/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
            >
              Let's Talk
            </motion.button>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Modern Elastic Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={menuVariants}
            initial="closed"
            animate="opened"
            exit="exit"
            className="absolute top-20 left-6 right-6 md:hidden bg-dark-bg/95 backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-3xl"
          >
            <div className="flex flex-col gap-6">
              {links.map((link) => (
                <motion.a 
                  variants={itemVariants}
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold tracking-tight text-slate-200 hover:text-accent-blue transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div variants={itemVariants} className="h-[1px] bg-white/5 my-4" />
              
              <motion.div variants={itemVariants} className="flex justify-between items-center">
                 <div className="flex gap-4">
                    <Github className="text-slate-500 hover:text-white" />
                    <Linkedin className="text-slate-500 hover:text-white" />
                 </div>
                 <MessageCircle className="text-accent-blue" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;