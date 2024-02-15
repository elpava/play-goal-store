/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production'

const nextConfig = {
  compiler: {
    removeConsole: isProduction,
  },
}

export default nextConfig
