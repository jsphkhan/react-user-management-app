import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ListItem extends Component {
	render() {
		let {fullName} = this.props;
		return (
			<li>{fullName}</li>
		);
	}
}