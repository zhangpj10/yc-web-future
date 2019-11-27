const glob = require('glob');
const path = require('path');
const MODULE_PATH = path.resolve(__dirname, './src/pages');
// const resolve = (dir) => path.join(__dirname, dir);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

let params;
if (isProd) {
  params = process.argv.slice(3)[0];
} else {
  const p = process.argv[process.argv.length - 1];
  const module = p.match(/^--env.m=(.+)/);
  params = module ? module[1] : undefined;
}
console.log(`${isProd ? '打包' : '启动'}：`, params === undefined ? ' 全量' : ` 模块：${params}`);

/**
 * 组装页面
 */
function setPages () {
  let pages = {};
  const entryPaths = params === undefined ? '*/index.js' : `${params}/index.js`;
  glob.sync(entryPaths, { cwd: MODULE_PATH }).forEach(entryPath => {
    const module = entryPath.split('/')[0];
    // const filename = `index.${isProd ? 'ftl' : 'html'}`;
    const htmlPlugin = new HtmlWebpackPlugin({
      entry: `src/pages/${module}/index.js`,
      template: `src/pages/${module}/index.ftl`,
      // filename: isProd ? path.posix.join(path.resolve(__dirname, '../dist'), `/pages`, filename) : filename,
      filename: `app/${module}/index.ftl`,
      chunks: ['chunk-vendors', 'chunk-common', `${module}`]
    })
    pages[module] = htmlPlugin.options;
  });
  return pages;
}

module.exports = {
  pages: setPages(),
  // 输出文件目录
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    // 配置ftl
    config.module
      .rule('htmlVal')
      .test(/\.(ftl|html|htm)$/i)
      .use('html-loader')
      .loader('html-loader');
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: true,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  }
};
