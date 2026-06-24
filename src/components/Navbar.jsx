import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null); // 🔥 මුලින්ම null (කිසිම link එකක් active නෑ)

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
    { name: 'Certificates', href: '#certificates' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  // 🔥 ScrollSpy Logic – මෙතනදි තමයි ප්‍රධාන වෙනස
  useEffect(() => {
    const handleScroll = () => {
      // 1. Home section එක (top එක) හඳුනාගැනීම
      if (window.scrollY < 100) {
        setActiveSection('Home');
        return;
      }

      // 2. අනිත් sections check කරනවා
      const sections = links
        .filter(link => link.href.startsWith('#') && link.href !== '#')
        .map(link => link.href.substring(1));

      let found = false; // කොහෙවත් section එකක් match උනාද කියලා track කරන්න

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // section එක screen එකේ මැදට එනකොට active කරන්න
          if (rect.top <= 150 && rect.bottom >= 150) {
            const activeLink = links.find(l => l.href === `#${section}`);
            if (activeLink) {
              setActiveSection(activeLink.name);
              found = true;
              break; // එක section එකක් පමණයි active වෙන්න ඕන
            }
          }
        }
      }

      // 3. කිසිම section එකක් match නොවුනොත් activeStatus null කරන්න
      if (!found) {
        setActiveSection(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  return (
    <nav className="fixed top-6 left-0 w-full z-[100] px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-dark-bg/40 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          
          {/* Brand Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-lg font-black tracking-widest cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="bg-gradient-to-r from-accent-blue via-white to-accent-purple bg-clip-text text-transparent">
              DHANUSHKA
            </span>
          </motion.div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative
                  ${activeSection === link.name 
                    ? 'text-accent-blue drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] scale-110'
                    : 'text-slate-400 hover:text-white hover:scale-105'
                  }`}
              >
                {link.name}
                {activeSection === link.name && (
                  <motion.div 
                    layoutId="activeNavDot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-blue rounded-full shadow-[0_0_5px_rgba(59,130,246,1)]"
                  />
                )}
              </a>
            ))}
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent-blue/10 text-accent-blue border border-accent-blue/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ml-2"
              href="https://wa.me/94760093002?text=Hi%20Dhanushka,%20I'm%20interested%20in%20discussing%20a%20project!"
              target="_blank" 
              rel="noreferrer"
            >
              Let's Talk
            </motion.a>
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
            className="absolute top-20 left-6 right-6 md:hidden bg-[#050505]/95 backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {links.map((link) => (
                <motion.a 
                  variants={itemVariants}
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={`text-3xl font-bold tracking-tight transition-colors flex items-center gap-4
                    ${activeSection === link.name 
                      ? 'text-accent-blue drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                      : 'text-slate-200 hover:text-white'
                    }`}
                >
                  {activeSection === link.name && (
                    <motion.div layoutId="activeMobileNav" className="w-2 h-2 rounded-full bg-accent-blue" />
                  )}
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div variants={itemVariants} className="h-[1px] bg-white/5 my-4" />
              
              <motion.div variants={itemVariants} className="flex justify-between items-center">
                 <div className="flex gap-4">
                    <a href="https://github.com/Dhanuwa856" target="_blank" rel="noreferrer"><Github className="text-slate-500 hover:text-white" /></a>
                    <a href="https://linkedin.com/in/dhanushkarathnayaka" target="_blank" rel="noreferrer"><Linkedin className="text-slate-500 hover:text-white" /></a>
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