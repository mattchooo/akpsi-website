import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import axios from 'axios';
import '../stylesheets/SignupPage.css';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [magicWord, setMagicWord] = useState('');

    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const isEmailError = !!emailError;
    const isUsernameError = !!usernameError;
    const isNameError = !!nameError;
    const isPasswordError = !!passwordError;
    const isConfirmPasswordError = !!confirmPasswordError;

    const navigate = useNavigate();


    const addUser = async (event) => {
        setEmailError('');
        setUsernameError('');
        setNameError('');
        setPasswordError('');
        setConfirmPasswordError('');

        event.preventDefault();
        console.log('Magic Word:', magicWord);

        if (username.length < 1){
            setUsernameError('Please enter a username.');
            return;
        }

        if (password.length < 8) {
            setPasswordError('Password is less than 8 characters.');
            return;
        }

        if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('/create', {
                email: email,
                username: username,
                name: name,
                password: password
            });

            if (response.data.email || response.data.username || response.data.name) {
                if (response.data.email) {
                    setEmailError(response.data.email);
                }

                if (response.data.username) {
                    setUsernameError(response.data.username);
                }

                if (response.data.name) {
                    setNameError(response.data.name);
                }
            } else if (response.data.message) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className='signup-screen'>
            <div className='signup-container'>
                <h1>Signup:</h1>
                <div className='input-container'>
                    <form>
                        <input
                            type="email"
                            name="email"
                            placeholder='Email'
                            className={isEmailError ? 'signup-input signup-input-error' :'signup-input'}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </form>
                    {emailError && <small className='error-message'>{emailError}</small>}
                    <form>
                        <input
                            type="text"
                            name="username"
                            placeholder='Username'
                            className={isUsernameError ? 'signup-input signup-input-error' :'signup-input'}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </form>
                    {usernameError && <small className='error-message'>{usernameError}</small>}
                    <form>
                        <input
                            type="text"
                            name="name"
                            placeholder='Full Name'
                            className={isNameError ? 'signup-input signup-input-error' :'signup-input'}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </form>
                    {nameError && <small className='error-message'>{nameError}</small>}
                    <form>
                        <input
                            type="password"
                            name="password"
                            placeholder='Password'
                            className={isPasswordError ? 'signup-input signup-input-error' :'signup-input'}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </form>
                    {passwordError && <small className='error-message'>{passwordError}</small>}
                    <form>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder='Confirm Password'
                            className={isConfirmPasswordError ? 'signup-input signup-input-error' :'signup-input'}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </form>
                    {confirmPasswordError && <small className='error-message'>{confirmPasswordError}</small>}
                    <form>
                        <input
                            type="password"
                            name="keyword"
                            placeholder='Magic Word'
                            className='signup-input'
                        onChange={(e) => setMagicWord(e.target.value)}
                        />
                    </form>
                </div>
                <Button className='signup-button' buttonStyle='btn--outline' onClick={addUser}>Signup</Button>
            </div>
        </div>
    );
}

export default SignupPage;
