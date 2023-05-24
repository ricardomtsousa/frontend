import 'bootstrap/dist/css/bootstrap.min.css';

//import React from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon,MDBCardBody, MDBInput, MDBCheckbox, MDBCard } from 'mdb-react-ui-kit';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import './styles.css';
import React, { useState } from 'react';
import Articles from '../Articles';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import image from '../../assets/images/logo_orange.png'
import { Button } from 'react-bootstrap';

const LoginCardComponent = () => {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');

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
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;

        console.log('Email:', email);
        console.log('FullName:', decodedToken.fullname);
        history.push('/articles');

        // Perform any additional actions or navigate to a different page based on the email.
      } else {
        console.log('Token not found in the response.');
      }

      // The HTTP-only cookie will be automatically stored and sent by the browser
      // with subsequent requests to the same domain.

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
          } else {
            setpasswordError('');
          }
        }
      
        console.log('Error occurred during login:', error);
      }
  }

  return (
    <div className="col-sm">
          <MDBCard style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '10%', paddingBottom: '10%' }}>
          <MDBCardBody>
          <form onSubmit={login} className="">
            <h2>Login</h2>
            <div>
              <MDBInput wrapperClass='mb-2'  placeholder='Email' id='formControlLg' type='email' required size="lg" value={email} onChange={e => setEmail(e.target.value)} />
              {emailError && (
                      <p className="text-danger">{emailError}</p>
                    )}
              <MDBInput wrapperClass='mb-4'required placeholder='Password' id='formControlLg' type='password' size="lg" value={password} onChange={e => setPassword(e.target.value)} />
              {passwordError && (
                      <p className="text-danger">{passwordError}</p>
                    )}
            </div>
            
            <div className="mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Manter sessão iniciada' />
              <a href="!#">Recuperar password</a>
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