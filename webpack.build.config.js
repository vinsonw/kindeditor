const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
/**
 *
 * @type {import('webpack').Configuration}
 */
const libBuildConfig = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/K.js'),
  output: {
    library: {
      type: 'umd'
    }
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, './themes'), to: path.resolve(__dirname, './dist/themes') },
        { from: path.resolve(__dirname, './lang'), to: path.resolve(__dirname, './dist/lang') },
        {
          from: path.resolve(__dirname, './plugins'),
          to: path.resolve(__dirname, './dist/plugins')
        },
        {
          from: path.resolve(__dirname, './demo/index.html'),
          to: path.resolve(__dirname, './dist/demo.html')
        }
      ]
    })
  ]
}
module.exports = libBuildConfig
