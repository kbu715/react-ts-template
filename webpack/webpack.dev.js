const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map', // which create-react-app recommends for dev env
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('paulDev'),
    }),
  ],
}