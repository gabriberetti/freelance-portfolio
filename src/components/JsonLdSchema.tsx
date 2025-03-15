import React from 'react';

interface JsonLdSchemaProps {
  type?: 'person' | 'organization' | 'website' | 'portfolio';
}

const JsonLdSchema: React.FC<JsonLdSchemaProps> = ({ type = 'website' }) => {
  // Base schema for the website
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Freelance Web Developer Portfolio',
    url: 'https://yourwebsite.com',
    description: 'Expert freelance full-stack developer specializing in modern web development, interactive UX/UI design, and custom web applications using React, Next.js, and Node.js.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://yourwebsite.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  // Person schema for the portfolio owner
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Your Name',
    url: 'https://yourwebsite.com',
    jobTitle: 'Freelance Full-Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Self-Employed'
    },
    sameAs: [
      'https://twitter.com/yourtwitterhandle',
      'https://github.com/yourgithubhandle',
      'https://linkedin.com/in/yourlinkedinhandle'
    ],
    knowsAbout: [
      'Web Development',
      'UX/UI Design',
      'React',
      'Next.js',
      'Node.js',
      'MongoDB',
      'Full-Stack Development'
    ]
  };

  // Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Your Name - Freelance Developer',
    url: 'https://yourwebsite.com',
    logo: 'https://yourwebsite.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-123-456-7890',
      contactType: 'customer service',
      email: 'contact@yourwebsite.com',
      availableLanguage: ['English']
    },
    sameAs: [
      'https://twitter.com/yourtwitterhandle',
      'https://github.com/yourgithubhandle',
      'https://linkedin.com/in/yourlinkedinhandle'
    ]
  };

  // Portfolio schema with creative work series
  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    name: 'Web Development Portfolio',
    author: {
      '@type': 'Person',
      name: 'Your Name',
      jobTitle: 'Freelance Full-Stack Developer'
    },
    workExample: [
      {
        '@type': 'WebSite',
        name: 'Aural Project',
        url: 'https://yourwebsite.com/projects/aural',
        image: 'https://yourwebsite.com/aural.png',
        description: 'An interactive audio visualization web application'
      },
      {
        '@type': 'WebSite',
        name: 'Oecus Project',
        url: 'https://yourwebsite.com/projects/oecus',
        image: 'https://yourwebsite.com/oecus.png',
        description: 'A modern e-commerce platform with advanced filtering'
      },
      {
        '@type': 'WebSite',
        name: 'Beretti Audio',
        url: 'https://yourwebsite.com/projects/berettiaudio',
        image: 'https://yourwebsite.com/berettiaudio.png',
        description: 'A professional audio equipment showcase website'
      },
      {
        '@type': 'WebSite',
        name: 'Hello Body',
        url: 'https://yourwebsite.com/projects/hellobody',
        image: 'https://yourwebsite.com/hellobody.png',
        description: 'A wellness and fitness tracking application'
      }
    ],
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

  // Select the appropriate schema based on the type prop
  let schema;
  switch (type) {
    case 'person':
      schema = personSchema;
      break;
    case 'organization':
      schema = organizationSchema;
      break;
    case 'portfolio':
      schema = portfolioSchema;
      break;
    default:
      schema = websiteSchema;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLdSchema; 