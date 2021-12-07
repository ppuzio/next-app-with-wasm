const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

const {
  dirname,
  relative,
  resolve,
  join,
} = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    // Ensures that web workers can import scripts.
    config.output.publicPath = '/_next/';

    config.experiments = { asyncWebAssembly: true, syncWebAssembly: true };

    config.plugins.push(
      new WasmPackPlugin({
        crateDirectory: resolve('./'),
      })
    );

    return config;
  },
};
