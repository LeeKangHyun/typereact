import * as React from 'react'
import { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const Header = React.lazy(() => import(/* webpackChunkName: 'Header' */ 'components/Header'))
const Index = React.lazy(() => import(/* webpackChunkName: 'MainIndex' */ 'pages/Main'))
const Product = React.lazy(() => import(/* webpackChunkName: 'Product' */ 'pages/Products'))
const Counter = React.lazy(() => import(/* webpackChunkName: 'Counter' */ 'pages/Counter'))

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/products/:id" component={Product} />
            <Route path="/counter" component={Counter} />
          </Switch>
        </div>
      </Suspense>
    </Router>
  )
}

