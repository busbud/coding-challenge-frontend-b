import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navbar, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class LangSelect extends React.Component {
  constructor (props) {
    super(props);

    this.langs = {
      'en-ca' : 'English (Canada)',
      'fr-ca' : 'Français (Canada)'
    };
  }

  render () {
    let lang = this.props.match.params.lang;
    return (
      <Navbar>
        <Nav navbar>
          <UncontrolledDropdown nav>
           <DropdownToggle nav caret>
             {this.langs[lang]}
           </DropdownToggle>
           <DropdownMenu>
             {Object.entries(this.langs).map(([key, name]) => (
               <DropdownItem key={key} onClick={() => this.props.changeLanguage(key)}>
                 {name}
               </DropdownItem>
             ))}
           </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    );
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changeLanguage: (lang) => push(`/${lang}`)
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(LangSelect);
