import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBCardTitle,
    MDBProgress,
    MDBCheckbox,
    MDBInput,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';

import './styles.css';
import React, { useState, useEffect } from 'react';
import Articles from '../Articles';
import api from '../../services/api';
import { districtsData, categoriesEventsData, categoriesNewsData } from '../../utilities/dataUtilities';
import { useHistory } from 'react-router-dom';
import withAuth from '../../utilities/withAuth';


function Register() {

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
                if(error.response.data.message === 'Email already registered')
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
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-2 d-flex align-items-center justify-content-center" style={{ height: '100vh' }} >
                <MDBRow>
                    <MDBCard className="mb-4 mb-lg-0 " style={{ height: '70vh', width: '55vh' }}>
                        <MDBCardBody>
                            <form onSubmit={register}>
                                <div className="form-group">
                                    <h2>Crie a sua conta</h2>
                                    <br></br>
                                    <h6>Nome </h6>
                                    <MDBInput wrapperClass='mb-4' size='lg' id='form1' type='text' required value={FullName}
                                        onChange={e => setFullName(e.target.value)} />
                                    <h6>Email </h6>
                                    <MDBInput wrapperClass='mb-4' size='lg' id='form1' type='email' required value={email}
                                        onChange={e => setEmail(e.target.value)} />
                                        {emailError && (
                                    <p className="text-danger">{emailError}</p>
                                )}
                                    <h6>PassWord </h6>
                                    <MDBInput wrapperClass='mb-4'  size='lg' id='form1' type='password' required value={Password}
                                        onChange={e => setPassword(e.target.value)} />
                                    <h6>Confirmar PassWord </h6>
                                    <MDBInput wrapperClass='mb-4' size='lg' id='form1' type='password' required value={ConfirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)} />
                                        {passwordsMatchError && (
                                    <p className="text-danger">{passwordsMatchError}</p>
                                )}

                                    <button type="submit" class="btn btn-primary">Criar Conta</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-2">Já tem conta?
                                        <a href="#!" className="link-danger" onClick={() => history.push('/')}>Login</a></p>
                                </div>
                            </form>

                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
export default (Register);