import React,{Component} from 'react'
import {connect} from 'react-redux'
import { initDepartureRequest, updateSearchDate} from '../actions'
import {
    Row,
    Col,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Button
} from 'react-bootstrap'
import { getTranslate } from 'react-localize-redux';

class SearchForm extends Component{
    
    handleDateChange = (e) => {
        const newDate = e.target.value
        this.props.updateSearchDate(newDate)

    }

    handleSubmit = (e) =>{
        console.log('Form Submitted');
        e.preventDefault()
        this.props.initDepartureRequest()
    }
    
    render(){
        return(
            <Row>
                <Col xs={6} sm={3} md={3}  mdOffset={1}>
                    <h2 className="city-name">
                        <span>{this.props.translate('from')}:</span>
                        New York
                    </h2>
                </Col>
                <Col  xs={6} sm={3} smPush={6} md={3} mdPush={4} >
                    <h2 className="city-name">
                        <span>{this.props.translate('to')}:</span>
                        Montreal
                    </h2>
                </Col>
                <Col xs={12} sm={5} smPull={3} smOffset={1} md={4} mdOffset={0} mdPull={3} >
                    <h2 className="city-name">
                        <span>{this.props.translate('departureDate')}:</span>
                    </h2>
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormGroup controlId="formInlineEmail">
                            <FormControl type="date" placeholder="Date" onChange={this.handleDateChange} value={this.props.searchInputs.outboundDate}/>
                        </FormGroup>
                        <Button type="submit">{this.props.translate('search')}</Button>
                    </Form>
                </Col>
                
            </Row>
            
        )
    }
}

export default connect(
    (state) => ({
       searchInputs : state.searchInputs,
       translate: getTranslate(state.locale),
    }),
    {
        initDepartureRequest,
        updateSearchDate
    }
  )(SearchForm)