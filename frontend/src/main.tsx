import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';
import 'sweetalert2/src/sweetalert2.scss';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>
);
