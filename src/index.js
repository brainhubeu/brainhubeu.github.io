import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import ReactGA from 'react-ga';

import Index from './components/Index';
import { unregister } from './registerServiceWorker';

unregister();
ReactGA.initialize('UA-62818184-6');
ReactDOM.render(<Index />, document.getElementById('root'));
