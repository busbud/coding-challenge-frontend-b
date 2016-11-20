import React from 'react';
import styles from '../styles/containers/app-container.css';
import classNames from 'classnames/bind';
import Departure from '../components/Departure';
import { connect } from 'react-redux';
import { fetchData } from '../actions/actions';

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
        {this.props.data && this.props.data.cities &&
          this.props.data.cities.map((city) => {
            return (<p>{city.full_name}</p> );
          })

        }
        <Departure departure={this.data && this.props.data.departures} />
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
