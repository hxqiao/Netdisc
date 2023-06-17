const mongoose = require('mongoose')

mongoose.connect('mongodb://0.0.0.0:27017/netdisc', {
  useNewUrlParser: true,
  // useCreateIndex: true
})
const conn = mongoose.connection
console.log('建立连接。。。');
conn.on('connected', function(err) {
  if (err) {
    console.log('mongodb连接失败')
  }
  console.log('mongodb启动成功')
})

// 用户表
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { 
    type: String,
    set(val) {
      return require('bcryptjs').hashSync(val, 10)
    }}
})
const User = mongoose.model('User', UserSchema)

// 抽卡卡牌表
const CardSchema = new mongoose.Schema({
  count: { type: String },
  gacha_id: { type: String },
  gacha_type: { type: String },
  id: { type: String },
  item_id: { type: String },
  item_type: { type: String },
  lang: { type: String },
  name: { type: String },
  rank_type: { type: String },
  time: { type: String },
  uid: { type: String }
})
const Card = mongoose.model('Card', CardSchema)
// Card.db.dropCollection('cards')
module.exports = {
  User,
  Card
}