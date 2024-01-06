'use strict';
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const webpack = require("webpack")
const path = require('path');

const glob = require('glob');

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            // '/Users/cpselvis/my-project/src/index/index.js'

            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];

            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    inlineSource: '.css$',
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['vendors', pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false
                    }
                })
            );
        });

    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA();
 

module.exports = {
    // entry: {
    //     index: './src/index/index.js',
    //     search: './src/search/index.js'
    // },
    entry: entry,
    output: {
        path: __dirname + '/dist',
        filename: '[name]_[chunkhash:8].js'
    },
    // mode: 'production',
    mode: 'none',
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
                          },
                        },
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75, // 1rem = 75px
                            remPrecision: 8 // rem的小数点后位数
                        }
                    }
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
        // new HtmlWebpackPlugin({
        //     title: 'My App', // The title of the HTML document
        //     template: __dirname + '/src/index.html', // The full path to the template
        //     filename: 'index.html', // The output path of the file
        //     chunks: ['index'], // The chunks to include in the HTML document
        //     inject: true, // Inject all assets into the given template or templateContent
        //     minify: {
        //         html5: true,
        //         collapseWhitespace: true,
        //         preserveLineBreaks: false,
        //         minifyCSS: true,
        //         minifyJS: true,
        //         removeComments: false
        //     },

        // }),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ].concat(htmlWebpackPlugins),
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    // devtool: 'source-map',
    devtool: 'inline-source-map',
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
