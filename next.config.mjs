/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    // Demo only. Before launch these move to self-hosted files in public/images.
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
  reactStrictMode: true,
};

export default nextConfig;
