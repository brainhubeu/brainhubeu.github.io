import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import Index from './components/Index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
