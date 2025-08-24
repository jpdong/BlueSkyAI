import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pub-49226d2453874d85b88aef83b1496125.r2.dev',
                port: '',
                pathname: '/**',
            },
        ],
    },
    async redirects() {
        return [
            {source: '/en', destination: '/', permanent: true},
            {source: '/stickers/1', destination: '/stickers', permanent: true},
            {source: '/stickers/0', destination: '/stickers', permanent: true},
            {source: '/:locale/stickers/1', destination: '/:locale/stickers', permanent: true},
            {source: '/:locale/stickers/0', destination: '/stickers', permanent: true},
        ];
    }
};

export default withNextIntl(nextConfig);
