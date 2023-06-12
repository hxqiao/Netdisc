const fs = require('fs');
const multer = require('multer');
const path = require('path')
const uploader = require('express-fileupload');
const { video } = require('../utils/media');
const { extname, resolve } = path;
const { promises: { writeFile, appendFile, }, existsSync } = fs;

module.exports = function (app) {

  app.use(uploader());
  // 获取文件列表
  app.get('/file/list', function (req, res) {
    let components = []
    const files = fs.readdirSync(`./uploads${req.query.dir}`)
    files.forEach(function (item, index) {
      let infoObj = video(req, item)
      components.push(infoObj)
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
        cb(null, `./uploads${req.body.dir}`);
      },
      hashname: function (req, file, cb) {
        //file.originalname上传文件的原始文件名
        var changedName = (new Date().getTime()) + '-' + Buffer.from(file.originalname, "latin1").toString(
          "utf8"
        );
        cb(null, changedName);
      }
      
    })
  });

  // 删除文件
  app.post('/file/delect', (req, res) => {
    const { dir, name } = req.body
    const path = './uploads' + dir + name
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      res.json({
        code: '0',
        msg: '删除成功',
      })
    } else {
      res.json({
        code: '0',
        msg: '删除失败，请稍后再试',
      })
    }
  })

  // 重命名文件
  app.post('/file/rename', (req, res) => {
    const { dir, name } = req.body
    const path = './uploads' + dir + name
    fs.rename(path, newPath, (err) => {

    })
    res.json({
      code: '0',
      type: 'single',
    })
  })

  // 上传文件
  app.post('/file/upload', async (req, res) => {
    const { name, size, type, offset, hash, dir } = req.body;
    const { file } = req.files;

    const ext = extname(name)
    const hashname = resolve(__dirname, `./uploads${dir}${hash}${ext}`);
    const filename = resolve(__dirname, `./uploads${dir}${name}`);
    if (!existsSync(filename)) {
      if (offset > 0) {
        if (!existsSync(hashname)) {
          res.status(400)
            .send({
              message: '文件不存在',
            });
          return;
        }
        await appendFile(hashname, file.data);
        res.send({
          data: 'appended',
        });
        return;
      }
    
      await writeFile(hashname, file.data);
      res.send({
        data: 'created',
      });
    } else {
      res.send({
        data: 'existed',
      });
    }
  });

  // 上传完成
  app.post('/file/finish', (req, res) => {
    const { name, size, type, offset, hash, dir } = req.body;
    const ext = extname(name)
    const hashname = resolve(__dirname, `./uploads${dir}${hash}${ext}`);
    const filename = resolve(__dirname, `./uploads${dir}${name}`);
    if (existsSync(hashname)) {
      fs.renameSync(hashname, filename)
      res.json({
        code: '0',
        msg: '改名成功'
      })
    } else {
      res.json({
        code: '0',
        msg: '文件不存在'
      })
    }
  })                         
} 
