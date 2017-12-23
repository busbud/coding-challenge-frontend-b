import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Form, Input, Row, Col } from 'reactstrap';

import { setDeparturesQuery } from '../modules/departures';

class SearchForm extends React.Component {
  constructor (props) {
    super(props);

    this.onChanged = this.onChanged.bind(this);

    this.state = {
      date : '2018-08-02'
    };
  }

  componentDidMount () {
    this.props.dispatch(setDeparturesQuery(this.state.date));
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.date !== this.props.departures.date) {
      this.setState({
        date : this.props.departures.date
      });
    }
  }

  onChanged (e) {
    if (e.currentTarget.value !== this.state.date) {
      this.setState({ date : e.currentTarget.value }, () => {
        this.props.dispatch(setDeparturesQuery(this.state.date));
      });
    }
  }

  render () {
    let dateString = moment(this.state.date).format('dddd, MMM Do');
    return (
      <Row>
        <Col>
          <p className="search-form-date-name">{this.state.date ? dateString : ''}</p>
          <p className="search-form-route-name">New York to Montreal</p>
        </Col>
        <Form inline className="search-form px-3 py-3 mb-3">
          <Input type="text" value="New York" name="from" readOnly title="Leaving from" />
          <Input type="text" value="Montreal" name="to" readOnly title="Going to" />
          <Input type="date" name="date" value={this.state.date} onChange={this.onChanged} title="Departure date" />
        </Form>
      </Row>
    );
  }
}

const mapStateToProps = state =>({
  departures : state.departures
});

export default connect(mapStateToProps)(SearchForm);
