import React, { useState } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

import { TMessage, TDeparture } from '../Types/Types';

import { BusbudLogo } from '../Components/Icons';
import { SelectionMenu } from '../Components/SelectionMenu';
import { DepartureCard } from '../Components/DepartureCard';

import '../Styles/Home.css';

const busbudColor = 'rgb(208 243 255)';

const Home = () => {
    const [message, setMessage] = useState<TMessage | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [departures, setDepartures] = useState<Array<TDeparture>>([]);

    return (
        <div className="HomeContainer" >
            <div style={{ backgroundColor: busbudColor, paddingBottom: '20px' }}>
                <Container>
                    <Row>
                        <Col>
                            <div style={{ display: 'flex', color: '#0274ca', justifyContent: 'flex-start', padding: '4px 10px 4px 10px' }}>
                                <BusbudLogo />
                                <div style={{ display: 'flex', alignItems: 'flex-end', flexGrow: 1, padding: '0px 10px 3px 20px' }}>
                                    Departures (Coding Challenge)
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <SelectionMenu
                        setMessage={setMessage}
                        setLoading={setLoading}
                        setDepartures={setDepartures}
                    />
                </Container>
            </div>
            <div>
                <Container>
                    <Row>
                        <Col md={2} lg={3} />
                        <Col sm={12} md={8} lg={6}>
                            {message && (
                                <Alert variant={message.type} onClose={() => setMessage(null)} dismissible style={{ marginTop: '20px' }}>
                                    <Alert.Heading>{(message.type === 'danger') ? 'Error!' : 'Sorry,'}</Alert.Heading>
                                    <p>
                                        {message.details}
                                    </p>
                                </Alert>
                            )}
                        </Col>
                        <Col md={2} lg={3} />
                    </Row>
                    <Row>
                        <Col md={2} lg={3} />
                        <Col sm={12} md={8} lg={6}>
                            {loading && (
                                <div>
                                    <Spinner animation="border" role="status" style={{ marginTop: '20px' }} variant={'primary'} />
                                    <span style={{ color: '#0091ff', marginLeft: '6px', fontWeight: 'bold' }}>Searching departures...</span>
                                </div>
                            )}
                        </Col>
                        <Col md={2} lg={3} />
                    </Row>
                    <Row>
                        <Col md={2} lg={3} />
                        <Col sm={12} md={8} lg={6}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {departures.map((departure) => <DepartureCard key={departure.id} departure={departure} />)}
                            </div>
                        </Col>
                        <Col md={2} lg={3} />
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Home;