/** @type {import('next').NextConfig} */

const nextConfig = {

    // images: {
    //   domains: [process.env.NEXT_PUBLIC_HOST?.replace(/^https?:\/\//, '') || 'localhost'],
    // },
    // distDir: 'build',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.1.25',
            },
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_HOST?.replace(/^https?:\/\//, ''),
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
            },
        ],


    },

};

export default nextConfig;



