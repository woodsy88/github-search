const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// export web pack configs
module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader'},
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.svg$/, use: ['svg-inline-loader'] }
    ]
  },
  mode: 'development', 
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ]
}