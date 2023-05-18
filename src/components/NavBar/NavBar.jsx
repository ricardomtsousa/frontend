import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
} from 'mdb-react-ui-kit';

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

    const [showNavLeft, setShowNavLeft] = useState(false);

    return (
        <MDBNavbar expand='lg' light bgColor='light' style={{ marginTop: '20px', marginBottom: '20px', padding: '20px' }}>
            <MDBContainer fluid>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarLeftAlignExample'
                    aria-controls='navbarLeftAlignExample'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNavLeft(!showNavLeft)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar show={showNavLeft}>
                    <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>

                        <MDBNavbarItem>
                            <MDBNavbarLink href='#' style={{ fontWeight: 'bold' }} onClick={navigateArticles}>Notícias </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='#' style={{ fontWeight: 'bold' }}>Eventos </MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarNav className='justify-content-end'>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='#' style={{ fontWeight: 'bold' }} onClick={navigateProfile}>Perfil</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='#' style={{ fontWeight: 'bold' }}>LogOut</MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>


                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}
export default NavBar;