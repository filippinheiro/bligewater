import React  from 'react'
import {connect} from 'react-redux'
import Item from '../components/Item'

import '../global.css'
import './styles.css'

import Cart from '../components/Cart';


function App({cartQuantity, amount}) {

  

  const itens = [
    {
      _id: 1,
      name: 'Chapéu de Marinheiro Branco',
      bio: 'Um chapéu bem bonito, disponível apenas na cor branco, imagem ilustrativa',
      avatar_url: require('../assets/chapeu_branco.jpg'),
      price: 3000
    },
    {
      _id: 2,
      name: 'Arpao afiado',
      bio: 'Esse arpão não deve ser comprado por crianças ou pelo Lars',
      avatar_url: require('../assets/arpao_afiado.jpg'),
      price: 20000
    },
    {
      _id: 3,
      name: 'Jogo de Baralho personalizado',
      bio: 'Bem, é um jogo de baralho... personalizado',
      avatar_url: require('../assets/baralho_personalizado.jpg'),
      price: 5000
    },

  ]

  return (
    <div id="app">
      <aside>
        <strong>Carrinho</strong>
        <Cart quantity={cartQuantity} amount={amount} />
      </aside>
      <main>
        <header id="title">Blingewater Store</header>
        <ul>
          {itens.map(item => (
            <>
              <Item key={item._id} item={item}/>
            </>
          )
          )}
        </ul>
      </main>
    </div>
  );
}

export default connect(store => ({ cartQuantity: store.quantity, amount: store.amount }))(App)