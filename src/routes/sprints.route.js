import { Router } from 'express'
import auth from '../utils/auth'

module.exports = (Sprints) => {
  const sprints = Router()

  sprints.get('/', auth, (req, res, next) => {
    Sprints.findAll().then(result => res.json(result))
  })

  sprints.get('/:id', auth, (req, res, next) => {
    Sprints.findById(req.params.id).then(result => res.json(result))
  })

  sprints.post('/', auth, (req, res, next) => {
    Sprints.create(req.body)
  })

  sprints.put('/:id', auth, (req, res, next) => {
    Sprints.findById(req.params.id).then(sprint => {
      sprint.name = req.body.name
      sprint.started = req.body.started
      sprint.ended = req.body.ended
      sprint.product = req.body.product
      sprint.scrum_master = req.body.scrum_master
      sprint.save({fields: ['name', 'started', 'ended','product', 'scrum_master']})
    })
  })

  sprints.delete('/:id', auth, (req, res, next) => {
    Sprints.destroy({ where: {id: req.params.id}})
  })

  return sprints
}
