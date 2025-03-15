import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import JsonLdSchema from '@/components/JsonLdSchema';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Freelance Web Developer | Full-Stack Developer Portfolio',
  description: 'Expert freelance full-stack developer specializing in modern web development, interactive UX/UI design, and custom web applications using React, Next.js, and Node.js.',
  keywords: [
    'Freelance web developer', 
    'Full-stack developer for hire', 
    'Creative web designer', 
    'Web software developer', 
    'Portfolio website developer', 
    'MERN stack developer', 
    'UX/UI designer and developer', 
    'Custom web application developer',
    'Next.js and React developer',
    'Interactive website development'
  ],
  viewport: 'width=device-width, initial-scale=1.0',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://yourwebsite.com',
  },
  openGraph: {
    title: 'Freelance Web Developer | Full-Stack Developer Portfolio',
    description: 'Expert freelance full-stack developer specializing in modern web development, interactive UX/UI design, and custom web applications using React, Next.js, and Node.js.',
    url: 'https://yourwebsite.com',
    siteName: 'Freelance Developer Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Freelance Web Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freelance Web Developer | Full-Stack Developer Portfolio',
    description: 'Expert freelance full-stack developer specializing in modern web development, interactive UX/UI design, and custom web applications.',
    images: ['https://yourwebsite.com/twitter-image.jpg'],
    creator: '@yourtwitterhandle',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  authors: [{ name: 'Your Name', url: 'https://yourwebsite.com' }],
  creator: 'Your Name',
  publisher: 'Your Name',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#000000" />
        <JsonLdSchema type="website" />
        <JsonLdSchema type="person" />
        <JsonLdSchema type="portfolio" />
      </head>
      <body className="bg-secondary text-primary">
        {children}
      </body>
    </html>
  );
} 