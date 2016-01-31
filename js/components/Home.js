import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import LangSelector from './LangSelector';

var Home = React.createClass({
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
    getChildrenWithStore(){
        var comp = this;
        return React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, { store: comp.props.store });
        });
    },
    render() {
        const store = this.props.store;
        var childrenWithProps = React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, {store:store});
        });

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
                <LangSelector language='FR' currentPath={this.props.location.pathname}/>
                <LangSelector language='ENG' currentPath={this.props.location.pathname}/>
                {this.getChildrenWithStore()}
            </div>
        )
    }
});

export default Home;