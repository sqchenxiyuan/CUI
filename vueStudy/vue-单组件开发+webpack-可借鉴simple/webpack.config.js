var path = require('path');
// NodeJS中的Path对象，用于处理目录的对象，提高开发效率。
var webpack = require('webpack');
// 模块导入
module.exports = {
    devtool: 'source-map',
    entry: __dirname+'/src/index.js',//入口
    output: {
        path: path.join(__dirname, './app'),
        publicPath:"/public/",
        filename: 'bundle.js',
    },
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        grogress: true,
        port:3000
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
          },
          {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file',
            query: {
              name: '[name].[ext]?[hash]'
            }
          }
        ]
    },
    plugins: [
     new webpack.DllReferencePlugin({
       context: __dirname,
       manifest: require('./manifest.json'),
     })
   ],
};
