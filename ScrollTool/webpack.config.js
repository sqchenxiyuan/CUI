var path = require('path');
// NodeJS中的Path对象，用于处理目录的对象，提高开发效率。
var webpack = require('webpack');
// 模块导入
module.exports = {
    devtool: '#eval-source-map',
    entry: __dirname+'/src/test1.js',//入口
    output: {
        path: path.join(__dirname, './demo/src'),
        publicPath:"/public/",
        filename: 'test1.js'
    },
    module:{
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          }
        ]
    },
    devServer: {
      contentBase: "demo/",
      historyApiFallback: true,
      noInfo: true
    },
};
