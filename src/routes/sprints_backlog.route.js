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
  
  sprintsBacklog.get('/:filter_by/eq/:filter_value', auth, (req, res, next) => {
    const filterBy = req.params.filter_by
    const filterValue = req.params.filter_value
    SprintsBacklog.findAll({
      where: {
        [filterBy]: filterValue
      }
    }).then(result => res.json(result))
  })


  sprintsBacklog.post('/', auth, (req, res, next) => {
    SprintsBacklog.create(req.body).then(backlog => {
      res.status(201).send(backlog)
    })
  })

  sprintsBacklog.put('/:id', auth, (req, res, next) => {
    SprintsBacklog.findById(req.params.id).then(sprintBacklog => {
      sprintBacklog.name = req.body.name
      sprintBacklog.sprint_id = req.body.sprint_id
      sprintBacklog.save({fields: ['name', 'sprint_id']})
    })
    res.status(204).end()
  })

  sprintsBacklog.delete('/:id', auth, (req, res, next) => {
    SprintsBacklog.destroy({ where: {id: req.params.id}})
    res.status(204).end()
  })

  return sprintsBacklog
}
