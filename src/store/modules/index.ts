import { combineReducers } from 'redux'
import counter, { CounterState } from './Counter'
import todos, { TodoState } from './Todos'

export interface StoreState {
  counter: CounterState,
  todos: TodoState,
}

export default combineReducers({
  counter,
  todos,
})
