import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getDepartures} from '../actions'
import {
    ListGroup,
    ListGroupItem
} from 'react-bootstrap'


class Departures extends Component{
    componentDidMount(){
        this.props.getDepartures('dr5reg','f25dvk','2017-12-12')
    }
    
    render(){
        return(
            <ListGroup>
                {
                    this.props.departures.departures.map(
                        (departure,key)=> (
                            <ListGroupItem key={key}>{departure.departure_time}</ListGroupItem>
                        )
                    )
                }
               
            </ListGroup>
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
      getDepartures
    }
  )(Departures)