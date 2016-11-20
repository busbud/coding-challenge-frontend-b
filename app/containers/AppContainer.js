import React from 'react';
import styles from '../styles/containers/AppContainer.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class AppContainer extends React.Component {
  render() {
    return (
      <div className={cx('test')}>
        Hello {this.props.name}!
      </div>
    );
  }
}

export default AppContainer;
