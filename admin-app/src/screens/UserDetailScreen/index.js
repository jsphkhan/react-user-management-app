import React, { Component } from 'react';
import './styles.css';
import config from '../../config';
import validate from '../../utils/validate';

export default class UserDetailScreen extends Component {
	state = {
		editMode: false,
		updatedFirstName: '',
		originalFirstName: '',
		updatedLastName: '',
		originalLastName: '',
		updatedEmail: '',
		originalEmail: '',
		actionStatus: '',
		startEdit: false,
		message: ''
	}
	validateInput(firstnameVal, lastnameVal, emailVal, hasStartedEditing) {
		if(!hasStartedEditing) {
			this.setState({actionStatus: 'fail', message: 'Cannot submit. Nothing has changed'});
			return false;
		}
		if(validate.isEmpty(firstnameVal) || validate.isEmpty(lastnameVal) || validate.isEmpty(emailVal)) {
			this.setState({actionStatus: 'fail', message: 'Fields cannot be empty'});
			return false;
		}
		if(!validate.isValidEmail(emailVal)) {
			this.setState({actionStatus: 'fail', message: 'Email is not valid'});
			return false;
		}
		return true;
	}
	handleUserDelete() {
		let userId = this.props.location.state.id,
			dbUrl = `${config.baseUrl}:${config.dbPort}`,
			configuredUrl = `${dbUrl}/users/${userId}`;

		//this.setState({loading: true});
		fetch(configuredUrl, {
			method: 'DELETE',
		}).then((response) => {
			return response.json();
		}).then((responseJson) => {
			//user deleted successfully 
			//go back to users page
			//with the fake json-server things are limited.
			//with a proper NodeJS server, better error handling can be done
			this.props.history.goBack();
		}).catch((err) => {
			this.setState({ message: "User could not be removed due to some error."});
		});
	}
	handleSubmit() {
		let userId = this.props.location.state.id,
			dbUrl = `${config.baseUrl}:${config.dbPort}`,
			configuredUrl = `${dbUrl}/users/${userId}`,
			bodyParam = {};

		let {updatedFirstName, updatedLastName, updatedEmail, startEdit} = this.state;

		//validate
		if(!this.validateInput(updatedFirstName, updatedLastName, updatedEmail, startEdit)) {
			return;
		}

		//create the request body
		//if first name has changed.
		if(this.state.updatedFirstName.trim() !== this.state.originalFirstName.trim()) {
			bodyParam['firstname'] = this.state.updatedFirstName;
		}
		//if last name has changed.
		if(this.state.updatedLastName.trim() !== this.state.originalLastName.trim()) {
			bodyParam['lastname'] = this.state.updatedLastName;
		}
		//if email has changed
		if(this.state.updatedEmail.trim() !== this.state.originalEmail.trim()) {
			bodyParam['email'] = this.state.updatedEmail.toLowerCase();
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
			} else {
				throw Error();
			}
			//reset the state
			this.resetState();
		}).catch((err) => {
			this.resetState();
			this.setState({loading: false, actionStatus: 'fail', message: "User could not be updated due to some error."});
		});
	}
	resetState() {
		this.setState({startEdit: false});
	}
	enterEditMode() {
		this.setState({editMode: true});
	}
	componentDidMount() {
		let {email, firstname, lastname} = this.props.location.state;
		this.setState({
			updatedFirstName: firstname, 
			originalFirstName: firstname,
			updatedLastName: lastname,
			originalLastName: lastname,
			updatedEmail: email,
			originalEmail: email
		});
	}
	render() {
		let {email, username, firstname, lastname, id} = this.props.location.state;

		if(!this.state.editMode) {
			return (
				<div>
					<p className="lead">User Detail</p>
					<hr/>
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
						<label htmlFor="firstName">Firstname</label>
		        		<input
		        			id="firstName"
		        			type="text" 
		        			autoFocus
		    				className="form-control"
		    				defaultValue={firstname}
		    				onChange={(e) => {
		    					this.setState({
		    						updatedFirstName: e.currentTarget.value,
		    						startEdit: true,
		    						message: ''
		    					})
		    				}} />
					</div>
					<div className="form-group">
						<label htmlFor="lastName">Lastname</label>
		        		<input 
		        			idd="lastName"
		        			type="text" 
		    				className="form-control"
		    				defaultValue={lastname}
		    				onChange={(e) => {
		    					this.setState({
		    						updatedLastName: e.currentTarget.value,
		    						startEdit: true,
		    						message: ''
		    					})
		    				}} />
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
		        		<input 
		        			id="email"
		        			type="email" 
		        			className="form-control"
		    				defaultValue={email}
		    				onChange={(e) => {
		    					this.setState({
		    						updatedEmail: e.currentTarget.value,
		    						startEdit: true,
		    						message: ''
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