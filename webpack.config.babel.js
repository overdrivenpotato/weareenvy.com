import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import path from 'path'

const CLIENT_SRC = './src/client'
const SERVER_SRC = './src/server'
const BUILD_DIR = './build'

// Config common to the server and client
const commonConfig = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.styl$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.styl'],
    },
}

const serverConfig = Object.assign({}, commonConfig, {
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    context: path.resolve(SERVER_SRC),
    entry: './main.js',
    plugins: [
        ...commonConfig.plugins,
        new webpack.DefinePlugin({
            'process.env.TO': process.env.TO,
            'process.env.FROM': process.env.FROM,
            'process.env.PASS': process.env.PASS,
        }),
    ],
    output: {
        path: path.join(BUILD_DIR, 'server'),
        filename: 'server.js',
    },
})

const clientConfig = Object.assign({}, commonConfig, {
    context: path.resolve(CLIENT_SRC),
    entry: ['babel-polyfill', './main.jsx'],
    output: {
        path: path.join(BUILD_DIR, 'client'),
        filename: 'client.[hash].js',
    },
    plugins: [
        ...commonConfig.plugins,
        new HtmlWebpackPlugin({
            template: path.resolve(CLIENT_SRC, './index.html'),
        }),
    ],
})

module.exports = [serverConfig, clientConfig]
