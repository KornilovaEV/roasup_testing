   const path = require('path');
   const { CleanWebpackPlugin } = require('clean-webpack-plugin');
   const HtmlWebpackPlugin = require('html-webpack-plugin');

   module.exports = {
     mode: 'development',
     entry: './src/index.js',
     output: {
       filename: '[name].bundle.js',
       path: path.resolve(__dirname, 'dist'),
     },
     module: {
       rules: [
         // правила обработки модулей
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource', // или 'asset', если нужно авто-инлайнить мелкие
        },
       ],
     },
     plugins: [
       new CleanWebpackPlugin(),
       new HtmlWebpackPlugin({
         template: './index.html', 
       }),
     ],
     devServer: {
       static: './dist',
       port: 8080,
     },
   };