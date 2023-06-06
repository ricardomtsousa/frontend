import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import logo_white from '../../assets/images/logo_white.png';
import './styles.css';

const NavBar = () => {
  const history = useHistory();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState('');

  const navigateProfile = () => {
    setActiveNavItem('profile');
    history.push('/profile');
  };

  const navigateArticles = () => {
    setActiveNavItem('articles');
    history.push('/articles');
  };

  const navigateEvents = () => {
    setActiveNavItem('events');
    history.push('/events');
  };

  const logout = async () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      setActiveNavItem('');
      history.push('/');
    } catch (error) {
      alert('Unable to logout' + error);
    }
  };

  useEffect(() => {
    // Update activeNavItem based on the current route
    const currentPath = location.pathname;

    if (currentPath === '/profile') {
      setActiveNavItem('profile');
    } else if (currentPath === '/articles') {
      setActiveNavItem('articles');
    } else if (currentPath === '/events') {
      setActiveNavItem('events');
    }
  }, [location]);

  const getNavItemStyle = (navItem) => {
    return {
      color: 'white',
      fontWeight: activeNavItem === navItem ? 'bold' : 'normal',
    };
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        marginTop: '10px',
        marginBottom: '10px',
        padding: '5px',
        backgroundColor: '#F83C10',
        borderRadius: '7px',
      }}
    >
      <img
        src={logo_white}
        className="img-fluid"
        alt="Sample image"
        style={{ maxHeight: '20px', paddingRight: '10px' }}
      />
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-between"
        id="navbarNavAltMarkup"
      >
        <div className="navbar-nav">
          <a
            className="nav-item nav-link active"
            onClick={navigateArticles}
            style={getNavItemStyle('articles')}
          >
            Notícias <span className="sr-only">(current)</span>
          </a>
          <a
            className="nav-item nav-link"
            onClick={navigateEvents}
            style={getNavItemStyle('events')}
          >
            Eventos
          </a>
        </div>
        <div className="navbar-nav">
          <a
            className="nav-item nav-link"
            onClick={navigateProfile}
            style={getNavItemStyle('profile')}
          >
            Perfil
          </a>
          <a
            className="nav-item nav-link"
            onClick={logout}
            style={{ color: 'white' }}
          >
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
