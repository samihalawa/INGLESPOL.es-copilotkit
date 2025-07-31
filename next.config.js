/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_MODEL: process.env.OPENAI_MODEL,
    OPENAI_API_ENDPOINT: process.env.OPENAI_API_ENDPOINT,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig