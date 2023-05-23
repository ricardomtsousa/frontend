import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './styles.css';
import ArticleComponent from './articleComponent.jsx';
import NavBar from '../NavBar/NavBar';

function Articles() {

  const [articles, setArticles] = useState([]);
  const [articlesCatergoriesList, setarticlesCatergoriesList] = useState([]);

  useEffect(() => {
    console.log("a");
    const email = localStorage.email;
    if (email) {
      api.get('/news-categories', { params: { email: email } })
        .then((response) => {
          console.log("News Categories Response:", response.data);
          setarticlesCatergoriesList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [localStorage.email]);
  
  useEffect(() => {
    console.log("b");
    api
      .post('/api/Articles/articlesList', articlesCatergoriesList)
      .then((response) => {
        console.log("Articles Response:", response.data);
        setArticles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [articlesCatergoriesList]);


  return (
    <section>
      <div className="x" style={{ paddingLeft: '15%', paddingRight: '15%' }}>
        <NavBar />
        <div className="row gx-lg-5 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}>
          {articles.map(article => (
            
            <ArticleComponent
              key={article.id}
              image_url={article.image_link}
              category={article.category}
              date={article.date}
              title={article.title}
              link={article.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Articles;