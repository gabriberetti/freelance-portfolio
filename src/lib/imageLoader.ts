/**
 * Custom image loader for Next.js Image component
 * This helps with optimizing images from external sources
 */
export const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  // Default quality if not specified
  const q = quality || 75;
  
  // If the image is from Unsplash, use their image API for optimization
  if (src.includes('unsplash.com')) {
    // Extract the Unsplash photo ID from the URL
    const unsplashRegex = /unsplash\.com\/photos\/([a-zA-Z0-9_-]+)/;
    const match = src.match(unsplashRegex);
    
    if (match && match[1]) {
      const photoId = match[1];
      return `https://images.unsplash.com/photo-${photoId}?w=${width}&q=${q}&auto=format&fit=crop`;
    }
    
    // If we can't extract the ID, just append width and quality parameters
    return `${src}?w=${width}&q=${q}&auto=format`;
  }
  
  // For other images, return the original URL
  return src;
};

/**
 * Preload critical images to improve performance
 * @param imageSrcs - Array of image URLs to preload
 */
export const preloadImages = (imageSrcs: string[]) => {
  if (typeof window === 'undefined') return;
  
  imageSrcs.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

export default imageLoader; 