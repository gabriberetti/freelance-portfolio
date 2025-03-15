'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import WorkSection from '@/components/WorkSection';
import AboutSection from '@/components/AboutSection';
import Preloader from '@/components/Preloader';
import ScrollToTop from '@/components/ScrollToTop';
import LocationBadge from '@/components/LocationBadge';
import SEO from '@/components/SEO';
import ScriptLoader from '@/components/ScriptLoader';

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

  // Add structured data for the homepage
  const homePageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Freelance Web Developer Portfolio',
    description: 'Expert freelance full-stack developer specializing in modern web development, interactive UX/UI design, and custom web applications using React, Next.js, and Node.js.',
    url: 'https://yourwebsite.com',
    telephone: '+1-123-456-7890',
    email: 'contact@yourwebsite.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Web Dev Street',
      addressLocality: 'Developer City',
      addressRegion: 'CA',
      postalCode: '12345',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '37.7749',
      longitude: '-122.4194'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '17:00'
    },
    sameAs: [
      'https://twitter.com/yourtwitterhandle',
      'https://github.com/yourgithubhandle',
      'https://linkedin.com/in/yourlinkedinhandle'
    ],
    priceRange: '$$',
    keywords: [
      'Freelance web developer',
      'Full-stack developer for hire',
      'Creative web designer',
      'Web software developer',
      'Portfolio website developer',
      'MERN stack developer',
      'UX/UI designer and developer',
      'Custom web application developer'
    ]
  };

  return (
    <>
      <SEO 
        title="Freelance Web Developer | Full-Stack Developer Portfolio"
        description="Expert freelance full-stack developer specializing in modern web development, interactive UX/UI design, and custom web applications using React, Next.js, and Node.js."
        keywords={[
          'Freelance web developer', 
          'Full-stack developer for hire', 
          'Creative web designer', 
          'Web software developer', 
          'Portfolio website developer', 
          'MERN stack developer', 
          'UX/UI designer and developer', 
          'Custom web application developer'
        ]}
      />
      
      {/* Structured data for the homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageStructuredData) }}
      />
      
      <main className="relative">
        <Preloader />
        <TorusBackground />
        <Navigation />
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <LocationBadge />
        <ScrollToTop />
        <CustomCursor />
      </main>
      
      {/* Load analytics script with low priority */}
      <ScriptLoader
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="lazyOnload"
        id="google-analytics"
        priority="low"
      />
    </>
  );
} 