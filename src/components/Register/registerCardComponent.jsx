import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import {
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

import './styles.css';
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import withAuth from '../../utilities/withAuth';

import ToastSnackBar from '../SnackBar/toastSnackBar';

const RegisterCardComponent = () => {

  const [FullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatchError, setPasswordsMatchError] = useState('');
  const [emailError, setemailError] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const history = useHistory();


  async function register(event) {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      setPasswordsMatchError('As passwords não coincidem');
      return;
    } else {
      setPasswordsMatchError('');
    }

    const data = {
      FullName,
      email,
      Password,
      ConfirmPassword
    };

    try {
      const response = await api.post('api/authenticate/register', data);
      if(response.data.success== true)
      {
        handleOpenSnackbar('success', 'Conta criada com sucesso.');
        setTimeout(() => {
          history.push('/');
        }, 2000);
      }
      console.log(response.data);
    } catch (error) {
      if (error.message === 'Network Error') {
        handleOpenSnackbar('error', 'O serviço não está disponível. Error: ' + error.message);
      }
      if (error.response) {
        console.log(error);
        console.log(error.response.data.message);
        if (error.response.data.message === 'Email already registered') {
          setemailError('Email já registado');
        }
      }
      // Handle other error cases as needed
    }
  }


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
          <form onSubmit={register} className="">
            <h2>Crie a sua conta</h2>
            <div className="mb-2">
              <MDBInput size='lg' id='form1' placeholder='Nome' type='text' required value={FullName} onChange={e => setFullName(e.target.value)} />
            </div>
            <div className="mb-2">
              <MDBInput size='lg' id='form1' type='email' placeholder='Email' required value={email} onChange={e => setEmail(e.target.value)} />
              {emailError && (
                <p className="text-danger">{emailError}</p>
              )}
            </div>
            <div className="mb-2">
              <MDBInput size='lg' id='form1' type='password' placeholder='Password' required value={Password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="mb-4">
              <MDBInput size='lg' id='form1' type='password' placeholder='Confirmar Password' required value={ConfirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              {passwordsMatchError && (
                <p className="text-danger">{passwordsMatchError}</p>
              )}
            </div>
            <button type="submit" className="btn warning-button">Criar Conta</button>
            <p className="">
              Já tem conta?
              <a href="#!" className="link-danger" onClick={() => history.push('/')}>Login</a>
            </p>

          </form>
        </MDBCardBody>
      </MDBCard>
    </div>

  );
}
export default RegisterCardComponent;