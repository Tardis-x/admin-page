const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: [
        'webpack-dev-server/client?http://localhost:8080', // live reload
        './app/tardis-app.js'
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'dist'),
    hot: true
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist')
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(html)$/,
  //       use: {
  //         loader: 'html-loader'
  //       }
  //     }
  //   ]
  // },
  resolve: {
    alias: {
      config: `${path.resolve(process.cwd(), 'app')}/config/${process.env.NODE_ENV}`,
    },
    extensions: ['.js'],
    modules: ['app', 'node_modules', 'node_modules/@polymer'],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { verbose: true, root: path.resolve(__dirname, '..') }),
    // new CommonsChunkPlugin({
    //   // The order of this array matters
    //   names: ['vendor'],
    //   minChunks: Infinity
    // }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      // {
      //   from: path.resolve(__dirname, '../static'),
      //   to: 'static',
      //   ignore: ['.*']
      // },
      {
        from: path.resolve(__dirname, '../node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js')
      }
    ]),
    new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.(js|html)$/,
		}),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
