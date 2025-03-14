import { useEffect, useRef, useState } from 'react';
import { textReveal, staggerFadeIn, createScrollTrigger } from '@/lib/animations';
import AboutPlatonicBackground from './AboutPlatonicBackground';
import { gsap } from 'gsap';

const skills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 
  'GSAP', 'Three.js', 'WebGL', 'CSS/SCSS', 
  'Tailwind CSS', 'Node.js', 'UI/UX Design', 'Figma'
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleSecondRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [localTime, setLocalTime] = useState<string>('');

  // Update local time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setLocalTime(timeString);
    };

    // Update immediately and then every second
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !titleSecondRef.current || !bioRef.current || !skillsRef.current || !contactRef.current) return;

    // Animate title
    const titleAnim = textReveal(titleRef.current, 0);
    createScrollTrigger(titleRef.current, titleAnim);
    
    // Animate second title
    const titleSecondAnim = textReveal(titleSecondRef.current, 0.2);
    createScrollTrigger(titleSecondRef.current, titleSecondAnim);

    // Animate bio with fade-in instead of text reveal
    const bioAnim = gsap.fromTo(
      bioRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.3 }
    );
    createScrollTrigger(bioRef.current, bioAnim);

    // Animate skills
    const skillItems = skillsRef.current.querySelectorAll('.skill-item');
    const skillItemsArray = Array.from(skillItems);
    const skillsAnim = staggerFadeIn(skillItemsArray, 0.5);
    createScrollTrigger(skillsRef.current, skillsAnim);

    // Animate contact items
    const contactItems = contactRef.current.querySelectorAll('.animate-item');
    const contactItemsArray = Array.from(contactItems);
    const contactAnim = staggerFadeIn(contactItemsArray, 0.2);
    createScrollTrigger(contactRef.current, contactAnim);

    return () => {
      titleAnim.kill();
      titleSecondAnim.kill();
      bioAnim.kill();
      skillsAnim.kill();
      contactAnim.kill();
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen bg-primary text-secondary pt-32 pb-20 px-6 relative"
    >
      {/* 3D Background */}
      <AboutPlatonicBackground />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8 md:mb-12">
          <h2 
            className="text-sm md:text-base font-light tracking-wider uppercase"
          >
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 
              ref={titleRef}
              className="text-5xl md:text-7xl font-light leading-tight"
            >
              Creative
            </h3>
            <h3 
              ref={titleSecondRef}
              className="text-5xl md:text-7xl font-light mb-8 leading-tight"
            >
              Developer
            </h3>
            <p 
              ref={bioRef}
              className="text-lg leading-relaxed text-secondary/80 font-light"
            >
              I love to build immersive digital experiences that combine <span style={{ whiteSpace: 'nowrap' }}>cutting-edge</span> technology with thoughtful design.
              <br />
              With over 3&nbsp;years in&nbsp;web development, I&nbsp;specialize in
              <br />
              interactive websites that engage and inspire.
            </p>
          </div>
          
          <div>
            <h3 className="text-3xl md:text-4xl font-light mb-6">Skills</h3>
            <div 
              ref={skillsRef}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="skill-item p-3 border border-secondary/30 text-center transition-all duration-300 hover:bg-secondary hover:text-primary hover:border-secondary hover:scale-105 cursor-pointer"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary/20 pt-16">
          <h2 className="text-5xl md:text-7xl font-light mb-12 leading-tight">Let's Work Together</h2>
          
          <div 
            ref={contactRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="animate-item">
              <h3 className="text-2xl md:text-3xl font-light mb-2">Email</h3>
              <a 
                href="mailto:gabri.beretti@gmail.com" 
                className="text-2xl hover:underline font-light"
              >
                gabri.beretti@gmail.com
              </a>
            </div>
          </div>
          
          <div className="mt-16 flex flex-wrap gap-6">
            <a 
              href="https://www.linkedin.com/in/gabriele-beretti/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="animate-item text-lg hover:underline font-light"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/gabriberetti" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="animate-item text-lg hover:underline font-light"
            >
              GitHub
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="animate-item text-lg hover:underline font-light"
            >
              Twitter
            </a>
          </div>
          
          <footer className="mt-16 pt-8 border-t border-secondary/20">
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
              <p className="animate-item text-lg font-light">&copy; {new Date().getFullYear()} Beretti Gabriele. All rights reserved.</p>
              <div className="animate-item mt-4 md:mt-0 flex items-center">
                <span className="text-lg mr-2 font-light">Local Time:</span>
                <span className="text-lg font-light">{localTime}</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 