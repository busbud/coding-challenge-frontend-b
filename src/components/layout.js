import React, { Component } from 'react';
import { DropdownList } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

import { Languages, Translation } from '../languages/lang';

export default class Layout extends Component {
	render() {
		const year = new Date().getFullYear();
		let ValueInput = ({ item }) => (
			<span>
				<img src={item.img} alt={item.lang} /> {item.lang}
			</span>
        );
		return (
			<div className="app">
				<div className="header d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-black border-bottom shadow-sm">
					<a id="home" href="#home" name="home" className="invisible">
						Home
					</a>
					<h5 className="my-0 mr-md-auto font-weight-normal logo">
						OSHEAGA
						<span className="headline">
							Festival Musique Et Arts
						</span>
					</h5>
					<DropdownList
						data={Languages}
						valueField="id"
						itemComponent={ValueInput}
						valueComponent={ValueInput}
						defaultValue={Translation.getLanguage()}
						onChange={({ id }) => this.props.onChange(id)}
					/>
				</div>
				{this.props.children}
				<footer className="footer text-muted">
					<div className="container">
						<p className="float-right">
							<a href="#home">{Translation.backtoTop}</a>
						</p>
						<p>
							{Translation.createdBy} &copy; {year}
						</p>
					</div>
				</footer>
			</div>
		);
	}
}
