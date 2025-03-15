'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Freelance Web Developer | Full-Stack Developer Portfolio',
  description = 'Expert freelance full-stack developer specializing in modern web development, interactive UX/UI design, and custom web applications using React, Next.js, and Node.js.',
  keywords = [
    'Freelance web developer', 
    'Full-stack developer for hire', 
    'Creative web designer', 
    'Web software developer', 
    'Portfolio website developer', 
    'MERN stack developer', 
    'UX/UI designer and developer', 
    'Custom web application developer'
  ],
  ogImage = 'https://yourwebsite.com/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  noIndex = false,
}) => {
  // Use pathname instead of router.asPath
  const pathname = usePathname();
  const siteUrl = 'https://yourwebsite.com';
  
  // Use state to handle client-side rendering
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Determine the canonical URL
  const canonical = canonicalUrl || `${siteUrl}${pathname === '/' ? '' : pathname}`;
  
  // Format keywords for meta tag
  const keywordsString = keywords.join(', ');

  // Only render Head content after component is mounted on the client
  if (!mounted) {
    return null;
  }

  return (
    <Head>
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Basic Meta Tags */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      <meta name="keywords" content={keywordsString} />
      
      {/* Structured Data - Article */}
      {ogType === 'article' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: title,
              image: [ogImage],
              datePublished: new Date().toISOString(),
              dateModified: new Date().toISOString(),
              author: {
                '@type': 'Person',
                name: 'Your Name',
                url: siteUrl,
              },
            }),
          }}
        />
      )}
      
      {/* Structured Data - BreadcrumbList */}
      {pathname !== '/' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: siteUrl,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: title,
                  item: canonical,
                },
              ],
            }),
          }}
        />
      )}
      
      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Your Name" />
      <meta name="copyright" content={`© ${new Date().getFullYear()} Your Name`} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="application-name" content="Freelance Developer Portfolio" />
    </Head>
  );
};

export default SEO; 