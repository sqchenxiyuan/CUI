var path = require('path');
// NodeJS中的Path对象，用于处理目录的对象，提高开发效率。
// 模块导入
module.exports = {
    devtool: 'eval-source-map',
    // 入口文件地址，不需要写完，会自动查找
    entry: __dirname+'/src/index.js',
    // 输出
    output: {
        path: path.join(__dirname, './app'),
        // 文件地址，使用绝对路径形式
        filename: 'bundle.js',
        //[name]这里是webpack提供的根据路口文件自动生成的名字
        //publicPath: '/dist/'
        // 公共文件生成的地址
    },
    // 服务器配置相关，自动刷新!
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        grogress: true,
    },
    // 加载器
    module: {
        // 加载器
        loaders: [
        // 解析.vue文件
        //    { test: /\.vue$/, loader: 'vue' },
        // 编译css并自动添加css前缀
        //    { test: /\.css$/, loader: 'style!css!autoprefixer'}
        ]
    },
    // .vue的配置。需要单独出来配置，其实没什么必要--因为我删了也没保错，不过这里就留这把，因为官网文档里是可以有单独的配置的。
    // vue: {
    //     loaders: {
    //         css: 'style!css!autoprefixer',
    //     }
    // },
    // 转化成es5的语法
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.vue'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            filter: path.join(__dirname, './src/filters'),
            components: path.join(__dirname, './src/components')
        }
    },
    // 开启source-map，webpack有多种source-map，在官网文档可以查到
    devtool: 'eval-source-map'
};
