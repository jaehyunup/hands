import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root'
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from "redux";
import reducer from './reducers'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <Provider
    store={createStore(
      reducer,
    )}>

      <Root/>

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
