const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.argv[process.argv.indexOf('--mode') + 1] === 'development';

const devtool = devMode? 'source-map' : undefined

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,  // удаление каждый раз папки dist
        filename: 'index.[contenthash].js', //contenthash нужен чтобы браузер не из кэша js Доставал
    },
    devServer:{
        static:"./dist",
        open: true,
        hot: devMode? true: false,  // перезагружает модули 
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new MiniCssExtractPlugin(),
    ],
    module:{
        rules:[
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: 
                [
                    devMode? "style-loader":MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    }
};