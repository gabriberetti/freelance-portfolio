/**
 * Smooth scroll to a target element with customizable duration and easing
 * @param targetId - The ID of the element to scroll to (without the # symbol)
 * @param duration - Duration of the scroll animation in milliseconds
 * @param offset - Offset from the top of the target element in pixels
 */
export const smoothScrollTo = (targetId: string, duration: number = 800, offset: number = 0): void => {
  // Only run on client side
  if (typeof window === 'undefined') return;

  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  // Easing function: easeInOutCubic
  const easeInOutCubic = (t: number): number => {
    return t < 0.5
      ? 4 * t * t * t
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  const animation = (currentTime: number): void => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * easedProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

/**
 * Initialize smooth scrolling for all anchor links
 * @param offset - Offset from the top of the target element in pixels
 */
export const initSmoothScroll = (offset: number = 0): void => {
  // Only run on client side
  if (typeof window === 'undefined') return;

  // Get all anchor links that point to an ID on the page
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const targetId = href.substring(1); // Remove the # symbol
      
      e.preventDefault();
      smoothScrollTo(targetId, 800, offset);
    });
  });
}; 