import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import NavBar from '../NavBar/NavBar';
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBProgress,
  MDBCheckbox,
} from 'mdb-react-ui-kit';

import './styles.css';
import React, { useState, useEffect } from 'react';
//import { Button } from 'react-bootstrap';
import Articles from '../Articles';
import api from '../../services/api';
import { districtsData, categoriesEventsData, categoriesNewsData } from '../../utilities/dataUtilities';
import { useHistory } from 'react-router-dom';
import withAuth from '../../utilities/withAuth';
import jwtDecode from 'jwt-decode';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import image from '../../assets/images/profile_pic.png'

function Profile() {
  const history = useHistory();
  const [eventDistrictsList, seteventDistrictsList] = useState([]);
  const [eventCategoriesList, seteventCategoriesList] = useState([]);
  const [newsCategoriesList, setnewsCategoriesList] = useState([]);
  const [eventsEmails, seteventsEmails] = useState();
  const [newsEmails, setnewsEmails] = useState();
  var email = "";
  var name = '';

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
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
  function deleteAccount() {
    api.post(`/delete-account?email=${email}`)
    .then(() => {
      localStorage.clear();
      sessionStorage.clear();
      
      history.push('/');
    })
      .catch((error) => {
        console.log("state");
        console.error(error.response);
      });

  }

  useEffect(() => {
    setUserData(setnewsCategoriesList, "/news-categories");
    setUserData(seteventCategoriesList, "/events-categories");
    setUserData(seteventDistrictsList, "/events-districts");
    setUserData(seteventsEmails, "/events-email-preferences");
    setUserData(setnewsEmails, "/news-email-preferences");
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

  const updatePreferences = (state,setState,apiPath) => {
    setState(state);
    console.log(state);
    var state2  = true;
    if(state){
      state2=true;
    }
    else
      state2 = false;
    const requestBody = {
      email: email,
      emailPreference: state2,
    };
    api
      .put(apiPath, requestBody)
      .catch((error) => {
        console.log("state");
        console.error(error.response);
      });
  };

  /*useEffect(() => {
    console.log(districtCategoriesList);
  }, [districtCategoriesList]);*/

  return (
    <div className='profile-container' style={{ paddingLeft: '15%', paddingRight: '15%', height: '100vh' }}>
      <NavBar />
      <MDBRow noGutters>
        <MDBCol md='3'>
          <MDBCard className="h-100">
            <MDBCardBody className="text-center">
              <MDBCardImage
                src={image}
                alt="avatar"
                className="rounded-circle"
                style={{ width: '150px' }}
                fluid
              />
              <hr></hr>
              <p className="text-muted mb-2">{name}</p>
              <div className="d-flex justify-content-center mb-2">

                <Popconfirm
                  title="Apagar Conta"
                  description="Prentende apagar a conta? Esta ação é permanente."
                  okButtonProps={{ style: { background: 'red' } }}
                  okText='Apagar'
                  onConfirm={deleteAccount}
                  cancelText='Cancelar'
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                >
                  <Button variant="outline-warning" className="custom-outline-warning">Apagar Conta</Button>
                </Popconfirm>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md='6'>
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
                <hr />
                <MDBCardTitle>Quero receber emails semanais sobre:</MDBCardTitle>
                <MDBCheckbox
                  name="flexCheck"
                  checked={newsEmails}
                 
                  label="Notícias"
                  onChange={() => updatePreferences(!newsEmails,setnewsEmails, "/news-email-preferences")}
                />
                <MDBCheckbox
                  name="flexCheck"
                  checked={eventsEmails}
                
                  label="Eventos"
                  onChange={() => updatePreferences(!eventsEmails,seteventsEmails, "/events-email-preferences")}
                />
              </MDBCardBody>
            </MDBCard>
          </div>
          <MDBRow>
            <MDBCol md='6' >
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
            <MDBCol md='6' >
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
        <MDBCol md='3' >
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