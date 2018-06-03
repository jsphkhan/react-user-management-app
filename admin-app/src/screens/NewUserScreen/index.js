import React, { Component } from 'react';

import config from '../../config';
import validate from '../../utils/validate';

export default class NewUserScreen extends Component {
	state = {
		username: '',
		password: '',
		repassword: '',
		email: '',
		firstname: '',
		lastname: '',
		message: '',
		actionStatus: ''
	}
	validateInput() {
		let {username, password, repassword, email, firstname, lastname} = this.state;
		
		if(validate.isEmpty(username) || validate.isEmpty(password) || validate.isEmpty(email) || validate.isEmpty(firstname) || validate.isEmpty(lastname)) {
			this.setState({actionStatus: 'fail', message: 'Fields cannot be empty'});
		    return false;
		}
		//new password not a valid password
		if(!validate.isValidPassword(password)) {
			this.setState({actionStatus: 'fail', message: 'Password is not valid'});
		    return false;
		}
		//passwords do not match
        if(password !== repassword) {
        	this.setState({actionStatus: 'fail', message: 'Passwords do not match'});
            return false;
        }
		if(!validate.isValidEmail(email)) {
			this.setState({actionStatus: 'fail', message: 'Email is not valid'});
			return false;
		}
		if(!validate.isStringOnly(firstname)) {
			this.setState({actionStatus: 'fail', message: 'First Name should be only characters'});
			return false;
		}
		if(!validate.isStringOnly(lastname)) {
			this.setState({actionStatus: 'fail', message: 'Last Name should be only characters'});
			return false;
		}
		return true;
	}
	fetchUser() {
		//make a GET call to check if user already exists
		//for our demo, we will match email only.
		//unique users have unique email
		//better handling of these scenarios can be done using proper NodeJS scripts

		let {email} = this.state,
			dbUrl = `${config.baseUrl}:${config.dbPort}`,
			configuredUrl = `${dbUrl}/users?email=${email.toLowerCase()}`;

		fetch(configuredUrl, {
			method: 'GET',
		}).then((response) => {
			return response.json();
		}).then((responseJson) => {
			//responseJson coming is an array
			if(responseJson.length === 0) {
				//user not found. Go ahead and create
				this.createUser();
			} else {
				//an existing user is found.
				this.setState({actionStatus: 'fail', message: "User with same email already exists!"});

			}
		}).catch((err) => {
			this.setState({actionStatus: 'fail', message: "User could not be created due to some error."});
		});
	}
	createUser() {
		let dbUrl = `${config.baseUrl}:${config.dbPort}`,
			configuredUrl = `${dbUrl}/users`,
			{username, password, email, firstname, lastname} = this.state;

		fetch(configuredUrl, {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password,
				email: email.toLowerCase(),
				firstname: firstname,
				lastname: lastname
			})
		}).then((response) => {
			return response.json();
		}).then((responseJson) => {
			//check if user is created successfully
			if(typeof responseJson === 'object' && responseJson.username === this.state.username) {
				this.setState({actionStatus: 'success', message: 'User Created Successfully. Click/Tap on All Users to see'});
			} else {
				throw Error();
			}
		}).catch((err) => {
			this.setState({actionStatus: 'fail', message: "User could not be created due to some error."});
		});
	}
	handleSubmit() {
		if(this.validateInput()) {
			this.fetchUser();
		}
	}
	render() {
		return (
			<div className="new-user-box">
				<p className="lead">Create a New User</p>
				<hr />
				<div className="form-group">
					<input 
						type="text"
						className="form-control"
						placeholder="Username"
						onChange={(e) => {
							this.setState({
								username: e.currentTarget.value,
								message: ''
							});
						}} />
				</div>
				<div className="form-group">
					<p className="field-instruction">** Minimum 4 chars and maximum 15 chars long.</p>
					<p className="field-instruction">** Should have at least a letter, a number and a special character</p>
	        		<input 
	        			type="password" 
	        			className="form-control"
	    				placeholder="Password"
	    				onChange={(e) => {
	    					this.setState({
	    						password: e.currentTarget.value,
	    						message: ''
	    					})
	    				}} />
				</div>
				<div className="form-group">
	        		<input 
	        			type="password" 
	        			className="form-control"
	    				placeholder="Re-Enter Password"
	    				onChange={(e) => {
	    					this.setState({
	    						repassword: e.currentTarget.value,
	    						message: ''
	    					})
	    				}} />
				</div>
				<div className="form-group">
	        		<input 
	        			type="email" 
	        			className="form-control"
	    				placeholder="Email Address"
	    				onChange={(e) => {
	    					this.setState({
	    						email: e.currentTarget.value,
	    						message: ''
	    					})
	    				}} />
				</div>
				<div className="form-group">
	        		<input 
	        			type="text" 
	    				className="form-control"
	    				placeholder="First Name"
	    				onChange={(e) => {
	    					this.setState({
	    						firstname: e.currentTarget.value,
	    						message: ''
	    					})
	    				}} />
				</div>
				<div className="form-group">
	        		<input 
	        			type="text" 
	    				className="form-control"
	    				placeholder="Last Name"
	    				onChange={(e) => {
	    					this.setState({
	    						lastname: e.currentTarget.value,
	    						message: ''
	    					})
	    				}} />
				</div>
				<button 
					type="button"
					className="btn btn-primary btn-block"
					onClick={this.handleSubmit.bind(this)}>Submit</button>
				<p className={(this.state.actionStatus === 'success') ? "text-success" : "text-danger"}>{this.state.message}</p>
			</div>
		);
	}
}