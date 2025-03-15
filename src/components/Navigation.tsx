import { useState, useEffect } from 'react';
import Link from 'next/link';
import { initSmoothScroll } from '@/lib/smoothScroll';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Determine active section based on scroll position
      const sections = ['home', 'work', 'about'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Initialize smooth scrolling with an offset for the fixed header
    initSmoothScroll(80);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Ensure body scroll is restored when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Clean up body overflow when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Effect to handle route changes
  useEffect(() => {
    const handleRouteChange = () => {
      if (isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener('hashchange', handleRouteChange);
    return () => window.removeEventListener('hashchange', handleRouteChange);
  }, [isMobileMenuOpen]);

  // Add a useEffect to ensure proper state synchronization
  useEffect(() => {
    // This ensures the mobile menu state is properly synchronized with section changes
    const handleSectionChange = () => {
      // Update the activeSection state when hash changes
      const hash = window.location.hash.replace('#', '') || 'home';
      setActiveSection(hash);
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleSectionChange);
    
    // Initial check
    handleSectionChange();
    
    return () => {
      window.removeEventListener('hashchange', handleSectionChange);
    };
  }, []);

  const toggleMobileMenu = () => {
    // Use a callback to ensure we're working with the latest state
    setIsMobileMenuOpen(prevState => {
      const newState = !prevState;
      // Prevent scrolling when mobile menu is open
      document.body.style.overflow = newState ? 'hidden' : 'auto';
      return newState;
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(prevState => {
      if (prevState) {
        document.body.style.overflow = 'auto';
        return false;
      }
      return prevState;
    });
  };

  return (
    <>
      {/* Mobile menu overlay - Completely separate from header */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu-overlay"
          className="fixed inset-0 bg-secondary z-[9999] md:hidden"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#ffffff',
            zIndex: 9999,
          }}
        >
          <div className="absolute top-0 left-0 w-full py-6 px-6 flex justify-between items-center">
            <Link 
              href="/#home" 
              className="text-xl font-light tracking-tight text-primary"
              onClick={closeMobileMenu}
            >
              Gabriele Beretti
            </Link>
            
            {/* Close button */}
            <button
              className="z-[9999] w-10 h-10 flex items-center justify-center"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className="block h-0.5 bg-primary rotate-45 translate-y-2 transition-all duration-300"></span>
                <span className="block h-0.5 bg-primary opacity-0 transition-all duration-300"></span>
                <span className="block h-0.5 bg-primary -rotate-45 -translate-y-2 transition-all duration-300"></span>
              </div>
            </button>
          </div>
          
          <nav className="h-full flex items-center justify-center">
            <ul className="flex flex-col items-center space-y-10">
              {['Home', 'Work', 'About'].map((item, index) => {
                const lowercaseItem = item.toLowerCase();
                return (
                  <li 
                    key={item} 
                    className="w-full text-center"
                    style={{ 
                      transitionDelay: `${index * 100}ms`,
                      animation: 'fadeIn 0.3s ease forwards',
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <Link
                      href={`/#${lowercaseItem}`}
                      className={`text-2xl uppercase tracking-wider font-light block py-2 transition-colors duration-300 ${
                        activeSection === lowercaseItem
                          ? 'text-primary'
                          : 'text-muted hover:text-primary'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
      
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'py-4 bg-secondary/95 backdrop-blur-sm shadow-sm' : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link 
            href="/#home" 
            className={`text-xl font-light tracking-tight ${isScrolled ? 'text-primary' : 'text-secondary'}`} 
            onClick={closeMobileMenu}
          >
            Gabriele Beretti
          </Link>

          {/* Mobile menu button - Only visible when menu is closed */}
          {!isMobileMenuOpen && (
            <button
              className="md:hidden z-50 w-10 h-10 flex items-center justify-center"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-overlay"
              aria-label="Open menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span 
                  className={`block h-0.5 transition-all duration-300 ${
                    isScrolled ? 'bg-primary' : 'bg-secondary'
                  }`}
                ></span>
                <span 
                  className={`block h-0.5 transition-all duration-300 ${
                    isScrolled ? 'bg-primary' : 'bg-secondary'
                  }`}
                ></span>
                <span 
                  className={`block h-0.5 transition-all duration-300 ${
                    isScrolled ? 'bg-primary' : 'bg-secondary'
                  }`}
                ></span>
              </div>
            </button>
          )}

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-12" role="menubar">
              {['Home', 'Work', 'About'].map((item) => {
                const lowercaseItem = item.toLowerCase();
                return (
                  <li key={item} role="none">
                    <Link
                      href={`/#${lowercaseItem}`}
                      className={`relative py-2 text-sm uppercase tracking-wider transition-colors duration-300 ${
                        activeSection === lowercaseItem
                          ? isScrolled ? 'text-primary font-light' : 'text-secondary font-light'
                          : isScrolled ? 'text-muted hover:text-primary' : 'text-secondary/70 hover:text-secondary'
                      }`}
                      role="menuitem"
                      aria-current={activeSection === lowercaseItem ? 'page' : undefined}
                    >
                      {item}
                      {activeSection === lowercaseItem && (
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 ${isScrolled ? 'bg-primary' : 'bg-secondary'}`} aria-hidden="true"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navigation; 