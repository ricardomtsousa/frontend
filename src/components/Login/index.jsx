import 'bootstrap/dist/css/bootstrap.min.css';

//import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import './styles.css';
import React, { useState } from 'react';
import image from '../../assets/images/logo_orange.png'
import LoginCardComponent from './loginCardComponent';

export default function Login() {

  return (
    <div className='login-container'>
      <div className="row">
        <div className="col-sm d-flex align-items-center justify-content-center">
          <img src={image} className="img-fluid" alt="Sample image" />
        </div>
        <LoginCardComponent />
      </div>
    </div>

  );
}
