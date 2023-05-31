/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "scontent.fsgn5-15.fna.fbcdn.net",
      },
    ],
  },
};

module.exports = nextConfig;
