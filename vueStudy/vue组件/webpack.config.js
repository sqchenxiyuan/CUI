var path = require('path');
var webpack = require('webpack');
// 模块导入
module.exports = {
    devtool: 'eval-source-map',
    entry: path.resolve(__dirname,"./index.js"),//入口
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
          {
            test:/\.vue$/,
            loader:'vue-loader'
          },
          {
            test: /\.js$/,
            loader: 'babel-loader?cacheDirectory',
            exclude: /node_modules/
          }
        ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.js',
      }
    },
   performance: {
    maxEntrypointSize: 1000*1000,
    maxAssetSize: 1000*1000
  },


  devServer: {
      hot: true,
      contentBase: path.resolve(__dirname),
      port: 3000,
    },
};
