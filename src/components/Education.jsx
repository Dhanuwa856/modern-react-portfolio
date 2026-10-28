import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { GraduationCap, Book } from 'lucide-react';
import TiltCard from './TiltCard';
import ScrollReveal3D from './ScrollReveal3D';

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
    <section id="education" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal3D>
          <div className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-blue block mb-2">
              05 / Education
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Academic{' '}
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                Foundation
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-2">
              Combining university software engineering at ITUM with dedicated AI &amp; Machine Learning research.
            </p>
          </div>
        </ScrollReveal3D>

        <div className="grid grid-cols-1 gap-6">
          {eduData.map((edu, index) => (
            <ScrollReveal3D key={edu.id} delay={index * 0.08}>
              <TiltCard className="glass-panel rounded-[1.75rem] p-5 sm:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      {edu.is_self_taught ? (
                        <Book className="text-accent-purple shrink-0" size={22} />
                      ) : (
                        <GraduationCap className="text-accent-blue shrink-0" size={24} />
                      )}
                      <h3 className="text-lg sm:text-2xl font-bold text-white">{edu.degree}</h3>
                    </div>
                    <p className="text-accent-blue font-semibold text-sm mb-3">{edu.institution}</p>
                    <p className="text-zinc-400 text-sm max-w-3xl mb-5 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                  <span className="px-3.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-full text-xs font-semibold text-zinc-300 shrink-0 self-start">
                    {edu.duration}
                  </span>
                </div>

                {edu.subjects && edu.subjects.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800/80">
                    {edu.subjects.map((sub, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-300 font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                )}
              </TiltCard>
            </ScrollReveal3D>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;