import React, { PureComponent, StrictMode } from 'react';
import Header from './Header';
import Body from './Body';
import Tabs from './Tabs';
import Footer from './Footer/Footer';

class Index extends PureComponent {
    render() {
        return (
            <StrictMode>
                <Header/>
                <Body/>
                <Tabs/>
                <Footer/>
            </StrictMode>
        );
    }
}

export default Index;