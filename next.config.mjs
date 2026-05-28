/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Fonts are loaded via a runtime <link> in the locale layout (build-safe and
  // offline-friendly). Disable Next's build-time font inlining so it doesn't
  // try to fetch/minify the Google Fonts stylesheet during the build.
  optimizeFonts: false,
};

export default nextConfig;
