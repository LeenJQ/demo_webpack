# 构建项目

  https://webpack.js.org/guides/production-build/

Running webpack -p (or equivalently webpack --optimize-minimize --define process.env.NODE_ENV="'production'"). This performs the following steps:

* Minification using UglifyJsPlugin
* Runs the LoaderOptionsPlugin, see its documentation
* Sets the Node environment variable

##压缩

  webpack 的压缩默认使用uglify
  uglify 不识别es6 语法， 如果用uglify，请使用 babel 等插件转换成es5语法

```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  /*...*/
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
    })
  ]
};
```

##node 环境变量

```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  /*...*/
  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
```

##根据不同环境配置webpack

dev.js

```javascript
module.exports = function (env) {
  return {
    devtool: 'cheap-module-source-map',
    output: {
        path: path.join(__dirname, '/../dist/assets'),
        filename: '[name].bundle.js',
        publicPath: publicPath,
        sourceMapFilename: '[name].map'
    },
    devServer: {
        port: 7777,
        host: 'localhost',
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        publicPath: publicPath
    }
  }
}
```

prod.js

```javascript
module.exports = function (env) {
  return {
    output: {
        path: path.join(__dirname, '/../dist/assets'),
        filename: '[name].bundle.js',
        publicPath: publicPath,
        sourceMapFilename: '[name].map'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
  }
}
```

webpack.config.js

```javascript
function buildConfig(env) {
  return require('./config/' + env + '.js')(env)
}

module.exports = buildConfig;
```

package.json

```javascript
"build:dev": "webpack --env=dev --progress --profile --colors",
"build:dist": "webpack --env=prod --progress --profile --colors",
```

##使用 base.js 抽取共同部分

```javascript
module.exports = function() {
    return {
        entry: {
            'polyfills': './src/polyfills.ts',
            'vendor': './src/vendor.ts',
            'main': './src/main.ts'

        },
        output: {
            path: path.join(__dirname, '/../dist/assets'),
            filename: '[name].bundle.js',
            publicPath: publicPath,
            sourceMapFilename: '[name].map'
        },
        resolve: {
            extensions: ['.ts', '.js', '.json'],
            modules: [path.join(__dirname, 'src'), 'node_modules']

        },
        module: {
            rules: [{
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            }, {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader']
            }, {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: {
                  loader: 'url-loader',
                  options: {
                    limit: 100000
                  }
                }
            }],
        },
        plugins: [
            new ForkCheckerPlugin(),

            new webpack.optimize.CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                chunksSortMode: 'dependency'
            })
        ],
    };
}
```

prod.js (updated)

```javascript
const webpackMerge = require('webpack-merge');

const commonConfig = require('./base.js');

module.exports = function(env) {
    return webpackMerge(commonConfig(), {
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            })
        ]
    })
}
```
