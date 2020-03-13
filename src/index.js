import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import Index from './components/Index';
import registerServiceWorker from './registerServiceWorker';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-62818184-6');
ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
