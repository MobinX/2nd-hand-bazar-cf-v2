/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            // pathname: '/account123/**',
          },
        ],
      },
      experimental: {
        serverActions: {
            allowedOrigins: [
                "https://jubilant-broccoli-vqwr5jgjrxj2rpg-3000.app.github.dev/",
                "localhost:3000",
            ],
        },
    },
};

export default nextConfig;
