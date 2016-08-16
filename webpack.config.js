var webpack            = require('webpack');
var merge              = require('webpack-merge');
// var NpmInstallPlugin   = require('npm-install-webpack-plugin');
var ExtractTextPlugin  = require('extract-text-webpack-plugin');
// var HtmlWebpackPlugin  = require('html-webpack-plugin');
// var CleanWebpackPlugin = require('clean-webpack-plugin');
var extractCSS = new ExtractTextPlugin('[name].css');

// var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: __dirname + '/dev/index.html',
//   filename: 'index.html',
//   inject  : 'body'
// });

var TARGET = process.env.npm_lifecycle_event;

var common = {
  cache  : true,
  debug  : true,
  context: __dirname + '/dev',
  entry  : {
    main: './index.js'
  },
  // entry: [
  //     './app/index.js'
  // ],
  output: {
    path: `${__dirname}/build`,
    // publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    sourceMapFilename: '[file].map'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  // devtool: 'eval-source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: `${__dirname}/dev`,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }, {
      test: /\.scss$/i,
      // loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap'),
      loader: extractCSS.extract(['css?sourceMap','sass?sourceMap'])
    }, {
      test: /\.woff2?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]'
    }, {
      test: /\.(eot|ttf|svg|gif|png)$/,
      loader: 'file-loader?name=[path][name].[ext]?[hash]'
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    extractCSS
    // new ExtractTextPlugin('[name].css')
  ]
};

if (TARGET === 'dev' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    devServer: {
      port: 8090,
      historyApiFallback: true,
      // hot: false,
      contentBase: `${__dirname}/build`
    },
    // watch: true,
    // plugins: [
    //   new NpmInstallPlugin({
    //     save: true // --save
    //   })
    // ]
  });
}
if (TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'source-map'
    // output: {
    //   path: `${__dirname}/dist`
    // },
    // plugins: [
    //   HTMLWebpackPluginConfig
    // ]
  });
}
