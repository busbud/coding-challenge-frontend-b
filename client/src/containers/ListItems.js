import React, { Component } from 'react'

class ListItems extends Component {

  constructor(props){
    super(props);
    this.state = props;
  }

  render(){
    let self = this
    const listItems = this.state.items.departures.map((departure)=>
      <div className={"result"}>
        <div className={'row top-row'}>
          <div className={"col-sm-2 logo-operator-wrapper"}>
             <img className="logo-operator" src={self.state.items.operatorsIdx[departure.operator_id].logo_url} />
          </div>
          <div className={"col-sm-8"}>
            <div className={"row mid-row"}>
              <div className={"col-sm-6"}>
                <div className="middle-text">
                  {departure.departure_time}
                </div>
              </div>
              <div className={"col-sm-6"}>
                <div className="middle-text">
                  {self.state.items.locationsIdx[departure.origin_location_id].name}
                </div>
              </div>
            </div>
            <div className={"row mid-row"}>
              <div className={"col-sm-6"}>
                <div className="middle-text">
                  {departure.arrival_time}
                </div>
              </div>
              <div className={"col-sm-6"}>
                <div className="middle-text">
                  {self.state.items.locationsIdx[departure.destination_location_id].name}
                </div>
              </div>
            </div>
          </div>
          <div className={"col-sm-2"}>
            <button className={"btn btn-warning buy-button"}>
              <span className={"buy-button-from-text"}>Get it from</span>
              <span className={"buy-button-from-price"}>{departure.prices.total}</span>
            </button>
          </div>
        </div>
        {/*<div className={'row'}>*/}
          {/*<div className={"col-sm-9"}>*/}
          {/*</div>*/}
          {/*<div className={"col-sm-3"}>*/}
            {/*<input type="submit" value="Select" className={"btn btn-warning"}/>*/}
          {/*</div>*/}
        {/*</div>*/}
      </div>
    )

    return <div className={"results-list"}>
      {listItems}
    </div>

  }

}

export default ListItems