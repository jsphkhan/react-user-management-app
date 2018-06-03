import React, { Component } from 'react';
import './styles.css';

import {
  Redirect
} from 'react-router-dom';

export default class HomeScreen extends Component {
	state = {
		redirectToLogin: false
	}
	handleLogout() {
		this.setState({redirectToLogin: true});
	}
	render() {
		const {redirectToLogin} = this.state;
		const {email, firstname, lastname, id, username} = this.props.location.state.data;

		if(redirectToLogin) {
			return <Redirect to={{
				pathname: '/'
			}} />;
		}
		return (
			<div>
				<nav className="navbar navbar-inverse navbar-fixed-top">
					<div className="container">
						<div className="navbar-header">
							<a className="navbar-brand">
								ReactJS User App
							</a>
						</div>
			          <ul className="nav navbar-nav navbar-right">
			            <li><a className="logout-btn" onClick={this.handleLogout.bind(this)}>Logout</a></li>
			          </ul>
					</div>
				</nav>
				<div className="container main-content-wrapper">
					<h3 className="hello-admin">Hello {username}</h3>

					<p className="lead">Your Details: </p>
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
				</div>
			</div>
		);
	}
}