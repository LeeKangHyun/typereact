import * as React from 'react'

export default <P extends object>(ProductComponent: React.ComponentType<P>) => class extends React.Component<P> {
  render() {
    const { ...props } = this.props
    return (
        <ProductComponent {...props as P} />
      )
  }
}
