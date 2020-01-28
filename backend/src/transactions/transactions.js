const { client } = require('pagarme')
const Item = require('../models/Item')
const dotenv = require('dotenv')

dotenv.config()

const api_key = process.env.API_KEY

module.exports = {
   async capture(request, response) {
      const { id, amount, items } = request.body

      try {


         const size = await Item.count()
         let split_rules = []


         console.log(items)

         console.log(size)

         function sortById(id) {
            return items.sort(function (a, b) {
               let x = a[id]; let y = b[id];
               return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
         }

         sortById('id')

         if (size === 1 && items[0].recipient_id === 're_ck5v9pnid0bl7k96eq4madsyx') {
         } else if (size === 1 || size === 2) {
            split_rules = [
               {
                  recipient_id: items[1].recipient_id,
                  percentage: 25,
                  liable: false,
                  charge_processing_fee: false
               },
               {
                  recipient_id: 're_ck5v9pnid0bl7k96eq4madsyx',
                  percentage: 75,
                  liable: true,
                  charge_processing_fee: true
               }
            ]
         } else if (size === 3) {
            split_rules = [{
               recipient_id: items[1].recipient_id,
               percentage: 12,
               liable: false,
               charge_processing_fee: false
            },
            {
               recipient_id: items[2].recipient_id,
               percentage: 12,
               liable: false,
               charge_processing_fee: false
            },
            {
               recipient_id: 're_ck5v9pnid0bl7k96eq4madsyx',
               percentage: 76,
               liable: true,
               charge_processing_fee: true
            }]
         }

         const clientConnection = await client.connect({
            api_key,
         })

         try {
            const transaction = await clientConnection.transactions.capture({
               id,
               amount,
               split_rules
            })
         }
         catch (err) {
            return response.status(err.response.status).json(err.response)
         }

         if (transaction.payment_method === 'boleto') {
            clientConnection.transactions.collectPayment({
               id: transaction.id,
               email: transaction.customer.external_link
            })
         }

         return response.status(200).json({
            transaction
         })
      } catch (err) {
         return response.json(err)
      }
   }
}