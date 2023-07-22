const path = require('path');
const fs = require('fs');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const shell = fs.readFileSync('./public/shell.html');
const config = {
  mode: 'production', // 环境模式
  entry: path.resolve(__dirname, './src/main.ts'), // 打包入口
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包出口
    filename: 'js/[name].[chunkhash:8].js', // 打包完的静态资源文件名
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
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, // 4kb
          },
        },
        generator: { filename: 'img/[contenthash:8][ext][query]' },
      },
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
      template: './public/index.ejs',
      templateParameters: { shell },
    }),
  ],
};
// 性能优化
// http 缓存： index.html不缓存， 其它文件nginx设置强缓存并设置超⻓过期时间 Cache-Control: max-age=31536000
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
// 代码压缩
config.optimization = {
  // concatenateModules: true // 作用域提升
  // splitChunks: true,
  // useExports: true, // treeshake(生产默认true)
  // 分包
  splitChunks: {
    chunks: 'initial', // 从入口开始优化
    minSize: 200 * 1000, // 超过这个尺寸的 Chunk 才会正式被分包
    maxSize: 5000 * 1000, //超过这个尺寸的 Chunk 会尝试继续做分包
    maxAsyncSize: 2000 * 1000, //与 maxSize 功能类似，但只对异步引入的模
    minRemainingSize: 2000 * 1000,
    minChunks: 1,
    maxAsyncRequests: 2,
    maxInitialRequests: 30,
    enforceSizeThreshold: 50000,
  },
  minimize: true,
  minimizer: [
    new TerserPlugin({
      // test: /\.js(\?.*)?$/i,
      minify: TerserPlugin.terserMinify, // (默认)
      // 需安装pnpm i @swc/core esbuild -D
      // minify: TerserPlugin.uglifyJsMinify,
      //  minify: TerserPlugin.swcMinify,
      // minify: TerserPlugin.esbuildMinify, terserOptions: {},
    }),
  ],
};

// vue已经编译过，无需再次编译
config.module.noParse = /(^vue$)|(^pinia$)|(^vue-router$)/;

// 分析
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
config.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    analyzerHost: '127.0.0.1',
    analyzerPort: 8889,
    reportFilename: 'report.html',
    defaultSizes: 'parsed',
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    statsOptions: null,
    logLevel: 'info',
  })
);
module.exports = config;
