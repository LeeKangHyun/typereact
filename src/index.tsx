import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import AppRouter from './routes';
import * as serviceWorker from './serviceWorker';

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
