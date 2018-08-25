import React, { Component } from 'react';
import '../css/App.css';
import CapLeader from "./CapLeader";
import SearchBar from "./SearchBar";
import Login from "./Login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CryptAlert</h1>
        </header>
        <div class="container">
          <CapLeader />
          <Login />
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default App;
