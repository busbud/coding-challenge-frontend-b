import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import {
  changeLocale as changeLocaleAction,
} from '../../store/services/locales/actions'

import {
  getSchedules as getSchedulesAction,
} from '../../store/services/schedules/actions'

import * as schedulesSelectors from '../../store/services/schedules/selectors'

import App from './App'

const locales = [{
  currency: 'USD',
  lang: 'en',
}, {
  currency: 'CAD',
  lang: 'fr',
}];

const defaultQuery = {
  origin: 'dr5reg',
  destination: 'f25dvk',
  outbound_date: '2019-08-02'
}

const defaultParams = {
  adult: 1,
  child: 0,
  senior: 0
}

const mapStateToProps = state => {
  return {
    cities: schedulesSelectors.getCities(state),
    departures: schedulesSelectors.getDepartures(state),
    defaultParams,
    defaultQuery,
    isLoading: schedulesSelectors.getLoading(state),
    locales,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    changeLocale: changeLocaleAction,
    getSchedules: getSchedulesAction,
  }, dispatch)
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default withNamespaces('translations')(AppContainer)
