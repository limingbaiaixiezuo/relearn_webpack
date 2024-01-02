'use strict';
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require("webpack")
const path = require('path');
 

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ['autoprefixer', {
                                        // options
                                        overrideBrowserslist: ['last 2 versions', '> 0.01%', 'ios 7']
                                    }],
                                ],
                        //   postcssOptions: {
                        //     plugins: ["autoprefixer"],
                        //     config: path.resolve(__dirname, 'postcss.config.js')
                          },
                        },
                    },
                ]
            },
            {
                test: /.(png|jpg|svg｜gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name][hash:8].[ext]',
                        }
                    }
                    // {
                    //     loader: 'url-loader',
                    //     options: {
                    //         name: 'img/[name][hash:8].[ext]',
                    //         limit: 10240 // 10k
                    //     }
                    // }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name][hash:8].[ext]',
                        }
                    }
                ]
            },
            
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new HtmlWebpackPlugin({
            title: 'My App', // The title of the HTML document
            template: __dirname + '/src/index.html', // The full path to the template
            filename: 'index.html', // The output path of the file
            chunks: ['index'], // The chunks to include in the HTML document
            inject: true, // Inject all assets into the given template or templateContent
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            },

        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
}

// const path = require('path');

// module.exports = {
//     entry: './src/index.js',
//     output: {
//         path: path.join(__dirname, 'dist'),
//         filename: 'bundle.js'
//     },
//     mode: 'production'
// };
