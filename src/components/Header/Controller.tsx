import * as React from 'react'

export default <P extends object>(HeaderComponent: React.ComponentType<P>) => class extends React.Component<P> {
  render() {
    const { ...props } = this.props
    return (
      <HeaderComponent {...props as P} />
    )
  }
}
