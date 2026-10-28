import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Code2 } from 'lucide-react';
import TiltCard from './TiltCard';
import ScrollReveal3D from './ScrollReveal3D';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(6);

  const categories = ['All', 'AI', 'Web', 'Python'];

  useEffect(() => {
    fetchProjects();
  }, [filter, currentPage, projectsPerPage]);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 768) {
        setProjectsPerPage(3);
      } else {
        setProjectsPerPage(6);
      }
    };

    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
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
    <section id="projects" className="py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal3D>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent-blue block mb-2">
                02 / Selected Works
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Featured{' '}
                <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                  Engineering Projects
                </span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-2">
                Real-world AI applications, deep learning engines, and full-stack platforms.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setCurrentPage(1);
                  }}
                  className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    filter === cat
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal3D>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[380px]">
          <AnimatePresence mode="wait">
            {!loading ? (
              projects.map((project, idx) => (
                <ScrollReveal3D key={project.id} delay={idx * 0.05}>
                  <TiltCard className="h-full bg-zinc-900/80 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-video overflow-hidden bg-zinc-950 border-b border-zinc-800/80">
                        <img
                          src={
                            project.image_url ||
                            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000'
                          }
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-zinc-950/85 backdrop-blur-md border border-zinc-800 text-[11px] font-semibold text-accent-blue">
                          {project.category || 'Project'}
                        </span>
                      </div>

                      <div className="p-5 sm:p-6 pb-4">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-4">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {Array.isArray(project.tech_stack) ? (
                            project.tech_stack.map((tech) => (
                              <span
                                key={tech}
                                className="text-[11px] font-medium px-2.5 py-1 bg-zinc-950 text-zinc-300 rounded-lg border border-zinc-800"
                              >
                                {tech}
                              </span>
                            ))
                          ) : (
                            <span className="text-[11px] font-medium px-2.5 py-1 bg-zinc-950 text-zinc-300 rounded-lg border border-zinc-800">
                              {project.tech_stack || 'Python & React'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="px-5 sm:px-6 py-4 bg-zinc-950/50 border-t border-zinc-800/80 flex items-center gap-3">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-xs font-semibold text-white flex items-center justify-center gap-2 transition"
                        >
                          <Github size={15} /> Source
                        </a>
                      )}
                      {project.live_url ? (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-xs font-bold text-zinc-950 flex items-center justify-center gap-2 transition"
                        >
                          <ExternalLink size={15} /> Live Demo
                        </a>
                      ) : (
                        !project.github_url && (
                          <span className="text-xs text-zinc-500 flex items-center gap-1.5">
                            <Code2 size={14} /> Portfolio Build
                          </span>
                        )
                      )}
                    </div>
                  </TiltCard>
                </ScrollReveal3D>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center py-20">
                <div className="animate-pulse text-zinc-400 font-medium text-sm">
                  Loading projects...
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 disabled:opacity-30 hover:bg-zinc-800 transition cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-9 h-9 rounded-xl font-bold text-xs transition cursor-pointer ${
                    currentPage === i + 1
                      ? 'bg-white text-zinc-950'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 disabled:opacity-30 hover:bg-zinc-800 transition cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;