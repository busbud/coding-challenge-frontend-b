import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Form, Input, Row, Col } from 'reactstrap';
import { Trans, translate } from 'react-i18next';

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
    const { t } = this.props;
    return (
      <div>
        <Row className="details-row">
          <Col xs={{size:12}}>
            <p className="search-form-date-name mb-1 mt-2">{this.state.date ? dateString : ''}</p>
            <p className="search-form-route-name">{t('fromTo')}</p>
          </Col>
        </Row>
        <Form inline className="row search-form py-3 mb-3">
          <Col xs={{size:12}}>
            <Input type="text" value="New York" name="from" readOnly title="Leaving from" />
            <Input type="text" value="Montreal" name="to" readOnly title="Going to" />
            <Input id="datepicker" type="date" name="date" value={this.state.date} onChange={this.onChanged} title="Departure date" />
          </Col>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  departures : state.departures
});

export default connect(mapStateToProps)(translate('translations')(SearchForm));
