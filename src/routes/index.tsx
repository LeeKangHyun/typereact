import * as React from 'react'
import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

const Header = lazy(() => import(/* webpackChunkName: 'Header' */ 'components/Header'))
const Main = lazy(() => import(/* webpackChunkName: 'Main' */ 'pages/Main'))
const Product = lazy(() => import(/* webpackChunkName: 'Product' */ 'pages/Products'))
const Counter = lazy(() => import(/* webpackChunkName: 'Counter' */ 'pages/Counter'))
const TodoList = lazy(() => import(/* webpackChunkName: 'TodoList' */ 'pages/TodoList'))
const HookTodo = lazy(() => import(/* webpackChunkName: 'HookTodoList' */ 'pages/HookTodo'))
const Chat = lazy(() => import(/* webpackChunkName: 'Chat' */ 'pages/Chat'))
const Chart = lazy(() => import(/* webpackChunkName: 'Chart' */ 'pages/Chart'))

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

function AppRouter(): JSX.Element {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Wrap>
          <GlobalStyled />
          <Header />
          <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/products/:id" component={Product} />
            <Route path="/counter" component={Counter} />
            <Route path="/todo" component={TodoList} />
            <Route path="/hook_todo" component={HookTodo} />
            <Route path="/chat" component={Chat} />
            <Route path="/chart" component={Chart} />
            <Redirect to="/" />
          </Switch>
        </Wrap>
      </Suspense>
    </Router>
  )
}

export default AppRouter
