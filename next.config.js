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
  webpack: (config, {isServer, dev}) => {
    // Ensures that web workers can import scripts.
    config.output.publicPath = '/_next/';

    config.experiments = { asyncWebAssembly: true, layers: true, syncWebAssembly: true };

    if (!dev && isServer) {
      config.output.webassemblyModuleFilename = "chunks/[id].wasm";
      config.plugins.push(new WasmChunksFixPlugin());
    }

    return config;
  },
};

class WasmChunksFixPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("WasmChunksFixPlugin", (compilation) => {
      compilation.hooks.processAssets.tap(
        { name: "WasmChunksFixPlugin" },
        (assets) =>
          Object.entries(assets).forEach(([pathname, source]) => {
            if (!pathname.match(/\.wasm$/)) return;
            compilation.deleteAsset(pathname);

            const name = pathname.split("/")[1];
            const info = compilation.assetsInfo.get(pathname);
            compilation.emitAsset(name, source, info);
          })
      );
    });
  }
}