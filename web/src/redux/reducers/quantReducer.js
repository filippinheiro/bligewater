const initialState = { quantity: 0, amount: 0 }

export default (state = initialState, action) => {
   switch (action.type) {
      case 'SET_QUANTITY':
         return { ...state, quantity: action.payload }
      case 'SET_AMOUNT':
         return {...state, amount: action.payload}
      default:
         return state
   }
}