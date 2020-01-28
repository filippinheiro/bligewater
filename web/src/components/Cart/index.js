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
       const checkout = new window.PagarMeCheckout.Checkout({
        encryption_key: config.ENCRIPTION_KEY,
        success: async function(data) {

            const response = await api.post('/capture', {
                id: data.token,
                recipients,
                amount
            })

            console.log(data, response.data);
        },
        error: function(err) {
        	console.log(err);
        },
        close: function() {
        	console.log('The modal has been closed.');
        }
      });

    checkout.open({
      amount,
      createToken: 'true',
      paymentMethods: 'credit_card,boleto',
      customerData: 'true',
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
