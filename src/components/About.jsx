import { motion } from 'framer-motion';
import { GraduationCap, BrainCircuit, Cpu } from 'lucide-react';
import { SiReact, SiPython, SiNodedotjs, SiTailwindcss, SiSupabase, SiJavascript } from 'react-icons/si';

const About = () => {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Consistent Styling */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none text-white">
              ABOUT <br />
              <span className="bg-gradient-to-r from-accent-purple via-slate-100 to-accent-blue bg-clip-text text-transparent italic">
                MYSELF
              </span>
            </h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
               <div className="h-[2px] w-16 bg-accent-purple rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
               <p className="text-slate-400 text-sm md:text-base font-medium max-w-md leading-relaxed">
                 An IT Undergraduate and an AI explorer, bridging the gap between <span className="text-white">Human Creativity</span> and <span className="text-accent-purple">Machine Intelligence</span>.
               </p>
            </div>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
          
          {/* 1. My Photo Box */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-4 md:row-span-2 bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden relative group"
          >
            {/* මෙතනට ඔයාගේ Photo එකේ Link එක දාන්න */}
            <img 
              src="https://gzafpxoufkzcndgtmhyh.supabase.co/storage/v1/object/public/portfolio-assets/Gemini_Generated_Image_4mnxkj4mnxkj4mnx.png" 
              alt="Dhanushka" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-8 left-8">
              <p className="text-white font-bold text-xl">Dhanushka</p>
              <p className="text-accent-blue text-xs font-mono uppercase tracking-widest">Developer & Designer</p>
            </div>
          </motion.div>

          {/* 2. ITUM Box */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-8 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between relative group"
          >
            <GraduationCap size={100} className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-accent-blue/10 transition-colors" />
            <div>
              <span className="text-accent-blue font-mono text-xs uppercase tracking-widest">Education</span>
              <h3 className="text-3xl font-bold mt-2">IT Undergraduate at ITUM</h3>
            </div>
            <p className="text-slate-400 max-w-lg z-10">
              Focusing on Software Engineering at <span className="text-white">University of Moratuwa (ITUM)</span>. Passionate about building robust architectures.
            </p>
          </motion.div>

          {/* 3. Skills with Icons */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-4 bg-white/5 border border-white/10 rounded-[2.5rem] p-8"
          >
            <h4 className="text-lg font-bold mb-6 italic text-slate-200">Tech Stack</h4>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center gap-2">
                <SiReact className="text-3xl text-[#61DAFB] hover:scale-110 transition-transform" />
                <span className="text-[10px] text-slate-500 font-bold uppercase">React</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SiPython className="text-3xl text-[#3776AB] hover:scale-110 transition-transform" />
                <span className="text-[10px] text-slate-500 font-bold uppercase">Python</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SiNodedotjs className="text-3xl text-[#339933] hover:scale-110 transition-transform" />
                <span className="text-[10px] text-slate-500 font-bold uppercase">Node</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SiTailwindcss className="text-3xl text-[#06B6D4] hover:scale-110 transition-transform" />
                <span className="text-[10px] text-slate-500 font-bold uppercase">CSS</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SiSupabase className="text-3xl text-[#3ECF8E] hover:scale-110 transition-transform" />
                <span className="text-[10px] text-slate-500 font-bold uppercase">DB</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SiJavascript className="text-3xl text-[#F7DF1E] hover:scale-110 transition-transform" />
                <span className="text-[10px] text-slate-500 font-bold uppercase">JS</span>
              </div>
            </div>
          </motion.div>

          {/* 4. AI Pathway */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-4 bg-accent-purple/10 border border-accent-purple/20 rounded-[2.5rem] p-8 flex flex-col justify-between"
          >
            <BrainCircuit size={40} className="text-accent-purple" />
            <div>
              <h3 className="text-xl font-bold mb-2 italic underline underline-offset-4 decoration-accent-purple">AI Exploration</h3>
              <p className="text-sm text-slate-400">
                Crafting intelligent solutions using <span className="text-white">Python</span>. Deep diving into LLMs and Automation.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;