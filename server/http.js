const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const url=require("url");
const app = express();
const batchFileApi = require('./files.js');
//设置跨域访问
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

batchFileApi(app)

//写个接口login
app.post('/login', function(req, res) {
    console.log('post');
    res.status(200),
    res.send({
        msg: '登录成功',
        code: 0
    })
});

// 图片
app.all('*', function(req, res, next) {
  var pathname = url.parse(req.url).pathname; //当url的ip加端口号的后1到7位为img/png时，返回以该路径下对应的png图片 
  switch (pathname.substring(pathname.length - 3)) {
    case 'jpg':
      fs.readFile(pathname.substring(1), function(err, data) {
        res.writeHead(200, { 'Content-Type':'image/jpeg' }); 
        res.end(data);
      });
      break;
    case 'png':
      fs.readFile(pathname.substring(1), function(err, data) {
        res.writeHead(200, { 'Content-Type':'image/png' }); 
        res.end(data);
      });
      break;
  
    default:
      break;
  }
   
})

//配置服务端口
var server = app.listen(8080, function() {

    var host = server.address().address;

    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})