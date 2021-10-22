import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux';
import store from './redux/store';
const history = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <Router history={history}>
        <App />
      </Router>
    </React.Fragment>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
