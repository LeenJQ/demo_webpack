#代码分离 - 库

  下面代码会把所有依赖代码打进一个文件里
  moment 是一个日期格式化插件，这里用作例子

  npm install --save moment

app.js

```javascript
var moment = require('moment');
console.log(moment().format());
```

webpack.config.js

```javascript
var path = require('path');

module.exports = function(env) {
    return {
        entry: './index.js',
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}
```
