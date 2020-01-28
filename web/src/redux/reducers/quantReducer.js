const initialState = { quantity: 0, amount: 0, recipients: []}

export default (state = initialState, action) => {
   switch (action.type) {
      case 'SET_QUANTITY':
         return { ...state, quantity: action.payload }
      case 'SET_AMOUNT':
         return {...state, amount: action.payload}
      case 'ADD_RECIPIENT':
         return {...state, recipients: action.payload}
      case 'REMOVE_RECIPIENT':
         return {...state, recipients: action.payload}
      default:
         return state
   }
}