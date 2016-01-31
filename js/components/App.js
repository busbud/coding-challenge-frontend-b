import React from 'react';
import store from './reducer';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

var App = React.createClass({
    getInitialState(){
        return {
            open:false
        }
    },
    handleToggle() {
        this.setState({open: !this.state.open});
    },
    handleClose() {
        this.setState({open: false});
    },
    getChildrenWithProps(){
        var comp = this;
        return React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, { store: store });
        });
    },
    render() {
        return (
            <div>
                <div className="header">
                    <IconButton
                        iconClassName="material-icons"
                        tooltip="Change Language"
                        tooltipPosition="bottom-right"
                        touch={true}
                        onTouchTap={this.handleToggle}
                    >
                        language
                    </IconButton>
                    <LeftNav
                        className='lang-bar'
                        docked={false}
                        width={100}
                        open={this.state.open}
                        onRequestChange={open => this.setState({open})}
                    >
                        <MenuItem onTouchTap={this.handleClose}>
                            <IconButton iconClassName="material-icons" onTouchTap={this.handleToggle}>close</IconButton>
                        </MenuItem>
                        <MenuItem onTouchTap={this.handleClose}>English</MenuItem>
                        <MenuItem onTouchTap={this.handleClose}>French</MenuItem>
                    </LeftNav>
                    <div className="header_igloo-logo"><img src="http://igloofest.ca/public/app/uploads/images/5661d13eecfee.png" alt="igloofest logo"/></div>
                    <div className="header_busbud-logo"><img src="https://busbud-pubweb-assets.global.ssl.fastly.net/images/logos/fc7ed21.logo-post-60@2x.png" alt="busbud logo"/></div>
                    <h1 className="header_title">Busbud front-end coding challenge</h1>
                </div>
                {this.getChildrenWithProps()}
            </div>
        )
    }
});

export default App;