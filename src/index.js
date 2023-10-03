/* eslint-disable simple-import-sort/imports */
// required for the theme to be correctly applied
/// <reference types="@welldone-software/why-did-you-render" />
// import 'utils/wdyr';
import 'style/themes/clin/dist/antd.css';
import 'style/themes/clin/main.scss';
import './index.css';

import React from 'react';
import './prototypes/number';
import ReactDOM from 'react-dom';

// Import App after the style to make sure styles is apply correctly!
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('clin-ui'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
