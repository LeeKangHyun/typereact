import * as React from 'react'
import { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const Header = React.lazy(() => import(/* webpackChunkName: 'Header' */ 'components/Header'))
const Main = React.lazy(() => import(/* webpackChunkName: 'Main' */ 'pages/Main'))
const Product = React.lazy(() => import(/* webpackChunkName: 'Product' */ 'pages/Products'))
const Counter = React.lazy(() => import(/* webpackChunkName: 'Counter' */ 'pages/Counter'))
const TodoList = React.lazy(() => import(/* webpackChunkName: 'TodoList' */ 'pages/TodoList'))

export default function AppRouter(): JSX.Element {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/products/:id" component={Product} />
            <Route path="/counter" component={Counter} />
            <Route path="/todo" component={TodoList} />
          </Switch>
        </div>
      </Suspense>
    </Router>
  )
}

