import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import App2 from "./App2";
import App3 from './App3';
import {BrowserRouter as Router, Route} from 'react-router-dom';

let components = (
    <Router>
        <div>
            <App/>
            <App2/>
            <App3/>
        </div>
    </Router>
);

ReactDOM.render(components , document.getElementById('root'));
registerServiceWorker();
