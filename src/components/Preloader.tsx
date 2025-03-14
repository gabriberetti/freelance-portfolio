import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { greetingAnimation } from '@/lib/animations';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const greetingRef = useRef<HTMLHeadingElement>(null);

  const greetings = [
    'Hello',
    'Bonjour',
    'Hola',
    'Ciao',
    'Olá',
    'Привет',
    'こんにちは',
    '你好',
    'مرحبا',
    'Hallo',
  ];

  useEffect(() => {
    if (!greetingRef.current) return;

    // Start greeting animation as loading indicator
    const greetingAnim = greetingAnimation(greetingRef.current, greetings);
    
    // Animate out the preloader when greeting animation completes
    greetingAnim.eventCallback('onComplete', () => {
      const tl = gsap.timeline();
      
      tl.to('.preloader-text', {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        force3D: true,
      })
      .to('.preloader', {
        yPercent: -100,
        duration: 1.2,
        ease: 'power3.inOut',
        force3D: true,
        onComplete: () => setIsLoading(false),
      });
    });

    return () => {
      greetingAnim.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="preloader fixed inset-0 bg-primary z-[9999] flex items-center justify-center">
      <div className="preloader-content text-center">
        <h2 
          ref={greetingRef}
          className="preloader-text text-secondary text-6xl md:text-7xl lg:text-8xl font-light"
        >
          {greetings[0]}
        </h2>
        <div className="mt-10 w-56 h-1.5 bg-secondary/20 mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-full bg-secondary animate-loader"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader; 