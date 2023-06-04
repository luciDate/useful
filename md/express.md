> base app.js

```javascript
const express = require('express');
// const https = require('https');
// const router = require('./router')

const app = express();

// 一般中间件放置尽量放前，除了错误处理
function myLogger(req, res, next) {
  console.log('mylogger');
  next();
}

//app.use(myLogger);

app.get('/', myLogger, (req, res) => {
  // res.send('hello world');
  throw new Error('error...');
});

// 错误处理器
// function errorHandler(err, req, res, next) {
//   res.status(400).json({
//     err: -1,
//     msg: err.toString()
//   });
// }

// app.use(errorHandler);

const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log('服务启动 http://%s:%s', address, port);
});
```
