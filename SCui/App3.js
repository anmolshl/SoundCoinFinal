import React, { Component } from 'react';
import whitepaper from './iXfinalassignment.pdf';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';

const Home = () => (
    <div>
        <h2> Home </h2>
    </div>
);

const About = () => (
    <div>
        <ul className='ul'>
            <li>Just some dudes</li>
            <li>doin stuff with</li>
            <li>solidity</li>
        </ul>
    </div>
);

const Contact = () => (
    <div>
        <ul className='ul'>
            <li>Neon wood</li>
            <li>Berlin</li>
            <li>Germany</li>
        </ul>
    </div>
);

class App3 extends Component {
    constructor(props) {
        super(props);
        this.handleClickOpenWhitePaper = this.handleClickOpenWhitePaper.bind(this);
    }
    handleClickOpenWhitePaper() {
        console.log('Click happened');
        const url = whitepaper;
        window.open(url, '_blank');
    }
    render() {
        return (
            <div className="App3">
                <header className="App-header">
                </header>
                <div className="App-center container">
                    <button className="button" onClick={this.handleClickOpenWhitePaper}>View Whitepaper</button>
                </div>
                <div className="c1">
                    <ul className='ul'>
                        <li><Link to="/"><button className="button">Home</button></Link></li>
                        <li><Link to="/about"><button className="button" >About Us</button></Link></li>
                        <li><Link to="/contact"><button className="button" >Contact</button></Link></li>
                    </ul>

                    <Route path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/contact" component={Contact}/>
                </div>
            </div>
        );
    }
}

export default App3;