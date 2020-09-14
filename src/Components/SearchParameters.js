import React from "react";
import { FormattedMessage } from 'react-intl';

import SearchParametersInput from './SearchParametersInput';

const SearchParameters = props => {
    return (
        <div className="roadToOsheaga-coachella--search-parameters-container">
            <SearchParametersInput
                name="date"
                type="date"
                messageId="coachella.outbound.date"
                value={props.searchDate}
            />
            <SearchParametersInput
                name="passenger"
                type="number"
                messageId="commons.passenger"
                value={1}
            />
            <button
                className="roadToOsheaga-coachella--search-parameters--button"
                onClick={
                    () => {
                        props.updateRefreshing(true);
                    }
                }
            >
                <FormattedMessage
                    id="commons.Update"
                    defaultMessage="Update"
                />
            </button>
        </div>
    );
};

export default SearchParameters;