import React from 'react';
import { Row, Col, Form, FloatingLabel, Popover, Overlay, OverlayTrigger, Button } from 'react-bootstrap';

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

    return (
        <Row className="g-2">
            <Col md>
                {/* <FloatingLabel controlId="floatingInputGrid" label="Origin" onFocus={showDepartures} onBlur={showDepartures}> */}
                <FloatingLabel controlId="fInputOrigin" label="Origin" onClick={showDepartures}>
                    <Form.Control placeholder="origin" />
                </FloatingLabel>
            </Col>
            <Col md>
                <FloatingLabel controlId="fInputDestination" label="Destination">
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

export const Popover_Origin = (showDepartures: boolean, target: any, ref: any) => {
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
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">secondary</Button>
                        <Button variant="success">success</Button>
                        <Button variant="warning">warning</Button>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    )
}