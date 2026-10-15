import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProvideBook } from 'providers/ProvideBook';
import 'assets/styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <ProvideBook>
      <App />
    </ProvideBook>
  </React.StrictMode>,
  document.getElementById('root')
);
