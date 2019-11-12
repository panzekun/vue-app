const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';//生产

module.exports = {
  publicPath: '/',    // 公共路径
  outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist', // 不同的环境打不同包名
  css: {  // 一次配置，全局使用，这个scss 因为每个文件都要引入
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/style/base.scss";`
      }
    }
  },
  lintOnSave: false,  // 关闭eslint
  productionSourceMap: true,  // 生产环境下css 分离文件
  devServer: {   // 配置服务器
    port: 8082,
    open: true,
    https: false,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: { // 配置代理 
    //   '/api': { // 以 “/api” 开头的 代理到 下边的 target 属性 的值 中
    //     target: process.env.VUE_APP_FLAG, // 对应后台的接口
    //     changeOrigin: true, // 是否改变域名
    //     // ws: true,
    //     pathRewrite: {
    //       '^/api': '' // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
    //     }
    //   }
    // }
  },
  // 覆盖webpack默认配置的都在这里
  configureWebpack: config => {
    // 开发生产共同配置
    Object.assign(config.resolve, {
      // 配置解析别名
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@c': path.resolve(__dirname, './src/components'),
        '@s': path.resolve(__dirname, './src/assets/style'),
        '@i': path.resolve(__dirname, './src/assets/images'),
      }
    })

    if (isProduction) { // 开发环境配置
      config.plugins.push(
        //生产环境自动删除console
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true,
        })
      );
    } else { // 生产环境配置
    }
  },
  pwa: {// favicon.ico 图标配置项
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
}