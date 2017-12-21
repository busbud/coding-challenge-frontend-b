import React from 'react';
import { connect } from 'react-redux';

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

  onChanged (e) {
    if (e.currentTarget.value !== this.state.date) {
      this.setState({ date : e.currentTarget.value }, () => {
        this.props.dispatch(setDeparturesQuery(this.state.date));
      });
    }
  }

  render () {
    return (
      <form>
        <input type="text" value="New York" name="from" readOnly />
        <input type="text" value="Montreal" name="to" readOnly />
        <input type="date" name="date" defaultValue={this.state.date} onChange={this.onChanged} />
      </form>
    );
  }
}

const mapStateToProps = state =>({
  departures : state.departures
});

export default connect(mapStateToProps)(SearchForm);
