import React, { useState } from 'react';


import './styles.css';
import { useHistory } from 'react-router-dom';
import logo_white from '../../assets/images/logo_white.png'

const NavBar = () => {
    const history = useHistory();

    const navigateProfile = () => {
        history.push('/profile');
    };

    const navigateArticles = () => {
        history.push('/articles');
    };

    const navigateEvents = () => {
        history.push('/events');
    };
    async function logout() {
        try {
            localStorage.clear();
            sessionStorage.clear();

            history.push('/');
        } catch (error) {
            alert("Unable to logout" + error);
        }
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light" style={{ marginTop: '10px', marginBottom: '10px', padding: '5px', backgroundColor: '#F83C10', borderRadius:'7px' }}>
             <img src={logo_white} className="img-fluid" alt="Sample image" style={{maxHeight:'20px', paddingRight:'10px'}}/>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link active" onClick={navigateArticles} style={{color:'white', fontWeight:'bold'}}>Notícias <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link" onClick={navigateEvents}style={{color:'white'}}>Eventos</a>
                </div>
                <div class="navbar-nav">
                    <a class="nav-item nav-link" onClick={navigateProfile}style={{color:'white'}}>Perfil</a>
                    <a class="nav-item nav-link" onClick={logout}style={{color:'white'}}>Logout</a>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;