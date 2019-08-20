import modules from './modules'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore() {
  return createStore(
    modules,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware)
    )
  )
}

export const runSaga = sagaMiddleware.run
