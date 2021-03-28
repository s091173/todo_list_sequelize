const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// 首頁路由
router.get('/', (req, res) => {
  const UserId = req.user.id
  Todo.findAll({
    raw: true,
    nest: true,
    where: { UserId }
  })
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

module.exports = router