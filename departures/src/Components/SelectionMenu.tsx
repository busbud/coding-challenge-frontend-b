import React, { useContext } from 'react';
import { Row, Col, Form, FloatingLabel, Popover, Overlay, Button } from 'react-bootstrap';
import { TLocation } from '../Pages/Home';

import { OnChangeSmallButtonContext } from '../Pages/Home';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSubtract, faLocationDot } from '@fortawesome/free-solid-svg-icons';

import './SelectionMenu.css';

const boldTextParams = {
    color: '#717578',
    fontWeight: 'bold'
}

export const SelectionMenu = (
    showDepartures: (event: any) => void,
    showDestinations: (event: any) => void,
    showPassengers: (event: any) => void,
    setShowDepartures: React.Dispatch<React.SetStateAction<boolean>>,
    setShowDestinations: React.Dispatch<React.SetStateAction<boolean>>,
    setShowPassengers: React.Dispatch<React.SetStateAction<boolean>>,
    OnChange_Date: (event: any) => void,
    originValue: string,
    destinationValue: string,
    dateValue: string,
    passengersValue: number
) => {

    window.addEventListener('click', (e) => {
        if (document) {
            HandlingClosePopOver(e, 'popover-contained-origin', 'fInputOrigin', setShowDepartures);
            HandlingClosePopOver(e, 'popover-contained-destination', 'fInputDestination', setShowDestinations);
            HandlingClosePopOver(e, 'popover-contained-passengers', 'fInputPassengers', setShowPassengers);
        }
    });

    const boxShadowValue = '0px 1px 4px hsl(206deg 48% 24% / 10%), 0px 6px 12px hsl(206deg 48% 24% / 10%)';

    return (
        <Row className="g-2" style={{ margin: '20px 0px 20px 0px', padding: '0px 4px 8px 4px', border: '1px solid #ced4da', borderRadius: '.25rem', backgroundColor: '#ffffff' }}>
            <Col sm={6} md={3} lg={3}>
                <FloatingLabel controlId="fInputOrigin" label="Origin" onClick={showDepartures} style={{ boxShadow: boxShadowValue }}>
                    <Form.Control placeholder="origin" value={originValue} />
                </FloatingLabel>
            </Col>
            <Col sm={6} md={3} lg={3}>
                <FloatingLabel controlId="fInputDestination" label="Destination" onClick={showDestinations} style={{ boxShadow: boxShadowValue }}>
                    <Form.Control placeholder="destination" value={destinationValue} />
                </FloatingLabel>
            </Col>
            <Col sm={4} md={2} lg={2}>
                <FloatingLabel label="Date" style={{ boxShadow: boxShadowValue }}>
                    <Form.Control type="date" name="dob" placeholder="Date of Birth" min={'2022-07-05'} onChange={OnChange_Date} value={dateValue} />
                </FloatingLabel>
            </Col>
            <Col sm={4} md={2} lg={2}>
                <FloatingLabel controlId="fInputPassengers" label="Passengers" onClick={showPassengers} style={{ boxShadow: boxShadowValue }}>
                    <Form.Control placeholder="passengers" value={passengersValue} />
                </FloatingLabel>

            </Col>
            <Col sm={4} md={2} lg={2}>
                <div className='cButton' style={{ color: 'white', fontWeight: 'bold', height: '100%', borderRadius: '.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '48px' }}>Search</div>
            </Col>
        </Row>
    )
}

export const LocationPopOver = (
    title: string,
    visible: boolean,
    listItems: Array<TLocation>,
    onChange: (item: TLocation) => void,
    target: any,
    ref: any
) => {

    return (
        <div ref={ref}>
            <Overlay
                show={visible}
                target={target}
                placement="bottom-start"
                container={ref}
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
                                    <div key={id} style={{ display: 'flex', width: '240px', height: '40px', padding: '10px 4px 10px 6px' }} onClick={() => onChange(item)}>
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

interface PassengerProps {
    title: string,
    visible: boolean,
    target: any,
    refPassengers: any
}

export const PassengersPopOver = (props: PassengerProps) => {
    const { title, visible, target, refPassengers } = props;

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
                            {SmallCard('Adults', 'adult', true)}
                            {SmallCard('Children', 'child', true)}
                            {SmallCard('Seniors', 'senior', false)}
                        </div>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    )
}

const SmallCard = (title: string, type: string, hasSaparator: boolean) => {
    const borderBottom = (hasSaparator) ? '1px solid #d1d1d1' : 'none';

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '240px', paddingBottom: '8px', borderBottom, margin: '4px 0px 4px 0px', justifyContent: 'center' }}>
            <div style={{ flexGrow: 1 }}>
                <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', height: '100%', ...boldTextParams }}>{title}</div>
            </div>
            {SmallCardButton(faSubtract, type, 'remove', true)}
            <div>
                <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>999</div>
            </div>
            {SmallCardButton(faPlus, type, 'add', true)}
        </div>
    )
}

const SmallCardButton = (icon: any, type: string, action: string, canClick: boolean) => {
    const buttonSize = '32px';
    const iconSize = '16px';

    const backgroundColor = '#def7fb';

    const onChange = useContext(OnChangeSmallButtonContext) as ((type: string, action: string) => void);

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
        inputElement?.focus();
    }
    if (inputElement && inputElement.contains(e.target as HTMLElement)) {
        clickedOnInputOrPopOver = true;
    }

    if (!clickedOnInputOrPopOver) {
        clickEvent(false);
    }
}