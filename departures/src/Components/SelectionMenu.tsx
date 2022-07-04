import React from 'react';
import { Row, Col, Form, FloatingLabel, Popover, Overlay, Button } from 'react-bootstrap';
import { TLocation } from '../Pages/Home';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons';

export const SelectionMenu = (
    showDepartures: (event: any) => void,
    showDestinations: (event: any) => void,
    showPassengers: (event: any) => void,
    setShowDepartures: React.Dispatch<React.SetStateAction<boolean>>,
    setShowDestinations: React.Dispatch<React.SetStateAction<boolean>>,
    setShowPassengers: React.Dispatch<React.SetStateAction<boolean>>,
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
        <Row className="g-2" style={{ margin: '20px 0px 20px 0px' }}>
            <Col md>
                {/* <FloatingLabel controlId="floatingInputGrid" label="Origin" onFocus={showDepartures} onBlur={showDepartures}> */}
                <FloatingLabel controlId="fInputOrigin" label="Origin" onClick={showDepartures} style={{ boxShadow: boxShadowValue }}>
                    <Form.Control placeholder="origin" />
                </FloatingLabel>
            </Col>
            <Col md>
                <FloatingLabel controlId="fInputDestination" label="Destination" onClick={showDestinations} style={{ boxShadow: boxShadowValue }}>
                    <Form.Control placeholder="destination" />
                </FloatingLabel>
            </Col>
            <Col md>
                <FloatingLabel controlId="fInputPassengers" label="Passengers" onClick={showPassengers} style={{ boxShadow: boxShadowValue }}>
                    <Form.Control placeholder="passengers" />
                </FloatingLabel>
            </Col>
            {/* <Col md>
                    <FloatingLabel controlId="floatingSelectGrid" label="Works with selects">
                        <Form.Select aria-label="Floating label select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col> */}
        </Row>
    )
}

export const LocationPopOver = (
    title: string,
    visible: boolean,
    listItems: Array<TLocation>,
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

                                const displayName = `${city}, ${state}`;

                                return <Button key={id} variant="outline-secondary" style={{ width: '240px' }}>{displayName}</Button>
                                // return <Button key={id} variant="outline-secondary" style={{ width: '240px', border: 'none' }}>{displayName}</Button>
                            })}
                        </div>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    )
}

export const PassengersPopOver = (
    title: string,
    visible: boolean,
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
                    <Popover.Body>
                        <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                            {SmallCard('Adults', true)}
                            {SmallCard('Children', true)}
                            {SmallCard('Seniors', false)}

                        </div>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    )
}

const SmallCard = (title: string, hasSaparator: boolean) => {
    const borderBottom = (hasSaparator) ? '1px solid #d1d1d1' : 'none';


    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '240px', paddingBottom: '8px', borderBottom, margin: '4px 0px 4px 0px', justifyContent: 'center' }}>
            <div style={{ flexGrow: 1 }}>
                <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>{title}</div>
            </div>
            {SmallCardButton(faSubtract, false, () => { })}
            <div>
                <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>999</div>
            </div>
            {SmallCardButton(faPlus, true, () => { })}
        </div>
    )
}

const SmallCardButton = (icon: any, canClick: boolean, onClick: () => void) => {
    const buttonSize = '32px';
    const iconSize = '16px';

    const backgroundColor = '#def7fb';

    return (
        <Button style={{ width: buttonSize, height: buttonSize, margin: '0px 6px 0px 6px', backgroundColor, border: 'none' }} onClick={onClick} disabled={!canClick}>
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