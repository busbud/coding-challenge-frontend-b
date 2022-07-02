import React from 'react';

import { Alert, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
    return (
        <div className="HomeContainer">
            {/* {Alerts()} */}
            {Form()}
        </div>
    );
}

const Alerts = () => {
    return (
        <div>
            {['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].map((variant) => (
                <Alert key={variant} variant={variant}>
                    This is a {variant} alert—check it out!
                </Alert>
            ))}
        </div>
    )
}

const Form = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <div style={{ display: 'flex', backgroundColor: 'black', color: '#f2f2f2', justifyContent: 'flex-start', padding: '4px 10px 4px 10px' }}>
                        <h4>Busbud Front-End Coding Challenge</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={8}>
                    <div style={{ display: 'flex', backgroundColor: 'cyan', alignItems: 'center', justifyContent: 'center' }}>
                        sm=8
                    </div>
                </Col>
                <Col sm={4}>sm=4</Col>
            </Row>
            <Row>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
            </Row>
        </Container>
    );
}

export default Home;