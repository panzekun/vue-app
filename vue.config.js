const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 导入速度分析插件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// 实例化速度分析插件
const smp = new SpeedMeasurePlugin();
// 多进程并行压缩
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
// 多进程打包
const HappyPack = require("happypack"); // 多进程打包
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length,
});

const isProduction = process.env.NODE_ENV === "production"; //生产

module.exports = {
  publicPath: "./", // 公共路径
  outputDir:  "dist", // 不同的环境打不同包名
  css: {
    // 一次配置，全局使用，这个scss 因为每个文件都要引入
    // 启用 CSS modules
    requireModuleExtension: false,
    // 是否使用css分离插件
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/style/base.scss";@import "./src/assets/style/mixin.scss";`,
      },
    },
  },
  lintOnSave: false, // 关闭eslint
  productionSourceMap: false, // 去除 SourceMap,由于打包后的文件经过了压缩、合并、混淆、babel编译后的代码不利于定位分析bug。
  devServer: {
    // 配置服务器
    port: 8082,
    open: true,
    https: false,
    disableHostCheck: true, //映射穿透natapp
    overlay: {
      warnings: false,
      errors: true,
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
  // webpack内部配置
  chainWebpack: (config) => {
    const jsRule = config.module.rule("js");
    jsRule.uses.clear();
    jsRule
      .use("happypack/loader?id=babel")
      .loader("happypack/loader?id=babel")
      .end();
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    // 移除 preload 插件
    config.plugins.delete("preload");
    // 提取公共代码
    config.optimization.splitChunks({
      chunks: "all", //默认作用于异步chunk，值为all/initial/async
      minSize: 30000, //默认值是30kb,代码块的最小尺寸
      minChunks: 1, //被多少模块共享,在分割之前模块的被引用次数
      maxAsyncRequests: 5, //按需加载最大并行请求数量
      maxInitialRequests: 3, //一个入口的最大并行请求数量
      name: true, //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔开，如vendor~
      automaticNameDelimiter: "~", //默认webpack将会使用入口名和代码块的名称生成命名,比如 'vendors~main.js'
      cacheGroups: {
        //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
        vendors: {
          chunks: "initial",
          test: /node_modules/, //条件
          priority: -10, ///优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中,为了能够让自定义缓存组有更高的优先级(默认0),默认缓存组的priority属性为负值.
        },
        commons: {
          chunks: "initial",
          minSize: 0, //最小提取字节数
          minChunks: 2, //最少被几个chunk引用
          priority: -20,
          reuseExistingChunk: true, //    如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
        },
      },
    });
    config.optimization.runtimeChunk("single");
  },
  // webpack默认配置
  configureWebpack: smp.wrap({
    resolve: {
      // 配置解析别名
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@c": path.resolve(__dirname, "./src/components"),
        "@s": path.resolve(__dirname, "./src/assets/style"),
        "@i": path.resolve(__dirname, "./src/assets/images"),
      },
    },
    plugins: [
      new ParallelUglifyPlugin({
        cacheDir: ".cache/",
        uglifyJS: {
          output: {
            comments: false,
          },
          warnings: false,
          compress: {
            drop_debugger: true,
            drop_console: false,
          },
        },
      }),
      new HappyPack({
        id: "babel",
        loaders: ["babel-loader?cacheDirectory=true"],
        threadPool: happyThreadPool,
      }),
    ],
  }),

  pwa: {
    // favicon.ico 图标配置项
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico",
    },
  },
};
