const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        code: './src/code.ts',
        ui: './src/ui.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new Dotenv({
            systemvars: true,
            safe: false
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/ui.html", to: "ui.html" }
            ],
        }),
    ],
};