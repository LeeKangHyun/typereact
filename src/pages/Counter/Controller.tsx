import React, { Component, ComponentType } from 'react'
import { Subtract } from 'utility-types'

export interface InjectedCounterProps {
  value: number
  onIncrement(): void
  onDecrement(): void
  onMultiple(): void
  onDivision(): void
}

interface CounterState {
  value: number
}

export default <P extends InjectedCounterProps>(CounterComponent: ComponentType<P>) => (
  class Counter extends Component<Subtract<P, InjectedCounterProps>, CounterState> {
    constructor(props: Subtract<P, InjectedCounterProps>) {
      super(props)
      this.state = {
        value: 0,
      }
    }
    
    increment = () => {
      this.setState((prevState) => ({
        value: prevState.value + 1
      }))
    }
    
    decrement = () => {
      this.setState(prevState => ({
        value: prevState.value - 1
      }))
    }
    
    multiple = () => {
      this.setState(prevState => ({
        value: prevState.value << 1
      }))
    }
    
    division = () => {
      this.setState(prevState => ({
        value: prevState.value >> 1
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
          onMultiple={this.multiple}
          onDivision={this.division}
        />
      )
    }
  }
)
