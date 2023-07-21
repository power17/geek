## webpack 性能优化

#### 1、分析性能工具

- 内置：profile: true
- speedmeasure

```js
"build:report": "webpack --config ./webpack.config.js --json=stats.json",

//官方可视化网址 https://webpack.github.io/analyse/
```

#### 2、构建速度

- 缓存

```js
//  webpack配置
cache: {
    type: 'filesystem',
  },
```
