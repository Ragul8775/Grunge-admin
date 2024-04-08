/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
            // Optionally, you can add pathname: '/a/**' to match specific paths
          },
        ],
      },
};

export default nextConfig;
