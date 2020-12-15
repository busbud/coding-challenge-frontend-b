/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectSearchParams,
  makeSelectDepartures,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/store/selectors';
import H2 from 'components/H2';
import DeparturesList from 'components/DeparturesList';
import CenteredSection from './CenteredSection';
import SearchSection from './SearchSection';
import Section from './Section';
import messages from './messages';
import { changeSearchParams, loadDepartures } from '../App/store/actions';
import saga from '../App/store/saga';
import SearchDeparturesForm from '../../components/SearchDeparturesForm';

const key = 'home';

export function HomePage({
  searchParams,
  loading,
  error,
  departures,
  onSubmitForm,
}) {
  useInjectSaga({ key, saga });

  useEffect(() => {
    // submit the form to load departures
    onSubmitForm(searchParams);
  }, []);

  const departuresListProps = {
    loading,
    error,
    departures,
  };

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Search for all bus departures for a given origin and a given destination"
        />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.searchDeparturesHeader} />
          </H2>
        </CenteredSection>
        <SearchSection>
          <SearchDeparturesForm
            onSubmitForm={onSubmitForm}
            searchParams={searchParams}
          />
        </SearchSection>
        <Section>
          <DeparturesList {...departuresListProps} />
        </Section>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  departures: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  searchParams: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  departures: makeSelectDepartures(),
  searchParams: makeSelectSearchParams(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: searchParams => {
      if (!searchParams) {
        return;
      }

      dispatch(changeSearchParams(searchParams));
      dispatch(loadDepartures());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
