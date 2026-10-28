import { ArrowUpRight } from 'lucide-react';
import { SiUpwork, SiFiverr } from 'react-icons/si';
import TiltCard from './TiltCard';
import ScrollReveal3D from './ScrollReveal3D';

const FreelanceCTA = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal3D>
          <div className="glass-panel relative rounded-[1.75rem] p-5 sm:p-12 md:p-14 overflow-hidden backdrop-blur-xl">
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 sm:gap-12">
              <div className="text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-full mb-5">
                  <span className="w-2 h-2 bg-accent-blue rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-zinc-300">
                    Available on Global Marketplaces
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
                  Hire Me on{' '}
                  <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                    Freelance Platforms
                  </span>
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base max-w-md">
                  Prefer working through a verified marketplace? Connect with me directly on Upwork or Fiverr.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:max-w-lg">
                <TiltCard className="rounded-2xl bg-zinc-950">
                  <a
                    href="https://www.upwork.com/freelancers/~01386d08f6baa0d69c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 rounded-2xl flex flex-col justify-between h-full group/card hover:bg-zinc-900 transition-all block"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <SiUpwork size={36} className="text-[#14a800]" />
                      <ArrowUpRight className="text-zinc-500 group-hover/card:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-0.5">Upwork</h3>
                      <p className="text-xs text-zinc-400 font-medium">
                        AI &amp; Full-Stack Freelancer
                      </p>
                    </div>
                  </a>
                </TiltCard>

                <TiltCard className="rounded-2xl bg-zinc-950">
                  <a
                    href="#contact"
                    className="p-6 rounded-2xl flex flex-col justify-between h-full group/card hover:bg-zinc-900 transition-all block"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <SiFiverr size={44} className="text-[#1dbf73]" />
                      <ArrowUpRight className="text-zinc-500 group-hover/card:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-0.5">Direct Inquiry</h3>
                      <p className="text-xs text-zinc-400 font-medium">
                        Custom Web &amp; ML Projects
                      </p>
                    </div>
                  </a>
                </TiltCard>
              </div>
            </div>
          </div>
        </ScrollReveal3D>
      </div>
    </section>
  );
};

export default FreelanceCTA;