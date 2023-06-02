const fs = require('fs');

module.exports = function (app) {
  // app.get('/getFilesList', function(req, res) {
  //   console.log('get');
  //   res.status(200),
  //   res.send({
  //       msg: '获取成功',
  //       list: [
  //           {
  //             date: '2016-05-03',
  //             name: 'Tom',
  //             size: '-',
  //           },
  //           {
  //             date: '2016-05-02',
  //             name: 'Tom',
  //             size: '-',
  //           },
  //           {
  //             date: '2016-05-04',
  //             name: 'Tom',
  //             size: '-',
  //           },
  //           {
  //             date: '2016-05-01',
  //             name: 'Tom',
  //             size: '-',
  //           },
  //       ],
  //       code: 0
  //   })
  // });

  let components = []
  const files = fs.readdirSync('./')
  files.forEach(function (item, index) {

    // fs.statSync()方法用于异步返回有关给定文件路径的信息。
    let stat = fs.statSync("./" + item)

    if (stat.isDirectory() === false) { // 判断当前文件是否一个目录
      components.push({
        name: item,
        size: stat.size + 'B',
        date: stat.ctime
      })
    }
  })

  app.get('/getFilesList', function(req, res) {

    const list = components
    res.status(200),

    res.send({
      msg: '获取成功',
      list,
      code: 0
    })
  })
} 