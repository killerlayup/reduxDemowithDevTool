var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  //页面入口文件配置
  entry: [
    'webpack-hot-middleware/client',
    './src/app/index'
  ],
  //入口文件输出配置
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  //插件项
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.DefinePlugin({
        __DEBUG__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    })
  ],
  eslint: {
    configFile: '.eslintrc'
  },
  /**
   * If need eslint, add it in loaders.
   * {test: /\.js$/,loader: "eslint-loader",exclude: /node_modules/,}
   */

  module: {
    //加载器配置告知 webpack 每一种文件都需要使用什么加载器来处理 注意所有的加载器都需要通过 npm 来加载
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src/app')
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }, {
      test: /\.css$/, // Only .css files
      loader: 'style!css' // Run both loaders
    },
    {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}]
  },
  //其它解决方案配置
  resolve: {

  }
};
