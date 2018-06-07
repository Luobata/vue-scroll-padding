var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

var root = path.resolve(__dirname, '../');
var assetsSubDirectory = 'static/';
var cssSourceMap = true;
var vueLoaderConfig = require('./vue-loader.conf');

var webpackConfig = {
    entry: {
        app: ['webpack-hot-middleware/client?quiet=true', './test/index.js'],
    },
    output: {
        path: root + '/dist/',
        publicPath: '/',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['json', '.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue',
            src: path.resolve(__dirname, '../src'),
            assets: path.resolve(__dirname, '../src/assets'),
            Lib: path.resolve(__dirname, '../src/lib'),
        },
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig,
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: assetsSubDirectory + 'img/[name].[hash:7].[ext]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: assetsSubDirectory + 'fonts/[name].[hash:7].[ext]',
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: root,
                exclude: [path.join(__dirname, '../node_modules/')],
            },
        ],
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'test/index.html',
            inject: true,
        }),
    ],
};

module.exports = webpackConfig;
