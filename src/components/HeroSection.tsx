import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { textReveal } from '@/lib/animations';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define types for our global objects to fix TypeScript errors
declare global {
  interface Window {
    _nameScrollAnimation?: gsap.core.Tween;
    _scrollHandler?: EventListener;
    _resizeHandler?: EventListener;
    _scrollState?: {
      lastScrollY: number;
      currentDirection: number;
      hasStartedScrolling: boolean;
      currentSpeed: number;
      lastScrollTime: number;
      scrollAnimationId: number | null;
      isScrolling: boolean;
      scrollTimeout: NodeJS.Timeout | null;
    };
  }
}

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const nameContainerRef = useRef<HTMLDivElement>(null);

  // Initial animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    let messageAnim: gsap.core.Tween | null = null;
    
    // Animate the message
    if (messageRef.current) {
      messageAnim = gsap.fromTo(
        messageRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          delay: 0.5, 
          ease: 'power2.out' 
        }
      );
    }

    // Parallax effect on scroll
    if (parallaxRef.current) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        gsap.to(parallaxRef.current, {
          y: scrollPosition * 0.2,
          duration: 0.5,
          ease: 'power1.out',
          force3D: true,
        });
      };

      window.addEventListener('scroll', handleScroll);
      
      return () => {
        if (messageAnim) messageAnim.kill();
        window.removeEventListener('scroll', handleScroll);
      };
    }
    
    return () => {
      if (messageAnim) messageAnim.kill();
    };
  }, []);

  // Enhanced name scrolling animation
  useEffect(() => {
    if (!nameRef.current || !sectionRef.current || !nameContainerRef.current) return;

    // Set up the marquee text with enough content
    nameRef.current.innerHTML = "Freelance, Creative Design & Development — ".repeat(10);
    
    // Get the width of the text
    const textWidth = nameRef.current.offsetWidth;
    const viewportWidth = window.innerWidth;
    
    // Set initial position
    gsap.set(nameRef.current, { x: 0 });
    
    // Create a GSAP animation for the marquee effect
    const marquee = gsap.to(nameRef.current, {
      x: -textWidth / 2,
      ease: "none",
      duration: 60,
      repeat: -1,
      onRepeat: () => {
        gsap.set(nameRef.current, { x: 0 });
      }
    });
    
    // Set up scroll listener to control animation speed
    const handleScroll = () => {
      const scrollSpeed = Math.abs(window.scrollY - lastScrollY);
      
      // Calculate speed factor - faster when scrolling, slower when static
      const baseSpeed = 0.5;
      const maxSpeed = 3;
      const speedFactor = Math.min(baseSpeed + (scrollSpeed / 50), maxSpeed);
      
      // Apply the new speed using timeScale
      marquee.timeScale(speedFactor);
      
      // Store current scroll position
      lastScrollY = window.scrollY;
    };
    
    // Track last scroll position
    let lastScrollY = window.scrollY;
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize with a slower speed
    marquee.timeScale(0.5);

    return () => {
      // Clean up animations
      marquee.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="flex flex-col items-center justify-center min-h-screen bg-transparent text-primary px-6 overflow-hidden relative"
    >
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent z-10 pointer-events-none"></div>
      
      {/* Message */}
      <div className="relative z-20 max-w-4xl mx-auto text-center w-full -mt-32 md:-mt-24">
        <h1 
          ref={messageRef}
          className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight text-white mb-6"
        >
          Crafting Tailor-Made Solutions
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-light text-white max-w-2xl mx-auto leading-relaxed">
          Helping companies worldwide achieve excellence through quality-focused design and development.
        </p>
      </div>
      
      {/* Parallax background elements */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"></div>
      </div>

      {/* Large name at the bottom with GSAP-controlled animation */}
      <div 
        ref={nameContainerRef}
        className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none z-40"
        style={{ marginBottom: '-3rem' }}
      >
        <div className="marquee-container py-10 overflow-hidden w-full">
          <h2 
            ref={nameRef}
            className="text-[12vw] font-normal text-[#1F01B9] whitespace-nowrap leading-[1.2] will-change-transform inline-block"
            style={{ 
              transform: 'scaleY(1.1)', 
              paddingBottom: '0.2em',
            }}
          >
            Freelance, Creative Design & Development — 
          </h2>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 