// webpack.config.js

const path = require('path');

module.exports = {
  // other configurations...

  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      // Add other fallbacks if you encounter similar warnings for other modules
    },
  },

  // other configurations...
};
