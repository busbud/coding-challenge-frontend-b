import React from 'react';
import styles from '../styles/containers/AppContainer.css';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { fetchData } from '../actions/actions';

const cx = classNames.bind(styles);

class AppContainer extends React.Component {
  componentDidMount() {
    console.log(this.props.dispatch(fetchData('http://localhost:8081/api')));
  }
  render() {
    return (
      <div className={cx('app')}>
        Hello {this.props.name}!
      </div>
    );
  }
}

export default connect()(AppContainer);
