import React from 'react';
import '../stylesheets/ErrorPage.css';

function ErrorPage() {
    return (
        <div className='error-container'>
            <div className='error-header'>
                <h1>Error 404: Not Found</h1>
            </div>
            <div className='error-subtitle'>
                <p>Sorry! The page you were looking for doesn't exist.</p>
            </div>
        </div>
    )
}

export default ErrorPage;
