import React, { Component } from 'react';
import './styles.css';
import {
  Redirect
} from 'react-router-dom';
import config from '../../config';
import validate from '../../utils/validate';


export default class LoginScreen extends Component {
	state = {
		username: '',
		password: '',
		loginMessage: '',
		redirectToHome: false,
		userData: null
	}
	handleValidation(usernameVal, passwordVal) {
		if(validate.isEmpty(usernameVal) || validate.isEmpty(passwordVal)) {
			this.setState({loginMessage: 'Fields cannot be empty'});
			return false;
		}
		return true;
	}
	handleLogin() {
		let {username, password} = this.state;

		//validate
		if(!this.handleValidation(username, password)) {
			return;
		}

		let dbUrl = `${config.baseUrl}:${config.dbPort}`,
			configuredUrl = `${dbUrl}/admin?username=${username}&password=${password}`;

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
		const {redirectToHome} = this.state;

		if(redirectToHome) {
			return <Redirect to={{
				pathname: '/admin/users',
			}} />;
		}

		return (
			<div className="row">
				<div className="login-box col-md-4 offset-md-4">
					<p className="lead text-center">Admin Login</p>
					<div className="form-group">
						<input 
							type="text" 
							className="form-control"
							placeholder="Username"
							onChange={(e) => {
								this.setState({
									username: e.currentTarget.value,
									loginMessage: ''
								});
							}} />
					</div>
					<div className="form-group">
		        		<input 
		        			type="password" 
		        			className="form-control"
		    				placeholder="Password"
		    				onChange={(e) => {
		    					this.setState({
		    						password: e.currentTarget.value,
		    						loginMessage: ''
		    					})
		    				}} />
					</div>
					<button 
						type="button"
						className="btn btn-primary btn-block"
						onClick={this.handleLogin.bind(this)}>Login</button>

					<p className="text-danger text-center">{this.state.loginMessage}</p>
				</div>
			</div>
		);
	}
}