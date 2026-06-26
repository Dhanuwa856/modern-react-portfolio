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
import NotFound from './components/NotFound';
import Certificates from './components/Certificates';
import { Helmet } from 'react-helmet-async';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
// import PythonVisualizer from './components/PythonVisualizer';
// import PythonLearningHub from './components/PythonLearningHub';
// import { Analytics } from "@vercel/analytics/next"

// --- ප්‍රධාන පෝර්ට්ෆෝලියෝ කොටස (Landing Page) ---
const MainPortfolio = () => (
  <>
    <Helmet>
      {/* Google සර්ච් එකේ පේන Title එක (අකුරු 60 ට අඩුයි) */}
      <title>Dhanushka | AI Engineer & Python Developer Sri Lanka</title>
      
      {/* සර්ච් එකේ පල්ලෙහායින් පේන විස්තරය (අකුරු 160 ට අඩුයි) */}
      <meta name="description" content="Portfolio of Dhanushka, an IT student at ITUM specializing in AI Engineering, Python, and MERN stack. Explore projects like Neural-Math-Engine and Knowledge Battleground." />
      
      {/* Keywords - Google දැන් මේක වැඩිය බලන්නේ නැති වුණත් වෙනත් සර්ච් එන්ජින් වලට වැදගත් */}
      <meta name="keywords" content="Dhanushka, AI Engineer Sri Lanka, ITUM student, Python Developer, Machine Learning, MERN Stack, Neural-Math-Engine, Knowledge Battleground" />
      
      {/* Social Media වල ලින්ක් එක ශෙයාර් කරද්දී පේන විදිහ (Open Graph) */}
      <meta property="og:title" content="Dhanushka | AI Engineer Portfolio" />
      <meta property="og:description" content="Building intelligent solutions with Python and React. Check out my latest AI and Web projects." />
      <meta property="og:url" content="https://www.dhanushka.live" />
      <meta property="og:type" content="website" />
      
      {/* Google Bot එකට සයිට් එක index කරන්න අවසර දීම */}
      <link rel="canonical" href="https://www.dhanushka.live" />
    </Helmet>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero /> 
      {/* <Analytics/> */}
      <About />
      <Education />
      <Certificates />
      <Projects />
      <Contact />
      <AIRoadmap />
      <TechQuiz/>
      {/* <PythonVisualizer/> */}
      {/* <PythonLearningHub/> */}
      <FreelanceCTA />
    </motion.div>
  </>
);

function App() {
  return (
    <Router>
      <div className="relative min-h-screen selection:bg-accent-purple/30">
        <CustomCursor />
        
        {/* Navbar එක හැම page එකකම උඩින් පේනවා */}
        <Navbar />
        
        <main>
          <Routes>
            {/* මුල් පිටුව (Home) */}
            <Route path="/" element={<MainPortfolio />} />
            
            {/* Blog පිටු සඳහා Routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            
            {/* Tech Quiz / Battleground පිටුව */}
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