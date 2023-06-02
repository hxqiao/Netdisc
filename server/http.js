const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
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

//写个接口login
app.post('/login', function(req, res) {
    console.log('post');
    res.status(200),
    res.send({
        msg: '登录成功'
    })
});

app.get('/logout', function(req, res) {
    console.log('get');
    res.status(200),
    res.send({
        msg: '登出成功'
    })
});

//配置服务端口
var server = app.listen(8080, function() {

    var host = server.address().address;

    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})