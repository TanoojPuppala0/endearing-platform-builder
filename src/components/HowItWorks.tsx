
import { useRef, useEffect, useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Create a Project',
    description: 'Start with a blank canvas or choose from our templates to kickstart your project.',
    imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    number: '02',
    title: 'Design & Build',
    description: 'Use our visual editor and AI assistant to design and implement your ideas.',
    imageUrl: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    number: '03',
    title: 'Preview & Test',
    description: 'See your changes in real-time and test your application across different devices.',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80',
  },
  {
    number: '04',
    title: 'Deploy & Share',
    description: 'Publish your project with one click and share it with the world.',
    imageUrl: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80',
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  // Auto change active step for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="py-24 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 bg-black/5 rounded-full text-sm font-medium animate-on-scroll">
            <span className="text-gray-800">Process</span>
          </div>
          <h2 className="hero-text text-4xl md:text-5xl mb-5 animate-on-scroll">
            How it works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll">
            Creating beautiful websites has never been easier. Our streamlined process helps you go from idea to live site in minutes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Steps */}
          <div className="lg:col-span-2 space-y-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 animate-on-scroll ${
                  activeStep === index 
                    ? 'border-black/20 bg-white shadow-md' 
                    : 'border-gray-200 bg-transparent hover:border-gray-300'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`font-display font-bold text-xl transition-colors ${
                    activeStep === index ? 'text-black' : 'text-gray-400'
                  }`}>
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Image */}
          <div className="lg:col-span-3 animate-on-scroll">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                {steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      activeStep === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <img 
                      src={step.imageUrl} 
                      alt={step.title} 
                      className="w-full h-full object-cover"
                      style={{ opacity: 0.9 }}
                    />
                    <div className="absolute bottom-6 left-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl">
                      <span className="font-display font-bold">{step.number}</span> - {step.title}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="absolute -bottom-4 -right-4 h-full w-full bg-black/5 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
