import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { staggerFadeIn, createScrollTrigger } from '@/lib/animations';
import { preloadImages } from '@/lib/imageLoader';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  link: string;
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'OECUS',
    category: 'Design & Development',
    description: 'Berlin based music collective specializing in electronic music and events.',
    imageUrl: '/oecus.png',
    link: 'https://oecus-music.com/',
    year: '2025',
  },
  {
    id: 2,
    title: 'Beretti Audio',
    category: 'Design & Development',
    description: 'Professional Mastering website for audio and digital signal processing services',
    imageUrl: '/berettiaudio.png',
    link: 'https://beretti-audio.netlify.app/',
    year: '2025',
  },
  {
    id: 3,
    title: 'Aural Bio Sonification',
    category: 'Interaction & Development',
    description: 'Interactive audio experience that transforms visual data into sound',
    imageUrl: '/aural.png',
    link: 'https://auralsonification.netlify.app/',
    year: '2025',
  },
  {
    id: 4,
    title: 'HelloBody',
    category: 'Web Development',
    description: 'E-commerce platform for health and wellness products',
    imageUrl: '/hellobody.png',
    link: 'https://hellobody.com/',
    year: '2022 - 2024',
  },
];

const WorkSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  // Track mouse position for cursor preview with smooth animation
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    // Animate cursor position with GSAP for smooth movement
    if (cursorRef.current && activeProject !== null) {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true
      });
    }
  };

  const handleProjectHover = (projectId: number, isEntering: boolean) => {
    if (isEntering) {
      setActiveProject(projectId);
      setCursorVisible(true);
      
      // Change cursor style when hovering over a project
      if (sectionRef.current) {
        sectionRef.current.style.cursor = 'none';
      }
    } else {
      setActiveProject(null);
      setCursorVisible(false);
      
      // Reset cursor style when not hovering over a project
      if (sectionRef.current) {
        sectionRef.current.style.cursor = 'auto';
      }
    }
  };

  // Get the active project data
  const activeProjectData = activeProject !== null 
    ? projects.find(p => p.id === activeProject) 
    : null;

  useEffect(() => {
    // Preload project images for better performance
    preloadImages(projects.map(project => project.imageUrl));

    if (!sectionRef.current || !titleRef.current || !projectsRef.current) return;

    // Animate title
    const titleAnim = staggerFadeIn(titleRef.current, 0);
    createScrollTrigger(titleRef.current, titleAnim);

    // Animate projects
    const projectItems = projectsRef.current.querySelectorAll('.project-item');
    // Convert NodeList to Array to fix TypeScript error
    const projectItemsArray = Array.from(projectItems);
    const projectsAnim = staggerFadeIn(projectItemsArray, 0.2);
    createScrollTrigger(projectsRef.current, projectsAnim);

    // Initialize cursor position
    if (cursorRef.current) {
      gsap.set(cursorRef.current, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        xPercent: -50,
        yPercent: -50
      });
    }

    return () => {
      titleAnim.kill();
      projectsAnim.kill();
    };
  }, []);

  return (
    <section 
      id="work" 
      ref={sectionRef}
      className="pt-32 pb-20 px-6 md:px-12 relative bg-secondary"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor preview */}
      <div 
        ref={cursorRef}
        className={`fixed hidden md:block pointer-events-none z-50 transition-opacity duration-300 ${
          cursorVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)',
          width: '550px',
          height: '320px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        }}
      >
        {activeProjectData && (
          <Image
            src={activeProjectData.imageUrl}
            alt={activeProjectData.title}
            fill
            sizes="550px"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            quality={95}
            priority
          />
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-8 md:mb-12">
          <h2 
            ref={titleRef}
            className="text-sm md:text-base font-light tracking-wider uppercase"
          >
            RECENT WORK
          </h2>
        </div>
        
        <div 
          ref={projectsRef}
          className="space-y-6 md:space-y-12"
        >
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="project-item border-t border-primary/10 pt-5 md:pt-7 pb-1 md:pb-2"
            >
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                onMouseEnter={() => handleProjectHover(project.id, true)}
                onMouseLeave={() => handleProjectHover(project.id, false)}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                      <h3 className="text-5xl md:text-7xl font-light transition-all duration-300 group-hover:-translate-y-1 leading-tight">
                        {project.title}
                      </h3>
                      <span className="text-sm md:text-base text-primary/60 mt-1 md:mt-0 font-light">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-sm md:text-base max-w-2xl mt-3 mb-3 md:mb-0 text-primary/80 font-light">
                      {project.description}
                    </p>
                  </div>
                  <span className="text-sm md:text-base text-primary/70 md:ml-4 md:mt-4 font-light">
                    {project.category}
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection; 