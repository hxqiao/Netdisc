const fs = require('fs');
const multer = require('multer');
const moment = require('moment')

module.exports = function (app) {

  // 获取文件列表
  app.get('/getFilesList', function (req, res) {

    let components = []
    const files = fs.readdirSync('./uploads/')
    files.forEach(function (item, index) {

      // fs.statSync()方法用于异步返回有关给定文件路径的信息。
      let stat = fs.statSync("./uploads/" + item)
      const ctime = moment(stat.ctime).format('YYYY-MM-DD HH:mm:ss')
      if (stat.isDirectory() === false) { // 判断当前文件是否一个目录
        const p = item.split('.')
        const type = p[p.length - 1]
        components.push({
          name: item.slice(14),
          size: stat.size + 'B',
          date: ctime,
          url: 'http://' + req.headers.host + '/uploads/' + item,
          type
        })
      } else {
        console.log();
        components.push({
          name: item,
          size: '-',
          date: ctime,
          url: '-',
          type: 'folder'
        })
      }
    })

    const list = components
    res.status(200),

      res.send({
        msg: '获取成功',
        list,
        code: 0
      })
  })

  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './uploads/');
      },
      filename: function (req, file, cb) {
        //file.originalname上传文件的原始文件名
        var changedName = (new Date().getTime()) + '-' + Buffer.from(file.originalname, "latin1").toString(
          "utf8"
        );
        cb(null, changedName);
      }
      
    })
  });

  // 上传文件
  app.post('/uploadFiles', upload.single('singleFile'), (req, res) => {
    const originalname = Buffer.from(req.file.originalname, "latin1").toString(
      "utf8"
    );
    res.json({
      code: '0',
      type: 'single',
      originalname
    })
  })
} 
