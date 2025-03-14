'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import WorkSection from '@/components/WorkSection';
import AboutSection from '@/components/AboutSection';
import Preloader from '@/components/Preloader';
import ScrollToTop from '@/components/ScrollToTop';

// Dynamically import components that should not be server-side rendered
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
});

// Import TorusBackground with priority loading
const TorusBackground = dynamic(() => import('@/components/TorusBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-transparent z-[-1]"></div>,
});

export default function Home() {
  // Disable default cursor when custom cursor is active
  useEffect(() => {
    document.documentElement.classList.add('custom-cursor-enabled');
    
    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled');
    };
  }, []);

  return (
    <main className="relative">
      <Preloader />
      <TorusBackground />
      <Navigation />
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <ScrollToTop />
      <CustomCursor />
    </main>
  );
} 