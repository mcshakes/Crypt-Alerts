import React, { Component } from 'react';
import '../css/App.css';
import CapLeader from "./CapLeader";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CryptAlert</h1>
        </header>
        <div className="market-cap-leader">
          <CapLeader />
        </div>
      </div>
    );
  }
}

export default App;
