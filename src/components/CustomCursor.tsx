import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        if (cursorRef.current) {
          // Direct DOM manipulation for immediate response
          cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }
      });
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isVisible ? 'opacity-100' : 'opacity-0'} ${
        isActive ? 'scale-75' : 'scale-100'
      }`}
      style={{
        transition: 'opacity 0.3s ease, transform 0s',
        willChange: 'transform',
      }}
    >
      <div className="cursor-dot"></div>
      <div 
        className={`cursor-outline ${isActive ? 'scale-75' : 'scale-100'}`}
        style={{ transition: 'transform 0.15s ease' }}
      ></div>
    </div>
  );
};

export default CustomCursor; 