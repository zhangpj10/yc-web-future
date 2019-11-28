const path = require('path');
const fs = require('fs');

const URL = process.env.url; // 默认只加载一个文件 singlepage || multipage
const NODE_ENV = process.env.NODE_ENV; // process环境变量

if (NODE_ENV === 'production' && URL === undefined) throw new Error('当前打包命令缺少url参数！')

const config = {
  entry: 'index.js',
  html: 'index.ftl',
  pagesRoot: path.resolve(__dirname, '../src/pages')
};

const getRoutes = () => {
  const allRoutes = [];

  const findAllRoutes = (source, routes) => {
    const globFiles = fs.readdirSync(source);
    // 有URL 就默认加载那个指定的项目， 没有就加载全部的 [ *.js ];
    const files = URL ? [globFiles.find(item => item.includes(URL))] : globFiles;
    files.forEach(filename => {
      const fullname = path.join(source, filename);
      const stats = fs.statSync(fullname);
      if (!stats.isDirectory()) return;
      // 检测给定的路径是否存在。
      if (fs.existsSync(`${fullname}/${config.html}`)) {
        routes.push(fullname);
      } else {
        findAllRoutes(fullname, routes);
      }
    });
  };
  findAllRoutes(config.pagesRoot, allRoutes);
  return allRoutes;
};

const getPages = () => {
  const pages = {};

  getRoutes().forEach(route => {
    let filename = route.slice(config.pagesRoot.length + 1);
    pages[filename] = {
      entry: `${route}/${config.entry}`,
      template: `${route}/${config.html}`,
      // 兼容dev开发模式时 serve 全量项目和单个项目
      filename: URL ? config.html : `${filename}/${config.html}`
    };
  });
  // console.log(pages);
  return pages;
};

module.exports = {
  getRoutes,
  getPages
};
