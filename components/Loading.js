import PropTypes from "prop-types";
import { withTranslation } from "../lib/i18n";

const Loading = props => (
  <React.Fragment>
    <h2>{props.t("loading")}</h2>
    <style jsx>{`
      h2 {
        color: white;
        margin: 0;
        padding-left: 24px;
        padding-right: 24px;
        padding-top: 32px;
        text-align: center;
      }
    `}</style>
  </React.Fragment>
);

Loading.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation("common")(Loading);
