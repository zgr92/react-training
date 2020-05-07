const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var config = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
    }),
  ],
};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'eval-source-map';
    config.devServer.contentBase = './dist';
  }

  if (argv.mode === 'production') {
    
  }

  return config;
};