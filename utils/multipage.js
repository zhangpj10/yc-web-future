const glob = require('glob');
const path = require('path');
const MODULE_PATH = path.resolve(__dirname, '../src/pages');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  getAllPageName: () => {
    const pageNames = [];
    const entryPaths = '*/index.js';
    glob.sync(entryPaths, { cwd: MODULE_PATH }).forEach(entryPath => {
      const module = entryPath.split('/')[0];
      if (!module) {
        console.error(`-------> ${module} 模块不存在，请确认路径以及文件名`);
      } else {
        pageNames.push(`${module}`);
      }
    });
    return pageNames;
  },
  setPages: (modules) => {
    let pages = {};
    modules.forEach((module) => {
      const curPath = path.join(MODULE_PATH, `\\${module}\\index.js`);
      glob.sync(curPath).forEach(filePath => {
        pages[module] = {
          entry: filePath,
          template: path.dirname(filePath) + '/index.ftl',
          filename: isProd ? `app/${module}/index.ftl` : `${module}.ftl`,
          chunks: ['chunk-vendors', module]
        };
      });
    });
    return pages;
  }
};
