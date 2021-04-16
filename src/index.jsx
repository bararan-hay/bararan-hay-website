import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProvideDictionary } from 'providers/ProvideDictionary';
import 'assets/styles/index.less';

ReactDOM.render(
  <React.StrictMode>
    <ProvideDictionary>
      <App />
    </ProvideDictionary>
  </React.StrictMode>,
  document.getElementById('root')
);
