import { createAction, handleActions } from 'redux-actions'

const INCREMENT = 'counter/INCREMENT'
const DECREMENT = 'counter/DECREMENT'

export const actionsCreators = {
  increment: createAction(INCREMENT),
  decrement: createAction(DECREMENT),
}

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0
}

export default handleActions<CounterState>({
  [INCREMENT]: (state) => ({ value: state.value + 1}),
  [DECREMENT]: (state) => ({ value: state.value - 1})
}, initialState)
