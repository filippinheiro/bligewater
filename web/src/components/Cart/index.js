import React from 'react'
import api from '../../services/api'
import './styles.css'
import config from '../../config/private.json'

function Cart({ quantity, amount }) {

   function format(value) {
      const price = value / 100
      const price_formatted = 'R$' + price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, 'R$1,')
      return price_formatted
   }

   async function handleSubmit(event) {
       event.preventDefault()
       const checkout = new window.PagarMeCheckout.Checkout({
        encryption_key: config.API_KEY,
        success: function(data) {
            api.post('/capture', {
                id: data.token,
                recipient_id: 're_ck5v9pxgj09l1xg6fs3e3zsva'
            })
            console.log(data);
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
    paymentMethods: 'credit_card',
    customerData: false,
    billing: {
      name: 'Ciclano de Tal',
      address: {
        country: 'br',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Fulanos bairro',
        street: 'Rua dos fulanos',
        street_number: '123',
        zipcode: '05170060'
      }
    },
    shipping: {
      name: 'Ciclano de Tal',
      fee: 12345,
      delivery_date: '2017-12-25',
      expedited: true,
      address: {
        country: 'br',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Fulanos bairro',
        street: 'Rua dos fulanos',
        street_number: '123',
        zipcode: '05170060'
      }
    },
    items: [
      {
        id: '1',
        title: 'Bola de futebol',
        unit_price: 12000,
        quantity: 1,
        tangible: true
      },
      {
        id: 'a123',
        title: 'Caderno do Goku',
        unit_price: 3200,
        quantity: 3,
        tangible: true
      }
    ]
  })
   }

   return (
      <form onSubmit={handleSubmit}>
         <label>{quantity} Itens no carrinho</label>
         <label>{format(amount)} - valor total</label>
         <button type="submit">Finalizar Compra</button>
      </form>
   )
}

export default Cart;
