import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <h1>404: Page not found</h1>
            <h2>Whoops! We could not find the page you were looking for.</h2>
            <h2>Return to home <Link to="/">here</Link></h2>
        </div>
    )
}

export default NotFound