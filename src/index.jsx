import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProvideBook } from 'providers/ProvideBook';
import 'antd/dist/reset.css';
import 'assets/styles/index.less';

ReactDOM.render(
  <React.StrictMode>
    <ProvideBook>
      <App />
    </ProvideBook>
  </React.StrictMode>,
  document.getElementById('root')
);
