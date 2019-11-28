const glob = require('glob');
const path = require('path');
const MODULE_PATH = path.resolve(__dirname, './src/pages');
// const resolve = (dir) => path.join(__dirname, dir);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

let modules = [];
modules = process.argv.splice(3);
console.log(`${isProd ? '打包' : '启动'}：`, modules.length === 0 ? ' 全量' : ` 模块：${modules}`);
/**
 * 获取全部模块
 */
function getModules () {
  const moduleNames = [];
  const entryPaths = '*/index.js';
  glob.sync(entryPaths, { cwd: MODULE_PATH }).forEach(entryPath => {
    const module = entryPath.split('/')[0];
    if (!module) {
      console.error(`-------> ${module} 模块不存在，请确认路径以及文件名`);
    } else {
      moduleNames.push(`${module}`);
    }
  });
  return moduleNames;
}
if (modules.length === 0) {
  modules = getModules();
}
/**
 * 组装页面
 */
function setPages () {
  let pages = {};
  modules.forEach((item) => {
    // const htmlPlugin = new HtmlWebpackPlugin({
    //   entry: `src/pages/${item}/index.js`,
    //   template: `src/pages/${item}/index.ftl`,
    //   filename: isProd ? `app/${item}/index.ftl` : `index.ftl`,
    //   chunks: ['chunk-vendors', 'chunk-common', `${item}`],
    //   chunksSortMode: 'dependency'
    // });
    // pages[item] = htmlPlugin.options;
    pages[item] = {
      entry: `src/pages/${item}/index.js`,
      template: `src/pages/${item}/index.ftl`,
      filename: isProd ? `app/${item}/index.ftl` : `${item}.ftl`,
      chunks: ['chunk-vendors', 'chunk-common', `${item}`],
      chunksSortMode: 'dependency'
    };
  });
  return pages;
}

module.exports = {
  pages: setPages(),
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
    port: 8080,
    https: false,
    overlay: {
      warnings: true,
      errors: true
    }
  }
};
