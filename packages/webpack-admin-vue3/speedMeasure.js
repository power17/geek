const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const config = require('./webpack.dev.config.js');
// 注意，这里是用 `smp.wrap` 函数包裹住 Webpack 配置
module.exports = smp.wrap(config);
