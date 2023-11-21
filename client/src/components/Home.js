import Api from './Api';
import Resources from './Resources';
import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import '../stylesheets/Home.css';
import axios from 'axios';
import {useAuthCheck} from './VerifyAuth';

function Home() {
  const [firstName, setFirstName] = useState('');

  const { authenticated, name, setAuthenticatedStatus } = useAuthCheck();

  useEffect(() => {
    if (name) {
      const nameArray = name.split(' ');
      setFirstName(nameArray[0]);
    }
  }, [name]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const logoutUser = () => {
    window.location.reload();
    axios
      .delete('/logout')
      .then((response) => {
        setAuthenticatedStatus(false);
      })
      .catch((error) => {
        console.log('Error logging out:', error);
      });
  };

  return (
    <div>
      <div className='hero-container'>
        <h1>Adventure Awaits</h1>
        <p>Deez nuts</p>
        <div className='hero-btns'>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            Ha goteem
          </Button>
          <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
          >
            WATCH TRAILER <i className='far fa-play-circle' />
          </Button>
        </div>
      </div>
      <div className='hero-container'>
        <Api />
        {/* You can use the 'authenticated' state here to conditionally render content */}
        {authenticated ? <p>Welcome back, {firstName}.</p> : <p>User is not authenticated.</p>}
        {authenticated && <Button onClick={logoutUser} className='btns' buttonStyle='btn--primary' buttonSize='btn--medium'>Logout</Button>}
        <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--medium' onClick={handleRefresh}>Refresh</Button>
      </div>
      {authenticated && <Resources />}
    </div>
  );
}

export default Home;
