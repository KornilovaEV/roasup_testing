const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Для очистки старой сборки
const CopyPlugin = require('copy-webpack-plugin'); // Копирует статику
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Генерирует HTML-файлы

module.exports = {
  entry: './src/index.js', // Точка входа
  output: {
    filename: '[name].bundle.js', // Имя выходного файла
    path: path.resolve(__dirname, 'dist'), // Папка вывода
    assetModuleFilename: 'assets/[hash][ext]', // Место хранения ресурсов
  },
  resolve: {
    extensions: ['.ts', '.js'], // Расширения файлов, которые будут загружены автоматически
  },
  module: {
    rules: [
      {
        test: /\\.(png|jpg|gif)$/,
        type: 'asset/resource', // Обработка изображений
      },
      {
        test: /\\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Удаление старых бандлов перед новым билдом
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }), // Копируем содержимое public в дистрибутив
    new HtmlWebpackPlugin({
      template: './public/index.html', // Использовать шаблон из public
    }),
  ],
  devServer: {
    static: './dist', // Статический контент берется из папки dist
    port: 8080, // Порт для локального сервера
  },
};
