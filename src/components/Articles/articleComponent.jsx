import React, { useEffect, useRef } from 'react';
import './styles.css';
import clamp from 'clamp-js';

const ArticleComponent = ({ image_url, category, date, title, link }) => {
  const categoryIcons = {
    Atualidade: 'fas fa-newspaper',
    Futebol: 'fas fa-futbol',
    'Fórmula 1': 'fas fa-car',
    'Ralis': 'fas fa-car',
    'Moto GP': 'fas fa-motorcycle',
    'Motocross': 'fas fa-motorcycle',
    'TT': 'fas fa-flag-checkered',
  };

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
        <div className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-2" data-mdb-ripple-color="light">
          <div className="image-aspect-ratio">
            <img
              src={image_url}
              className="img-fluid category-image"
              alt="Featured"
            />
          </div>

        </div>
        <div className="row mb-1">
          <div className="col-9 text-truncate" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            <a className="category-text">
              {category && <i className={categoryIcons[category]} style={{ paddingRight: '5px' }}></i>}
              {category}
            </a>
          </div>
        </div>

        <div className="article-title-wrapper" style={{ minHeight: '4em' }}>
          <a className="text-dark" style={{ display: 'inline-block', lineHeight: '1.2', overflow: 'hidden' }}>
            <h6 ref={titleRef}>
              {title}
            </h6>
          </a>
        </div>

        <hr />
      </div>
    </div>
  );
};

export default ArticleComponent;