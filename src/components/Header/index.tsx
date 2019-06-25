import * as React from 'react'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import withController from './Controller'

interface Props {}

const HeaderComponent: React.FC<Props> = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products/1">First Product</Link>
        </li>
        <li>
          <Link to="/products/2">Second Product</Link>
        </li>
        <li>
          <Link to="/counter">Counter</Link>
        </li>
        <li>
          <Link to="/todo">TodoList</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
      </ul>
    </nav>
  )
}

export default compose(
  withController,
)(HeaderComponent)
