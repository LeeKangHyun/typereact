import React, { FC } from 'react'

import withController, { InjectedCounterProps } from './Controller'

import { Wrap, Btn } from './styled'

const CounterComponent: FC<InjectedCounterProps> = ({
  value,
  onIncrement,
  onDecrement,
  onMultiple,
  onDivision,
}) => {
  return (
    <Wrap>
      <Btn onClick={onDecrement}>-</Btn>
      <Btn onClick={onIncrement}>+</Btn>
      <Btn onClick={onMultiple}>x</Btn>
      <Btn onClick={onDivision}>/</Btn>
      {value}
    </Wrap>
  )
}

export default withController(CounterComponent)
