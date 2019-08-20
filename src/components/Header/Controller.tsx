import * as React from 'react'
import { Component, ComponentType } from 'react'

const Controller = <P extends object>(HeaderComponent: ComponentType<P>) => (
  class extends Component<P> {
    render() {
      return (
        <HeaderComponent
          {...this.props as P}
        />
      )
    }
  }
)
export default Controller
