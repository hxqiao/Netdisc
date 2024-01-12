const { createProxyMiddleware } = require('http-proxy-middleware');
// const https = require('https');
//引入request模块
const { default: axios } = require('axios')
const url=require("url");

const middleLog = (req, res, next) => {
  console.log(req.url);
  next();
}
module.exports = function (app) {
  // 获取个人信息
  app.use('/api/playlist/detail', middleLog, createProxyMiddleware({
    target: 'http://106.53.198.207:3000/', // 目标服务器地址  
    changeOrigin: true, // 开启代理时更改请求头中的Origin字段  
    onProxyReq(proxyReq, req, res) {
      proxyReq.setHeader('cookie', '__csrf=8e25eafe00f400243cf85a17bd28a0c4; MUSIC_U=002481832D5883D25CCED0B7D1CCE1B4DE3E0E9C1DDFBDA5EBAFC203A4B9858D1DC17E7D0C52E25974539BC92819E40AFAC1EDEEF9BB61E852E458A8CA1BBE1E39799EA68D3AE61654D620D02C9C7E71B6958B57EFE0E8DA75B364A62449EC7CE3F7C36F7E59A64E432013A3DD4BC33A6D622F0AB90698B7AE48421456B4BD3A085D5EDC827522E47FB50C82DEB024B22EDCE4DCB4ECB10A367EA7A2B9ACBD30721157D3D51A89551BF23EB0A43840375F00629F7ADF40A7AA46A94664863A7ABCA303BB8C23E928266590BE25A3EA47D001AC176BF2899DC1945E5D2520F05CBC950F9BAD3791335F35DF9A7C96C6E24D86DCAEC10A942C52654254F29AD3E6B89C74F2BE33B835FBE15E707769056A3715787CFEAD50E389BAC40D5A0C32FAAFBF4128201B1D5D265F11BFD0F5B27210C44124D0B0EB9A102FE443BFA37F3203');
    }
  }))

  app.use('/api/song/detail', middleLog, createProxyMiddleware({  
    target: 'http://106.53.198.207:3000/', // 目标服务器地址  
    changeOrigin: true, // 开启代理时更改请求头中的Origin字段 
  }))
  // https://slider.kz/vk_auth.php
  app.use('/api/song/play', middleLog, createProxyMiddleware({
    target: 'https://slider.kz', // 目标服务器地址  
    changeOrigin: true, // 开启代理时更改请求头中的Origin字段 
    pathRewrite: {
      '^/api/song/play' : '/vk_auth.php'
    },
    // https://slider.kz
    onError: (err, req, res, next) => {
      res.status(err.status || 500);
      res.send({
        message: err.message,
        error: err,
      });
    }
  }))

  app.use('/api/song/url', middleLog, createProxyMiddleware({
    target: 'https://netease-cloud-music-api-psi-sable-87.vercel.app', // 目标服务器地址  
    changeOrigin: true, // 开启代理时更改请求头中的Origin字段 , // 开启代理时更改请求头中的Origin字段  
    onProxyReq(proxyReq, req, res) {
      proxyReq.setHeader('cookie', '__csrf=8e25eafe00f400243cf85a17bd28a0c4; MUSIC_U=002481832D5883D25CCED0B7D1CCE1B4DE3E0E9C1DDFBDA5EBAFC203A4B9858D1DC17E7D0C52E25974539BC92819E40AFAC1EDEEF9BB61E852E458A8CA1BBE1E39799EA68D3AE61654D620D02C9C7E71B6958B57EFE0E8DA75B364A62449EC7CE3F7C36F7E59A64E432013A3DD4BC33A6D622F0AB90698B7AE48421456B4BD3A085D5EDC827522E47FB50C82DEB024B22EDCE4DCB4ECB10A367EA7A2B9ACBD30721157D3D51A89551BF23EB0A43840375F00629F7ADF40A7AA46A94664863A7ABCA303BB8C23E928266590BE25A3EA47D001AC176BF2899DC1945E5D2520F05CBC950F9BAD3791335F35DF9A7C96C6E24D86DCAEC10A942C52654254F29AD3E6B89C74F2BE33B835FBE15E707769056A3715787CFEAD50E389BAC40D5A0C32FAAFBF4128201B1D5D265F11BFD0F5B27210C44124D0B0EB9A102FE443BFA37F3203');
    },
    pathRewrite: {
      '^/api/song/url' : '/song/url'
    },
    // https://slider.kz
    onError: (err, req, res, next) => {
      res.status(err.status || 500);
      res.send({
        message: err.message,
        error: err,
      });
    }
  }))

  app.get('/api/onesong/play', async (req, res) => {
    try {
      const audioUrl = url.parse(req.url, true).query.url;
      // 使用Axios获取音频链接的响应
      const response = await axios.get(audioUrl, {
        // 设置响应类型为stream，这样可以直接返回一个可读流
        responseType: 'stream'
      });
      // 获取音频的内容类型和大小
      const contentType = response.headers['content-type'];
      const contentLength = response.headers['content-length'];
      // 设置响应头，告诉客户端音频的类型和大小
      res.set({
        'Content-Type': contentType,
        'Content-Length': contentLength
      });
      // 将音频流直接传递给客户端
      response.data.pipe(res);
    } catch (error) {
      // 如果发生错误，返回500状态码和错误信息
      console.error(error);
      res.status(500).send('Something went wrong');
    }
  });
}