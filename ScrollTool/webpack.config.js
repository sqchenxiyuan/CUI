var path = require('path');
// NodeJS中的Path对象，用于处理目录的对象，提高开发效率。
var webpack = require('webpack');
// 模块导入
module.exports = {
    devtool: 'source-map-eval',
    entry: __dirname+'/src/index.js',//入口
    output: {
        path: path.join(__dirname, './output'),
        filename: 'index.js',
    },
    module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
          }
        ]
    }
};
