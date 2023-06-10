const fs = require('fs');
const multer = require('multer');
const moment = require('moment')
const path = require('path')
const uploader = require('express-fileupload');
const { mkdirsSync } = require('./utils/dir');

module.exports = function (app) {

  app.use(uploader());
  // 获取文件列表
  app.get('/getFilesList', function (req, res) {
    let components = []
    const files = fs.readdirSync(`./uploads${req.query.dir}`)
    files.forEach(function (item, index) {

      // fs.statSync()方法用于异步返回有关给定文件路径的信息。
      let stat = fs.statSync(`./uploads${ req.query.dir + item }`)
      const ctime = moment(stat.ctime).format('YYYY-MM-DD HH:mm:ss')
      if (stat.isDirectory() === false) { // 判断当前文件是否一个目录
        const p = item.split('.')
        const type = p[p.length - 1]
        components.push({
          originalname: item,
          name: item,
          size: stat.size + 'B',
          date: ctime,
          url: 'http://' + req.headers.host + `/uploads${ req.query.dir + item }`,
          type,
          dir: '/'
        })
      } else {
        components.push({
          originalname: item,
          name: item,
          size: '-',
          date: ctime,
          url: '-',
          type: 'folder',
          dir: '/'
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

  // 删除文件
  app.post('/delectFile', (req, res) => {
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
  app.post('/renameFile', (req, res) => {
    const { dir, name } = req.body
    const path = './uploads' + dir + name
    fs.rename(path, newPath, (err) => {

    })
    res.json({
      code: '0',
      type: 'single',
    })
  })

  /**
   * single(fieldname)
   * Accept a single file with the name fieldname. The single file will be stored in req.file.
   */
  // const uploadPath = path.join(__dirname, 'uploads');
  // const uploadTempPath = path.join(uploadPath, 'temp');
  // const upload1 = multer({ dest: uploadTempPath });
  // app.post('/file/upload', upload1.single('file'), (req, res) => {
  //   console.log('file upload...')
  //   // 根据文件hash创建文件夹，把默认上传的文件移动当前hash文件夹下。方便后续文件合并。
  //   const {
  //     name,
  //     total,
  //     index,
  //     size,
  //     hash
  //   } = req.body;

  //   const chunksPath = path.join(uploadPath, hash, '/');

  //   if (!fs.existsSync(chunksPath)) mkdirsSync(chunksPath);

  //   fs.renameSync(req.file.path, chunksPath + hash + '-' + index);
    
  //   res.json({
  //     code: '0',
  //     msg: '上传成功'
  //   })
  // })
  const {
    promises: {
      writeFile,
      appendFile,
    },
    existsSync,
  } = fs;
  const { extname, resolve } = path;
  app.post('/file/upload', async (req, res) => {
    const { name, size, type, offset, hash } = req.body;
    const { file } = req.files;

    const ext = extname(name)
    const hashname = resolve(__dirname, `./uploads/${hash}${ext}`);
    const filename = resolve(__dirname, `./uploads/${name}`);
    console.log(offset);
    if (!existsSync(filename)) {
      if (offset > 0) {
        console.log('------------1');
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
    
      console.log('------------2');
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

  app.post('/file/merge_chunks', (req, res) => {
    const {    
      size, 
      name, 
      total, 
      hash
    } = req.body;
    // 根据hash值，获取分片文件。
    // 创建存储文件
    // 合并
    const chunksPath = path.join(uploadPath, hash, '/');
    const filePath = path.join(uploadPath, name);
    // 读取所有的chunks 文件名存放在数组中
    const chunks = fs.readdirSync(chunksPath);
    // 创建存储文件
    fs.writeFileSync(filePath, ''); 
    if(chunks.length !== total || chunks.length === 0) {
      res.json({
        code: '0',
        msg: '切片文件数量不符合'
      })
      return;
    }
    for (let i = 0; i < total; i++) {
      // 追加写入到文件中
      fs.appendFileSync(filePath, fs.readFileSync(chunksPath + hash + '-' +i));
      // 删除本次使用的chunk    
      fs.unlinkSync(chunksPath + hash + '-' +i);
    }
    fs.rmdirSync(chunksPath);
    // 文件合并成功，可以把文件信息进行入库。
    res.json({
      code: '0',
      msg: '合并成功'
    })
  })                         
} 
