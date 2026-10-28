import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Github, Linkedin, ArrowUpRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const links = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Works', href: '#projects' },
    { name: 'Python Lab', href: '#interactive-lab' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Credentials', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection('Home');
        return;
      }

      const sections = links
        .filter((link) => link.href.startsWith('#') && link.href !== '#')
        .map((link) => link.href.substring(1));

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 220 && rect.bottom >= 220) {
            const activeLink = links.find((l) => l.href === `#${section}`);
            if (activeLink) {
              setActiveSection(activeLink.name);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Editorial Warm Coral-Indigo Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-accent-blue via-amber-400 to-accent-purple origin-left z-[120]"
      />

      <nav className="fixed top-4 sm:top-5 left-0 w-full z-[100] px-3 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800/90 rounded-2xl px-4 sm:px-6 py-3 flex justify-between items-center shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
            {/* Editorial Brand Name */}
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-base sm:text-lg font-black tracking-tight cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-accent-blue inline-block" />
              <span className="text-white">Dhanushka</span>
              <span className="text-zinc-500 font-medium text-xs hidden sm:inline">
                / Portfolio
              </span>
            </div>

            {/* Desktop Pill Navigation */}
            <div className="hidden lg:flex items-center gap-1 bg-zinc-950/70 p-1 rounded-xl border border-zinc-800/80">
              {links.map((link) => {
                const isActive = activeSection === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-zinc-800 text-white shadow-xs'
                        : 'text-zinc-400 hover:text-zinc-100'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Right CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://github.com/Dhanuwa856"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://wa.me/94760093002?text=Hi%20Dhanushka,%20I'm%20interested%20in%20discussing%20a%20project!"
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-zinc-200 text-zinc-950 px-4 py-2 rounded-xl text-xs font-bold tracking-tight flex items-center gap-1 transition-all"
              >
                Let&apos;s Talk <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-xl bg-zinc-800/70 text-zinc-200 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Responsive Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="mt-2.5 max-w-6xl mx-auto lg:hidden bg-zinc-900/95 backdrop-blur-2xl border border-zinc-800 p-5 rounded-2xl shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-2">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      activeSection === link.name
                        ? 'bg-accent-blue text-white'
                        : 'bg-zinc-800/50 text-zinc-200 hover:bg-zinc-800'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="h-px bg-zinc-800 my-4" />

              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <a
                    href="https://github.com/Dhanuwa856"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-800 text-zinc-200"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dhanushka-rathnayaka"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-800 text-zinc-200"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
                <a
                  href="https://wa.me/94760093002?text=Hi%20Dhanushka,%20I'm%20interested%20in%20discussing%20a%20project!"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 bg-white text-zinc-950 px-4 py-2.5 rounded-xl text-xs font-bold"
                >
                  Let&apos;s Talk <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;