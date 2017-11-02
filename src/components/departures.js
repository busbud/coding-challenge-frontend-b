import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getDepartures} from '../actions'
import {
    ListGroup,
    ListGroupItem
} from 'react-bootstrap'


class Departures extends Component{
    componentDidMount(){
        this.props.getDepartures('dr5reg','f25dvk','2018-08-02')
    }
    
    render(){
        return(
            <ListGroup>
                {
                    this.props.departures.departures.map(
                        departure => (
                            <ListGroupItem>{departure.id}</ListGroupItem>
                        )
                    )
                }
               
            </ListGroup>
        )
    }
}

export default connect(
    (state) => ({
        departures : state.departures
    }),
    {
      getDepartures
    }
  )(Departures)