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

  impediments.get('/:filter_by/eq/:filter_value', auth, (req, res, next) => {
    const filterBy = req.params.filter_by
    const filterValue = req.params.filter_value
    Impediments.findAll({
      where: {
        [filterBy]: filterValue
      }
    }).then(result => res.json(result))
  })

  impediments.post('/', auth, (req, res, next) => {
    Impediments.create(req.body).then(impediment => {
      res.status(201).send(impediment)
    })
  })

  impediments.put('/:id', auth, (req, res, next) => {
    Impediments.findById(req.params.id).then(impediment => {
      impediment.name = req.body.name
      impediment.sprint_id = req.body.sprint_id
      impediment.task_id = req.body.task_id
      impediment.status = req.body.status
      impediment.save({fields: ['name', 'sprint_id', 'task_id', 'status']})
    })
    res.status(204).end()
  })

  impediments.delete('/:id', auth, (req, res, next) => {
    Impediments.destroy({ where: {id: req.params.id}})
    res.status(204).end()
  })

  return impediments
}
