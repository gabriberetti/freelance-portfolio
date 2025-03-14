# Modern Portfolio Website

A creative developer portfolio website built with Next.js, TypeScript, Tailwind CSS, and GSAP animations.

## Features

- **Full-Page Scroll-Snap**: Smooth section transitions using CSS Scroll Snap
- **Responsive Design**: Fully responsive layout with adaptive typography
- **GSAP Animations**: Advanced animations including text reveals, staggered animations, and scroll-triggered effects
- **Custom Cursor**: Interactive custom cursor with hover states
- **Multi-Language Greeting**: Animated greeting text in multiple languages
- **Live Local Time**: Real-time local time display in the contact section
- **Optimized Performance**: Lazy loading images and performance optimizations

## Tech Stack

- **Frontend Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP (with ScrollTrigger and SplitText plugins)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and animations
│   ├── styles/         # Global styles
│   └── assets/         # Images and fonts
└── ...config files
```

## Customization

### Changing Content

- Update text content in the respective component files
- Replace project images and information in `WorkSection.tsx`
- Update skills and bio in `AboutSection.tsx`
- Modify contact information in `ContactSection.tsx`

### Styling

- Global styles are defined in `src/styles/globals.css`
- Tailwind theme configuration is in `tailwind.config.js`
- Custom animations are in `src/lib/animations.ts`

## Deployment

The easiest way to deploy this application is using [Vercel](https://vercel.com/), the platform built by the creators of Next.js:

```bash
npm install -g vercel
vercel
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Design inspiration: [Dennis Snellenberg](https://dennissnellenberg.com/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/)
- [Unsplash](https://unsplash.com/) for placeholder images 