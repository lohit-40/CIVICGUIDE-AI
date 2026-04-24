/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Firebase Google Sign-in profile pics
      },
    ],
  },
  // output: 'standalone' is highly recommended for Docker/Google Cloud Run
  output: 'standalone',
};

export default nextConfig;
