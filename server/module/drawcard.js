const superagent = require('superagent');
const { Card } = require('../db/mongoose')

module.exports = function (app) {
  app.post('/drawcard/analysis', function (req, resp) {
    Card.db.dropCollection('cards')
    const params = req.body
    const { host } = params
    params.page = Number(params.page)
    params.size = Number(params.size)
    const getPartList = () => {
      superagent.get(host, params)
        .end((err, res) => {
          if (err) throw err;
          const { data: { list } } = res.body
          if (list.length >= 10 || list.length !== 0) {
          // if (false) {
            Card.collection.insertMany(list)
            params['end_id'] = list[list.length - 1]['id']
            getPartList()
          } else {
            resp.status(200),
            resp.send({
              msg: '解析成功',
              code: 0
            })
          }
        });
    }
    getPartList()
  })

  app.post('/drawcard/charts', async function (req, res) {
    const cardList = await Card.find()
    const star5IndexList = []
    cardList.forEach((item, index) => {
      if (item.rank_type === '5') {
        star5IndexList.push(index)
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
      code: 0
    })
  })

  app.post('/drawcard/list', async function (req, res) {
    const { size, page } = req.body
    const cardList = await Card.find()
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