import React,{Component} from 'react'
import {connect} from 'react-redux'
import { initDepartureRequest} from '../../actions'
import {
    Panel,
    Row,
    Col
} from 'react-bootstrap'

import Logo from './logo'
import TimeTable from './timetable'
import Price from './price'


class Results extends Component{
    componentDidMount(){
        this.props.initDepartureRequest('dr5reg','f25dvk','2017-12-12')
    }
    
    render(){
        return(
            <Row className="show-grid">
                <Col mdOffset={1} md={10}>
                    {
                        this.props.departures.departures.map(
                            (departure,key)=> (
                                <Panel key={key}>
                                    <Row>
                                        <Col md={2}>
                                            <Logo operators={this.props.operators.operators} operatorId={departure.operator_id}></Logo>
                                        </Col>
                                        <Col mdOffset={1} md={6}>
                                            <TimeTable departure={departure} locations={this.props.cities.locations}></TimeTable>
                                        </Col>
                                        <Col md={3}>
                                            <Price price={departure.prices.total}></Price>
                                        </Col>
                                    </Row>
                                </Panel>
                            )
                        )
                    }
                </Col>
            </Row>
        )
    }
}

export default connect(
    (state) => ({
        departures : state.departures,
        operators : state.operators,
        cities : state.cities
    }),
    {
        initDepartureRequest
    }
  )(Results)