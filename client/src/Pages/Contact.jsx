import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation, faEnvelope, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';


function ContactSection() {
  return (
    <div>
      {/* Shop Header with background image */}
      <section id="shopheader" className="aboutheader" style={{
        backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg72UcyELV4fU_y7v5BU4OBtXyX291q-6QcA&usqp=CAU)`, // Replace with your background image URL
        width: '100%',
        height: '40vh',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '44px',
        textAlign: 'center',
        color: '#ffffff', // Text color for header
      }}>
        <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>#Let's Talk</h2>
        <p style={{ fontSize: '18px' }}>Leave a message. We would love to hear from you!</p>
      </section>
      
      {/* Contact Details and Map Section */}
      <section id="contactdetails" className="section-p1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '40px 88px' }}>
        {/* Contact Details */}
        <div className="details" style={{ width: '40%', color: '#088178' }}>
          <span style={{ fontSize: '16px' }}>GET IN TOUCH</span>
          <h2 style={{ fontSize: '26px', lineHeight: '35px', padding: '20px 0', color: '#088178' }}>Visit us or contact us today</h2>
          <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#088178' }}>Head Office</h3>
          <ul style={{ padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
              <FontAwesomeIcon icon={faSearchLocation} style={{ fontSize: '24px', paddingRight: '10px' }} />
              <p style={{ margin: 0, fontSize: '14px' }}>Mansehra, Pakistan</p>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
              <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '24px', paddingRight: '10px' }} />
              <p style={{ margin: 0, fontSize: '14px' }}>Naima24@gmail.com</p>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
              <FontAwesomeIcon icon={faPhone} style={{ fontSize: '24px', paddingRight: '10px' }} />
              <p style={{ margin: 0, fontSize: '14px' }}>+92 311 98765432</p>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
              <FontAwesomeIcon icon={faClock} style={{ fontSize: '24px', paddingRight: '10px' }} />
              <p style={{ margin: 0, fontSize: '14px' }}>10.00am-5pm Monday-Saturday</p>
            </li>
          </ul>
        </div>
        {/* Map */}
        <div className="map" style={{ width: '55%', height: '400px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <iframe
            title="myframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13182.521930029974!2d73.19629104689974!3d34.30895959335413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38de3c7525c27db5%3A0x4c67e1837b4751e6!2sGhazikot%20Twp%20Mansehra%2C%20Mansehra%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1681659953897!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: '0', borderRadius: '8px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default ContactSection;
