import React, { Component } from 'react';
import './styles.css';

import {
  Redirect
} from 'react-router-dom';

export default class HomeScreen extends Component {
	state = {
		redirectToLogin: false
	}
	constructor(props) {
		super(props);
		console.log(props);
	}
	handleLogout() {
		this.setState({redirectToLogin: true});
	}
	render() {
		const {redirectToLogin} = this.state;
		const {email, fullname, picture, username} = this.props.location.state.data;

		if(redirectToLogin) {
			return <Redirect to={{
				pathname: '/'
			}} />;
		}
		return (
			<div className="home-box">
				<button onClick={this.handleLogout.bind(this)}>Logout</button>
				<h3>Hello {username}</h3>
				<p>{fullname}</p>
				<p>{email}</p>
			</div>
		);
	}
}