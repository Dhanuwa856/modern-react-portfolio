import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import AIRoadmap from './components/AIRoadmap';
import FreelanceCTA from './components/FreelanceCTA';
import Footer from './components/Footer';
import AIChatBot from './components/AIChatBot';
import Education from './components/Education';
import TechQuiz from './components/TechQuiz';
import NotFound from './components/NotFound'; // අපි කලින් හදපු 404 Page එක
import Certificates from './components/Certificates';

// --- ප්‍රධාන පෝර්ට්ෆෝලියෝ කොටස (Landing Page) ---
const MainPortfolio = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Hero /> 
    <About />
    <Education />
    <Certificates/>
    <Projects />
    <Contact />
    <AIRoadmap />
    <FreelanceCTA />
  </motion.div>
);

function App() {
  return (
    <Router>
      <div className="relative  min-h-screen selection:bg-accent-purple/30">
        <CustomCursor />
        
        {/* Navbar එක හැම page එකකම උඩින් පේනවා */}
        <Navbar />
        
        <main>
          <Routes>
            {/* මුල් පිටුව (Home) */}
            <Route path="/" element={<MainPortfolio />} />
            
            {/* Tech Quiz / Battleground පිටුව - /quiz ලෙස browser එකේ ගැසූ විට ලැබේ */}
            <Route path="/quiz" element={<TechQuiz />} />
            
            {/* වැරදි URL එකක් ආවොත් පෙන්වන 404 Page එක */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* පල්ලෙහා තියෙන පොදු components */}
        <AIChatBot />
        <Footer />

        {/* --- Background Glows (Style එක වෙනස් කර නැත) --- */}
        <div className="fixed top-0 left-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-accent-blue/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-accent-purple/10 blur-[120px]" />
        </div>
      </div>
    </Router>
  );
}

export default App;