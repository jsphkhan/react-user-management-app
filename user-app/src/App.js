import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import LoginScreen from './screens/LoginScreen/';
import HomeScreen from './screens/HomeScreen/';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact={true} component={LoginScreen} />
          <Route path="/home" component={HomeScreen} />
        </div>
      </Router>
    );
  }
}

export default App;
