const superagent = require('superagent');
const { Card } = require('../db/mongoose')

module.exports = function (app) {
  // 分析
  app.post('/drawcard/analysis', function (req, resp) {
    const params = req.body
    const { host, cardpool, end_id } = params
    if (cardpool === 1 && end_id === '0') {
      console.log('删库');
      Card.db.dropCollection('cards')
    }
    const getPartList = () => {
      superagent.get(host, params)
        .end((err, res) => {
          if (err) throw err;
          if (res.body.data) {
            const { list } = res.body.data
            if (list.length)
              Card.collection.insertMany(list)
            resp.status(200),
            resp.send({ 
              msg: '解析成功',
              list,
              code: 0
            })
          } else {
            resp.status(200),
            resp.send({ 
              msg: '解析成功',
              list: [],
              code: 0
            })
          }

        })
    }
    getPartList()
  })

  // 图标
  app.post('/drawcard/charts', async function (req, res) {
    const { gacha_type } = req.body
    const cardList = await Card.find({
      gacha_type
    })
    const star5IndexList = []
    const star5NameList = []
    cardList.forEach((item, index) => {
      if (item.rank_type === '5') {
        star5IndexList.push(index)
        star5NameList.push(item.name)
      }
    })
    star5IndexList.push(cardList.length)
    const resList = star5IndexList.map((item, index) => {
      return (item - (star5IndexList[index - 1] || 0))
    })
    res.status(200),
    res.send({
      msg: '获取成功',
      index: resList,
      name: star5NameList,
      code: 0
    })
  })

  // 表格列表
  app.post('/drawcard/list', async function (req, res) {
    const { size, page, gacha_type } = req.body
    const cardList = await Card.find({
      gacha_type
    })
    const resList = cardList.slice((page - 1) * size, page * size)
    res.status(200),
    res.send({
      msg: '获取成功',
      list: resList,
      total: cardList.length,
      code: 0
    })
  })
}