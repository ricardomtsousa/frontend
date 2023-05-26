import 'bootstrap/dist/css/bootstrap.min.css';
import {MDBCardBody, MDBInput, MDBCheckbox, MDBCard } from 'mdb-react-ui-kit';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import './styles.css';
import { useState } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Button } from 'react-bootstrap';
import * as React from 'react';
import ToastSnackBar from '../SnackBar/toastSnackBar';


const ResetPasswordCardComponent = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

  return (

    <div className="col-sm">
      <MDBCard style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '10%', paddingBottom: '10%' }}>
        <MDBCardBody>

          <form  className="">
            <h2>Recuperar Password</h2>
            <div>
            <MDBInput wrapperClass='mb-4' required placeholder='Nova Password' id='formControlLg' type='password' size="lg" value={password} onChange={e => setPassword(e.target.value)} />
              
              <MDBInput wrapperClass='mb-4' required placeholder='Confirmar Password' id='formControlLg' type='password' size="lg" value={confirmPassword} onChange={e => setconfirmPassword(e.target.value)} />
              
            </div>

           

            <div className='text-md-start mt-2  text-start'>
              <button type="submit" class="btn warning-button">Entrar</button>

            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default ResetPasswordCardComponent;