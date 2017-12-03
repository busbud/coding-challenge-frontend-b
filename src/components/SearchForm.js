import React from "react";

const SearchForm = props => {

  return (
    <div className="field is-horizontal">
      <div className="field-label is-small">
        <label className="label">From</label>
      </div>
      <div className="field-body">
        <div className="field">
          <p className="control">
            <input disabled className="input is-small" value="New York" type="text"/>
          </p>
        </div>
      </div>

      <div className="field-label is-small">
        <label className="label">To</label>
      </div>
      <div className="field-body is-small">
        <div className="field">
          <p className="control">
            <input disabled className="input is-small" value="Montreal" type="text"/>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
