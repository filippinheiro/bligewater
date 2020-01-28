const Item = require('../models/Item')

module.exports = {
   async index(request, response) {
      const itens = await Item.find()
      return response.json(itens)
   },
   async show(request, response) {
      const { id } = request.params
      const item = await Item.findById(id)
      return response.json(item)
   },

   async store(request, response) {
      const { unit_price, title, quantity, id, tangible, recipient_id, avatar_url, bio } = request.body

      const filter = { title }

      const dataToUpsert = {
         unit_price,
         title,
         id,
         quantity,
         tangible,
         recipient_id,
         avatar_url,
         bio
      }

      const item = await Item.findOneAndUpdate(filter, dataToUpsert, {
         new: true,
         upsert: true,
         useFindAndModify: false
      })

      return response.status(201).json(item)
   },

   async destroy(request, response) {
      const {title} = request.params
      const item = await Item.findOneAndDelete(title, {
         useFindAndModify: false
      })
      if (!item) return response.status(404).send('Id not found')
      return response.json(item)
   },

   async remove(request, response) {
      const items = await Item.remove({})
      return response.json(items)
   }
}