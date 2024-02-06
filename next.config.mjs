/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "*.googleusercontent.com",
          port: "",
        //   google uses 'a' for avatars
          pathname: "/a/**",
        },
      ],
    },
};

export default nextConfig;
