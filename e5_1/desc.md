#代码抽离 - 使用 require.ensure


```javascript
require.ensure(dependencies: String[], callback: function(require), chunkName: String)
```

###dependencies
这是一个字符串数组，用来声明所有需要预先加载的代码，在回掉函数执行之前

###callback 回调函数

###chunkName


##例子
```
.
├── dist
├── js
│   ├── a.js
│   ├── b.js
│   ├── c.js
│   └── entry.js
└── webpack.config.js
```

entry.js

```javascript
require('./a');
require.ensure(['./b'], function(require){
    require('./c');
    console.log('done!');
});
```
a.js

```javascript
console.log('***** I AM a *****');
```

b.js

```javascript
console.log('***** I AM b *****');
```

c.js

```javascript
console.log('***** I AM c *****');
```

webpack.config.js

```javascript
var path = require('path');

module.exports = function(env) {
    return {
        entry: './js/entry.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: 'https://cdn.example.com/assets/',
            // tell webpack where to load the on-demand bundles.

            pathinfo: true,
            // show comments in bundles, just to beautify the output of this example.
            // should not be used for production.
        }
    }
}
```

  这里 b.js 不会执行，ensure 只会保证b.js 准备完成，如果要执行b.js， 需要 require('./b.js') 方法来执行
