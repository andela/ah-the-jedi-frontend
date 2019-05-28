const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
<<<<<<< HEAD
<<<<<<< HEAD
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['absolute/path/a', 'absolute/path/b'],
            },
          },
        ],
      },
<<<<<<< HEAD
<<<<<<< HEAD
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url-loader?limit=8192',
        options: { name: '/images/[name].[ext]' },
      },
=======
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
>>>>>>> feat(password-reset): implement password reset
=======
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
>>>>>>> 6daf546... feat(password-reset): implement password reset
=======
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
>>>>>>> 1646809... feat(password-reset): implement password reset
=======
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
>>>>>>> 63de13b... feat(password-reset): implement password reset
    ],
  },
  devServer: {
    contentBase: '/',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
