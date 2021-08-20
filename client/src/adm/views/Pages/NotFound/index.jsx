import React from 'react';
import './not_found.css';

function NotFound() {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>Oops, The Page you are looking for can't be found!</h2>
                <a href="#">
                    <i className='bx bx-chevron-left'></i>Return To Homepage
                </a>
            </div>
        </div>
    )
}

export default NotFound;