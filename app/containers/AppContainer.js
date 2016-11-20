import React from 'react';
// import styles from '../styles/containers/AppContainer.css';
// import classNames from 'classnames/bind';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'

// const cx = classNames.bind(styles);

class AppContainer extends React.Component {
  render() {
    console.log(Grid);
    return (
      <Grid>
        <Row>
          <Col xs={6} md={3}>
            Hello {this.props.name}!
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default AppContainer;
