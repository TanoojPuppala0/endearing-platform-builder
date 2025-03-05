
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import { useEffect } from 'react';

const Index = () => {
  // Scroll to section on hash change or page load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Add a small delay to allow for animations and rendering
          setTimeout(() => {
            const navbarHeight = 80; // Approximate navbar height
            const topOffset = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
            window.scrollTo({
              top: topOffset,
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    };
    
    // Initial check on page load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  // Setup scroll animation observers
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Cta />
      <Footer />
    </div>
  );
};

export default Index;
