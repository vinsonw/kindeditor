const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin =  require('copy-webpack-plugin')
/**
 * 
 * @param {*} env 
 * @returns {import('webpack').Configuration}
 */
const devConfig = (env) => ({
  mode: 'development',
  entry: path.resolve(__dirname, './src/dev.js'),
  devServer: {
    static: path.resolve(__dirname)
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    // publicPath: path.resolve(__dirname, './public')
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './demo/index.html'),
  }),
  new CopyWebpackPlugin({
    patterns: [
      {from: path.resolve(__dirname, './themes'), to: path.resolve(__dirname, './dist/themes') },
      {from: path.resolve(__dirname, './lang'), to: path.resolve(__dirname, './dist/lang') }
    ]
  })
]
})
module.exports = (env) => {
  return devConfig(env)
}