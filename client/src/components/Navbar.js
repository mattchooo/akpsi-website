import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/Navbar.css';

function Navbar({ isLoginPage, isSignupPage, isForgotPasswordPage }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setIsAuthChecked] = useState(false);
  const [click, setClick] = useState(false);
  const [numNavItems, setNumNavItems] = useState(0);
  const [numAuthNavItems, setNumAuthNavItems] = useState(0);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);



  useEffect(() => {
    const fetchAuthenticationStatus = async () => {
      try {
        const response = await axios.get('/check-auth');
        setAuthenticated(response.data.authenticated);
        setIsAuthChecked(true); // Set the flag once the authentication status is fetched
      } catch (error) {
        console.log('Error fetching authentication status:', error);
        setAuthenticated(false); // Set authenticated to false in case of an error
        setIsAuthChecked(true); // Set the flag even if there's an error
      }
    };

    fetchAuthenticationStatus();
  }, []);
  
  useEffect(() => {
    // Close the dropdown when clicking outside of it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-item');
    setNumNavItems(navItems.length);
  }, []);

  useEffect(() => {
    const navAuthItems = document.querySelectorAll('.nav-auth-item');
    setNumAuthNavItems(navAuthItems.length);
  }, []);

  const handleClick = () => {
    setClick(!click);
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setClick(false);
    }
  };

  const handleLogout = () => {
    window.location.reload();
    axios
      .delete('/logout')
      .then((response) => {
        setAuthenticated(false);
      })
      .catch((error) => {
        console.log('Error logging out:', error);
      });
  }

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);

    return () => {
      window.removeEventListener('resize', showButton);
    };
  }, []);

  return (
    <div>
      <nav className={(isLoginPage || isSignupPage || isForgotPasswordPage) ? 'navbar login-navbar' : 'navbar'}>
        {authChecked && authenticated ? (
          <div className='navbar-container' onClick={handleClick}>
            <Link to="/" className="navbar-logo">
              AKΨ
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'} style={{ gridTemplateColumns: `repeat(${numAuthNavItems}, auto)` }}>
              <li className='nav-auth-item'>
                <Link to='/' className='nav-links'>
                  Home
                </Link>
              </li>
              <li className='nav-auth-item'>
                <Link to='/store' className='nav-links'>
                  Store
                </Link>
              </li>
              <li className='nav-auth-item'>
                <Link to='/account' className='nav-links'>
                  Account
                </Link>
              </li>
              <li className='nav-auth-item nav-links' onClick={() => setOpen(!open)} ref={dropdownRef}>
                Info <i className={open ? 'fa-solid fa-chevron-left' : 'fa-solid fa-chevron-down'} />
                <div className={`dropdown-content ${open ? 'show' : ''}`}>
                  <Link to='/announcements'>Announcements</Link>
                  <Link to='/schedule'>Schedule</Link>
                  <Link to='/important'>Important</Link>
                  <Link to='https://linktr.ee/ufakpsi'>More</Link>
                </div>
              </li>
              <li className='nav-auth-item nav-links' onClick={handleLogout}>
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <div className='navbar-container' onClick={handleClick}>
            <Link to="/" className="navbar-logo">
              AKΨ
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'} style={{ gridTemplateColumns: `repeat(${numNavItems}, auto)` }}>
              <li className='nav-item'>
                <Link to='/' className='nav-links'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/about-us' className='nav-links'>
                  About Us
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/brothers' className='nav-links'>
                  Brothers
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/rush' className='nav-links'>
                  Rush
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/contact' className='nav-links'>
                  Contact
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/login' className='nav-links'>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
