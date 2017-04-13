#指定抽离的路径

```javascript
module.exports = function() {
    return {
        //...
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                   // 这里说明 vendor 是从 node_modules 里来的
                   // this assumes your vendor imports exist in the node_modules directory
                   return module.context && module.context.indexOf('node_modules') !== -1;
                }
            })
        ]
    };
}
```
