import '@babel/polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider} from 'mobx-react';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import store from './store'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <LocaleProvider locale={zh_CN}>
      <Provider {...store}>
        <App/>
      </Provider>
    </LocaleProvider>
  </BrowserRouter>,
  document.getElementById('root'));

serviceWorker.unregister();
