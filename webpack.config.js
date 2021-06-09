const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const isProd = process.env.NODE_ENV === 'production'
// const isDev = !isProd

// console.log('IS PROD', isProd)
// console.log('IS isDev', isDev)

// const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`
// const jsLoaders = () => {}

module.exports = {
   context: path.resolve(__dirname, 'src'),
   mode: 'development',
   entry: './index.js',
   output: {
      filename: "bundle.[hash].js",
      path: path.resolve(__dirname, 'dist'),
   },
   resolve: {
      extensions: ['.js'],
      // import '../../.../core/component'
      alias: {
         '@': path.resolve(__dirname, 'src'),
         '@core': path.resolve(__dirname, 'src/core'),
      }
   },
   // devtool: isDev ? 'source-map' : false,
   devServer: {
      port: 3000
      // hot: 'production'
   },
   plugins: [
      new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
         template: "index.html",
         minify: {
            removeComments: true, //isProd
            collapseWhitespace: true //isProd
         }
      }),
      new CopyPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, 'src/favicon.ico'),
               to: path.resolve(__dirname, 'dist')
            }
         ]
      }),
      new MiniCssExtractPlugin({
         filename: 'bundle.[hash].css' //filename('css')
      })
   ],
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: [
               // Create 'style' nodes from JS strings
               MiniCssExtractPlugin.loader,
               // 'style-loader',
               // Translate CSS into CommonJS
               'css-loader',
               // Compile Sass to CSS
               'sass-loader',
            ]
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            // use: jsLoaders,
            loader: 'babel-loader',
            options: {
               presets: ['@babel/preset-env']
            }
         }
      ]
   }
};
