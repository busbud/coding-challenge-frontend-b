import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Translate, setLocale } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

const locales = ['en', 'pt', 'fr'];

const CustomNavbar = ({ locale, setLocaleConnect }) => (
  <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand>
        <Translate value="application.title" />
      </Navbar.Brand>
      <Navbar className="justify-content-end">
        <NavDropdown title={locale} id="basic-nav-dropdown">
          {locales.map(localeCode => (
            <NavDropdown.Item
              key={`navbarLocale_${localeCode}`}
              as="button"
              onClick={() => {
                setLocaleConnect(localeCode);
              }}
            >
              <Translate value={`application.languages.${localeCode}`} />
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Navbar>
    </Container>
  </Navbar>
);

CustomNavbar.propTypes = {
  locale: PropTypes.string.isRequired,
  setLocaleConnect: PropTypes.func.isRequired,
};

const localeSelector = state => state.i18n.locale;

const mapStateToPropsSelector = createStructuredSelector({
  locale: localeSelector,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setLocaleConnect: setLocale,
  }, dispatch);
}

export default connect(mapStateToPropsSelector, mapDispatchToProps)(CustomNavbar);
