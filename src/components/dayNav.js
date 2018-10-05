import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button, Nav, NavItem, NavLink } from 'reactstrap';
import { translate } from 'react-i18next';

import { setDeparturesQuery } from '../modules/departures';

class DayNav extends React.Component {
  constructor () {
    super();
    this.changeDate.bind(this);
  }

  changeDate (date) {
    this.props.dispatch(setDeparturesQuery(moment(date).format('YYYY-MM-DD')));
  }

  render () {
    let date = this.props.departures.date;
    const { t } = this.props;
    if (!date || !this.props.departures.complete) return (<div></div>);

    return (
      <Nav pills fill className="day-nav">
        <NavItem className="day-nav-previous">
          <NavLink onClick={() => this.changeDate(moment(date, 'YYYY-MM-DD').subtract(1, 'days').toDate())}><i className="material-icons">arrow_backward</i> {t('previousDay')}</NavLink>
        </NavItem>
        <NavItem className="day-nav-next">
          <NavLink onClick={() => this.changeDate(moment(date, 'YYYY-MM-DD').add(1, 'days').toDate())}>{t('nextDay')} <i className="material-icons">arrow_forward</i></NavLink>
        </NavItem>
      </Nav>
    );
  }
};

const mapStateToProps = state =>({
  departures : state.departures
});

export default connect(mapStateToProps)(translate('translations')(DayNav));
