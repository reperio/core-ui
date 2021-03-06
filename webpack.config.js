const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|gif|jpg|cur)$/i,
                loader: 'url-loader', options: { limit: 8192 }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            inject: true
        }),
        new webpack.DefinePlugin({
            API_URL: JSON.stringify(process.env.API_URL || 'http://localhost:3000/api'),
            CORE_AUTH_UI_URL: JSON.stringify(process.env.CORE_AUTH_UI_URL || 'http://localhost:8081'),
            CORE_AUTH_UI_IFRAME_URL: JSON.stringify(process.env.CORE_AUTH_UI_IFRAME_URL || 'http://localhost:8081/auth')
        }),
        new CopyPlugin([
            { from: 'src/static/robots.txt', to: 'robots.txt'}
        ])
    ],
    mode: 'development',
    devServer: {
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || 8080,
        historyApiFallback: true
    }
};
