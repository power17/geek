const path = require('path');
const fs = require('fs');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const shell = fs.readFileSync('./public/shell.html');

const config = {
  mode: 'development', // 环境模式
  entry: path.resolve(__dirname, './src/main.ts'), // 打包入口
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包出口
    filename: 'js/[name].js', // 打包完的静态资源文件名
    publicPath: '/',
  },

  // profile: true, // 内置性能分析选项
  module: {
    rules: [
      { test: /\.vue$/, use: ['vue-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // transpileOnly: true, // 关闭项目运行时的类型检查
              appendTsSuffixTo: ['\\.vue$'], // 给 .vue文件添加个
              // happyPackMode: true, // 并行处理（效果不理想）
            },
          },
        ],
      },
      { test: /\.(png|jpe?g|gif|webp)(\?.*)?$/, type: 'asset', generator: { filename: 'img/[contenthash:8][ext][query]' } },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, './dist'),
    port: 5555,
    historyApiFallback: true, // 支持history 模式
  },
  resolve: {
    alias: { '@': path.resolve('src') },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
  },
  plugins: [
    autoprefixer,
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.ejs',
      templateParameters: { shell },
    }),
  ],
};
// 性能优化
// 文件缓存
config.cache = {
  type: 'filesystem',
};
// 约束loader范围
config.module.rules.map((v) => {
  v.exclude = /node_modules/;
});
// vue已经编译过，无需再次编译
config.module.noParse = /(^vue$)|(^pinia$)|(^vue-router$)/;
// 开发模式减少代码优化，提高构建速度
config.optimization = {
  removeAvailableModules: false, //如果模块已经包含在所有父级模块中，从 chunk 中检测出这些模块
  removeEmptyChunks: false, // 如果 chunk 为空，告知 webpack 检测或移除这些 chunk
  splitChunks: false, // 代码分包
  minimize: false, //代码压缩
  concatenateModules: false, // 模块连接
  usedExports: false, // Treeshaking
};
// sourcemap
config.devtool = 'eval'; //最佳性能 查看不了源代码   devtool: 'eval-cheap-module-source-map'
// config.experiments = { lazyCompilation: true }; // 懒加载（开发环境游泳）
module.exports = config;
