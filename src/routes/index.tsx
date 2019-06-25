import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

const Header = lazy(() => import(/* webpackChunkName: 'Header' */ 'components/Header'))
const Main = lazy(() => import(/* webpackChunkName: 'Main' */ 'pages/Main'))
const Product = lazy(() => import(/* webpackChunkName: 'Product' */ 'pages/Products'))
const Counter = lazy(() => import(/* webpackChunkName: 'Counter' */ 'pages/Counter'))
const TodoList = lazy(() => import(/* webpackChunkName: 'TodoList' */ 'pages/TodoList'))
const Chat = lazy(() => import(/* webpackChunkName: 'Chat' */ 'pages/Chat'))

const Wrap = styled.div``

const GlobalStyled = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }
`

export default function AppRouter(): JSX.Element {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Wrap>
          <GlobalStyled />
          <Header />
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/products/:id" component={Product} />
            <Route path="/counter" component={Counter} />
            <Route path="/todo" component={TodoList} />
            <Route path="/chat" component={Chat} />
          </Switch>
        </Wrap>
      </Suspense>
    </Router>
  )
}

