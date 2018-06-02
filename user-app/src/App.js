import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import LoginScreen from './screens/LoginScreen/';
import HomeScreen from './screens/HomeScreen/';

/* A fake authentication function */
export const fakeAuth = {

  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true
     setTimeout(cb, 100)
  },
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //let loadingContent = (this.state.loading) ? "Loading..." : "";
    return (
      <Router>
        <div className="App">
          <Route path="/" exact={true} component={LoginScreen} />
          <Route path="/home" component={HomeScreen} />

          {/*<PrivateRoute authed={fakeAuth.isAuthenticated} path="/home" component={HomeScreen} />*/}
        </div>
      </Router>
    );
  }
}

export default App;
