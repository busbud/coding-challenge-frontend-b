import React, { Component } from 'react';
import '../stylesheets/Ticket.css';

class Ticket extends Component {
  render() {
    const priceStr = this.props.price.toString();
    const dollar = priceStr.substring(0,priceStr.length - 2);
    const cent = priceStr.substring(priceStr.length - 2);

    return (
      <div className="row ticket">
        <div className="col-lg-2 ticket-section">
          <p>{this.props.depTime}</p>
          <p>{this.props.arrTime}</p>
        </div>
        <div className="col-lg-8 ticket-section ticket-locations">
          <p>{this.props.from}</p>
          <i className="glyphicon glyphicon-arrow-down"></i>
          <p>{this.props.to}</p>
        </div>
        <div className="col-lg-2 ticket-section">
          <p>${dollar}.{cent} USD</p>
        </div>
      </div>
    );
  }
}

export default Ticket;
