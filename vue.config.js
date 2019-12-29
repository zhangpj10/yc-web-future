const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const multipageTools = require('./utils/multipage.js');
const Mock = require('./src/pages/yqcf/mock');

let modules = [];
if (isProd) {
  modules = process.argv[3] ? process.argv[3].split(',') : [];
} else {
  const p = process.argv[process.argv.length - 1];
  const module = p.match(/^--env.m=(.+)/);
  modules = module ? module[1].split(',') : [];
}

console.log(`${isProd ? '打包' : '启动'}：`, modules.length === 0 ? ' 全量' : ` 模块：${modules}`);
if (modules.length === 0) {
  modules = multipageTools.getAllPageName();
}
module.exports = {
  pages: multipageTools.setPages(modules),
  // 输出文件目录
  outputDir: 'dist',
  // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'static',
  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,
  lintOnSave: true,
  runtimeCompiler: true, // 运行时版本是否需要编译
  productionSourceMap: false, // 生成环境下css分离文件
  // Babel 显式转译列表
  transpileDependencies: [],
  chainWebpack: config => {
    // 配置ftl
    config.module
      .rule('htmlVal')
      .test(/\.(ftl|html|htm)$/i)
      .use('html-loader')
      .loader('html-loader');
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  },
  css: {
    // 默认生产环境下是 true，开发环境下是 false
    extract: true,
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    requireModuleExtension: true,
    // css预设器配置项,向 CSS 相关的 l oader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: {
      css: {},
      less: {}
    }
  },
  devServer: {
    host: 'localhost',
    compress: true,
    contentBase: path.join(__dirname, '../src/pages/yqcf/mock'),
    port: 8080,
    https: false,
    overlay: {
      warnings: true,
      errors: true
    },
    before(app) {
      Mock(app)
    }
  }
};
