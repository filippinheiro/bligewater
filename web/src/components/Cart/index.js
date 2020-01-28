import React from 'react'
import {connect} from 'react-redux'
import api from '../../services/api'
import './styles.css'
import config from '../../config/private.json'

function Cart({ quantity, amount, recipients }) {

   function format(value) {
      const price = value / 100
      const price_formatted = 'R$' + price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, 'R$1,')
      return price_formatted
   }

   async function handleSubmit(event) {

       event.preventDefault()
       const response = await api.get('/items')
       const items = response.data.map(item => ({
           id: item.id,
           title: item.title,
           unit_price: item.unit_price,
           quantity: item.quantity,
           tangible: item.tangible
       }))
       const checkout = new window.PagarMeCheckout.Checkout({
        encryption_key: config.ENCRIPTION_KEY,
        success: async function(data) {

        await api.post('/capture', {
            id: data.token,
            items: response.data,
            amount,
        })
        await api.delete('/items')
        },
        error: function(err) {
        	console.log(err);
        },
        close: async function() {
            console.log('The modal has been closed.');
        }
      });

    checkout.open({
      amount,
      createToken: 'true',
      paymentMethods: 'credit_card,boleto',
      customerData: 'true',
      items
   })
  }

   return (
      <form onSubmit={handleSubmit}>
         <label>{quantity} Itens no carrinho</label>
         <label>{format(amount)} - valor total</label>
         <button type="submit" disabled={amount===0}>Finalizar Compra</button>
      </form>
   )
}

export default connect(store => ({recipients: store.recipients}))(Cart)
