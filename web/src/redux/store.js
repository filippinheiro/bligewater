import { createStore } from 'redux'
import appReducer from './reducers/quantReducer'

export default createStore(appReducer)