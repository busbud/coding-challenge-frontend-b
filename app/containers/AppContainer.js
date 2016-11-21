import React from 'react';
import styles from '../styles/containers/app-container.css';
import classNames from 'classnames/bind';
import Departure from '../components/Departure';
import { connect } from 'react-redux';
import { fetchData } from '../actions/actions';
import { Grid, Row, Col } from 'react-flexbox-grid';

const cx = classNames.bind(styles);

class AppContainer extends React.Component {
  componentDidMount() {
    // don't do this here
    const { fetchDepartures } = this.props;
    fetchDepartures();
  }
  render() {
    console.log('render', this.props);
    const { data } = this.props.data;
    return (
      <div className={cx('app')}>
        Hello {this.props.name}!
        <Row>
        <Col xs={6}>Test</Col>        <Col xs={3}>Test</Col>
        </Row>
        {this.props.data && this.props.data.departures &&
          this.props.data.departures.map((departure) => {
            return (
              <Departure
                key={departure.id}
                destination={this.props.data.locations.filter(location => location.id === departure.destination_location_id )[0]}
                origin={this.props.data.locations.filter(location => location.id === departure.origin_location_id )[0]}
                operator={this.props.data.operators.filter(operator => operator.id === departure.operator_id)[0]}
                departure={departure}
              />
            );
          })

        }

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.example.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDepartures: () => {
      dispatch(fetchData('http://localhost:8081/api'))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
