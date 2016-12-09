import React from 'react';
import Translate from 'react-translate-component';

const Amenities = React.createClass({
  render: function() {
    return (
    <div>
      {this.props.amenities.wifi &&
        <span> 
          <span id='wifi' className="material-icons" title='WiFi'>wifi</span>
        </span>
      }
      {this.props.amenities.ac &&
        <span>          
          <span id='ac' className="material-icons" title={Translate.translate('Amenities.ac')}>ac_unit</span>
        </span>        
      }
      {this.props.amenities.toilet &&
        <span>          
          <span id='wc' className="material-icons" title='Toilet'>wc</span>
        </span>        
      }
      {this.props.amenities.power_outlets &&
        <span>          
          <span id='refreshments' className="material-icons" title='Power outlets'>power</span>
        </span>        
      }
      {this.props.amenities.bus_attendant &&
        <span>          
          <span id='attendant' className="material-icons" title='Bus attendant'>room_service</span>
        </span>        
      }
      {this.props.amenities.tv &&
        <span>          
          <span id='tv' className="material-icons" title='TV'>tv</span>
        </span>        
      }
      {this.props.amenities.food &&
        <span>          
          <span id='food' className="material-icons" title='Food'>restaurant</span>
        </span>        
      }
      {this.props.amenities.refreshments &&
        <span>          
          <span id='refreshments' className="material-icons" title='Refreshments'>local_drinks</span>
        </span>        
      }
    </div>
    );
  }
});

export default Amenities;