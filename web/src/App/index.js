import React from 'react'
import {connect} from 'react-redux'
import Item from '../components/Item'

import '../global.css'
import './styles.css'


import Cart from '../components/Cart';


function App({cartQuantity, amount }) {

        const itens = [
            {
            id: 1,
            title: 'Chapéu de Marinheiro Branco',
            bio: 'Um chapéu bem bonito, disponível apenas na cor branco, imagem ilustrativa',
            avatar_url: require('../assets/chapeu_branco.jpg'),
            recipient_id: 're_ck5v9pnid0bl7k96eq4madsyx',
            unit_price: 3000,
            tangible: true
            },
            {
            id: 2,
            title: 'Arpao afiado',
            recipient_id: 're_ck5v9pxgj09l1xg6fs3e3zsva',
            bio: 'Esse arpão não deve ser comprado por crianças ou pelo Lars',
            avatar_url: require('../assets/arpao_afiado.jpg'),
            unit_price: 20000,
            tangible: true
            },
            {
            id: 3,
            title: 'Jogo de Baralho personalizado',
            recipient_id: 're_ck5v9ps6e09kzxg6fvn5sefq8',
            bio: 'Bem, é um jogo de baralho... personalizado',
            avatar_url: require('../assets/baralho_personalizado.jpg'),
            unit_price: 5000,
            tangible: true
            }
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
              <Item key={item.id} item={item}/>
            </>
          )
          )}
        </ul>
      </main>
    </div>
  );
}

export default connect(store => ({ cartQuantity: store.quantity, amount: store.amount, itens: store.itens }))(App)