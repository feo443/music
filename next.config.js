/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuración de imágenes para Supabase
  images: {
    domains: ['uhbyeuaiulxqlrhexwue.supabase.co']
  },
  // Configuración para que Next.js y Remix coexistan
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig; 