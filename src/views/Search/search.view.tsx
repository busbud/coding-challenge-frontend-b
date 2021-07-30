import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { handleNavClick } from "utils/utils";

const SearchView = () => {
  const history = useHistory();

  const { t } = useTranslation();

  return (
    <section className="search">
      <h2>{t("search.title")}</h2>
      <div className="search-container">
        <div className="search-container-locations">
          <div className="search-container-locations-location search-container-input">
            <span>{t("search.from")}</span>
            <span>Québec City, Québec</span>
          </div>
          <div className="search-container-locations-location search-container-input">
            <span>{t("search.to")}</span>
            <span>Montréal, Québec</span>
          </div>
        </div>
        <div className="search-container-date search-container-input">
          <span>{t("search.date")}</span>
          <span>2 August</span>
        </div>
        <div className="search-container-passengers">
          <div className="search-container-passengers-passenger-type search-container-input">
            <span>{t("search.adults")}</span>
            <span>1</span>
          </div>
          <div className="search-container-passengers-passenger-type search-container-input">
            <span>{t("search.children")}</span>
            <span>0</span>
          </div>
          <div className="search-container-passengers-passenger-type search-container-input">
            <span>{t("search.seniors")}</span>
            <span>0</span>
          </div>
        </div>
        <button
          type="button"
          className="search-button button-primary"
          title={t("search.search")}
          onClick={handleNavClick("/departures", history)}
        >
          &#x1F50D;
        </button>
      </div>
    </section>
  );
};

export default SearchView;
