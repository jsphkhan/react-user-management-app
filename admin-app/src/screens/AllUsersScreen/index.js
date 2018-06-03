import React, { Component } from 'react';
import './styles.css';
import config from '../../config';


export default class AllUsersScreen extends Component {
	state = {
		loading: false,
		dataArr: [],
		message: ""
	}
	componentDidMount() {
		//make the all users call
		let dbUrl = `${config.baseUrl}:${config.dbPort}`,
			configuredUrl = `${dbUrl}/users`;

		this.setState({loading: true});
		fetch(configuredUrl, {
			method: 'GET',
		}).then((response) => {
			return response.json();
		}).then((responseJson) => {
			//responseJson coming is an array
			if(responseJson.length === 0) {
				this.setState({loading: false, message: "No Users Found. Why don't you create some?"});
			} else {
				//data found
				this.setState({dataArr: responseJson, loading: false});
			}
		}).catch((err) => {
			this.setState({loading: false, message: "Data Could not be loaded due to some error."});
		});
	}
	openDetailScreen(userObj) {
		this.props.history.push(`/admin/user/detail/${userObj.id}`, {
			...userObj
		});
	}
	render() {
		if(this.state.loading) {
			return (<h2>Loading....</h2>);
		}
		return (
			<div>
				{(this.state.dataArr.length === 0) ? (
					<p className="text-danger">{this.state.message}</p>
				) : (
					<div>
						<p className="lead">All Users ({this.state.dataArr.length})</p>
						<hr/>
						<p className="text-muted">Click/Tap on a user to view and edit</p>
						<ul className="user-list">
							{this.state.dataArr.map((item, index) => {
								return (
									<li className="user-item" onClick={() => {this.openDetailScreen(item)}} key={index} id={item.id}>
										<p className="user-item-header">{item.firstname} {item.lastname}</p>
										<p className="text-muted">{item.email}</p>
										<p className="text-muted">ID: {item.id}</p>
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</div>
		);
	}
}