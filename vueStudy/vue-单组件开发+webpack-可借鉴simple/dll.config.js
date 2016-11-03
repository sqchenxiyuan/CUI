const webpack = require('webpack');

const vendors = [
    'vue'
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
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ],
};
