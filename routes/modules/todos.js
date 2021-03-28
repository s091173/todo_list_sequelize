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

// Read 瀏覽特定 Todo
router.get('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({
    where: { id, UserId }
  })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// Update 頁面路由
router.get('/:id/edit', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id

  return Todo.findOne({
    where: { id, UserId }
  })
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// Update Submit
router.put('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  const { name, isDone } = req.body

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

module.exports = router