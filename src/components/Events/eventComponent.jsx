import React, { useEffect, useRef } from 'react';
import './styles.css';
import clamp from 'clamp-js';
import { Tooltip } from 'react-tooltip';

const EventComponent = ({ image_url, category, event_date, title, link, district,day_of_week }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      clamp(titleRef.current, { clamp: '2' });
    }
  }, []);

  const handleDivClick = () => {
    window.location.href = link; // Replace with your desired link
  };

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 mb-4 mb-lg-0" onClick={handleDivClick}>
      <div className="article-container">
        <div className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4" data-mdb-ripple-color="light">
          <div className="image-aspect-ratio">
            <img
              src={image_url}
              className="img-fluid category-image"
              alt="Featured"
            />
          </div>
          <a>
            <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </a>
        </div>


        <div>
      <div className="row mb-2">
        <div className="col-6" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          <a className="text-info">
            <i className="fas fa-motorcycle"></i>
            {category}
          </a>
        </div>
        
        <div className="col-6 text-right" title={day_of_week}>
          <a >
            <i className="fas fa-calendar-alt" style={{ paddingRight: '5px' }}></i>
            {event_date}
          </a>
        </div>
      </div>
      
    </div>

        <div className="article-title-wrapper" style={{ minHeight: '4em' }}>
          <a className="text-dark" style={{ display: 'inline-block', lineHeight: '1.2', overflow: 'hidden' }}>
            <h5 ref={titleRef}>
              {title}
            </h5>
          </a>
        </div>

        <hr />
      </div>
    </div>
  );
};

export default EventComponent;