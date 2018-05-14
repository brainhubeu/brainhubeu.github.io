import React, { PureComponent } from 'react';

class Body extends PureComponent {
    render() {
        return (
            <section className="intro">
                <div className="intro__container container">
                    <h2 className="intro__header">Open source projects</h2>
                    <div className="separator">
                        <div className="separator__purple-line"/>
                        <div className="separator__pink-line"/>
                        <div className="separator__blue-line"/>
                    </div>
                    <p className="intro__txt">This list is maintained by the Brainhub development team. It is funded by
                        Brainhub and the names and logos for Brainhub are trademarks of Brainhub Sp. z o.o. You can
                        check other open-source projects supported/developed by our teammates here.<br/> We love
                        open-source JavaScript software! See our other projects or hire us to build your next web,
                        desktop and mobile application with JavaScript.</p>
                </div>
            </section>
        );
    }
}

export default Body;