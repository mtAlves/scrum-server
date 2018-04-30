import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default (Users) => {
  const auth = Router()

  auth.post('/', (req, res, next) => {
    Users.findOne({ where: {username: req.body.username} }).then(result => {
      bcrypt.compare(req.body.password, result.password, function (err, response) {
        if (response) {
          const token = jwt.sign({ userId: result.id }, 'scrum_secret')
          res.json({
            auth: {
              user_id: result.id,
              username: result.username,
              token: `Bearer ${token}`
            }
          })
        } else {
          res.send('Unauthorized').status(401).end()
        }
      })
    })
  })

  return auth
}
