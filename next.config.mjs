/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: 'api.zharim-varim.top',
    //             port: '',
    //             pathname: '/**',
    //         },
    //         {
    //             protocol: 'https',
    //             hostname: 'api.zharim-cafe.ru',
    //             port: '',
    //             pathname: '/**',
    //         },
    //         {
    //             protocol: 'http',
    //             hostname: 'localhost',
    //             port: '8000',
    //             pathname: '/**',
    //         },
    //     ],
    // },
    images: {
        domains: ['localhost', 'zharim-cafe.ru', 'api.zharim-cafe.ru']
    },
};

export default nextConfig;