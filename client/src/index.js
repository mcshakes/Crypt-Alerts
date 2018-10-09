import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Router from '../src/components/Router';
import * as V from "victory";
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { store } from "./store/index.js";

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
    document.getElementById('root')
  );

registerServiceWorker();
