import React, { Component } from 'react';

class Results extends Component {
    render() {
        let departures = this.props.departures;
        departures.sort((a,b) => a.departure_time > b.departure_time);

        return (
            <div className="results">
                {departures.map((d, i) => {
                    let dep = new Date(d.departure_time);
                    let arr = new Date(d.arrival_time);
                    return(
                        <div className="result" key={i}>
                            <div>
                                <div className="departure">
                                    <div className="departure_time">
                                        {new Date(dep.valueOf() + dep.getTimezoneOffset() * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </div>
                                    <div className="location">
                                        {d.origin}
                                    </div>
                                </div>
                                <div className="arrival">
                                    <div className="arrival_time">
                                        {new Date(arr.valueOf() + arr.getTimezoneOffset() * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </div>
                                    <div className="location">
                                        {d.destination}
                                    </div>
                                </div>
                            </div>
                            <div className="price">
                                {d.price}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Results;
