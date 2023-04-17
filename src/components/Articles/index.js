import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './styles.css';

function Articles() {

    const [category, setCategory] = useState('');
    const [articles, setArticles] = useState([]);
    const [buttonList, setButtonList] = useState([]);

    useEffect(() => {
        console.log("a");
        const email = localStorage.email;
        api.get('/get', { params: { email: email } })
        .then((response) => {
          console.log(response.data);
          setButtonList(response.data);
          console.log(buttonList);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    const history = useHistory();
    const email = localStorage.getItem('email');

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token', '');
            history.push('/');
        } catch (error) {
            alert("Unable to logout" + error);
        }
    }

    useEffect(() => {
        console.log("b");
        api
            .post('/api/Articles/articlesList', buttonList)
            .then((response) => {
                setArticles(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, [buttonList]);

    const handleButtonClick = (buttonValue) => {
        const newList = buttonList.includes(buttonValue)
          ? buttonList.filter((value) => value !== buttonValue)
          : [...buttonList, buttonValue];
      
        setButtonList(newList);
      
        const requestBody = {
          categories: newList,
          email: localStorage.email,
        };
        api
          .put('/api/User', requestBody)
          .catch((error) => {
            console.error(error);
          });
      };


    const isButtonSelected = (buttonValue) =>
        buttonList.includes(buttonValue);


    return (
        <div className="article-container">

            <h2>{email}</h2>
            <form>
                <button class='button' type='submit' onClick={logout}>LOGOUT</button>
                <button class='button' type="button" onClick={() => handleButtonClick('Exclusivo')}
                    className={isButtonSelected('Exclusivo') ? 'selected' : ''}>Exclusivo</button>
                <button class='button' type="button" onClick={() => handleButtonClick('Educação')}
                    className={isButtonSelected('Educação') ? 'selected' : ''}>Educação</button>

                <input type="text" placeholder="category" />
                <button type="button"></button>
            </form>
            <h1>Aarticle List</h1>
            <ul>
                {buttonList.map((buttonValue, index) => (
                    <li key={index}>{buttonValue}</li>
                ))}
                {articles.map(article => (
                    <li>
                        <b>Category:</b>{article.category}<br></br>
                        <b>Title:</b>{article.title}<br></br>
                        <b>Link:</b>{article.link}<br></br>
                    </li>
                ))}

            </ul>
        </div>

    );
}
export default Articles;