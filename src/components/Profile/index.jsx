import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import NavBar from '../NavBar/NavBar';
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
import jwtDecode from 'jwt-decode';


function Profile() {

  const [eventDistrictsList, seteventDistrictsList] = useState([]);
  const [eventCategoriesList, seteventCategoriesList] = useState([]);
  const [newsCategoriesList, setnewsCategoriesList] = useState([]);
  var email = "";
  var name  = '';
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if(token){
    const decodedToken = jwtDecode(token);
     email = decodedToken.email;
     name = decodedToken.fullname;
  }

  function setUserData(setState, apiPath) {
    //const email = localStorage.email;
    api.get(apiPath, { params: { email: email } })
      .then((response) => {
        setState(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    setUserData(setnewsCategoriesList, "/news-categories");
    setUserData(seteventCategoriesList, "/events-categories");
    setUserData(seteventDistrictsList, "/events-districts");
  }, []);

  const handleCheckboxChange = (categorie, list, setState, apiPath) => {
    const newList = list.includes(categorie)
      ? list.filter((value) => value !== categorie)
      : [...list, categorie];

    setState(newList)
    console.log(newList);
    const requestBody = {
      categories: newList,
      email: email,
    };
    api
      .put(apiPath, requestBody)
      .catch((error) => {
        console.error(error.response.errors.Password[0]);
      });
  };

  /*useEffect(() => {
    console.log(districtCategoriesList);
  }, [districtCategoriesList]);*/

  return (
    <div className='profile-container' style={{ paddingLeft: '15%', paddingRight: '15%' }}>
      <NavBar />
      <MDBRow noGutters>
        <MDBCol md='3' style={{ backgroundColor: 'blue', height: '100hv' }}>
          <MDBCard className="h-100">
            <MDBCardBody className="text-center">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="rounded-circle"
                style={{ width: '150px' }}
                fluid
              />
              <hr></hr>
              <p className="text-muted mb-2">{name}</p>
              <div className="d-flex justify-content-center mb-2">
                <MDBBtn outline className="ms-1">Logout</MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md='6' style={{ backgroundColor: 'purple' }}>
          <div className='pb-3'>
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Nome</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="4">
                    <MDBCardText className="text-muted">{name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="6">
                    <MDBCardText className="text-muted">{email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </div>
          <MDBRow>
            <MDBCol md='6' style={{ backgroundColor: 'green' }}>
              <MDBCard style={{ height: '400px', overflowY: 'scroll' }}>
                <MDBCardBody>
                  <MDBCardTitle>Distritos Eventos</MDBCardTitle>
                  {districtsData.map((district, index) => (
                    <MDBCheckbox
                      key={index}
                      value={district}
                      label={district}
                      checked={eventDistrictsList.includes(district)}
                      onChange={() => handleCheckboxChange(district, eventDistrictsList, seteventDistrictsList, "/events-districts")}
                    />
                  ))}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md='6' style={{ backgroundColor: 'yellow' }}>
              <MDBCard style={{ height: '400px', overflowY: 'scroll' }}>
                <MDBCardBody>
                  <MDBCardTitle>Categorias Eventos</MDBCardTitle>
                  {categoriesEventsData.map((categorie, index) => (
                    <MDBCheckbox
                      key={index}
                      value={categorie}
                      label={categorie}
                      checked={eventCategoriesList.includes(categorie)}
                      onChange={() => handleCheckboxChange(categorie, eventCategoriesList, seteventCategoriesList, "/events-categories")}
                    />
                  ))}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol md='3' style={{ backgroundColor: 'black' }}>
          <MDBCard className="mb-4 mb-lg-0 h-100">
            <MDBCardBody>
              <MDBCardTitle>Categorias Noticias</MDBCardTitle>
              {categoriesNewsData.map((categorie, index) => (
                <MDBCheckbox
                  key={index}
                  value={categorie}
                  label={categorie}
                  checked={newsCategoriesList.includes(categorie)}
                  onChange={() => handleCheckboxChange(categorie, newsCategoriesList, setnewsCategoriesList, "/news-categories")}
                />
              ))}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>

  );
}
export default withAuth(Profile);