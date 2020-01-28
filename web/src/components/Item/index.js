import React, { useState  } from 'react'
import { connect } from 'react-redux'
import './styles.css'
import quantActions from '../../redux/actions/quantAction'

function Item({ item, cartQuantity, dispatch, amount, recipients}) {

  const [quantity, setQuantity] = useState(0)
  
  function setCartQuantity(additionalValue) {
    setQuantity(quantity + additionalValue)
    dispatch(quantActions.setQuant(cartQuantity + additionalValue)) 
    dispatch(quantActions.setAmount(amount + (additionalValue) * item.unit_price))
  }


  function addRecipient() {
      dispatch(quantActions.addRecipient(item.recipient_id, recipients))
  }

  function removeRecipient() {
      dispatch(quantActions.removeRecipient(item.recipient_id, recipients))
  }

  function format(value) {
    const price = value / 100
    const price_formatted = 'R$' + price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, 'R$1,')
    return price_formatted
  }

  return (
    <li key={item.id} className="item">
      <header>
        <img src={item.avatar_url} alt={item.title} />
        <div className="item-info">
          <strong>
            {item.title}
          </strong>
        </div>
      </header>
      <p>{item.bio}</p>
      <div className="price-block">
        <button id="plus" className="quant-button"
          disabled={quantity === 3 || cartQuantity >= 3}
          onClick={() => {
            setCartQuantity(1)
            addRecipient()
          }
          }>+</button>
        <p id="quantidade">{quantity}</p>
        <button className="quant-button"
          disabled={quantity === 0}
          onClick={() => {
            setCartQuantity(-1)
            if(quantity)
            removeRecipient()
          }
          }>-</button>
        <p id="price">{format(item.unit_price)}</p>
      </div>
    </li>
  )
}


export default connect(store => ({ cartQuantity: store.quantity, amount: store.amount, recipients: store.recipients}))(Item);
