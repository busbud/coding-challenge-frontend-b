import React from 'react';

function CtaButton({ handleClick, text }) {
  return (
    <button className="cta-button" onClick={handleClick}>{text}</button>
  );
}
CtaButton.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired,
};

export default CtaButton;
