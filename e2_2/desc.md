#运行webpack 的几种方式

需要 lodash: cnpm install --save lodash

###use webpack.config.js

./node_modules/.bin/webpack --config webpack.config.js
或
webpack

-----------------------
###use npm
{
  ...
  "scripts": {
    "build": "webpack"
  },
  ...
}
