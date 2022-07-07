import React, { useContext, useState, useRef } from 'react';
import { Row, Col, Form, FloatingLabel, Popover, Overlay, Button } from 'react-bootstrap';
import { TQueryParams, TLocation, PassengerProps, LocationProps, TDeparture, SelectionMenuProps } from '../Types/Types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSubtract, faLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons';

import { fetchDepartures } from '../Connections/Connections';

import '../Styles/SelectionMenu.css';

import moment from 'moment';

const boldTextParams = {
    color: '#717578',
    fontWeight: 'bold'
}

const originAvailable = [{ id: 1, city: 'Québec City', state: 'Quebec', geoHash: 'f2m673' }];
const destinationAvailable = [{ id: 1, city: 'Montreal', state: 'Quebec', geoHash: 'f25dvk' }];
const initialQueryParams: TQueryParams = {
    adult: 1,
    child: 0,
    senior: 0,
    lang: 'EN',
    currency: 'CAD'
};

export const OnChangePassengersContext = React.createContext<((type: string, action: string) => void) | null>(null);

export const SelectionMenu = (props: SelectionMenuProps) => {
    const { setDepartures, setLoading, setMessage } = props;

    const todayDate = new Date();
    const format = "YYYY-MM-DD";
    const minDate = moment(todayDate).format(format);

    const [queryParams, setQueryParams] = useState<TQueryParams>(initialQueryParams);
    const [origin, setOrigin] = useState<TLocation>(originAvailable[0]);
    const [destination, setDestination] = useState<TLocation>(destinationAvailable[0]);
    const [date, setDate] = useState<string>(minDate);

    const [showDepartures, setShowDepartures] = useState<boolean>(false);
    const [showDestinations, setShowDestinations] = useState<boolean>(false);
    const [showPassengers, setShowPassengers] = useState<boolean>(false);

    const [targetOrigin, setTargetOrigin] = useState<any>(null);
    const [targetDestination, setTargetDestination] = useState<any>(null);
    const [targetPassengers, setTargetPassengers] = useState<any>(null);

    const refOrigin = useRef(null);
    const refDestination = useRef(null);
    const refPassengers = useRef(null);

    const { adult, child, senior } = queryParams;
    const passengersValue = adult + child + senior;

    const originValue = origin.city;
    const destinationValue = destination.city;

    window.addEventListener('click', (e) => {
        if (document) {
            HandlingClosePopOver(e, 'popover-contained-origin', 'fInputOrigin', setShowDepartures);
            HandlingClosePopOver(e, 'popover-contained-destination', 'fInputDestination', setShowDestinations);
            HandlingClosePopOver(e, 'popover-contained-passengers', 'fInputPassengers', setShowPassengers);
        }
    });

    const boxShadow = '0px 4px 4px hsl(206deg 48% 24% / 10%), 0px 4px 4px hsl(206deg 48% 24% / 10%)';

    const rowStyle = {
        margin: '20px 0px 20px 0px',
        borderRadius: '.25rem',
        backgroundColor: 'transparent'
    }

    const colStyle = {
        backgroundColor: 'white',
        border: '1px solid transparent',
        borderRadius: '.25rem',
        padding: '4px 4px 4px 4px',
        boxShadow
    }

    const OnshowDepartures = (event: any) => {
        setShowDepartures(!showDepartures);
        setTargetOrigin(event.target);
    };

    const OnshowDestinations = (event: any) => {
        setShowDestinations(!showDestinations);
        setTargetDestination(event.target);
    };

    const OnshowPassengers = (event: any) => {
        setShowPassengers(!showPassengers);
        setTargetPassengers(event.target);
    };

    const OnChange_Date = (event: any) => {
        const selectedDateString = event.target.value;
        setDate(selectedDateString);
    }

    const OnSearch = (event: any) => {
        fetchDeparturesFromAPI();
    };

    const OnChange_Origin = (_location: TLocation) => {
        setOrigin(_location);
        setShowDepartures(false);
    }

    const OnChange_Destination = (_location: TLocation) => {
        setDestination(_location);
        setShowDestinations(false);
    }

    const OnChangePassengers = (type: string, action: string) => {
        const previousValue = queryParams[type as keyof TQueryParams] as number;
        let newValue = (action === 'add') ? previousValue + 1 : previousValue - 1;

        if (newValue < 0) {
            newValue = 0;
        }

        setQueryParams(prevState => ({ ...prevState, [type]: newValue }))
    }

    const fetchDeparturesFromAPI = async () => {
        setMessage(null);
        setDepartures([]);
        setLoading(true);

        const data = await fetchDepartures(origin.geoHash, destination.geoHash, date, queryParams);

        setLoading(false);

        if (data && data.error) {
            setMessage({ type: 'danger', details: data.error.details });
            return;
        }

        if (data && (!data.departures || data.departures.length < 1)) {
            setMessage({ type: 'warning', details: 'We could not find any departure for this search. Please, try later or chose another departure date.' });
            return;
        }

        const _locations = data.locations;
        const _cities = data.cities;

        const _departures: Array<TDeparture> = data.departures.map((item: any) => {

            const itemLocation_Origin = _locations.filter((loc: any) => loc.id === item.origin_location_id)[0];
            const itemLocation_Destination = _locations.filter((loc: any) => loc.id === item.destination_location_id)[0];

            const itemCity_Origin = _cities.filter((city: any) => city.id === itemLocation_Origin.city_id)[0];
            const itemCity_Destination = _cities.filter((city: any) => city.id === itemLocation_Destination.city_id)[0];

            const locationName_Origin = `${itemCity_Origin.name} - ${itemLocation_Origin.name}`;
            const locationName_Destination = `${itemCity_Destination.name} - ${itemLocation_Destination.name}`;

            return {
                id: item.id,
                departureTime: item.departure_time,
                arrivalTime: item.arrival_time,
                locationName_Origin,
                locationName_Destination,
                price: item.prices.total,
                currency: item.prices.currency
            }
        });

        setDepartures(_departures);
    }

    return (
        <Row className="g-2" style={rowStyle}>
            <Col sm={6} md={3} lg={3} style={colStyle}>
                <FloatingLabel controlId="fInputOrigin" label="Origin" onClick={OnshowDepartures}>
                    <Form.Control placeholder="origin" value={originValue} className={'f-control'} />
                </FloatingLabel>
            </Col>
            <Col sm={6} md={3} lg={3} style={colStyle}>
                <FloatingLabel controlId="fInputDestination" label="Destination" onClick={OnshowDestinations} >
                    <Form.Control placeholder="destination" value={destinationValue} className={'f-control'} />
                </FloatingLabel>
            </Col>
            <Col sm={4} md={2} lg={2} style={colStyle}>
                <FloatingLabel label="Date">
                    <Form.Control type="date" name="dob" placeholder="date" min={minDate} onChange={OnChange_Date} value={date} className={'f-control'} />
                </FloatingLabel>
            </Col>
            <Col sm={4} md={2} lg={2} style={colStyle}>
                <FloatingLabel controlId="fInputPassengers" label="Passengers" onClick={OnshowPassengers}>
                    <Form.Control placeholder="passengers" value={passengersValue} className={'f-control'} />
                </FloatingLabel>

            </Col>
            <Col sm={4} md={2} lg={2}>
                <div className='cButton' onClick={OnSearch}>
                    <FontAwesomeIcon icon={faSearch} style={{ width: '18px', height: '18px', marginRight: '10px' }} color={'white'} />
                    Search
                </div>
            </Col>

            {/* PopOvers */}
            <LocationPopOver
                title={'Origin'}
                visible={showDepartures}
                listItems={originAvailable}
                onChange={OnChange_Origin}
                target={targetOrigin}
                refLocation={refOrigin}
            />
            <LocationPopOver
                title={'Destination'}
                visible={showDestinations}
                listItems={destinationAvailable}
                onChange={OnChange_Destination}
                target={targetDestination}
                refLocation={refDestination}
            />
            <OnChangePassengersContext.Provider value={OnChangePassengers}>
                <PassengersPopOver
                    title={'Passengers'}
                    visible={showPassengers}
                    target={targetPassengers}
                    refPassengers={refPassengers}
                    queryParams={queryParams}
                />
            </OnChangePassengersContext.Provider>
        </Row>
    )
}

export const LocationPopOver = (props: LocationProps) => {
    const { title, visible, listItems, onChange, target, refLocation } = props;

    return (
        <div ref={refLocation}>
            <Overlay
                show={visible}
                target={target}
                placement="bottom-start"
                container={refLocation}
                containerPadding={20}
                transition={true}
            >
                <Popover id={`popover-contained-${title.toLocaleLowerCase()}`}>
                    {/* <Popover.Header as="h3">{title}</Popover.Header> */}
                    <Popover.Body>
                        <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                            {listItems.map(item => {
                                const { id, city, state } = item;

                                return (
                                    <div key={id} className={'card-location'} onClick={() => onChange(item)}>
                                        <FontAwesomeIcon icon={faLocationDot} style={{ width: '18px', height: '18px' }} color={'#717578'} />
                                        <div style={{ marginLeft: '4px', ...boldTextParams }}>{city},</div>
                                        <div style={{ marginLeft: '4px' }}>{state}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    )
}

export const PassengersPopOver = (props: PassengerProps) => {
    const { title, visible, target, refPassengers, queryParams } = props;

    const { adult, child, senior } = queryParams;

    return (
        <div ref={refPassengers}>
            <Overlay
                show={visible}
                target={target}
                placement="bottom-start"
                container={refPassengers}
                containerPadding={20}
                transition={true}
            >
                <Popover id={`popover-contained-${title.toLocaleLowerCase()}`}>
                    <Popover.Body>
                        <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                            {SmallCard('Adults', 'adult', adult, true)}
                            {SmallCard('Children', 'child', child, true)}
                            {SmallCard('Seniors', 'senior', senior, false)}
                        </div>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    )
}

const SmallCard = (title: string, type: string, value: number, hasSaparator: boolean) => {
    const borderBottom = (hasSaparator) ? '1px solid #d1d1d1' : 'none';

    const canClick = (value > 0);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '240px', paddingBottom: '8px', borderBottom, margin: '4px 0px 4px 0px', justifyContent: 'center' }}>
            <div style={{ flexGrow: 1 }}>
                <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', height: '100%', ...boldTextParams }}>{title}</div>
            </div>
            {SmallCardButton(faSubtract, type, 'remove', canClick)}
            <div>
                <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>{value}</div>
            </div>
            {SmallCardButton(faPlus, type, 'add', true)}
        </div>
    )
}

const SmallCardButton = (icon: any, type: string, action: string, canClick: boolean) => {
    const buttonSize = '32px';
    const iconSize = '16px';

    const backgroundColor = '#def7fb';

    const onChange = useContext(OnChangePassengersContext) as ((type: string, action: string) => void);

    return (
        <Button style={{ width: buttonSize, height: buttonSize, margin: '0px 6px 0px 6px', backgroundColor, border: 'none' }} onClick={() => onChange(type, action)} disabled={!canClick}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesomeIcon icon={icon} style={{ width: iconSize, height: iconSize }} color={'#717578'} />
            </div>
        </Button>
    )
}

const HandlingClosePopOver = (e: MouseEvent, popOverId: string, inputId: string, clickEvent: React.Dispatch<React.SetStateAction<boolean>>) => {
    const popOverElement = document.getElementById(popOverId);
    const inputElement = document.getElementById(inputId);

    let clickedOnInputOrPopOver = false;

    if (popOverElement && popOverElement.contains(e.target as HTMLElement)) {
        clickedOnInputOrPopOver = true;

        if (inputId === 'fInputPassengers') {
            inputElement?.focus();
        }
    }
    if (inputElement && inputElement.contains(e.target as HTMLElement)) {
        clickedOnInputOrPopOver = true;
    }

    if (!clickedOnInputOrPopOver) {
        clickEvent(false);
    }
}