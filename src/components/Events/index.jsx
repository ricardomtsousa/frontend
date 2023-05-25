import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './styles.css';
import EventComponent from './eventComponent.jsx';
import NavBar from '../NavBar/NavBar';
import jwtDecode from 'jwt-decode';

function Events() {

  const [events, setEvents] = useState([]);
  var email = "";
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if(token){
    const decodedToken = jwtDecode(token);
     email = decodedToken.email;
  }

  useEffect(() => {
    console.log("a");
    if (email) {
      api.get('api/Event/events-user', { params: { email: email } })
        .then((response) => {
          console.log("News Categories Response:", response.data);
          setEvents(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [localStorage.email]);
  


  return (
    <section>
      <div className="x" style={{ paddingLeft: '15%', paddingRight: '15%' }}>
        <NavBar />
        <div className="row gx-lg-5 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}>
          {events.map(event => (
            
            <EventComponent
              key={event.id}
              image_url={event.image_link}
              category={event.category}
              event_date={event.event_date}
              district={event.district}
              day_of_week={event.day_of_week}
              title={event.title}
              link={event.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;