import modules from './modules'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export default function configureStore() {
  return createStore(
    modules,
    composeWithDevTools(
      applyMiddleware()
    )
  )
}
