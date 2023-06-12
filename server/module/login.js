const { User } = require('./mongoose')

module.exports = function (app) {
  app.post('/login', function(req, res) {
    console.log('post');
    res.status(200),
    res.send({
        msg: '登录成功',
        code: 0
    })
  });

  app.post('/register', async function(req, res) {
    console.log('register');
    const { username, password } = req.body
    console.log(req.body);
    const user = await User.create({
      username,
      password
    })
    // const user = new User({
    //   username,
    //   password
    // })
    res.status(200),
    res.send(user)
  });
}