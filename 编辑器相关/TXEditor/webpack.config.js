const path = require('path'),
    fs = require('fs'),
    webpack = require('webpack')

// 模块导入
module.exports = {
    devtool: '#eval-source-map',
    entry: { //入口
        'example': path.join(__dirname, 'examples/example.js')
    },
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "postcss-loader", // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "postcss-loader", // translates CSS into CommonJS
                }]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|doc)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.min.js',
            '@src': path.resolve(__dirname, './src'),
            '@template': '@src/template',
            '@util': '@src/util'
        }
    },
    devServer: {
        quiet: false, //清除输出
        stats: "minimal",
        hot: true,
        contentBase: path.resolve(__dirname, './examples/'),
        historyApiFallback: true,
        port: 2000
    },
}

if (process.env.NODE_ENV === 'production'){
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []) .concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                properties: true, //foo['bar']  ===> foo.bar
                // dead_code:true,//去除不执行的代码
                drop_debugger: true,
                drop_console: true,
            }
        })
    ])
}