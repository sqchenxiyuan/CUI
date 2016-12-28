var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: '#eval-source-map',
    entry: __dirname+'/src/index.js',//入口
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index.js'
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
