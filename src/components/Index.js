import React, { StrictMode } from 'react';
import Header from './Header/Header';
import Intro from './Intro';
import Tabs from './Tabs';
import Footer from './Footer/Footer';

const Index = () => (
  <StrictMode>
    <Header/>
    <Intro/>
    <Tabs/>
    <Footer/>
  </StrictMode>
);

export default Index;
