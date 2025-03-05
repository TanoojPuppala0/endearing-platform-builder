
import { ArrowRight } from 'lucide-react';

const Cta = () => {
  return (
    <section id="get-started" className="py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-12 md:p-16">
          {/* Background elements */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
          <div className="absolute inset-0">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="hero-text text-white text-4xl md:text-5xl mb-6 animate-fade-in">
                Start creating your next project today
              </h2>
              <p className="text-gray-300 text-lg mb-10 animate-fade-in stagger-1">
                Join thousands of creators and businesses who are building the web with our platform. No coding required.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-2">
                <a 
                  href="#signup" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white text-gray-900 font-medium transition-all hover:bg-gray-100 hover:scale-105"
                >
                  Get Started for Free
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a 
                  href="#pricing" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gray-800 text-white border border-gray-700 font-medium transition-all hover:bg-gray-700"
                >
                  View Pricing
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
