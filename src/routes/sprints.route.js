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

  sprints.get('/:filter_by/eq/:filter_value', auth, (req, res, next) => {
    const filterBy = req.params.filter_by
    const filterValue = req.params.filter_value
    Sprints.findAll({
      where: {
        [filterBy]: filterValue
      }
    }).then(result => res.json(result))
  })

  sprints.post('/', auth, (req, res, next) => {
    Sprints.create(req.body).then(sprint => {
      res.status(201).send(sprint)
    })
  })

  sprints.put('/:id', auth, (req, res, next) => {
    Sprints.findById(req.params.id).then(sprint => {
      sprint.name = req.body.name
      sprint.started = req.body.started
      sprint.ended = req.body.ended
      sprint.product_id = req.body.product_id
      sprint.scrum_master_id = req.body.scrum_master_id
      sprint.save({fields: ['name', 'started', 'ended','product_id', 'scrum_master_id']})
    })
    res.status(204).end()
  })

  sprints.delete('/:id', auth, (req, res, next) => {
    Sprints.destroy({ where: {id: req.params.id}})
    res.status(204).end()
  })

  return sprints
}
