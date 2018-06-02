import React, { Component } from 'react';
import './styles.css';

import config from '../../config';
import validate from '../../utils/validate';

import {
  Redirect
} from 'react-router-dom';

export default class LoginScreen extends Component {
	state = {
		username: '',
		password: '',
		loginMessage: '',
		redirectToHome: false,
		userData: null
	}
	constructor(props) {
		super(props);
	}
	handleValidation(usernameVal, passwordVal) {
		if(validate.isEmpty(usernameVal) || validate.isEmpty(passwordVal)) {
			this.setState({loginMessage: 'Fields cannot be empty'});
			return false;
		}
		return true;
	}
	handleLogin() {
		let username = this.state.username,
			password = this.state.password;
		//validate the user and then
		if(!this.handleValidation(username, password)) {
			return;
		}

		//make the login call
		let dbUrl = `${config.baseUrl}:${config.dbPort}`,
			configuredUrl = `${dbUrl}/users?username=${username}&password=${password}`;

		/*
		** Here I am making a GET Call to match the user and login
		** Since I do not have any server side scripts (eg. NodeJS)
		** Usually I would have done a POST call and handled the login
		** in the server.
		*/
		fetch(configuredUrl, {
			method: 'GET',
		}).then((response) => {
			return response.json();
		}).then((responseJson) => {
			//responseJson coming is an array
			if(responseJson.length === 0) {
				this.setState({loginMessage: 'Could not log you in.'});
				return;
			} else {
				//an user is found. has to be 1 user
				if(responseJson.length === 1) {
					//console.log('Success Login: ', responseJson);
					//redirect to home
					this.setState({
						redirectToHome: true,
						userData: responseJson[0]
					});
				}
			}
		}).catch((err) => {
			console.log('Error: ', err);
		});
	}
	render() {
		const {redirectToHome, userData} = this.state;

		if(redirectToHome) {
			return <Redirect to={{
				pathname: '/home',
				state: {data: userData}
			}} />;
		}

		return (
			<div className="login-box">
				<div>
					<input 
						type="text" 
						name="username" 
						placeholder="Username"
						onChange={(e) => {
							this.setState({
								username: e.currentTarget.value,
								loginMessage: ''
							});
						}} />
				</div>
				<div>
	        		<input 
	        			type="password" 
	    				name="password" 
	    				placeholder="Password"
	    				onChange={(e) => {
	    					this.setState({
	    						password: e.currentTarget.value,
	    						loginMessage: ''
	    					})
	    				}} />
				</div>
				<button 
					onClick={this.handleLogin.bind(this)}>Login</button>

				<p>{this.state.loginMessage}</p>
			</div>
		);
	}
}