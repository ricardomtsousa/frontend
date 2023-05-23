import React, { useState } from 'react';


import './styles.css';
import { useHistory } from 'react-router-dom';

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
            
            history.push('/');
        } catch (error) {
            alert("Unable to logout" + error);
        }
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light" style={{ marginTop: '10px', marginBottom: '10px', padding: '5px', backgroundColor: '#eee' }}>
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" onClick={navigateArticles}>Notícias <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" onClick={navigateEvents}>Eventos</a>
    </div>
    <div class="navbar-nav">
    <a class="nav-item nav-link" onClick={navigateProfile}>Perfil</a>
    <a class="nav-item nav-link" onClick={logout}>Logout</a>
    </div>
  </div>
</nav>
    );
}
export default NavBar;