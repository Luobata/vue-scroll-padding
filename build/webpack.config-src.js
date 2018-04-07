var assetsSubDirectory = 'static/';
var path = require('path');
var root = path.resolve(__dirname, '../');
var vueLoaderConfig = require('./vue-loader.conf');

module.exports = {
    devtool: 'source-map',

    entry:  root + "/src/index_global.js",
    output: {
        path: root + "/dist/",
        libraryTarget: 'umd',
        filename: "header.js"
    },

    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: assetsSubDirectory + 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: assetsSubDirectory + 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: root,
                exclude: [
                    path.join(root, '../node_modules/')
                ]
            },
        ]
    },

    watch: true
}
