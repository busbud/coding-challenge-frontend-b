import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translation } from '../languages/translation';

export class Amenities extends Component {
    render() {
        let list = [];
        if (this.props.departure.amenities.ac) {
            list.push(
                <li key="ac">
                    <FontAwesomeIcon icon="check" />
                    {Translation.amenities.ac}
                </li>
            );
        }
        if (this.props.departure.amenities.wifi) {
            list.push(
                <li key="wifi">
                    <FontAwesomeIcon icon="check" />
                    {Translation.amenities.wifi}
                </li>
            );
        }
        if (this.props.departure.amenities.tv) {
            list.push(
                <li key="tv">
                    <FontAwesomeIcon icon="check" />
                    {Translation.amenities.tv}
                </li>
            );
        }
        if (this.props.departure.amenities.average_seat) {
            list.push(
                <li key="check">
                    <FontAwesomeIcon icon="check" />
                    {Translation.amenities.averageSeat}
                </li>
            );
        }
        if (this.props.departure.amenities.toilet) {
            list.push(
                <li key="toilet">
                    <FontAwesomeIcon icon="check" />
                    {Translation.amenities.toilet}
                </li>
            );
        }
        if (this.props.departure.amenities.food) {
            list.push(
                <li key="food">
                    <FontAwesomeIcon icon="check" />
                    {Translation.amenities.food}
                </li>
            );
        }
        if (this.props.departure.amenities.hot_meal) {
            list.push(
                <li key="hot_meal">
                    <FontAwesomeIcon icon="check" />
                    {Translation.amenities.hotMeal}
                </li>
            );
        }
        if (this.props.departure.amenities.leg_room) {
            list.push(
                <li key="leg_room">
                    <FontAwesomeIcon icon="check" />
                    {Translation.amenities.legRoom}
                </li>
            );
        }
        if (this.props.departure.amenities.power_outlet) {
            list.push(
                <li key="power_outlet">
                    <FontAwesomeIcon icon="check" />
                    {Translation.amenities.powerOutlet}
                </li>
            );
        }
        return (
            <ul>
                <li className="details-header">
                    {Translation.amenities.amenities}
                </li>
                {list}
            </ul>
        );
    }
}
