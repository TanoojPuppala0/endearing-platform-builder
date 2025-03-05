
import { useEffect, useRef } from 'react';
import { Code, PenTool, Zap, LayoutGrid, RefreshCw, Users } from 'lucide-react';

const featureItems = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Instant Preview',
    description: 'See your changes in real-time as you build, with no delay or refresh needed.'
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: 'AI-Powered Coding',
    description: 'Let our AI assistant write code for you, from simple components to complex features.'
  },
  {
    icon: <PenTool className="h-6 w-6" />,
    title: 'Visual Editing',
    description: 'Click and edit any element on your page with our intuitive visual interface.'
  },
  {
    icon: <LayoutGrid className="h-6 w-6" />,
    title: 'Component Library',
    description: 'Access hundreds of pre-built components to quickly assemble your application.'
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: 'Version History',
    description: 'Go back in time and restore any previous version of your project.'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Collaborative Editing',
    description: 'Work together in real-time with your team members on the same project.'
  }
];

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
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
  
  return (
    <section 
      id="features" 
      ref={featuresRef}
      className="py-24 px-6 md:px-10 bg-gray-50/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 bg-black/5 rounded-full text-sm font-medium animate-on-scroll">
            <span className="text-gray-800">Features</span>
          </div>
          <h2 className="hero-text text-4xl md:text-5xl mb-5 animate-on-scroll">
            Everything you need to build
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll">
            Our platform gives you all the tools to create stunning websites and applications without technical knowledge.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-5 p-3 rounded-xl bg-black/5 w-fit group-hover:bg-black/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 flex-grow">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
