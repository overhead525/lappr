module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.module.rules.push({
      test: /\.worker\.js$/,
      use: [{ loader: "worker-loader" }],
    });

    // Important: return the modified config
    return config;
  },
};
