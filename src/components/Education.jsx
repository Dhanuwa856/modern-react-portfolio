import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { GraduationCap, Book } from 'lucide-react';

const Education = () => {
  const [eduData, setEduData] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('order_rank', { ascending: true });

      if (!error && data) setEduData(data);
    };
    fetchEducation();
  }, []);

  return (
    <section id="education" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* --- ඔයා ඉල්ලපු ලස්සන Title Design එක --- */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none text-white uppercase">
              ACADEMIC <br />
              <span className="bg-gradient-to-r from-accent-purple via-slate-100 to-accent-blue bg-clip-text text-transparent italic">
                JOURNEY
              </span>
            </h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
               <div className="h-[2px] w-16 bg-accent-purple rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
               <p className="text-slate-400 text-sm md:text-base font-medium max-w-md leading-relaxed">
                 Combining structured <span className="text-white">University Education</span> with a passion for <span className="text-accent-purple">Self-Taught AI</span>.
               </p>
            </div>
          </motion.div>
        </div>

        {/* --- Education Cards --- */}
        <div className="grid grid-cols-1 gap-8">
          {eduData.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:border-accent-purple/30 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {edu.is_self_taught ? <Book className="text-accent-purple" size={20}/> : <GraduationCap className="text-accent-blue" size={24}/>}
                    <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                  </div>
                  <p className="text-accent-purple font-semibold text-sm mb-4">{edu.institution}</p>
                  <p className="text-slate-400 text-sm max-w-2xl mb-6">{edu.description}</p>
                </div>
                <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  {edu.duration}
                </span>
              </div>

              {/* Subjects Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {edu.subjects && edu.subjects.map((sub, i) => (
                  <span key={i} className="px-3 py-1 bg-accent-purple/10 border border-accent-purple/20 rounded-lg text-[11px] text-accent-purple font-medium">
                    {sub}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;