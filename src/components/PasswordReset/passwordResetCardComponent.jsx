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

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const history = useHistory();


  const handleOpenSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userIdd = urlParams.get('userId');
    const tokenn = decodeURIComponent(urlParams.get('token'));

    setUserId(userIdd);
    setToken(tokenn);
  }, []);


  const [errorMessage, setErrorMessage] = useState('');

  const resetPassword = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      // Handle the password mismatch error (e.g., show an error message)
      return;
    }

    const data = {
      userId,
      token,
      password,
    };

    try {
      console.log('EMAIL:', data.email);
      const response = await api.post('/password-reset', data);

      // Check if the request was successful
      if (response.status === 200) {
        console.log('Password reset successful');
        handleOpenSnackbar('success', 'Password alterada com sucesso.');
        setTimeout(() => {
          history.push('/');
        }, 2000);
      } else {
        console.log('Failed to reset password');
        // Show an error message or perform other actions
      }
    } catch (error) {
      // Check if the error response has a message
      if (error.response.data === 'Invalid token') {
        handleOpenSnackbar('error', 'Token Invalido.');
        console.error('a:', error.response.data);
        setErrorMessage(error.response.data); // Set the error message in the state
        // Show the error message or perform other actions
      } else {
        console.error('b:', error);
        // Show a generic error message or perform other actions
      }
    }
  };

  return (

    <div className="col-sm">
      <MDBCard style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '10%', paddingBottom: '10%' }}>
        <MDBCardBody>
          <ToastSnackBar
            open={openSnackbar}
            severity={snackbarSeverity}
            message={snackbarMessage}
            onClose={handleCloseSnackbar}
          />

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