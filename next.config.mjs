// RUTA: next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Añadimos esta configuración de 'images'
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Permitir cualquier ruta de imagen dentro de este hostname
      },
    ],
  },
};

export default nextConfig;