import { Github, Linkedin, Facebook, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-zinc-800/80 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-black tracking-tight text-white flex items-center justify-center md:justify-start gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent-blue inline-block" />
              Dhanushka Rathnayaka
            </h2>
            <p className="text-zinc-500 text-xs mt-1.5">
              AI Engineer &amp; Full-Stack Developer • ITUM Sri Lanka
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-5 sm:gap-7 text-xs font-semibold text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Works</a>
            <a href="#interactive-lab" className="hover:text-white transition-colors">Python Lab</a>
            <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
            <a href="#education" className="hover:text-white transition-colors">Education</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="flex gap-3">
            {[
              { icon: <Github size={18} />, link: 'https://github.com/Dhanuwa856' },
              { icon: <Linkedin size={18} />, link: 'https://www.linkedin.com/in/dhanushka-rathnayaka' },
              { icon: <Facebook size={18} />, link: 'https://www.facebook.com/profile.php?id=61577681014893' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-zinc-500 text-xs">
            © {new Date().getFullYear()} Dhanushka Rathnayaka. All rights reserved.
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
            <span>Crafted with</span>
            <Heart size={13} className="text-accent-blue fill-accent-blue" />
            <span>in Sri Lanka</span>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            Back to top
            <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl group-hover:bg-white group-hover:text-zinc-950 transition-all">
              <ArrowUp size={13} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;