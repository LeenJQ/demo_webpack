#代码抽离 - 使用 import()

##动态 import

### es6

webpack 把 import() 当作抽离点，并把模块放入要抽离的块（chunk）里

import() 把传参当模块名并返回一个Promise
import(name) -> Promise

```javascript
function determineDate() {
  import('moment').then(function(moment) {
    console.log(moment().format());
  }).catch(function(err) {
    console.log('Failed to load moment', err);
  });
}

determineDate();
```

  import() 依赖 Promise, 在低版本浏览器需要支持 Promise, 使用 es6-promise or promise-polyfill 去支持它

```javascript
import Es6Promise from 'es6-promise';
Es6Promise.polyfill();
// 或者
import 'es6-promise/auto';
// 或者
import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}
// or ...
```

###使用 Babel的 import

```javascript
npm install --save-dev babel-core babel-loader babel-plugin-syntax-dynamic-import babel-preset-es2015
# for this example
npm install --save moment
```

index-es2015.js

```javascript
function determineDate() {
  import('moment')
    .then(moment => moment().format('LLLL'))
    .then(str => console.log(str))
    .catch(err => console.log('Failed to load moment', err));
}

determineDate();
```

webpack.config.js

```javascript
module.exports = {
  entry: './index-es2015.js',
  output: {
    filename: 'dist.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}]],
          plugins: ['syntax-dynamic-import']
        }
      }]
    }]
  }
};
```

>Not using the syntax-dynamic-import plugin will fail the build with
Module build failed: SyntaxError: 'import' and 'export' may only appear at the top level, or
Module build failed: SyntaxError: Unexpected token, expected {
