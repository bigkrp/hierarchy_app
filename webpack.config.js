var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('[name].css');


var TARGET = process.env.npm_lifecycle_event;

var webpackConfig = {
  cache  : true,
  debug  : true,
  context: __dirname + '/dev',
  entry  : {
    main: './index.js'
  },
  output: {
    path: `${__dirname}/build`,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    sourceMapFilename: '[file].map'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: `${__dirname}/dev`,
      loader: 'babel-loader'
    }, {
      test: /\.scss$/i,
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
    extractCSS
  ]
};

if (TARGET === 'dev' || !TARGET) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
  webpackConfig.devtool = 'cheap-module-source-map';
}
if (TARGET === 'build') {
  webpackConfig.devtool = 'source-map';
}
module.exports = webpackConfig;
