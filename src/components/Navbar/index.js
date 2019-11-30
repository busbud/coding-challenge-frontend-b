// thired part libraries
import React from 'react';

// styles
import {
  Header,
  Nav,
  Brand,
  DropdownButton,
  DropdownContent,
  DropdownContainer
}
  from './styled'

const NavBar = () => (
  <Header>
    <Nav>
      <Brand href="/">
        Busbud
      </Brand>
      <DropdownContainer>
        <DropdownButton>English
          <i className="fa fa-caret-down"></i>
        </DropdownButton>
        <DropdownContent>
          <a href="#">French</a>
        </DropdownContent>
      </DropdownContainer>
    </Nav>
  </Header>
)

export default NavBar;
