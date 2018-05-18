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

  productsBacklog.post('/', auth, (req, res, next) => {
    ProductsBacklog.create(req.body)
  })

  productsBacklog.put('/:id', auth, (req, res, next) => {
    ProductsBacklog.findById(req.params.id).then(productBacklog => {
      productBacklog.name = req.body.name
      productBacklog.importance = req.body.importance
      productBacklog.product = req.body.product
      productBacklog.save({fields: ['name', 'importance', 'product']})
    })
  })

  productsBacklog.delete('/:id', auth, (req, res, next) => {
    ProductsBacklog.destroy({ where: {id: req.params.id}})
  })

  return productsBacklog
}
