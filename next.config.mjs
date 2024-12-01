/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback = {
            fs: false,
            crypto: false,
            path: false,
          };
        }
        return config;
      },
};

export default nextConfig;

