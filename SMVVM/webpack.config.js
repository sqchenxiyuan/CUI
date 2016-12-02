module.exports = {
  devtool: 'eval-source-map',

  entry:  __dirname + "/数据池/index.js",
  output: {
    path: __dirname,
    filename: "outputs.js"
  },

  module: {//在配置文件里添加JSON loader
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',//在webpack的module部分的loaders里进行配置即可
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    port:3000
  }
};
