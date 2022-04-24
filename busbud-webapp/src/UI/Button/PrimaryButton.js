import React from 'react';
import PropTypes from 'prop-types';
import s from './PrimaryButton.module.css';

// time allows I would make it similar to Material UI button i.e. configurable size, variants...
// for production app I would probably use Material UI
const PrimaryButton = ({ children, onClick }) => {
    return (
        <button
            className={s.primaryButton}
            onClick={() => {
                if (onClick) {
                    onClick();
                }
            }}
        >
            {children}
        </button>
    );
};

PrimaryButton.propTypes = {
    onClick: PropTypes.func,
};

PrimaryButton.defaultProps = {
    onClick: undefined,
};

export default PrimaryButton;
