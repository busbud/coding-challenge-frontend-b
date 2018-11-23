import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
    static propTypes = {
        results: PropTypes.array.isRequired,
        isSearching: PropTypes.bool.isRequired,
        search: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.search();
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <div>
                        Search
                    </div>
                </div>
                <div>
                    {this.props.results.map(result => (
                        <span>allo</span>
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default Search;
