import { Router } from 'express'
import auth from '../utils/auth'
import bcrypt from 'bcrypt'

export default (Users) => {
  const users = Router()

  users.get('/', auth, (req, res, next) => {
    Users.findAll({ attributes: {exclude: ['password']} }).then(result => res.json(result))
  })

  users.get('/:id', auth, (req, res, next) => {
    Users.findById(req.params.id, {
      attributes: { exclude: ['password'] }
    }).then(result => res.json(result))
  })

  users.post('/', (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 7)
    Users.findOne({ where: {username: req.body.username} }).then(username => {
      !username ? Users.create(req.body) : res.status(400).send('username already in database')
    })
  })

  users.put('/:id', auth, (req, res, next) => {
    Users.findById(req.params.id).then(user => {
      user.name = req.body.name
      user.username = req.body.username
      user.email = req.body.email
      user.password = req.body.password
      user.avatar = req.body.avatar
      user.save({fields: ['name', 'username', 'email', 'password', 'avatar']})
    })
  })

  users.delete('/:id', auth, (req, res, next) => {
    Users.destroy({ where: {id: req.params.id}})
  })

  return users
}
