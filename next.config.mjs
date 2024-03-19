/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      domains: [process.env.NEXT_PUBLIC_HOST?.replace(/^https?:\/\//, '') || 'localhost'],
    },

    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'http',
    //             hostname: process.env('NEXT'),
    //             port: '8000',
    //             // pathname: '/account123/**',
    //         },
    //     ],
    // },

};

export default nextConfig;



