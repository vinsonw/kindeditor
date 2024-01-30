const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 *
 * @type {import('webpack').Configuration}
 */
const devConfig = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/dev.js'),
  devServer: {
    // 注意: themes, langs, plugins 文件夹是运行时依赖，需要dev server能在根目录下访问到
    static: path.resolve(__dirname),
    open: true
  },
  output: {
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    })
  ]
}

module.exports = devConfig
