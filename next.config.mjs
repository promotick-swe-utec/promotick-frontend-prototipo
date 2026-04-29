/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  // Solo usamos basePath, assetPrefix suele ser redundante y causar errores en GitHub Pages
  basePath: isProd ? '/prototipo-promotic' : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig