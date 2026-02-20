import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, AlertTriangle, ChevronLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#050505] px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Error Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 mb-8">
            <AlertTriangle className="w-10 h-10 text-accent-purple" />
          </div>

          {/* 404 Text */}
          <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-white mb-4 opacity-20">
            404
          </h1>

          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
            PAGE <span className="italic bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">NOT FOUND</span>
          </h2>

          <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Oops! It seems you've wandered into an undocumented route in the 
            <span className="text-white"> Knowledge Battleground</span>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-all group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-accent-purple text-white font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
            >
              <Home size={20} />
              Return Home
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;