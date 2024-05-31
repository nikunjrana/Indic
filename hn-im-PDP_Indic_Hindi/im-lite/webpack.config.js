var webpack = require('webpack');
var path = require('path');
var WriteFilePlugin = require('write-file-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const assetsPathHandler = (function () {
    var assetsPath = {};
        assetsPath = {
            chunkServePath: '/pwagifs/',
            buildMode: 'production',
        }
    return assetsPath;
})();

process.traceDeprecation = true; //to find out which loader is causing this deprecation warning

//progress---
const handler = (percentage) => {
    if (percentage == 1) {
        console.clear();
        console.log('Successfully Compiled!');
    }
    else if (percentage == 0) {
        console.clear();
        console.log('Compilation Started...')
    }
};
//-------



function config(mainJSNumber, jsChunkNumber, cssChunkNumber, chunksWritePath) {
    let webpackConf = {
        context: path.join(__dirname, './'),
        entry: [
            './src/index.js',
        ],
        output: {
            filename: 'main-min_' + mainJSNumber + '.js',
            chunkFilename: '[name].pwa' + jsChunkNumber + '.js',

            path: chunksWritePath,
            publicPath: assetsPathHandler.chunkServePath
        },
        mode: assetsPathHandler.buildMode,
        resolve: {

            alias: {
                'react': 'preact/compat',
                'react-dom': 'preact/compat'
            },
            modules: [
                path.join(__dirname, "//src"),
                "node_modules"
            ],

            extensions: ['*', '.js', '.jsx']
        },
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    options: {
                        configFile: path.join(process.cwd(), './src/.babelrc'),
                    },
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: true,
                            },
                        },
                        'css-loader',
                    ],
                },
            ]
        },
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 420000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 1,
                automaticNameDelimiter: '-',
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        minChunks: 10,
                    },
                    default: {
                        minChunks: 15,
                        priority: -20,
                        reuseExistingChunk: false
                    },


                }
            },
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                        compress: {
                            drop_console: true,
                        }
                    },
                }),
                new OptimizeCSSAssetsPlugin({ canPrint: false })

            ],
            mergeDuplicateChunks: false
        },

        plugins: [
            new WriteFilePlugin(),

            new webpack.DefinePlugin({
                'process': {
                    'NODE_ENV': JSON.stringify(process.env.NODE_ENV_M)
                }
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            // new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.ProgressPlugin(handler),
            new MiniCssExtractPlugin({
                ignoreOrder: true,
                chunkFilename: '[name].pwa' + cssChunkNumber + '.css',
            })
        ]
    };
    assetsPathHandler.devtool ? webpackConf['devtool'] = assetsPathHandler.devtool : '';
    return (webpackConf);
}
module.exports = config
