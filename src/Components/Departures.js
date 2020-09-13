import React, { Component } from "react";
import ResultBox from './ResultBox';

const Departures = props => {
    return (
        <div className="roadToOsheaga-coachella--results-container">
            {
                props
                    .departures
                    .sort(
                        (itemA, itemB) => (
                            itemA.departure_time > itemB.departure_time ? 1 : -1
                        )
                    ).map(
                        (item) => (
                            <ResultBox
                                key={item.id}
                                item={item}
                                locations={props.locations}
                                cheapestItem={
                                    Math.min( ...props.departures.map((item) => (item.prices.total)) )
                                }
                            />
                        )
                )
            }
        </div>
    )
}

export default Departures;