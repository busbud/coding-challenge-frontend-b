import React, {Component} from 'react';
import DepartureItem from './DepartureItem.jsx'

class Results extends Component {


getLocationName = (id) => {
  let locName = '';
  this.props.locations.forEach(location => {
    if (location.id === id) {
      locName = location.name;
    }
  })
  return locName;
}

getDateFormat = date => {
  let dateArray = date.split('-')
  let monthNum = parseInt(dateArray[1]);
  let dayNum = parseInt(dateArray[2])
  let month;
  let dayEnd = 'th'

  if (monthNum === 8 ){
    month = 'August'
  } else if (monthNum === 9){
    month = 'September'
  } else if (monthNum === 10){
    month = 'October'
  } else if (monthNum === 11){
    month = 'November'
  } else if (monthNum === 12){
    month = 'December'
  }

  if (dayNum === 1 || dayNum === 21 || dayNum === 31) {
    dayEnd = 'st'
  } else if (dayNum === 2 || dayNum === 22){
    dayEnd = 'nd'
  } else if (dayNum === 3 || dayNum === 23) {
    dayEnd = 'rd'
  }

  let dateFormat = `${month} ${dayNum}${dayEnd}`;
  return dateFormat;
}

render() {
  const resultList = this.props.departures.map((dest) =>
    <DepartureItem
      key={dest.key}
      locName = {this.getLocationName(dest.origin_location_id)}
      depTime = {dest.departure_time}
      arrTime = {dest.arrival_time}
      priceTotal = {dest.prices.total}
      destination = {this.props.destination}/>);

    if (resultList.length >= 1) {
      return (
        <div className="ResultsWindom">
          <p className="resultsBanner">Showing {resultList.length} Results</p>
          {resultList}
        </div>
      );
    } else {
      return (
      <div>{this.props.display}</div>
      );
    }


  }
}
export default Results;
