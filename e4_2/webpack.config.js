var webpack = require('webpack');
var path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './app.js',
            vendor: 'moment'  // 这里指定了要抽离的依赖
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor' // Specify the common bundle's name.
            })
        ]
    }
}
