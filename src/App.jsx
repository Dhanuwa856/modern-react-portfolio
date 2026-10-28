import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
import InteractiveLab from './components/InteractiveLab';
import AIRoadmap from './components/AIRoadmap';
import TechQuiz from './components/TechQuiz';
import Contact from './components/Contact';
import FreelanceCTA from './components/FreelanceCTA';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';

const ThreeBackground = lazy(() => import('./components/ThreeBackground'));
const AIChatBot = lazy(() => import('./components/AIChatBot'));

const MainPortfolio = () => (
  <>
    <Helmet>
      <title>Dhanushka Rathnayaka | AI Engineer &amp; Full-Stack Developer</title>
      <meta
        name="description"
        content="Portfolio of Dhanushka Rathnayaka, an IT Undergraduate at ITUM specializing in AI Engineering, Python, Machine Learning, and Full-Stack Web Development (MERN, Next.js, FastAPI)."
      />
      <meta
        name="keywords"
        content="Dhanushka Rathnayaka, AI Engineer Sri Lanka, ITUM student, Python Developer, Machine Learning, Full-Stack Developer, MERN Stack, Neural-Math-Engine, talking-hands-lk"
      />
      <meta property="og:title" content="Dhanushka Rathnayaka | AI Engineer & Full-Stack Portfolio" />
      <meta
        property="og:description"
        content="Building intelligent solutions with Python, Machine Learning, and Full-Stack React/Next.js."
      />
      <meta property="og:url" content="https://www.dhanushka.live" />
      <meta property="og:type" content="website" />
      <link rel="canonical" href="https://www.dhanushka.live" />
    </Helmet>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <About />
      <Projects />
      <InteractiveLab />
      <AIRoadmap />
      <Education />
      <Certificates />
      <TechQuiz />
      <Contact />
      <FreelanceCTA />
    </motion.div>
  </>
);

function App() {
  return (
    <Router>
      <div className="relative min-h-screen selection:bg-accent-blue/30">
        <CustomCursor />
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>
        <Navbar />

        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<MainPortfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/quiz" element={<TechQuiz />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Suspense fallback={null}>
          <AIChatBot />
        </Suspense>
        <Footer />
        <Analytics />

        {/* Ambient Emerald & Cyan Background Glows */}
        <div className="fixed top-0 left-0 -z-20 h-full w-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-accent-blue/8 blur-[130px]" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-accent-purple/8 blur-[130px]" />
        </div>
      </div>
    </Router>
  );
}

export default App;