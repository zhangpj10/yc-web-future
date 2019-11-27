const path = require('path');
const fs = require('fs');
const glob = require('glob');

// 配置选项
const config = {
    pages: getPages()
};

// 获取多页面的配置数据
function getPages() {
    const pages = {};
    
    glob.sync('./src/pages/**/*.vue').forEach(function (pageUrl) {
        const ext = path.extname(pageUrl);
        const pageCode = path.basename(pageUrl, ext);
        
        // 生成入口文件
        const entryFile = `./entry/${pageCode}.js`;
        fs.exists(entryFile, function (exists) {
            if(exists) return;
            // 创建文件及写入文件内容
            const appTpl = '.' + pageUrl;
            const entryData = `import Vue from 'vue';\nimport App from '${appTpl}';\nVue.config.productionTip = false;\nnew Vue({ render: h => h(App) }).$mount('#${pageCode}'); `;
            fs.writeFile(entryFile, entryData, function(err){
                if(err) console.log(err);
            });
        });
        
        // 自定义页面数据
        const pageData = {
            title: '',
            code: pageCode
        };
        // 配置多页面
        pages[pageCode] = {
            entry: entryFile,               // 入口文件
            template: 'index.html',         // 模板文件
            filename: pageCode + '.html',   // 打包后的文件路径
            minify: false,                  // 是否压缩
            chunks: ['chunk-vendors', 'chunk-common', pageCode],   // 引入资源文件
            chunksSortMode: 'manual',       // 控制 chunk 的排序。none | auto（默认）| dependency（依赖）| manual（手动）| {function}
            pageData: pageData
        };
    });
    return pages;
}

module.exports = config;