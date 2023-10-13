/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    externalDir: true // compile files that are located next to the .react-email directory
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  output: "export",
  distDir: "../email-templates-docs",
  basePath: process.env.NODE_ENV === "production" ? "/next-react-email" : "",
};

module.exports = nextConfig;