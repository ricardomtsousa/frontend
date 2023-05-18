import 'bootstrap/dist/css/bootstrap.min.css';

//import React from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import './styles.css';
import React, { useState } from 'react';
import Articles from '../Articles';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';



export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function login(event ) {
      event.preventDefault();

      const data = {
          email,password
      };

      try {
          const response = await api.post('api/authenticate/login',data)

          localStorage.setItem('email',email);
          localStorage.setItem('token', response.data.token);
          //localStorage.setItem('expiration', response.data.expiration);
          history.push('/articles');

      } catch (error) {
          alert('Failed login' + error)
      }

  }

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>
            <MDBBtn>Button</MDBBtn>
            <button type="button" class="btn btn-primary" >awgwaw</button>

            <MDBBtn floating size='md' tag='a'  className='me-2' >
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <MDBInput wrapperClass='mb-4' placeholder='Email' id='formControlLg' type='email' size="lg" value={email}
  onChange={e => setEmail(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' placeholder='Password' id='formControlLg' type='password' size="lg" value={password}
  onChange={e => setPassword(e.target.value)}/>

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Manter sessão iniciada' />
            <a href="!#">Recuperar password</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <button type="button" class="btn btn-primary" onClick={login}>Primary</button>
            
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger" onClick={() => history.push('/register')}>Register</a></p>
          </div>

        </MDBCol>

      </MDBRow>


    </MDBContainer>
  );
}
