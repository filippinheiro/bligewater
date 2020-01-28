const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
   id: Number,
   unit_price: Number,
   title: String,
   quantity: Number,
   tangible: Boolean,
   bio: String,
   recipient_id: String,
   avatar_url: String
})

module.exports = mongoose.model('Item', itemSchema)