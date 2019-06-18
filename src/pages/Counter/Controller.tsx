import * as React from 'react'

interface CounterProps {

}

interface CounterState {
  value: number
}

export default <P extends object>(CounterComponent: React.ComponentType<P>) => (
  class extends React.Component<CounterProps, CounterState> {
    constructor(props: CounterProps) {
      super(props)
      this.state = {
        value: 0
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
    
    render() {
      const { ...props } = this.props
      return (
        <CounterComponent
          {...props as P}
          {...this.state as CounterState}
          increment={this.increment}
          decrement={this.decrement}
        />
      )
    }
  }
)
