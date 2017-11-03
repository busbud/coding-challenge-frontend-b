import React,{Component} from 'react'
import {connect} from 'react-redux'
import { initDepartureRequest} from '../actions'
import {
    Row,
    Col,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Button
} from 'react-bootstrap'


class SearchForm extends Component{
    
    
    render(){
        return(
            
            <Row className="show-grid">
                <Col mdOffset={1} md={10}>
                    <Form inline>
                        <FormGroup controlId="formInlineName">
                            <FormControl type="text" placeholder="Origin" value="New York" disabled/>
                        </FormGroup>
                        <FormGroup controlId="formInlineEmail">
                            <FormControl type="email" placeholder="Destination" value="Montreal" disabled/>
                        </FormGroup>
                        <FormGroup controlId="formInlineEmail">
                            <FormControl type="email" placeholder="Date" />
                        </FormGroup>
                        <Button type="submit">Search</Button>
                    </Form>
                </Col>
            </Row>
            
        )
    }
}

export default connect(
    (state) => ({
       
    }),
    {
        initDepartureRequest
    }
  )(SearchForm)