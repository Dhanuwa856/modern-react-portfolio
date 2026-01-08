import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  // Animation Variants (කෝඩ් එක පිරිසිදුව තබා ගැනීමට)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
<section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32 pb-32 md:pb-20">      
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Glowing Orbs (Aurora Effect) */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-accent-blue/30 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div 
           animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-accent-purple/20 rounded-full blur-[120px] mix-blend-screen"
        />
      </div>

      {/* --- Main Content --- */}
      <motion.div 
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="relative z-10 text-center max-w-4xl mx-auto flex flex-col justify-center h-full"
  >
        {/* Status Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-mono text-slate-300 tracking-wider uppercase">Available for Work</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1] md:leading-[0.9]"
        >
          Building The <br />
          <span className="bg-gradient-to-r from-accent-blue via-slate-200 to-accent-purple bg-clip-text text-transparent">
            Digital Future.
          </span>
        </motion.h1>

        {/* Sub Headline */}
     <motion.p 
  variants={itemVariants}
  className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
>
  I'm Dhanushka, an IT Undergraduate at <span className="text-slate-200 font-semibold">ITUM</span> & Full-Stack Developer. 
  Passionate about <span className="text-accent-blue font-medium text-nowrap">Artificial Intelligence</span>, I'm currently self-learning AI through <span className="text-slate-200 font-medium">Python</span> to build the next generation of intelligent digital solutions.
</motion.p>

        {/* Buttons (CTA) */}
<motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-0">          {/* Primary Button */}
          <a href="#projects" className="group relative px-8 py-3 w-full sm:w-auto rounded-full bg-slate-200 text-dark-bg font-bold flex items-center justify-center gap-2 overflow-hidden transition-all hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
               View Projects <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 z-0" />
          </a>

          {/* Secondary Button */}
          <button className="group px-8 py-3 w-full sm:w-auto rounded-full border border-white/10 bg-white/5 backdrop-blur-lg font-bold text-slate-300 flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-all hover:scale-105 active:scale-95">
            Download CV <Download size={20} className="group-hover:translate-y-1 transition-transform"/>
          </button>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
     <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.5, duration: 1 }}
    className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-500 text-sm font-mono animate-bounce"
  >
        <p>Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default Hero;