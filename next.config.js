/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com', 'api.dicebear.com'],
    dangerouslyAllowSVG: true, // Enable SVG support
  }
}
