import { Router } from 'express'
import auth from '../utils/auth'

export default (Projects) => {
  const projects = Router()

  projects.get('/', auth, (req, res, next) => {
    Projects.findAll().then(result => res.json(result))
  })

  projects.get('/:id', auth, (req, res, next) => {
    Projects.findById(req.params.id).then(result => res.json(result))
  })

  projects.post('/', auth, (req, res, next) => {
    Projects.create(req.body)
  })

  projects.put('/:id', auth, (req, res, next) => {
    Projects.findById(req.params.id).then(project => {
      project.name = req.body.name
      project.started = req.body.started
      project.ended = req.body.ended
      project.sprint = req.body.sprint
      project.product_owner = req.body.product_owner
      project.backlog = req.body.backlog
      project.save({fields: ['name', 'started', 'ended', 'sprint', 'product_owner', 'backlog']})
    })
  })

  projects.delete('/:id', auth, (req, res, next) => {
    Projects.destroy({ where: {id: req.params.id}})
  })

  return projects
}
