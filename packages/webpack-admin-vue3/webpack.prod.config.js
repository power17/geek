const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const config = {
  mode: 'production', // 环境模式
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

  resolve: {
    alias: { '@': path.resolve('src') },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
  },
  plugins: [
    autoprefixer,
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      templateContent: ` <!DOCTYPE html> <html> <head> <meta charset="utf-8"> <title>Webpack App</title> </head> <body> <div id="app" /> helloworld</body> </html> `,
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
// sourcemap
config.optimization = {
  minimize: true, //是否压缩
};

config.optimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      // test: /\.js(\?.*)?$/i,
      // minify: TerserPlugin.terserMinify, (默认)
      // 需安装pnpm i @swc/core esbuild -D
      // minify: TerserPlugin.uglifyJsMinify,
      //  minify: TerserPlugin.swcMinify,
      // minify: TerserPlugin.esbuildMinify, terserOptions: {},
    }),
  ],
};

// vue已经编译过，无需再次编译
config.module.noParse = /(^vue$)|(^pinia$)|(^vue-router$)/;
// config.experiments = { lazyCompilation: true }; // 懒加载（开发环境游泳）
config.module.exports = config;
