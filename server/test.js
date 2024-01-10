// 引入Axios和Express
const axios = require('axios');

module.exports = function (app) {
  // 定义一个路由，接受一个音频链接作为参数
  app.get('/audio', async (req, res) => {
    // 获取音频链接
    const audioUrl = req.query.url || 'https://cs3-16v4.vkuseraudio.net/s/v1/acmp/h7MXxmzQinWQUdv7t9DmVzKHqxUfi9olKyVDar0525-3i90mFQ5jc3DESA2cMmAXrlu6_-iof4vpVYvWXc5jpS2kNbPr4myw3MMHvZp39KhizgUMkj_vzJiUyje5Qat3C-44h3g_pYOcabIQ5nLwh7AFMWJJCT-qvo06llT-egXYovN4QA.mp3';
  
    // 判断音频链接是否有效
    if (!audioUrl) {
      // 返回400状态码和错误信息
      return res.status(400).send('Invalid audio url');
    }
  
    try {
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

