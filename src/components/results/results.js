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
        this.props.initDepartureRequest()
    }
    
    render(){
        return(
            <Row className="results">
                <Col mdOffset={1} md={10}>
                    {
                        this.props.departures.departures.map(
                            (departure,key)=> (
                                <Panel key={key}>
                                    <Row>
                                        <Col xs={6} sm={2} md={2}>
                                            <Logo operators={this.props.operators.operators} operatorId={departure.operator_id}></Logo>
                                        </Col>
                                        <Col  xs={6} sm={2} smPush={8} md={3} mdPush={6}>
                                            <Price price={departure.prices.total}></Price>
                                        </Col>
                                        <Col  xs={12} sm={8} smPull={2} md={6} mdPull={3} mdOffset={1} >
                                            <TimeTable departure={departure} locations={this.props.cities.locations}></TimeTable>
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