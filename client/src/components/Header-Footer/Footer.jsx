import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faYoutube,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import appStoreImage from '../../Pages/images/appstore.jpg';
import pay from '../../Pages/images/pay.png';
import play from '../../Pages/images/play.jpg';
import styles from './styles.module.css';
import logoo from '../../Pages/images/logoo.png';




const Footer = () => {
  return (
    <footer className={styles.footer} style={{ backgroundColor: '#E3E6F3' }}>

      {/* AI Whisperer Logo */}
      <div className={styles.row}>
        <div className={styles.col}>
          <img src={logoo} alt="logo" style={{ width: '200px', height: 'auto', marginBottom: '0px' }} />
        </div>
      </div>

      {/* Main Content Section */}
      <div className={styles.row}>
        {/* Contact and Follow Us */}
        <div className={styles.col}>
          <h4>Contact</h4>
          <p>
            <strong>Address: </strong> Mansehra, Pakistan
          </p>
          <p>
            <strong>Phone:</strong> +92 888 8888888
          </p>
          <p>
            <strong>Hours:</strong>10.00am-5pm, Monday-Saturday
          </p>
          <div className={styles.follow}>
            <h4>Follow Us</h4>
            <div className={styles.icon}>
              <Link to="https://www.facebook.com">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </Link>
              <Link to="https://www.instagram.com">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </Link>
              <Link to="https://www.pinterest.com">
                <FontAwesomeIcon icon={faPinterest} size="2x" />
              </Link>
              <Link to="https://www.youtube.com">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
              </Link>
              <Link to="https://www.twitter.com">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </Link>
            </div>
          </div>
        </div>

        {/* About Us */}
        <div className={styles.col}>
          <h4>About Us</h4>
          <Link to="/About" className={styles.link}>About us</Link>
          <Link to="/PrivacyPolicy" className={styles.link}>Privacy Policy</Link>
          <Link to="/TermsModal" className={styles.link}>Terms and Conditions</Link>
          <Link to="/ContactSection" className={styles.link}>Contact Us</Link>
        </div>

        {/* My Account */}
        <div className={styles.col}>
          <h4>My Account</h4>
          <Link to="/signup" className={styles.link}>Sign Up</Link>
          <Link to="/login" className={styles.link}>Login</Link>
          <Link to="/help" className={styles.link}>Help</Link>
        </div>

        {/* Install App */}
        <div className={`${styles.col} ${styles.install}`}>
          <h4>Install App</h4>
          <p>From App Store or Google Play</p>
          <div className={styles.row}>
            <a href="https://www.apple.com/app-store/">
              <img src={appStoreImage} alt="App Store" className={styles.image} />
            </a>
            <a href="https://www.apple.com/app-store/">
              <img src={play} alt="Play Store" className={styles.image} />
            </a>
            {/* Add Google Play icon here */}
          </div>
          <p>Secured Payment Gateways</p>
          <img src={pay} alt="Payment Methods" className={styles.image} />
        </div>
      </div>

      {/* AI Whisperer at the bottom */}
      <div className={styles.row}>
        <div className={styles.col}>
          <h5>2024 AI-Whisperer - All Rights Reserved</h5>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
