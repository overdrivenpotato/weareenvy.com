import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import path from 'path'

const CLIENT_SRC = './src/client'
const SERVER_SRC = './src/server'
const BUILD_DIR = './build'

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
    resolve: {
        extensions: ['.js', '.jsx', '.styl'],
    }
}

const serverConfig = Object.assign({}, commonConfig, {
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    context: path.resolve(SERVER_SRC),
    entry: './main.js',
    output: {
        path: path.join(BUILD_DIR, 'server'),
        filename: 'server.js',
    },
})

const clientConfig = Object.assign({}, commonConfig, {
    context: path.resolve(CLIENT_SRC),
    entry: './main.jsx',
    output: {
        path: path.join(BUILD_DIR, 'client'),
        filename: 'client.[hash].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(CLIENT_SRC, './index.html'),
        }),
    ],
})

module.exports = [serverConfig, clientConfig]
