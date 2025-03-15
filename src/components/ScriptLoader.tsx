import React, { useEffect, useState } from 'react';
import Script from 'next/script';

interface ScriptLoaderProps {
  src: string;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  id?: string;
  onLoad?: () => void;
  priority?: 'high' | 'medium' | 'low';
  defer?: boolean;
  async?: boolean;
}

const ScriptLoader: React.FC<ScriptLoaderProps> = ({
  src,
  strategy = 'afterInteractive',
  id,
  onLoad,
  priority = 'medium',
  defer = true,
  async = true,
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // For high priority scripts, load them immediately
    if (priority === 'high') {
      setShouldLoad(true);
      return;
    }

    // For medium priority scripts, load after page is fully loaded
    if (priority === 'medium') {
      if (document.readyState === 'complete') {
        setShouldLoad(true);
      } else {
        window.addEventListener('load', () => setShouldLoad(true));
        return () => window.removeEventListener('load', () => setShouldLoad(true));
      }
      return;
    }

    // For low priority scripts, load when user is idle or after a delay
    if (priority === 'low') {
      if ('requestIdleCallback' in window) {
        const idleCallback = window.requestIdleCallback(() => {
          setShouldLoad(true);
        }, { timeout: 5000 });
        
        return () => window.cancelIdleCallback(idleCallback);
      } else {
        const timeoutId = setTimeout(() => setShouldLoad(true), 3000);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [priority]);

  // If the script shouldn't load yet, don't render anything
  if (!shouldLoad && priority !== 'high') {
    return null;
  }

  return (
    <Script
      src={src}
      strategy={strategy}
      id={id}
      onLoad={onLoad}
      defer={defer}
      async={async}
    />
  );
};

export default ScriptLoader; 