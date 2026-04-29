/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // If your repository is not at the root (e.g., username.github.io/repo-name), 
  // you might need to add:
  // basePath: '/repo-name',
}

export default nextConfig
