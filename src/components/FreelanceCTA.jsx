import { motion } from 'framer-motion';
import { Rocket, ArrowUpRight } from 'lucide-react';
import { SiUpwork, SiFiverr } from 'react-icons/si';

const FreelanceCTA = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/[0.02] border border-white/10 rounded-[3rem] p-8 md:p-16 overflow-hidden group"
        >
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-blue/10 rounded-full blur-[100px] -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-purple/10 rounded-full blur-[100px] -ml-40 -mb-40" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Open for Collaborations</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-tight text-white uppercase">
                HIRE ME ON <br />
                <span className="bg-gradient-to-r from-accent-blue via-slate-100 to-accent-purple bg-clip-text text-transparent italic">
                  PLATFORMS
                </span>
              </h2>
              <p className="text-slate-400 text-lg max-w-md font-medium">
                Prefer working through a platform? You can find me on these trusted global marketplaces.
              </p>
            </div>

            {/* Platform Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:max-w-xl">
              
              {/* Upwork Card */}
              <motion.a 
                href="UPWORK_PROFILE_LINK" 
                target="_blank"
                whileHover={{ y: -5 }}
                className="bg-[#14a800]/5 border border-[#14a800]/20 p-8 rounded-[2.5rem] flex flex-col justify-between group/card hover:bg-[#14a800]/10 transition-all"
              >
                <div className="flex justify-between items-start mb-10">
                  <SiUpwork size={40} className="text-[#14a800]" />
                  <ArrowUpRight className="text-slate-600 group-hover/card:text-[#14a800] transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Upwork</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Top Rated Talent</p>
                </div>
              </motion.a>

              {/* Fiverr Card */}
              <motion.a 
                href="FIVERR_PROFILE_LINK" 
                target="_blank"
                whileHover={{ y: -5 }}
                className="bg-[#1dbf73]/5 border border-[#1dbf73]/20 p-8 rounded-[2.5rem] flex flex-col justify-between group/card hover:bg-[#1dbf73]/10 transition-all"
              >
                <div className="flex justify-between items-start mb-10">
                  <SiFiverr size={50} className="text-[#1dbf73]" />
                  <ArrowUpRight className="text-slate-600 group-hover/card:text-[#1dbf73] transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Fiverr</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Level 1 Seller</p>
                </div>
              </motion.a>

            </div>
          </div>

          {/* Bottom Callout */}
          <div className="mt-16 pt-8 border-t border-white/5 text-center">
             <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.4em]">
               Or simply drop an email to <span className="text-slate-400">infoname259@gmail.com</span>
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreelanceCTA;