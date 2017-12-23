import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button, Nav, NavItem, NavLink } from 'reactstrap';

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
    if (!date || !this.props.departures.complete) return (<div></div>);

    return (
      <Nav pills fill>
        <NavItem>
          <NavLink onClick={() => this.changeDate(moment(date, 'YYYY-MM-DD').subtract(1, 'days').toDate())}>&lt; Previous Day</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => this.changeDate(moment(date, 'YYYY-MM-DD').add(1, 'days').toDate())}>Next Day &gt;</NavLink>
        </NavItem>
      </Nav>
    );
  }
};

const mapStateToProps = state =>({
  departures : state.departures
});

export default connect(mapStateToProps)(DayNav);
