
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedLogo from './AnimatedLogo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
  ];
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10 backdrop-blur-xs',
        isScrolled ? 'bg-white/80 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <AnimatedLogo className="transition-transform group-hover:scale-110 duration-300" />
          <span className="font-display font-bold text-xl">MT Nexus</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-800 hover:text-black link-underline transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="/auth"
            className="px-5 py-2 rounded-full bg-black text-white font-medium text-sm transition-all hover:bg-gray-800 button-highlight"
          >
            Get Started
          </a>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-800"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-10">
            <a href="/" className="flex items-center gap-2">
              <AnimatedLogo />
              <span className="font-display font-bold text-xl">MT Nexus</span>
            </a>
            <button
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex flex-col gap-6 mb-auto">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xl font-medium text-gray-800 hover:text-black transition-colors"
                onClick={toggleMobileMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <a
            href="/auth"
            className="w-full py-3 rounded-full bg-black text-white text-center font-medium transition-all hover:bg-gray-800 button-highlight"
            onClick={toggleMobileMenu}
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
