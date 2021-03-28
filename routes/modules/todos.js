const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// CRUD 路由
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