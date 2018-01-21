import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchDepartures, updateSearch} from '../actions'
import SearchForm from '../components/searchForm'
import ResultList from '../components/resultList'

class App extends Component {
	// Linter seems to have issue with `static` writing
	static propTypes = { // eslint-disable-line no-undef
		dispatch: PropTypes.func.isRequired,
		departures: PropTypes.array.isRequired,
		from: PropTypes.string.isRequired,
		to: PropTypes.string.isRequired,
		date: PropTypes.instanceOf(Date)
	}

	componentDidMount() {
		const {dispatch, from, to, date} = this.props
		dispatch(fetchDepartures(from, to, date))
	}

	componentWillReceiveProps(nextProps) {
		const {dispatch, from, to, date} = nextProps
		if (from !== this.props.from && to !== this.props.to && date !== this.props.date) {
			dispatch(fetchDepartures(from, to, date))
		}
	}

	handleChange(field, value) {
		this.props.dispatch(updateSearch(field, value))
	}

	render() {
		const {from, to, date, departures, isFetching} = this.props
		const isEmpty = departures.length === 0
		return (
			<div>
				<SearchForm
					from={from}
					to={to}
					date={date}
					onChange={this.handleChange}
				/>
				{isFetching &&
					'loading...'
				}
				{/* TODO: replace static false */}
				{!isEmpty &&
					<ResultList departures={departures}/>
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const {departures, from, to, date, isFetching} = state

	return {
		departures,
		from,
		to,
		date,
		isFetching
	}
}

export default connect(mapStateToProps)(App)
