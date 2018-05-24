import { Router } from 'express'
import auth from '../utils/auth'

module.exports = (ProductsBacklog) => {
  const productsBacklog = Router()

  productsBacklog.get('/', auth, (req, res, next) => {
    ProductsBacklog.findAll().then(result => res.json(result))
  })

  productsBacklog.get('/:id', auth, (req, res, next) => {
    ProductsBacklog.findById(req.params.id).then(result => res.json(result))
  })

  productsBacklog.get('/:filter_by/eq/:filter_value', auth, (req, res, next) => {
    const filterBy = req.params.filter_by
    const filterValue = req.params.filter_value
    ProductsBacklog.findAll({
      where: {
        [filterBy]: filterValue
      }
    }).then(result => res.json(result))
  })

  productsBacklog.post('/', auth, (req, res, next) => {
    ProductsBacklog.create(req.body).then(backlog => {
      res.status(201).send(backlog)
    })
  })

  productsBacklog.put('/:id', auth, (req, res, next) => {
    ProductsBacklog.findById(req.params.id).then(productBacklog => {
      productBacklog.name = req.body.name
      productBacklog.importance = req.body.importance
      productBacklog.product_id = req.body.product_id
      productBacklog.status = req.body.status
      productBacklog.save({fields: ['name', 'importance', 'product_id', 'status']})
    })
    res.status(204).end()
  })

  productsBacklog.delete('/:id', auth, (req, res, next) => {
    ProductsBacklog.destroy({ where: {id: req.params.id}})
    res.status(204).end()
  })

  return productsBacklog
}
