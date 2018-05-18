import { Router } from 'express'
import auth from '../utils/auth'

module.exports = (Impediments) => {
  const impediments = Router()

  impediments.get('/', auth, (req, res, next) => {
    Impediments.findAll().then(result => res.json(result))
  })

  impediments.get('/:id', auth, (req, res, next) => {
    Impediments.findById(req.params.id).then(result => res.json(result))
  })

  impediments.post('/', auth, (req, res, next) => {
    Impediments.create(req.body)
  })

  impediments.put('/:id', auth, (req, res, next) => {
    Impediments.findById(req.params.id).then(impediment => {
      impediment.name = req.body.name
      impediment.sprint = req.body.sprint
      impediment.task = req.body.task
      impediment.status = req.body.status
      impediment.save({fields: ['name', 'sprint', 'task', 'status']})
    })
  })

  impediments.delete('/:id', auth, (req, res, next) => {
    Impediments.destroy({ where: {id: req.params.id}})
  })

  return impediments
}