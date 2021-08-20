import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'Routes';

import 'assets/css/index.css';
import 'assets/css/font.css';
// Boxicon
import 'boxicons/dist/boxicons';
import 'boxicons/css/boxicons.min.css';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Notify
import 'react-toastify/dist/ReactToastify.css'
// Context
import { AuthProvider } from 'helpers/Context';

ReactDOM.render(
  <AuthProvider>
    <Routes />
  </AuthProvider>,
  document.getElementById('root')
);