import React, { Component } from 'react';
import whitepaper from './iXfinalassignment.pdf';

class App2 extends Component {
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
            <div className="App2">
                <header className="App-header">

                </header>
            </div>
        );
    }
}

export default App2;
