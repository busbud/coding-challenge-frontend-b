var React = require('react');
var Card =require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardText = require('material-ui/lib/card/card-text');
var CardActions = require('material-ui/lib/card/card-actions');
var FlatButton = require('material-ui/lib/flat-button');
var DeviceNetworkWifi = require('material-ui/lib/svg-icons/device/network-wifi');
var NavigationArrowDownward = require('material-ui/lib/svg-icons/navigation/arrow-downward');
var IconButton =require('material-ui/lib/icon-button');
var NotificationPower = require('material-ui/lib/svg-icons/notification/power');
var NotificationLiveTV = require('material-ui/lib/svg-icons/notification/live-tv');
var NotificationSeatLegroomExtra = require('material-ui/lib/svg-icons/notification/airline-seat-legroom-extra');
var NotificationWC = require('material-ui/lib/svg-icons/notification/wc');
var Translate = require('react-translate-component');
require('./Departure.less');

var Departure = React.createClass({
  render: function() {
    return (
      <div className="departureContainer">
        <Card>
          <CardHeader
            showExpandableButton={true}
            actAsExpander={true}
            style={ { padding: "8px", height: "122px" } }
            children={
              <div className="card">
                <div className="cardLocations">
                  <div className="cardFrom">
                    <p>{this.props.data.departureTime}&nbsp;&nbsp;&nbsp;{this.props.data.originName}</p>
                    <p>{this.props.data.originCity}</p>
                  </div>
                  <NavigationArrowDownward />
                  <div className="cardTo">
                    <p>{this.props.data.arrivalTime}&nbsp;&nbsp;&nbsp;{this.props.data.destinationName}</p>
                    <p>{this.props.data.destinationCity}</p>
                  </div>
                </div>
                <div className="cardPrice">
                  <h1>{this.props.data.price}</h1>
                </div>
              </div>
            }
          />
          <CardText
            expandable={true}
            style={{
              "padding-left": "6px",
              "padding-right": "2px",
              "padding-top": "2px",
              "padding-bottom": "2px",
              height: "24px"
            }}
            children={
              <span>
                <IconButton
                  tooltip={<Translate
                    content="tooltip.wifi"
                  />}
                  tooltipPosition="top-center"
                  style={{
                    padding: "0",
                    width: "24px",
                    height: "24px"
                  }}>
                  <DeviceNetworkWifi color={this.props.data.wifiColor} />
                </IconButton>
                <IconButton
                  tooltip={<Translate
                    content="tooltip.power"
                  />}
                  tooltipPosition="top-center"
                  style={{
                    padding: "0",
                    width: "24px",
                    height: "24px"
                  }}>
                  <NotificationPower color={this.props.data.powerColor} />
                </IconButton>
                <IconButton
                  tooltip={<Translate
                    content="tooltip.tv"
                  />}
                  tooltipPosition="top-center"
                  style={{
                    padding: "0",
                    width: "24px",
                    height: "24px"
                  }}>
                  <NotificationLiveTV color={this.props.data.tvColor} />
                </IconButton>
                <IconButton
                  tooltip={<Translate
                    content="tooltip.legroom"
                  />}
                  tooltipPosition="top-center"
                  style={{
                    padding: "0",
                    width: "24px",
                    height: "24px"
                  }}>
                  <NotificationSeatLegroomExtra color={this.props.data.legroomColor} />
                </IconButton>
                <IconButton
                  tooltip={<Translate
                    content="tooltip.toilet"
                  />}
                  tooltipPosition="top-center"
                  style={{
                    padding: "0",
                    width: "24px",
                    height: "24px"
                  }}>
                  <NotificationWC color={this.props.data.toiletColor} />
                </IconButton>
              </span>
            }>
          </CardText>
        </Card>
      </div>
    );
  }
});

module.exports = Departure;
