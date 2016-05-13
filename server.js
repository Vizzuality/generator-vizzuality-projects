'use strict';

require('dotenv').config({silent: true});

const path = require('path');
const koa = require('koa');
const serve = require('koa-static');
const webpackDevServer = require('koa-webpack-dev');
const compiler = process.env.COMPILER || 'heroku';

const port = process.env.PORT || 3000;
const app = koa();

if (process.env.NODE_ENV === 'production') {
  app.use(serve(path.join(__dirname, 'dist')));
} else {
  app.use(webpackDevServer({
    config: `./build/${compiler}.config.js`
  }));
}

app.use(serve(path.join(__dirname, 'public')));

app.listen(port);
