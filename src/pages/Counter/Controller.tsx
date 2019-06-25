import React, { Component, ComponentType } from 'react'
import { Subtract } from 'utility-types'

export interface InjectedCounterProps {
  value: number
  onIncrement(): void
  onDecrement(): void
}

interface CounterProps {
  minValue?: number
  maxValue?: number
}

interface CounterState {
  value: number
}

export default <P extends InjectedCounterProps>(CounterComponent: ComponentType<P>) => (
  class Counter extends Component<Subtract<P, InjectedCounterProps> & CounterProps, CounterState> {
    constructor(props: Subtract<P, InjectedCounterProps> & CounterProps) {
      super(props)
      this.state = {
        value: 0,
      }
    }
    
    increment = () => {
      this.setState((prevState) => ({
        value: prevState.value === this.props.maxValue ?
          prevState.value : prevState.value + 1
      }))
    }
    
    decrement = () => {
      this.setState(prevState => ({
        value: prevState.value === this.props.minValue ?
          prevState.value : prevState.value - 1
      }))
    }
    
    render() {
      const { ...props } = this.props
      return (
        <CounterComponent
          {...props as P}
          {...this.state as CounterState}
          onIncrement={this.increment}
          onDecrement={this.decrement}
        />
      )
    }
  }
)
