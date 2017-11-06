import React,{Component} from 'react'
import {connect} from 'react-redux'
import {changeLocale} from '../../actions'
import {
    Navbar,
    Nav,
    NavDropdown,
    MenuItem
} from 'react-bootstrap'
import { getTranslate } from 'react-localize-redux';


class NavBar extends Component{

    handleLangClick = (lang) => {
        this.props.changeLocale(lang)
    }
    
    render(){
        return(
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Busbud Challenge</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    <NavDropdown eventKey={3} title={this.props.translate('selectLanguage')} id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1} onClick={() => this.handleLangClick('en')}>English</MenuItem>
                        <MenuItem eventKey={3.2} onClick={() => this.handleLangClick('fr')}>Français</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        )
    }
}

export default connect(
    (state) => ({
       
        translate: getTranslate(state.locale),
    }),
    {
        changeLocale
    }
  )(NavBar)