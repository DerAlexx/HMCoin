import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Transactions from './services/Transactions';
import OpenTransactions from './services/opentrans';
import CoinTransaction from './services/CoinTransaction';
import reportWebVitals from './reportWebVitals';
import AllAddresses from './services/addresses'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import {createBrowserHistory} from 'history';

const browserHistory = createBrowserHistory();

const router = (
  <Router history={browserHistory}>
    <div>
      <Route exact path="/" component={App}  />
      <Route exact path="/transactions" component={Transactions}  />
      <Route exact path="/opentransactions" component={OpenTransactions}  />
      <Route exact path="/send" component={CoinTransaction}  /> 
      <Route exact path="/alladdresses" component={AllAddresses}  /> 
    </div>
  </Router>
)


ReactDOM.render(
  router,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
