import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import App from 'containers/App';
import './bootstrap.min.css';
import 'rc-slider/assets/index.css';
import 'react-select/dist/react-select.css';
import 'fonts/fonts.css';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
