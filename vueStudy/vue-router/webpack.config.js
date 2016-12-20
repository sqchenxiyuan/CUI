var path = require('path');
// NodeJS中的Path对象，用于处理目录的对象，提高开发效率。
var webpack = require('webpack');
// 模块导入
module.exports = {
    devtool: 'source-map-eval',
    entry: __dirname+'/res/index.js',//入口
    output: {
        path: path.join(__dirname, './build'),
        filename: 'bundle.js',
    },
    resolveLoader: {
      root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [
          {
            test:/\.vue$/,
            loader:'vue'
          },
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
          }
        ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.js'
      }
    },
    plugins: [
     new webpack.DllReferencePlugin({
       context: __dirname,
       manifest: require('./manifest.json'),
     })
   ]
};
