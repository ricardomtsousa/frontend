import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import './styles.css';
import React, { useState, useEffect } from 'react';
import RegisterCardComponent from './registerCardComponent';
import image from '../../assets/images/logo_orange.png'

function Register() {
    
    return (
      <div className='login-container'>
      <div className="row">
        <div className="col-sm d-flex align-items-center justify-content-center">
          <img src={image} className="img-fluid" alt="Sample image" />
        </div>
        <RegisterCardComponent />
      </div>
    </div>
    );
}
export default (Register);