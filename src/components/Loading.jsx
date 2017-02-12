import React from 'react';

export function Loading(props) {
  return (
    <span className={props.show ? 'loading' : ''} />
  );
}

Loading.propTypes = {
  show: React.PropTypes.bool.isRequired,
};
