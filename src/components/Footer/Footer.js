import React from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import FooterLinks from './FooterLinks';
import footerData from './footerData';

const Footer = () => (
  <footer>
    <div className="slider">
      <Carousel
        infinite
        centered
        itemWidth={198}
        autoPlay={3000}
      >
        {footerData.slider.map(slide => (
          <img style={{ width: `${198}px` }} key={slide.src} src={slide.src} alt={slide.alt}/>
        ))}
      </Carousel>
    </div>

    <div className="contact-us__banner-bg">
      <div className="contact-us__container container">
        <p className="contact-us__txt">Tell us more about project you want to work on</p>
        <a href="https://brainhub.eu/contact" className="contact-us__btn">
          <span>Contact Us</span>
        </a>
      </div>
    </div>
    <FooterLinks/>
  </footer>
);

export default Footer;
