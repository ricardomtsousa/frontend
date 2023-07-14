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


const LoginCardComponent = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const history = useHistory();

  async function login(event) {
    event.preventDefault();

    const data = {
      email,
      password
    };

    try {
      const response = await api.post('api/authenticate/login', data);
      const token = response.data;

      if (token) {
        const storage = document.getElementById('flexCheckDefault').checked ? localStorage : sessionStorage;
        storage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;

        console.log('Email:', email);
        console.log('FullName:', decodedToken.fullname);
        history.push('/articles');

      }


    } catch (error) {

      if (error.response && error.response.data) {
        if (error.response.data.Email) {
          const emailError = error.response.data.Email;
          setemailError('O email não se encontra registado.');
          console.log('Email Error:', emailError);
        } else {
          setemailError('');
        }

        if (error.response.data.Password) {
          const passwordError = error.response.data.Password;
          setpasswordError('A password está incorreta.');
          console.log('Password Error:', passwordError);
        }
      }
      else {
        handleOpenSnackbar('error', 'O serviço não está disponível. Error: ' + error.message);
        console.log('Erro no Login:', error);
      }

    }

  }
  //--------
  const handleOpenSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          <form onSubmit={login} className="">
            <h2>Login</h2>
            <div>
              <MDBInput wrapperClass='mb-2' placeholder='Email' id='formControlLg' type='email' required size="lg" value={email} onChange={e => setEmail(e.target.value)} />
              {emailError && (
                <p className="text-danger">{emailError}</p>
              )}
              <MDBInput wrapperClass='mb-2' required placeholder='Password' id='formControlLg' type='password' size="lg" value={password} onChange={e => setPassword(e.target.value)} />
              {passwordError && (
                <p className="text-danger">{passwordError}</p>
              )}
            </div>

            <div className="mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Manter sessão iniciada' />
              <a class="link-opacity-100-hover" href="/password-reset-email">Recuperar password</a>
            </div>

            <div className='text-md-start mt-2  text-start'>
              <button type="submit" class="btn warning-button">Entrar</button>
              <Button variant="outline-warning" className="custom-outline-warning" onClick={() => history.push('/register')}>Criar conta</Button>{' '}

            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default LoginCardComponent;