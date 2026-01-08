import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(6);

  const categories = ['All', 'Web', 'AI', 'Python'];

  useEffect(() => {
    fetchProjects();
  }, [filter, currentPage, projectsPerPage]); // filter හෝ page එක වෙනස් වන විට දත්ත නැවත ලබා ගනී

  useEffect(() => {
  // Screen size එක බලලා පෙන්වන ප්‍රමාණය තීරණය කිරීම
  const updateCount = () => {
    if (window.innerWidth < 768) {
      setProjectsPerPage(3); // Mobile වලට 3ක් ඇති
    } else {
      setProjectsPerPage(6); // Desktop වලට 6ක්
    }
  };

  updateCount();
  window.addEventListener('resize', updateCount);
  return () => window.removeEventListener('resize', updateCount);
}, []);

 const fetchProjects = async () => {
  try {
    setLoading(true);
    // Dynamic projectsPerPage පාවිච්චි කිරීම
    const from = (currentPage - 1) * projectsPerPage;
    const to = from + projectsPerPage - 1;

    let query = supabase
      .from('projects')
      .select('*', { count: 'exact' })
      .order('id', { ascending: false })
      .range(from, to);

    if (filter !== 'All') {
      query = query.eq('category', filter);
    }

    const { data, error, count } = await query;
    if (error) throw error;
    setProjects(data || []);
    setTotalCount(count || 0);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    setLoading(false);
  }
};
  const totalPages = Math.ceil(totalCount / projectsPerPage);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">WORKS</h2>
            <p className="text-slate-500">Filters and Pagination integrated with Supabase.</p>
          </div>

          {/* Filter Bar */}
          <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                
                onClick={() => { setFilter(cat); setCurrentPage(1); }}
                
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${filter === cat ? 'bg-accent-blue text-white shadow-lg' : 'hover:bg-white/5 text-slate-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid with AnimatePresence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {!loading ? (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:border-accent-blue/50 transition-all group"
                >
                  {/* ... කලින් තිබූ Project Card එකේ ඇතුළත කෝඩ් එක මෙතනට දාන්න ... */}
                  {/* Project Image Section */}
<div className="relative aspect-video overflow-hidden">
  <img 
    src={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000'} 
    alt={project.title}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  />
  
  {/* Hover Overlay with Links */}
  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
    <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
      <a 
        href={project.github_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-accent-blue hover:text-white transition-all border border-white/10"
        title="View Code"
      >
        <Github size={20}/>
      </a>
      {project.live_url && (
        <a 
          href={project.live_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-accent-blue hover:text-white transition-all border border-white/10"
          title="Live Demo"
        >
          <ExternalLink size={20}/>
        </a>
      )}
    </div>
  </div>
</div>

{/* Project Details Section */}
<div className="p-6">
  {/* Tech Stack Badges (Safe Mapping) */}
  <div className="flex flex-wrap gap-2 mb-4">
    {Array.isArray(project.tech_stack) ? (
      project.tech_stack.map((tech) => (
        <span key={tech} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-full border border-accent-blue/20">
          {tech}
        </span>
      ))
    ) : (
      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-full border border-accent-blue/20">
        {project.tech_stack || 'Code'}
      </span>
    )}
  </div>

  <h3 className="text-xl font-bold mb-2 group-hover:text-accent-blue transition-colors duration-300">
    {project.title}
  </h3>
  
  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 group-hover:text-slate-300 transition-colors">
    {project.description}
  </p>

  {/* Category Tag (Optional - For visual clarity) */}
  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
      Category: {project.category}
    </span>
    <div className="h-1 w-1 rounded-full bg-accent-blue shadow-[0_0_5px_rgba(59,130,246,1)]" />
  </div>
</div>
                  
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center">
                 <div className="animate-pulse text-accent-blue font-mono uppercase tracking-widest">Loading Projects...</div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-4">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-3 rounded-full bg-white/5 border border-white/10 disabled:opacity-20 hover:bg-accent-blue/20 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${currentPage === i + 1 ? 'bg-accent-blue text-white' : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-3 rounded-full bg-white/5 border border-white/10 disabled:opacity-20 hover:bg-accent-blue/20 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;