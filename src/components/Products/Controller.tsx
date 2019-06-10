import React, { Component, ComponentType } from 'react'

export default <P extends object>(ProductComponent: ComponentType<P>) => class extends Component<P> {
  render() {
    const { ...props } = this.props
    return (
        <ProductComponent {...props as P} />
      )
  }
}
