/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
        pathname: "/api/**",
      },
    ],
    localPatterns: [
      {
        pathname: "/api/placeholder/**/**/**",
        // search is omitted, so ?v=123, ?t=456, or no query string are all allowed
      },
      {
        pathname: "/images/**",
        // search is omitted, so ?v=123, ?t=456, or no query string are all allowed
      },
    ],
  },
}

export default nextConfig
