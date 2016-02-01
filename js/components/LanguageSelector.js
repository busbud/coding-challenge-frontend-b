import React from 'react';
import {Link} from 'react-router';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';


var LanguageSelector = React.createClass({
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
    getLangNewPath(lang){
        const subpath = this.props.currentPath.split('/').slice(2).join('/');
        return `/${lang}/${subpath}`;
    },
    render() {
        return (
            <div className="lang-bar">
                <IconButton
                    iconClassName="material-icons"
                    tooltipPosition="bottom-right"
                    onTouchTap={this.handleToggle}
                    iconStyle={{color:'LightSkyBlue'}}
                >
                    language
                </IconButton>
                <LeftNav
                    className='lang-bar_menu'
                    docked={false}
                    width={100}
                    open={this.state.open}
                    onRequestChange={open => this.setState({open})}
                >
                    <MenuItem onTouchTap={this.handleClose}>
                        <IconButton iconClassName="material-icons" onTouchTap={this.handleToggle}>close</IconButton>
                    </MenuItem>
                    <MenuItem onTouchTap={this.handleClose}><Link to={this.getLangNewPath('en')}>English</Link></MenuItem>
                    <MenuItem onTouchTap={this.handleClose}><Link to={this.getLangNewPath('fr')}>French</Link></MenuItem>
                </LeftNav>
            </div>

        )
    }
});

export default LanguageSelector;