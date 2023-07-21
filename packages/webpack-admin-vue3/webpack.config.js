const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // 环境模式
  entry: path.resolve(__dirname, './src/main.ts'), // 打包入口
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包出口
    filename: 'js/[name].js', // 打包完的静态资源文件名
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.vue$/, use: ['vue-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // transpileOnly: true, // 关闭项目运行时的类型检查
              appendTsSuffixTo: ['\\.vue$'], // 给 .vue文件添加个
              // happyPackMode: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, './dist'),
    port: 5555,
  },
  resolve: {
    alias: { '@': path.resolve('src') },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      templateContent: ` <!DOCTYPE html> <html> <head> <meta charset="utf-8"> <title>Webpack App</title> </head> <body> <div id="app" /> helloworld</body> </html> `,
    }),
  ],
};
