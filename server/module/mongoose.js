const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/express-auth', {
  useNewUrlParser: true
})
const UserSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String }
})
const User = mongoose.model('User', UserSchema)

module.exports = {
  User
}