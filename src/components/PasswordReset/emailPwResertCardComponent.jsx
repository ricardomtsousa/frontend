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


const EmailResetPasswordCardComponent = () => {
    const [email, setEmail] = useState('');
    
    async function handleResetPassword(event) {
        event.preventDefault();
        const data = {
            email,
          };
    
            
        try {
            console.log('EMAIL:', data.email);
        const response = await api.post('/password-reset-email', data);

            // Rest of the code
        } catch (error) {
            console.error('Error sending password reset email:', error);
        }
    };

    return (

        <div className="col-sm">
            <MDBCard style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '10%', paddingBottom: '10%' }}>
                <MDBCardBody>
                    <form onSubmit={handleResetPassword} className="">
                        <h2>Recuperar Password</h2>
                        <div>
                            <MDBInput wrapperClass='mb-4' required placeholder='O seu email' id='formControlLg' type='email' size="lg" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className='text-md-start mt-2  text-start'>
                            <button type="submit" className="btn warning-button">Enviar email de recuperação</button>

                        </div>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default EmailResetPasswordCardComponent;