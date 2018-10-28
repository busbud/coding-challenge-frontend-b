import { connect } from 'react-redux';
import { Header } from 'components';
import { initializeSearchSchedules } from 'store/schedules';

const defaultCities = {
  origin: 'New York',
  destination: 'Montreal'
}

const defaultQuery = {
  origin: 'dr5reg',
  destination: 'f25dvk',
  outbound_date: '2019-08-02'
}

const defaultParams = {
  adult: 1,
  child: 0,
  senior: 0,
  lang: 'en',
  currency: 'USD'
}

const mapStateToProps = (state) => ({
  defaultCities,
  defaultQuery,
  defaultParams
});

const mapDispatchToProps = {
  search: initializeSearchSchedules
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
