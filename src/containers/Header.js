import { connect } from 'react-redux';
import { Header } from 'components';
import { changeLocale } from 'store/locale';
import { initializeSearchSchedules } from 'store/schedules';
import { searchLocation } from 'store/search';

const locales = [{
  lang: 'en',
  currency: 'USD'
}, {
  lang: 'fr',
  currency: 'CAD'
}];

const defaultCities = {
  origin: 'New York',
  destination: 'Montreal'
};

const defaultQuery = {
  origin: 'dr5reg',
  destination: 'f25dvk',
  outbound_date: '2019-08-02'
};

const defaultParams = {
  adult: 1,
  child: 0,
  senior: 0
};

const mapStateToProps = (state) => ({
  defaultCities,
  defaultQuery,
  defaultParams,
  locales,
  locale: state.locale,
  schedules: state.schedules
});

const mapDispatchToProps = {
  search: initializeSearchSchedules,
  searchLocation: searchLocation,
  changeLocale
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
