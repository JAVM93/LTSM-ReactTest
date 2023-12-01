// config-overrides.js
const path = require('path');

module.exports = function override(config) {
  // Add the following resolve fallback options
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "zlib": require.resolve("browserify-zlib"),
    "stream": require.resolve("stream-browserify"),
  };

  return config;
}
