const express = require('express')
const router = express.Router()

const passport = require('passport')
const bcrypt = require('bcryptjs')

const db = require('../../models')
const User = db.User

// 認證系統的路由
// 登入畫面路由
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入 submit
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 註冊畫面路由
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊 submit
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        console.log('User already exists')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

// 登出路由
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router