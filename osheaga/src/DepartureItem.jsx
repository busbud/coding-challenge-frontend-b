import React, {Component} from 'react';

class DepartureItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    //this.handleClick = this.handleClick.bind(this);
  }

  getTimeFormat = time => {
    let dateTimeArray = time.split('T')
    let timeFormat = dateTimeArray[1].split(':');
    let resultTime;

    if (timeFormat[0] === '00'){
      resultTime = `12:${timeFormat[1]} am`
    } else if (timeFormat[0] < 12) {
      resultTime = `${parseInt(timeFormat[0])}:${timeFormat[1]} am`
    } else if (timeFormat[0] === '12'){
      resultTime = `12:${timeFormat[1]} pm`
    } else {
      resultTime = `${(timeFormat[0] - 12)}:${timeFormat[1]} pm`
    }
    return resultTime;
  }

  getMoneyFormat = num => {
    return parseFloat(Math.round(num) / 100).toFixed(2);

  }

  render() {
    return (
      <div className="busRoute">
        <div className="priceDiv">
          <p className="price">${this.getMoneyFormat(this.props.priceTotal)}</p>
        </div>

        <div className="departInfo">
          <p>Leave from {this.props.locName} at </p><p className="departTime">{this.getTimeFormat(this.props.depTime)}</p>
        </div>
        <div className="arriveInfo">
          <p>Arrive in {this.props.destination} at </p><p className="arriveTime">{this.getTimeFormat(this.props.arrTime)}</p>
        </div>
      </div>
    );
  }
}
export default DepartureItem;
