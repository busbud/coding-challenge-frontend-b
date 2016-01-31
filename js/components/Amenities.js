import React from 'react';

var Amenities = React.createClass({
    render() {
        let amenities = this.props.amenities;
        return (
            <span className="ticket_item_amenities">
                {amenities.ac ? <i className="material-icons">ac_unit</i> : ''}
                {amenities.wifi ? <i className="material-icons">wifi</i> : ''}
                {amenities.toilet ? <i className="material-icons">wc</i> : ''}
                {amenities.power_outlets ? <i className="material-icons">power</i> : ''}
                {amenities.tv ? <i className="material-icons">tv</i> : ''}
                {amenities.refreshment ? <i className="material-icons">local_bar</i> : ''}
                {amenities.refreshment ? <i className="material-icons">restaurant_menu</i> : ''}
            </span>
        )
    }
});

export default Amenities;