const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 設定路由
// 首頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})

// 認證系統的路由
// 登入畫面路由
app.get('/users/login', (req, res) => {
  res.render('login')
})

// 登入 submit
app.post('/users/login', (req, res) => {
  res.send('login')
})

// 註冊畫面路由
app.get('/users/register', (req, res) => {
  res.render('register')
})

// 註冊 submit
app.post('/users/register', (req, res) => {
  res.send('register')
})

// 登出路由
app.get('/users/logout', (req, res) => {
  res.send('logout')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
