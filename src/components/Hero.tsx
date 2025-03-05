
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      
      const gradientElements = heroRef.current.querySelectorAll('.gradient-element');
      
      gradientElements.forEach((el: Element) => {
        if (el instanceof HTMLElement) {
          const speed = parseFloat(el.dataset.speed || '0.05');
          const x = (mouseRef.current.x - rect.width / 2) * speed;
          const y = (mouseRef.current.y - rect.height / 2) * speed;
          
          el.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="gradient-element absolute top-20 right-[15%] w-80 h-80 bg-blue-100 rounded-full opacity-30 blur-3xl"
          data-speed="0.03"
        />
        <div 
          className="gradient-element absolute bottom-40 left-[10%] w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl"
          data-speed="0.02"
        />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-block mb-6 px-4 py-1.5 bg-gray-100/80 backdrop-blur-sm rounded-full text-sm font-medium animate-fade-in">
          <span className="text-gray-800">Introducing Synthesis</span>
        </div>
        
        <h1 className="hero-text text-5xl md:text-7xl mb-6 animate-fade-in animate-slide-up">
          A new way to create <br />
          <span className="relative inline-block">
            beautiful websites
            <span className="absolute -bottom-2 left-0 right-0 h-[6px] bg-black/10 rounded-full"></span>
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-fade-in animate-slide-up stagger-1">
          Transform your ideas into stunning digital experiences with our intuitive platform. 
          Design, build, and launch without writing a single line of code.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animate-slide-up stagger-2">
          <a 
            href="#get-started" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-medium transition-all hover:bg-gray-800 button-highlight"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </a>
          
          <a 
            href="#demo" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-800 font-medium transition-all hover:bg-white"
          >
            Watch Demo
          </a>
        </div>
      </div>
      
      {/* Visual Element */}
      <div className="relative w-full max-w-5xl mx-auto mt-20 animate-fade-in animate-slide-up stagger-3">
        <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          <div className="absolute top-0 left-0 right-0 h-12 bg-white/90 backdrop-blur-sm flex items-center px-4 gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <div className="ml-4 w-full max-w-md h-6 bg-gray-100 rounded-full"></div>
          </div>
          <div className="pt-12 bg-gradient-to-b from-gray-50 to-white">
            <div className="aspect-[16/9] w-full bg-gray-100 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-t-gray-300 border-r-gray-300 border-b-gray-300 border-l-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-sm text-gray-500">Loading preview...</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-8 py-3 rounded-full border border-gray-200 shadow-sm flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium">Live Preview Updates</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
