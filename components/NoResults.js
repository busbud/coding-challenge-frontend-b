import PropTypes from "prop-types";

import { withTranslation } from "../lib/i18n";
import { colours } from "../lib/theme";

const NoResults = props => (
  <React.Fragment>
    <h2>{props.t("search-tip")}</h2>
    <style jsx>{`
      h2 {
        color: ${colours.blue};
        margin: 0;
        padding-left: 24px;
        padding-right: 24px;
        padding-top: 32px;
        text-align: center;
      }
    `}</style>
  </React.Fragment>
);

NoResults.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation("common")(NoResults);
