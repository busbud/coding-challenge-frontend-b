// thired part libraries
import React from 'react';
import styled from 'styled-components'

const Header = styled.header`
  width: 100%;
  border-bottom: 1px solid #cccccc;
  cursor: pointer;
  background-color: #2394FE;
`

const Nav = styled.nav`
  width: 80%;
  display: flex;
  justify-content: flex-start;
`

const Brand = styled.a`
  color: #ffffff;
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
  outline: none;
  padding: 14px 16px;
`

const DropdownButton = styled.button`
  cursor: pointer;
  font-size: 1rem;  
  border: none;
  outline: none;
  color: #ffffff;
  padding: 20px 16px;
  background-color: inherit;
`

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

  > a {
    color: #000000;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
  }
`

const DropdownContainer = styled.div`
  :hover {
      background-color: #26ADFE;

    ${DropdownContent} {
      display: block;
    }
  }
`

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