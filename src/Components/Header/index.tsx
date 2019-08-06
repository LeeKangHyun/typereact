import * as React from 'react'
import { FC } from 'react'
import { compose } from 'redux'

import withController from './Controller'

import {
  Header,
  Link,
  Ul, Li
} from './styled'


const HeaderComponent: FC = () => {
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
        {/*<Li>*/}
        {/*  <Link to="/hook_todo">HookTodo</Link>*/}
        {/*</Li>*/}
        <Li>
          <Link to="/todo">TodoList</Link>
        </Li>
        <Li>
          <Link to="/chart">차트</Link>
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
