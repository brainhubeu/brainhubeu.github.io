import React from 'react';
import footerData from './footerData';

const Contact = () => (
  <address className="footer-links__address">
    {footerData.offices.map(office => (
      <p key={office.name}>
        <span>{office.name}</span>
        <span>{office.address}</span>
        <span>{office.city}</span>
      </p>
    ))}
    <p>
      <a
        href="mailto:hello@brainhub.eu"
        className="address__mail"
      >hello@brainhub.eu
      </a>
    </p>
  </address>
);


export default Contact;
