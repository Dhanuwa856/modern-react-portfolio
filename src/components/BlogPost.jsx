import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase.from('blogs').select('*').eq('slug', slug).single();
      setPost(data);
    };
    fetchPost();
  }, [slug]);

  if (!post) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Loading...</div>;

  return (
    <article className="py-32 px-6 bg-[#050505] min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-none uppercase tracking-tighter">{post.title}</h1>
        <div className="flex items-center gap-4 text-slate-500 mb-12 pb-12 border-b border-white/10">
           <span>{new Date(post.created_at).toLocaleDateString()}</span>
           <span>•</span>
           <span className="text-accent-purple uppercase font-bold text-xs">{post.category}</span>
        </div>
        {/* Content Section */}
        <div className="prose prose-invert prose-purple max-w-none text-slate-300 text-lg leading-relaxed" 
             dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
};

export default BlogPost;