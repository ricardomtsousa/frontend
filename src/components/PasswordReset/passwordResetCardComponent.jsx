import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBCardBody, MDBInput, MDBCheckbox, MDBCard } from 'mdb-react-ui-kit';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import './styles.css';
import { useState, useEffect } from 'react';
import Articles from '../Articles';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Button } from 'react-bootstrap';
import * as React from 'react';
import ToastSnackBar from '../SnackBar/toastSnackBar';
import { useLocation } from 'react-router-dom';


const ResetPasswordCardComponent = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userIdd = urlParams.get('userId');
    const tokenn = decodeURIComponent(urlParams.get('token'));

    setUserId(userIdd);
    setToken(tokenn);
  }, []);


  async function resetPassword(event) {
    event.preventDefault();

    const data = {
      userId,
      token,
      password,
    };

    if (password !== confirmPassword) {
      console.log('userIdd:', userId);
      console.log('tokenn:', token);
      // Passwords don't match, handle the error (e.g., show error message)
      return;
    }
    try {
      console.log('EMAIL:', data.email);
      const response = await api.post('/password-reset', data)

      // Rest of the code
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }


  };

  return (

    <div className="col-sm">
      <MDBCard style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '10%', paddingBottom: '10%' }}>
        <MDBCardBody>

          <form onSubmit={resetPassword} className="">
            <h2>Recuperar Password</h2>
            <div>
              <MDBInput wrapperClass='mb-4' required placeholder='Nova Password' id='formControlLg' type='password' size="lg" value={password} onChange={e => setPassword(e.target.value)} />

              <MDBInput wrapperClass='mb-4' required placeholder='Confirmar Password' id='formControlLg' type='password' size="lg" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

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