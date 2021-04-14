import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProvideDic } from 'providers/ProvideDics';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <ProvideDic>
      <App />
    </ProvideDic>
  </React.StrictMode>,
  document.getElementById('root')
);
