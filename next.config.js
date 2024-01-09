/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [`${process.env.NEXT_PUBLIC_BUCKET_URL.replace("https://", "")}`],
    formats: ["image/webp"],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
      {
        source: "/",
        destination: "/index",
      },
    ];
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
