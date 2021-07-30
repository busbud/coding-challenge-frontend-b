import { useHistory } from "react-router-dom";
import { handleNavClick } from "utils/utils";

const SearchView = () => {
  const history = useHistory();

  return (
    <section className="search">
      <h2>Bus Routes</h2>
      <div className="search-container">
        <div className="search-container-locations">
          <div className="search-container-locations-location search-container-input">
            <span>From</span>
            <span>Québec City, Québec</span>
          </div>
          <div className="search-container-locations-location search-container-input">
            <span>To</span>
            <span>Montréal, Québec</span>
          </div>
        </div>
        <div className="search-container-date search-container-input">
          <span>Date</span>
          <span>2 August</span>
        </div>
        <div className="search-container-passengers">
          <div className="search-container-passengers-passenger-type search-container-input">
            <span>Adult</span>
            <span>1</span>
          </div>
          <div className="search-container-passengers-passenger-type search-container-input">
            <span>Child</span>
            <span>0</span>
          </div>
          <div className="search-container-passengers-passenger-type search-container-input">
            <span>Senior</span>
            <span>0</span>
          </div>
        </div>
        <button
          type="button"
          className="search-button button-primary"
          title="Search"
          onClick={handleNavClick("/departures", history)}
        >
          &#x1F50D;
        </button>
      </div>
    </section>
  );
};

export default SearchView;
