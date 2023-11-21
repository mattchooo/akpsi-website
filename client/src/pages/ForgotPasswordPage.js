import React, { useState } from 'react';
import { Button } from '../components/Button';
import axios from 'axios';
import '../stylesheets/ForgotPasswordPage.css';

function ForgotPasswordPage() {
  // State variables
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [resetRequestSent, setResetRequestSent] = useState(false);

  const isEmailError = !!emailError;

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError('');

    try {
      const response = await axios.post('/forgot-password', {
        email: email
      });

      
      if (response.data.message === 'User found.') {
        setResetRequestSent(true);
      } else {
        setEmailError(response.data);
      }

    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Function to render the form
  const renderForm = () => (
    <div className='forgot-password-container'>
      <h1>Forgot Password:</h1>
      <div className='input-container'>
        <form onSubmit={handleSubmit}>
          <small>Please enter your email here.</small>
          <input
            type='email'
            name='email'
            placeholder='Email'
            className={isEmailError ? 'forgot-password-input forgot-password-input-error' : 'forgot-password-input'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <small className='error-message'>{emailError}</small>}
          <Button className='forgot-password-button' buttonStyle='btn--outline' type='submit'>
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );

  const renderSuccessMessage = () => (
    <div className='success-reset-password-container'>
      <div className='success-reset-password-messages'>
        <h1>Email sent!</h1>
        <p>Please check your email to reset your password.</p>
      </div>
    </div>
  );

  return (
    <div className='forgot-password-screen'>
      {resetRequestSent ? renderSuccessMessage() : renderForm()}
    </div>
  );
}

export default ForgotPasswordPage;
