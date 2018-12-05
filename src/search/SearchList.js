import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const timeDetail = {
  marginRight: 16,
  flexShrink: 0
};

const styles = {
  searchContainer: {
    marginTop: 150
  },
  item: {
    marginBottom: 8,
    padding: 16,
    border: 'none',
    boxShadow: '0 1px 3px 0 rgba(0,0,0,.24)',
    display: 'flex',
    flexDirection: 'row'
  },
  location: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 350
  },
  time: {
    display: 'flex',
    flexDirection: 'column'
  },
  priceContainer: {
    fontWeight: 'bold',
    display: 'flex',
    color: '#f19020',
    flex: 1,
    justifyContent: 'flex-end'
  },
  detail: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  departureTimeDetail: {
    ...timeDetail,
    color: '#127ccb'
  },
  arrivalTimeDetail: {
    ...timeDetail,
    color: 'rgba(32,37,43,.35)'
  },
  currency: {
    marginRight: 4
  }
};

function SearchList({results, classes}) {
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
  classes: PropTypes.object,
  results: PropTypes.array,
  i18n: PropTypes.object
};


export default injectSheet(styles)((SearchList));
