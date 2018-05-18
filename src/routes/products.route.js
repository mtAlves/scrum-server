import { Router } from 'express'
import auth from '../utils/auth'

module.exports = (Products) => {
  const products = Router()

  products.get('/', auth, (req, res, next) => {
    Products.findAll().then(result => res.json(result))
  })

  products.get('/:id', auth, (req, res, next) => {
    Products.findById(req.params.id).then(result => res.json(result))
  })

  products.post('/', auth, (req, res, next) => {
    Products.create(req.body)
  })

  products.put('/:id', auth, (req, res, next) => {
    Products.findById(req.params.id).then(product => {
      product.name = req.body.name
      product.started = req.body.started
      product.ended = req.body.ended
      product.sprint = req.body.sprint
      product.product_owner = req.body.product_owner
      product.save({fields: ['name', 'started', 'ended', 'sprint', 'product_owner']})
    })
  })

  products.delete('/:id', auth, (req, res, next) => {
    Products.destroy({ where: {id: req.params.id}})
  })

  return products
}
