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
import Articles from '../Articles';
import api from '../../services/api';
import { districtsData, categoriesEventsData, categoriesNewsData } from '../../utilities/dataUtilities';
import { useHistory } from 'react-router-dom';
import withAuth from '../../utilities/withAuth';


const RegisterCardComponent = () => {

  const [FullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatchError, setPasswordsMatchError] = useState('');
  const [emailError, setemailError] = useState('');

  const history = useHistory();


  async function register(event) {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      setPasswordsMatchError('As Passswords não coincidem');
      return;
    }
    else
      setPasswordsMatchError('');

    const data = {
      FullName, email, Password, ConfirmPassword
    };

    const response = await api.post('api/authenticate/register', data)

      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        // alert('Failed Register: ' + error.response.data.message)
        console.log(error);
        console.log(error.response.data.message);
        if (error.response.data.message === 'Email already registered')
          setemailError('Email já registado')
        //console.log(error.response.data.errors);
        /*const e = error.response.data.errors;
        const eR = e.Email;
        for (let i = 0; i < eR.length; i++) {
            console.log('eR[' + i + ']:', eR[i]);
            alert('Failed Register: ' + eR[i])
        }*/
      });

  }


  return (
    <div className="col-sm">
          <MDBCard style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '10%', paddingBottom: '10%' }}>
            <MDBCardBody>
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
                  <button type="submit" className="btn btn-primary">Criar Conta</button>
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