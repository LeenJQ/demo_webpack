var path = require('path');

module.exports = function(env) {
    return {
        entry: './js/entry.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: 'http://localhost:7070/demo/webpack/e5_1/dist/',
            // tell webpack where to load the on-demand bundles.

            pathinfo: true,
            // show comments in bundles, just to beautify the output of this example.
            // should not be used for production.
        }
    }
}
