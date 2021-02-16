import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider  } from 'react-redux';

import App from '../components/App';
import { createStore, applyMiddleware } from 'redux';
import userApp from '../reducers'
import promiseMiddlerware from "redux-promise";
import reduxThunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { createBrowserHistory } from 'history';
import { PersistGate } from "redux-persist/integration/react";

const history = createBrowserHistory(); //히스토리 객체 반환


const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddlerware,
  reduxThunk
)(createStore);

const Root = () => (
  <BrowserRouter history={history}>
    <Provider store={createStoreWidthMiddleware(
    userApp,
    // 리듀서를 생성후 넣어준다
    // 
    //개발자 도구를 사용하기 위한 설정
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  )}>
       <App/>
    </Provider>
  </BrowserRouter>
);

export default Root;