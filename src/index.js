import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();
ReactDOM.render(
  <React.Fragment>
    <Router history={history}>
      <App />
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);
reportWebVitals();
