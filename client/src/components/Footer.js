import React from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import '../stylesheets/Footer.css';

function Footer() {
    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Join the gee wilikers newsletter here.
                </p>
                <p className='footer-subscription-text'>
                    Seizon senryaku!
                </p>
                <div className='input-areas'>
                    <form>
                        <input
                            type="email"
                            name="email"
                            placeholder='Your Email'
                            className='footer-input'
                        />
                        <Button buttonStyle='btn--outline'>Subscribe</Button>
                    </form>
                </div>
            </section>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div class='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/sign-up'>How it works</Link>
                        <Link to='/'>Testimonials</Link>
                        <Link to='/'>Careers</Link>
                        <Link to='/'>Investors</Link>
                        <Link to='https://linktr.ee/ufakpsi'>Linktree</Link>
                    </div>
                    <div class='footer-link-items'>
                        <h2>Contact</h2>
                        <Link to='/'>Contact Us</Link>
                        <Link to='/'>Support</Link>
                        <Link to='/'>Destinations</Link>
                        <Link to='/'>Sponsorships</Link>
                    </div>
                    <div class='footer-link-items'>
                        <h2>Videos</h2>
                        <Link to='/'>Submit Video</Link>
                        <Link to='/'>Ambassadors</Link>
                        <Link to='/'>Agency</Link>
                        <Link to='/'>Influencer</Link>
                    </div>
                    <div class='footer-link-items'>
                        <h2>Social Media</h2>
                        <Link to='/'>Instagram</Link>
                        <Link to='/'>Facebook</Link>
                        <Link to='/'>Youtube</Link>
                        <Link to='/'>Twitter</Link>
                    </div>
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                            AKΨ
                        </Link>
                    </div>
                    <small className='website-rights'>UF Alpha Kappa Psi ©2023 (All Rights Reserved)</small>
                    <div className='social-icons'>
                        <Link
                            className='social-icon-link instagram'
                            to='https://www.instagram.com/uf_akpsi/'
                            target='_blank'
                            aria-label='Instagram'>
                            <i className='fab fa-instagram' />
                        </Link>
                        <Link
                            className='social-icon-link tiktok'
                            to='https://vm.tiktok.com/TTPd5Dmvnv/'
                            target='_blank'
                            aria-label='TikTok'>
                            <i className='fab fa-tiktok' />
                        </Link>
                        <Link
                            className='social-icon-link facebook'
                            to='https://www.facebook.com/akpsi.uf/'
                            target='_blank'
                            aria-label='Facebook'>
                            <i className='fab fa-facebook-f' />
                        </Link>
                        <Link
                            className='social-icon-link linkedin'
                            to='https://www.linkedin.com/company/alpha-kappa-psi/mycompany/'
                            target='_blank'
                            aria-label='Linkedin'>
                            <i className='fab fa-linkedin' />
                        </Link>
                        <Link
                            className='social-icon-link email'
                            to='/'
                            target='_blank'
                            aria-label='Email'>
                            <i className='fa fa-envelope' />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer;