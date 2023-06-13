const jwt = require('jsonwebtoken')
const { User } = require('../db/mongoose')

module.exports = async (req, res, next) => {
  const { headers: { authorization } } = req;
  if (authorization) {
    jwt.verify(authorization, process.env.SECRET, async (err, decoded) => {
      if (err){
        req.authenticated = false;
        req.decoded = null;
        return res.status(401).send({
          message: '登录失效'
        })
      } else {
        req.decoded = decoded;
        req.authenticated = true;
        const { _id } = decoded
        req.user = await User.findById(_id)
        next()
      }
    })
  } else {
    return res.status(401).send({
      message: '未登录'
    })
  }
}