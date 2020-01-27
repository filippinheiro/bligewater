export default {
   setQuant(quantity) {
       return { type: 'SET_QUANTITY', payload: quantity}
   },
   setAmount(amount) {
      return {type: 'SET_AMOUNT', payload: amount}
   }
}