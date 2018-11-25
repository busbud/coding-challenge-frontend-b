import React from 'react';
import { withNamespaces } from "react-i18next";
import Button from '@material-ui/core/Button';
import './LanguageSwitcher.scss';

const LanguageSwitcher = props => {
    const changeLanguage = (language) => {
        props.i18n.changeLanguage(language);
    };

    return (
        <div className='language-buttons'>
            <Button color="secondary" onClick={() => changeLanguage('en')}>
                {props.t('language.english')}
            </Button>
            <Button color="secondary" onClick={() => changeLanguage('fr')}>
                {props.t('language.french')}
            </Button>
        </div>
    )
};

export default withNamespaces('translation')(LanguageSwitcher);