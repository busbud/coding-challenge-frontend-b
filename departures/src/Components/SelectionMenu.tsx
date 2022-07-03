import React from 'react';
import { Row, Col, Form, FloatingLabel, Popover, Overlay, OverlayTrigger, Button } from 'react-bootstrap';
import { TLocation } from '../Pages/Home';

export const SelectionMenu = (
    showDepartures: (event: any) => void,
    setShowDepartures: React.Dispatch<React.SetStateAction<boolean>>
) => {

    window.addEventListener('click', (e) => {
        if (document) {
            const popOverElement = document.getElementById('popover-contained');
            const inputElement = document.getElementById('fInputOrigin');
            let clickedOnInputOrPopOver = false;

            if (popOverElement && popOverElement.contains(e.target as HTMLElement)) {
                clickedOnInputOrPopOver = true;
                inputElement?.focus();
            }
            if (inputElement && inputElement.contains(e.target as HTMLElement)) {
                clickedOnInputOrPopOver = true;
            }

            if (!clickedOnInputOrPopOver) {
                setShowDepartures(false);
            }
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
                <FloatingLabel controlId="fInputDestination" label="Destination" style={{ boxShadow: boxShadowValue }}>
                    <Form.Control placeholder="destination" />
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

export const Popover_Origin = (showDepartures: boolean, originList: Array<TLocation>, target: any, ref: any) => {

    return (
        <div ref={ref}>
            <Overlay
                show={showDepartures}
                target={target}
                placement="bottom-start"
                container={ref}
                containerPadding={20}
                transition={true}
            >
                <Popover id="popover-contained">
                    <Popover.Header as="h3">Origin</Popover.Header>
                    <Popover.Body>
                        <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                            {originList.map(origin => {
                                const { id, city, state } = origin;

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