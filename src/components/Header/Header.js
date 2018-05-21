import React, { PureComponent } from 'react';
import BrainhubLogo from './BrainhubLogo';
import ArrowDown from './ArrowDown';

class Header extends PureComponent {
  static scrollDown() {
    const nextSection = document.querySelector('.intro__container');

    window.scrollBy({
      top: nextSection.getBoundingClientRect().top + 1,
      left: 0,
      behavior: 'smooth',
    });
  }

  render() {
    return (
      <div>
        <header className="top-banner">
          <div className="top-banner__container container">
            <div className="menu">
              <div className="logo__container">
                <a href="https://brainhub.eu/" className="logo_img">
                  <BrainhubLogo/>
                </a>
                <span className="logo__txt">ready to build your app</span>
              </div>
              <a className="menu__contact-btn" href="https://brainhub.eu/contact">{`Let's talk about your
                project`}
              </a>
            </div>
            <div className="top-banner__header-line">
              <h1>Open source projects</h1>
              <button
                className="top-banner__arrow"
                onClick={Header.scrollDown}
              >
                <ArrowDown/>
              </button>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
