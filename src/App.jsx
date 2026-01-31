import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import AIRoadmap from './components/AIRoadmap';
import FreelanceCTA from './components/FreelanceCTA';
function App() {
  return (
    <div className="relative">
      <CustomCursor/>
      <Navbar />
      
    <main>
        <Hero /> 
        <About/>
        <Projects/>
        <Contact/>
        <AIRoadmap/>
        <FreelanceCTA/>
        
      </main>
      

      {/* Background Glows */}
      <div className="fixed top-0 left-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-accent-blue/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-accent-purple/10 blur-[120px]" />
      </div>
    </div>
  );
}

export default App;