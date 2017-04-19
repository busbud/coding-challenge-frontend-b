import React, { PropTypes } from 'react';
import { sortTypes } from '../../actions';
import './Filters.scss';

class Filters extends React.Component {
  constructor(props) {
    super(props);
  }
  onClick(sort) {
    this.props.onClick(sort);
  }
  render() {
    
    let { translations, sort } = this.props; 

    let click = this.onClick.bind(this);

    return (
      <div className="filters">
        <span className="filters__label">
            { translations.sortBy }
        </span>
        {sortTypes.map((sortType, sortTypeIndex) => {
            return <button className={ 'filters__button' + ( sortType == sort ? ' filters__button--active' : '') }
                    role="button"
                    key={sortTypeIndex}
                    onKeyDown={() => click(sortType)}
                    onClick={() => click(sortType)}
                    aria-label={translations['sortBy' + sortType]}>
                    {translations['sortBy' + sortType]}
            </button>;
        })}
      </div>
    );
  }
}

Filters.propTypes = {
    translations: PropTypes.object.isRequired,
    sort: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Filters;