const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  // argv.mode is set by webpack --mode=... option.
  // Can be 'production', 'development' or undefined. All three result to a different bundle.
  const isProduction = argv.mode === 'production';
  return {
    entry: './src/index.ts',
    target: 'node',
    mode: argv.mode || 'none',
    devtool: isProduction ? 'source-map' : undefined,
    externalsPresets: { node: true },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      library: {
        type: 'commonjs',
      },
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
            keep_fnames: true,
            sourceMap: isProduction,
          },
        }),
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'src/public', to: 'public', noErrorOnMissing: true },
        ],
      }),
      new ZipPlugin({
        filename: 'bundle.zip',
        include: ['index.js', 'index.js.map', /^public\/.*$/],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/i,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
          type: 'asset',
        },

        // Add your rules for custom modules here
        // Learn more about loaders from https://webpack.js.org/loaders/
      ],
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin({})],
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
  };
};
