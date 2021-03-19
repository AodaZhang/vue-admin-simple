/**
 * @description @vue/cli配置文件
 * @author aodazhang 2021.03.09
 */
const path = require('path')
const merge = require('webpack-merge')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const {
  title,
  port,
  open,
  publicPath,
  isAnalyzer,
  modifyVars
} = require('./project.config')
const devServerConfig = require('./mock')

// 1.webpack配置项
let configureWebpack = {
  performance: false,
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'less-loader',
            options: {
              // less@3以上版本antdv动态引入less报错：https://github.com/ant-design/ant-design/issues/7927#issuecomment-372467214
              javascriptEnabled: true,
              // 覆盖antdv样式定义
              modifyVars
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 引入dayjs替换antdv的momentjs：https://github.com/ant-design/antd-dayjs-webpack-plugin
    new AntdDayjsWebpackPlugin({
      preset: 'antdv3'
    })
  ]
}

// 开发配置
if (process.env.NODE_ENV === 'development') {
  const devConfig = {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      port,
      open,
      ...devServerConfig
    }
  }
  configureWebpack = merge(configureWebpack, devConfig)
}

// 生产配置
if (process.env.NODE_ENV === 'production') {
  const prodConfig = {
    devtool: 'none',
    plugins: [
      // 配置gzip压缩插件
      new CompressionWebpackPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip', // 压缩算法
        test: /\.html$|\.css$|\.js$/,
        threshold: 0, // 压缩尺寸阈值
        minRatio: 0.8, // 压缩比例阈值
        deleteOriginalAssets: false // 是否删除原文件
      })
    ]
  }
  isAnalyzer &&
    prodConfig.plugins.push(
      // 配置analyzer包分析工具
      new BundleAnalyzerPlugin({
        openAnalyzer: false, // 是否启动本地服务
        analyzerMode: 'static', // 只输出静态html文件
        reportFilename: 'analyzer.html' // 分析文件名称
      })
    )
  configureWebpack = merge(configureWebpack, prodConfig)
}

// 2.@vue/cli配置项
const configureVueCli = {
  pages: {
    index: {
      entry: 'src/main.ts',
      title
    }
  },
  publicPath, // 配置静态资源路径
  lintOnSave: false // eslint在保存时不校验
}

module.exports = {
  configureWebpack,
  ...configureVueCli
}
