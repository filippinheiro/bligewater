const express = require('express')
const dotenv = require('dotenv')
const routes = require('./routes.js')

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())


app.use('/', routes)

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))