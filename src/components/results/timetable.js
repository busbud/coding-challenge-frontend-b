import React from 'react'
import {format, distanceInWords} from 'date-fns'
import {
    Table,
    Glyphicon
} from 'react-bootstrap'

const formatTime = (date) => {
    return format(new Date(date),'hh:mm A')
}

const getTravelTime = (departureTime,arrivalTime) => {
    const departureDate = new Date(departureTime)
    const arrivalDate = new Date(arrivalTime)

    return distanceInWords(arrivalDate,departureDate)
}

const getLocation = (locationId,locations) => {
   
    const location = locations.filter( location => {
      
       return location.id === locationId
   })

  
   return location[0].name
}

const TimeTable = (props) => {
    
    return (
        <Table>
            <tbody>
                <tr>
                    <td><strong>{formatTime(props.departure.departure_time)}</strong></td>
                    <td>{getLocation(props.departure.origin_location_id,props.locations)}</td>
                    
                </tr>
                <tr>
                    <td>{formatTime(props.departure.arrival_time)}</td>
                    <td>{getLocation(props.departure.destination_location_id,props.locations)}</td>
                    
                </tr>
                <tr>
                    <td><Glyphicon glyph="time" />{'  '} {getTravelTime(props.departure.departure_time,props.departure.arrival_time)}</td>
                    <td></td>
                </tr>
            </tbody>
        </Table>
    )
}



export default TimeTable

