const path = require('path')
const htmlWebPackPlugin = require('html-webpack-plugin')

const output = {
  libraryTarget: 'global',
  publicPath: '/',
}

const devServer = {
  compress: true,
  watchContentBase: true,
  contentBase: path.resolve(__dirname, 'src'),
  port: 8080,
  disableHostCheck: true,
  historyApiFallback: true,
}

const modules = {
  rules: [
    {
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    },
    {
      test: /\.s[ac]ss$/i,
      exclude: /node_modules/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
        },
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf|png|jpe?g|gif|svg)$/,
      exclude: /node_modules/,
      use: ['file-loader'],
    },
  ],
}

const resolve = {
  extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
  alias: {
    assets: path.resolve(__dirname, './src/theme/assets'),
  },
}

const plugins = [
  new htmlWebPackPlugin({
    template: path.resolve(__dirname, 'src', 'index.html'),
    filename: './index.html',
  }),
]

const defineWebpackConfig = {
  output,
  devServer,
  module: modules,
  resolve,
  plugins,
  devtool: 'source-map',
}

module.exports = defineWebpackConfig
