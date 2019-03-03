const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  resolve: {
    modules: ['node_modules'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*']),
    new CopyPlugin([
      { from: './node_modules/chessboardjs/www/releases/0.3.0/img', to: 'img' },
      { from: './src/index.html', to: 'index.html' },
    ]),
  ],
  mode: 'development'
}
