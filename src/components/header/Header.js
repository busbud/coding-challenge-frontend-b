import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import withI18n from '../../contexts/withI18n';

const Header = props => {

    const handleChangeLanguage = lang => props.i18n.changeLanguage(lang);

    return (
        <div className="lang">
            <div className="lang">
                <div onClick={() => handleChangeLanguage('en')}>🇬🇧</div>
                <div onClick={() => handleChangeLanguage('fr')}>🇫🇷</div>
            </div>
        </div>
    )
}

Header.propTypes = {
    i18n: PropTypes.shape({
        changeLanguage: PropTypes.func
    }).isRequired
}

export const header = Header;
export default withI18n(Header);