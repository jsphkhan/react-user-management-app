import React, { Component } from 'react';
//import './styles.css';
import config from '../../config';

export default class NewUserScreen extends Component {
	state = {
		username: '',
		password: '',
		email: '',
		firstname: '',
		lastname: '',
		loading: false,
		//dataArr: [],
		message: ""
	}
	fetchUser() {
		//make a GET call to check if user already exists
		//for our demo, we will match email only
		//better handling of these scenarios can be done using proper NodeJS scripts

		let {username, email} = this.state,
			dbUrl = `${config.baseUrl}:${config.dbPort}`,
			configuredUrl = `${dbUrl}/users?email=${email}`;

		fetch(configuredUrl, {
			method: 'GET',
		}).then((response) => {
			return response.json();
		}).then((responseJson) => {
			//responseJson coming is an array
			if(responseJson.length === 0) {
				console.log('All Good');
				this.createUser();
			} else {
				//an user is found. has to be 1 user
				console.log('User Already Exists');
			}
		}).catch((err) => {
			console.log('Error: ', err);
		});
	}
	createUser() {
		let dbUrl = `${config.baseUrl}:${config.dbPort}`,
			configuredUrl = `${dbUrl}/users`;

		this.setState({loading: true});
		fetch(configuredUrl, {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
				email: this.state.email,
				firstname: this.state.firstname,
				lastname: this.state.lastname
			})
		}).then((response) => {
			return response.json();
		}).then((responseJson) => {
			console.log(responseJson);
			//check if user is created successfully
			if(typeof responseJson === 'object' && responseJson.username === this.state.username) {
				console.log('user created successfully');
				this.setState({loading: false, message: 'User Created Successfully. Click/Tap on All Users to see'});
			}
		}).catch((err) => {
			console.log('Error: ', err);
			this.setState({loading: false, message: "User could not be loaded due to some error."});
		});
	}
	handleSubmit() {
		this.fetchUser();
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
				<p className="text-danger text-center">{this.state.message}</p>
			</div>
		);
	}
}