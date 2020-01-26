const { Router } = require('express')
const transactions = require('./transactions/transactions.js')

const routes = Router()


routes.post('/capture', transactions.capture)

module.exports = routes