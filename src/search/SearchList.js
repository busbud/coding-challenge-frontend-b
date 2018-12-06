import React from 'react';
import PropTypes from 'prop-types';

import classes from './searchList.less';

function SearchList({results}) {
  return (
    <div className={classes.searchContainer}>
      {results.map(({id, originLocName, price, destLocName, arrivalTime, departureTime, currency}) => {
        return (
          <div key={id} className={classes.item}>
            <div className={classes.location}>
              <div className={classes.detail}>
                <div className={classes.departureTimeDetail}>{departureTime}</div>
                <div>{originLocName}</div>
              </div>
              <div className={classes.detail}>
                <div className={classes.arrivalTimeDetail}>{arrivalTime}</div>
                <div>{destLocName}</div>
              </div>
            </div>
            <div className={classes.priceContainer}>
              <div className={classes.currency}>{currency}</div>
              <div className={classes.price}>{price}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

SearchList.propTypes = {
  results: PropTypes.array,
  i18n: PropTypes.object
};


export default SearchList;
