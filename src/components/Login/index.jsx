import 'bootstrap/dist/css/bootstrap.min.css';

//import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './styles.css';
import React, { useState } from 'react';
import image from '../../assets/images/logo_orange.png'
import LoginCardComponent from './loginCardComponent';

export default function Login() {
  const history = useHistory();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if(token){
    history.push('/articles');
  }

  return (
    <div className='login-container'>
      <div className="row justify-content-center align-items-center">
        <div className="col-sm-6 d-flex align-items-center justify-content-center">
          <img src={image} className="img-fluid" alt="Sample image" />
        </div>
        <div className="col-sm-6">
          <LoginCardComponent />
        </div>
      </div>
    </div>

  );
}
