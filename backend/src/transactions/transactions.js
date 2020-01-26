const { client } = require('pagarme')
const dotenv = require('dotenv')

dotenv.config()

const api_key = process.env.API_KEY

module.exports = {
   async capture(request, response) {
      const { id, recipient_id, amount} = request.body
      try {
      const clientConnection = await client.connect({
         api_key
      })
      const capture = await clientConnection.transactions.capture({
         id,
         split_rules: [
            {
               'recipient_id': 're_ck5v9pnid0bl7k96eq4madsyx',
               'liable': 'true',
               'charge_processing_fee': 'true',
               'percentage': '75',
            },
            {
               'recipient_id': recipient_id,
               'liable': 'false',
               'charge_processing_fee': 'false',
               'percentage': '25',
            }
         ]
      }, 
      amount)
      return response.status(200).json({
         capture
      })
   } catch(err) {
      return response.status(err.response.status).json(err.response.errors)
   }
   }
}