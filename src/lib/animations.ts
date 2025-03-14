import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom text splitting function
const splitTextIntoSpans = (element: Element): HTMLSpanElement[] => {
  const text = element.textContent || '';
  const chars: HTMLSpanElement[] = [];
  
  // Clear the element
  element.textContent = '';
  
  // Create a wrapper for the text
  const wrapper = document.createElement('span');
  wrapper.style.display = 'inline-block';
  
  // Split text into characters and create spans
  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.position = 'relative';
    span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
    chars.push(span);
    wrapper.appendChild(span);
  });
  
  element.appendChild(wrapper);
  return chars;
};

// Text reveal animation
export const textReveal = (element: string | Element, delay: number = 0) => {
  let chars: HTMLSpanElement[] = [];
  
  if (typeof element === 'string') {
    const el = document.querySelector(element);
    if (el) {
      chars = splitTextIntoSpans(el);
    }
  } else {
    chars = splitTextIntoSpans(element);
  }
  
  gsap.set(chars, { y: 50, opacity: 0, force3D: true });
  
  return gsap.to(chars, {
    y: 0,
    opacity: 1,
    stagger: 0.02,
    duration: 0.5,
    ease: 'power2.out',
    delay,
    force3D: true,
  });
};

// Staggered fade-in animation for multiple elements
export const staggerFadeIn = (elements: string | Element | Element[], delay: number = 0) => {
  return gsap.fromTo(
    elements,
    { y: 30, opacity: 0, force3D: true },
    {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      delay,
      force3D: true,
    }
  );
};

// Scroll-triggered animation
export const createScrollTrigger = (
  trigger: string | Element,
  animation: gsap.core.Timeline | gsap.core.Tween,
  start: string = 'top 80%',
  end: string = 'bottom 20%'
) => {
  return ScrollTrigger.create({
    trigger,
    start,
    end,
    animation,
    toggleActions: 'play none none reverse',
    markers: false,
  });
};

// Multi-language greeting animation with accelerating speed
export const greetingAnimation = (element: string | Element, greetings: string[]) => {
  const tl = gsap.timeline({ repeat: 0 }); // Changed to not repeat by default
  
  // Start with longer durations and gradually decrease
  let fadeDuration = 0.3; // Reduced from 0.5
  let pauseDuration = 0.5; // Reduced from 1.0
  const speedFactor = 0.5; // Changed from 0.7 to make it accelerate faster
  
  greetings.forEach((greeting, index) => {
    // Calculate durations for this iteration (getting faster each time)
    const currentFadeDuration = Math.max(0.05, fadeDuration * Math.pow(speedFactor, index));
    const currentPauseDuration = Math.max(0.02, pauseDuration * Math.pow(speedFactor, index));
    
    tl.to(element, { 
      duration: currentFadeDuration, 
      opacity: 0, 
      y: -20, 
      ease: 'power2.in',
      force3D: true,
      onComplete: () => {
        if (typeof element === 'string') {
          const el = document.querySelector(element);
          if (el) {
            el.textContent = greeting;
          }
        } else {
          element.textContent = greeting;
        }
      }
    })
    .to(element, { 
      duration: currentFadeDuration, 
      opacity: 1, 
      y: 0, 
      ease: 'power2.out',
      force3D: true
    })
    .to(element, { 
      duration: currentPauseDuration, 
      ease: 'none' 
    }); // Pause on this greeting with decreasing duration
  });
  
  return tl;
};

// Page transition animation
export const pageTransition = (
  container: string | Element,
  direction: 'in' | 'out' = 'in'
) => {
  const duration = 0.5;
  
  if (direction === 'out') {
    return gsap.to(container, {
      opacity: 0,
      y: 20,
      duration,
      ease: 'power2.in',
      force3D: true,
    });
  }
  
  return gsap.fromTo(
    container,
    { opacity: 0, y: 20, force3D: true },
    {
      opacity: 1,
      y: 0,
      duration,
      ease: 'power2.out',
      force3D: true,
    }
  );
}; 