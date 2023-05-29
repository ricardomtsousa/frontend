import 'bootstrap/dist/css/bootstrap.min.css';

//import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './styles.css';
import React, { useState } from 'react';
import image from '../../assets/images/logo_orange.png'
import EmailResetPasswordCardComponent from './emailPwResertCardComponent';

const EmailPasswordReset = () => {
  const history = useHistory();


  return (
    <div className='login-container'>
      <div className="row justify-content-center align-items-center">
        <div className="col-sm-6 d-flex align-items-center justify-content-center">
          <img src={image} className="img-fluid" alt="Sample image" />
        </div>
        <div className="col-sm-6">
          <EmailResetPasswordCardComponent />
        </div>
      </div>
    </div>

  );
}
export default EmailPasswordReset;
