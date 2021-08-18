import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'Routes';

import 'assets/css/index.css';
import 'assets/css/font.css';
// boxicon
import 'boxicons/dist/boxicons';
import 'boxicons/css/boxicons.min.css';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);