import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Award, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import TiltCard from './TiltCard';
import ScrollReveal3D from './ScrollReveal3D';

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth < 768 ? 3 : 6;

  useEffect(() => {
    const fetchCerts = async () => {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('issue_date', { ascending: false });
      if (!error && data) setCerts(data);
      setLoading(false);
    };
    fetchCerts();
  }, []);

  useEffect(() => {
    const handleResize = () => setCurrentPage(0);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(certs.length / itemsPerPage);
  const displayedCerts = certs.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section id="certificates" className="py-20 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal3D>
          <div className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-blue block mb-2">
              06 / Credentials
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Verified{' '}
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-2">
              Select any credential card to inspect the full certificate and verification link.
            </p>
          </div>
        </ScrollReveal3D>

        {loading ? (
          <div className="text-zinc-400 text-sm font-medium animate-pulse">
            Loading certificates...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCerts.map((cert, idx) => (
                <ScrollReveal3D key={cert.id} delay={idx * 0.05}>
                  <TiltCard
                    onClick={() => setSelectedCert(cert)}
                    className="cursor-pointer bg-zinc-900/80 backdrop-blur-xl rounded-3xl overflow-hidden h-full"
                  >
                    <div className="relative h-52 overflow-hidden bg-zinc-950 border-b border-zinc-800/80">
                      <img
                        src={cert.image_url}
                        alt={cert.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                        <div className="flex items-center gap-2 bg-white text-zinc-950 px-4 py-2 rounded-xl font-bold text-xs shadow-lg">
                          <ZoomIn size={15} /> Inspect Credential
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-xs text-accent-blue font-medium mb-1">
                        <Award size={14} /> {cert.issuer}
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-accent-blue transition-colors">
                        {cert.title}
                      </h3>
                    </div>
                  </TiltCard>
                </ScrollReveal3D>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentPage === i ? 'bg-accent-blue w-8' : 'bg-zinc-700 w-2'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => currentPage < totalPages - 1 && setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-10 backdrop-blur-xl bg-black/75"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-50 p-2.5 bg-zinc-950/80 hover:bg-zinc-800 text-white rounded-full transition cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3 bg-zinc-950 p-4 sm:p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-800">
                  <img
                    src={selectedCert.image_url}
                    alt={selectedCert.title}
                    className="max-w-full max-h-[55vh] sm:max-h-[65vh] object-contain rounded-xl"
                  />
                </div>

                <div className="md:w-1/3 p-6 sm:p-8 flex flex-col justify-center">
                  <span className="text-xs font-bold text-accent-blue uppercase tracking-wider">
                    {selectedCert.category || 'Credential'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 leading-snug">
                    {selectedCert.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mt-2">
                    Issued by <span className="text-white font-semibold">{selectedCert.issuer}</span>
                  </p>

                  <p className="text-zinc-400 text-sm my-6 leading-relaxed">
                    Verified certification demonstrating practical knowledge and proficiency in{' '}
                    {selectedCert.category || 'this domain'}.
                  </p>

                  {selectedCert.credential_url && (
                    <a
                      href={selectedCert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-white hover:bg-zinc-200 text-zinc-950 rounded-xl font-bold text-xs uppercase tracking-wider transition"
                    >
                      Verify Credential <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;