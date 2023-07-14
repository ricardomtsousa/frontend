import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import './styles.css';
import ArticleComponent from './articleComponent.jsx';
import NavBar from '../NavBar/NavBar';
import jwtDecode from 'jwt-decode';
import InfiniteScroll from 'react-infinite-scroll-component';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [articlesCategoriesList, setArticlesCategoriesList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const history = useHistory();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const email = token ? jwtDecode(token).email : '';

  const lastArticleRef = useRef(null);
  const limit = 10;

  useEffect(() => {
    if (email) {
      api.get('/news-categories', { params: { email } })
        .then((response) => {
          console.log("News Categories Response:", response.data);
          setArticlesCategoriesList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [email]);

  useEffect(() => {
    setPage(1); // Reset page to 1
    loadMoreArticles(); // Initial loading of articles
  }, [articlesCategoriesList]);

  const loadMoreArticles = () => {

    const data = {
      Categories: articlesCategoriesList,
      Page: page,
      PageLimit: 10
    };

    api.post('/api/Articles/articlesList', data)
      .then((response) => {
        console.log("Articles Response:", response.data);
        setArticles((prevArticles) => [...prevArticles, ...response.data]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(response.data.length > 0); // Update hasMore based on the response
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Render the component
  return (
    <section>
      <div className="x" style={{ paddingLeft: '15%', paddingRight: '15%', backgroundColor: '#f9f9f9' }}>
        <NavBar />
        <div className="row gx-lg-5 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}>
        {articles.map((article, index) => (
              
              <ArticleComponent
                image_url={article.image_link}
                category={article.category}
                date={article.date}
                title={article.title}
                link={article.link}
              />
            
          ))}
          <InfiniteScroll
            dataLength={articles.length}
            next={loadMoreArticles}
            hasMore={hasMore}
            
          >
            
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
}

export default Articles;
