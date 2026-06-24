import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      setBlogs(data || []);
    };
    fetchBlogs();
  }, []);

  return (
    <section className="py-32 px-6 bg-[#050505] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-6xl font-black text-white mb-16 uppercase tracking-tighter">
          TECH <span className="italic bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">INSIGHTS</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((post) => (
            <motion.div key={post.id} whileHover={{ y: -5 }} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl">
              <span className="text-[10px] font-black text-accent-purple uppercase tracking-widest">{post.category}</span>
              <h3 className="text-2xl font-bold text-white mt-4 mb-4">{post.title}</h3>
              <p className="text-slate-400 text-sm mb-6 line-clamp-2">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-white font-bold hover:text-accent-purple transition-colors">
                Read Article <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;