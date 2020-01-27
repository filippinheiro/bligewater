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
                token,
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

      const token = await checkout.open({
        amount,
        buttonText: 'Pagar',
        buttonClass: 'botao-pagamento',
        customerData: 'false',
        createToken: 'true',
        paymentMethods: 'credit_card',
        customer: {
          external_id: '#123456789',
          name: 'Fulano',
          type: 'individual',
          country: 'br',
          email: 'fulano@email.com',
          documents: [
            {
              type: 'cpf',
              number: '71404665560',
            },
          ],
          phone_numbers: ['+5511999998888', '+5511888889999'],
          birthday: '1985-01-01'
        }
      });
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
