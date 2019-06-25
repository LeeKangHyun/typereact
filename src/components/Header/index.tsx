import * as React from 'react'
import { compose } from 'redux'

import withController from './Controller'

import {
  Header,
  Link,
  Ul, Li
} from './styled'

interface Props {}

const HeaderComponent: React.FC<Props> = () => {
  return (
    <Header>
      <Ul>
        <Li isLeft={true}>
          <Link to="/">홈</Link>
        </Li>
        <Li>
          <Link to="/products">Product</Link>
        </Li>
        <Li>
          <Link to="/counter">카운터</Link>
        </Li>
        <Li>
          <Link to="/todo">TodoList</Link>
        </Li>
        <Li>
          <Link to="/chat">채팅</Link>
        </Li>
      </Ul>
    </Header>
  )
}

export default compose(
  withController,
)(HeaderComponent)
