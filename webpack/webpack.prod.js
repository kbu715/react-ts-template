const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  mode: 'production',
  devtool: 'source-map', // create-react-app recommends for production
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('paulProd'),
    }),
    new BundleAnalyzerPlugin(),
  ],
}
