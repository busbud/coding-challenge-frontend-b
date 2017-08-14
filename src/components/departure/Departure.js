import React, { Component } from 'react';

export class Departure extends Component {
	render() {
		return (
			<tr>
				<td>{this.props.information.departure}</td>
				<td>{this.props.information.arrival}</td>
				<td>{this.props.information.location}</td>
				<td>{this.props.information.price}</td>
			</tr>
		);
	}
};
