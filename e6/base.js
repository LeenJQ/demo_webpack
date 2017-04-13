var path = require('path')

module.exports = function() {
  return {
    entry: {
      'main': './app.js'
    },
    output: {
      path: path.join(__dirname, './dist'),
      filename: '[name].bundle.js',
      publicPath: '/',
      sourceMapFilename: '[name].map'
    },
    resolve: {
        extensions: ['.js'],
        modules: [path.join(__dirname, './'), 'node_modules']
    }
  }
}
