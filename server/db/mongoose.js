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
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { 
    type: String,
    set(val) {
      return require('bcryptjs').hashSync(val, 10)
    }}
})
const User = mongoose.model('User', UserSchema)

// User.db.dropCollection('users')

module.exports = {
  User
}