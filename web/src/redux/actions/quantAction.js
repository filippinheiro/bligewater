export default {
   setQuant(quantity) {
       return { type: 'SET_QUANTITY', payload: quantity}
   },
   setAmount(amount) {
      return {type: 'SET_AMOUNT', payload: amount}
   },
   addRecipient(recipient, recipients_array) {
       if(recipients_array.includes(recipient))
         return {type: 'ADD_RECIPIENT', payload: recipients_array}
       return {type: 'ADD_RECIPIENT', payload: [...recipients_array, recipient]}
   },
   removeRecipient(recipient, recipients_array) {
       const newArray = recipients_array.filter(item => (item !== recipient || item === 're_ck5v9pnid0bl7k96eq4madsyx'))
       return {type: 'REMOVE_RECIPIENT', payload: newArray}
   }
}