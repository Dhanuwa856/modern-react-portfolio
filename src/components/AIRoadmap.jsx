import { motion } from 'framer-motion';
import { CheckCircle2, CircleDot, Sparkles, BrainCircuit, Code2, Database, Sigma, Terminal } from 'lucide-react';

const roadmapData = [
  {
    stage: "PHASE 0 & 1",
    title: "Foundations & Python Mastery",
    desc: "Mastering CS fundamentals, Git/GitHub, and Advanced Python including OOP and File Handling.",
    status: "Completed",
    icon: <CheckCircle2 className="text-green-500" />
  },
  {
    stage: "PHASE 2",
    title: "Data Handling & Visualization",
    desc: "Currently diving into NumPy, Pandas, and EDA to understand how to manipulate and clean real-world data.",
    status: "Completed",
    icon: <CheckCircle2 className="text-green-500" />
  },
  {
    stage: "PHASE 3 & 4",
    title: "Math & Machine Learning Core",
    desc: "Upcoming: Linear Algebra, Calculus, and implementing ML algorithms like Regression and Decision Trees using Scikit-learn.",
    status: "In Progress",
        icon: <CircleDot className="text-accent-blue animate-ping" />

  },
  {
    stage: "PHASE 5 & 6",
    title: "Deep Learning & LLM Stack",
    desc: "The future frontier: Neural Networks, Transformers, and building RAG systems with LangChain and HuggingFace.",
    status: "Upcoming",
    icon: <Sparkles className="text-accent-purple" />
  },
  {
    stage: "PHASE 7 & 8",
    title: "Computer Vision & MLOps",
    desc: "Learning Image processing with OpenCV and deploying AI models using Docker and AWS/GCP.",
    status: "Upcoming",
    icon: <Terminal className="text-slate-500" />
  },
  {
    stage: "PHASE 9 & 10",
    title: "Fullstack AI & Monetization",
    desc: "Integrating AI backends with React/Tailwind to build SaaS products and launch professional AI solutions.",
    status: "Upcoming",
    icon: <Code2 className="text-slate-500" />
  }
];

const AIRoadmap = () => {
  return (
    <section id="roadmap" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Consistent Style */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none text-white uppercase">
              STRATEGIC <br />
              <span className="bg-gradient-to-r from-accent-blue via-slate-100 to-accent-purple bg-clip-text text-transparent italic">
                ROADMAP
              </span>
            </h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
               <div className="h-[2px] w-16 bg-accent-blue rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
               <p className="text-slate-400 text-sm md:text-base font-medium max-w-md leading-relaxed">
                 A blueprint of my technical evolution, mapping the path from <span className="text-white">Absolute Zero</span> to <span className="text-accent-blue">AI Hero status</span>.
               </p>
            </div>
          </motion.div>
        </div>

        {/* Timeline Content */}
        <div className="max-w-6xl mx-auto relative border-l-2 border-white/5 ml-4 md:ml-8 space-y-12">
          {roadmapData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-10 group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[11px] top-0 w-5 h-5 bg-dark-bg border-2 border-white/10 rounded-full group-hover:border-accent-blue transition-colors flex items-center justify-center z-10">
                 <div className={`w-2 h-2 rounded-full ${item.status === 'In Progress' ? 'bg-accent-blue animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]' : item.status === 'Completed' ? 'bg-green-500' : 'bg-white/20'}`} />
              </div>

              {/* Card Structure */}
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2.5rem] hover:border-accent-blue/30 transition-all backdrop-blur-sm group-hover:bg-white/[0.07]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-white/5 rounded-xl">{item.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-blue">{item.stage}</span>
                  </div>
                  <span className={`text-[10px] px-3 py-1 rounded-full font-bold border ${
                    item.status === 'Completed' ? 'border-green-500/30 text-green-500 bg-green-500/5' : 
                    item.status === 'In Progress' ? 'border-accent-blue/30 text-accent-blue bg-accent-blue/5' : 
                    'border-white/10 text-slate-500 bg-white/5'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-accent-blue transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AIRoadmap;