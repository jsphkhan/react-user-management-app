import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './components/ListItem';

class App extends Component {
  state = {
    username: '',
    password: '',
    loading: false,
    dataArr: []
  }
  constructor(props) {
    super(props);
  }
  handleClick() {
    console.log(this.state);

    //make a fetch call
    let url = "http://localhost:3001/users";

    this.setState({loading: true});
    fetch(url, {}).then((response) => {
      return response.json();
    }).then((responsejson) => {
      console.log(responsejson); //comes as an array

      this.setState((prevState) => {
        return {dataArr: prevState.dataArr.concat(responsejson), loading: !prevState.loading};
      });
    }).catch((error) => {
      //handle error
      console.log('Any error', error);
      this.setState({loading: false});
    });
  }
  render() {
    let loadingContent = (this.state.loading) ? "Loading..." : "";
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.handleClick.bind(this)}>Click</button>
        <input type="text" name="username" onChange={(e) => this.setState({username: e.currentTarget.value})} />
        <input type="password" name="password" onChange={(e) => this.setState({password: e.currentTarget.value})} />

        <p>{this.state.username}</p>

        <p>{loadingContent}</p>

        <ul className="list-box">
          {this.state.dataArr.map((item, index) => {
            return <ListItem fullName={item.fullname} key={index} />
          })}
        </ul>
      </div>
    );
  }
}

export default App;
