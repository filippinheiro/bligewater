const { Router } = require('express')
const transactions = require('./transactions/transactions.js')
const ItemController = require('./controllers/ItemController')

const routes = Router()


routes.post('/capture', transactions.capture)
routes.get('/items', ItemController.index)
routes.get('/items/:id', ItemController.show)
routes.post('/items', ItemController.store)
routes.delete('/items/:id', ItemController.destroy)
routes.delete('/items', ItemController.remove)

module.exports = routes