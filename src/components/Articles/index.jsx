import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './styles.css';
import ArticleComponent from './articleComponent.jsx';
import NavBar from '../NavBar/NavBar';

function Articles() {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    console.log("b");
    api
      .get('/api/Articles')
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const groupArticles = (articles, groupSize) => {
    const groups = [];
    for (let i = 0; i < articles.length; i += groupSize) {
      groups.push(articles.slice(i, i + groupSize));
    }
    return groups;
  };

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