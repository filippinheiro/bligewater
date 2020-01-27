import React from 'react';
import './styles.css'

function LoginForm({ quantity, amount }) {

   function format(value) {
      const price = value / 100
      const price_formatted = 'R$' + price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, 'R$1,')
      return price_formatted
   }

   return (
      <form>
         <label>{quantity} Itens no carrinho</label>
         <label>{format(amount)} - valor total</label>
         <button type="submit">Finalizar Compra</button>
      </form>
   )
}

export default LoginForm;
