import React, { Component } from 'react';
import './styles.css';
import config from '../../config';
import validate from '../../utils/validate';

export default class UserDetailScreen extends Component {
	state = {
		editMode: false,
		updatedFirstName: '',
		updatedLastName: '',
		updatedEmail: '',
		actionStatus: '',
		startEdit: false
	}
	constructor(props) {
		super(props);
		//console.log(props);
	}
	handleValidation(firstnameVal, lastnameVal, emailVal) {
		if(validate.isEmpty(firstnameVal) || validate.isEmpty(lastnameVal) || validate.isEmpty(emailVal)) {
			this.setState({actionStatus: 'fail', message: 'Fields cannot be empty'});
			return false;
		}
		return true;
	}
	handleUserDelete() {
		
		let userId = this.props.location.state.id,
			dbUrl = `${config.baseUrl}:${config.dbPort}`,
			configuredUrl = `${dbUrl}/users/${userId}`;

		console.log('Delete User', userId);

		//this.setState({loading: true});
		fetch(configuredUrl, {
			method: 'DELETE',
		}).then((response) => {
			return response.json();
		}).then((responseJson) => {
			console.log(responseJson);

			//go back
			this.props.history.goBack();
		}).catch((err) => {
			console.log('Error: ', err);
			this.setState({ message: "User could not be removed due to some error."});
		});
	}
	handleSubmit() {
		let userId = this.props.location.state.id,
			dbUrl = `${config.baseUrl}:${config.dbPort}`,
			configuredUrl = `${dbUrl}/users/${userId}`,
			bodyParam = {};

		//validate
		if(!this.handleValidation(this.state.updatedFirstName, this.state.updatedLastName, this.state.updatedEmail)) {
			return;
		}


		//create the request body
		//if first name has changed.
		if(this.state.updatedFirstName.length > 0) {
			bodyParam['firstname'] = this.state.updatedFirstName;
		}
		//if last name has changed.
		if(this.state.updatedLastName.length > 0) {
			bodyParam['lastname'] = this.state.updatedLastName;
		}
		//if email has changed
		if(this.state.updatedEmail.length > 0) {
			bodyParam['email'] = this.state.updatedEmail;
		}

		fetch(configuredUrl, {
			method: 'PATCH',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify(bodyParam)
		}).then((response) => {
			return response.json();
		}).then((responseJson) => {
			//check if user has been updated successfully
			//with the fake json-server things are limited.
			//with a proper NodeJS server, better error handling can be done
			if(typeof responseJson === 'object' && responseJson.id === userId) {
				this.setState({actionStatus: 'success', message: 'User updated successfully!'});
				//console.log('user updated successfully');
			} else {
				this.setState({actionStatus: 'fail', message: 'User could not be updated due to some error.'});
			}
			//reset the state
			this.resetState();
		}).catch((err) => {
			console.log('Error: ', err);
			this.resetState();
			this.setState({loading: false, actionStatus: 'fail', message: "User could not be updated due to some error."});
		});
	}
	resetState() {
		this.setState({updatedFirstName: '', updatedLastName: '', updatedEmail: '', startEdit: false});
	}
	enterEditMode() {
		this.setState({editMode: true});
	}
	render() {
		let {email, username, firstname, lastname, id} = this.props.location.state;

		if(!this.state.editMode) {
			return (
				<div className="home-box">
					<div>
						<p className="lead">User Detail</p>
						<hr/>
					</div>
					<table className="table table-striped table-hover">
				    	<tbody>
							<tr>
									<td>Name: </td>
									<td>{firstname} {lastname}</td>
							</tr>
								<tr>
									<td>ID: </td>
									<td>{id}</td>
							</tr>
							<tr>
									<td>Email: </td>
									<td>{email}</td>
							</tr>
							<tr>
									<td>Username: </td>
									<td>{username}</td>
							</tr>
				    	</tbody>
				  	</table>

				  	<p className="lead">Edit User</p>
				  	<hr/>
				  	<p className="text-muted">
				  		Click/Tap the button below to edit.
				  	</p>
					<button 
						type="button"
						className="btn btn-primary edit-user-btn"
						onClick={this.enterEditMode.bind(this)}>Edit User</button>
					
				  	<p className="lead">Delete User</p>
				  	<hr/>
				  	<p className="text-muted">
				  		You are going to remove the user from databse. 
				  		<span className="label label-danger"> Please note, this cannot be undone</span>
				  	</p>
					<button 
						type="button"
						className="btn btn-danger"
						onClick={this.handleUserDelete.bind(this)}>Delete User</button>
				</div>
			);
		} else {
			return (
				<div>	
					<p className="lead">Edit User</p>
					<hr/>				
					<div className="form-group">
		        		<input 
		        			type="text" 
		        			autoFocus
		    				className="form-control"
		    				defaultValue={firstname}
		    				onChange={(e) => {
		    					this.setState({
		    						updatedFirstName: e.currentTarget.value,
		    						startEdit: true
		    					})
		    				}} />
					</div>
					<div className="form-group">
		        		<input 
		        			type="text" 
		    				className="form-control"
		    				defaultValue={lastname}
		    				onChange={(e) => {
		    					this.setState({
		    						updatedLastName: e.currentTarget.value,
		    						startEdit: true
		    					})
		    				}} />
					</div>
					<div className="form-group">
		        		<input 
		        			type="email" 
		        			className="form-control"
		    				defaultValue={email}
		    				onChange={(e) => {
		    					this.setState({
		    						updatedEmail: e.currentTarget.value,
		    						startEdit: true
		    					})
		    				}} />
					</div>
					
					<button 
						type="button"
						className="btn btn-primary btn-block"
						onClick={this.handleSubmit.bind(this)}>Submit Changes</button>

					<p className={(this.state.actionStatus === 'success') ? "text-success" : "text-danger"}>{this.state.message}</p>
				</div>
			);
		}
	}
}