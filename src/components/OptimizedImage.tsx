import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover',
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    // Only set up the intersection observer if not priority
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Start loading when image is 200px from viewport
        threshold: 0.01,
      }
    );

    const currentRef = document.getElementById(`image-container-${src.replace(/[^a-zA-Z0-9]/g, '')}`);
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [src, priority]);

  // Generate semantic alt text if none provided
  const enhancedAlt = alt || `Image of ${src.split('/').pop()?.split('.')[0] || 'content'}`;

  return (
    <div 
      id={`image-container-${src.replace(/[^a-zA-Z0-9]/g, '')}`}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {(isInView || priority) && (
        <Image
          src={src}
          alt={enhancedAlt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            objectFit,
            width: '100%',
            height: '100%',
          }}
        />
      )}
      {!isLoaded && (isInView || priority) && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage; 