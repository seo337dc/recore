const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  webpack5: true,
  compress: true,
  webpack(config, options) {
    if (!options.dev) {
      config.devtool = options.isServer ? false : "hidden-source-map";
    }

    return config;
  },
});
