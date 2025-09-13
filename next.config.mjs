// RUTA: next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Añadimos esta configuración de 'images'
  images: {
    remotePatterns: [
        {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'fghilqtcpxqlmbhpuboc.supabase.co', // Hostname de tu Supabase
      },
    ],
  },
};

export default nextConfig;