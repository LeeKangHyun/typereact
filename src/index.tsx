import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import configureStore, { runSaga } from './store/configureStore'
import rootSaga from './sagas'
import AppRouter from './routes';
import * as serviceWorker from './serviceWorker';

const store = configureStore()
runSaga(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
