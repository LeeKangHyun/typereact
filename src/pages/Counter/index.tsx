import * as React from 'react'

import withController from './Controller'

interface Props {
  value: number
  increment(): void
  decrement(): void
}

const CounterComponent: React.FC<Props> = ({
  value,
  increment,
  decrement
}) => {
  return (
    <div>
      <button onClick={decrement}>-</button>
      {value}
      <button onClick={increment}>+</button>
    </div>
  )
}

export default withController(CounterComponent)
