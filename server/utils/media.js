const fs = require('fs');
const moment = require('moment')
const { exec } = require('child_process');
const currentDir = process.cwd() + '\\'

const video = function (req, item) {
  
  // const str = `${currentDir}ffmpeg -i 1.mp4 -y -f image2 -ss 0 -s 352x240 1.jpg`
  // console.log(str);
  // exec(str)

  // fs.statSync()方法用于异步返回有关给定文件路径的信息。
  let stat = fs.statSync(`./uploads${ req.query.dir + item }`)
  const ctime = moment(stat.ctime).format('YYYY-MM-DD HH:mm:ss')
  const p = item.split('.')
  const type = p[p.length - 1]
  if (stat.isDirectory() === false) { // 判断当前文件是否一个目录
    infoObj = {
      originalname: item,
      name: item,
      size: stat.size + 'B',
      date: ctime,
      url: 'http://' + req.headers.host + `/uploads${ req.query.dir + item }`,
      type,
      dir: '/'
    }
  } else {
    infoObj = {
      originalname: item,
      name: item,
      size: '-',
      date: ctime,
      url: '-',
      type: 'folder',
      dir: '/'
    }
  }
  if (type === 'mp4') {
     
  }
  return infoObj
}

module.exports = {
  video
};