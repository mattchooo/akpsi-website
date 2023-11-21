import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isEmailError = !!emailError;
  const isPasswordError = !!passwordError;

  const navigate = useNavigate();

  const validateUser = async (event) => {
    event.preventDefault();
  
    setEmailError('');
    setPasswordError('');
    
    try {
      const response = await axios.post('/validate', {
        email: email,
        password: password,
      });

      if (response.data.message === 'Email not found.') {
        setEmailError(response.data.message);
      } else if (response.data.message === 'Incorrect password.') {
        setPasswordError(response.data.message);
      } else if (response.data.message === 'Login successful.') {
        navigate('/');
        window.location.reload();
      } else {
        console.log("Error:", response.data.message);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };
  
  return (
    <div className='login-screen'>
      <div className='login-container'>
        <h1>Login:</h1>
        <div className='input-container'>
          <form onSubmit={validateUser}>
            <input
              type='email'
              name='email'
              placeholder='Email'
              className={isEmailError ? 'login-input login-input-error' : 'login-input'}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <small className='error-message'>{emailError}</small>}
            <input
              type='password'
              name='password'
              placeholder='Password'
              className={isPasswordError ? 'signup-input signup-input-error' : 'signup-input'}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <small className='error-message'>{passwordError}</small>}
            <Button className='login-button' buttonStyle='btn--outline' type='submit'>
              Login
            </Button>
          </form>
        </div>
      </div>
      <div className='login-messages'>
        <p><Link to='/forgot-password'>Forgot your password?</Link></p>
        <p><Link to='/signup'>Click here to create an account</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
