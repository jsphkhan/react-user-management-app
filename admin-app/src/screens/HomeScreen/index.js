import React, { Component } from 'react';
import './styles.css';

import {
	BrowserRouter as Router,
  	Redirect,
  	Link,
  	NavLink,
	Route,
	Switch
} from 'react-router-dom';

import AllUsersScreen from '../AllUsersScreen';
import NewUserScreen from '../NewUserScreen';
import UserDetailScreen from '../UserDetailScreen';

export default class HomeScreen extends Component {
	state = {
		redirectToLogin: false
	}
	constructor(props) {
		super(props);
	}
	handleLogout() {
		this.setState({redirectToLogin: true});
	}
	render() {
		const {redirectToLogin} = this.state;
		//const {email, fullname, picture, username} = this.props.location.state.data;

		if(redirectToLogin) {
			return <Redirect to={{
				pathname: '/'
			}} />;
		}
		return (
			<Router>
				<div>
					<nav className="navbar navbar-inverse navbar-fixed-top">
						<div className="container">
							<div className="navbar-header">
								<a className="navbar-brand" href="#">
									ReactJS User Management App
								</a>
							</div>
				          <ul className="nav navbar-nav navbar-right">
				            <li><a onClick={this.handleLogout.bind(this)}>Logout</a></li>
				          </ul>
						</div>
					</nav>
					<div className="container main-content-wrapper">
						<h3 className="hello-admin">Hello Admin</h3>
						<div className="row">
							<div className="col-md-3 admin-menu">
								<ul>
									<li><NavLink to="/admin/users" activeClassName="selected">All Users</NavLink></li>
									<li><NavLink to="/admin/new/user" activeClassName="selected">Create User</NavLink></li>
								</ul>
							</div>
							<div className="col-md-9">
								<Switch>
									<Route path="/admin/users" component={AllUsersScreen} />
									<Route path="/admin/new/user" component={NewUserScreen} />
									<Route path="/admin/user/detail/:id" component={UserDetailScreen} />
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</Router>
		);
	}
}