import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="relative">
      <CustomCursor/>
      <Navbar />
      
      {/* Hero Section (Coming Soon) */}
      <main className="pt-20">
        <section className="h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-7xl font-black mb-4 tracking-tighter">
              DESIGNING THE <br /> 
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent italic">
                DIGITAL FRONTIER
              </span>
            </h1>
            <p className="text-slate-500 font-mono tracking-widest">ITUM UNDERGRADUATE | FULL-STACK DEVELOPER</p>
          </div>
        </section>
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