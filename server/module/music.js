const { createProxyMiddleware } = require('http-proxy-middleware');
// const https = require('https');
//引入request模块
const { default: axios } = require('axios')

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
      proxyReq.setHeader('cookie', '__csrf=c33d318620959b3c183fc76588024fcb; MUSIC_U=00E46DECD4BDD7B2AC3E7A6DB7DD70055D60259D29B840A45C6F5638CB4F36118729700D1DB8D539F2735BB06161B409C7DC6BED1E85F555293CAB224413236A0B8BCA1C0E72258F797E43DDC314965945365029ADFD91CEE3DF9F3C6B9C979C59FF750254995D670A234DDB4C0C7203F8EDACDBC6E18EC70988033F7E24462C58965AAB997D1A2F75D837FFBFE6C8951FA0FB2ACE3078A6E0A9A8A4A07583BF9DC347C1A732AA4F0AA1B83FE1247A3C25FD3C9AECB0802AD150EF0493667CEA0415021AB659727218AA167813D3653117F540A193147B44725316CF965A1962CCD3AB2237493003CBE62654C5CC27924B122E1FE974CDB1C9B7956CBDB1B583CEB9182A336D4A0CC94E7610056B1ED97265C45AFE4B16B0CC21BD97EDA9448EAC3326C1F08EFC9F41837DD8AAF827E2873E0BC25F6F88F540FE626C214DEE0D92F254F3BD2BF40C45D7CDED2294D5F38196FBCDDD1ABB582A54C9C6C28A7F090A01D1459DECF256E2434BEBDA5CAAF3C97E325A722E7CEC26CE935E53F1D98657');
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

  app.get('/api/onesong/play', async (req, res) => {
    console.log('/api/onesong/play');
    try {
      const audioUrl = 'https://music.163.com/song/media/outer/url?id=2112003150'
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
      console.log(contentType);
      console.log(contentLength);
      // 将音频流直接传递给客户端
      response.data.pipe(res);
    } catch (error) {
      // 如果发生错误，返回500状态码和错误信息
      console.error(error);
      res.status(500).send('Something went wrong');
    }
  });
}