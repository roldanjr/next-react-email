/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination:
          process.env.NODE_ENV === "production"
            ? "https://roldanjr.github.io/next-react-email/"
            : "http://localhost:4000/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
