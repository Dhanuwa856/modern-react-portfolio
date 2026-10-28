import { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Code2, Layers, MapPin, Github, Linkedin } from 'lucide-react';
import {
  SiReact,
  SiPython,
  SiNodedotjs,
  SiTailwindcss,
  SiSupabase,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiFastapi,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
} from 'react-icons/si';
import TiltCard from './TiltCard';
import ScrollReveal3D from './ScrollReveal3D';

const SKILL_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'web', label: 'Full-Stack' },
];

const SKILLS = [
  { name: 'Python', category: 'ai', Icon: SiPython, color: '#3776AB', desc: 'AI, ML & Backend' },
  { name: 'NumPy', category: 'ai', Icon: SiNumpy, color: '#4DABCF', desc: 'Neural Math' },
  { name: 'Pandas', category: 'ai', Icon: SiPandas, color: '#E70488', desc: 'Data Analysis' },
  { name: 'Scikit-Learn', category: 'ai', Icon: SiScikitlearn, color: '#F7931E', desc: 'ML & XGBoost' },
  { name: 'React.js', category: 'web', Icon: SiReact, color: '#61DAFB', desc: 'Frontend UI' },
  { name: 'Next.js', category: 'web', Icon: SiNextdotjs, color: '#FFFFFF', desc: 'Full-Stack React' },
  { name: 'Node.js', category: 'web', Icon: SiNodedotjs, color: '#339933', desc: 'REST APIs' },
  { name: 'FastAPI', category: 'web', Icon: SiFastapi, color: '#009688', desc: 'Python AI APIs' },
  { name: 'MongoDB', category: 'web', Icon: SiMongodb, color: '#47A248', desc: 'NoSQL Database' },
  { name: 'Supabase', category: 'web', Icon: SiSupabase, color: '#3ECF8E', desc: 'PostgreSQL & Auth' },
  { name: 'Tailwind CSS', category: 'web', Icon: SiTailwindcss, color: '#06B6D4', desc: 'UI Styling' },
  { name: 'JavaScript', category: 'web', Icon: SiJavascript, color: '#F7DF1E', desc: 'ES6+ Web' },
];

const About = () => {
  const [activeSkillTab, setActiveSkillTab] = useState('all');

  const filteredSkills =
    activeSkillTab === 'all'
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeSkillTab);

  return (
    <section id="about" className="py-20 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal3D>
          <div className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-blue block mb-2">
              01 / Profile &amp; Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Bridging Machine Learning &amp;{' '}
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                Full-Stack Engineering
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              From training predictive models in Python to deploying full-stack web applications with React, Next.js, and FastAPI.
            </p>
          </div>
        </ScrollReveal3D>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Profile Card */}
          <ScrollReveal3D className="lg:col-span-4">
            <TiltCard className="h-full bg-zinc-900/80 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col justify-between">
              <div className="relative h-72 sm:h-88 overflow-hidden bg-zinc-950">
                <img
                  src="https://gzafpxoufkzcndgtmhyh.supabase.co/storage/v1/object/public/portfolio-assets/Gemini_Generated_Image_4mnxkj4mnxkj4mnx.png"
                  alt="Dhanushka Rathnayaka"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs text-accent-blue font-medium mb-1">
                  <MapPin size={14} /> Sri Lanka
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Dhanushka Rathnayaka
                </h3>
                <p className="text-zinc-400 text-xs mt-1">
                  IT Undergraduate at ITUM • AI &amp; Full-Stack Developer
                </p>

                <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-zinc-800">
                  <a
                    href="https://github.com/Dhanuwa856"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 rounded-xl bg-zinc-800/80 hover:bg-white hover:text-zinc-950 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <Github size={15} /> GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dhanushka-rathnayaka"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 rounded-xl bg-zinc-800/80 hover:bg-white hover:text-zinc-950 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <Linkedin size={15} /> LinkedIn
                  </a>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal3D>

          {/* Right Column: Specialties + Interactive Tech Matrix */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <ScrollReveal3D>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TiltCard className="bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6">
                  <div className="w-10 h-10 rounded-2xl bg-accent-blue/15 border border-accent-blue/30 flex items-center justify-center text-accent-blue mb-4">
                    <BrainCircuit size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    AI &amp; Machine Learning
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Developing machine learning models, custom neural networks, and computer vision applications using Python, NumPy, Pandas, Scikit-Learn, and XGBoost.
                  </p>
                </TiltCard>

                <TiltCard className="bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6">
                  <div className="w-10 h-10 rounded-2xl bg-accent-purple/15 border border-accent-purple/30 flex items-center justify-center text-accent-purple mb-4">
                    <Code2 size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Full-Stack Development
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Pursuing IT at <span className="text-zinc-100 font-semibold">ITUM (University of Moratuwa)</span> while building modern web platforms with React, Next.js, Node.js, FastAPI, MongoDB, and Supabase.
                  </p>
                </TiltCard>
              </div>
            </ScrollReveal3D>

            <ScrollReveal3D className="flex-1">
              <TiltCard className="h-full bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-5 sm:p-6 flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <Layers size={18} className="text-accent-blue" /> Technical Stack
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Filter technologies by specialization
                    </p>
                  </div>

                  <div className="flex gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 self-start">
                    {SKILL_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveSkillTab(cat.id)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          activeSkillTab === cat.id
                            ? 'bg-zinc-800 text-white'
                            : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
                  {filteredSkills.map(({ name, Icon, color, desc }) => (
                    <motion.div
                      layout
                      key={name}
                      whileHover={{ y: -3 }}
                      className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 transition flex items-center gap-2.5"
                    >
                      <Icon className="text-xl sm:text-2xl shrink-0" style={{ color }} />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-zinc-100 truncate">{name}</p>
                        <p className="text-[10px] text-zinc-500 truncate">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TiltCard>
            </ScrollReveal3D>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;