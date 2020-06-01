import React from 'react';

import FooterData from './footerData';
import Contact from './Contact';
import Facebook from './icons/Facebook';
import Instagram from './icons/Instagram';
import Twitter from './icons/Twitter';
import Linkedin from './icons/Linkedin';

const FooterLinks = () => (
  <div className="footer-links">
    <div className="footer-links__container container">
      <div className="footer-links__left-container">
        <div className="footer-links__list-container">
          <p className="footer-links__header">company</p>
          <ul className="footer-links__list">
            {FooterData.company.map(company => (
              <li key={company.name}><a href={company.href}>{company.name}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-links__list-container">
          <p className="footer-links__header">services</p>
          <ul className="footer-links__list">
            {FooterData.services.map(service => (
              <li key={service.name}><a href={service.href}>{service.name}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-links__right-container">
        <ul className="footer-links__socials">
          <li>
            <a href="https://www.facebook.com/brainhubapps" target="_blank" rel="noopener noreferrer" >
              <Facebook/>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company-beta/9462359/" target="_blank" rel="noopener noreferrer" >
              <Linkedin/>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/Brainhubeu" target="_blank" rel="noopener noreferrer" >
              <Twitter/>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/brainhubeu/" target="_blank" rel="noopener noreferrer" >
              <Instagram/>
            </a>
          </li>
        </ul>
        <hr className="footer-links__social-underline"/>
        <Contact/>
        <p className="footer-links__copyrights">copyright © brainhub sp. z. o. o. 2018</p>
      </div>
    </div>
  </div>
);

export default FooterLinks;
