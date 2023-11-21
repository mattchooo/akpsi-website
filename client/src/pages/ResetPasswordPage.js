import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import '../stylesheets/ResetPasswordPage.css';

function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isPasswordSet, setIsPasswordSet] = useState(false);
    const [isValidLink, setIsValidLink] = useState(true);

    const isPasswordError = !!passwordError;
    const isConfirmPasswordError = !!confirmPasswordError;

    const { token, id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const checkLinkValidity = async () => {
            try {
                const response = await axios.get(`/reset-password/${token}/${id}`, {
                    token: token,
                    id: id
                });
                if (response.data === 'Valid reset password link.') {
                    setIsValidLink(true);
                } else if (response.data === 'Reset password link is invalid.') {
                    setIsValidLink(false);
                }
            } catch (error) {
                setIsValidLink(false);
                console.log('Error:', error);
            }
        };

        checkLinkValidity();
    }, [token, id]);

    const handleChangeNewPassword = (event) => {
        setNewPassword(event.target.value);
    };

    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPasswordError('');
        setConfirmPasswordError('');

        console.log(newPassword.length);

        if (newPassword.length < 8) {
            setPasswordError('Password is less than 8 characters.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setConfirmPasswordError(`Passwords don't match.`);
            return;
        }

        try {
            const putResponse = await axios.put(`/reset-password/${token}/${id}`, { password: newPassword });
            console.log(putResponse.data);
            if (putResponse.data === 'New password successfully updated.') {
                setIsPasswordSet(true);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div>
            {!isPasswordSet && isValidLink ? (
                <div className='reset-password-screen'>
                    <div className='reset-password-container'>
                        <h1>Reset Password:</h1>
                        <div className='input-container'>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type='password'
                                    name='newPassword'
                                    placeholder='New Password'
                                    className={isPasswordError ? 'forgot-password-input forgot-password-input-error' : 'forgot-password-input'}
                                    value={newPassword}
                                    onChange={handleChangeNewPassword}
                                />

                                {passwordError && <small className='error-message'>{passwordError}</small>}

                                <input
                                    type='password'
                                    name='confirmPassword'
                                    placeholder='Confirm Password'
                                    className={isConfirmPasswordError ? 'forgot-password-input forgot-password-input-error' : 'forgot-password-input'}
                                    value={confirmPassword}
                                    onChange={handleChangeConfirmPassword}
                                />
                                {confirmPasswordError && <small className='error-message'>{confirmPasswordError}</small>}
                                <Button className='reset-password-button' buttonStyle='btn--outline' type='submit'>
                                    Reset Password
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : !isPasswordSet ? (
                <div className='error-container'>
                    <div className='error-header'>
                        <h1>Invalid reset password link.</h1>
                    </div>
                </div>
            ) : <div className='success-container'>
                <div className='success-header'>
                    <h1>Password successfully reset!</h1>
                    <p>Click here to login:</p>
                    <Button className='success-button' buttonStyle='btn--outline' onClick={() => navigate('/login')}>
                        Login
                    </Button>
                </div>
            </div>}

        </div>
    );

}

export default ResetPasswordPage;