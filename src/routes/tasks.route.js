import { Router } from 'express'
import auth from '../utils/auth'

module.exports = (Tasks) => {
  const tasks = Router()

  tasks.get('/', auth, (req, res, next) => {
    Tasks.findAll().then(result => res.json(result))
  })

  tasks.get('/:id', auth, (req, res, next) => {
    Tasks.findById(req.params.id).then(result => res.json(result))
  })

  tasks.get('/:filter_by/eq/:filter_value', auth, (req, res, next) => {
    const filterBy = req.params.filter_by
    const filterValue = req.params.filter_value
    Tasks.findAll({
      where: {
        [filterBy]: filterValue
      }
    }).then(result => res.json(result))
  })

  tasks.post('/', auth, (req, res, next) => {
    Tasks.create(req.body)
  })

  tasks.put('/:id', auth, (req, res, next) => {
    Tasks.findById(req.params.id).then(task => {
      task.name = req.body.name
      task.status = req.body.status
      task.started = req.body.started
      task.ended = req.body.ended
      task.sprint_id = req.body.sprint_id
      task.save({fields: ['name', 'status', 'started', 'ended', 'sprint_id']})
    })
  })

  tasks.delete('/:id', auth, (req, res, next) => {
    Tasks.destroy({ where: {id: req.params.id}})
  })

  return tasks
}
