import React, { Component } from 'react'

class ListItems extends Component {

  constructor(props){
    super(props);
    this.state = props;
  }

  render(){
    const listItems = this.state.items.departures.map((departure)=>
      <div className={"result"}>
        <div className={'row'}>
          <div className={"col-sm-3"}>
             {departure.operator_id}
          </div>
          <div className={"col-sm-6"}>
            <div className={"row"}>
              <div className={"col-sm-6"}>{departure.departure_time}</div>
              <div className={"col-sm-6"}>{departure.origin_location_id}</div>
            </div>
            <div className={"row"}>
              <div className={"col-sm-6"}>{departure.arrival_time}</div>
              <div className={"col-sm-6"}>{departure.destination_location_id}</div>
            </div>
          </div>
          <div className={"col-sm-3"}>
            {departure.prices.total}
          </div>
        </div>
        <div className={'row'}>
          <div className={"col-sm-9"}>
          </div>
          <div className={"col-sm-3"}>
            <input type="submit" value="Select" className={"btn btn-warning"}/>
          </div>
        </div>
      </div>
    )

    return <div className={"results-list"}>
      {listItems}
    </div>

  }

}

export default ListItems