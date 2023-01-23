import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProvideDictionary } from 'providers/ProvideDictionary';
import { ProvideBook } from 'providers/ProvideBook';
import 'antd/dist/reset.css';
import 'assets/styles/index.less';

ReactDOM.render(
  <React.StrictMode>
    <ProvideBook>
      <ProvideDictionary>
        <App />
      </ProvideDictionary>
    </ProvideBook>
  </React.StrictMode>,
  document.getElementById('root')
);
