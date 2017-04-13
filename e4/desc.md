#代码分离 - CSS 代码模块化

webpack使用 css-loader (css输出成js模块), ExtractTextWebpackPlugin(抽离css，并打包成css文件) 可以把css文件像其他模块代码一样引入，

##引入 CSS

像js模块一样引入

```javascript
import 'bootstrap/dist/css/bootstrap.css';
```

##使用 css-loader

在 webpack.config.js 中配置css-loader

```javascript
module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            use: 'css-loader'
        }]
    }
}
```

通过这种方式打包后，css代码会直接写入在js文件里，所以只有等到js加载完成后才会往页面里载入css代码，无法做到异步加载css文件

通过 ExtractTextWebpackPlugin 插件可以解决这个问题

##使用 ExtractTextWebpackPlugin

安装

```javascript
npm i --save-dev extract-text-webpack-plugin
```

使用

```javascript
+var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    module: {
         rules: [{
             test: /\.css$/,
-            use: 'css-loader'
+            use: ExtractTextPlugin.extract({
+                use: 'css-loader'
+            })
         }]
     },
+    plugins: [
+        new ExtractTextPlugin('styles.css'),
+    ]
}
```

上面的代码会打包所有的css模块代码并且自动生成分离的文件
