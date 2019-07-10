import { Component } from 'react'
import ReactDOM from 'react-dom'

interface P {
  children?: Node
}

class ToastComponent extends Component<P> {
  el: Element
  constructor(props: P) {
    super(props)
    
    this.el = document.createElement('div')
    this.el.setAttribute('id', 'Toast')
  }
  
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    )
  }
}

export default ToastComponent
