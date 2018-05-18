import { Router } from 'express'
import auth from '../utils/auth'

module.exports = (SprintsBacklog) => {
  const sprintsBacklog = Router()

  sprintsBacklog.get('/', auth, (req, res, next) => {
    SprintsBacklog.findAll().then(result => res.json(result))
  })

  sprintsBacklog.get('/:id', auth, (req, res, next) => {
    SprintsBacklog.findById(req.params.id).then(result => res.json(result))
  })

  sprintsBacklog.post('/', auth, (req, res, next) => {
    SprintsBacklog.create(req.body)
  })

  sprintsBacklog.put('/:id', auth, (req, res, next) => {
    SprintsBacklog.findById(req.params.id).then(sprintBacklog => {
      sprintBacklog.name = req.body.name
      sprintBacklog.sprint = req.body.sprint
      sprintBacklog.save({fields: ['name', 'sprint']})
    })
  })

  sprintsBacklog.delete('/:id', auth, (req, res, next) => {
    SprintsBacklog.destroy({ where: {id: req.params.id}})
  })

  return sprintsBacklog
}
