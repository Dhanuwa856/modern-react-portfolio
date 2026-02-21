import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ShieldCheck, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

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
            if (!error) setCerts(data);
            setLoading(false);
        };
        fetchCerts();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setCurrentPage(0);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(certs.length / itemsPerPage);
    const displayedCerts = certs.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    return (
        <section id="certificates" className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16 text-left"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                        <ShieldCheck className="w-3 h-3 text-accent-purple" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Verified Credentials</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                        PROFESSIONAL <span className="italic bg-linear-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
                                                     <br />
                                RECOGNITION</span>
                    </h2>
                </motion.div>

                {loading ? (
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest animate-pulse">Syncing...</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayedCerts.map((cert) => (
                                <motion.div
                                    key={cert.id}
                                    layoutId={cert.id}
                                    onClick={() => setSelectedCert(cert)}
                                    className="group cursor-pointer relative bg-white/5 border border-white/10 rounded-4xl overflow-hidden transition-all duration-500 hover:border-accent-purple/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                                >
                                    {/* Image Section */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img 
                                            src={cert.image_url} 
                                            alt={cert.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                            <div className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-bold text-xs uppercase">
                                                <ZoomIn size={14} /> View Certificate
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent-purple transition-colors">{cert.title}</h3>
                                        <p className="text-slate-500 text-xs font-medium mb-4">{cert.issuer}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-4 mt-12">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 0}
                                    className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-accent-purple/20 hover:border-accent-purple disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                
                                <div className="flex gap-2">
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i)}
                                            className={`w-2 h-2 rounded-full transition-all ${
                                                currentPage === i ? 'bg-accent-purple w-8' : 'bg-white/20'
                                            }`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages - 1}
                                    className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-accent-purple/20 hover:border-accent-purple disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* --- Full View Modal --- */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-10 backdrop-blur-xl"
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full bg-blue-950/20 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-6 right-6 z-50 p-3 bg-black/50 hover:bg-red-500/20 text-white rounded-full transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col md:flex-row">
                                {/* Full Image Display */}
                                <div className="md:w-2/3 bg-black/20 p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
                                    <img 
                                        src={selectedCert.image_url} 
                                        alt={selectedCert.title} 
                                        className="max-w-full max-h-[70vh] object-contain rounded-xl"
                                    />
                                </div>

                                {/* Info Side */}
                                <div className="md:w-1/3 p-8 flex flex-col justify-center">
                                    <div className="mb-6">
                                        <span className="text-[10px] font-black text-accent-purple uppercase tracking-widest">{selectedCert.category}</span>
                                        <h3 className="text-3xl font-black text-white mt-2 leading-tight">{selectedCert.title}</h3>
                                        <p className="text-slate-400 mt-2">Issued by <span className="text-white">{selectedCert.issuer}</span></p>
                                    </div>
                                    
                                    <p className="text-slate-500 text-sm mb-8">
                                        Verified achievement in {selectedCert.category}. This credential demonstrates advanced proficiency and practical knowledge in the field.
                                    </p>

                                    <div className="flex flex-col gap-3">
                                        {selectedCert.credential_url && (
                                            <a 
                                                href={selectedCert.credential_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent-purple hover:text-white transition-all shadow-xl shadow-white/5"
                                            >
                                                Official Verification <ExternalLink size={14} />
                                            </a>
                                        )}
                                    </div>
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