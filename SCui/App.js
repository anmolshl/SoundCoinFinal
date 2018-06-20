import React, { Component } from 'react';
import logo from './images/soundcoin-logo.png';
import './App.css';
import whitepaper from './iXfinalassignment.pdf';
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';



class App extends Component {
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
      <div className="App">
          <div className="App-right">
              <Link to="./Register"><button className="button">Sign in</button></Link>
              <form className="button" action="Register.html">
                  <button type="submit" value="signin">Register</button>
              </form>
          </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="Welcome-font">SoundCoin</h1>
            <div className="App-right">
            <h2 className="drake-new-release">DRAKE'S NEW RELEASE</h2>
            <h2 className="drake-gods-plan">GOD'S PLAN</h2>
            <h2 className="learn-more">LEARN MORE...</h2>
            </div>
        </header>
      </div>
    );
  }
}


export default App;
