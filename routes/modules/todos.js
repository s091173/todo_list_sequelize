const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// CRUD 路由
// Create 頁面路由
router.get('/new', (req, res) => {
  res.render('new')
})

// Create Submit
router.post('/', (req, res) => {
  const UserId = req.user.id
  const name = req.body.name

  return Todo.create({
    name,
    UserId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

// 瀏覽特定 Todo
router.get('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({
    where: { id, UserId }
  })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

module.exports = router