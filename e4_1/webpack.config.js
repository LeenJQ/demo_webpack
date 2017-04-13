var path = require('path');

module.exports = function(env) {
    return {
        entry: './app.js',
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}
