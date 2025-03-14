/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'auralsonification.netlify.app',
      'oecus-music.com',
      'beretti-audio.netlify.app',
      'netlify.app'
    ],
  },
};

export default nextConfig; 