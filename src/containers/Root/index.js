import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, bool } from 'prop-types';
import Actions from '../../actions/';

import {
	Layout, TicketList, Header, Navigation, Spinner, Settings, Action,
} from '../../components';
import './style.scss';

class Root extends Component {
	componentDidMount() {
		this.props.rootPageRendered();
	}

	render() {
		const mainTicketList = (
			<main className="main">
				{(this.props.safe && <TicketList {...this.props} />)}
				{!(this.props.complete && this.props.safe) && <Spinner />}
			</main>
		);

		const appLogo = (
			<Action onClick="https://www.busbud.com" classnames="link">
				<img className="app-logo" alt="Busbud" src="/images/busbud_logo.svg" />
			</Action>
		);
		const appSettings = <Settings {...this.props} />;

		return (
			<div className="root">
				<div className="page-cover" />
				<Header classnames="app-header">
					<Layout columns={[appLogo, appSettings]} />
					<Navigation {...this.props} />
				</Header>
				<Layout columns={[mainTicketList]} />
			</div>
		);
	}
}

Root.propTypes = {
	rootPageRendered: func,
	safe: bool,
	complete: bool,
};

const mapStateToProps = state => ({
	tickets: state.app.tickets,
	safe: state.app.safe,
	complete: state.app.complete,
	currency: state.app.currency,
	date: state.app.date,
});

const mapDispatchToProps = dispatch => ({
	rootPageRendered: () => dispatch(Actions.rootPageRendered()),
	onDateChange: (e) => dispatch(Actions.onDateChange({ date: e.target.value })),
	onLanguageChange: () => dispatch(Actions.onLanguageChange()),
	onCurrencyChange: (data) => dispatch(Actions.onCurrencyChange({ currency: data })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
