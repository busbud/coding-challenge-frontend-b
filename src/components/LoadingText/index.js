import React, { Component } from 'react';

import styles from './styles.scss';

class LoadingText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ellipses: 0
    };
    this.ellipsesLimit = 3;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { ellipses } = this.state;
      this.setState({
        ellipses: ellipses < this.ellipsesLimit ? ellipses + 1 : 0
      });
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { ellipses } = this.state;
    let renderedEllipses = '';
    for (let i = 0; i < ellipses; i++) {
      renderedEllipses += '.';
    }
    for (let i = ellipses; i < this.ellipsesLimit; i++) {
      renderedEllipses += '\u00a0';
    }
    return <div className={styles.loading}>Loading{renderedEllipses}</div>;
  }
}

export default LoadingText;
