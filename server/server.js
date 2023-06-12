const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const url=require("url");
const app = express();
const batchFileApi = require('./module/files.js');
const userLoginProcessing = require('./module/login.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// 文件系统模块
batchFileApi(app)

// 登录模块
userLoginProcessing(app)

// 图片
app.all('*', function(req, res, next) {
  var pathname = url.parse(req.url).pathname; //当url的ip加端口号的后1到7位为img/png时，返回以该路径下对应的png图片 
  console.log(req);
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

    console.log('Example app listening at http://127.0.0.1:'+port);
})