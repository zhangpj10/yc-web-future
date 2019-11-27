const glob = require('glob')
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

const PAGES_PATH = './src/pages/*/*.js'

module.exports = {
  pages: setPages(),
  // TODO：以下内容非生成多页应用必须配置
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    /**
     * 添加别名
     */
    config.resolve.alias
      .set('@index', resolve('src/pages/index'))
      .set('@label', resolve('src/pages/label'))
      .set('@metrics', resolve('src/pages/metric'))
      .set('@service', resolve('src/pages/service'))
      .set('@stocktake', resolve('src/pages/stocktake'))
    /**
     * 菜单icon处理为svg-sprite
     */
    config.module
      .rule('svg')
      .exclude
      .add(resolve('src/assets/icons/menus'))
      .end()
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/assets/icons/menus')) // 处理目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}

/**
 * 组装页面
 */
function setPages () {
  let pages = {}
  glob.sync(PAGES_PATH).forEach(filepath => {
    let fileList = filepath.split('/')
    let fileName = fileList[fileList.length - 2]

    pages[fileName] = {
      entry: filepath,
      template: 'public/index.html',
      filename: `${fileName}.html`,
      // title:
      chunks: ['chunk-vendors', 'chunk-common', fileName]
    }
  })
  return pages
}