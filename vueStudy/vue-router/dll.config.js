const webpack = require('webpack');

const vendors = [
    'vue',
    'vue-router'
];

module.exports = {
    output: {
        path: 'libs',
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        vendor: vendors,
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.js'
      }
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ],
};
