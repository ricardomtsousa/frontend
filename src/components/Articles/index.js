import React, { useState , useEffect} from 'react';
import api from '../../services/api';

function Articles() {

    const [category,setCategory] = useState('');
    const [articles, setArticles] = useState([]);

    const email = localStorage.getItem('email');
    //const token = localStorage.getItem('token');

    return (
        <div className="article-container">
            <form>

                <input type="text" placeholder="category" />
                <button type="button"></button>
            </form>
            <h1>Aarticle List</h1>
            <ul>
                <li>
                    <b>Source:</b><br></br>
                    <b>Title:</b><br></br>
                    <b>Link:</b><br></br>
                </li>
            </ul>
        </div>

    );
}
export default Articles;