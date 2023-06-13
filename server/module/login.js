const { User } = require('../db/mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function (app) {
  app.post('/login', async function(req, res) {
    const { username, password } = req.body
    const user = await User.findOne({
      username
    })
    if (!user) {
      return res.status(422).send({
        message: '用户不存在'
      })
    }

    // 验证密码
    const isPswValid = require('bcryptjs').compareSync(password, user.password)
    if (!isPswValid) {
      return res.status(422).send({
        message: '密码无效'
      })
    }

    // 生成token
    const token = jwt.sign({
      _id: String(user._id)
    }, process.env.SECRET)
    res.send({
      user,
      token
    })
  });


  // 注册
  app.post('/register', async function(req, res) {
    const { username, password } = req.body
    const hasUser = await User.findOne({
      username
    })
    if (hasUser) {
      return res.status(409).send({
        message: '改用户已注册'
      })
    } else {
      const user = await User.create({
        username,
        password
      })
      res.status(200).send(user)
    }
  });

  // 获取个人信息
  app.post('/profile', async function(req, res) {
  })
}