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

  products.get('/:filter_by/eq/:filter_value', auth, (req, res, next) => {
    const filterBy = req.params.filter_by
    const filterValue = req.params.filter_value
    Products.findAll({
      where: {
        [filterBy]: filterValue
      }
    }).then(result => res.json(result))
  })

  products.post('/', auth, (req, res, next) => {
    Products.create(req.body).then(created => {
      res.status(201).send(created)
    })
  })

  products.put('/:id', auth, (req, res, next) => {
    Products.findById(req.params.id).then(product => {
      product.name = req.body.name
      product.started = req.body.started
      product.ended = req.body.ended
      product.product_owner_id = req.body.product_owner_id
      product.save({fields: ['name', 'started', 'ended', 'product_owner_id']})
    })
    res.status(204).end()
  })

  products.delete('/:id', auth, (req, res, next) => {
    Products.destroy({ where: {id: req.params.id}})
    res.status(204).end()
  })

  return products
}
