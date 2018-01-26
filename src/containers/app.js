import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {abortRequest, fetchDepartures, updateSearch} from '../actions'
import SearchForm from '../components/searchForm'
import ResultList from '../components/resultList'

export class App extends Component {
	// Linter seems to have issue with `static` writing
	static propTypes = { // eslint-disable-line no-undef
		dispatch: PropTypes.func.isRequired,
		departures: PropTypes.array.isRequired,
		from: PropTypes.string.isRequired,
		to: PropTypes.string.isRequired,
		isFetching: PropTypes.bool,
		isError: PropTypes.bool,
		error: PropTypes.string,
		abortController: PropTypes.instanceOf(window.AbortController),
		date: PropTypes.instanceOf(Date)
	}

	componentWillReceiveProps(nextProps) {
		const {dispatch, from, to, date, currency} = nextProps
		if (from !== this.props.from && to !== this.props.to && date !== this.props.date && currency !== this.props.currency) {
			fetchDepartures(from, to, date, currency, dispatch)
		}
	}

	handleChange(field, value) {
		this.props.dispatch(updateSearch(field, value))
	}

	handleSearchClick(e) {
		e.preventDefault()
		const {dispatch, from, to, date, currency, isFetching, abortController} = this.props
		if (isFetching) {
			dispatch(abortRequest(abortController))
		}
		fetchDepartures(from, to, date, currency, dispatch)
	}

	render() {
		const {from, to, date, departures, isFetching, isError, error} = this.props
		const isEmpty = departures.length === 0
		return (
			<div>
				<SearchForm
					from={from}
					to={to}
					date={date}
					onChange={(field, value) => this.handleChange(field, value)}
					onSubmit={e => this.handleSearchClick(e)}
				/>
				{isFetching && 'loading...'}
				{isError && error}
				{!(isError || isEmpty) && <ResultList departures={departures}/>}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const {departures, from, to, date, currency, isFetching, isError, error, abortController} = state

	return {
		departures,
		from,
		to,
		date,
		currency,
		isFetching,
		isError,
		error,
		abortController
	}
}

export default connect(mapStateToProps)(App)
